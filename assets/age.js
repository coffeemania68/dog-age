// 강아지 나이 → 사람 나이 계산. 브라우저(window.DogAge)와 빌드 스크립트(require) 공용.
// 기준: 1살 = 사람 15세, 2살 = 24세, 이후 1년마다 소형 4 / 중형 5 / 대형 6 / 초대형 7세 (미국수의사회 AVMA 안내 기반 근사치)
(function (root) {
  var SIZES = {
    small: { label: '소형견', perYear: 4, senior: 10, weight: '10kg 이하' },
    medium: { label: '중형견', perYear: 5, senior: 8, weight: '10~25kg' },
    large: { label: '대형견', perYear: 6, senior: 7, weight: '25~45kg' },
    giant: { label: '초대형견', perYear: 7, senior: 6, weight: '45kg 이상' }
  };

  function humanAge(years, size) {
    var s = SIZES[size] || SIZES.medium;
    if (years <= 0) return 0;
    if (years < 1) return Math.round(years * 15 * 10) / 10;
    if (years < 2) return Math.round((15 + (years - 1) * 9) * 10) / 10;
    return Math.round((24 + (years - 2) * s.perYear) * 10) / 10;
  }

  // UCSD 2020 연구(래브라도 대상) 후성유전 공식. 참고용.
  function dnaAge(years) {
    if (years < 1) return null;
    return Math.round(16 * Math.log(years) + 31);
  }

  function stage(years, size) {
    var s = SIZES[size] || SIZES.medium;
    var puppyEnd = size === 'giant' ? 1.5 : 1;
    if (years < puppyEnd) return { key: 'puppy', label: '퍼피(성장기)' };
    if (years < 3) return { key: 'young', label: '청년기' };
    if (years < s.senior) return { key: 'adult', label: '성견기' };
    return { key: 'senior', label: '노령기(시니어)' };
  }

  function lifespanRange(text) {
    var p = String(text).split('-').map(Number);
    return { min: p[0], max: p[1] || p[0] };
  }

  var api = { SIZES: SIZES, humanAge: humanAge, dnaAge: dnaAge, stage: stage, lifespanRange: lifespanRange };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.DogAge = api;
})(this);
