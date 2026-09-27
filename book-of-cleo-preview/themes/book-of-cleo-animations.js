/* Book of the Cleo: procedural, mask-local effects. Uses the game's own symbols and Phaser result events; no skeletal runtime. */
(() => {
  const cfg = window.SLOT_GAME_CONFIG;
  if (cfg?.id !== 'book-of-cleo') return;

  const reels = document.getElementById('reels');
  const cols = cfg.rules.cols || 5;
  const rows = cfg.rules.rows || 3;
  const symbols = cfg.symbols || [];
  if (!reels) return;

  const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)');
  let suppressedClickUntil = 0;
  document.addEventListener('pointerdown', event => {
    const award = document.querySelector('.lowwin-screen.open, .bigwin-screen.open');
    if (!award) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    suppressedClickUntil = performance.now() + 700;
    award.onpointerdown?.(event);
  }, true);
  document.addEventListener('click', event => {
    if (performance.now() > suppressedClickUntil) return;
    suppressedClickUntil = 0;
    event.preventDefault();
    event.stopImmediatePropagation();
  }, true);
  let fxLayer;
  let fxTimer;

  const grid = () => reels.querySelector('.cleo-html-symbol-grid');
  const images = () => [...reels.querySelectorAll('.cleo-html-symbol')];
  const createLayer = () => {
    if (fxLayer?.isConnected) return fxLayer;
    fxLayer = document.createElement('div');
    fxLayer.className = 'cleo-fx-layer';
    fxLayer.setAttribute('aria-hidden', 'true');
    reels.appendChild(fxLayer);
    return fxLayer;
  };
  const clearFx = () => {
    if (fxTimer) clearTimeout(fxTimer);
    fxTimer = null;
    if (fxLayer) fxLayer.replaceChildren();
  };
  const center = index => {
    const col = index % cols;
    const row = Math.floor(index / cols);
    return { x: ((col + .5) / cols) * reels.clientWidth, y: ((row + .5) / rows) * reels.clientHeight };
  };
  const animateSymbol = (index, style = 'gold') => {
    const image = images()[index];
    if (!image || reducedMotion?.matches) return;
    const blue = style === 'blue';
    image.animate([
      { transform: 'translateY(0) scale(1) rotate(0deg)', filter: 'brightness(1)' },
      { transform: `translateY(-6%) scale(1.13) rotate(${blue ? '-2deg' : '2deg'})`, filter: `brightness(1.32) drop-shadow(0 0 9px ${blue ? '#61e7ff' : '#ffd36a'})`, offset: .34 },
      { transform: 'translateY(2%) scale(.97) rotate(0deg)', filter: 'brightness(1.12)' , offset: .72 },
      { transform: 'translateY(0) scale(1) rotate(0deg)', filter: 'brightness(1)' }
    ], { duration: blue ? 880 : 760, easing: 'cubic-bezier(.18,.84,.28,1)' });
  };
  const animateBook = (index, style = 'gold') => {
    const image = images()[index];
    if (!image || reducedMotion?.matches) return;
    const glow = style === 'blue' ? '#61e7ff' : '#ffd36a';
    image.style.transformOrigin = '50% 50%';
    image.animate([
      { transform: 'rotateY(0deg) scale(.92)', filter: 'brightness(1)' },
      { transform: 'rotateY(72deg) scale(.9)', filter: `brightness(1.45) drop-shadow(0 0 12px ${glow})`, offset: .28 },
      { transform: 'rotateY(-13deg) scale(1.14)', filter: `brightness(1.35) drop-shadow(0 0 14px ${glow})`, offset: .58 },
      { transform: 'rotateY(5deg) scale(1.04)', filter: `brightness(1.15) drop-shadow(0 0 8px ${glow})`, offset: .8 },
      { transform: 'rotateY(0deg) scale(1)', filter: 'brightness(1)' }
    ], { duration: 1050, easing: 'cubic-bezier(.16,.82,.25,1)' });
  };
  const burst = (index, style = 'gold', count = 9) => {
    if (reducedMotion?.matches) return;
    const layer = createLayer();
    const { x, y } = center(index);
    const hue = style === 'blue' ? '#8af2ff' : '#ffe18a';
    const ring = document.createElement('i');
    ring.className = `cleo-fx-ring ${style === 'blue' ? 'is-blue' : ''}`;
    ring.style.left = `${x}px`;
    ring.style.top = `${y}px`;
    layer.appendChild(ring);
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('i');
      const angle = (Math.PI * 2 * i / count) + (Math.random() - .5) * .24;
      const distance = reels.clientWidth * (.11 + Math.random() * .08);
      particle.className = 'cleo-fx-spark';
      particle.textContent = i % 3 === 0 ? '✦' : '·';
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      particle.style.setProperty('--dx', `${Math.cos(angle) * distance}px`);
      particle.style.setProperty('--dy', `${Math.sin(angle) * distance}px`);
      particle.style.setProperty('--spark-color', hue);
      particle.style.animationDelay = `${(i % 4) * 35}ms`;
      layer.appendChild(particle);
    }
  };
  const sweep = () => {
    if (reducedMotion?.matches) return;
    const layer = createLayer();
    const shine = document.createElement('i');
    shine.className = 'cleo-fx-sweep';
    layer.appendChild(shine);
    setTimeout(() => shine.remove(), 900);
  };

  window.addEventListener('slot:spin-start', () => {
    clearFx();
    sweep();
    grid()?.classList.remove('cleo-result-win', 'cleo-feature-hit');
  });

  window.addEventListener('slot:reel-stop', event => {
    const col = Number(event.detail?.column);
    if (!Number.isInteger(col)) return;
    for (let row = 0; row < rows; row++) {
      const index = col + row * cols;
      const image = images()[index];
      if (!image || reducedMotion?.matches) continue;
      image.animate([
        { transform: 'translateY(-9%) scale(.92)', filter: 'blur(1.2px) brightness(1.15)' },
        { transform: 'translateY(3%) scale(1.035)', filter: 'blur(0) brightness(1.12)', offset: .65 },
        { transform: 'translateY(0) scale(1)', filter: 'blur(0) brightness(1)' }
      ], { duration: 310, delay: row * 28, easing: 'cubic-bezier(.2,.9,.32,1)' });
    }
  });

  window.addEventListener('slot:spin-result', event => {
    const d = event.detail || {};
    const cellKeys = (d.values || []).map(index => symbols[index]?.key);
    const won = new Set((d.wins || []).flatMap(win => win.positions || []));
    const scatter = symbols.findIndex(symbol => symbol.key === cfg.specialSymbols?.scatter);
    const wild = symbols.findIndex(symbol => symbol.key === cfg.specialSymbols?.wild);
    const bonus = symbols.findIndex(symbol => symbol.key === cfg.specialSymbols?.bonus);
    const scatterCells = (d.values || []).flatMap((value, index) => value === scatter ? [index] : []);
    const bonusCells = (d.values || []).flatMap((value, index) => value === bonus ? [index] : []);
    const wildCells = (d.values || []).flatMap((value, index) => value === wild ? [index] : []);
    const specialCells = new Set();
    if (Number(d.scatterCount) >= 3) scatterCells.forEach(index => specialCells.add(index));
    if (Number(d.bonusCount) >= 6) bonusCells.forEach(index => specialCells.add(index));
    if (Number(d.awarded) > 0) wildCells.forEach(index => specialCells.add(index));

    const active = new Set([...won, ...specialCells]);
    if (Number(d.totalWin) > 0 && active.size) {
      grid()?.classList.add('cleo-result-win');
      sweep();
      [...active].forEach((index, order) => {
        const key = cellKeys[index];
        const tone = key === 'blue-book' ? 'blue' : 'gold';
        setTimeout(() => {
          if (key === 'wild' || key === 'blue-book') animateBook(index, tone);
          else animateSymbol(index, tone);
          burst(index, tone, key === 'wild' || key === 'bonus' ? 13 : 8);
        }, order * 70);
      });
    } else if (specialCells.size) {
      [...specialCells].forEach((index, order) => {
        setTimeout(() => {
          const key = cellKeys[index];
          const tone = key === 'blue-book' ? 'blue' : 'gold';
          if (key === 'wild' || key === 'blue-book') animateBook(index, tone);
          else animateSymbol(index, tone);
          burst(index, tone, 12);
        }, order * 70);
      });
    }
    if (Number(d.awarded) > 0 || Number(d.bonusCount) >= 6) {
      grid()?.classList.add('cleo-feature-hit');
      setTimeout(() => grid()?.classList.remove('cleo-feature-hit'), 1500);
    }
    grid()?.classList.remove('is-spinning');
    if (fxTimer) clearTimeout(fxTimer);
    const effectDuration = Math.max(1250, active.size * 70 + 900, Number(d.totalWin) >= Number(d.bet || 1) * 10 ? 1900 : 0);
    fxTimer = setTimeout(clearFx, effectDuration);
  });

  window.addEventListener('slot:feature-start', () => {
    grid()?.classList.add('cleo-feature-hit');
    sweep();
  });
  window.addEventListener('slot:feature-end', () => {
    setTimeout(() => grid()?.classList.remove('cleo-feature-hit'), 1200);
  });
})();
