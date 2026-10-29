// 내부 링크·제목·구조화 데이터 검사. 실행: node scripts/check-links.js
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const breeds = require('../data/breeds.json');
const files = ['index.html', 'chart/index.html', 'breeds/index.html', ...breeds.map((b) => `breeds/${b.slug}/index.html`)];
let bad = 0;
let n = 0;
const titles = new Set();
for (const f of files) {
  const h = fs.readFileSync(path.join(ROOT, f), 'utf8');
  const title = (h.match(/<title>([^<]+)/) || [])[1];
  if (!title || titles.has(title)) { bad++; console.log('제목 없음/중복', f); }
  titles.add(title);
  for (const m of h.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)) {
    try { JSON.parse(m[1]); } catch (e) { bad++; console.log('JSON-LD 오류', f); }
  }
  for (const m of h.matchAll(/(?:href|src)="([^"]+)"/g)) {
    let u = m[1];
    if (/^(https?:|mailto:|data:)/.test(u)) continue;
    u = u.split(/[?#]/)[0];
    let p = path.join(ROOT, path.dirname(f), u);
    if (u === '' || u.endsWith('/') || /(^|\/)\.\.?$/.test(u)) p = path.join(p, 'index.html');
    n++;
    if (!fs.existsSync(p)) { bad++; console.log('깨진 링크', f, m[1]); }
  }
}
console.log(`페이지 ${files.length}개, 내부 링크 ${n}개, 문제 ${bad}개`);
process.exitCode = bad ? 1 : 0;
