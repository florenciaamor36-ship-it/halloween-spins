(() => {
  const previewParams = new URLSearchParams(window.location.search);
  if (previewParams.has('clean-preview')) document.documentElement.classList.add('jj-clean-preview');
  if (previewParams.has('layout-preview')) document.documentElement.classList.add('jj-layout-preview');
  const $ = id => document.getElementById(id);
  const api = () => window.SLOT_GAME_API;
  const audio = () => window.SLOT_JJ_AUDIO;
  const modalIds = ['jjAutoModal', 'jjLinesModal', 'jjBetModal', 'jjMenuModal', 'jjSettingsModal'];
  const closeModal = id => {
    const node = $(id);
    if (!node) return;
    node.classList.remove('open');
    node.setAttribute('aria-hidden', 'true');
  };
  const closePanels = () => modalIds.forEach(closeModal);
  const openModal = id => {
    closePanels();
    const node = $(id);
    if (!node) return;
    node.classList.add('open');
    node.setAttribute('aria-hidden', 'false');
  };
  const playButton = () => audio()?.playUi?.('button');
  const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
  const flyPrizeCoins = (game, source, target, config = {}) => {
    if (!game || !source || !target) return Promise.resolve();
    const gameRect = game.getBoundingClientRect();
    const sourceRect = source.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    if (!gameRect.width || !gameRect.height || !sourceRect.width || !targetRect.width) return Promise.resolve();
    const count = Math.max(8, Math.min(36, Math.floor(Number(config.coinCount) || 22)));
    const stagger = Math.max(10, Number(config.coinStaggerMs) || 38);
    const duration = Math.max(700, Number(config.coinDurationMs) || 1150);
    const originX = sourceRect.left + sourceRect.width / 2;
    const originY = sourceRect.top + sourceRect.height / 2;
    const destX = targetRect.left + targetRect.width / 2;
    const destY = targetRect.top + targetRect.height / 2;
    return new Promise(resolve => {
      let remaining = count;
      let finished = false;
      const coins = [];
      const finish = () => {
        if (finished) return;
        finished = true;
        coins.forEach(coin => coin.remove());
        target.classList.add('jj-balance-arrival');
        setTimeout(() => target.classList.remove('jj-balance-arrival'), 900);
        resolve();
      };
      for (let i = 0; i < count; i++) {
        const coin = document.createElement('span');
        coin.className = 'jj-coin-flight';
        const startX = originX + (Math.random() - .5) * Math.min(34, sourceRect.width * .28);
        const startY = originY + (Math.random() - .5) * Math.min(14, sourceRect.height * .35);
        const endX = destX + (Math.random() - .5) * Math.min(34, targetRect.width * .45);
        const endY = destY + (Math.random() - .5) * Math.min(10, targetRect.height * .28);
        const dx = endX - startX, dy = endY - startY;
        coin.style.left = `${startX - gameRect.left}px`;
        coin.style.top = `${startY - gameRect.top}px`;
        coin.style.setProperty('--dx', `${dx}px`);
        coin.style.setProperty('--dy', `${dy}px`);
        coin.style.setProperty('--mx', `${dx * .55 + (Math.random() - .5) * 20}px`);
        coin.style.setProperty('--my', `${dy * .55 - (14 + Math.random() * 26)}px`);
        coin.style.setProperty('--delay', `${i * stagger}ms`);
        coin.style.setProperty('--spin-mid', `${(Math.random() - .5) * 540}deg`);
        coin.style.setProperty('--spin-end', `${(Math.random() - .5) * 900}deg`);
        game.appendChild(coin);
        coins.push(coin);
        coin.addEventListener('animationend', () => {
          coin.remove();
          if (!finished && --remaining === 0) finish();
        }, { once: true });
      }
      setTimeout(finish, duration + stagger * (count - 1) + 500);
    });
  };
  window.SLOT_GAME_UI = window.SLOT_GAME_UI || {};
  window.SLOT_GAME_UI.celebratePrize = async ({ title, amountText } = {}) => {
    const panel = $('announcementPanel');
    const box = $('announcementText');
    const game = $('game');
    const balanceBox = document.querySelector('.display.balance .control-box');
    if (!panel || !box || !game || !balanceBox) return;
    const config = window.SLOT_GAME_CONFIG?.features?.prizeBalanceTransfer || {};
    const titleNode = document.createElement('span');
    titleNode.className = 'jj-prize-title';
    titleNode.textContent = String(title || 'PREMIO');
    const amountNode = document.createElement('span');
    amountNode.className = 'jj-prize-amount';
    amountNode.textContent = String(amountText || '');
    box.replaceChildren(titleNode, amountNode);
    box.classList.remove('announcement-pulse');
    box.classList.add('jj-prize-message', 'jj-prize-celebrating');
    panel.classList.add('jj-prize-celebrating');
    await pause(Math.max(900, Number(config.textDurationMs) || 1250));
    box.classList.remove('jj-prize-celebrating');
    panel.classList.remove('jj-prize-celebrating');
    await flyPrizeCoins(game, panel, balanceBox, config);
  };
  const updateLinesSummary = () => {
    const state = api()?.getState?.();
    if (!state) return;
    if ($('jjSelectedLines')) $('jjSelectedLines').textContent = String(state.lines);
    document.querySelectorAll('[data-jj-lines]').forEach(button => {
      const count = Number(button.dataset.jjLines);
      const selected = count === state.lines;
      button.classList.toggle('is-selected', selected);
      button.setAttribute('aria-pressed', String(selected));
      button.disabled = Boolean(state.spinning || state.resultLock || count < state.minLines || count > state.maxLines);
    });
  };
  const updateBetSummary = () => {
    const state = api()?.getState?.();
    if (!state) return;
    const perLine = state.lines ? state.bet / state.lines : state.bet;
    if ($('jjCoinsPerLine')) $('jjCoinsPerLine').textContent = perLine.toLocaleString('es-AR', { maximumFractionDigits: 2 });
    if ($('jjBetTotal')) $('jjBetTotal').textContent = state.bet.toLocaleString('es-AR', { maximumFractionDigits: 2 });
    const locked = Boolean(state.spinning || state.resultLock);
    document.querySelectorAll('[data-jj-bet]').forEach(button => {
      const direction = Number(button.dataset.jjBet);
      button.disabled = locked || (direction < 0 ? state.bet <= state.minBet : state.bet >= state.maxBet);
    });
    if ($('jjBetMax')) $('jjBetMax').disabled = locked || state.bet >= state.maxBet;
    updateLinesSummary();
  };
  const updateAutoplay = event => {
    const active = Boolean(event?.detail?.active ?? api()?.getState?.().autoSpin);
    const button = $('autoSpin');
    if (!button) return;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
    button.textContent = active ? 'PARAR' : 'AUTO';
  };
  const updateTurbo = event => {
    const active = Boolean(event?.detail?.active ?? api()?.getState?.().turbo);
    $('jjTurbo')?.classList.toggle('is-active', active);
    $('jjTurbo')?.setAttribute('aria-pressed', String(active));
  };
  const updateSound = () => {
    const muted = Boolean(audio()?.isMuted?.());
    const button = $('jjSoundToggle');
    if (!button) return;
    button.textContent = `Sonido: ${muted ? 'desactivado' : 'activado'}`;
    button.setAttribute('aria-pressed', String(!muted));
  };

  const openLinesMenu = () => { updateLinesSummary(); playButton(); openModal('jjLinesModal'); };
  const openBetMenu = () => { updateBetSummary(); playButton(); openModal('jjBetModal'); };
  const linesReadout = document.querySelector('.display.lines');
  const betReadout = document.querySelector('.display.bet');
  if (linesReadout) {
    linesReadout.onclick = event => { event.preventDefault(); openLinesMenu(); };
    linesReadout.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openLinesMenu(); }
    });
  }
  if (betReadout) {
    betReadout.onclick = event => { event.preventDefault(); openBetMenu(); };
    betReadout.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openBetMenu(); }
    });
  }

  $('jjInfo')?.addEventListener('click', () => { closePanels(); playButton(); api()?.openPaytable?.(); });
  if ($('menu')) $('menu').onclick = event => { event.preventDefault(); playButton(); openModal('jjMenuModal'); };
  $('jjSettings')?.addEventListener('click', () => { playButton(); updateSound(); openModal('jjSettingsModal'); });
  $('jjBetMenu')?.addEventListener('click', openBetMenu);
  $('jjLinesArt')?.addEventListener('click', openLinesMenu);
  $('jjTurbo')?.addEventListener('click', () => { playButton(); api()?.toggleTurbo?.(); });
  if ($('autoSpin')) $('autoSpin').onclick = event => {
    event.preventDefault();
    if (api()?.getState?.().autoSpin) { api()?.stopAutoplay?.(); return; }
    playButton(); openModal('jjAutoModal');
  };
  $('jjMenuPrizes')?.addEventListener('click', () => { closePanels(); playButton(); api()?.openPaytable?.(); });
  $('jjMenuSettings')?.addEventListener('click', () => { updateSound(); openModal('jjSettingsModal'); });
  $('jjSoundToggle')?.addEventListener('click', () => { audio()?.toggleMute?.(); updateSound(); });
  $('jjBetMax')?.addEventListener('click', () => { const state = api()?.getState?.(); if (state) api()?.setBet?.(state.maxBet); updateBetSummary(); playButton(); });
  document.querySelectorAll('[data-jj-bet]').forEach(button => button.addEventListener('click', () => {
    api()?.changeBet?.(Number(button.dataset.jjBet)); updateBetSummary(); playButton();
  }));
  document.querySelectorAll('[data-jj-lines]').forEach(button => button.addEventListener('click', () => {
    api()?.setLines?.(Number(button.dataset.jjLines));
    updateLinesSummary(); updateBetSummary(); closeModal('jjLinesModal'); playButton();
  }));
  document.querySelectorAll('[data-auto-spins]').forEach(button => button.addEventListener('click', () => {
    closePanels(); playButton(); api()?.startAutoplay?.(Number(button.dataset.autoSpins));
  }));
  document.querySelectorAll('[data-jj-close]').forEach(button => button.addEventListener('click', () => { playButton(); closeModal(button.dataset.jjClose); }));
  modalIds.forEach(id => $(id)?.addEventListener('click', event => { if (event.target === $(id)) closeModal(id); }));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closePanels();
  });
  window.addEventListener('slot:bet-change', updateBetSummary);
  window.addEventListener('slot:lines-change', updateBetSummary);
  window.addEventListener('slot:autoplay-change', updateAutoplay);
  window.addEventListener('slot:turbo-change', updateTurbo);
  window.addEventListener('slot:spin-start', updateBetSummary);
  updateAutoplay(); updateTurbo(); updateSound(); updateBetSummary();
  if (previewParams.has('prize-flow-preview')) {
    const playPrizePreview = () => {
      const loading = $('loadingScreen');
      if (loading && !loading.classList.contains('is-hidden')) { setTimeout(playPrizePreview, 250); return; }
      const balanceNode = $('balance');
      if (!balanceNode || !window.SLOT_GAME_UI?.celebratePrize) return;
      const current = Number(String(balanceNode.textContent).replace(/[^\d-]/g, '')) || 0;
      const demoAmount = 450;
      if ($('win')) $('win').textContent = demoAmount.toLocaleString('es-AR');
      window.SLOT_GAME_UI.celebratePrize({ title: 'NICE WIN', amountText: `${demoAmount.toLocaleString('es-AR')} fichas` })
        .then(() => { balanceNode.textContent = (current + demoAmount).toLocaleString('es-AR'); });
    };
    setTimeout(playPrizePreview, 300);
  }
})();
