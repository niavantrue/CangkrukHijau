import fs from 'fs';
import path from 'path';

function getFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(fullPath));
    } else if (file.endsWith('.js') || file.endsWith('.astro')) {
      results.push(fullPath);
    }
  });
  return results;
}

const files = getFiles('d:/task/CangkrukHijau/src');
const imgRegex = /["'`](\/?images\/[a-zA-Z0-9_\-\.\/]+)["'`]/g;
const allMatches = [];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  let match;
  while ((match = imgRegex.exec(content)) !== null) {
    const cleanPath = match[1];
    allMatches.push({ file: f, path: cleanPath });
  }
});

console.log('Total /images/ references:', allMatches.length);
const invalid = allMatches.filter(m => !m.path.startsWith('/'));
console.log('Invalid (not starting with /):', invalid.length, invalid);

const missingFiles = [];
allMatches.forEach(m => {
  const local = path.join('d:/task/CangkrukHijau/public', m.path);
  if (!fs.existsSync(local)) {
    missingFiles.push(m);
  }
});

console.log('Missing physical files:', missingFiles.length, missingFiles);
