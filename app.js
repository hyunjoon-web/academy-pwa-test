/* =========================================================================
 * TDEA PWA - 설치 안내 / 홈 화면 추가 / 푸시 알림
 * ========================================================================= */

const CONFIG = {
  // PWA를 열었을 때 이동할 주소
  target: 'https://todoacademy.com/eng-jp/today',
  // 서버에서 Web Push를 보낼 때 쓰는 VAPID 공개키(없으면 구독 단계는 건너뜁니다)
  vapidPublicKey: '',
  // 구독 정보를 저장할 서버 엔드포인트
  subscribeEndpoint: '',
};


/* 안내 일러스트 (파일 분실을 막기 위해 코드 안에 넣었습니다) */
const GUIDE_SVG = {
  "android-menu.svg": "<svg preserveAspectRatio=\"xMidYMid meet\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 320 200\" role=\"img\" aria-hidden=\"true\"> <rect width=\"320\" height=\"200\" fill=\"none\"/> <rect x=\"70\" y=\"8\" width=\"180\" height=\"184\" rx=\"20\" fill=\"#ffffff\" stroke=\"#c9d4e8\" stroke-width=\"2\"/> <rect x=\"82\" y=\"20\" width=\"132\" height=\"26\" rx=\"13\" fill=\"#f1f4fa\" stroke=\"#e1e8f3\"/> <rect x=\"96\" y=\"30\" width=\"86\" height=\"6\" rx=\"3\" fill=\"#dde4f0\"/> <circle cx=\"228\" cy=\"26\" r=\"2.6\" fill=\"#2F6BFF\"/><circle cx=\"228\" cy=\"33\" r=\"2.6\" fill=\"#2F6BFF\"/><circle cx=\"228\" cy=\"40\" r=\"2.6\" fill=\"#2F6BFF\"/> <circle cx=\"228\" cy=\"33\" r=\"16\" fill=\"none\" stroke=\"#FFC53D\" stroke-width=\"2.5\"/> <!-- dropdown --> <rect x=\"136\" y=\"54\" width=\"104\" height=\"104\" rx=\"12\" fill=\"#ffffff\" stroke=\"#dde4f0\"/> <rect x=\"150\" y=\"68\" width=\"60\" height=\"6\" rx=\"3\" fill=\"#e8edf6\"/> <rect x=\"150\" y=\"86\" width=\"48\" height=\"6\" rx=\"3\" fill=\"#e8edf6\"/> <rect x=\"142\" y=\"102\" width=\"92\" height=\"26\" rx=\"8\" fill=\"#2F6BFF\" opacity=\"0.10\"/> <rect x=\"142\" y=\"102\" width=\"92\" height=\"26\" rx=\"8\" fill=\"none\" stroke=\"#FFC53D\" stroke-width=\"2.2\"/> <g stroke=\"#2F6BFF\" stroke-width=\"2.2\" fill=\"none\" stroke-linecap=\"round\"> <rect x=\"149\" y=\"108\" width=\"14\" height=\"14\" rx=\"4\"/> <path d=\"M156 111.5 v7 M152.5 115 h7\"/> </g> <rect x=\"172\" y=\"112\" width=\"54\" height=\"6\" rx=\"3\" fill=\"#2F6BFF\" opacity=\"0.5\"/> <rect x=\"150\" y=\"140\" width=\"56\" height=\"6\" rx=\"3\" fill=\"#e8edf6\"/> </svg>",
  "ios-add-confirm.svg": "<svg preserveAspectRatio=\"xMidYMid meet\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 320 200\" role=\"img\" aria-hidden=\"true\"> <defs> <linearGradient id=\"ic\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"> <stop offset=\"0\" stop-color=\"#3D7CFF\"/><stop offset=\"1\" stop-color=\"#1A4AD6\"/> </linearGradient> </defs> <rect width=\"320\" height=\"200\" fill=\"none\"/> <rect x=\"70\" y=\"8\" width=\"180\" height=\"184\" rx=\"24\" fill=\"#e9edf5\" stroke=\"#c9d4e8\" stroke-width=\"2\"/> <rect x=\"78\" y=\"34\" width=\"164\" height=\"120\" rx=\"16\" fill=\"#ffffff\" stroke=\"#dde4f0\"/> <!-- header --> <rect x=\"90\" y=\"46\" width=\"34\" height=\"7\" rx=\"3.5\" fill=\"#dfe6f1\"/> <rect x=\"186\" y=\"42\" width=\"46\" height=\"18\" rx=\"9\" fill=\"#2F6BFF\"/> <rect x=\"198\" y=\"49\" width=\"22\" height=\"5\" rx=\"2.5\" fill=\"#ffffff\" opacity=\"0.92\"/> <rect x=\"182\" y=\"38\" width=\"54\" height=\"26\" rx=\"13\" fill=\"none\" stroke=\"#FFC53D\" stroke-width=\"2.5\"/> <!-- icon + name --> <rect x=\"90\" y=\"78\" width=\"44\" height=\"44\" rx=\"11\" fill=\"url(#ic)\"/> <path d=\"M112 90 l3.6 7.6 8.4 1 -6 5.9 1.5 8.3 -7.5-4.1 -7.5 4.1 1.5-8.3 -6-5.9 8.4-1z\" fill=\"#FFC53D\"/> <rect x=\"146\" y=\"88\" width=\"72\" height=\"7\" rx=\"3.5\" fill=\"#e2e8f2\"/> <rect x=\"146\" y=\"104\" width=\"86\" height=\"6\" rx=\"3\" fill=\"#eef1f7\"/> <!-- keyboard hint --> <rect x=\"78\" y=\"164\" width=\"164\" height=\"22\" rx=\"8\" fill=\"#f1f4fa\" stroke=\"#e2e8f2\"/> </svg>",
  "ios-chrome-share.svg": "<svg preserveAspectRatio=\"xMidYMid meet\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 320 200\" role=\"img\" aria-hidden=\"true\"> <rect width=\"320\" height=\"200\" fill=\"none\"/> <rect x=\"70\" y=\"8\" width=\"180\" height=\"184\" rx=\"24\" fill=\"#ffffff\" stroke=\"#c9d4e8\" stroke-width=\"2\"/> <!-- address bar --> <rect x=\"82\" y=\"22\" width=\"156\" height=\"28\" rx=\"14\" fill=\"#f1f4fa\" stroke=\"#e1e8f3\"/> <circle cx=\"98\" cy=\"36\" r=\"5\" fill=\"#d7dfec\"/> <rect x=\"110\" y=\"33\" width=\"72\" height=\"6\" rx=\"3\" fill=\"#dde4f0\"/> <g stroke=\"#2F6BFF\" stroke-width=\"2.4\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <rect x=\"207\" y=\"35\" width=\"15\" height=\"11\" rx=\"3\"/> <path d=\"M214.5 41 V27\"/> <path d=\"M210.3 31.2 L214.5 27 l4.2 4.2\"/> </g> <circle cx=\"214.5\" cy=\"36\" r=\"17\" fill=\"none\" stroke=\"#FFC53D\" stroke-width=\"2.5\"/> <!-- page --> <rect x=\"94\" y=\"72\" width=\"88\" height=\"8\" rx=\"4\" fill=\"#dbe3f0\"/> <rect x=\"94\" y=\"92\" width=\"132\" height=\"6\" rx=\"3\" fill=\"#e8edf6\"/> <rect x=\"94\" y=\"106\" width=\"118\" height=\"6\" rx=\"3\" fill=\"#e8edf6\"/> <rect x=\"94\" y=\"120\" width=\"126\" height=\"6\" rx=\"3\" fill=\"#e8edf6\"/> <rect x=\"94\" y=\"134\" width=\"64\" height=\"6\" rx=\"3\" fill=\"#e8edf6\"/> <rect x=\"82\" y=\"160\" width=\"156\" height=\"26\" rx=\"10\" fill=\"#f3f5fa\" stroke=\"#e1e8f3\"/> </svg>",
  "ios-safari-share.svg": "<svg preserveAspectRatio=\"xMidYMid meet\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 320 200\" role=\"img\" aria-hidden=\"true\"> <defs> <linearGradient id=\"pg\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"> <stop offset=\"0\" stop-color=\"#ffffff\"/><stop offset=\"1\" stop-color=\"#eef2fa\"/> </linearGradient> </defs> <rect width=\"320\" height=\"200\" fill=\"none\"/> <!-- phone --> <rect x=\"70\" y=\"8\" width=\"180\" height=\"184\" rx=\"24\" fill=\"url(#pg)\" stroke=\"#c9d4e8\" stroke-width=\"2\"/> <rect x=\"82\" y=\"20\" width=\"156\" height=\"120\" rx=\"10\" fill=\"#ffffff\"/> <rect x=\"94\" y=\"34\" width=\"86\" height=\"8\" rx=\"4\" fill=\"#dbe3f0\"/> <rect x=\"94\" y=\"52\" width=\"132\" height=\"6\" rx=\"3\" fill=\"#e8edf6\"/> <rect x=\"94\" y=\"66\" width=\"120\" height=\"6\" rx=\"3\" fill=\"#e8edf6\"/> <rect x=\"94\" y=\"80\" width=\"128\" height=\"6\" rx=\"3\" fill=\"#e8edf6\"/> <rect x=\"94\" y=\"94\" width=\"72\" height=\"6\" rx=\"3\" fill=\"#e8edf6\"/> <!-- bottom bar --> <rect x=\"82\" y=\"146\" width=\"156\" height=\"34\" rx=\"10\" fill=\"#f3f5fa\" stroke=\"#dde4f0\"/> <path d=\"M100 157 l-7 6 7 6\" fill=\"none\" stroke=\"#9fb0c9\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/> <path d=\"M122 157 l7 6 -7 6\" fill=\"none\" stroke=\"#c6d0e0\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/> <!-- share icon highlighted --> <circle cx=\"160\" cy=\"163\" r=\"17\" fill=\"#2F6BFF\" opacity=\"0.12\"/> <g stroke=\"#2F6BFF\" stroke-width=\"2.6\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <rect x=\"152\" y=\"162\" width=\"16\" height=\"12\" rx=\"3\"/> <path d=\"M160 168 V152\"/> <path d=\"M155.5 156.5 L160 152 l4.5 4.5\"/> </g> <circle cx=\"198\" cy=\"163\" r=\"3\" fill=\"#c6d0e0\"/><circle cx=\"208\" cy=\"163\" r=\"3\" fill=\"#c6d0e0\"/><circle cx=\"218\" cy=\"163\" r=\"3\" fill=\"#c6d0e0\"/> <!-- pointer --> <circle cx=\"160\" cy=\"163\" r=\"26\" fill=\"none\" stroke=\"#FFC53D\" stroke-width=\"3\"/> <path d=\"M212 120 C238 128 238 150 190 158\" fill=\"none\" stroke=\"#FFC53D\" stroke-width=\"3\" stroke-linecap=\"round\"/> <path d=\"M196 151 l-7 8 10 3\" fill=\"none\" stroke=\"#FFC53D\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/> </svg>",
  "ios-share-sheet.svg": "<svg preserveAspectRatio=\"xMidYMid meet\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 320 200\" role=\"img\" aria-hidden=\"true\"> <rect width=\"320\" height=\"200\" fill=\"none\"/> <rect x=\"70\" y=\"8\" width=\"180\" height=\"184\" rx=\"24\" fill=\"#e9edf5\" stroke=\"#c9d4e8\" stroke-width=\"2\"/> <!-- sheet --> <rect x=\"78\" y=\"40\" width=\"164\" height=\"152\" rx=\"18\" fill=\"#ffffff\" stroke=\"#dde4f0\"/> <rect x=\"146\" y=\"50\" width=\"28\" height=\"4\" rx=\"2\" fill=\"#d5dde9\"/> <!-- app row --> <circle cx=\"102\" cy=\"76\" r=\"13\" fill=\"#eef2fa\"/><circle cx=\"134\" cy=\"76\" r=\"13\" fill=\"#eef2fa\"/> <circle cx=\"166\" cy=\"76\" r=\"13\" fill=\"#eef2fa\"/><circle cx=\"198\" cy=\"76\" r=\"13\" fill=\"#eef2fa\"/> <line x1=\"88\" y1=\"96\" x2=\"232\" y2=\"96\" stroke=\"#eef1f7\" stroke-width=\"2\"/> <!-- rows --> <rect x=\"88\" y=\"104\" width=\"18\" height=\"18\" rx=\"5\" fill=\"#e8edf6\"/> <rect x=\"116\" y=\"110\" width=\"80\" height=\"6\" rx=\"3\" fill=\"#e2e8f2\"/> <rect x=\"88\" y=\"132\" width=\"18\" height=\"18\" rx=\"5\" fill=\"#e8edf6\"/> <rect x=\"116\" y=\"138\" width=\"64\" height=\"6\" rx=\"3\" fill=\"#e2e8f2\"/> <!-- highlighted: add to home screen --> <rect x=\"82\" y=\"156\" width=\"156\" height=\"30\" rx=\"9\" fill=\"#2F6BFF\" opacity=\"0.10\"/> <rect x=\"82\" y=\"156\" width=\"156\" height=\"30\" rx=\"9\" fill=\"none\" stroke=\"#FFC53D\" stroke-width=\"2.5\"/> <g stroke=\"#2F6BFF\" stroke-width=\"2.4\" fill=\"none\" stroke-linecap=\"round\"> <rect x=\"88\" y=\"162\" width=\"18\" height=\"18\" rx=\"5\"/> <path d=\"M97 167.5 v7 M93.5 171 h7\"/> </g> <rect x=\"116\" y=\"168\" width=\"92\" height=\"7\" rx=\"3.5\" fill=\"#2F6BFF\" opacity=\"0.55\"/> </svg>",
  "open-in-browser.svg": "<svg preserveAspectRatio=\"xMidYMid meet\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 320 200\" role=\"img\" aria-hidden=\"true\"> <rect width=\"320\" height=\"200\" fill=\"none\"/> <rect x=\"70\" y=\"8\" width=\"180\" height=\"184\" rx=\"24\" fill=\"#ffffff\" stroke=\"#c9d4e8\" stroke-width=\"2\"/> <!-- in-app header with X and ... --> <rect x=\"78\" y=\"18\" width=\"164\" height=\"30\" rx=\"10\" fill=\"#f1f4fa\"/> <path d=\"M93 29 l10 10 M103 29 l-10 10\" stroke=\"#9fb0c9\" stroke-width=\"2.6\" stroke-linecap=\"round\"/> <rect x=\"118\" y=\"30\" width=\"70\" height=\"7\" rx=\"3.5\" fill=\"#dde4f0\"/> <circle cx=\"212\" cy=\"33\" r=\"2.6\" fill=\"#2F6BFF\"/><circle cx=\"220\" cy=\"33\" r=\"2.6\" fill=\"#2F6BFF\"/><circle cx=\"228\" cy=\"33\" r=\"2.6\" fill=\"#2F6BFF\"/> <circle cx=\"220\" cy=\"33\" r=\"17\" fill=\"none\" stroke=\"#FFC53D\" stroke-width=\"2.5\"/> <!-- popup menu --> <rect x=\"140\" y=\"58\" width=\"100\" height=\"70\" rx=\"12\" fill=\"#ffffff\" stroke=\"#dde4f0\"/> <rect x=\"152\" y=\"72\" width=\"56\" height=\"6\" rx=\"3\" fill=\"#e8edf6\"/> <rect x=\"146\" y=\"88\" width=\"88\" height=\"24\" rx=\"8\" fill=\"#2F6BFF\" opacity=\"0.10\"/> <rect x=\"146\" y=\"88\" width=\"88\" height=\"24\" rx=\"8\" fill=\"none\" stroke=\"#FFC53D\" stroke-width=\"2.2\"/> <g stroke=\"#2F6BFF\" stroke-width=\"2.2\" fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\"> <path d=\"M156 100 h10 M162 95 l5 5 -5 5\"/> </g> <rect x=\"176\" y=\"97\" width=\"48\" height=\"6\" rx=\"3\" fill=\"#2F6BFF\" opacity=\"0.5\"/> <!-- page bg --> <rect x=\"94\" y=\"142\" width=\"100\" height=\"6\" rx=\"3\" fill=\"#eef1f7\"/> <rect x=\"94\" y=\"156\" width=\"124\" height=\"6\" rx=\"3\" fill=\"#eef1f7\"/> </svg>"
};

/* ------------------------------------------------------------------ i18n */

const T = {
  ja: {
    tileName: 'トド英語',
    title: 'ホーム画面に追加して、<br />アプリのように使おう',
    lede: '追加すると、ブラウザを開かなくてもアイコンひとつで今日の学習に入れます。',
    install: 'ホーム画面に追加',
    howto: '追加のしかたを見る',
    openToday: '今日の学習をひらく',
    installedNote: 'アプリとして起動しています。',
    close: '閉じる',
    diag: '動作チェック',
    pushTitle: '学習リマインダー',
    pushDesc: '学習の時間になったらお知らせします。',
    pushEnable: '通知をオンにする',
    pushTest: 'テスト通知を送る',
    hintAuto: 'ボタンを押すとホーム画面に追加されます。',
    hintManual: 'このブラウザでは手順に沿って追加します。',
    hintInstalled: 'すでに追加されています。',
    notifOn: '通知はオンです',
    notifOff: '通知はまだオフです',
    notifBlocked: '通知がブロックされています。端末の設定から許可してください。',
    notifNeedInstall: 'iPhone / iPad では、ホーム画面に追加してから通知をオンにできます。',
    notifUnsupported: 'このブラウザは通知に対応していません。',
    testTitle: 'テスト通知',
    testBody: 'これが実際に届く通知の見た目です。',
  },
  ko: {
    tileName: '토도영어',
    title: '홈 화면에 추가해서<br />앱처럼 사용하세요',
    lede: '추가하면 브라우저를 열지 않아도 아이콘 하나로 오늘의 학습에 바로 들어갑니다.',
    install: '홈 화면에 추가',
    howto: '추가하는 방법 보기',
    openToday: '오늘의 학습 열기',
    installedNote: '앱으로 실행 중입니다.',
    close: '닫기',
    diag: '동작 확인',
    pushTitle: '학습 알림',
    pushDesc: '학습할 시간이 되면 알려드립니다.',
    pushEnable: '알림 켜기',
    pushTest: '테스트 알림 보내기',
    hintAuto: '버튼을 누르면 홈 화면에 추가됩니다.',
    hintManual: '이 브라우저에서는 안내에 따라 직접 추가합니다.',
    hintInstalled: '이미 추가되어 있습니다.',
    notifOn: '알림이 켜져 있습니다',
    notifOff: '알림이 아직 꺼져 있습니다',
    notifBlocked: '알림이 차단되어 있습니다. 기기 설정에서 허용해 주세요.',
    notifNeedInstall: 'iPhone / iPad는 홈 화면에 추가한 뒤에 알림을 켤 수 있습니다.',
    notifUnsupported: '이 브라우저는 알림을 지원하지 않습니다.',
    testTitle: '테스트 알림',
    testBody: '실제로 도착하는 알림의 모습입니다.',
  },
  en: {
    tileName: 'TODO Eng',
    title: 'Add it to your home screen<br />and use it like an app',
    lede: "Once added, one tap on the icon opens today's lesson without opening a browser.",
    install: 'Add to home screen',
    howto: 'See how to add it',
    openToday: "Open today's lesson",
    installedNote: 'Running as an app.',
    close: 'Close',
    diag: 'Status check',
    pushTitle: 'Study reminders',
    pushDesc: "We'll let you know when it's time to study.",
    pushEnable: 'Turn on notifications',
    pushTest: 'Send a test notification',
    hintAuto: 'Tap the button to add it to your home screen.',
    hintManual: 'In this browser you add it yourself, step by step.',
    hintInstalled: "It's already on your home screen.",
    notifOn: 'Notifications are on',
    notifOff: 'Notifications are off',
    notifBlocked: 'Notifications are blocked. Allow them in your device settings.',
    notifNeedInstall: 'On iPhone and iPad, add it to the home screen first.',
    notifUnsupported: "This browser doesn't support notifications.",
    testTitle: 'Test notification',
    testBody: 'This is how a real notification will look.',
  },
};

/* 브라우저별 안내 내용. {b}...{/b} 는 굵게 표시됩니다. */
const GUIDES = {
  'ios-safari': {
    ja: {
      title: 'Safari で追加する',
      lede: 'iPhone / iPad はボタンでの自動追加ができないため、3ステップで追加します。',
      steps: [
        { t: '画面の下にある{b}共有{/b}ボタンを押します。', img: 'ios-safari-share.svg' },
        { t: 'メニューを下にスクロールして{b}ホーム画面に追加{/b}を選びます。', img: 'ios-share-sheet.svg' },
        { t: '右上の{b}追加{/b}を押すと完成です。', img: 'ios-add-confirm.svg' },
      ],
    },
    ko: {
      title: 'Safari에서 추가하기',
      lede: 'iPhone / iPad는 버튼으로 자동 추가가 안 되기 때문에 3단계로 추가합니다.',
      steps: [
        { t: '화면 아래의 {b}공유{/b} 버튼을 누릅니다.', img: 'ios-safari-share.svg' },
        { t: '메뉴를 아래로 내려 {b}홈 화면에 추가{/b}를 선택합니다.', img: 'ios-share-sheet.svg' },
        { t: '오른쪽 위의 {b}추가{/b}를 누르면 끝입니다.', img: 'ios-add-confirm.svg' },
      ],
    },
    en: {
      title: 'Add it in Safari',
      lede: 'iPhone and iPad have no one-tap install, so it takes three steps.',
      steps: [
        { t: 'Tap the {b}Share{/b} button at the bottom of the screen.', img: 'ios-safari-share.svg' },
        { t: 'Scroll down the menu and choose {b}Add to Home Screen{/b}.', img: 'ios-share-sheet.svg' },
        { t: 'Tap {b}Add{/b} in the top right corner.', img: 'ios-add-confirm.svg' },
      ],
    },
  },

  'ios-thirdparty': {
    ja: {
      title: 'ホーム画面に追加する',
      lede: 'アドレスバーの共有ボタンから追加できます。',
      steps: [
        { t: 'アドレスバーの右にある{b}共有{/b}ボタンを押します。', img: 'ios-chrome-share.svg' },
        { t: 'メニューから{b}ホーム画面に追加{/b}を選びます。', img: 'ios-share-sheet.svg' },
        { t: '右上の{b}追加{/b}を押すと完成です。', img: 'ios-add-confirm.svg' },
      ],
      callout: 'うまくいかないときは、Safari で同じページを開いてからお試しください。',
    },
    ko: {
      title: '홈 화면에 추가하기',
      lede: '주소창의 공유 버튼에서 추가할 수 있습니다.',
      steps: [
        { t: '주소창 오른쪽의 {b}공유{/b} 버튼을 누릅니다.', img: 'ios-chrome-share.svg' },
        { t: '메뉴에서 {b}홈 화면에 추가{/b}를 선택합니다.', img: 'ios-share-sheet.svg' },
        { t: '오른쪽 위의 {b}추가{/b}를 누르면 끝입니다.', img: 'ios-add-confirm.svg' },
      ],
      callout: '잘 되지 않으면 Safari에서 같은 페이지를 열고 다시 시도해 주세요.',
    },
    en: {
      title: 'Add to home screen',
      lede: 'Use the share button in the address bar.',
      steps: [
        { t: 'Tap the {b}Share{/b} button on the right of the address bar.', img: 'ios-chrome-share.svg' },
        { t: 'Choose {b}Add to Home Screen{/b} from the menu.', img: 'ios-share-sheet.svg' },
        { t: 'Tap {b}Add{/b} in the top right corner.', img: 'ios-add-confirm.svg' },
      ],
      callout: "If it doesn't work, open the same page in Safari and try again.",
    },
  },

  'ios-unsupported': {
    ja: {
      title: 'Safari で開いてください',
      lede: 'このブラウザからはホーム画面に追加できません。',
      steps: [
        { t: '右上の{b}…{/b}または共有ボタンを押します。', img: 'open-in-browser.svg' },
        { t: '{b}Safariで開く{/b}(ブラウザで開く)を選びます。', img: null },
        { t: 'Safari が開いたら、もう一度このページの追加ボタンを押します。', img: null },
      ],
    },
    ko: {
      title: 'Safari에서 열어 주세요',
      lede: '이 브라우저에서는 홈 화면에 추가할 수 없습니다.',
      steps: [
        { t: '오른쪽 위의 {b}…{/b} 또는 공유 버튼을 누릅니다.', img: 'open-in-browser.svg' },
        { t: '{b}Safari로 열기{/b}(브라우저로 열기)를 선택합니다.', img: null },
        { t: 'Safari가 열리면 이 페이지의 추가 버튼을 다시 누릅니다.', img: null },
      ],
    },
    en: {
      title: 'Open this page in Safari',
      lede: "You can't add to the home screen from this browser.",
      steps: [
        { t: 'Tap {b}…{/b} or the share button in the top right.', img: 'open-in-browser.svg' },
        { t: 'Choose {b}Open in Safari{/b}.', img: null },
        { t: 'Once Safari opens, press the add button on this page again.', img: null },
      ],
    },
  },

  'android-menu': {
    ja: {
      title: 'ホーム画面に追加する',
      lede: 'ブラウザのメニューから追加できます。',
      steps: [
        { t: '右上の{b}⋮{/b}メニューを押します。', img: 'android-menu.svg' },
        { t: '{b}ホーム画面に追加{/b}(アプリをインストール)を選びます。', img: null },
        { t: '{b}インストール{/b}を押すと完成です。', img: null },
      ],
    },
    ko: {
      title: '홈 화면에 추가하기',
      lede: '브라우저 메뉴에서 추가할 수 있습니다.',
      steps: [
        { t: '오른쪽 위 {b}⋮{/b} 메뉴를 누릅니다.', img: 'android-menu.svg' },
        { t: '{b}홈 화면에 추가{/b}(앱 설치)를 선택합니다.', img: null },
        { t: '{b}설치{/b}를 누르면 끝입니다.', img: null },
      ],
    },
    en: {
      title: 'Add to home screen',
      lede: 'Use the browser menu.',
      steps: [
        { t: 'Tap the {b}⋮{/b} menu in the top right.', img: 'android-menu.svg' },
        { t: 'Choose {b}Add to Home screen{/b} (or Install app).', img: null },
        { t: 'Tap {b}Install{/b}.', img: null },
      ],
    },
  },

  'android-inapp': {
    ja: {
      title: 'ブラウザで開いてください',
      lede: 'アプリの中のブラウザからはホーム画面に追加できません。',
      steps: [
        { t: '右上の{b}…{/b}メニューを押します。', img: 'open-in-browser.svg' },
        { t: '{b}ブラウザで開く{/b}(Chromeで開く)を選びます。', img: null },
        { t: 'Chrome が開いたら、もう一度追加ボタンを押します。', img: null },
      ],
    },
    ko: {
      title: '브라우저에서 열어 주세요',
      lede: '앱 안의 브라우저에서는 홈 화면에 추가할 수 없습니다.',
      steps: [
        { t: '오른쪽 위 {b}…{/b} 메뉴를 누릅니다.', img: 'open-in-browser.svg' },
        { t: '{b}브라우저로 열기{/b}(Chrome으로 열기)를 선택합니다.', img: null },
        { t: 'Chrome이 열리면 추가 버튼을 다시 누릅니다.', img: null },
      ],
    },
    en: {
      title: 'Open in a browser',
      lede: "In-app browsers can't add to the home screen.",
      steps: [
        { t: 'Tap the {b}…{/b} menu in the top right.', img: 'open-in-browser.svg' },
        { t: 'Choose {b}Open in browser{/b}.', img: null },
        { t: 'Once Chrome opens, press the add button again.', img: null },
      ],
    },
  },

  desktop: {
    ja: {
      title: 'パソコンにインストールする',
      lede: 'アドレスバーの右にあるインストールアイコンから追加できます。',
      steps: [
        { t: 'アドレスバーの右端にある{b}インストール{/b}アイコンを押します。', img: null },
        { t: '見つからないときは{b}⋮{/b}メニュー →{b}アプリ{/b}→{b}このサイトをインストール{/b}を選びます。', img: null },
        { t: '{b}インストール{/b}を押すと、デスクトップにアイコンができます。', img: null },
      ],
    },
    ko: {
      title: '컴퓨터에 설치하기',
      lede: '주소창 오른쪽의 설치 아이콘에서 추가할 수 있습니다.',
      steps: [
        { t: '주소창 오른쪽 끝의 {b}설치{/b} 아이콘을 누릅니다.', img: null },
        { t: '보이지 않으면 {b}⋮{/b} 메뉴 → {b}캐스트, 저장 및 공유{/b} 또는 {b}앱{/b} → {b}페이지를 앱으로 설치{/b}를 선택합니다.', img: null },
        { t: '{b}설치{/b}를 누르면 바탕화면에 아이콘이 생깁니다.', img: null },
      ],
    },
    en: {
      title: 'Install on your computer',
      lede: 'Use the install icon at the right of the address bar.',
      steps: [
        { t: 'Click the {b}Install{/b} icon at the end of the address bar.', img: null },
        { t: "If you can't see it, open the {b}⋮{/b} menu → {b}Apps{/b} → {b}Install this site as an app{/b}.", img: null },
        { t: 'Click {b}Install{/b} and the icon appears on your desktop.', img: null },
      ],
    },
  },

  'desktop-safari': {
    ja: {
      title: 'Mac の Safari で追加する',
      lede: 'Dock に追加できます。',
      steps: [
        { t: 'メニューバーの{b}ファイル{/b}を開きます。', img: null },
        { t: '{b}Dock に追加{/b}を選びます。', img: null },
        { t: '名前を確認して{b}追加{/b}を押します。', img: null },
      ],
      callout: 'macOS Sonoma(14)以降で使えます。',
    },
    ko: {
      title: 'Mac Safari에서 추가하기',
      lede: 'Dock에 추가할 수 있습니다.',
      steps: [
        { t: '메뉴 막대에서 {b}파일{/b}을 엽니다.', img: null },
        { t: '{b}Dock에 추가{/b}를 선택합니다.', img: null },
        { t: '이름을 확인하고 {b}추가{/b}를 누릅니다.', img: null },
      ],
      callout: 'macOS Sonoma(14) 이상에서 사용할 수 있습니다.',
    },
    en: {
      title: 'Add it from Safari on Mac',
      lede: 'You can add it to the Dock.',
      steps: [
        { t: 'Open {b}File{/b} in the menu bar.', img: null },
        { t: 'Choose {b}Add to Dock{/b}.', img: null },
        { t: 'Check the name and click {b}Add{/b}.', img: null },
      ],
      callout: 'Available on macOS Sonoma (14) and later.',
    },
  },

  'desktop-firefox': {
    ja: {
      title: 'このブラウザは非対応です',
      lede: 'Firefox はホーム画面へのインストールに対応していません。',
      steps: [
        { t: '{b}Chrome{/b} または {b}Microsoft Edge{/b} でこのページを開きます。', img: null },
        { t: 'アドレスバーの{b}インストール{/b}アイコンを押します。', img: null },
      ],
    },
    ko: {
      title: '이 브라우저는 지원하지 않습니다',
      lede: 'Firefox는 앱 설치를 지원하지 않습니다.',
      steps: [
        { t: '{b}Chrome{/b} 또는 {b}Microsoft Edge{/b}로 이 페이지를 엽니다.', img: null },
        { t: '주소창의 {b}설치{/b} 아이콘을 누릅니다.', img: null },
      ],
    },
    en: {
      title: 'This browser is not supported',
      lede: "Firefox can't install web apps.",
      steps: [
        { t: 'Open this page in {b}Chrome{/b} or {b}Microsoft Edge{/b}.', img: null },
        { t: 'Click the {b}Install{/b} icon in the address bar.', img: null },
      ],
    },
  },
};

/* -------------------------------------------------------------- detection */

function detect() {
  const ua = navigator.userAgent;
  const touch = navigator.maxTouchPoints || 0;

  const isIPadOS = /Macintosh/.test(ua) && touch > 1;
  const isIOS = /iPhone|iPad|iPod/.test(ua) || isIPadOS;
  const isAndroid = /Android/.test(ua);
  const isMac = /Macintosh/.test(ua) && !isIPadOS;
  const isWindows = /Windows NT/.test(ua);

  // 앱 안에서 열린 브라우저(인앱 브라우저)
  const inApp =
    /Line\//i.test(ua) ||
    /KAKAOTALK/i.test(ua) ||
    /Instagram/i.test(ua) ||
    /FBAN|FBAV|FB_IAB/i.test(ua) ||
    /Twitter/i.test(ua) ||
    /NAVER\(inapp/i.test(ua) ||
    /DaumApps/i.test(ua) ||
    (isAndroid && /; wv\)/.test(ua));

  let browser = 'unknown';
  if (isIOS) {
    if (/CriOS/.test(ua)) browser = 'chrome';
    else if (/EdgiOS/.test(ua)) browser = 'edge';
    else if (/FxiOS/.test(ua)) browser = 'firefox';
    else if (/OPiOS|OPT\//.test(ua)) browser = 'opera';
    else browser = 'safari';
  } else if (isAndroid) {
    if (/SamsungBrowser/.test(ua)) browser = 'samsung';
    else if (/EdgA/.test(ua)) browser = 'edge';
    else if (/Firefox/.test(ua)) browser = 'firefox';
    else if (/Whale/.test(ua)) browser = 'whale';
    else if (/Chrome/.test(ua)) browser = 'chrome';
  } else {
    if (/Edg\//.test(ua)) browser = 'edge';
    else if (/Firefox/.test(ua)) browser = 'firefox';
    else if (/Whale/.test(ua)) browser = 'whale';
    else if (/Chrome/.test(ua)) browser = 'chrome';
    else if (/Safari/.test(ua)) browser = 'safari';
  }

  const os = isIOS ? (/iPad/.test(ua) || isIPadOS ? 'iPadOS' : 'iOS')
    : isAndroid ? 'Android'
    : isWindows ? 'Windows'
    : isMac ? 'macOS'
    : 'Other';

  const standalone =
    window.matchMedia('(display-mode: standalone)').matches ||
    window.matchMedia('(display-mode: fullscreen)').matches ||
    window.navigator.standalone === true;

  return { ua, os, browser, isIOS, isAndroid, isMac, isWindows, inApp, standalone };
}

function guideKeyFor(env) {
  if (env.isIOS) {
    if (env.inApp || env.browser === 'firefox' || env.browser === 'opera') return 'ios-unsupported';
    if (env.browser === 'safari') return 'ios-safari';
    return 'ios-thirdparty';
  }
  if (env.isAndroid) {
    if (env.inApp) return 'android-inapp';
    return 'android-menu';
  }
  if (env.browser === 'firefox') return 'desktop-firefox';
  if (env.browser === 'safari') return 'desktop-safari';
  return 'desktop';
}

/* --------------------------------------------------------------- 상태 */

const env = detect();
let lang = pickLang();
let deferredPrompt = null;
let swReg = null;

function pickLang() {
  const saved = localStorage.getItem('tdea-lang');
  if (saved && T[saved]) return saved;
  const nav = (navigator.language || 'ja').toLowerCase();
  if (nav.startsWith('ko')) return 'ko';
  if (nav.startsWith('ja')) return 'ja';
  return 'en';
}

/* --------------------------------------------------------------- 렌더링 */

const $ = (sel) => document.querySelector(sel);

function applyLang() {
  const t = T[lang];
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n;
    if (t[key] !== undefined) el.innerHTML = t[key];
  });
  document.querySelectorAll('.langbar button').forEach((b) => {
    b.setAttribute('aria-pressed', String(b.dataset.lang === lang));
  });
  updateHint();
  updatePushStatus();
  renderDiag();
}

function updateHint() {
  const t = T[lang];
  if (env.standalone) $('#hint').textContent = t.hintInstalled;
  else if (deferredPrompt) $('#hint').textContent = t.hintAuto;
  else $('#hint').textContent = t.hintManual;
}

function esc(s) {
  return s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
}

function fmt(s) {
  return esc(s).replace(/\{b\}/g, '<b>').replace(/\{\/b\}/g, '</b>');
}

function openGuide() {
  const key = guideKeyFor(env);
  const g = (GUIDES[key] && GUIDES[key][lang]) || GUIDES[key].ja;

  $('#guideTitle').textContent = g.title;
  $('#guideLede').textContent = g.lede;

  $('#guideCallout').innerHTML = g.callout
    ? `<div class="callout"><svg width="18" height="18" viewBox="0 0 24 24" fill="none"
         stroke="#9a6300" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/>
         <path d="M12 8v5M12 16.5v.01"/></svg><div>${esc(g.callout)}</div></div>`
    : '';

  $('#guideSteps').innerHTML = g.steps
    .map(
      (s) =>
        `<li><div class="head"><p>${fmt(s.t)}</p></div>` +
        (s.img && GUIDE_SVG[s.img] ? `<figure>${GUIDE_SVG[s.img]}</figure>` : '') +
        `</li>`
    )
    .join('');

  const dlg = $('#guide');
  if (typeof dlg.showModal === 'function') dlg.showModal();
  else dlg.setAttribute('open', '');
}

/* --------------------------------------------------------------- 설치 */

window.addEventListener('beforeinstallprompt', (e) => {
  // 브라우저 기본 배너를 막고, 우리 버튼에 연결합니다.
  e.preventDefault();
  deferredPrompt = e;
  updateHint();
  renderDiag();
});

window.addEventListener('appinstalled', () => {
  deferredPrompt = null;
  updateHint();
  renderDiag();
});

$('#installBtn').addEventListener('click', async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') deferredPrompt = null;
    updateHint();
    renderDiag();
    return;
  }
  openGuide();
});

$('#guideBtn').addEventListener('click', openGuide);
$('#guideClose').addEventListener('click', () => $('#guide').close());
$('#guide').addEventListener('click', (e) => {
  if (e.target.id === 'guide') $('#guide').close();
});

$('#openBtn').setAttribute('href', CONFIG.target);

document.querySelectorAll('.langbar button').forEach((b) => {
  b.addEventListener('click', () => {
    lang = b.dataset.lang;
    localStorage.setItem('tdea-lang', lang);
    applyLang();
  });
});

if (env.standalone) {
  // 앱으로 실행된 경우: 설치 안내는 숨기고 학습 페이지로 넘어갑니다.
  $('#beforeInstall').classList.add('hidden');
  $('#standaloneNote').classList.remove('hidden');

  // ?stay=1 을 붙이면 자동 이동 없이 이 화면에 머뭅니다(디버그용).
  const stay = new URLSearchParams(location.search).has('stay');
  if (!stay) setTimeout(() => location.replace(CONFIG.target), 400);
}

/* ------------------------------------------------------- 서비스 워커 */

if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      swReg = await navigator.serviceWorker.register('./sw.js', { scope: './' });
      renderDiag();
    } catch (err) {
      console.error('[sw] 등록 실패', err);
      renderDiag();
    }
  });
}

/* --------------------------------------------------------------- 알림 */

function notifSupported() {
  return 'Notification' in window && 'serviceWorker' in navigator && 'PushManager' in window;
}

function updatePushStatus() {
  const t = T[lang];
  const box = $('#pushStatus');
  const enableBtn = $('#pushBtn');
  const testBtn = $('#pushTestBtn');
  let cls = 'status';
  let text;

  // 매번 초기 상태로 되돌린 뒤 다시 판단합니다.
  enableBtn.disabled = false;
  enableBtn.classList.remove('hidden');
  testBtn.classList.remove('hidden');

  if (!notifSupported()) {
    // iOS는 홈 화면에 추가하기 전에는 PushManager가 없습니다.
    text = env.isIOS && !env.standalone ? t.notifNeedInstall : t.notifUnsupported;
    cls += ' warn';
    enableBtn.disabled = true;
    testBtn.classList.add('hidden');
  } else {
    const p = Notification.permission;
    if (p === 'granted') {
      text = t.notifOn;
      cls += ' ok';
      enableBtn.classList.add('hidden');
    } else if (p === 'denied') {
      text = t.notifBlocked;
      cls += ' no';
      enableBtn.disabled = true;
      testBtn.classList.add('hidden');
    } else {
      text = t.notifOff;
      testBtn.classList.add('hidden');
    }
  }

  box.innerHTML = `<span class="${cls}"><i></i>${esc(text)}</span>`;
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const raw = atob(base64);
  return Uint8Array.from([...raw].map((c) => c.charCodeAt(0)));
}

async function subscribePush() {
  if (!CONFIG.vapidPublicKey) {
    console.info('[push] VAPID 공개키가 없어 구독은 건너뜁니다. 로컬 알림만 확인할 수 있습니다.');
    return null;
  }
  const reg = swReg || (await navigator.serviceWorker.ready);
  const sub = await reg.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(CONFIG.vapidPublicKey),
  });
  if (CONFIG.subscribeEndpoint) {
    await fetch(CONFIG.subscribeEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sub),
    });
  }
  console.info('[push] 구독 완료', JSON.stringify(sub));
  return sub;
}

$('#pushBtn').addEventListener('click', async () => {
  // 권한 요청은 반드시 사용자의 탭/클릭 안에서 호출해야 합니다(특히 iOS).
  const permission = await Notification.requestPermission();
  if (permission === 'granted') {
    try { await subscribePush(); } catch (e) { console.error('[push] 구독 실패', e); }
  }
  updatePushStatus();
  renderDiag();
});

$('#pushTestBtn').addEventListener('click', async () => {
  const t = T[lang];
  const reg = swReg || (await navigator.serviceWorker.ready);
  reg.showNotification(t.testTitle, {
    body: t.testBody,
    icon: './icon-192.png',
    badge: './icon-192.png',
    data: { url: CONFIG.target },
  });
});

/* --------------------------------------------------------------- 진단 */

// manifest 가 실제로 내려오는지 확인합니다(파일 누락 시 설치가 안 되는 원인 1순위).
let manifestState = 'checking...';
(async () => {
  const link = document.querySelector('link[rel="manifest"]');
  if (!link) { manifestState = 'link 없음'; renderDiag(); return; }
  try {
    const res = await fetch(link.href, { cache: 'no-store' });
    if (!res.ok) { manifestState = 'HTTP ' + res.status; renderDiag(); return; }
    const m = await res.json();
    manifestState = 'OK (start_url: ' + (m.start_url || '-') + ')';
  } catch (e) {
    manifestState = '읽기 실패';
  }
  renderDiag();
})();

function renderDiag() {
  const rows = [
    ['OS', env.os],
    ['Browser', env.browser + (env.inApp ? ' (in-app)' : '')],
    ['display-mode', env.standalone ? 'standalone' : 'browser'],
    ['HTTPS', location.protocol === 'https:' || location.hostname === 'localhost' ? 'OK' : 'NG'],
    ['Service Worker', swReg ? 'registered' : 'serviceWorker' in navigator ? 'pending' : 'unsupported'],
    ['beforeinstallprompt', deferredPrompt ? 'ready' : 'no'],
    ['PushManager', 'PushManager' in window ? 'yes' : 'no'],
    ['Notification', 'Notification' in window ? Notification.permission : 'unsupported'],
    ['Manifest', manifestState],
    ['Guide', guideKeyFor(env)],
    ['Target', CONFIG.target],
  ];
  $('#diagList').innerHTML = rows
    .map(([k, v]) => {
      const s = String(v);
      const bad = /^(NG|no|unsupported|denied|HTTP |link 없음|읽기 실패)/.test(s);
      return `<div><dt>${esc(k)}</dt><dd class="${bad ? 'bad' : ''}">${esc(s)}</dd></div>`;
    })
    .join('');
}

applyLang();
