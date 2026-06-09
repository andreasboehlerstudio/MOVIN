import fs from 'fs';
import path from 'path';

function walk(dir, results = []) {
  try {
    const list = fs.readdirSync(dir);
    for (const item of list) {
      if (['node_modules', '.git', 'dist', '.next', 'cache'].includes(item)) continue;
      const full = path.join(dir, item);
      try {
        const stat = fs.statSync(full);
        if (stat.isDirectory()) {
          walk(full, results);
        } else {
          results.push({ path: full, name: item, size: stat.size, mtime: stat.mtime });
        }
      } catch (e) {}
    }
  } catch (e) {}
  return results;
}

console.log('Searching for files starting with "video" or having video extensions...');
const files = walk('.');
const matches = files.filter(f => {
  const nameLower = f.name.toLowerCase();
  const ext = path.extname(f.name).toLowerCase();
  return nameLower.startsWith('video') || ['.mp4', '.mov', '.webm', '.m4v', '.avi'].includes(ext);
});

console.log(`Found ${matches.length} matching files:`);
matches.forEach(f => {
  console.log(`- ${f.path} (${f.size} bytes) [mtime: ${f.mtime}]`);
});
