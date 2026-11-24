import { test } from 'node:test';
import assert from 'node:assert/strict';
import { rulerSlidePosition } from '../dist/ruler-motion.js';
const sample = (from, target) => Array.from({ length: 101 }, (_, i) => rulerSlidePosition(from, target, i / 100, 0, 600));

test('timer shortcuts pass the target once and settle exactly, in either direction', () => {
  for (const [from, target] of [[0, 60], [60, 180], [0, 300], [300, 60], [180, 60]]) {
    const values = sample(from, target);
    assert.equal(values[0], from);
    assert.equal(values.at(-1), target);
    const excursion = target > from ? Math.max(...values) - target : target - Math.min(...values);
    assert.ok(excursion > 0 && excursion <= 6);
    const peak = target > from ? values.indexOf(Math.max(...values)) : values.indexOf(Math.min(...values));
    assert.ok(peak > 0 && peak < values.length - 1);
    assert.ok(values.slice(peak + 1).every((value, i) => target > from ? value <= values[peak + i] : value >= values[peak + i]));
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
