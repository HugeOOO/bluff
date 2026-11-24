import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createPresetStore } from '../dist/presets.js';
const packages = ['Mat', 'Djur'];
const example = { id: 'example', name: 'Fredag', players: ['Ada', 'Bo', 'Cia'], count: 1,
  special: 25, hint: 'category', timer: 120, packages: ['Mat'] };
function memoryStorage(value = null) {
  return { getItem: () => value, setItem: (_key, next) => { value = next; } };
}
test('presets survive reopening with all settings and can be updated and deleted', () => {
  const storage = memoryStorage();
  let store = createPresetStore(packages, storage);
  assert.equal(store.write([example]), true);
  store = createPresetStore(packages, storage);
  assert.deepEqual(store.read(), [example]);
  const updated = { ...example, timer: 300, packages: ['Mat', 'Djur'] };
  assert.equal(store.write([updated]), true);
  assert.deepEqual(store.read(), [updated]);
  assert.equal(store.write([]), true);
  assert.deepEqual(store.read(), []);
});
test('corrupt and invalid presets cannot restore unusable game settings', () => {
  assert.deepEqual(createPresetStore(packages, memoryStorage('{bad')).read(), []);
  const invalid = [{ ...example, count: 3 }, { ...example, timer: -1 }, { ...example, players: ['A'] },
    { ...example, packages: [] }, { ...example, hint: 'broken' }, { ...example, special: 101 }, null];
  assert.deepEqual(createPresetStore(packages, memoryStorage(JSON.stringify(invalid))).read(), []);
  assert.deepEqual(createPresetStore(packages, memoryStorage(JSON.stringify([example, example]))).read(), [example]);
});
test('removed package names are discarded while available packages remain selected', () => {
  const store = createPresetStore(packages, memoryStorage(JSON.stringify([{ ...example, packages: ['Mat', 'Removed', 'Mat'] }])));
  assert.deepEqual(store.read()[0].packages, ['Mat']);
});
test('unavailable storage and quota errors fail without throwing or claiming success', () => {
  const blocked = { getItem() { throw Error('blocked'); }, setItem() { throw Error('quota'); } };
  const store = createPresetStore(packages, blocked);
  assert.deepEqual(store.read(), []);
  assert.equal(store.write([example]), false);
  assert.equal(createPresetStore(packages, null).write([example]), false);
});
