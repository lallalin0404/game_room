/* ===== 共用小工具 ===== */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function formatTime(totalSeconds) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

/** 顯示短暫提示 */
let _toastTimer = null;
function toast(msg, ms = 1800) {
  let el = document.querySelector(".toast");
  if (!el) {
    el = document.createElement("div");
    el.className = "toast";
    document.body.appendChild(el);
  }
  el.textContent = msg;
  requestAnimationFrame(() => el.classList.add("show"));
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => el.classList.remove("show"), ms);
}

/** 簡易覆蓋層（結束畫面） */
function showOverlay({ title, message, buttonText = "再玩一次", onButton }) {
  let overlay = document.querySelector(".overlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.className = "overlay";
    overlay.innerHTML = `
      <div class="panel">
        <h2></h2>
        <p></p>
        <button class="btn btn-primary"></button>
      </div>`;
    document.body.appendChild(overlay);
  }
  overlay.querySelector("h2").textContent = title;
  overlay.querySelector("p").textContent = message || "";
  const btn = overlay.querySelector("button");
  btn.textContent = buttonText;
  btn.onclick = () => {
    overlay.classList.remove("show");
    if (onButton) onButton();
  };
  overlay.classList.add("show");
}

function hideOverlay() {
  const overlay = document.querySelector(".overlay");
  if (overlay) overlay.classList.remove("show");
}

/** 本地最佳成績（localStorage）；雲端接上後可改為 Firestore */
const Scores = {
  key(game) {
    return `gameroom_best_${game}`;
  },
  getBest(game) {
    const v = localStorage.getItem(this.key(game));
    return v === null ? null : Number(v);
  },
  /** mode: 'min' 越小越好（時間），'max' 越大越好（分數） */
  submit(game, value, mode = "max") {
    const best = this.getBest(game);
    let isNew = false;
    if (best === null) {
      isNew = true;
    } else if (mode === "max" && value > best) {
      isNew = true;
    } else if (mode === "min" && value < best) {
      isNew = true;
    }
    if (isNew) localStorage.setItem(this.key(game), String(value));
    return isNew;
  },
};
