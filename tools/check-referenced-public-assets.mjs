import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = path.join(root, 'public');

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

const sourceRoots = [path.join(root, 'src')];
const sourceFiles = [
  path.join(root, 'index.html'),
  path.join(root, 'server.ts'),
  path.join(root, 'public', 'robots.txt'),
  path.join(root, 'public', 'sitemap.xml'),
];

const files = [];
for (const dir of sourceRoots) {
  if (await exists(dir)) files.push(...await walk(dir));
}
for (const file of sourceFiles) {
  if (await exists(file)) files.push(file);
}

const referenced = new Set(['/favicon.svg', '/og-image.jpg']);
const quotedAssetPattern = /["'`]([^"'`]*(?:\/images\/|\/videos\/|\/docs\/|\/favicon\.svg|\/og-image\.jpg)[^"'`]*)["'`]/g;
const cssAssetPattern = /url\((['"]?)(\/(?:images|videos|docs)\/[^'")]+)\1\)/g;

for (const file of files) {
  const ext = path.extname(file).toLowerCase();
  if (!['.ts', '.tsx', '.js', '.jsx', '.css', '.html', '.txt', '.xml'].includes(ext)) continue;
  const text = await fs.readFile(file, 'utf8');
  for (const match of text.matchAll(quotedAssetPattern)) {
    const value = match[1];
    const assetStart = value.search(/\/(?:images|videos|docs)\/|\/favicon\.svg|\/og-image\.jpg/);
    if (assetStart >= 0) referenced.add(value.slice(assetStart));
  }
  for (const match of text.matchAll(cssAssetPattern)) {
    referenced.add(match[2]);
  }
}

const missing = [];
for (const asset of referenced) {
  const cleanAsset = asset.split('?')[0];
  if (cleanAsset.includes('*') || cleanAsset.endsWith('-')) continue;
  const fullPath = path.join(publicDir, decodeURIComponent(cleanAsset).replace(/^\//, ''));
  if (!(await exists(fullPath))) {
    missing.push(cleanAsset);
  }
}

console.log(JSON.stringify({
  referenced: referenced.size,
  missing: missing.sort(),
}, null, 2));

if (missing.length > 0) {
  process.exitCode = 1;
}
