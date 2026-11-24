// Slow down just short of the selected mark, then make a small magnetic snap.
export function rulerSlidePosition(from, target, progress, min, max) {
  const t = Math.max(0, Math.min(1, progress));
  if (t === 0) return from;
  if (t === 1 || from === target) return target;
  const distance = target - from;
  const near = target - Math.sign(distance) * Math.min(1.5, Math.abs(distance) * .05);
  let value;
  if (t < .82) {
    const approach = t / .82;
    value = from + (near - from) * (1 - (1 - approach) ** 3);
  } else {
    const snap = (t - .82) / .18;
    value = near + (target - near) * (1 - (1 - snap) ** 3);
  }
  return Math.max(min, Math.min(max, value));
}
