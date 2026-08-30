/* ===== 遊戲頁面共用外殼 =====
 * 每個遊戲頁面載入後，先用 Firebase Auth 檢查是否已登入，
 * 未登入就導回登入頁，並產生返回大廳的頂部列。
 */
Auth.requireAuth();

function mountGameHeader(title) {
  const bar = document.createElement("div");
  bar.className = "topbar";
  bar.innerHTML = `
    <div class="brand"><span class="logo">🎮</span> ${title}</div>
    <a class="btn btn-ghost" href="../../index.html">← 回大廳</a>`;
  document.body.prepend(bar);
}
