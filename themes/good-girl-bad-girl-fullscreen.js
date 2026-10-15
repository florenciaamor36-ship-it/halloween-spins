(() => {
  const button = document.getElementById('fullscreenToggle');
  const hint = document.getElementById('fullscreenHint');
  if (!button) return;

  let hintTimer = 0;
  const isFullscreen = () => Boolean(document.fullscreenElement || document.webkitFullscreenElement);
  const updateButton = () => {
    const active = isFullscreen();
    button.textContent = active ? '×' : '⛶';
    button.setAttribute('aria-label', active ? 'Salir de pantalla completa' : 'Entrar en pantalla completa');
    button.title = active ? 'Salir de pantalla completa' : 'Pantalla completa';
  };
  const showHint = message => {
    if (!hint) return;
    hint.textContent = message;
    hint.classList.add('visible');
    window.clearTimeout(hintTimer);
    hintTimer = window.setTimeout(() => hint.classList.remove('visible'), 4200);
  };

  button.addEventListener('click', async () => {
    try {
      if (isFullscreen()) {
        const exit = document.exitFullscreen || document.webkitExitFullscreen;
        if (exit) await exit.call(document);
        return;
      }
      const root = document.documentElement;
      if (root.requestFullscreen) {
        await root.requestFullscreen({ navigationUI: 'hide' });
      } else if (root.webkitRequestFullscreen) {
        root.webkitRequestFullscreen();
      } else {
        showHint('Este navegador no permite pantalla completa. En iPhone, añadí la página a la pantalla de inicio.');
        return;
      }
      try {
        await window.screen?.orientation?.lock?.('landscape');
      } catch (_) {}
    } catch (_) {
      showHint('El navegador bloqueó la pantalla completa. Girá el teléfono a horizontal y volvé a tocar el botón.');
    }
  });

  document.addEventListener('fullscreenchange', updateButton);
  document.addEventListener('webkitfullscreenchange', updateButton);
  window.addEventListener('resize', updateButton);
  updateButton();
})();
