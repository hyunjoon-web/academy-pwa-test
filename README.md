# TDEA PWA — 홈 화면에 추가 (flat 구조)

하위 폴더가 없습니다. **아래 9개 파일을 저장소 루트에 그대로 올리면** 동작합니다.

```
index.html
app.js
sw.js
manifest.webmanifest
icon-192.png
icon-512.png
icon-maskable-512.png
apple-touch-icon-180.png
favicon-32.png
```

선택: `README.md`, `manifest.production.webmanifest`, `.nojekyll`

안내 일러스트는 `app.js` 안에 SVG 코드로 들어가 있어서 이미지 파일이 따로 필요 없습니다.

## 올릴 때 확인할 것

1. **`manifest.webmanifest` 가 반드시 있어야 합니다.** 이 파일이 없으면 브라우저가
   "설치 가능한 앱"으로 인식하지 못하고, 설치 버튼이 자동 설치 대신 가이드 팝업만 띄웁니다.
2. 저장소에 있는 **옛 `manifest.json` 은 지우세요.** 지금은 쓰지 않습니다.
3. `tdea-pwa.zip` 같은 압축 파일도 지우는 게 깔끔합니다.
4. 이미 설치해 본 적이 있다면 **기존 앱을 먼저 삭제**하고 다시 설치하세요.
   설치된 앱은 설치 당시의 manifest를 그대로 들고 있어서 새 설정이 반영되지 않습니다.

## 파일이 잘 올라갔는지 1초 만에 확인하기

`https://<계정>.github.io/<저장소>/manifest.webmanifest` 에 직접 접속해 보세요.
JSON이 보이면 정상, 404 페이지가 나오면 파일이 빠진 것입니다.

페이지 하단 **동작 체크** 패널에도 `Manifest` 항목이 추가되어 있습니다.
`OK (start_url: ...)` 로 나와야 정상이고, `HTTP 404` 면 파일 누락입니다.

## PWA를 열었을 때의 동작

- `start_url` 은 `./index.html?app=1` 입니다.
- 앱 모드로 열리면 `app.js` 가 이를 감지해 `https://todoacademy.com/eng-jp/today` 로 자동 이동합니다.
- 자동 이동을 끄고 화면을 보고 싶으면 주소 끝에 `?stay=1` 을 붙이세요.
- 설치 여부와 상관없이 **今日の学習をひらく(오늘의 학습 열기)** 버튼이 항상 보입니다.

GitHub Pages는 `github.io` 도메인이라 `todoacademy.com` 으로 넘어가는 순간
**상단에 주소 표시줄이 남습니다.** 주소 표시줄 없는 전체 화면은 실서비스 도메인에 올려야 나옵니다.

## todoacademy.com 에 올릴 때

1. `manifest.production.webmanifest` → `manifest.webmanifest` 로 교체
2. `sw.js` 를 사이트 최상위(`/sw.js`)에 배치 — 서비스 워커는 자기가 놓인 경로 아래만 제어합니다
3. 아이콘을 실제 브랜드 아이콘으로 교체 (192 / 512 / maskable 512 / apple-touch 180)
4. `app.js` 의 `CONFIG.target` 확인

실서비스에서는 `start_url` 이 `/eng-jp/today` 이므로 중간 이동 없이 바로 열립니다.

## 브라우저별 동작

| 환경 | 버튼 한 번에 설치 | 처리 방식 |
|---|---|---|
| Android Chrome / Edge / Samsung | O | `beforeinstallprompt` |
| Windows · macOS Chrome / Edge | O | `beforeinstallprompt` |
| macOS Safari | X | 파일 → Dock에 추가 (Sonoma 이상) |
| iOS / iPadOS Safari | X | 공유 → 홈 화면에 추가 (일러스트 가이드) |
| iOS / iPadOS Chrome · Edge | X | 주소창 공유 → 홈 화면에 추가 (일러스트 가이드) |
| iOS Firefox, 인앱 브라우저(LINE 등) | X | Safari로 열도록 안내 |
| Android 인앱 브라우저 | X | 외부 브라우저로 열도록 안내 |
| Firefox (데스크톱) | X | Chrome/Edge 사용 안내 |

## 푸시 알림

1. `npx web-push generate-vapid-keys` 로 키 생성
2. 공개키를 `app.js` 의 `CONFIG.vapidPublicKey` 에 입력
3. 구독 정보를 받을 서버 API 주소를 `CONFIG.subscribeEndpoint` 에 입력
4. 서버는 구독 정보를 사용자 계정과 함께 저장하고, `web-push` 로 발송
5. 응답이 404/410이면 만료된 구독이므로 DB에서 삭제

iOS는 16.4 이상, 그리고 **홈 화면에 추가한 아이콘으로 실행했을 때만** 푸시가 동작합니다.
권한 요청은 반드시 사용자의 탭/클릭 안에서 호출해야 합니다.
