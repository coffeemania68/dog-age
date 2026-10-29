// 정적 페이지 생성기. 실행: node scripts/build.js
// 입력: data/breeds.json, data/products.json → 출력: index.html, breeds/, chart/, assets/data.js, sitemap.xml
const fs = require('fs');
const path = require('path');
const A = require('../assets/age.js');

const ROOT = path.join(__dirname, '..');
const BASE = 'https://coffeemania68.github.io/dog-age/';
const TODAY = new Date().toLocaleDateString('sv-SE', { timeZone: 'Asia/Seoul' });
const FONT = 'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css';
const DISCLOSURE = '이 페이지는 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.';
const GOOGLE_VERIFY = ''; // 구글 서치콘솔 HTML 태그 인증값
const PROJECT = 'http://puppy-intellect-playground.lovable.app/';

const breeds = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/breeds.json'), 'utf8'));
const goods = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/products.json'), 'utf8'));
delete goods._설명;

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const write = (rel, text) => {
  const f = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, text);
};
const josa = (word, a, b) => {
  const c = word.charCodeAt(word.length - 1) - 0xac00;
  return word + (c >= 0 && c <= 11171 && c % 28 ? a : b);
};

function head({ title, desc, url, prefix, jsonld, image }) {
  return `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${url}">
<meta name="robots" content="index,follow,max-image-preview:large">
${GOOGLE_VERIFY ? `<meta name="google-site-verification" content="${GOOGLE_VERIFY}">\n` : ''}<meta property="og:type" content="website">
<meta property="og:site_name" content="강아지 나이 계산기">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${image || BASE + 'images/og.png'}">
<meta property="og:locale" content="ko_KR">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#fbf7f1">
<link rel="icon" href="${prefix}images/icon-192.png">
<link rel="apple-touch-icon" href="${prefix}images/icon-192.png">
<link rel="manifest" href="${prefix}manifest.json">
<link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>
<link rel="stylesheet" href="${FONT}">
<link rel="stylesheet" href="${prefix}assets/style.css?v=${TODAY}">
${jsonld.map((j) => `<script type="application/ld+json">${JSON.stringify(j)}</script>`).join('\n')}
</head>`;
}

function topbar(prefix, current) {
  const links = [['', '나이 계산'], ['chart/', '나이 환산표'], ['breeds/', '견종별 나이']];
  return `<div class="disclosure">${DISCLOSURE}</div>
<header class="top"><div class="wrap">
  <a class="logo" href="${prefix}">🐶 <span>강아지 나이 <b>계산기</b></span></a>
  <nav aria-label="메뉴">${links.map(([h, l]) => `<a href="${prefix}${h}"${h === current ? ' aria-current="page"' : ''}>${l}</a>`).join('')}</nav>
</div></header>`;
}

function footer() {
  return `<footer class="foot"><div class="wrap">
  <p>사람 나이 환산은 미국수의사회(AVMA) 안내를 바탕으로 한 근사치이며, 실제 건강 상태는 개체마다 다릅니다. 건강 문제는 동물병원에서 상담하세요.</p>
  <p>${DISCLOSURE}</p>
  <p>문의: <a href="mailto:yourmoments@gmail.com">yourmoments@gmail.com</a> · 마지막 업데이트 ${TODAY}</p>
</div></footer>
<div class="toast" role="status"></div>`;
}

function calculator(prefix, breedSlug) {
  const sizes = Object.entries(A.SIZES).map(([k, s]) => `<button type="button" class="chip" data-value="${k}" aria-pressed="false">${s.label} <small>${s.weight}</small></button>`).join('');
  return `<form id="calc" class="panel" data-root="${prefix}" data-breed="${breedSlug || ''}" aria-label="강아지 나이 계산">
  <div class="field"><label for="breed">품종</label>
    <select id="breed"><option value="">믹스견 · 목록에 없어요 (아래에서 크기 선택)</option></select></div>
  <div class="field"><span class="label">크기 <small>(품종을 고르면 자동으로 정해져요)</small></span>
    <div class="chips" data-key="size">${sizes}</div></div>
  <div class="field"><span class="label">나이</span>
    <div class="row"><input id="years" type="number" inputmode="numeric" min="0" max="25" placeholder="살" aria-label="나이 (살)">
    <input id="months" type="number" inputmode="numeric" min="0" max="11" placeholder="개월 (선택)" aria-label="개월"></div></div>
  <button class="btn block" type="submit">🐾 사람 나이로 계산하기</button>
  <p class="hint">입력한 정보는 저장되지 않아요.</p>
</form>
<div id="result" class="result" hidden></div>`;
}

const goodsSection = `<section id="goods-section" class="section" hidden><div class="wrap">
  <h2 class="sec-title" id="goods-title">이 시기에 많이 준비하는 용품</h2>
  <p class="sec-sub">버튼을 누르면 쿠팡에서 현재 가격을 볼 수 있어요.</p>
  <div class="goods" id="goods"></div>
</div></section>`;

const scripts = (prefix) => `<script src="${prefix}assets/age.js?v=${TODAY}"></script>
<script src="${prefix}assets/data.js?v=${TODAY}"></script>
<script src="${prefix}assets/app.js?v=${TODAY}"></script>`;

function breedGrid(prefix, list) {
  return `<div class="breeds">${list
    .map((b) => `<a href="${prefix}breeds/${b.slug}/"><div class="ph">${b.image ? `<img src="${esc(b.image)}" alt="${esc(b.name)}" loading="lazy" width="200" height="200">` : '🐶'}</div><b>${esc(b.name)}</b><span>${A.SIZES[b.size].label} · 수명 ${b.lifespan}년</span></a>`)
    .join('')}</div>`;
}

const sortKo = (list) => list.slice().sort((a, b) => a.name.localeCompare(b.name, 'ko'));
const cta = (prefix) => `<div class="cta"><h2>우리 강아지, 더 똑똑하게 키우고 싶다면</h2><p>집에서 하는 두뇌 놀이와 훈련을 정리했어요.</p><a class="btn" href="${PROJECT}" target="_blank" rel="noopener">천재견 만들기 프로젝트 🐕</a></div>`;

function ageTable(sizes, maxYears) {
  const rows = [];
  for (let y = 1; y <= maxYears; y++) {
    const senior = sizes.length === 1 && y >= A.SIZES[sizes[0]].senior;
    rows.push(`<tr${senior ? ' class="senior"' : ''}><td>${y}살</td>${sizes.map((s) => `<td>${Math.round(A.humanAge(y, s))}세</td>`).join('')}</tr>`);
  }
  return `<div class="table-wrap"><table><thead><tr><th>강아지 나이</th>${sizes.map((s) => `<th>${A.SIZES[s].label}<br><small>${A.SIZES[s].weight}</small></th>`).join('')}</tr></thead><tbody>${rows.join('')}</tbody></table></div>`;
}

const crumbLd = (items) => ({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c[0], item: c[1] })) });
const faqLd = (faq) => ({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) });
const faqHtml = (faq) => `<div class="faq">${faq.map((f) => `<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join('')}</div>`;

// ---------- 견종 페이지 ----------
breeds.forEach((b) => {
  const prefix = '../../';
  const url = `${BASE}breeds/${b.slug}/`;
  const S = A.SIZES[b.size];
  const life = A.lifespanRange(b.lifespan);
  const h = (y) => Math.round(A.humanAge(y, b.size));
  const sample = [1, 3, 5, 7, 10, 13].filter((y) => y <= life.max + 1);
  const faq = [
    { q: `${b.name} 1살은 사람 나이로 몇 살인가요?`, a: `약 15세입니다. 강아지는 첫 1년 동안 가장 빨리 자라서, 크기와 상관없이 사람의 사춘기 무렵까지 성장해요. 2살이면 약 24세입니다.` },
    { q: `${b.name} 5살은 사람 나이로 몇 살인가요?`, a: `${S.label} 기준으로 약 ${h(5)}세입니다. 2살 이후로는 1년에 사람 나이로 약 ${S.perYear}세씩 늘어나요.` },
    { q: `${b.name} 10살은 사람 나이로 몇 살인가요?`, a: `약 ${h(10)}세입니다.` },
    { q: `${b.name} 평균 수명은 몇 년인가요?`, a: `보통 ${life.min}~${life.max}년입니다. 실제 수명은 유전, 체중 관리, 정기 검진에 따라 달라져요.` },
    { q: `${b.name}는 몇 살부터 노견인가요?`, a: `${S.label}은 보통 ${S.senior}살 무렵부터 노령기로 봅니다. 이때부터는 6개월마다 건강검진을 받는 게 좋아요.` }
  ];
  const title = `${b.name} 나이 계산기 | 사람 나이 환산표 · 평균 수명 ${b.lifespan}년`;
  const desc = `${b.name} 나이를 사람 나이로 바꿔 보세요. ${b.name} 5살은 약 ${h(5)}세, 10살은 약 ${h(10)}세. 평균 수명 ${b.lifespan}년, 노령기 시작 시기, 산책·건강 관리법까지 정리했습니다.`;
  const others = sortKo(breeds.filter((x) => x.size === b.size && x.slug !== b.slug)).slice(0, 6);

  const html = `${head({ title, desc, url, prefix, image: b.image || undefined, jsonld: [crumbLd([['강아지 나이 계산기', BASE], ['견종별 나이', BASE + 'breeds/'], [b.name, url]]), faqLd(faq)] })}
<body>
${topbar(prefix, '')}
<main>
<section class="hero"><div class="wrap">
  <nav class="crumbs" aria-label="경로"><a href="${prefix}">나이 계산기</a> › <a href="${prefix}breeds/">견종별 나이</a> › ${esc(b.name)}</nav>
  <p style="margin-top:16px"><span class="eyebrow">🐾 ${S.label} · 평균 수명 ${b.lifespan}년</span></p>
  <h1>${esc(b.name)} 나이,<br><em>사람으로 치면 몇 살?</em></h1>
  <p class="lead">${esc(b.characteristics)} 나이만 넣으면 사람 나이와 지금 챙겨야 할 것을 알려 드려요.</p>
</div></section>
<section class="wrap">${calculator(prefix, b.slug)}</section>
${goodsSection}
<section class="section"><div class="wrap article">
  <h2>${esc(b.name)} 나이 환산표</h2>
  <p>${sample.map((y) => `${y}살 ≈ ${h(y)}세`).join(', ')}. 색이 칠해진 줄부터 노령기예요.</p>
  ${ageTable([b.size], Math.max(life.max + 2, 12))}
  <h2>${josa(b.name, '은', '는')} 어떤 강아지인가요</h2>
  <p>${esc(b.characteristics)} ${S.label}(${S.weight})으로 분류되며, 평균 수명은 ${life.min}~${life.max}년입니다.</p>
  <h2>산책은 얼마나</h2>
  <p>${esc(b.walkingTip)} 노령기에 들어서면 시간을 줄이고 횟수를 나눠 주세요.</p>
  <h2>건강 관리</h2>
  <p>${esc(b.healthNote)} ${S.senior}살 무렵부터는 6개월마다 검진을 받는 걸 권합니다.</p>
  <h2>자주 묻는 질문</h2>
  ${faqHtml(faq)}
</div></section>
<section class="section"><div class="wrap">
  <h2 class="sec-title">같은 ${S.label} 견종</h2>
  <p class="sec-sub">다른 견종의 나이도 확인해 보세요.</p>
  ${breedGrid(prefix, others)}
  <p style="text-align:center;margin-top:18px"><a class="btn ghost" href="${prefix}breeds/">전체 견종 보기 →</a></p>
  ${cta(prefix)}
</div></section>
</main>
${footer()}
${scripts(prefix)}
</body>
</html>
`;
  write(`breeds/${b.slug}/index.html`, html);
});

// ---------- 견종 목록 ----------
{
  const prefix = '../';
  const url = BASE + 'breeds/';
  const groups = Object.keys(A.SIZES).map((k) => [k, sortKo(breeds.filter((b) => b.size === k))]).filter(([, l]) => l.length);
  const html = `${head({ title: '견종별 강아지 나이 계산 | 말티즈·푸들·포메라니안 등 35종 사람 나이', desc: '말티즈, 토이 푸들, 포메라니안, 시츄, 골든 리트리버 등 35개 견종의 사람 나이 환산표와 평균 수명, 노령기 시작 시기를 견종별로 정리했습니다.', url, prefix, jsonld: [crumbLd([['강아지 나이 계산기', BASE], ['견종별 나이', url]]), { '@context': 'https://schema.org', '@type': 'ItemList', itemListElement: sortKo(breeds).map((b, i) => ({ '@type': 'ListItem', position: i + 1, name: b.name, url: `${url}${b.slug}/` })) }] })}
<body>
${topbar(prefix, 'breeds/')}
<main>
<section class="hero"><div class="wrap">
  <span class="eyebrow">🐕 35개 견종</span>
  <h1>견종별 <em>강아지 나이</em></h1>
  <p class="lead">같은 5살이어도 소형견과 대형견은 사람 나이가 달라요. 우리 강아지 견종을 골라 보세요.</p>
</div></section>
${groups.map(([k, l]) => `<section class="section" style="padding-top:10px"><div class="wrap"><h2 class="sec-title">${A.SIZES[k].label} <small style="font-size:15px;color:var(--muted)">${A.SIZES[k].weight}</small></h2><p class="sec-sub">1년에 사람 나이로 약 ${A.SIZES[k].perYear}세씩 늘어나요 (2살 이후).</p>${breedGrid(prefix, l)}</div></section>`).join('\n')}
<section class="wrap">${cta(prefix)}</section>
</main>
${footer()}
</body>
</html>
`;
  write('breeds/index.html', html);
}

// ---------- 나이 환산표 ----------
{
  const prefix = '../';
  const url = BASE + 'chart/';
  const sizes = Object.keys(A.SIZES);
  const faq = [
    { q: '강아지 나이에 7을 곱하면 되나요?', a: '정확하지 않습니다. 강아지는 첫 1년에 사람 나이로 약 15세, 2살에 약 24세가 되고, 그 뒤로는 크기에 따라 1년에 4~7세씩 늘어납니다.' },
    { q: '강아지 1살은 사람 나이로 몇 살인가요?', a: '크기와 상관없이 약 15세입니다.' },
    { q: '소형견과 대형견 중 누가 더 빨리 늙나요?', a: '2살 이후로는 대형견이 더 빨리 나이 듭니다. 10살 기준으로 소형견은 약 56세, 대형견은 약 72세, 초대형견은 약 80세예요.' },
    { q: 'DNA 공식은 뭔가요?', a: '2020년 미국 UCSD 연구팀이 래브라도 리트리버의 DNA 변화를 분석해 만든 공식(16 × ln(나이) + 31)입니다. 래브라도 기준이라 소형견에는 잘 맞지 않아서, 이 사이트는 크기별 표를 기준으로 계산해요.' }
  ];
  const html = `${head({ title: '강아지 나이 환산표 | 소형견·중형견·대형견 사람 나이 한눈에', desc: '강아지 나이를 사람 나이로 바꾼 환산표. 1살 15세, 2살 24세, 이후 소형견 4세·중형견 5세·대형견 6세·초대형견 7세씩. 1~20살까지 크기별로 정리했습니다.', url, prefix, jsonld: [crumbLd([['강아지 나이 계산기', BASE], ['나이 환산표', url]]), faqLd(faq)] })}
<body>
${topbar(prefix, 'chart/')}
<main>
<section class="hero"><div class="wrap">
  <span class="eyebrow">📊 1살부터 20살까지</span>
  <h1>강아지 나이 <em>환산표</em></h1>
  <p class="lead">"곱하기 7"은 옛날 계산법이에요. 크기별로 사람 나이가 어떻게 달라지는지 한눈에 보세요.</p>
</div></section>
<section class="section" style="padding-top:0"><div class="wrap article">
  ${ageTable(sizes, 20)}
  <h2>계산 방법</h2>
  <p>강아지는 태어나서 1년 동안 사람의 15세 정도까지 자라고, 2살이 되면 24세 정도가 됩니다. 그 뒤로는 1년마다 소형견 약 4세, 중형견 약 5세, 대형견 약 6세, 초대형견 약 7세씩 늘어나요. 미국수의사회(AVMA)가 안내하는 기준을 바탕으로 한 근사치입니다.</p>
  <h2>노령기는 언제부터</h2>
  <ul>${sizes.map((s) => `<li>${A.SIZES[s].label} (${A.SIZES[s].weight}): ${A.SIZES[s].senior}살 무렵부터</li>`).join('')}</ul>
  <h2>자주 묻는 질문</h2>
  ${faqHtml(faq)}
  <div class="cta" style="margin-top:30px"><h2>우리 강아지 나이 바로 계산하기</h2><p>품종과 나이만 넣으면 사람 나이와 시기별 관리법을 알려 드려요.</p><a class="btn" href="${prefix}">🐾 나이 계산하기</a></div>
</div></section>
</main>
${footer()}
</body>
</html>
`;
  write('chart/index.html', html);
}

// ---------- 첫 화면 ----------
{
  const popular = ['maltese', 'toy-poodle', 'pomeranian', 'bichon-frise', 'shih-tzu', 'chihuahua', 'welsh-corgi', 'golden-retriever', 'jindo-dog', 'french-bulldog', 'yorkshire-terrier', 'miniature-schnauzer'];
  const faq = [
    { q: '강아지 나이는 사람 나이로 어떻게 계산하나요?', a: '1살은 약 15세, 2살은 약 24세이고, 그 뒤로는 크기에 따라 1년에 4~7세씩 더합니다. 소형견 10살은 약 56세, 대형견 10살은 약 72세예요.' },
    { q: '믹스견은 어떻게 계산하나요?', a: '품종 대신 몸무게로 크기를 고르면 됩니다. 10kg 이하는 소형견, 10~25kg은 중형견, 25~45kg은 대형견이에요.' },
    { q: '계산 결과가 정확한가요?', a: '평균적인 근사치입니다. 같은 나이라도 건강 상태와 생활 습관에 따라 차이가 커요.' }
  ];
  const html = `${head({ title: '강아지 나이 계산기 | 사람 나이로 몇 살? 견종별 정확한 환산', desc: '강아지 나이를 사람 나이로 바로 계산하세요. 말티즈, 푸들, 포메라니안 등 35개 견종과 믹스견까지. 1살 15세·2살 24세, 크기별 노화 속도와 평균 수명, 시기별 관리법을 알려 드립니다.', url: BASE, prefix: '', jsonld: [{ '@context': 'https://schema.org', '@type': 'WebApplication', name: '강아지 나이 계산기', url: BASE, applicationCategory: 'LifestyleApplication', operatingSystem: 'Web', inLanguage: 'ko', offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' } }, faqLd(faq)] })}
<body>
${topbar('', '')}
<main>
<section class="hero"><div class="wrap">
  <span class="eyebrow">🐶 35개 견종 + 믹스견</span>
  <h1>우리 강아지,<br><em>사람으로 치면 몇 살?</em></h1>
  <p class="lead">"곱하기 7"은 틀린 계산이에요. 견종 크기에 맞춰 사람 나이와 지금 챙겨야 할 것을 알려 드려요.</p>
</div></section>
<section class="wrap">${calculator('', '')}</section>
${goodsSection}
<section class="section"><div class="wrap">
  <h2 class="sec-title">많이 찾는 견종</h2>
  <p class="sec-sub">견종을 누르면 나이 환산표와 관리법을 볼 수 있어요.</p>
  ${breedGrid('', popular.map((s) => breeds.find((b) => b.slug === s)).filter(Boolean))}
  <p style="text-align:center;margin-top:18px"><a class="btn ghost" href="breeds/">전체 35개 견종 →</a> <a class="btn ghost" href="chart/">나이 환산표 →</a></p>
</div></section>
<section class="section"><div class="wrap article">
  <h2>자주 묻는 질문</h2>
  ${faqHtml(faq)}
  ${cta('')}
</div></section>
</main>
${footer()}
${scripts('')}
</body>
</html>
`;
  write('index.html', html);
}

write('assets/data.js', '// 자동 생성 파일 (data/*.json → node scripts/build.js). 직접 고치지 마세요.\nwindow.BREEDS = ' + JSON.stringify(breeds) + ';\nwindow.GOODS = ' + JSON.stringify(goods) + ';\n');

const urls = [BASE, BASE + 'chart/', BASE + 'breeds/', ...breeds.map((b) => `${BASE}breeds/${b.slug}/`)];
write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `<url><loc>${u}</loc><lastmod>${TODAY}</lastmod></url>`).join('\n')}
</urlset>
`);

console.log(`페이지 ${urls.length}개 생성`);
const empty = Object.values(goods).flat().filter((g) => !g.link);
console.log(`쿠팡 파트너스 링크가 비어 있는 용품: ${empty.length}개 → data/products.json의 "link"를 채우세요.`);
