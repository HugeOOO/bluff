import { test } from 'node:test';
import assert from 'node:assert/strict';
import { rulerSlidePosition } from '../dist/ruler-motion.js';
const sample = (from, target) => Array.from({ length: 101 }, (_, i) => rulerSlidePosition(from, target, i / 100, 0, 600));

test('timer shortcuts slow down near the mark, then snap exactly without overshoot', () => {
  for (const [from, target] of [[0, 60], [60, 180], [0, 300], [300, 60], [180, 60]]) {
    const values = sample(from, target);
    const direction = Math.sign(target - from);
    assert.equal(values[0], from);
    assert.equal(values.at(-1), target);
    assert.ok(values.every(value => value >= Math.min(from, target) && value <= Math.max(from, target)));
    assert.ok(values.slice(1).every((value, i) => (value - values[i]) * direction >= 0));
    assert.ok(Math.abs(values[70] - values[60]) < Math.abs(values[20] - values[10]));
    assert.ok(Math.abs(values[82] - target) <= 1.5 + 1e-8);
    assert.ok(Math.abs(values[90] - values[82]) > Math.abs(values[82] - values[80]));
  }
});

test('range boundaries, unchanged values and completed animation remain exact', () => {
  for (const [from, target] of [[0, 600], [600, 0], [60, 60]]) {
    const values = sample(from, target);
    assert.ok(values.every(value => value >= 0 && value <= 600));
    assert.equal(values.at(-1), target);
  }
  assert.equal(rulerSlidePosition(0, 60, 1, 0, 600), 60);
});
