(() => {
  const $ = id => document.getElementById(id);
  const api = () => window.SLOT_GAME_API;
  const audio = () => window.SLOT_JJ_AUDIO;
  const modalIds = ['jjAutoModal', 'jjBetModal', 'jjMenuModal', 'jjSettingsModal'];
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
  const updateBetSummary = () => {
    const state = api()?.getState?.();
    if (!state) return;
    const perLine = state.lines ? state.bet / state.lines : state.bet;
    if ($('jjCoinsPerLine')) $('jjCoinsPerLine').textContent = perLine.toLocaleString('es-AR', { maximumFractionDigits: 2 });
    if ($('jjBetTotal')) $('jjBetTotal').textContent = state.bet.toLocaleString('es-AR', { maximumFractionDigits: 2 });
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

  $('jjInfo')?.addEventListener('click', () => { closePanels(); playButton(); api()?.openPaytable?.(); });
  if ($('menu')) $('menu').onclick = event => { event.preventDefault(); playButton(); openModal('jjMenuModal'); };
  $('jjSettings')?.addEventListener('click', () => { playButton(); updateSound(); openModal('jjSettingsModal'); });
  $('jjBetMenu')?.addEventListener('click', () => { playButton(); updateBetSummary(); openModal('jjBetModal'); });
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
  document.querySelectorAll('[data-auto-spins]').forEach(button => button.addEventListener('click', () => {
    closePanels(); playButton(); api()?.startAutoplay?.(Number(button.dataset.autoSpins));
  }));
  document.querySelectorAll('[data-jj-close]').forEach(button => button.addEventListener('click', () => { playButton(); closeModal(button.dataset.jjClose); }));
  modalIds.forEach(id => $(id)?.addEventListener('click', event => { if (event.target === $(id)) closeModal(id); }));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closePanels();
  });
  window.addEventListener('slot:bet-change', updateBetSummary);
  window.addEventListener('slot:autoplay-change', updateAutoplay);
  window.addEventListener('slot:turbo-change', updateTurbo);
  window.addEventListener('slot:spin-start', updateBetSummary);
  updateAutoplay(); updateTurbo(); updateSound(); updateBetSummary();
})();
