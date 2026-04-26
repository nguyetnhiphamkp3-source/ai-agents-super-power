import fs from 'node:fs';
import path from 'node:path';

const PUBLIC_DIR = 'public';
const TARGET_DIRS = ['src', 'index.html'];

function walk(dir) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(p));
    else out.push(p);
  }
  return out;
}

// Build set of basenames that exist as .webp in public/
const webpFiles = walk(PUBLIC_DIR).filter((f) => /\.webp$/i.test(f));
const webpBasenames = new Set(webpFiles.map((f) => path.basename(f, path.extname(f))));

console.log(`Found ${webpBasenames.size} webp files in public/`);

// Collect text files to process
const textFiles = [];
for (const t of TARGET_DIRS) {
  if (!fs.existsSync(t)) continue;
  if (fs.statSync(t).isDirectory()) {
    textFiles.push(...walk(t).filter((f) => /\.(tsx?|jsx?|html|css)$/i.test(f)));
  } else {
    textFiles.push(t);
  }
}

let totalReplacements = 0;
const filesChanged = [];

for (const file of textFiles) {
  let content = fs.readFileSync(file, 'utf-8');
  const original = content;

  // Match: filename.png|jpg|jpeg|PNG (with optional path prefix), but NOT http URLs
  // Strategy: find any string-like reference ending in .png/.jpg/.jpeg/.PNG
  // and only replace if (a) preceding context isn't http URL, (b) basename has webp counterpart
  content = content.replace(/(['"`])([^'"`\n]+?)\.(png|jpg|jpeg|PNG)\1/g, (match, quote, prefix, ext) => {
    // External URL? Skip
    if (/^https?:\/\//i.test(prefix)) return match;
    // Get basename
    const basename = path.basename(prefix);
    if (webpBasenames.has(basename)) {
      totalReplacements++;
      return `${quote}${prefix}.webp${quote}`;
    }
    return match;
  });

  // Also handle ${...}filename.ext patterns (template literals)
  content = content.replace(/\$\{[^}]+\}([^'"`\s]+?)\.(png|jpg|jpeg|PNG)/g, (match, prefix, ext) => {
    const basename = path.basename(prefix);
    if (webpBasenames.has(basename)) {
      totalReplacements++;
      return match.replace(`.${ext}`, '.webp');
    }
    return match;
  });

  if (content !== original) {
    fs.writeFileSync(file, content);
    filesChanged.push(file);
  }
}

console.log(`\nReplacements: ${totalReplacements}`);
console.log(`Files changed: ${filesChanged.length}`);
filesChanged.forEach((f) => console.log(`  - ${f}`));
