import fs from 'fs';
import path from 'path';

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const filePath = path.resolve(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(filePath));
    } else {
      if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
        results.push(filePath);
      }
    }
  });
  return results;
}

const files = walk('./src');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;

  // Replace price dollar occurrences
  // Matches $ followed by numbers, optionally with commas, dots, k, K, m, M
  content = content.replace(/\$([0-9][0-9.,kKmM]*)/g, '$1 DZD');
  
  // Replace negative prices like -$499 to -499 DZD
  content = content.replace(/-\$([0-9][0-9.,kKmM]*)/g, '-$1 DZD');
  content = content.replace(/\+\$([0-9][0-9.,kKmM]*)/g, '+$1 DZD');

  // Also replace setting texts if any
  content = content.replace(/USD - US Dollar \(\$\)/g, 'DZD - Algerian Dinar (DZD)');
  content = content.replace(/US Dollar/g, 'Algerian Dinar');

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});

console.log('Done!');
