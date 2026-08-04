const canvas = document.querySelector("#scene");
const ctx = canvas.getContext("2d");
const cursor = document.querySelector("#cursor");
const clock = document.querySelector("#clock");
const signalLetters = document.querySelectorAll(".signal-word span");
const tiltItems = document.querySelectorAll("[data-tilt]");

let width = 0;
let height = 0;
let particles = [];
let mouse = { x: 0.5, y: 0.5 };

function resize() {
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = Math.floor(width * ratio);
  canvas.height = Math.floor(height * ratio);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  const count = Math.min(120, Math.max(54, Math.floor(width / 14)));
  particles = Array.from({ length: count }, (_, index) => ({
    x: (index / count) * width,
    y: Math.random() * height,
    speed: 0.25 + Math.random() * 0.55,
    size: 1 + Math.random() * 2.5,
    phase: Math.random() * Math.PI * 2,
  }));
}

function draw(time) {
  ctx.clearRect(0, 0, width, height);
  ctx.globalCompositeOperation = "lighter";

  particles.forEach((particle, index) => {
    particle.y += particle.speed;
    particle.x += Math.sin(time * 0.0007 + particle.phase) * 0.32;

    if (particle.y > height + 30) {
      particle.y = -30;
      particle.x = Math.random() * width;
    }

    const dx = particle.x - mouse.x * width;
    const dy = particle.y - mouse.y * height;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const pull = Math.max(0, 1 - distance / 260);
    const size = particle.size + pull * 5;

    ctx.beginPath();
    ctx.fillStyle = index % 5 === 0 ? "rgba(255,74,47,0.42)" : "rgba(215,255,63,0.34)";
    ctx.arc(particle.x + dx * pull * 0.025, particle.y + dy * pull * 0.025, size, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.globalCompositeOperation = "source-over";
  ctx.strokeStyle = "rgba(244,241,232,0.08)";
  ctx.lineWidth = 1;
  for (let x = 0; x < width; x += 64) {
    ctx.beginPath();
    ctx.moveTo(x + Math.sin(time * 0.0004 + x) * 12, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }

  requestAnimationFrame(draw);
}

function updateClock() {
  const now = new Date();
  clock.textContent = now.toLocaleTimeString("en-GB", { hour12: false });
}

window.addEventListener("resize", resize);
window.addEventListener("pointermove", (event) => {
  mouse = {
    x: event.clientX / Math.max(1, width),
    y: event.clientY / Math.max(1, height),
  };
  cursor.style.left = `${event.clientX}px`;
  cursor.style.top = `${event.clientY}px`;
});

document.querySelectorAll("a, button, [data-tilt]").forEach((item) => {
  item.addEventListener("mouseenter", () => cursor.classList.add("is-hot"));
  item.addEventListener("mouseleave", () => cursor.classList.remove("is-hot"));
});

tiltItems.forEach((item) => {
  item.addEventListener("pointermove", (event) => {
    const rect = item.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    item.style.transform = `perspective(900px) rotateX(${y * -4}deg) rotateY(${x * 5}deg) translateY(-2px)`;
  });

  item.addEventListener("pointerleave", () => {
    item.style.transform = "";
  });
});

function animateSignal() {
  const scroll = window.scrollY * 0.01;
  signalLetters.forEach((letter, index) => {
    const lift = Math.sin(scroll + index * 0.9) * 16;
    letter.style.setProperty("--lift", `${lift}px`);
  });
}

window.addEventListener("scroll", animateSignal, { passive: true });

resize();
draw(0);
updateClock();
animateSignal();
setInterval(updateClock, 1000);
