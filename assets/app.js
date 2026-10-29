// 나이 계산기 화면. window.BREEDS, window.GOODS(assets/data.js)와 window.DogAge(assets/age.js)를 쓴다.
(function () {
  var A = window.DogAge;
  var breeds = window.BREEDS || [];
  var goods = window.GOODS || {};
  var form = document.getElementById('calc');
  if (!form) return;

  var $ = function (id) { return document.getElementById(id); };
  var breedSel = $('breed');
  var yearsIn = $('years');
  var monthsIn = $('months');
  var sizeChips = form.querySelector('[data-key="size"]');
  var state = { size: '' };

  breeds.slice().sort(function (a, b) { return a.name.localeCompare(b.name, 'ko'); }).forEach(function (b) {
    var o = document.createElement('option');
    o.value = b.slug;
    o.textContent = b.name;
    breedSel.appendChild(o);
  });

  function setSize(s) {
    state.size = s;
    sizeChips.querySelectorAll('.chip').forEach(function (c) { c.setAttribute('aria-pressed', String(c.dataset.value === s)); });
  }

  breedSel.addEventListener('change', function () {
    var b = find(breedSel.value);
    if (b) setSize(b.size);
  });
  sizeChips.addEventListener('click', function (e) {
    var c = e.target.closest('.chip');
    if (c) setSize(c.dataset.value);
  });

  function find(slug) { return breeds.filter(function (b) { return b.slug === slug; })[0]; }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }

  // 시작 값: 주소 → 페이지 기본 품종
  var q = new URLSearchParams(location.search);
  var startBreed = q.get('b') || form.dataset.breed || '';
  if (startBreed && find(startBreed)) { breedSel.value = startBreed; setSize(find(startBreed).size); }
  if (q.get('s')) setSize(q.get('s'));
  if (q.get('y')) yearsIn.value = q.get('y');
  if (q.get('m')) monthsIn.value = q.get('m');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    render(true);
  });

  function render(scroll) {
    var y = parseInt(yearsIn.value || '0', 10);
    var m = parseInt(monthsIn.value || '0', 10);
    var years = y + m / 12;
    var b = find(breedSel.value);
    var size = state.size || (b && b.size) || '';
    if (!size) { toast('품종이나 크기를 골라 주세요'); return; }
    if (!(years > 0) || years > 25) { toast('나이를 입력해 주세요 (최대 25살)'); return; }

    var human = Math.round(A.humanAge(years, size));
    var st = A.stage(years, size);
    var S = A.SIZES[size];
    var life = b ? A.lifespanRange(b.lifespan) : { min: { small: 13, medium: 12, large: 10, giant: 8 }[size], max: { small: 16, medium: 14, large: 12, giant: 10 }[size] };
    var pct = Math.min(100, Math.round((years / life.max) * 100));
    var ageText = y + '살' + (m ? ' ' + m + '개월' : '');
    var name = b ? b.name : S.label;

    var pic = b && b.image ? '<img src="' + esc(b.image) + '" alt="' + esc(b.name) + '">' : '🐶';
    var html = '<div class="hero-card"><div class="pic">' + pic + '</div><div>' +
      '<div class="who">' + esc(name) + ' · ' + esc(ageText) + '</div>' +
      '<div class="big">사람 나이 ' + human + '<small>세</small></div>' +
      '<div class="badges"><span class="badge hot">' + st.label + '</span><span class="badge">' + S.label + ' 기준</span></div></div></div>';

    html += '<div class="cards"><div class="info"><h3>평균 수명 ' + life.min + '~' + life.max + '년</h3>' +
      '<div class="bar"><i style="width:' + pct + '%"></i></div><p>' +
      (pct < 100 ? '평균 수명의 약 ' + pct + '%를 지나고 있어요.' : '평균 수명을 넘겼어요. 지금처럼 건강하게 오래 함께해요.') + '</p></div>';
    html += '<div class="info"><h3>지금 시기에 챙길 것</h3><p>' + stageTip(st.key, S) + '</p></div>';
    if (b) {
      html += '<div class="info"><h3>산책</h3><p>' + esc(b.walkingTip) + '</p></div>';
      html += '<div class="info"><h3>건강 관리</h3><p>' + esc(b.healthNote) + '</p></div>';
      var labels = { exercise: '운동량', grooming: '털 관리', training: '훈련 난이도', health: '건강 관리', social: '사회성' };
      html += '<div class="info" style="grid-column:1/-1"><h3>' + esc(b.name) + ' 특성</h3><div class="stats">' +
        Object.keys(labels).map(function (k) {
          return '<div class="stat"><span>' + labels[k] + '</span><div class="bar"><i style="width:' + b.stats[k] * 10 + '%"></i></div><b>' + b.stats[k] + '</b></div>';
        }).join('') + '</div></div>';
    }
    html += '</div><div class="share"><button type="button" class="btn ghost" id="share">🔗 결과 공유하기</button>' +
      (b && b.slug !== form.dataset.breed ? '<a class="btn ghost" href="' + form.dataset.root + 'breeds/' + b.slug + '/">' + esc(b.name) + ' 나이표 보기 →</a>' : '') + '</div>';

    var out = $('result');
    out.innerHTML = html;
    out.hidden = false;
    $('share').addEventListener('click', share);

    renderGoods(st);

    var p = new URLSearchParams();
    if (b) p.set('b', b.slug); else p.set('s', size);
    p.set('y', y);
    if (m) p.set('m', m);
    history.replaceState(null, '', location.pathname + '?' + p);
    if (scroll) out.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function stageTip(key, S) {
    return {
      puppy: '예방접종과 배변·사회화 훈련이 가장 중요한 시기예요. 이갈이 장난감을 준비해 주세요.',
      young: '에너지가 가장 많은 시기예요. 산책과 노즈워크로 힘을 충분히 쓰게 해 주세요.',
      adult: '1년에 한 번 건강검진, 매일 양치가 기본이에요. 체중이 늘지 않게 사료량을 확인하세요.',
      senior: S.label + '은 보통 ' + S.senior + '살부터 노령기예요. 6개월마다 검진하고 관절과 치아를 챙겨 주세요.'
    }[key];
  }

  function renderGoods(st) {
    var box = $('goods');
    if (!box) return;
    var list = goods[st.key] || [];
    $('goods-title').textContent = st.label + '에 많이 준비하는 용품';
    box.innerHTML = list.map(function (g) {
      var link = g.link || 'https://www.coupang.com/np/search?q=' + encodeURIComponent(g.q || g.name);
      return '<div class="good"><div class="em">' + g.emoji + '</div><h3>' + esc(g.name) + '</h3><p>' + esc(g.why) + '</p>' +
        '<a href="' + esc(link) + '" target="_blank" rel="sponsored noopener">쿠팡에서 보기</a></div>';
    }).join('');
    $('goods-section').hidden = false;
  }

  function share() {
    var url = location.href;
    if (navigator.share) navigator.share({ title: document.title, url: url }).catch(function () {});
    else if (navigator.clipboard) navigator.clipboard.writeText(url).then(function () { toast('링크를 복사했어요'); });
  }

  function toast(msg) {
    var t = document.querySelector('.toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(function () { t.classList.remove('show'); }, 1800);
  }

  if (q.get('y')) render(false);
})();
