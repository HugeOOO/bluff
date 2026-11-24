import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createWordDeck } from '../dist/word-deck.js';
import { createDiscussionTimer } from '../dist/discussion-timer.js';
import { words } from '../dist/words.js';

test('countdown preserves exact time across pause, resume and long background delays', () => {
  let now = 0;
  const timer = createDiscussionTimer(60, () => now);
  assert.deepEqual(timer.read(), { seconds: 60, running: false });
  timer.toggle(); now = 12500;
  assert.equal(timer.read().seconds, 48);
  timer.toggle(); now = 60000;
  assert.equal(timer.read().seconds, 48);
  timer.toggle(); now = 107499;
  assert.equal(timer.read().seconds, 1);
  now = 107500;
  assert.deepEqual(timer.read(), { seconds: 0, running: false });
  assert.deepEqual(timer.toggle(), { seconds: 0, running: false });
  assert.deepEqual(timer.reset(), { seconds: 60, running: false });
});

test('changing packages preserves unplayed words and persisted history', () => {
  const entries = [['A', 'Mat'], ['B', 'Mat'], ['C', 'Djur'], ['D', 'Djur']]
    .map(([word, category]) => ({ word, category, hints: ['hint', 'other'] }));
  let saved;
  const storage = { getItem: () => saved, setItem: (_key, value) => { saved = value; } };
  let deck = createWordDeck(entries, { storage, random: () => .5 });
  const first = deck.draw(['Mat']);
  const other = deck.draw(['Djur']);
  deck = createWordDeck(entries, { storage, random: () => .5 });
  assert.notEqual(deck.draw(['Mat'])[0], first[0]);
  assert.notEqual(deck.draw(['Djur'])[0], other[0]);
  assert.throws(() => deck.draw([]), /Välj minst ett/);
});

test('selected packages exhaust without repeats and avoid the last word at a cycle boundary', () => {
  const deck = createWordDeck(words, { storage: null });
  for (const category of new Set(words.map(entry => entry.category))) {
    const size = words.filter(entry => entry.category === category).length;
    const drawn = Array.from({ length: size }, () => deck.draw([category]));
    assert.equal(new Set(drawn.map(entry => entry[0])).size, size);
    assert.ok(drawn.every(entry => entry[2] === category));
    assert.notEqual(deck.draw([category])[0], drawn.at(-1)[0]);
  }
});

test('a one-word package remains playable and never draws from unselected packages', () => {
  const deck = createWordDeck([{ word: 'A', category: 'Mat', hints: ['hint'] }], { storage: null });
  assert.equal(deck.draw(['Mat'])[0], 'A');
  assert.equal(deck.draw(['Mat'])[0], 'A');
});
