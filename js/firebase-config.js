/* ===== Firebase 設定 =====
 * 到 Firebase Console 建立專案後，開「專案設定 → 一般 → 你的應用程式 → SDK 設定與配置」，
 * 把下面這串換成你自己的 firebaseConfig。
 *
 * 這些值可以公開放在前端（不是密鑰），真正的存取控制由 Firebase Authentication
 * 與各服務的安全規則負責。
 */
const firebaseConfig = {
  apiKey: "AIzaSyDsb-UALgK9FWg0CAcxPVr9QVImLmEm2-g",
  authDomain: "game-room-b5cca.firebaseapp.com",
  projectId: "game-room-b5cca",
  storageBucket: "game-room-b5cca.firebasestorage.app",
  messagingSenderId: "216381268346",
  appId: "1:216381268346:web:124a3452877458b03176c3",
};

// 初始化（使用 compat 版 SDK，透過 <script> 載入，不需打包工具）
firebase.initializeApp(firebaseConfig);
