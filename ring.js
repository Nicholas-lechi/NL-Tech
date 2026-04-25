(function () {
  const canvas = document.getElementById("ringCanvas");
  const ctx = canvas.getContext("2d");

  const RADIUS = 24;
  const LINE_WIDTH = 3;
  const ARC_LENGTH = 0.72; // portion of ring visible (0–1), higher = longer ring
  const SPEED = 0.002; // rotation speed

  const COLORS = [
    [6, 182, 212], // cyan
    [139, 92, 246], // violet
    [236, 72, 153], // pink
    [34, 197, 94], // green
    [251, 191, 36], // amber
    [6, 182, 212], // back to cyan
  ];

  let angle = 0;
  let colorT = 0;

  function lerpColor(a, b, t) {
    return [
      Math.round(a[0] + (b[0] - a[0]) * t),
      Math.round(a[1] + (b[1] - a[1]) * t),
      Math.round(a[2] + (b[2] - a[2]) * t),
    ];
  }

  function getCurrentColor(t) {
    const total = COLORS.length - 1;
    const scaled = t * total;
    const i = Math.floor(scaled) % total;
    const frac = scaled - Math.floor(scaled);
    return lerpColor(COLORS[i], COLORS[i + 1], frac);
  }

  function roundedRectPath(x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.arcTo(x + w, y, x + w, y + r, r);
    ctx.lineTo(x + w, y + h - r);
    ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
    ctx.lineTo(x + r, y + h);
    ctx.arcTo(x, y + h, x, y + h - r, r);
    ctx.lineTo(x, y + r);
    ctx.arcTo(x, y, x + r, y, r);
    ctx.closePath();
  }

  function getPerimeter(w, h, r) {
    return 2 * (w - 2 * r) + 2 * (h - 2 * r) + 2 * Math.PI * r;
  }

  function drawRing() {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const W = rect.width;
    const H = rect.height;

    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const pad = LINE_WIDTH;
    const x = pad,
      y = pad;
    const w = W - pad * 2,
      h = H - pad * 2;
    const r = RADIUS;

    const perimeter = getPerimeter(w, h, r);
    const arcLen = perimeter * ARC_LENGTH;
    const [cr, cg, cb] = getCurrentColor(colorT % 1);

    // Build gradient along the arc
    const grad = ctx.createLinearGradient(0, 0, W, H);
    grad.addColorStop(0, `rgba(${cr},${cg},${cb},0)`);
    grad.addColorStop(0.3, `rgba(${cr},${cg},${cb},0.6)`);
    grad.addColorStop(1, `rgba(${cr},${cg},${cb},1)`);

    ctx.save();
    ctx.lineWidth = LINE_WIDTH;
    ctx.strokeStyle = grad;
    ctx.lineCap = "round";

    // Clip to only the ring border area using two paths
    ctx.save();
    // outer clip
    roundedRectPath(
      x - LINE_WIDTH / 2,
      y - LINE_WIDTH / 2,
      w + LINE_WIDTH,
      h + LINE_WIDTH,
      r + LINE_WIDTH / 2,
    );
    ctx.clip();

    // Use dash offset trick on the rounded rect path
    roundedRectPath(x, y, w, h, r);
    ctx.setLineDash([arcLen, perimeter - arcLen]);
    ctx.lineDashOffset = -angle * perimeter + perimeter;
    ctx.stroke();
    ctx.restore();

    ctx.restore();
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawRing();
    angle = (angle + SPEED) % 1;
    colorT = (colorT + 0.003) % 1;
    requestAnimationFrame(animate);
  }

  animate();
})();
