/**
 * Writes travel description edits into src/data/portfolio.js.
 *
 * Usage:
 *   1. In the site: Journey panel → "Download descriptions"
 *   2. Move the file to the repo root (or pass its path)
 *   3. npm run apply-travel-descriptions
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const exportPath = path.resolve(process.argv[2] || path.join(root, 'travel-descriptions-export.json'));
const portfolioPath = path.join(root, 'src/data/portfolio.js');

if (!fs.existsSync(exportPath)) {
  console.error(`Missing export file: ${exportPath}`);
  console.error('Download it from the Journey panel first, then run:');
  console.error('  npm run apply-travel-descriptions -- /path/to/travel-descriptions-export.json');
  process.exit(1);
}

const descriptions = JSON.parse(fs.readFileSync(exportPath, 'utf8'));
if (!descriptions || typeof descriptions !== 'object') {
  console.error('Export file must be a JSON object keyed by place id.');
  process.exit(1);
}

let src = fs.readFileSync(portfolioPath, 'utf8');
let updated = 0;
let skipped = 0;

for (const [id, text] of Object.entries(descriptions)) {
  if (typeof text !== 'string') {
    console.warn(`Skip ${id}: value is not a string`);
    skipped += 1;
    continue;
  }

  const idMarker = `id: '${id}'`;
  const blockStart = src.indexOf(idMarker);
  if (blockStart === -1) {
    console.warn(`Skip unknown place id: ${id}`);
    skipped += 1;
    continue;
  }

  const range = findDescriptionStringRange(src, blockStart);
  if (!range) {
    console.warn(`Could not find description field for: ${id}`);
    skipped += 1;
    continue;
  }

  const escaped = escapeJsSingleQuoted(text);
  const replacement = `description:\n      '${escaped}',`;
  src = src.slice(0, range.begin) + replacement + src.slice(range.end);
  updated += 1;
}

fs.writeFileSync(portfolioPath, src);
console.log(`Updated ${updated} description(s) in src/data/portfolio.js`);
if (skipped) console.log(`Skipped ${skipped} entr${skipped === 1 ? 'y' : 'ies'}.`);

function escapeJsSingleQuoted(text) {
  return text.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\r\n/g, '\n').replace(/\r/g, '\n');
}

/** From `startIdx`, find `description: '...',` or `description:\n      '...',`. */
function findDescriptionStringRange(str, startIdx) {
  const descLabel = str.indexOf('description:', startIdx);
  if (descLabel === -1) return null;

  let i = descLabel + 'description:'.length;
  while (i < str.length && /\s/.test(str[i])) i += 1;
  if (str[i] !== "'") return null;

  const begin = descLabel;
  i += 1;
  while (i < str.length) {
    if (str[i] === '\\') {
      i += 2;
      continue;
    }
    if (str[i] === "'") {
      let j = i + 1;
      while (j < str.length && /\s/.test(str[j])) j += 1;
      if (str[j] === ',') return { begin, end: j + 1 };
      return null;
    }
    i += 1;
  }
  return null;
}
