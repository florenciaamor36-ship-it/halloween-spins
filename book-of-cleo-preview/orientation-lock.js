(() => {
  const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
  if (!isTouchDevice) return;

  let locked = false;
  let pending = false;

  function lockPortrait() {
    if (locked || pending || !screen.orientation || typeof screen.orientation.lock !== 'function') return;
    pending = true;
    try {
      Promise.resolve(screen.orientation.lock('portrait'))
        .then(() => { locked = true; })
        .catch(() => {})
        .finally(() => { pending = false; });
    } catch (_) {
      pending = false;
    }
  }

  lockPortrait();
  document.addEventListener('pointerdown', lockPortrait, { passive: true });
  document.addEventListener('keydown', lockPortrait);
  document.addEventListener('fullscreenchange', lockPortrait);
  window.addEventListener('orientationchange', lockPortrait);
  window.addEventListener('pageshow', lockPortrait);
})();
