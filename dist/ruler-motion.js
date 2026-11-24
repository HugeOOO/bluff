// Pass the target once, then settle back without oscillating or leaving the range.
export function rulerSlidePosition(from, target, progress, min, max) {
  const t = Math.max(0, Math.min(1, progress));
  if (t === 0) return from;
  if (t === 1 || from === target) return target;
  const distance = target - from;
  const overshoot = Math.sign(distance) * Math.min(6, Math.abs(distance) * .06);
  const turn = Math.max(min, Math.min(max, target + overshoot));
  if (t < .72) {
    const approach = t / .72;
    return from + (turn - from) * (1 - (1 - approach) ** 3);
  }
  const settle = (t - .72) / .28;
  return turn + (target - turn) * settle * settle * (3 - 2 * settle);
}
