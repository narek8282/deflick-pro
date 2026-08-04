const canvas = document.querySelector("#noise-field");
const ctx = canvas.getContext("2d");
let width = 0;
let height = 0;
let flecks = [];

function resize() {
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = Math.floor(width * ratio);
  canvas.height = Math.floor(height * ratio);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  flecks = Array.from({ length: Math.max(70, Math.floor(width / 9)) }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: -0.15 + Math.random() * 0.3,
    vy: 0.35 + Math.random() * 1.1,
    h: 6 + Math.random() * 24,
    a: 0.08 + Math.random() * 0.24,
  }));
}

function render(time) {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "rgba(255,255,255,0.035)";
  for (let x = 0; x < width; x += 48) {
    ctx.fillRect(x + Math.sin(time * 0.0005 + x) * 6, 0, 1, height);
  }

  flecks.forEach((fleck, index) => {
    fleck.x += fleck.vx;
    fleck.y += fleck.vy;
    if (fleck.y > height + 30) {
      fleck.y = -30;
      fleck.x = Math.random() * width;
    }
    ctx.fillStyle = index % 8 === 0 ? `rgba(255,60,31,${fleck.a})` : `rgba(243,239,229,${fleck.a})`;
    ctx.fillRect(fleck.x, fleck.y, 1, fleck.h);
  });

  requestAnimationFrame(render);
}

window.addEventListener("resize", resize);
resize();
render(0);
