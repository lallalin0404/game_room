/* ===== 登入閘門（Firebase Authentication）=====
 * 以 Firebase Auth 的「電子郵件 / 密碼」帳號登入來擋門，
 * 取代原本寫死在前端的密碼。密碼不會出現在原始碼裡，改由 Firebase 驗證。
 *
 * 需先在 Firebase Console 開啟：Authentication → Sign-in method → 電子郵件/密碼，
 * 並在「Users」新增至少一組帳號（Email + 密碼）。
 *
 * 需在頁面先載入：
 *   firebase-app-compat.js、firebase-auth-compat.js、js/firebase-config.js
 * 再載入本檔。
 */
const Auth = {
  /** 目前是否已登入 */
  isSignedIn() {
    return !!firebase.auth().currentUser;
  },

  /** 用 Email + 密碼登入，回傳 Promise。 */
  signIn(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  },

  /** 登出 */
  signOut() {
    return firebase.auth().signOut();
  },

  /** 監聽登入狀態變化。callback(user)：user 為 null 代表未登入。 */
  onChange(callback) {
    return firebase.auth().onAuthStateChanged(callback);
  },

  /** 把 Firebase 錯誤碼轉成中文訊息 */
  errorMessage(err) {
    const code = err && err.code ? err.code : "";
    switch (code) {
      case "auth/invalid-email":
        return "電子郵件格式不正確";
      case "auth/user-disabled":
        return "此帳號已被停用";
      case "auth/user-not-found":
      case "auth/wrong-password":
      case "auth/invalid-credential":
        return "帳號或密碼錯誤";
      case "auth/too-many-requests":
        return "嘗試次數過多，請稍後再試";
      case "auth/network-request-failed":
        return "網路連線失敗";
      default:
        return "登入失敗，請再試一次";
    }
  },

  /**
   * 在受保護頁面呼叫：未登入就導回登入頁。
   * 使用 onAuthStateChanged 等 Firebase 還原登入狀態後再判斷，避免誤判。
   */
  requireAuth() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        const depth = location.pathname.includes("/games/") ? "../../" : "";
        location.replace(depth + "index.html");
      }
    });
  },
};
