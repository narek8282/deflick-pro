const canvas = document.querySelector("#stage");
const ctx = canvas.getContext("2d");
const timecode = document.querySelector("#timecode");

let width = 0;
let height = 0;
let ratio = 1;
let particles = [];
let pointer = { x: 0.5, y: 0.45 };

function resize() {
  ratio = Math.min(window.devicePixelRatio || 1, 2);
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = Math.floor(width * ratio);
  canvas.height = Math.floor(height * ratio);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

  const count = Math.min(160, Math.max(70, Math.floor(width / 11)));
  particles = Array.from({ length: count }, (_, index) => ({
    x: Math.random() * width,
    y: Math.random() * height,
    size: 0.8 + Math.random() * 2.8,
    speed: 0.18 + Math.random() * 0.64,
    phase: Math.random() * Math.PI * 2,
    color: index % 4,
  }));
}

function colorFor(index, alpha) {
  const colors = [
    `rgba(32, 185, 255, ${alpha})`,
    `rgba(122, 77, 255, ${alpha})`,
    `rgba(255, 47, 146, ${alpha})`,
    `rgba(255, 138, 42, ${alpha})`,
  ];
  return colors[index] || colors[0];
}

function draw(time) {
  ctx.clearRect(0, 0, width, height);
  ctx.globalCompositeOperation = "lighter";

  particles.forEach((particle) => {
    particle.y += particle.speed;
    particle.x += Math.sin(time * 0.00045 + particle.phase) * 0.38;

    if (particle.y > height + 40) {
      particle.y = -40;
      particle.x = Math.random() * width;
    }

    const dx = particle.x - pointer.x * width;
    const dy = particle.y - pointer.y * height;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const pull = Math.max(0, 1 - distance / 300);
    const size = particle.size + pull * 7;

    ctx.beginPath();
    ctx.fillStyle = colorFor(particle.color, 0.2 + pull * 0.34);
    ctx.arc(particle.x + dx * pull * 0.03, particle.y + dy * pull * 0.03, size, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.globalCompositeOperation = "source-over";
  ctx.strokeStyle = "rgba(247,244,237,0.07)";
  ctx.lineWidth = 1;

  for (let x = -80; x < width + 80; x += 70) {
    ctx.beginPath();
    ctx.moveTo(x + Math.sin(time * 0.00035 + x) * 18, 0);
    ctx.lineTo(x - 40, height);
    ctx.stroke();
  }

  requestAnimationFrame(draw);
}

function updateTimecode() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  const frames = String(Math.floor(now.getMilliseconds() / 41.66)).padStart(2, "0");
  timecode.textContent = `${hours}:${minutes}:${seconds}:${frames}`;
}

window.addEventListener("resize", resize);
window.addEventListener(
  "pointermove",
  (event) => {
    pointer = {
      x: event.clientX / Math.max(1, width),
      y: event.clientY / Math.max(1, height),
    };
  },
  { passive: true },
);

resize();
draw(0);
updateTimecode();
setInterval(updateTimecode, 120);
