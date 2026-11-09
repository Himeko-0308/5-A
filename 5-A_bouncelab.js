const canvas = document.getElementById("stage");
const ctx = canvas.getContext("2d");
const info = document.getElementById("info");   // 5_stage.html の <p id="info">


let x = 100;          // 丸の中心の位置
let y = 80;
let vx = 180;         // 横の速さ（1秒に180px）
let vy = 140;         // 縦の速さ（1秒に140px。＋ は下へ）
let r = 14;         // 半径
let last = performance.now();

window.addEventListener("keydown", (e) => {
  if (e.repeat) return;
  if (e.key === "ArrowUp") {
    // 上キー：速さを1.2倍にする
    vx *= 1.2;
    vy *= 1.2;
  } else if (e.key === "ArrowDown") {
    // 下キー：速さを0.8倍にする
    vx *= 0.8;
    vy *= 0.8;
  } else if (e.key === "ArrowLeft") {
    // 左キー：半径を小さくする（最小値は 2 に制限）
    r = Math.max(2, r - 2);
  } else if (e.key === "ArrowRight") {
    // 右キー：半径を大きくする
    r += 2;
  }
});

function update(dt) {
  x = x + vx * dt;
  y = y + vy * dt;

  // 左右の壁（丸は x が中心なので、半径 r を足し引きする）
  if (x + r > canvas.width) {
    x = canvas.width - r;
    vx = -vx;
  }
  if (x - r < 0) {
    x = r;
    vx = -vx;
  }
  // 上下の壁
  if (y + r > canvas.height) {
    y = canvas.height - r;
    vy = -vy;
  }
  if (y - r < 0) {
    y = r;
    vy = -vy;
  }
}

function draw() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#ffd166";
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
}

// now：今回呼ばれた時刻（ミリ秒）。requestAnimationFrame が引数で渡してくれる
function loop(now) {
  const dt = (now - last) / 1000;   // 前回からの時間（秒）
  last = now;                       // 今回の時刻を、次の「前回」として覚えておく

  info.textContent = "dt：" + dt.toFixed(4) + " 秒 ／ 1秒に約 " + (1 / dt).toFixed(0) + " 回";

  update(dt);   // ← dt を渡す
  draw();
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);