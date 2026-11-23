const screen = document.querySelector('#screen');
const offlineStatus = document.querySelector('#offline');
const installButton = document.querySelector('#install');
const pairs = [['Popcorn','Biokväll'],['Kompass','Utflykt'],['Paraply','Väder'],['Fyr','Kusten'],['Piano','Konsert'],['Kanelbulle','Fika'],['Hängmatta','Semester'],['Skridskor','Vinter']];
const names = ['', '', '', ''];
let stage = 0, count = 1, all = 0, none = 0, turn = 0, starter = 0;
let pair, bluffers, seen = false;
const label = i => names[i].trim() || 'Spelare ' + (i + 1);
const escape = value => value.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const button = (id, title) => '<button type="button" id="'+id+'">'+title+'</button>';
function on(id, fn) { document.getElementById(id).onclick = fn; }
function go(next) {
  const direction = next < stage ? 'back' : 'forward';
  stage = next;
  render();
  screen.dataset.entry = direction;
  document.querySelector('h1').focus();
}
function setupRound() {
  const roll = Math.random()*100;
  const n = roll < all ? names.length : roll < all + none ? 0 : count;
  const order = names.map((_, i) => i);
  for (let i = order.length-1; i>0; i--) {
    const j = Math.floor(Math.random()*(i+1));
    [order[i],order[j]] = [order[j],order[i]];
  }
  bluffers = new Set(order.slice(0,n));
  starter = Math.floor(Math.random()*names.length);
  pair = pairs[Math.floor(Math.random()*pairs.length)];
  turn = 0; seen = false; go(2);
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
    destination = 0;
    while (destination < slots.length-1 && top > (slots[destination]+slots[destination+1])/2) destination++;
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
    if (destination !== index) names.splice(destination, 0, names.splice(index, 1)[0]);
    render();
    screen.querySelectorAll('.grip')[destination].focus({preventScroll:true});
  }
  handle.onkeydown = event => {
    if (!['ArrowUp','ArrowDown'].includes(event.key)) return;
    event.preventDefault();
    commit(Math.max(0, Math.min(names.length-1, index + (event.key === 'ArrowUp' ? -1 : 1))));
  };
  handle.onpointerdown = event => {
    if (!event.isPrimary || event.button !== 0) return;
    if (list.classList.contains('sorting')) return;
    active = event.pointerId;
    rows = [...list.children];
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
    commit(finalIndex);
    const placed = screen.querySelectorAll('li')[finalIndex];
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const distance = previousTop - placed.getBoundingClientRect().top;
      placed.animate([{transform:'translateY('+distance+'px)', scale:'1.025'}, {transform:'none', scale:'1'}],
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
function render() {
  delete screen.dataset.entry;
  screen.dataset.stage = stage;
  const progress = document.querySelector('.round-progress');
  progress.setAttribute('aria-valuenow', String(stage + 1));
  progress.setAttribute('aria-valuetext', 'Steg ' + (stage + 1) + ' av 5');
  progress.style.setProperty('--progress', ((stage + 1) * 20) + '%');
  document.querySelector('footer').hidden = stage > 0;
  const title = text => '<h1 tabindex="-1">'+text+'</h1>';
  if (stage === 0) {
    screen.innerHTML = title('Spelare')+'<div class="counter">'+button('less','−')+'<strong>'+names.length+' spelare</strong>'+button('more','+')+'</div><ol></ol>'+button('next','Till regler');
    const list = screen.querySelector('ol');
    names.forEach((name,i) => {
      const li = document.createElement('li');
      li.innerHTML = '<b>'+String(i+1).padStart(2,'0')+'</b><input maxlength="40" aria-label="Namn på spelare '+(i+1)+'" placeholder="Spelare '+(i+1)+'"><button class="grip" aria-label="Flytta spelare '+(i+1)+' med drag eller piltangenter">⠿</button>';
      const input = li.querySelector('input');
      input.value = name; input.oninput = () => { names[i] = input.value; };
      bindDrag(li,i,list);
      list.append(li);
    });
    for (const [id,delta] of [['less',-1],['more',1]]) {
      const b = document.getElementById(id);
      b.setAttribute('aria-label',delta>0?'Lägg till spelare':'Ta bort sista spelaren');
      b.disabled = delta>0 ? names.length>=20 : names.length<=3;
      b.onclick = () => { if(delta>0) names.push(''); else names.pop(); count=Math.min(count,names.length-1); render(); };
    }
    on('next',()=>go(1));
  } else if (stage === 1) {
    function field(id, text, value, min, max) {
      return '<div class="rule"><label for="'+id+'">'+text+'</label><div class="slider">'+
        '<span class="bubble" aria-hidden="true"></span><input type="range" id="'+id+
        '" min="'+min+'" max="'+max+'" value="'+value+'"></div><div class="presets"></div></div>';
    }
    screen.innerHTML = title('Regler')+'<form>'+
      field('count','Bluffare i vanlig runda',count,1,names.length-1)+
      '<details class="exceptions"'+(all || none ? ' open' : '')+'><summary>Specialrundor <span id="special-chance"></span></summary>'+
      field('all','Alla bluffar',all,0,100)+field('none','Ingen bluffar',none,0,100)+'</details>'+
      '<p id="odds"></p><button>Dela ut rollkort</button></form>'+button('back','Tillbaka till spelarna');
    const form = screen.querySelector('form');
    const controls = [...form.querySelectorAll('input')];
    for (const input of controls) {
      const choices = input.id === 'count' ? [1,2,3,Number(input.max)] : [0,10,25,50,100];
      const rule = input.closest('.rule');
      const presets = rule.querySelector('.presets');
      function resumeDirectInput() { rule.classList.remove('preset-motion'); }
      input.addEventListener('pointerdown', resumeDirectInput);
      input.addEventListener('keydown', resumeDirectInput);

      for (const value of new Set(choices.filter(n => n <= Number(input.max)))) {
        const pick = document.createElement('button');
        pick.type = 'button';
        pick.value = value;
        pick.textContent = value + (input.id === 'count' ? '' : ' %');
        pick.setAttribute('aria-label', input.labels[0].textContent + ', ' + pick.textContent);
        pick.onclick = () => {
          rule.classList.add('preset-motion');
          input.value = value;
          refresh();
        };
        presets.append(pick);
      }
    }
    function refresh() {
      for (const input of controls) {
        const percent = input.id !== 'count';
        if (percent) {
          const other = form.elements[input.id === 'all' ? 'none' : 'all'];
          input.max = 100 - other.valueAsNumber;
        }
        const min = Number(input.min), max = Number(input.max);
        const fraction = (input.valueAsNumber-min) / (max-min || 1);
        const rule = input.closest('.rule');
        const text = input.value + (percent ? ' %' : '');
        rule.style.setProperty('--fill', (100*fraction)+'%');
        rule.querySelector('.bubble').textContent = text;
        input.setAttribute('aria-valuetext',text);
        input.disabled = min === max;
        for (const pick of rule.querySelectorAll('button')) {
          pick.disabled = Number(pick.value) > max;
          pick.setAttribute('aria-pressed',String(pick.value === input.value));
        }
      }
      document.querySelector('#special-chance').textContent = (form.elements.all.valueAsNumber + form.elements.none.valueAsNumber)+' %';
      document.querySelector('#odds').textContent = 'Vanlig runda: '+(100-form.elements.all.valueAsNumber-form.elements.none.valueAsNumber)+' %';
    }
    const countInput = form.elements.count;
    const countRule = countInput.closest('.rule');
    const countTrack = countRule.querySelector('.slider');
    countRule.classList.add('snap-rule');
    let dragPointer = null;
    let originalCount;
    function trackPointer(event) {
      const rect = countTrack.getBoundingClientRect();
      const fraction = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
      countInput.value = Math.round(1 + fraction * (Number(countInput.max) - 1));
      refresh();
      countRule.style.setProperty('--fill', (fraction * 100) + '%');
    }
    countTrack.onpointerdown = event => {
      if (dragPointer !== null || !event.isPrimary || event.button !== 0) return;
      event.preventDefault();
      countInput.focus({preventScroll:true});
      dragPointer = event.pointerId;
      originalCount = countInput.value;
      countTrack.setPointerCapture(dragPointer);
      countRule.classList.remove('preset-motion');
      countRule.classList.add('tracking');
      trackPointer(event);
    };
    countTrack.onpointermove = event => {
      if (event.pointerId === dragPointer) trackPointer(event);
    };
    function settle(event) {
      if (event.pointerId !== dragPointer) return;
      if (event.type === 'pointerup') trackPointer(event);
      else countInput.value = originalCount;
      // Commit the free position before enabling the snap transition.
      getComputedStyle(countRule).getPropertyValue('--fill');
      dragPointer = null;
      countRule.classList.remove('tracking');
      refresh();
    }
    countTrack.onpointerup = countTrack.onpointercancel = countTrack.onlostpointercapture = settle;
    function save(){ [count,all,none]=controls.map(input=>input.valueAsNumber); }
    form.oninput=refresh; refresh();
    form.onsubmit=e=>{ e.preventDefault(); save(); setupRound(); };
    on('back',()=>{ if(form.checkValidity()) save(); go(0); });
  } else if (stage === 2) {
    screen.innerHTML = title(escape(label(turn)))+'<button class="secret" id="hold" aria-live="polite">Håll för att kika</button>'+button('next',turn===names.length-1?'Starta rundan':'Nästa spelare');
    const hold = document.querySelector('#hold'), next = document.querySelector('#next');
    next.hidden=!seen;
    function reveal(){ hold.classList.add('open'); hold.classList.toggle('bluff',bluffers.has(turn)); hold.textContent=bluffers.has(turn)?'Du bluffar\n'+pair[1]:pair[0]; seen=true; next.hidden=true; }
    function hide(){ hold.classList.remove('open','bluff'); hold.textContent='Håll för att kika'; next.hidden=!seen; }
    hold.onpointerdown=e=>{ if(e.isPrimary && e.button===0){ hold.setPointerCapture(e.pointerId); reveal(); } };
    hold.onpointerup=hold.onpointercancel=hold.onlostpointercapture=hold.onblur=hide;
    hold.oncontextmenu=e=>e.preventDefault();
    hold.onkeydown=e=>{ if([' ','Enter'].includes(e.key)){ e.preventDefault(); if(!e.repeat) reveal(); } };
    hold.onkeyup=e=>{ if([' ','Enter'].includes(e.key)){ e.preventDefault(); hide(); } };
    on('next',()=>{ seen=false; turn++; go(turn===names.length?3:2); });
  } else if (stage === 3) {
    screen.innerHTML=title(escape(label(starter))+' börjar')+button('next','Visa resultat');
    on('next',()=>go(4));
  } else {
    const who=names.map((_,i)=>i).filter(i=>bluffers.has(i)).map(i=>escape(label(i))).join(', ');
    const resultCard = (kind, heading, value) =>
      '<div class="result-card '+kind+'"><dt>'+heading+'</dt><dd>'+value+'</dd></div>';
    screen.innerHTML = title('Resultat')+'<dl class="results">'+
      resultCard('word','Hemligt ord',pair[0])+
      resultCard('roles','Bluffare',who || 'Ingen bluffade')+
      resultCard('clue','Ledtråd',who ? pair[1] : 'Ingen ledtråd delades ut')+
      '</dl>'+button('again','Spela igen')+button('back','Ändra spelare och regler');
    on('again',setupRound); on('back',()=>go(0));
  }
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

async function prepareOffline() {
  try {
    await navigator.serviceWorker.register('./sw.js');
    await navigator.serviceWorker.ready;
    offlineStatus.textContent = 'Redo att användas offline';
  } catch {
    offlineStatus.textContent = 'Offlineläget kunde inte startas';
  }
}

if ('serviceWorker' in navigator) {
  prepareOffline();
} else {
  offlineStatus.textContent = 'Offlineläget kräver localhost eller HTTPS';
}
