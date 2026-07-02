import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = path.join(root, 'public');
const backupRoot = path.join(root, 'asset-backups');
const stamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
const archiveDir = path.join(backupRoot, `unused-public-assets-${stamp}`);

const sourceRoots = [
  path.join(root, 'src'),
];
const sourceFiles = [
  path.join(root, 'index.html'),
  path.join(root, 'server.ts'),
  path.join(root, 'public', 'robots.txt'),
  path.join(root, 'public', 'sitemap.xml'),
];

const archiveExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.mp4', '.mov', '.m4v', '.webm']);
const keepPaths = new Set([
  'public/favicon.svg',
  'public/og-image.jpg',
  'public/videos/app/.gitkeep',
]);

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

const normalizeRel = (filePath) => path.relative(root, filePath).replaceAll(path.sep, '/');

const readSourceText = async () => {
  const files = [];
  for (const dir of sourceRoots) {
    if (await exists(dir)) files.push(...await walk(dir));
  }
  for (const file of sourceFiles) {
    if (await exists(file)) files.push(file);
  }

  const textParts = [];
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (!['.ts', '.tsx', '.js', '.jsx', '.css', '.html', '.txt', '.xml'].includes(ext)) continue;
    textParts.push(await fs.readFile(file, 'utf8'));
  }
  return textParts.join('\n');
};

const toPublicRel = (urlPath) => `public/${decodeURIComponent(urlPath).replace(/^\//, '')}`;

const sourceText = await readSourceText();
const referenced = new Set([...keepPaths]);
const quotedAssetPattern = /["'`]([^"'`]*(?:\/images\/|\/videos\/|\/docs\/|\/favicon\.svg|\/og-image\.jpg)[^"'`]*)["'`]/g;
const cssAssetPattern = /url\((['"]?)(\/(?:images|videos|docs)\/[^'")]+)\1\)/g;
for (const match of sourceText.matchAll(quotedAssetPattern)) {
  const value = match[1];
  const assetStart = value.search(/\/(?:images|videos|docs)\/|\/favicon\.svg|\/og-image\.jpg/);
  if (assetStart >= 0) {
    referenced.add(toPublicRel(value.slice(assetStart).split('?')[0]));
  }
}
for (const match of sourceText.matchAll(cssAssetPattern)) {
  referenced.add(toPublicRel(match[2].split('?')[0]));
}

const files = await walk(publicDir);
const publicFiles = files.map((file) => ({
  absolute: file,
  rel: normalizeRel(file),
  ext: path.extname(file).toLowerCase(),
}));

const referencedFiles = new Set(publicFiles.filter((file) => referenced.has(file.rel)).map((file) => file.rel));

const candidates = publicFiles.filter((file) => {
  if (!archiveExtensions.has(file.ext)) return false;
  if (referencedFiles.has(file.rel)) return false;
  return true;
});

let moved = 0;
let movedBytes = 0;
const movedFiles = [];

for (const file of candidates) {
  const stat = await fs.stat(file.absolute);
  const target = path.join(archiveDir, file.rel);
  await fs.mkdir(path.dirname(target), { recursive: true });
  await fs.rename(file.absolute, target);
  moved += 1;
  movedBytes += stat.size;
  movedFiles.push({ file: file.rel, mb: +(stat.size / 1024 / 1024).toFixed(2) });
}

const remainingFiles = await walk(publicDir);
const remainingBytes = (await Promise.all(remainingFiles.map(async (file) => (await fs.stat(file)).size)))
  .reduce((sum, size) => sum + size, 0);

const formatMb = (bytes) => +(bytes / 1024 / 1024).toFixed(2);

console.log(JSON.stringify({
  archiveDir: path.relative(root, archiveDir).replaceAll(path.sep, '/'),
  referencedAssets: referencedFiles.size,
  moved,
  movedMb: formatMb(movedBytes),
  remainingPublicMb: formatMb(remainingBytes),
  largestMoved: movedFiles.sort((a, b) => b.mb - a.mb).slice(0, 40),
}, null, 2));
