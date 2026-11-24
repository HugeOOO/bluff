import test from 'node:test';
import assert from 'node:assert/strict';
import { words } from '../dist/words.js';
import { createWordDeck } from '../dist/word-deck.js';

function memoryStorage() {
  const data = new Map();
  return { getItem: key => data.get(key) ?? null, setItem: (key, value) => data.set(key, value) };
}
function seededRandom(seed = 12345) {
  return () => ((seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0) / 2 ** 32);
}
const drawWords = (deck, count) => Array.from({ length: count }, () => deck.draw()[0]);

test('1000 unique Swedish words, each with a category and two distinct non-revealing hints', () => {
  assert.equal(words.length, 1000);
  assert.equal(new Set(words.map(entry => entry.word.toLocaleLowerCase('sv'))).size, words.length);
  for (const entry of words) {
    assert.ok(entry.word.trim() && entry.category.trim());
    assert.equal(entry.hints.length, 2);
    assert.equal(new Set(entry.hints).size, 2);
    for (const hint of entry.hints) {
      assert.ok(hint.trim());
      const tokens = hint.toLocaleLowerCase('sv').split(/[^\p{L}]+/u);
      assert.ok(!tokens.includes(entry.word.toLocaleLowerCase('sv')), `${entry.word}: ${hint}`);
    }
  }
});

test('every cycle uses the whole bank once and avoids the last 40 words across boundaries', () => {
  for (let seed = 1; seed <= 20; seed++) {
    const deck = createWordDeck(words, { storage: memoryStorage(), random: seededRandom(seed) });
    const history = drawWords(deck, words.length * 3);
    for (let cycle = 0; cycle < 3; cycle++) {
      assert.equal(new Set(history.slice(cycle * words.length, (cycle + 1) * words.length)).size, words.length);
    }
    history.forEach((word, i) => assert.ok(!history.slice(Math.max(0, i - 40), i).includes(word)));
  }
});

test('reload resumes the same session without resetting its remaining words or hints', () => {
  const storage = memoryStorage();
  const deck = createWordDeck(words, { storage, random: seededRandom() });
  const first = Array.from({ length: Math.floor(words.length / 2) }, () => deck.draw());
  const reloaded = createWordDeck(words, { storage, random: seededRandom(42) });
  const rest = Array.from({ length: words.length - first.length }, () => reloaded.draw());
  assert.equal(new Set([...first, ...rest].map(pair => pair[0])).size, words.length);
  const previousHints = new Map([...first, ...rest].map(pair => [pair[0], pair[1]]));
  for (let i = 0; i < words.length; i++) {
    const [word, hint, category] = reloaded.draw();
    const entry = words.find(entry => entry.word === word);
    assert.ok(entry.hints.includes(hint));
    assert.equal(category, entry.category);
    assert.notEqual(hint, previousHints.get(word));
  }
});

test('separate device storage gets an independent full deck', () => {
  const first = createWordDeck(words, { storage: memoryStorage(), random: seededRandom() });
  drawWords(first, 150);
  const other = createWordDeck(words, { storage: memoryStorage(), random: seededRandom() });
  assert.equal(new Set(drawWords(other, words.length)).size, words.length);
});

test('blocked or full storage never interrupts a round', () => {
  const storage = { getItem() { throw Error('blocked'); }, setItem() { throw Error('full'); } };
  const deck = createWordDeck(words, { storage, random: seededRandom() });
  assert.equal(new Set(drawWords(deck, words.length)).size, words.length);
});

test('malformed, stale or duplicate stored decks are safely replaced', () => {
  for (const value of ['{broken', 'null', JSON.stringify({ bank: 'old', remaining: [] }),
    JSON.stringify({ bank: JSON.stringify(words.map(e => e.word)), remaining: ['Pizza', 'Pizza'], recent: [] })]) {
    const storage = { getItem: () => value, setItem() {} };
    const deck = createWordDeck(words, { storage, random: seededRandom() });
    assert.equal(new Set(drawWords(deck, words.length)).size, words.length);
  }
});

test('small decks refill safely and one-hint entries remain playable', () => {
  const tiny = [ { word: 'Ett', hints: ['A'], category: 'Test' }, { word: 'Två', hints: ['B'], category: 'Test' } ];
  const deck = createWordDeck(tiny, { storage: memoryStorage(), random: seededRandom() });
  const history = drawWords(deck, 20);
  history.forEach((word, i) => { if (i) assert.notEqual(word, history[i - 1]); });
  const single = createWordDeck(tiny.slice(0, 1), { storage: memoryStorage() });
  assert.deepEqual(single.draw(), ['Ett', 'A', 'Test']);
  assert.deepEqual(single.draw(), ['Ett', 'A', 'Test']);
});


test('default history survives 200 app restarts with five rounds per school day', t => {
  const localDescriptor = Object.getOwnPropertyDescriptor(globalThis, 'localStorage');
  const sessionDescriptor = Object.getOwnPropertyDescriptor(globalThis, 'sessionStorage');
  t.after(() => {
    if (localDescriptor) Object.defineProperty(globalThis, 'localStorage', localDescriptor);
    else delete globalThis.localStorage;
    if (sessionDescriptor) Object.defineProperty(globalThis, 'sessionStorage', sessionDescriptor);
    else delete globalThis.sessionStorage;
  });
  Object.defineProperty(globalThis, 'localStorage', { configurable: true, value: memoryStorage() });
  const history = [];
  for (let day = 0; day < 200; day++) {
    // Closing the previous app drops its memory and session storage, but keeps local storage.
    Object.defineProperty(globalThis, 'sessionStorage', { configurable: true, value: memoryStorage() });
    const reopened = createWordDeck(words, { random: seededRandom(day + 1) });
    history.push(...drawWords(reopened, 5));
  }
  assert.equal(history.length, 1000);
  assert.equal(new Set(history).size, 1000);
});


test('hint revisions preserve played words and migrate the original stored signature', () => {
  for (const legacy of [false, true]) {
    const storage = memoryStorage();
    const firstDeck = createWordDeck(words, { storage, random: seededRandom() });
    const played = drawWords(firstDeck, 317);
    if (legacy) {
      const key = 'bluff-word-history-v1';
      const saved = JSON.parse(storage.getItem(key));
      saved.bank = JSON.stringify(words.map(entry => [entry.word, entry.hints]));
      storage.setItem(key, JSON.stringify(saved));
    }
    const revised = words.map(entry => ({ ...entry, hints: ['Ny hint A', 'Ny hint B'] }));
    const reopened = createWordDeck(revised, { storage, random: seededRandom(99) });
    const remaining = Array.from({ length: words.length - played.length }, () => reopened.draw());
    assert.equal(new Set([...played, ...remaining.map(pair => pair[0])]).size, words.length);
    assert.ok(remaining.every(pair => pair[1].startsWith('Ny hint')));
  }
});
