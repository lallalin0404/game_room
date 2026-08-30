# 🎮 遊戲空間

私人遊戲室，進站需要**登入**，內含 11 款遊戲。使用 **Firebase Authentication（電子郵件/密碼）** 擋門，並部署在 **Firebase Hosting**。成績仍存在瀏覽器 localStorage。

## 登入方式

不再使用寫死的密碼。改由 Firebase Authentication 管理帳號，密碼不會出現在原始碼裡。

> 注意：Firebase Hosting 的檔案本身是公開的，這是**前端登入閘門**——比原本寫死密碼安全很多（真實帳號、密碼經雜湊、原始碼看不到密碼），足以當私人遊戲室使用。若要做到伺服器端完全擋住檔案，需再加 Cloud Functions / App Check。

## 一次性設定（Firebase）

1. 到 <https://console.firebase.google.com> 建立一個專案。
2. 專案裡「Build → Authentication → Sign-in method」開啟 **電子郵件/密碼**。
3. 到「Authentication → Users → Add user」新增要能登入的帳號（Email + 密碼）。
4. 「專案設定 → 一般 → 你的應用程式」新增一個 **Web app**，複製 `firebaseConfig`，
   貼到 `js/firebase-config.js`（取代裡面的 `PASTE_YOUR_...`）。
5. 把 `.firebaserc` 裡的 `PASTE_YOUR_PROJECT_ID` 換成你的專案 ID。

## 部署到 Firebase Hosting

```bash
# 安裝 Firebase CLI（只需一次）
npm install -g firebase-tools

# 登入 Google 帳號
firebase login

# 在專案資料夾內部署
firebase deploy --only hosting
```

部署完成後，CLI 會顯示你的網址（例如 `https://你的專案.web.app`）。
打開後需用步驟 3 建立的帳號登入才能進大廳與遊戲。

新增/刪除可登入的人，直接到 Firebase Console 的 Authentication → Users 管理即可。

## 遊戲清單

| 遊戲 | 說明 |
| --- | --- |
| 💣 踩地雷 | 三種難度，首擊保證安全，右鍵/長按插旗 |
| 👑 Queens | 每行、列、顏色區各一個皇冠，且不相鄰 |
| 🔢 數獨 | 自動產生唯一解題目，含檢查與提示 |
| 🐍 貪食蛇 | 三種速度，方向鍵/WASD/觸控 |
| 🧱 俄羅斯方塊 | 7 種方塊、消行計分、等級加速 |
| 🎨 數格子 (Nonogram) | 依行列數字推理塗出圖案 |
| 🃏 記憶翻牌 | 翻牌配對，記錄最少步數 |
| 🌙 Tango | 月亮/太陽各半、不可連三、= 與 × 約束 |
| 🧊 打磚塊 | 球拍反彈、多彩磚塊、生命制 |
| 🫧 泡泡龍 | 瞄準發射，三個同色以上消除 |
| 🧍 小朋友下樓梯 | 踩踏板往下，躲尖刺，比誰下得深 |

## 本地執行

因為使用了相對路徑載入，需要透過本機伺服器開啟（直接雙擊 index.html 部分功能會受限）：

```bash
# 方法一：Firebase 模擬本地環境
firebase serve

# 方法二：Python（macOS 內建）
python3 -m http.server 8000

# 方法三：Node
npx serve .
```

開啟後（Python 例子是 <http://localhost:8000>），用 Firebase 帳號登入即可進入大廳。
在本機測試登入時，記得把你的網域（`localhost`）加入 Firebase Authentication →
Settings → Authorized domains（`localhost` 預設通常已允許）。

## 檔案結構

```
遊戲空間/
├─ index.html            # 登入閘門 + 遊戲大廳
├─ firebase.json         # Firebase Hosting 設定
├─ .firebaserc           # 對應的 Firebase 專案 ID
├─ css/common.css        # 共用樣式
├─ js/
│  ├─ firebase-config.js # Firebase 專案設定（貼你自己的 config）
│  ├─ auth.js            # Firebase Authentication 登入閘門
│  ├─ common.js          # 共用工具、成績記錄、覆蓋層
│  └─ gameshell.js       # 遊戲頁面共用外殼（驗證 + 返回大廳）
└─ games/<遊戲>/index.html
```

## 之後還能再擴充

- 成績：`js/common.js` 的 `Scores` 目前用 localStorage，可改為 Firestore 做到跨裝置同步。
- 每個遊戲頁面已載入 Firebase SDK + `auth.js` + `gameshell.js`，未登入會自動導回登入頁。
