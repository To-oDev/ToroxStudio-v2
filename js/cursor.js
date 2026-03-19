// ── CUSTOM CURSOR ───────────────────────────────────
const cursor = document.getElementById('cursor');
const dot = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
});

function animateCursor() {
  dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
  requestAnimationFrame(animateCursor);
}

// Start animation
animateCursor();
