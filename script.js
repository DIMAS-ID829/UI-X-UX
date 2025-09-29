// Animated wave background using Canvas
const canvas = document.getElementById('bg-animate');
const ctx = canvas.getContext('2d');

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

// Wave parameters
const waves = [
  { amplitude: 60, length: 0.012, speed: 0.8, color: 'rgba(255,255,255,0.03)', offset: 0 },
  { amplitude: 80, length: 0.008, speed: 0.5, color: 'rgba(255,255,255,0.045)', offset: Math.PI/2 },
  { amplitude: 110, length: 0.005, speed: 0.32, color: 'rgba(255,255,255,0.05)', offset: Math.PI }
];

function drawWave({ amplitude, length, speed, color, offset }, time) {
  ctx.beginPath();
  ctx.moveTo(0, canvas.height/1.5);
  for (let x = 0; x <= canvas.width; x += 8) {
    let y = amplitude * Math.sin(x * length + time * speed + offset) + canvas.height/1.5;
    ctx.lineTo(x, y);
  }
  ctx.lineTo(canvas.width, canvas.height);
  ctx.lineTo(0, canvas.height);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let now = Date.now() / 1500;
  for (let w of waves) {
    drawWave(w, now);
  }
  requestAnimationFrame(animate);
}
animate();
