import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import crypto from 'node:crypto';
import sharp from 'sharp';

const execFileAsync = promisify(execFile);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = path.join(root, 'public');
const tempDir = path.join(root, 'tmp-asset-optimization');

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp']);
const VIDEO_EXTENSIONS = new Set(['.mp4']);
const MIN_IMAGE_BYTES = 80 * 1024;
const MIN_VIDEO_BYTES = 900 * 1024;
const MIN_SAVING_RATIO = 0.06;

const skipPathParts = [
  `${path.sep}docs${path.sep}`,
];

const isSkipped = (filePath) => skipPathParts.some((part) => filePath.includes(part));

const walk = async (dir) => {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const absolute = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await walk(absolute));
    } else {
      files.push(absolute);
    }
  }
  return files;
};

const fileSize = async (filePath) => (await fs.stat(filePath)).size;
const tempName = (filePath, ext) => `${crypto.createHash('sha1').update(filePath).digest('hex')}${ext}`;

const replaceIfSmaller = async (source, candidate) => {
  const [sourceSize, candidateSize] = await Promise.all([fileSize(source), fileSize(candidate)]);
  const savingRatio = 1 - candidateSize / sourceSize;

  if (candidateSize < sourceSize && savingRatio >= MIN_SAVING_RATIO) {
    await fs.copyFile(candidate, source);
    return { changed: true, before: sourceSize, after: candidateSize };
  }

  return { changed: false, before: sourceSize, after: sourceSize };
};

const optimizeImage = async (filePath) => {
  const ext = path.extname(filePath).toLowerCase();
  const size = await fileSize(filePath);
  if (size < MIN_IMAGE_BYTES || isSkipped(filePath)) return null;

  const out = path.join(tempDir, tempName(filePath, ext));
  const image = sharp(filePath, { failOn: 'none', animated: ext === '.webp' });
  const meta = await image.metadata();

  let pipeline = image.rotate();
  if ((meta.width || 0) > 2560) {
    pipeline = pipeline.resize({ width: 2560, withoutEnlargement: true });
  }

  if (ext === '.png') {
    pipeline = pipeline.png({
      compressionLevel: 9,
      adaptiveFiltering: true,
      palette: false,
    });
  } else if (ext === '.jpg' || ext === '.jpeg') {
    pipeline = pipeline.jpeg({
      quality: 82,
      mozjpeg: true,
      progressive: true,
    });
  } else if (ext === '.webp') {
    pipeline = pipeline.webp({
      quality: 82,
      effort: 5,
    });
  }

  await pipeline.toFile(out);
  const result = await replaceIfSmaller(filePath, out);
  await fs.rm(out, { force: true });
  return { filePath, type: 'image', ...result };
};

const optimizeVideo = async (filePath) => {
  const size = await fileSize(filePath);
  const name = path.basename(filePath).toLowerCase();
  if (size < MIN_VIDEO_BYTES || isSkipped(filePath)) return null;

  const out = path.join(tempDir, tempName(filePath, '.mp4'));
  await execFileAsync('ffmpeg', [
    '-y',
    '-i', filePath,
    '-vf', "scale='min(1080,iw)':-2",
    '-c:v', 'libx264',
    '-preset', 'medium',
    '-crf', '28',
    '-pix_fmt', 'yuv420p',
    '-movflags', '+faststart',
    '-an',
    out,
  ], { windowsHide: true, maxBuffer: 1024 * 1024 * 16 });

  const result = await replaceIfSmaller(filePath, out);
  await fs.rm(out, { force: true });
  return { filePath, type: 'video', ...result };
};

const formatMb = (bytes) => (bytes / 1024 / 1024).toFixed(2);

await fs.rm(tempDir, { recursive: true, force: true });
await fs.mkdir(tempDir, { recursive: true });

const files = await walk(publicDir);
const beforeTotal = (await Promise.all(files.map(fileSize))).reduce((sum, size) => sum + size, 0);
const results = [];

for (const file of files) {
  const ext = path.extname(file).toLowerCase();
  try {
    if (IMAGE_EXTENSIONS.has(ext)) {
      const result = await optimizeImage(file);
      if (result) results.push(result);
    } else if (VIDEO_EXTENSIONS.has(ext)) {
      const result = await optimizeVideo(file);
      if (result) results.push(result);
    }
  } catch (error) {
    results.push({
      filePath: file,
      type: IMAGE_EXTENSIONS.has(ext) ? 'image' : 'video',
      changed: false,
      error: error.message,
      before: await fileSize(file),
      after: await fileSize(file),
    });
  }
}

await fs.rm(tempDir, { recursive: true, force: true });

const afterFiles = await walk(publicDir);
const afterTotal = (await Promise.all(afterFiles.map(fileSize))).reduce((sum, size) => sum + size, 0);
const changed = results.filter((result) => result.changed);
const errors = results.filter((result) => result.error);
const saved = changed.reduce((sum, result) => sum + (result.before - result.after), 0);

console.log(JSON.stringify({
  scanned: files.length,
  optimized: changed.length,
  errors: errors.length,
  beforeMb: formatMb(beforeTotal),
  afterMb: formatMb(afterTotal),
  savedMb: formatMb(saved),
  topSavings: changed
    .sort((a, b) => (b.before - b.after) - (a.before - a.after))
    .slice(0, 25)
    .map((result) => ({
      file: path.relative(root, result.filePath).replaceAll(path.sep, '/'),
      type: result.type,
      beforeMb: formatMb(result.before),
      afterMb: formatMb(result.after),
      savedMb: formatMb(result.before - result.after),
    })),
  errors: errors.map((result) => ({
    file: path.relative(root, result.filePath).replaceAll(path.sep, '/'),
    error: result.error,
  })),
}, null, 2));
