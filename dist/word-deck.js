const storageKey = 'bluff-word-history-v1';

// History survives app restarts in this browser/device, independently of players and rules.
// Storage is optional: private/restricted browsers still keep an in-memory deck.
export function createWordDeck(entries, { storage, random = Math.random } = {}) {
  if (!entries.length) throw new Error('Ordlistan är tom.');
  const byWord = new Map(entries.map(entry => [entry.word, entry]));
  // Editing clues must not reset which words have already been played.
  const bank = JSON.stringify(entries.map(entry => entry.word));
  function matchesBank(savedBank) {
    if (savedBank === bank) return true;
    try {
      // Migrate the original signature, which included each word's old hints.
      const previous = JSON.parse(savedBank);
      return Array.isArray(previous) && previous.every(entry => Array.isArray(entry)) &&
        JSON.stringify(previous.map(entry => entry[0])) === bank;
    } catch { return false; }
  }
  const recentLimit = Math.min(40, entries.length - 1);
  let remaining = [];
  let recent = [];
  let hintChoices = {};
  try {
    storage ??= globalThis.localStorage;
    const saved = JSON.parse(storage?.getItem(storageKey) ?? 'null');
    const validWords = list => Array.isArray(list) &&
      list.every(word => byWord.has(word)) && new Set(list).size === list.length;
    if (saved && matchesBank(saved.bank) && validWords(saved.remaining) &&
        validWords(saved.recent) && saved.recent.length <= recentLimit) {
      remaining = saved.remaining;
      recent = saved.recent;
      if (saved.hintChoices && typeof saved.hintChoices === 'object') {
        hintChoices = saved.hintChoices;
      }
    }
  } catch { /* Continue without persisted history if storage is unavailable. */ }

  function shuffle(list) {
    for (let i = list.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [list[i], list[j]] = [list[j], list[i]];
    }
    return list;
  }

  return {
    draw(categories = null) {
      const selected = categories === null ? null : new Set(categories);
      const eligible = [...byWord.keys()].filter(word => !selected || selected.has(byWord.get(word).category));
      if (!eligible.length) throw new Error('Välj minst ett ordpaket.');
      const allowed = new Set(eligible);
      if (!remaining.some(word => allowed.has(word))) {
        const shuffled = shuffle(eligible);
        const previous = recent.at(-1);
        // Keep other packages' unplayed words and history when changing selection.
        const heldBack = new Set(recent);
        // Draw from the end, leaving the previous cycle's latest words until later.
        remaining = [
          ...remaining,
          ...shuffled.filter(word => word === previous),
          ...shuffled.filter(word => heldBack.has(word) && word !== previous),
          ...shuffled.filter(word => !heldBack.has(word))
        ];
      }
      const index = remaining.findLastIndex(word => allowed.has(word));
      const [word] = remaining.splice(index, 1);
      const entry = byWord.get(word);
      const candidates = entry.hints.map((_, index) => index)
        .filter(index => entry.hints.length === 1 || index !== hintChoices[word]);
      const hintIndex = candidates[Math.floor(random() * candidates.length)];
      hintChoices[word] = hintIndex;
      recent = [...recent.filter(previous => previous !== word), word].slice(-recentLimit);
      if (!recentLimit) recent = [];
      try {
        storage?.setItem(storageKey, JSON.stringify({ bank, remaining, recent, hintChoices }));
      } catch { /* A full/disabled history store must never stop a round. */ }
      return [word, entry.hints[hintIndex], entry.category];
    }
  };
}
