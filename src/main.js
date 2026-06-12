import * as THREE from 'three';

// ── Shape library ──────────────────────────────────────────────────────────
const SHAPES = [
  // 5-cube pieces
  [[0,0,0],[1,0,0],[2,0,0],[2,1,0],[2,1,1]],
  [[0,0,0],[1,0,0],[1,1,0],[1,2,0],[0,2,0]],
  [[0,0,0],[0,1,0],[0,2,0],[1,2,0],[1,2,1]],
  [[0,0,0],[1,0,0],[1,0,1],[1,1,1],[2,1,1]],
  [[0,0,0],[0,1,0],[1,1,0],[1,1,1],[1,2,1]],
  [[0,0,0],[1,0,0],[2,0,0],[0,1,0],[0,0,1]],
  [[0,0,0],[1,0,0],[2,0,0],[2,1,0],[2,2,0]],
  [[0,0,0],[0,1,0],[0,2,0],[1,0,0],[2,0,0]],
  [[0,0,0],[1,0,0],[1,1,0],[2,1,0],[2,1,1]],
  [[0,0,0],[0,1,0],[1,1,0],[1,2,0],[0,0,1]],
  [[0,0,0],[1,0,0],[0,1,0],[1,1,0],[0,0,1]],
  [[0,0,0],[1,0,0],[2,0,0],[1,1,0],[1,0,1]],
  // 6-cube pieces
  [[0,0,0],[0,1,0],[0,2,0],[1,2,0],[1,2,1],[0,2,1]],
  [[0,0,0],[1,0,0],[2,0,0],[2,1,0],[1,1,0],[1,1,1]],
  [[0,0,0],[1,0,0],[2,0,0],[0,1,0],[0,2,0],[0,0,1]],
  [[0,0,0],[1,0,0],[1,1,0],[1,2,0],[2,2,0],[1,2,1]],
  [[0,0,0],[0,1,0],[0,2,0],[1,0,0],[1,0,1],[2,0,1]],
  [[0,0,0],[1,0,0],[2,0,0],[2,1,0],[2,2,0],[1,2,0]],
  [[0,0,0],[0,1,0],[1,1,0],[2,1,0],[2,0,0],[2,1,1]],
  [[0,0,0],[1,0,0],[1,1,0],[0,1,0],[0,1,1],[0,2,1]],
  // 7-cube pieces
  [[0,0,0],[1,0,0],[2,0,0],[3,0,0],[3,1,0],[3,1,1],[2,1,1]],
  [[0,0,0],[0,1,0],[0,2,0],[1,2,0],[2,2,0],[2,1,0],[2,0,0]],
  [[0,0,0],[1,0,0],[2,0,0],[2,1,0],[2,2,0],[1,2,0],[1,2,1]],
  [[0,0,0],[0,1,0],[1,1,0],[1,2,0],[2,2,0],[2,2,1],[1,2,1]],
];

// ── Difficulty ─────────────────────────────────────────────────────────────
const DIFFICULTIES = {
  easy:   { time: 20, rounds: 8,  label: 'Easy',   color: '#10b981' },
  medium: { time: 12, rounds: 10, label: 'Medium',  color: '#f59e0b' },
  hard:   { time: 7,  rounds: 12, label: 'Hard',    color: '#ef4444' },
};
let difficulty = 'medium';

// ── Three.js scene setup ───────────────────────────────────────────────────
function makeScene(canvasEl) {
  const W = 300, H = 300;
  const renderer = new THREE.WebGLRenderer({ canvas: canvasEl, antialias: true, alpha: true });
  renderer.setSize(W, H);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100);
  camera.position.set(4, 4, 7);
  camera.lookAt(1.5, 1, 0.5);

  scene.add(new THREE.AmbientLight(0x8866ff, 0.5));
  const dir = new THREE.DirectionalLight(0xffffff, 1.2);
  dir.position.set(5, 8, 5); dir.castShadow = true;
  scene.add(dir);
  const fill = new THREE.DirectionalLight(0x4488ff, 0.4);
  fill.position.set(-5, -2, -3); scene.add(fill);
  const rim = new THREE.PointLight(0xff44aa, 0.6, 20);
  rim.position.set(-3, 5, -4); scene.add(rim);

  return { renderer, scene, camera };
}

function buildShapeMesh(cubes, color) {
  const group = new THREE.Group();
  const geo = new THREE.BoxGeometry(0.88, 0.88, 0.88);
  const mat = new THREE.MeshPhongMaterial({ color, shininess: 90, specular: 0xffffff });
  const edgeMat = new THREE.LineBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.3 });

  // Center the shape
  const cx = cubes.reduce((s,[x])=>s+x,0)/cubes.length;
  const cy = cubes.reduce((s,[,y])=>s+y,0)/cubes.length;
  const cz = cubes.reduce((s,[,,z])=>s+z,0)/cubes.length;

  cubes.forEach(([x, y, z]) => {
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(x-cx, y-cy, z-cz);
    mesh.castShadow = true;
    group.add(mesh);
    const edges = new THREE.LineSegments(new THREE.EdgesGeometry(geo), edgeMat);
    edges.position.set(x-cx, y-cy, z-cz);
    group.add(edges);
  });
  return group;
}

function randomEuler() {
  return new THREE.Euler(
    Math.random() * Math.PI * 2,
    Math.random() * Math.PI * 2,
    Math.random() * Math.PI * 2
  );
}

function mirrorCubes(cubes) {
  return cubes.map(([x, y, z]) => [-x, y, z]);
}

// ── Game state ─────────────────────────────────────────────────────────────
let score = 0, round = 0, streak = 0, isMirror = false;
let timeLeft = 0, timerInterval = null, answered = false;

const leftCtx  = makeScene(document.getElementById('canvas-left'));
const rightCtx = makeScene(document.getElementById('canvas-right'));
let leftGroup = null, rightGroup = null, animId = null;
let leftSpeed = {x:0.3,y:0.6}, rightSpeed = {x:0.4,y:0.5};

function clearScene(ctx) {
  ctx.scene.children.filter(c => c.isGroup).forEach(c => ctx.scene.remove(c));
}

function newRound() {
  const cfg = DIFFICULTIES[difficulty];
  answered = false;
  round++;
  document.getElementById('round').textContent = round;
  document.getElementById('total-rounds').textContent = cfg.rounds;
  document.getElementById('feedback').textContent = '';
  document.getElementById('btn-same').disabled = false;
  document.getElementById('btn-mirror').disabled = false;

  const shapeIdx = Math.floor(Math.random() * SHAPES.length);
  const baseCubes = SHAPES[shapeIdx];
  isMirror = Math.random() < 0.5;
  const compCubes = isMirror ? mirrorCubes(baseCubes) : baseCubes;

  clearScene(leftCtx); clearScene(rightCtx);

  leftGroup = buildShapeMesh(baseCubes, 0x7c3aed);
  leftGroup.setRotationFromEuler(randomEuler());
  leftCtx.scene.add(leftGroup);

  rightGroup = buildShapeMesh(compCubes, 0x0ea5e9);
  rightGroup.setRotationFromEuler(randomEuler());
  rightCtx.scene.add(rightGroup);

  const rnd = () => (0.3 + Math.random() * 0.5) * (Math.random() < 0.5 ? 1 : -1);
  leftSpeed  = { x: rnd(), y: rnd() };
  rightSpeed = { x: rnd(), y: rnd() };

  startTimer();
}

function startTimer() {
  const cfg = DIFFICULTIES[difficulty];
  clearInterval(timerInterval);
  timeLeft = cfg.time;
  updateTimerUI();
  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimerUI();
    if (timeLeft <= 0) { clearInterval(timerInterval); handleAnswer(null); }
  }, 1000);
}

function updateTimerUI() {
  const cfg = DIFFICULTIES[difficulty];
  document.getElementById('timer').textContent = timeLeft;
  const pct = (timeLeft / cfg.time) * 100;
  const bar = document.getElementById('timer-bar-fill');
  bar.style.width = pct + '%';
  bar.style.background = pct > 50 ? '#10b981' : pct > 25 ? '#f59e0b' : '#ef4444';
}

function handleAnswer(userSaidMirror) {
  if (answered) return;
  answered = true;
  clearInterval(timerInterval);
  document.getElementById('btn-same').disabled = true;
  document.getElementById('btn-mirror').disabled = true;

  const fb = document.getElementById('feedback');
  const cfg = DIFFICULTIES[difficulty];

  if (userSaidMirror === null) {
    streak = 0;
    fb.style.color = '#f59e0b';
    fb.textContent = `⏱ Time's up! It was ${isMirror ? 'Mirror' : 'Same'}.`;
  } else if (userSaidMirror === isMirror) {
    streak++;
    const bonus = streak >= 3 ? Math.min(streak - 2, 3) : 0; // up to +3 combo
    const pts = 1 + bonus;
    score += pts;
    document.getElementById('score').textContent = score;
    document.getElementById('streak').textContent = streak;
    fb.style.color = '#34d399';
    fb.textContent = streak >= 3
      ? `✔ Correct! 🔥 ${streak}x streak  +${pts}`
      : '✔ Correct!';
  } else {
    streak = 0;
    document.getElementById('streak').textContent = 0;
    fb.style.color = '#f87171';
    fb.textContent = `✖ Wrong! It was ${isMirror ? 'Mirror' : 'Same'}.`;
  }

  setTimeout(() => {
    if (round >= cfg.rounds) endGame();
    else newRound();
  }, 1200);
}

const RATINGS = [
  { min:100, icon:'🏆', label:'Perfect!' },
  { min:80,  icon:'🥇', label:'Excellent!' },
  { min:60,  icon:'🥈', label:'Good job!' },
  { min:40,  icon:'🥉', label:'Keep practicing!' },
  { min:0,   icon:'💪', label:'Try again!' },
];

function endGame() {
  cancelAnimationFrame(animId);
  animId = null;
  const cfg = DIFFICULTIES[difficulty];
  const pct = Math.round((score / cfg.rounds) * 100);
  const r = RATINGS.find(r => pct >= r.min);
  document.getElementById('overlay-icon').textContent  = r.icon;
  document.getElementById('overlay-title').textContent = 'Game Over';
  document.getElementById('overlay-rating').textContent = r.label;
  document.getElementById('overlay-msg').textContent   = `Score: ${score}  •  Accuracy: ${pct}%`;
  document.getElementById('overlay').classList.remove('hidden');
}

function resetGame() {
  score = 0; round = 0; streak = 0;
  document.getElementById('score').textContent = 0;
  document.getElementById('streak').textContent = 0;
  document.getElementById('overlay').classList.add('hidden');
  newRound();
  animate();
}

// ── Render loop ────────────────────────────────────────────────────────────
let lastTime = 0;

function animate(ts = 0) {
  animId = requestAnimationFrame(animate);
  const dt = Math.min((ts - lastTime) / 1000, 0.05);
  lastTime = ts;
  if (leftGroup)  { leftGroup.rotation.x  += leftSpeed.x  * dt; leftGroup.rotation.y  += leftSpeed.y  * dt; }
  if (rightGroup) { rightGroup.rotation.x += rightSpeed.x * dt; rightGroup.rotation.y += rightSpeed.y * dt; }
  leftCtx.renderer.render(leftCtx.scene, leftCtx.camera);
  rightCtx.renderer.render(rightCtx.scene, rightCtx.camera);
}

// ── Difficulty selector ────────────────────────────────────────────────────
document.querySelectorAll('.diff-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    difficulty = btn.dataset.diff;
    document.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// ── Keyboard shortcuts ─────────────────────────────────────────────────────
document.addEventListener('keydown', e => {
  if (e.key === 's' || e.key === 'S') handleAnswer(false);
  if (e.key === 'm' || e.key === 'M') handleAnswer(true);
});

// ── Wire up buttons ────────────────────────────────────────────────────────
document.getElementById('btn-same').addEventListener('click', () => handleAnswer(false));
document.getElementById('btn-mirror').addEventListener('click', () => handleAnswer(true));
document.getElementById('overlay-btn').addEventListener('click', resetGame);

// ── Start ──────────────────────────────────────────────────────────────────
newRound();
animate();
