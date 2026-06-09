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

console.log('--- SCANNING PROJECT ---');
const files = walk('.');
files.forEach(f => {
  // Let's print everything in public
  if (f.path.startsWith('public') || f.name.toLowerCase().includes('video')) {
    console.log(`- ${f.path} (${f.size} bytes)`);
  }
});
