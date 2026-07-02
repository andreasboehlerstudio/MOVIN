import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = path.join(root, 'public');

const sourceRoots = [path.join(root, 'src')];
const sourceFiles = [
  path.join(root, 'index.html'),
  path.join(root, 'server.ts'),
];

const MIN_BYTES = 120 * 1024;
const MIN_SAVING_RATIO = 0.08;

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

const exists = async (filePath) => {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
};

const files = [];
for (const dir of sourceRoots) {
  if (await exists(dir)) files.push(...await walk(dir));
}
for (const file of sourceFiles) {
  if (await exists(file)) files.push(file);
}

const textByFile = new Map();
const referencedPngs = new Set();
const pngPattern = /\/images\/[^'"`\s)]+\.png/g;

for (const file of files) {
  const ext = path.extname(file).toLowerCase();
  if (!['.ts', '.tsx', '.js', '.jsx', '.css', '.html'].includes(ext)) continue;
  const text = await fs.readFile(file, 'utf8');
  textByFile.set(file, text);
  for (const match of text.matchAll(pngPattern)) {
    referencedPngs.add(match[0]);
  }
}

const converted = [];

for (const assetPath of referencedPngs) {
  const source = path.join(publicDir, decodeURIComponent(assetPath).replace(/^\//, ''));
  if (!(await exists(source))) continue;
  const sourceStat = await fs.stat(source);
  if (sourceStat.size < MIN_BYTES) continue;

  const target = source.replace(/\.png$/i, '.webp');
  await sharp(source, { failOn: 'none' })
    .webp({ quality: 84, effort: 6, nearLossless: false })
    .toFile(target);

  const targetStat = await fs.stat(target);
  const savingRatio = 1 - targetStat.size / sourceStat.size;

  if (targetStat.size < sourceStat.size && savingRatio >= MIN_SAVING_RATIO) {
    converted.push({
      from: assetPath,
      to: assetPath.replace(/\.png$/i, '.webp'),
      before: sourceStat.size,
      after: targetStat.size,
    });
  } else {
    await fs.rm(target, { force: true });
  }
}

for (const [file, originalText] of textByFile.entries()) {
  let text = originalText;
  for (const item of converted) {
    text = text.split(item.from).join(item.to);
  }
  if (text !== originalText) {
    await fs.writeFile(file, text);
  }
}

console.log(JSON.stringify({
  converted: converted.length,
  savedMb: +((converted.reduce((sum, item) => sum + item.before - item.after, 0)) / 1024 / 1024).toFixed(2),
  files: converted
    .sort((a, b) => (b.before - b.after) - (a.before - a.after))
    .map((item) => ({
      from: item.from,
      to: item.to,
      beforeMb: +(item.before / 1024 / 1024).toFixed(2),
      afterMb: +(item.after / 1024 / 1024).toFixed(2),
      savedMb: +((item.before - item.after) / 1024 / 1024).toFixed(2),
    })),
}, null, 2));
