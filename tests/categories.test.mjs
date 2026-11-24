import { test } from 'node:test';
import assert from 'node:assert/strict';
import { categoryGroups, mergeCategory } from '../dist/categories.js';
import { words } from '../dist/words.js';
import { createPresetStore } from '../dist/presets.js';
import { createWordDeck } from '../dist/word-deck.js';

test('49 legacy categories merge into 16 populated groups without losing words', () => {
  const legacy = Object.values(categoryGroups).flat();
  assert.equal(legacy.length, 49);
  assert.equal(new Set(legacy).size, 49);
  assert.equal(Object.keys(categoryGroups).length, 16);
  assert.equal(words.length, 1000);
  assert.equal(new Set(words.map(entry => entry.word)).size, 1000);
  assert.deepEqual(new Set(words.map(entry => entry.category)), new Set(Object.keys(categoryGroups)));
  for (const name of legacy) assert.ok(categoryGroups[mergeCategory(name)].includes(name));
});

test('legacy presets migrate and deduplicate merged categories while preserving other settings', () => {
  const example = { id: 'old', name: 'Fredag', players: ['A', 'B', 'C'], count: 1,
    special: 25, hint: 'category', timer: 77, packages: ['Mat', 'Drycker', 'Djur', 'Vilda djur', 'Missing'] };
  let saved = JSON.stringify([example]);
  const store = createPresetStore(Object.keys(categoryGroups), { getItem: () => saved, setItem: (_, value) => { saved = value; } });
  const expected = { ...example, packages: ['Mat & dryck', 'Djur'] };
  assert.deepEqual(store.read(), [expected]);
  assert.equal(store.write([example]), true);
  assert.deepEqual(JSON.parse(saved), [expected]);
});

test('merging category names preserves played word history across reopening', () => {
  let saved;
  const storage = { getItem: () => saved, setItem: (_, value) => { saved = value; } };
  const before = createWordDeck(words.map(entry => ({ ...entry, category: 'Legacy' })), { storage, random: () => .5 });
  const played = new Set(Array.from({ length: 50 }, () => before.draw()[0]));
  const after = createWordDeck(words, { storage, random: () => .5 });
  const remaining = Array.from({ length: 950 }, () => after.draw()[0]);
  assert.equal(new Set(remaining).size, 950);
  assert.ok(remaining.every(word => !played.has(word)));
});
