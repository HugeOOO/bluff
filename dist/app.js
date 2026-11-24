import { rulerSlidePosition } from './ruler-motion.js?v=116';
import { createPresetStore } from './presets.js?v=116';
import { createDiscussionTimer } from './discussion-timer.js?v=116';
import { words } from './words.js?v=116';
import { createWordDeck } from './word-deck.js?v=116';

const wordDeck = createWordDeck(words);
const wordPackages = [...new Set(words.map(entry => entry.category))];
let selectedPackages = [...wordPackages];
let categoryReturnStage = 1;
let categoryDraft = [];
// Accessing localStorage itself can throw in restricted browser contexts.
let presetStorage;
try { presetStorage = globalThis.localStorage; } catch {}
const presetStore = createPresetStore(wordPackages, presetStorage ?? null);
let savedPresets = presetStore.read();
const placeholderPair = ['Hemligt ord', 'Ledtråd', 'Kategori'];
let usePlaceholders = false;

const screen = document.querySelector('#screen');
const installButton = document.querySelector('#install');
// Capacitor injects its bridge in the APK; the PWA uses browser vibration when available.
const nativeHaptics = window.Capacitor?.isNativePlatform?.()
  ? window.Capacitor.Plugins?.Haptics : null;
let lastHapticTick = -Infinity;
function haptic(kind = 'press') {
  const now = performance.now();
  // Fast drags should feel like distinct ticks, without queuing vibrations.
  if (kind === 'tick' && now - lastHapticTick < 65) return;
  lastHapticTick = now;
  const duration = kind === 'tick' ? 4 : kind === 'drop' ? 16 : 12;
  const fallback = () => {
    try { navigator.vibrate?.(duration); } catch {}
  };
  try {
    if (nativeHaptics) {
      // The stock LIGHT impact lasts 50 ms on Android. Short pulses feel subtler.
      const feedback = nativeHaptics.vibrate({ duration });
      Promise.resolve(feedback).catch(fallback);
    } else fallback();
  } catch { fallback(); }
}
// Delegation also covers buttons created when moving between screens.
function pressedButton(event) {
  const button = event.target.closest('button');
  return button && !button.disabled && !button.closest('[inert]') &&
    !button.matches('.grip, #hold');
}
document.addEventListener('pointerdown', event => {
  if (event.isPrimary && event.button === 0 && pressedButton(event)) haptic();
}, true);
document.addEventListener('click', event => {
  // Keyboard and assistive activation have no preceding pointer press.
  if (event.detail === 0 && pressedButton(event)) haptic();
}, true);
document.addEventListener('change', event => {
  if (event.target.matches('input[type=radio], input[type=checkbox]')) haptic();
});
const names = ['', '', '', ''];
// History follows the player when the order changes; special rounds do not count.
const roleHistory = names.map(() => ({ debt: 0, last: 0 }));
let balancedRounds = 0;
let hintMode = 'clue';
let discussionSeconds = 0;
const timerOptions = [[60, '1 min'], [180, '3 min'], [300, '5 min']];

const hintFor = (entry, mode) => mode === 'category' ? entry[2] : mode === 'clue' ? entry[1] : '';
function roleText(index) {
  if (!bluffers.has(index)) return pair[0];
  const hint = hintFor(pair, hintMode);
  return 'Du bluffar' + (hint ? '\n' + hint : '');
}
let stage = 0, count = 1, specialChance = 0, turn = 0, starter = 0;
let pair, bluffers, seen = false;
const label = i => names[i].trim() || 'Spelare ' + (i + 1);
const escape = value => value.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const button = (id, title) => '<button type="button" id="'+id+'">'+title+'</button>';
function on(id, fn) { document.getElementById(id).onclick = fn; }
// Preset editing uses the same controls as a normal game, with a snapshot so
// saving or canceling a draft never changes the unfinished game on the home page.
let presetDraft = null;
let presetBackup = null;
let orderPreset = null;
let orderBackup = null;
let homeNotice = '';
function captureSetup() {
  return { players: [...names], count, special: specialChance, hint: hintMode,
    timer: discussionSeconds, packages: [...selectedPackages],
    history: roleHistory.map(item => ({ ...item })), balancedRounds };
}
function applySetup(setup) {
  names.splice(0, names.length, ...setup.players);
  count = setup.count; specialChance = setup.special; hintMode = setup.hint;
  discussionSeconds = setup.timer; selectedPackages = [...setup.packages];
  roleHistory.splice(0, roleHistory.length, ...names.map((_, i) => ({ ...(setup.history?.[i] ?? { debt: 0, last: 0 }) })));
  balancedRounds = setup.balancedRounds ?? 0;
}
function beginPreset(preset = null) {
  if (!preset && savedPresets.length >= 30) {
    homeNotice = 'Du har 30 presets. Öppna ett för att ändra eller ta bort det.'; go(0); return;
  }
  presetBackup = captureSetup();
  presetDraft = { id: preset?.id ?? null, name: preset?.name ?? '' };
  if (preset) applySetup(preset);
  go(6);
}
function closePreset(message = '') {
  applySetup(presetBackup);
  presetDraft = presetBackup = null;
  homeNotice = message;
  go(0);
}
function savePreset() {
  const status = document.querySelector('#preset-status');
  if (savedPresets.some(item => item.id !== presetDraft.id && item.name.toLocaleLowerCase('sv') === presetDraft.name.toLocaleLowerCase('sv'))) {
    status.textContent = 'Namnet används redan. Gå tillbaka och välj ett annat namn.'; return;
  }
  const preset = { id: presetDraft.id ?? crypto.randomUUID(), name: presetDraft.name,
    players: [...names], count, special: specialChance, hint: hintMode,
    timer: discussionSeconds, packages: [...selectedPackages] };
  const next = presetDraft.id ? savedPresets.map(item => item.id === presetDraft.id ? preset : item) : [...savedPresets, preset];
  if (!presetStore.write(next)) { status.textContent = 'Kunde inte spara. Lagring är inte tillgänglig på den här enheten.'; return; }
  savedPresets = next;
  closePreset('Sparade '+preset.name+'.');
}
function bindPresetGrid() {
  const grid = document.querySelector('#preset-grid');
  savedPresets.forEach(preset => {
    const tile = document.createElement('button');
    tile.type = 'button'; tile.className = 'preset-tile';
    tile.innerHTML = '<strong>'+escape(preset.name)+'</strong><small>'+preset.players.length+' spelare</small>';
    tile.onclick = () => {
      orderBackup = captureSetup(); orderPreset = preset;
      applySetup(preset); go(8);
    };
    grid.append(tile);
  });
  const add = document.createElement('button');
  add.type = 'button'; add.className = 'preset-tile preset-add'; add.id = 'preset-add';
  add.innerHTML = '<span aria-hidden="true">+</span><small>Nytt preset</small>';
  add.setAttribute('aria-label', 'Skapa nytt preset');
  add.onclick = () => beginPreset();
  grid.append(add);
}
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const motion = { duration: 220, easing: 'cubic-bezier(.2,.8,.2,1)' };
// Replace immediately: a hidden role must never linger in an outgoing layer.
function changeText(element, value, direction = 0, { fade = true, animate = true } = {}) {
  const text = String(value);
  if (element.textContent === text) return;
  const previous = element.textContent;
  element.getAnimations().forEach(animation => animation.cancel());
  element.textContent = text;
  if (!previous || !animate || reducedMotion.matches) return;
  element.animate([
    { ...(fade ? { opacity: .25 } : {}), translate: '0 ' + (direction ? direction * 7 : 3) + 'px' },
    { ...(fade ? { opacity: 1 } : {}), translate: '0 0' }
  ], motion);
}
// Each decimal place rolls independently; unchanged digits stay still.
const numberValues = new WeakMap();
function settleDigit(column, value) {
  column.animations.forEach(animation => animation.cancel());
  column.animations = [];
  column.current.textContent = value;
  column.cell.replaceChildren(column.current);
  column.value = value;
}
function rollDigit(column) {
  if (column.animations.length || column.value === column.target) return;
  const outgoing = column.current;
  const incoming = document.createElement('span');
  incoming.textContent = column.target;
  column.cell.append(incoming);
  column.current = incoming;
  column.value = column.target;
  // Increasing values enter above and push the old glyph below.
  const offset = column.direction > 0 ? -100 : 100;
  const options = { duration: 180, easing: motion.easing };
  const exit = outgoing.animate([
    { transform: 'translateY(0)', filter: 'blur(0px)' },
    { transform: 'translateY(' + -offset + '%)', filter: 'blur(.5px)' }
  ], options);
  const entry = incoming.animate([
    { transform: 'translateY(' + offset + '%)', filter: 'blur(.5px)' },
    { transform: 'translateY(0)', filter: 'blur(0px)' }
  ], options);
  column.animations = [exit, entry];
  entry.onfinish = () => {
    outgoing.remove();
    column.animations = [];
    if (column.cell.isConnected) rollDigit(column);
  };
}
function changeNumber(element, target, { animate = true, prefix = '', suffix = '', places = 2, zeroPad = false } = {}) {
  let state = numberValues.get(element);
  if (state?.target === target) return;
  if (!state) {
    const reading = document.createElement('span');
    reading.className = 'sr-only';
    const visual = document.createElement('span');
    visual.className = 'number-visual';
    visual.setAttribute('aria-hidden', 'true');
    const number = document.createElement('span');
    number.className = 'number-digits';
    const digits = Array.from({ length: places }, () => {
      const cell = document.createElement('span');
      cell.className = 'digit-cell';
      const current = document.createElement('span');
      cell.append(current);
      number.append(cell);
      return { cell, current, value: '', target: '', direction: 1, animations: [] };
    });
    visual.append(document.createTextNode(prefix), number, document.createTextNode(suffix));
    element.replaceChildren(reading, visual);
    state = { target, reading, digits };
    numberValues.set(element, state);
    animate = false;
  }
  const direction = target >= state.target ? 1 : -1;
  state.target = target;
  state.reading.textContent = prefix + target + suffix;
  const text = String(target).padStart(state.digits.length, zeroPad ? '0' : ' ');
  state.digits.forEach((column, index) => {
    column.target = text[index];
    column.cell.classList.toggle('digit-empty', text[index] === ' ');
    column.direction = direction;
    if (!animate || reducedMotion.matches) settleDigit(column, text[index]);
    else rollDigit(column);
  });
}
function durationLabel(seconds) {
  if (!seconds) return 'Av';
  const minutes = Math.floor(seconds / 60);
  return [minutes ? minutes+' '+(minutes === 1 ? 'minut' : 'minuter') : '', seconds % 60 ? seconds % 60+' sekunder' : ''].filter(Boolean).join(' ');
}
function changeTime(element, seconds, animate) {
  if (!element.querySelector('.time-value')) {
    element.innerHTML = '<span class="time-off">Av</span><span class="time-value" aria-hidden="true"><span class="time-minutes"></span><span>:</span><span class="time-seconds"></span></span><span class="sr-only time-reading"></span>';
  }
  element.querySelector('.time-off').hidden = seconds !== 0;
  element.querySelector('.time-value').hidden = seconds === 0;
  element.querySelector('.time-reading').textContent = seconds ? durationLabel(seconds) : '';
  changeNumber(element.querySelector('.time-minutes'), Math.floor(seconds / 60), { animate });
  changeNumber(element.querySelector('.time-seconds'), seconds % 60, { animate, places: 2, zeroPad: true });
}
// Percentage drums move continuously, including through intermediate digits.
const percentDrums = new WeakMap();
function changePercent(element, target, animate, prefix = '') {
  let state = percentDrums.get(element);
  if (state?.target === target) return;
  if (!state) {
    const reading = document.createElement('span');
    reading.className = 'sr-only';
    const visual = document.createElement('span');
    visual.className = 'number-visual';
    visual.setAttribute('aria-hidden', 'true');
    const number = document.createElement('span');
    number.className = 'number-digits';
    const digits = Array.from({ length: 3 }, () => {
      const cell = document.createElement('span');
      cell.className = 'digit-cell drum-cell';
      const belt = document.createElement('span');
      belt.className = 'digit-belt';
      for (let i = 0; i < 30; i++) {
        const glyph = document.createElement('span');
        glyph.textContent = String(9 - i % 10);
        belt.append(glyph);
      }
      cell.append(belt);
      number.append(cell);
      return { cell, belt };
    });
    visual.append(document.createTextNode(prefix), number, document.createTextNode(' % chans'));
    element.replaceChildren(reading, visual);
    state = { value: target, target, reading, digits, frame: null, last: 0 };
    percentDrums.set(element, state);
    animate = false;
  }
  state.target = target;
  state.reading.textContent = prefix + target + ' % chans';
  function paint(speed = 0) {
    state.digits.forEach(({cell, belt}, index) => {
      const place = 10 ** (2 - index);
      // Higher places roll only during the carry (e.g. 59 -> 60).
      const position = Math.floor(state.value / place) + Math.max(0, state.value % place - (place - 1));
      const row = 19 - (position % 10);
      cell.classList.toggle('digit-empty', place > Math.max(1, state.value, state.target));
      belt.style.transform = 'translateY(' + (-row * 1.5) + 'em)';
      belt.style.filter = speed ? 'blur(' + Math.min(.6, speed * .08) + 'px)' : '';
    });
  }
  if (!animate || reducedMotion.matches) {
    if (state.frame !== null) cancelAnimationFrame(state.frame);
    state.frame = null;
    state.value = target;
    paint();
    return;
  }
  // Retarget the running belt instead of queuing or restarting an animation.
  if (state.frame !== null) return;
  state.last = performance.now();
  function tick(now) {
    if (!element.isConnected) { state.frame = null; return; }
    const elapsed = Math.min(40, Math.max(0, now - state.last));
    state.last = now;
    const distance = state.target - state.value;
    if (reducedMotion.matches || Math.abs(distance) < .015) {
      state.value = state.target;
      state.frame = null;
      paint();
      return;
    }
    const step = distance * (1 - Math.exp(-elapsed / 40));
    state.value += step;
    paint(Math.abs(step));
    state.frame = requestAnimationFrame(tick);
  }
  state.frame = requestAnimationFrame(tick);
}
function playerRow(name, i, list) {
  const li = document.createElement('li');
  li.innerHTML = '<b>'+String(i+1).padStart(2,'0')+'</b><input maxlength="40" aria-label="Namn på spelare '+(i+1)+'" placeholder="Spelare '+(i+1)+'"><button class="grip" aria-label="Flytta spelare '+(i+1)+' med drag eller piltangenter"><svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true" focusable="false"><path d="M3.5 6.5h11M3.5 11.5h11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></button>';
  const input = li.querySelector('input');
  input.value = name;
  input.oninput = () => { names[i] = input.value; };
  bindDrag(li, i, list);
  return li;
}
function changePlayers(delta, list) {
  if (list.classList.contains('sorting')) return;
  if ((delta > 0 && names.length >= 20) || (delta < 0 && names.length <= 3)) return;
  const previousHeight = list.getBoundingClientRect().height;
  list.getAnimations().forEach(animation => animation.cancel());
  list.querySelectorAll('.leaving').forEach(row => row.remove());
  let row;
  if (delta > 0) {
    names.push('');
    roleHistory.push({ debt: 0, last: 0 });
    row = playerRow('', names.length - 1, list);
    list.append(row);
  } else {
    names.pop();
    roleHistory.pop();
    row = list.lastElementChild;
    const top = row.offsetTop;
    const height = row.getBoundingClientRect().height;
    row.classList.add('leaving');
    row.inert = true;
    row.setAttribute('aria-hidden', 'true');
    Object.assign(row.style, { position: 'absolute', top: top + 'px', width: '100%', height: height + 'px' });
  }
  count = Math.min(count, names.length - 1);
  changeNumber(document.querySelector('#player-count'), names.length);
  document.querySelector('#less').disabled = names.length <= 3;
  document.querySelector('#more').disabled = names.length >= 20;
  if (reducedMotion.matches) {
    if (delta < 0) row.remove();
    return;
  }
  const targetHeight = list.getBoundingClientRect().height;
  list.animate([{ height: previousHeight + 'px' }, { height: targetHeight + 'px' }], motion);
  const frames = [{ opacity: 0, translate: '0 10px', scale: '.98' }, { opacity: 1, translate: '0 0', scale: '1' }];
  const animation = row.animate(delta > 0 ? frames : [...frames].reverse(), { ...motion, duration: delta > 0 ? 220 : 150 });
  if (delta < 0) animation.onfinish = () => row.remove();
}
function go(next, entryDirection = null) {
  const direction = entryDirection ?? (next < stage ? 'back' : 'forward');
  stage = next;
  render();
  screen.dataset.entry = direction;
  document.querySelector('h1').focus();
}
function setupRound() {
  if (!selectedPackages.length) return;
  const roll = Math.random()*100;
  const n = roll < specialChance / 2 ? names.length : roll < specialChance ? 0 : count;
  const order = names.map((_, i) => i);
  for (let i = order.length-1; i>0; i--) {
    const j = Math.floor(Math.random()*(i+1));
    [order[i],order[j]] = [order[j],order[i]];
  }
  if (n > 0 && n < names.length) {
    balancedRounds++;
    roleHistory.forEach(history => { history.debt += n / names.length; });
    order.sort((a, b) => roleHistory[b].debt - roleHistory[a].debt || roleHistory[a].last - roleHistory[b].last);
    order.slice(0, n).forEach(index => {
      roleHistory[index].debt -= 1;
      roleHistory[index].last = balancedRounds;
    });
  }
  bluffers = new Set(order.slice(0,n));
  starter = Math.floor(Math.random()*names.length);
  pair = usePlaceholders ? placeholderPair : wordDeck.draw(selectedPackages);
  turn = 0; seen = false; go(2, 'forward');
}
function bindDrag(row, index, list) {
  const handle = row.querySelector('.grip');
  let active = null;
  let startY, pointerY, frame, destination;
  let rows, slots;
  function paint() {
    const delta = pointerY + window.scrollY - startY;
    const offset = Math.max(slots[0]-slots[index], Math.min(slots.at(-1)-slots[index], delta));
    const top = slots[index] + offset;
    const previousDestination = destination;
    destination = 0;
    while (destination < slots.length-1 && top > (slots[destination]+slots[destination+1])/2) destination++;
    if (destination !== previousDestination) haptic('tick');
    rows.forEach((item, i) => {
      let target = i;
      if (i > index && i <= destination) target--;
      if (i < index && i >= destination) target++;
      item.style.transform = 'translateY(' + (i === index ? offset : slots[target]-slots[i]) + 'px)';
    });
  }
  function follow() {
    if (!row.isConnected || active === null) return;
    const edge = 64;
    const speed = Math.max(0, pointerY-innerHeight+edge) - Math.max(0, edge-pointerY);
    if (speed) window.scrollBy(0, Math.sign(speed)*Math.ceil(Math.min(12,Math.abs(speed)/5)));
    paint();
    frame = requestAnimationFrame(follow);
  }
  function commit(destination) {
    if (destination !== index) {
      names.splice(destination, 0, names.splice(index, 1)[0]);
      roleHistory.splice(destination, 0, roleHistory.splice(index, 1)[0]);
    }
    render();
    screen.querySelectorAll('.grip')[destination].focus({preventScroll:true});
  }
  handle.onkeydown = event => {
    if (!['ArrowUp','ArrowDown'].includes(event.key)) return;
    event.preventDefault();
    const next = Math.max(0, Math.min(names.length-1, index + (event.key === 'ArrowUp' ? -1 : 1)));
    if (next !== index) haptic('tick');
    commit(next);
  };
  handle.onpointerdown = event => {
    if (!event.isPrimary || event.button !== 0) return;
    if (list.classList.contains('sorting')) return;
    active = event.pointerId;
    destination = index;
    haptic();
    rows = [...list.children].filter(item => !item.classList.contains('leaving'));
    slots = rows.map(item => item.getBoundingClientRect().top + window.scrollY);
    pointerY = event.clientY;
    startY = pointerY + window.scrollY;
    handle.setPointerCapture(active);
    list.classList.add('sorting');
    row.classList.add('dragging');
    follow();
  };
  handle.onpointermove = event => {
    if (event.pointerId === active) pointerY = event.clientY;
  };
  function finish(cancelled) {
    if (active === null) return;
    active = null;
    cancelAnimationFrame(frame);
    const previousTop = row.getBoundingClientRect().top;
    const finalIndex = cancelled ? index : destination;
    if (!cancelled && finalIndex !== index) haptic('drop');
    commit(finalIndex);
    const placed = screen.querySelectorAll('li')[finalIndex];
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const distance = previousTop - placed.getBoundingClientRect().top;
      placed.animate([{transform:'translateY('+distance+'px)', scale:'1.015'}, {transform:'none', scale:'1'}],
        {duration:180, easing:'cubic-bezier(.2,.8,.2,1)'});
    }
  }
  handle.onpointerup = event => {
    if (event.pointerId !== active) return;
    pointerY = event.clientY;
    paint();
    finish(false);
  };
  handle.onlostpointercapture = handle.onpointercancel = () => finish(true);
}
function secretMarkup() {
  return '<span class="secret-object" aria-hidden="true">'+
    '<span class="secret-face secret-back"><span class="secret-mark">Bluff</span><span class="secret-copy">Håll för att kika</span><span class="secret-emblem">◇</span></span>'+
    '<span class="secret-face secret-front"><span class="secret-mark">Ditt rollkort</span><span class="secret-role"></span></span></span>';
}
let finishResultReveal = null;
let stopDiscussionTimer = null;
let cleanupRules = null;
function render() {
  cleanupRules?.();
  cleanupRules = null;
  stopDiscussionTimer?.();
  stopDiscussionTimer = null;
  finishResultReveal?.();
  finishResultReveal = null;
  delete screen.dataset.entry;
  screen.dataset.stage = stage;
  document.querySelector('footer').hidden = stage > 0;
  const title = text => '<h1 tabindex="-1">'+text+'</h1>';
  if (stage === 0 || stage === 6 || stage === 8) {
    const editing = stage === 6;
    const ordering = stage === 8;
    screen.innerHTML = title(ordering ? 'Spelordning' : editing ? (presetDraft.id ? 'Ändra preset' : 'Nytt preset') : 'Spelare')+
      (ordering ? '<p class="page-intro">'+escape(orderPreset.name)+'</p><p class="setting-note">Dra spelarna till den ordning ni sitter i. Sedan delar vi ut rollkorten.</p>' : '')+
      (editing ? '<div class="preset-name-field"><label for="preset-name">Namn på preset</label><input id="preset-name" class="text-field" maxlength="40" placeholder="Till exempel Fredagsgänget" autocomplete="off"></div>' : '')+
      (!ordering ? '<div class="counter">'+button('less','−')+'<strong role="status" aria-atomic="true"><span id="player-count" class="changing-value">'+names.length+'</span> spelare</strong>'+button('more','+')+'</div>' : '')+
      '<ol></ol>'+
      (stage === 0 ? '<div id="presets"><h2 class="settings-heading">Presets</h2><div id="preset-grid" class="selection-grid preset-grid"></div><p id="home-status" class="setting-note" role="status">'+escape(homeNotice)+'</p></div>' : '')+
      (editing ? '<p id="preset-status" class="setting-note" role="status"></p>' : '')+
      button('next', ordering ? 'Dela ut rollkort' : 'Till regler')+
      (ordering ? '<button type="button" class="quiet-button" id="edit-preset">Ändra preset</button>'+button('back','Tillbaka') : editing ? button('back','Avbryt')+(presetDraft.id ? '<button type="button" class="quiet-button danger-button" id="delete-preset">Ta bort preset</button>' : '') :
        '<button type="button" id="placeholders" aria-pressed="'+usePlaceholders+'">Placeholders (dev): '+(usePlaceholders ? 'på' : 'av')+'</button>');
    const list = screen.querySelector('ol');
    names.forEach((name, i) => {
      const row = playerRow(name, i, list);
      if (ordering) { const input = row.querySelector('input'); input.readOnly = true; input.value = label(i); }
      list.append(row);
    });
    if (!ordering) {
      changeNumber(document.querySelector('#player-count'), names.length, { animate: false });
      for (const [id,delta] of [['less',-1],['more',1]]) {
        const control = document.getElementById(id);
        control.setAttribute('aria-label',delta>0?'Lägg till spelare':'Ta bort sista spelaren');
        control.disabled = delta>0 ? names.length>=20 : names.length<=3;
        control.onclick = () => changePlayers(delta, list);
      }
    }
    if (editing) {
      const input = document.querySelector('#preset-name'); input.value = presetDraft.name;
      input.oninput = () => { presetDraft.name = input.value.trim(); };
      const next = () => {
        if (!presetDraft.name) { document.querySelector('#preset-status').textContent = 'Ge ditt preset ett namn.'; input.focus(); return; }
        go(7);
      };
      input.onkeydown = event => { if (event.key === 'Enter') { event.preventDefault(); next(); } };
      on('next', next);
      on('back', () => closePreset());
      if (presetDraft.id) on('delete-preset', () => {
        const next = savedPresets.filter(item => item.id !== presetDraft.id);
        if (!presetStore.write(next)) { document.querySelector('#preset-status').textContent = 'Kunde inte ta bort preset. Lagring är inte tillgänglig.'; return; }
        savedPresets = next; closePreset('Presetet togs bort.');
      });
    } else if (ordering) {
      on('next', () => { orderPreset = orderBackup = null; setupRound(); });
      on('back', () => { applySetup(orderBackup); orderPreset = orderBackup = null; go(0); });
      on('edit-preset', () => {
        const preset = orderPreset;
        applySetup(orderBackup); orderPreset = orderBackup = null;
        beginPreset(preset);
      });
    } else {
      bindPresetGrid();
      on('placeholders', () => {
        usePlaceholders = !usePlaceholders;
        const toggle = document.getElementById('placeholders');
        toggle.setAttribute('aria-pressed', String(usePlaceholders));
        toggle.textContent = 'Placeholders (dev): ' + (usePlaceholders ? 'på' : 'av');
      });
      on('next', () => go(1));
    }
  } else if (stage === 1 || stage === 7) {
    function field(id, text, value, min, max, step = 1) {
      return '<div class="rule"><label for="'+id+'">'+text+'</label><div class="slider">'+
        '<span class="bubble" aria-hidden="true"><span class="changing-value"></span></span><input type="range" id="'+id+
        '" min="'+min+'" max="'+max+'" step="'+step+'" value="'+value+'"></div></div>';
    }
    screen.innerHTML = title(stage === 7 ? 'Regler för preset' : 'Regler')+(stage === 7 ? '<p class="page-intro">'+escape(presetDraft.name)+'</p>' : '')+'<form class="rules-form">'+
      '<div class="rule count-rule" role="group" aria-labelledby="count-label"><span id="count-label" class="rule-label">Antal Bluffare</span>'+
      '<input type="number" id="count" min="1" max="'+(names.length-1)+'" value="'+count+'" hidden>'+
      '<div class="counter rule-counter"><button type="button" id="count-less" aria-label="Minska antal bluffare">−</button>'+
      '<strong id="bluffer-count" role="status" aria-atomic="true"></strong>'+
      '<button type="button" id="count-more" aria-label="Öka antal bluffare">+</button></div></div>'+

      '<fieldset class="hint-setting"><legend class="rule-label">Bluffarens information</legend><div class="hint-options">'+
      [['none','Ingen ledtråd'],['category','Kategori'],['clue','Ledtråd']].map(([value, text]) =>
        '<label><input type="radio" name="hint-mode" value="'+value+'"'+(hintMode === value ? ' checked' : '')+'><span>'+text+'</span></label>'
      ).join('')+'</div><button type="button" class="secondary-button category-link" id="choose-categories">Välj kategorier <span aria-hidden="true">→</span></button></fieldset>'+
      '<div class="settings-group timer-setting">'+field('duration','Diskussionstimer',discussionSeconds,0,600)+'<div class="choice-row timer-shortcuts">'+
      timerOptions.map(([seconds, text]) => '<button type="button" data-timer="'+seconds+'" aria-pressed="'+(seconds === discussionSeconds)+'">'+text+'</button>').join('')+
      '</div></div>'+
      field('special','Alla eller ingen bluffar',specialChance,0,100)+
      (stage === 7 ? '<p class="setting-note" id="preset-status" role="status"></p>' : '')+
      '<button id="deal">'+(stage === 7 ? 'Spara preset' : 'Dela ut rollkort')+'</button></form>'+button('back',stage === 7 ? 'Tillbaka till presetet' : 'Tillbaka till spelarna');
    const form = screen.querySelector('form');
    const controls = [...form.querySelectorAll('input[type=number], input[type=range]')];
    const rulerControls = controls.filter(input => input.type === 'range');
    const rulerControllers = new Map();
    const rulerPositions = new Map();
    const rulerSlides = new Map();
    function stopRulers() {
      rulerControllers.forEach(stop => stop());
      for (const [input, slide] of rulerSlides) {
        cancelAnimationFrame(slide.frame);
        rulerSlides.delete(input);
        input.closest('.rule').classList.remove('gliding');
        paintRuler(input);
      }
    }
    function glideRuler(input, target, from = rulerPositions.get(input) ?? input.valueAsNumber) {
      input.value = target;
      if (reducedMotion.matches || from === target) { refresh(true); return; }
      const rule = input.closest('.rule');
      const slide = { value: from, frame: null };
      rulerSlides.set(input, slide);
      rule.classList.add('gliding');
      refresh(true);
      const started = performance.now();
      const duration = Math.min(760, 320 + Math.abs(target - from) * 2);
      function tick(now) {
        if (!input.isConnected) { rulerSlides.delete(input); return; }
        const progress = reducedMotion.matches ? 1 : Math.min(1, (now - started) / duration);
        slide.value = rulerSlidePosition(from, target, progress, Number(input.min), Number(input.max));
        paintRuler(input, slide.value);
        if (progress < 1) slide.frame = requestAnimationFrame(tick);
        else { rulerSlides.delete(input); rule.classList.remove('gliding'); paintRuler(input); }
      }
      slide.frame = requestAnimationFrame(tick);
    }
    function paintRuler(input, value = rulerSlides.get(input)?.value ?? input.valueAsNumber) {
      if (input.id === 'count') return;
      rulerPositions.set(input, value);
      const rule = input.closest('.rule');
      const radius = Math.max(1, rule.querySelector('.slider').clientWidth / 2 - 8);
      const step = 10;
      const min = Number(input.min), max = Number(input.max);
      for (const tick of rule.querySelectorAll('.ruler-ticks i')) {
        const n = Number(tick.dataset.value);
        const angle = (n - value) * step / radius;
        const visible = n >= min && n <= max && Math.abs(angle) < 1.45;
        tick.hidden = !visible;
        if (!visible) continue;
        const depth = Math.cos(angle);
        tick.style.transform = 'translateX(' + (radius * Math.sin(angle)) + 'px) translateY(-50%) scale(' + depth + ', ' + (.3 + .7 * depth) + ')';
        tick.style.opacity = String(Math.pow(depth, 1.8));
      }
    }

    for (const input of rulerControls) {
      const rule = input.closest('.rule');
      rule.classList.toggle('percent-rule', input.id === 'special');
      const track = rule.querySelector('.slider');
      const ticks = document.createElement('span');
      ticks.className = 'ruler-ticks';
      ticks.setAttribute('aria-hidden', 'true');
      const step = 10;
      rule.style.setProperty('--tick-step', step + 'px');
      for (let value = Number(input.min); value <= Number(input.max); value++) {
        const tick = document.createElement('i');
        tick.dataset.value = value;
        if (value % (input.id === 'duration' ? 30 : 10) === 0) tick.classList.add('major');
        else if (value % 5 === 0) tick.classList.add('mid');
        ticks.append(tick);
      }
      const rulerWindow = document.createElement('span');
      rulerWindow.className = 'ruler-window';
      rulerWindow.setAttribute('aria-hidden', 'true');
      rulerWindow.append(ticks);
      track.append(rulerWindow);
    }
    function refresh(animate = false, direct = false) {
      for (const input of controls) {
        if (input.id === 'count') {
          changeNumber(document.querySelector('#bluffer-count'), input.valueAsNumber, { animate });
          document.querySelector('#count-less').disabled = input.valueAsNumber <= Number(input.min);
          document.querySelector('#count-more').disabled = input.valueAsNumber >= Number(input.max);
          continue;
        }
        const min = Number(input.min), max = Number(input.max);
        const rule = input.closest('.rule');
        rule.classList.toggle('direct-input', !animate || direct);
        const time = input.id === 'duration';
        const seconds = input.valueAsNumber;
        const text = time ? durationLabel(seconds) : input.value+' % chans';
        paintRuler(input);
        const output = rule.querySelector('.bubble .changing-value');
        if (time) changeTime(output, seconds, animate);
        else changePercent(output, input.valueAsNumber, animate);
        input.setAttribute('aria-valuetext',text);
        input.disabled = min === max;
      }
      form.querySelectorAll('[data-timer]').forEach(option => option.setAttribute('aria-pressed', String(Number(option.dataset.timer) === form.elements.duration.valueAsNumber)));
    }
    for (const input of rulerControls) {
      const rule = input.closest('.rule');
      const track = rule.querySelector('.slider');
      const step = 10;
      let pointer = null, startX = 0, original = 0, position = 0;
      let velocity = 0, lastX = 0, lastTime = 0, frame = null;
      const clamp = value => Math.max(Number(input.min), Math.min(Number(input.max), value));
      const snapUnit = input.id === 'duration' ? 30 : 5;
      const snapToNotch = value => clamp(Math.round(value / snapUnit) * snapUnit);
      function stop() {
        if (frame !== null) {
          input.value = snapToNotch(position);
          position = input.valueAsNumber;
        }
        if (frame !== null) cancelAnimationFrame(frame);
        frame = null;
        velocity = 0;
        rule.classList.remove('coasting');
        if (pointer === null) rule.classList.remove('tracking');
      }
      rulerControllers.set(input, stop);
      function apply(value) {
        position = clamp(value);
        const previous = input.valueAsNumber;
        input.value = Math.round(position);
        if (input.valueAsNumber !== previous) haptic('tick');
        refresh(true, true);
        paintRuler(input, position);
      }
      function move(event) {
        if (event.clientX !== lastX) {
          const elapsed = Math.max(1, event.timeStamp - lastTime);
          const speed = (lastX - event.clientX) / (step * elapsed);
          velocity = .65 * speed + .35 * velocity;
          const limit = .15;
          velocity = Math.max(-limit, Math.min(limit, velocity));
          lastX = event.clientX;
          lastTime = event.timeStamp;
        }
        apply(original - (event.clientX - startX) / step);
      }
      function snap(momentum = false) {
        const previous = input.valueAsNumber;
        input.value = momentum ? snapToNotch(position) : clamp(Math.round(position));
        if (input.valueAsNumber !== previous) haptic('tick');
        position = input.valueAsNumber;
        frame = null;
        rule.classList.remove('tracking', 'coasting');
        refresh(true);
      }
      track.onpointerdown = event => {
        if (pointer !== null || !event.isPrimary || event.button !== 0 || input.disabled) return;
        event.preventDefault();
        const visible = rulerSlides.get(input)?.value;
        stopRulers();
        if (visible !== undefined) input.value = Math.round(visible);
        refresh(true);
        input.focus({preventScroll:true});
        pointer = event.pointerId;
        startX = lastX = event.clientX;
        lastTime = event.timeStamp;
        original = position = input.valueAsNumber;
        haptic();
        track.setPointerCapture(pointer);
        rule.classList.add('tracking');
      };
      track.onpointermove = event => { if (event.pointerId === pointer) move(event); };
      function finish(event) {
        if (event.pointerId !== pointer) return;
        const released = event.type === 'pointerup';
        if (released) move(event);
        else { input.value = original; position = original; refresh(true, true); }
        pointer = null;
        if (!released || reducedMotion.matches || event.timeStamp - lastTime > 100 || Math.abs(velocity) * step < .12) {
          snap();
          return;
        }
        rule.classList.add('coasting');
        let previous = performance.now();
        function coast(now) {
          if (!track.isConnected) { stop(); return; }
          if (reducedMotion.matches) { snap(true); return; }
          const elapsed = Math.min(40, now - previous);
          previous = now;
          const decay = Math.exp(-elapsed / 180);
          const next = position + velocity * 180 * (1 - decay);
          velocity *= decay;
          apply(next);
          if (next !== position || Math.abs(velocity) * step < .025) snap(true);
          else frame = requestAnimationFrame(coast);
        }
        frame = requestAnimationFrame(coast);
      }
      track.onpointerup = track.onpointercancel = track.onlostpointercapture = finish;
    }
    for (const [id, delta] of [['count-less', -1], ['count-more', 1]]) {
      on(id, () => {
        stopRulers();
        const input = form.elements.count;
        input.value = Math.max(Number(input.min), Math.min(Number(input.max), input.valueAsNumber + delta));
        refresh(true);
      });
    }
    const resizeRulers = new ResizeObserver(() => {
      if (!form.isConnected) { resizeRulers.disconnect(); return; }
      controls.forEach(input => paintRuler(input));
    });
    resizeRulers.observe(form);
    cleanupRules = () => { stopRulers(); resizeRulers.disconnect(); };
    function save(){ stopRulers(); refresh(); count = form.elements.count.valueAsNumber; specialChance = form.elements.special.valueAsNumber; discussionSeconds = form.elements.duration.valueAsNumber; hintMode = form.elements['hint-mode'].value; }
    form.querySelectorAll('[data-timer]').forEach(control => {
      control.onclick = () => {
        const input = form.elements.duration;
        const from = rulerPositions.get(input);
        stopRulers();
        glideRuler(input, Number(control.dataset.timer), from);
      };
    });
    form.oninput = event => {
      // A keyboard/assistive update wins over the last coasting frame.
      const input = event.target;
      const value = input.value;
      if (input.matches('input[type=range]')) haptic('tick');
      stopRulers();
      input.value = value;
      refresh(true, true);
    };
    refresh();
    on('choose-categories', () => {
      save(); categoryReturnStage = stage; categoryDraft = [...selectedPackages]; go(5);
    });
    form.onsubmit=e=>{ e.preventDefault(); save(); if (stage === 7) savePreset(); else setupRound(); };
    on('back',()=>{ if(form.checkValidity()) save(); go(stage === 7 ? 6 : 0); });
  } else if (stage === 5) {
    screen.innerHTML = title('Kategorier')+'<div class="settings-toolbar"><p id="category-count" class="setting-note" role="status"></p>'+button('categories-all','Alla')+'</div>'+
      '<div class="selection-grid category-grid">'+wordPackages.map((category, i) =>
        '<button type="button" class="category-tile" data-category="'+i+'" aria-pressed="false"><strong>'+escape(category)+'</strong><small>'+words.filter(entry => entry.category === category).length+' ord</small></button>').join('')+'</div>'+
      '<div class="category-actions"><p class="setting-note" id="category-error" hidden>Välj minst en kategori.</p>'+button('categories-done','Klart')+button('back','Tillbaka utan att ändra')+'</div>';
    function paintCategories() {
      screen.querySelectorAll('[data-category]').forEach(control => control.setAttribute('aria-pressed', String(categoryDraft.includes(wordPackages[Number(control.dataset.category)]))));
      const all = categoryDraft.length === wordPackages.length;
      document.querySelector('#categories-all').setAttribute('aria-pressed', String(all));
      document.querySelector('#categories-all').setAttribute('aria-label', all ? 'Avmarkera alla kategorier' : 'Välj alla kategorier');
      document.querySelector('#category-count').textContent = categoryDraft.length+' av '+wordPackages.length+' valda';
      document.querySelector('#category-error').hidden = categoryDraft.length > 0;
      document.querySelector('#categories-done').disabled = categoryDraft.length === 0;
    }
    screen.querySelectorAll('[data-category]').forEach(control => {
      control.onclick = () => {
        const category = wordPackages[Number(control.dataset.category)];
        categoryDraft = categoryDraft.includes(category) ? categoryDraft.filter(item => item !== category) : [...categoryDraft, category];
        paintCategories();
      };
    });
    on('categories-all', () => { categoryDraft = categoryDraft.length === wordPackages.length ? [] : [...wordPackages]; paintCategories(); });
    on('categories-done', () => { if (categoryDraft.length) { selectedPackages = [...categoryDraft]; go(categoryReturnStage); } });
    on('back', () => go(categoryReturnStage));
    paintCategories();
  } else if (stage === 2) {
    screen.innerHTML = title(escape(label(turn)))+'<button class="secret" id="hold" aria-label="Håll för att kika" aria-live="polite">'+secretMarkup()+'</button>'+button('next',turn===names.length-1?'Starta rundan':'Nästa spelare');
    const hold = document.querySelector('#hold'), next = document.querySelector('#next');
    next.hidden=!seen;
    function reveal(){
      if(!hold.classList.contains('open')) haptic();
      hold.querySelector('.secret-role').textContent = roleText(turn);
      hold.setAttribute('aria-label', roleText(turn));
      hold.classList.toggle('bluff',bluffers.has(turn));
      hold.classList.add('open');
      seen=true; next.hidden=true;
    }
    function hide(){
      // Clear the role immediately, including when interrupted mid-flip.
      hold.querySelector('.secret-role').textContent = '';
      hold.setAttribute('aria-label', 'Håll för att kika');
      hold.classList.remove('open','bluff');
      next.hidden=!seen;
    }
    hold.onpointerdown=e=>{ if(e.isPrimary && e.button===0){ hold.setPointerCapture(e.pointerId); reveal(); } };
    hold.onpointerup=hold.onpointercancel=hold.onlostpointercapture=hold.onblur=hide;
    hold.oncontextmenu=e=>e.preventDefault();
    hold.onkeydown=e=>{ if([' ','Enter'].includes(e.key)){ e.preventDefault(); if(!e.repeat) reveal(); } };
    hold.onkeyup=e=>{ if([' ','Enter'].includes(e.key)){ e.preventDefault(); hide(); } };
    on('next',()=>{ hide(); advancePlayer(hold, next); });
  } else if (stage === 3) {
    screen.innerHTML=title('<span class="starter-name">'+escape(label(starter))+'</span> <span class="starter-caption">börjar</span>')+
      (discussionSeconds ? '<div class="discussion-clock"><span class="clock-label">Diskussion</span><div id="timer-display" role="timer" aria-label="Återstående diskussionstid"></div><p id="timer-status" class="sr-only" role="status"></p><div class="choice-row">'+button('timer-toggle','Starta timer')+button('timer-reset','Börja om')+'</div></div>' : '')+
      button('next','Visa resultat');
    if (discussionSeconds) {
      const clock = createDiscussionTimer(discussionSeconds);
      let expired = false;
      const paint = () => {
        const state = clock.read();
        document.querySelector('#timer-display').textContent = Math.floor(state.seconds / 60)+':'+String(state.seconds % 60).padStart(2, '0');
        const toggle = document.querySelector('#timer-toggle');
        toggle.textContent = state.running ? 'Pausa' : state.seconds === discussionSeconds ? 'Starta timer' : 'Fortsätt';
        toggle.disabled = state.seconds === 0;
        document.querySelector('#timer-reset').disabled = !state.running && state.seconds === discussionSeconds;
        const message = state.seconds === 0 ? 'Tiden är slut.' : state.running ? 'Timern är igång.' : state.seconds === discussionSeconds ? '' : 'Timern är pausad.';
        const status = document.querySelector('#timer-status');
        if (status.textContent !== message) status.textContent = message;
        if (state.seconds === 0 && !expired) { expired = true; haptic('drop'); }
      };
      on('timer-toggle', () => { clock.toggle(); paint(); });
      on('timer-reset', () => { clock.reset(); expired = false; paint(); });
      const interval = setInterval(paint, 250);
      document.addEventListener('visibilitychange', paint);
      stopDiscussionTimer = () => { clearInterval(interval); document.removeEventListener('visibilitychange', paint); };
      paint();
    }
    on('next',()=>go(4));
  } else {
    const bluffing = names.map((_, i) => i).filter(i => bluffers.has(i));
    const hint = hintFor(pair, hintMode);
    const hintText = hint || 'Ingen ledtråd';
    const special = bluffing.length === 0 || bluffing.length === names.length;
    const roleSummary = special ? (bluffing.length ? 'Alla bluffade' : 'Ingen bluffade')
      : bluffing.map(i => label(i)).join(', ') + ' bluffade';
    const roleNames = special
      ? '<span class="result-bluffer">'+escape(roleSummary)+'</span>'
      : bluffing.map(i => '<span class="result-bluffer">'+escape(label(i))+'</span>').join('');
    const wordLabel = pair[0]+'. '+hintText+'. Vänd för att se vilka som bluffade.';
    screen.innerHTML = title('Resultat')+'<div class="result-stack">'+
      '<button type="button" id="result-flip" class="result-word secret open" aria-pressed="false" aria-label="'+escape(wordLabel)+'">'+
      '<span class="secret-object" aria-hidden="true">'+
      '<span class="secret-face secret-back result-bluff-face"><span class="result-face-content">'+
      '<span class="result-bluffers">'+roleNames+'</span>'+
      (special ? '' : '<span class="result-card-status">bluffade</span>')+
      '</span><span class="result-card-prompt">Vänd för att se ordet</span></span>'+
      '<span class="secret-face secret-front"><span class="result-face-content"><span class="secret-role">'+escape(pair[0])+'</span>'+
      '<span class="result-card-hint">'+escape(hintText)+'</span></span><span class="result-card-prompt">Vänd för att se bluffarna</span></span></span></button></div>'+
      '<div class="result-actions">'+button('again','Spela nästa runda')+button('back','Ändra spelare och regler')+'</div>';
    const card = screen.querySelector('#result-flip');
    on('result-flip', () => {
      const wordShowing = card.classList.toggle('open');
      card.setAttribute('aria-pressed', String(!wordShowing));
      card.setAttribute('aria-label', wordShowing ? wordLabel : roleSummary+'. Vänd för att se ordet.');
    });
    on('again',setupRound); on('back',()=>go(0));
    revealResults();
  }
}
function revealResults() {
  if (reducedMotion.matches) return;
  const word = screen.querySelector('.result-word');
  const animations = [word.animate([
    { transform: 'translate3d(48px,16px,0) rotate(5deg) scale(.95)', opacity: 0, offset: 0, easing: motion.easing },
    { transform: 'translate3d(-3px,0,0) rotate(-.6deg) scale(1)', opacity: 1, offset: .8, easing: 'ease-out' },
    { transform: 'translate3d(0,0,0) rotate(0deg) scale(1)', opacity: 1, offset: 1 }
  ], { duration: 500, fill: 'both' })];
  animations.push(screen.querySelector('.result-actions').animate([
    { opacity: 0, transform: 'translateY(10px)' },
    { opacity: 1, transform: 'translateY(0)' }
  ], { duration: 180, delay: 320, easing: motion.easing, fill: 'both' }));
  const startTime = document.timeline.currentTime;
  animations.forEach(animation => { animation.startTime = startTime; });
  const finish = () => animations.forEach(animation => animation.finish());
  const skip = event => {
    if (!screen.contains(event.target)) return;
    if (event.type === 'click' || ['Enter', ' '].includes(event.key)) finish();
  };
  finishResultReveal = finish;
  screen.addEventListener('click', skip, true);
  screen.addEventListener('keydown', skip, true);
  reducedMotion.addEventListener('change', finish, { once: true });
  Promise.allSettled(animations.map(animation => animation.finished)).then(() => {
    screen.removeEventListener('click', skip, true);
    screen.removeEventListener('keydown', skip, true);
    reducedMotion.removeEventListener('change', finish);
    if (finishResultReveal === finish) finishResultReveal = null;
    animations.forEach(animation => animation.cancel());
  });
}
function showStarter(hold) {
  const previousHeading = screen.querySelector('h1');
  const from = previousHeading.getBoundingClientRect();
  const cardRect = hold.getBoundingClientRect();
  const previousName = previousHeading.textContent;
  const flight = document.createElement('div');
  flight.className = 'card-flight';
  flight.inert = true;
  flight.setAttribute('aria-hidden', 'true');
  const card = document.createElement('div');
  card.className = 'secret secret-flight-card';
  card.innerHTML = secretMarkup();
  Object.assign(card.style, {
    left: cardRect.left + 'px', top: cardRect.top + 'px',
    width: cardRect.width + 'px', height: cardRect.height + 'px'
  });
  flight.append(card);
  document.body.append(flight);
  go(3);
  delete screen.dataset.entry;
  const name = screen.querySelector('.starter-name');
  const caption = screen.querySelector('.starter-caption');
  const next = screen.querySelector('#next');
  const to = name.getBoundingClientRect();
  const movingName = document.createElement('h1');
  movingName.className = 'name-flight';
  Object.assign(movingName.style, {
    left: from.left + 'px', top: from.top + 'px', width: from.width + 'px'
  });
  const oldWord = document.createElement('span');
  const newWord = document.createElement('span');
  oldWord.className = newWord.className = 'starter-morph-word';
  oldWord.textContent = previousName;
  newWord.textContent = name.textContent;
  movingName.append(oldWord, newWord);
  flight.append(movingName);
  name.classList.add('name-transitioning');
  next.disabled = true;
  const dx = to.left - from.left, dy = to.top - from.top;
  // Give the card a head start; morph early in the descent and land in focus.
  const nameDelay = 140, nameDuration = 520;
  const nameTiming = { duration: nameDuration, delay: nameDelay, fill: 'both' };
  const move = movingName.animate([
    { transform: 'translate3d(0,0,0) scale(1)', offset: 0, easing: 'cubic-bezier(.45,0,.55,1)' },
    { transform: `translate3d(${dx}px,${dy + 10}px,0) scale(1.025)`, offset: .8, easing: 'ease-out' },
    { transform: `translate3d(${dx}px,${dy - 2}px,0) scale(.995)`, offset: .92, easing: 'ease-out' },
    { transform: `translate3d(${dx}px,${dy}px,0) scale(1)`, offset: 1 }
  ], nameTiming);
  // Swap the words only in the middle of a fully blurred plateau. No readable
  // letters crossfade or visibly change shape while the name travels down.
  const blur = movingName.animate([
    { filter: 'blur(0px)', offset: 0 },
    { filter: 'blur(0px)', offset: .04 },
    { filter: 'blur(24px)', offset: .18 },
    { filter: 'blur(24px)', offset: .32 },
    { filter: 'blur(0px)', offset: .48 },
    { filter: 'blur(0px)', offset: 1 }
  ], nameTiming);
  const morphOut = oldWord.animate([
    { opacity: 1, offset: 0 }, { opacity: 1, offset: .25 },
    { opacity: 0, offset: .25 }, { opacity: 0, offset: 1 }
  ], nameTiming);
  const morphIn = newWord.animate([
    { opacity: 0, offset: 0 }, { opacity: 0, offset: .25 },
    { opacity: 1, offset: .25 }, { opacity: 1, offset: 1 }
  ], nameTiming);
  // The outgoing card stays covered and clipped independently of the page.
  const distance = cardRect.right + cardRect.height * .4 + 48;
  const leave = card.animate(Array.from({ length: 31 }, (_, index) => {
    const t = index / 30;
    return { offset: t, transform: `translate3d(${-distance * t * t}px,${-180 * t + 220 * t * t}px,0) rotate(${-24 * t}deg)` };
  }), { duration: 380, fill: 'both' });
  const explain = caption.animate([
    { opacity: 0, transform: 'translateY(8px)' },
    { opacity: 1, transform: 'translateY(0)' }
  ], { duration: 160, delay: nameDelay + nameDuration - 80, easing: motion.easing, fill: 'both' });
  const action = next.animate([{ opacity: 0 }, { opacity: 1 }],
    { duration: 160, delay: nameDelay + nameDuration - 40, fill: 'both' });
  const animations = [move, blur, morphOut, morphIn, leave, explain, action];
  const startTime = document.timeline.currentTime;
  animations.forEach(animation => { animation.startTime = startTime; });
  const finish = () => animations.forEach(animation => animation.finish());
  reducedMotion.addEventListener('change', finish, { once: true });
  Promise.allSettled(animations.map(animation => animation.finished)).then(() => {
    reducedMotion.removeEventListener('change', finish);
    name.classList.remove('name-transitioning');
    flight.remove();
    next.disabled = false;
    animations.forEach(animation => animation.cancel());
  });
}
function advancePlayer(hold, next) {
  if (next.disabled || !seen) return;
  next.disabled = true;
  seen = false;
  turn++;
  if (reducedMotion.matches) {
    go(turn === names.length ? 3 : 2);
    return;
  }
  if (turn === names.length) { showStarter(hold); return; }

  const rect = hold.getBoundingClientRect();
  const previousHeading = screen.querySelector('h1');
  const headingRect = previousHeading.getBoundingClientRect();
  const outgoingHeading = previousHeading.cloneNode(true);
  // Only a covered card is copied: no role text can survive in the flight layer.
  const flight = document.createElement('div');
  flight.className = 'card-flight';
  flight.inert = true;
  flight.setAttribute('aria-hidden', 'true');
  const outgoing = document.createElement('div');
  outgoing.className = 'secret secret-flight-card';
  outgoing.innerHTML = secretMarkup();
  Object.assign(outgoing.style, {
    left: rect.left + 'px', top: rect.top + 'px',
    width: rect.width + 'px', height: rect.height + 'px'
  });
  flight.append(outgoing);
  document.body.append(flight);
  go(2);
  // The card has its own trajectory; suppress the ordinary screen-entry nudge.
  delete screen.dataset.entry;
  const heading = screen.querySelector('h1');
  const incomingHeading = heading.cloneNode(true);
  const incomingHeadingRect = heading.getBoundingClientRect();
  // Each name travels with its card in one shared horizontal coordinate system.
  // Local card rotation/arc cannot make the text depart or land at another time.
  const outgoingPair = document.createElement('div');
  const incomingPair = document.createElement('div');
  outgoingPair.className = incomingPair.className = 'deal-flight-pair';
  for (const [visual, bounds, group] of [
    [outgoingHeading, headingRect, outgoingPair],
    [incomingHeading, incomingHeadingRect, incomingPair]
  ]) {
    visual.removeAttribute('tabindex');
    visual.classList.add('name-flight');
    Object.assign(visual.style, {
      left: bounds.left + 'px', top: bounds.top + 'px', width: bounds.width + 'px'
    });
    group.append(visual);
  }
  outgoingPair.append(outgoing);
  flight.append(outgoingPair, incomingPair);
  heading.classList.add('name-transitioning');
  const incoming = document.querySelector('#hold');
  incoming.inert = true;
  // Animate both visual cards inside the fixed, clipped layer. A transformed
  // card in normal flow can extend the document and pan the viewport sideways.
  const incomingRect = incoming.getBoundingClientRect();
  const incomingVisual = outgoing.cloneNode(true);
  Object.assign(incomingVisual.style, {
    left: incomingRect.left + 'px', top: incomingRect.top + 'px',
    width: incomingRect.width + 'px', height: incomingRect.height + 'px'
  });
  incomingPair.append(incomingVisual);
  incoming.style.visibility = 'hidden';
  const distance = Math.max(rect.right, innerWidth - rect.left) + rect.height * .4 + 48;
  const transform = (x, y, angle) => `translate3d(${x}px, ${y}px, 0) rotate(${angle}deg)`;
  const exitTravel = [], exitArc = [];
  for (let index = 0; index <= 40; index++) {
    const t = index / 40;
    let x, y, angle;
    if (t < .16) {
      const windup = Math.sin(t / .16 * Math.PI / 2);
      x = 12 * windup; y = 3 * windup; angle = 2 * windup;
    } else {
      const throwTime = (t - .16) / .84;
      x = 12 - (distance + 12) * throwTime ** 2;
      y = 3 - 300 * throwTime + 351 * throwTime ** 2;
      angle = 2 - 28 * throwTime;
    }
    exitTravel.push({ offset: t, transform: transform(x, 0, 0) });
    exitArc.push({ offset: t, transform: transform(0, y, angle) });
  }
  const exitTiming = { duration: 460, fill: 'both', easing: 'linear' };
  const exit = outgoingPair.animate(exitTravel, exitTiming);
  const exitCard = outgoing.animate(exitArc, exitTiming);
  const entryTravel = [], entryArc = [];
  for (let index = 0; index <= 60; index++) {
    const t = index / 60;
    const seconds = t * .78;
    const remaining = index === 60 ? 0 : Math.exp(-11.7 * seconds) *
      (Math.cos(9.39 * seconds) + 11.7 / 9.39 * Math.sin(9.39 * seconds));
    const travel = Math.max(0, Math.min(1, 1 - remaining));
    entryTravel.push({ offset: t, transform: transform(distance * remaining, 0, 0) });
    entryArc.push({ offset: t, transform: transform(0,
      42 * remaining - 76 * Math.sin(Math.PI * travel), 16 * remaining) });
  }
  const entryTiming = { duration: 780, delay: 105, fill: 'both', easing: 'linear' };
  const entry = incomingPair.animate(entryTravel, entryTiming);
  const entryCard = incomingVisual.animate(entryArc, entryTiming);
  const animations = [exit, exitCard, entry, entryCard];
  const startTime = document.timeline.currentTime;
  animations.forEach(animation => { animation.startTime = startTime; });
  let landed = false;
  function land() {
    if (landed) return;
    landed = true;
    document.removeEventListener('pointerdown', pressIncoming, true);
    reducedMotion.removeEventListener('change', finishMotion);
    flight.remove();
    heading.classList.remove('name-transitioning');
    incoming.inert = false;
    incoming.style.removeProperty('visibility');
    animations.forEach(animation => animation.cancel());
  }
  function finishMotion() {
    if (landed) return;
    animations.forEach(animation => animation.finish());
    land();
  }
  function pressIncoming(event) {
    if (landed || !incoming.isConnected || !event.isPrimary || event.button !== 0) return;
    const bounds = incomingVisual.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right ||
        event.clientY < bounds.top || event.clientY > bounds.bottom) return;
    // A press on the visible incoming card must become a real hold immediately.
    // Land synchronously, then transfer this active pointer to the real button.
    event.preventDefault();
    event.stopPropagation();
    finishMotion();
    incoming.focus({ preventScroll: true });
    incoming.onpointerdown(event);
  }
  document.addEventListener('pointerdown', pressIncoming, true);
  reducedMotion.addEventListener('change', finishMotion, { once: true });
  Promise.allSettled(animations.map(animation => animation.finished)).then(land);
}
function coverCard(){ document.querySelector('#hold')?.onblur(); }
window.addEventListener('blur',coverCard);
document.addEventListener('visibilitychange',()=>{ if(document.hidden) coverCard(); });
render();
let installPrompt;
window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  installPrompt = event;
  installButton.hidden = false;
});

installButton.addEventListener('click', async () => {
  const prompt = installPrompt;
  installPrompt = undefined;
  installButton.hidden = true;
  await prompt.prompt();
});

window.addEventListener('appinstalled', () => {
  installPrompt = undefined;
  installButton.hidden = true;
});

// Native builds bundle their own assets; a service worker could retain an older APK's files.
if ('serviceWorker' in navigator && !window.Capacitor?.isNativePlatform?.()) {
  navigator.serviceWorker.register('./sw.js').catch(error => {
    console.warn('Offlineläget kunde inte startas', error);
  });
}
