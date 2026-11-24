import { mergeCategory } from './categories.js?v=114';

const presetStorageKey = 'bluff-presets-v1';

export function createPresetStore(packages, storage = globalThis.localStorage) {
  function normalize(preset) {
    if (!preset || typeof preset.id !== 'string' || !preset.id || preset.id.length > 100 ||
        typeof preset.name !== 'string' || !preset.name.trim() || preset.name.length > 40 ||
        !Array.isArray(preset.players) || preset.players.length < 3 || preset.players.length > 20 ||
        !preset.players.every(name => typeof name === 'string' && name.length <= 40) ||
        !Number.isInteger(preset.count) || preset.count < 1 || preset.count >= preset.players.length ||
        !Number.isInteger(preset.special) || preset.special < 0 || preset.special > 100 ||
        !['none', 'category', 'clue'].includes(preset.hint) || (!Number.isInteger(preset.timer) || preset.timer < 0 || preset.timer > 600) ||
        !Array.isArray(preset.packages)) return null;
    const selected = [...new Set(preset.packages.map(name => packages.includes(name) ? name : mergeCategory(name)).filter(name => packages.includes(name)))];
    if (!selected.length) return null;
    return { id: preset.id, name: preset.name.trim(), players: [...preset.players], count: preset.count,
      special: preset.special, hint: preset.hint, timer: preset.timer, packages: selected };
  }
  return {
    read() {
      try {
        const saved = JSON.parse(storage?.getItem(presetStorageKey) ?? '[]');
        if (!Array.isArray(saved)) return [];
        const ids = new Set();
        return saved.slice(0, 30).map(normalize).filter(preset => {
          if (!preset || ids.has(preset.id)) return false;
          ids.add(preset.id); return true;
        });
      } catch { return []; }
    },
    write(presets) {
      try {
        if (!storage || presets.length > 30 || presets.some(preset => !normalize(preset))) return false;
        storage.setItem(presetStorageKey, JSON.stringify(presets.map(normalize)));
        return true;
      } catch { return false; }
    }
  };
}
