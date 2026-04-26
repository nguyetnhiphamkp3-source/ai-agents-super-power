import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const PUBLIC_DIR = 'public';

function walk(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(fullPath));
    else files.push(fullPath);
  }
  return files;
}

const files = walk(PUBLIC_DIR).filter((f) => /\.(png|jpe?g)$/i.test(f));
let converted = 0;
let failed = 0;
let savedBytes = 0;

for (const file of files) {
  const webpPath = file.replace(/\.(png|jpe?g)$/i, '.webp');
  try {
    const before = fs.statSync(file).size;
    await sharp(file).webp({ quality: 82, effort: 5 }).toFile(webpPath);
    const after = fs.statSync(webpPath).size;
    fs.unlinkSync(file);
    savedBytes += before - after;
    converted++;
    const pct = (((before - after) / before) * 100).toFixed(0);
    console.log(`✓ ${file} ${(before / 1024).toFixed(0)}KB → ${(after / 1024).toFixed(0)}KB (${pct}%)`);
  } catch (e) {
    failed++;
    console.error(`✗ ${file}: ${e.message}`);
  }
}

console.log(`\nDone. Converted: ${converted}, Failed: ${failed}, Saved: ${(savedBytes / 1024 / 1024).toFixed(2)}MB`);
