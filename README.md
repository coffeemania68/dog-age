# 강아지 나이 계산기 (dog-age)

강아지 나이를 견종 크기에 맞춰 사람 나이로 바꿔 주는 정적 사이트. GitHub Pages: https://coffeemania68.github.io/dog-age/

## 고치는 법
상품 이름·쿠팡 링크는 스레드 자동발행 앱(localhost:8787)의 **🎁 내 사이트 상품** 화면에서 쿠팡 검색으로 바로 넣는 게 제일 쉽다.
`data/` 파일이 바뀌면 `.github/workflows/build.yml`이 빌드까지 해서 올린다 (2~3분). GitHub 웹에서 직접 고쳐도 똑같다.

1. 견종: `data/breeds.json` (이름, 주소용 slug, 크기 small/medium/large/giant, 수명, 사진, 특성 점수, 설명)
2. 나이대별 용품: `data/products.json` (puppy / young / adult / senior)
   - `link`에 쿠팡 파트너스 링크를 넣는다. **비어 있으면 쿠팡 검색으로 연결되고 수수료가 붙지 않는다.**
3. 빌드: `node scripts/build.js` → `index.html`, `breeds/`(견종 35개 + 목록), `chart/`, `assets/data.js`, `sitemap.xml` 다시 생성
4. 검사: `node scripts/check-links.js`
5. 커밋·푸시하면 Pages에 반영된다.

## 계산 기준
1살 = 15세, 2살 = 24세, 이후 1년마다 소형 4 / 중형 5 / 대형 6 / 초대형 7세 (AVMA 안내 기반 근사치). `assets/age.js`

## 파일
- `assets/age.js` 나이 계산 (브라우저·빌드 공용)
- `assets/app.js` 계산기 화면
- `assets/style.css` 디자인
- `scripts/art.html` 아이콘·공유 이미지 원본
- `breed-detail.html` 옛 주소 → 새 견종 페이지로 이동
