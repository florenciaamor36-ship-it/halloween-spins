/* Cleopatra is a visual/data theme for the shared Halloween Spins engine.
 * Keep all game evaluation and spin behavior in main.js. */
window.SLOT_GAME_CONFIG = {
  schemaVersion: 1,
  id: 'cleopatra',
  assets: {
    frame: {
      portrait: 'assets/cleopatra/frame.webp?v=1',
      fallback: 'assets/cleopatra/frame.webp?v=1'
    },
    loading: 'assets/cleopatra/loading-screen.webp?v=1',
    spin: {
      normal: 'assets/cleopatra/buttons/spin-normal.webp?v=1',
      pressed: 'assets/cleopatra/buttons/spin-pressed.webp?v=1'
    },
    menuButton: {
      normal: 'assets/cleopatra/buttons/menu-normal.webp?v=2',
      pressed: 'assets/cleopatra/buttons/menu-pressed.webp?v=2'
    },
    fogOverlay: 'assets/cleopatra/effects/fog.webp?v=1',
    niceWinBackground: 'assets/cleopatra/effects/nice-win-background.webp?v=1',
    niceWinSparkles: 'assets/cleopatra/effects/nice-win-sparkles.webp?v=1',
    niceWinTitle: 'assets/cleopatra/effects/nice-win-title.webp?v=nicewin-whitebg-20260925-1517',
    niceWinAmountFrame: 'assets/cleopatra/effects/nice-win-amount-frame.webp?v=1',
    indicators: {
      balance: 'assets/cleopatra/indicators/balance.webp?v=2',
      bet: 'assets/cleopatra/indicators/bet.webp?v=2',
      lines: 'assets/cleopatra/indicators/lines.webp?v=1'
    },
    announcementFrame: 'assets/cleopatra/announcement-frame.svg?v=1',
    bigWin: 'assets/cleopatra/big-win.svg?v=1',
    lowWin: 'assets/cleopatra/low-win.svg?v=1',
    paytableFrame: 'assets/cleopatra/paytable-frame.svg?v=1',
    symbols: 'assets/cleopatra/symbols',
    winFrames: [{ key: 'cleopatra-win-glow', src: 'assets/cleopatra/win-glow.svg?v=1' }]
  },
  symbols: [
    { key: 'pharaoh-mask', label: 'Máscara de faraón', asset: 'assets/cleopatra/symbols/fitted/pharaoh-mask.webp?v=1' },
    { key: 'gold-scarab', label: 'Escarabajo dorado', asset: 'assets/cleopatra/symbols/fitted/gold-scarab.webp?v=1' },
    { key: 'eye-of-horus', label: 'Ojo de Horus', asset: 'assets/cleopatra/symbols/fitted/eye-of-horus.webp?v=1' },
    { key: 'anubis-idol', label: 'Ídolo de Anubis', asset: 'assets/cleopatra/symbols/fitted/anubis-idol.webp?v=1' },
    { key: 'pharaoh-scepter', label: 'Cetro de faraón', asset: 'assets/cleopatra/symbols/fitted/pharaoh-scepter.webp?v=1' },
    { key: 'bastet-cat', label: 'Gata Bastet', asset: 'assets/cleopatra/symbols/fitted/bastet-cat.webp?v=1' },
    { key: 'royal-cobra', label: 'Cobra real', asset: 'assets/cleopatra/symbols/fitted/royal-cobra.webp?v=1' },
    { key: 'golden-ankh', label: 'Anj dorado', asset: 'assets/cleopatra/symbols/fitted/golden-ankh.webp?v=1' },
    { key: 'sacred-lotus', label: 'Loto sagrado', asset: 'assets/cleopatra/symbols/fitted/sacred-lotus.webp?v=1' },
    { key: 'blue-lotus-medallion', label: 'Medallón de loto azul', asset: 'assets/cleopatra/symbols/fitted/blue-lotus-medallion.webp?v=1' },
    { key: 'wild', label: 'CLEOPATRA · WILD', asset: 'assets/cleopatra/symbols/fitted/cleopatra-wild.webp?v=1' },
    { key: 'scatter', label: 'PIRÁMIDE · SCATTER', asset: 'assets/cleopatra/symbols/fitted/pyramid-scatter.webp?v=1' },
    { key: 'bonus', label: 'TESORO · BONUS', asset: 'assets/cleopatra/symbols/fitted/treasure-bonus.webp?v=1' }
  ],
  visual: {
    /* The supplied frame has a taller portrait window than a conventional 5×3
       reel bed. The fitted symbol copies normalize transparent margins while
       preserving each source aspect ratio; other themes keep their defaults. */
    symbolScale: 0.92,
    symbolScaleY: 1,
    symbolFit: 'cell-width',
    winEffects: {
      bonus: { type: 'gold-chest', when: 'bonus-awarded', color: '#f4c96b', highlight: '#fff1ad' },
      'blue-lotus-medallion': { type: 'blue-lotus', when: 'line-win', color: '#38bdf8', highlight: '#e0f7ff' }
    }
  },
  defaults: {
    balance: 10000,
    bet: 50,
    jackpot: 75420,
    lines: 20,
    minBet: 25,
    maxBet: 500,
    betStep: 25,
    minLines: 5,
    maxLines: 20,
    lineStep: 5,
    jackpotContributionRate: 0.1,
    minimumJackpotContribution: 1,
    bigWinBetMultiplier: 10,
    lowWinBetMultiplier: 3,
    freeSpins: 0
  },
  specialSymbols: {
    wild: 'wild',
    scatter: 'scatter',
    bonus: 'bonus',
    animatedWin: 'sacred-lotus'
  },
  rules: {
    cols: 5,
    rows: 3,
    paylines: [
      [1,1,1,1,1], [0,0,0,0,0], [2,2,2,2,2], [0,1,2,1,0],
      [2,1,0,1,2], [0,0,1,2,2], [2,2,1,0,0], [1,0,0,0,1],
      [1,2,2,2,1], [1,0,1,0,1], [1,2,1,2,1], [0,1,1,1,0],
      [2,1,1,1,2], [0,1,0,1,0], [2,1,2,1,2], [1,1,0,1,1],
      [1,1,2,1,1], [0,0,2,0,0], [2,2,0,2,0], [0,2,0,2,0]
    ],
    lineColors: ['#f2c96b','#45d9e8','#f28d67','#9d74d8','#64ce98','#ffbc57','#27b7be','#ec82b4','#97c957','#e49e2a','#4bb8a5','#7775d7','#d76bd1','#df5c4d','#55bb78','#e7cb59','#38a9dc','#ad83e5','#7fc967','#df7c99'],
    symbolWeights: [91,91,91,91,91,91,91,91,91,91,40,25,25],
    weightTotal: 1000,
    paytableCounts: [3, 4, 5],
    minimumMatch: 3,
    specialMinimumMatch: 3,
    paytable: {
      0:{3:90,4:270,5:900}, 1:{3:36,4:90,5:180},
      2:{3:36,4:90,5:180}, 3:{3:36,4:90,5:180},
      4:{3:36,4:90,5:180}, 5:{3:18,4:36,5:90},
      6:{3:18,4:36,5:90}, 7:{3:18,4:36,5:90},
      8:{3:18,4:36,5:90}, 9:{3:18,4:36,5:90},
      10:{3:180,4:450,5:1800}, 11:{3:1,4:2,5:5},
      12:{3:0,4:0,5:0}
    },
    bonusFreeSpins: {3:5, 4:8, 5:12},
    paytableOrder: [5,6,7,8,9,1,2,3,4,0,10,11,12]
  },
  ui: {
    name: 'Cleopatra Spins · Vista previa',
    numberLocale: 'es-AR',
    scatterPaytableLabel: '{label} · APUESTA total',
    freeSpinsSuffix: 'giros gratis',
    paytableMultiplierSuffix: '×',
    announcementAlt: 'Anuncio de premios de Cleopatra',
    frameAlt: 'Marco egipcio de Cleopatra',
    bigWinAlt: 'Premio mayor de Cleopatra',
    lowWinAlt: 'Premio de Cleopatra',
    paytableBrand: 'CLEOPATRA · TESOROS DEL NILO',
    paytableTitle: 'Tabla de premios',
    paytableSubtitle: 'Multiplicador por línea · PIRÁMIDE por APUESTA total',
    paytableSymbolHeader: 'Símbolo',
    rulesTitle: 'REGLAS',
    spinLabel: 'Girar',
    menuLabel: 'PREMIOS',
    loadingLabel: 'Cargando',
    lowWinTitle: '¡PREMIO!',
    labels: { balance: 'SALDO', bet: 'APUESTA', lines: 'LÍNEAS', win: 'PREMIO', jackpot: 'TESORO' },
    messages: {
      autoSpin: 'AUTO',
      stopAutoSpin: 'PARAR',
      stopAutoSpinOverlay: 'PARAR AUTO',
      insufficientBalance: 'SALDO INSUFICIENTE',
      bonusAward: 'BONUS +{awarded} GIROS GRATIS\nRESTANTES: {remaining}',
      scatterAward: 'PIRÁMIDE +${amount}\nPREMIO TOTAL: ${total}',
      prize: 'PREMIO: ${amount}'
    },
    paytableRules: [
      '• El premio de línea cuenta de izquierda a derecha.',
      '• WILD sustituye a los símbolos regulares.',
      '• PIRÁMIDE (SCATTER): 3 o más pagan la APUESTA total.',
      '• TESORO (BONUS): 3, 4 o 5 dan 5, 8 o 12 giros gratis.'
    ]
  },
  colors: {
    accent: '#f3d27a',
    glow: '#f5b849',
    highlight: '#fff0bc',
    panel: '#251a24',
    particlePalette: ['#f3d27a','#ffe9a1','#42d6e8','#db9b50','#ffffff','#95c7cf'],
    lowWinParticlePalette: ['#f3d27a','#ffe9a1','#d89039','#ffffff'],
    winningTint: '#fff0bc'
  }
};

// Cleopatra-only golden spark burst on a real button press/tap.
(() => {
  const bindGoldSparks = () => {
    const spin = document.getElementById('spin');
    if (!spin || spin.dataset.cleoGoldSparkBound) return;
    spin.dataset.cleoGoldSparkBound = 'true';
    const directions = [
      [-10,-3],[-8,-7],[-3,-10],[3,-10],[8,-7],[10,-3],
      [10,3],[8,7],[3,10],[-3,10],[-8,7],[-10,3]
    ];
    const burst = () => {
      const layer = document.createElement('span');
      layer.className = 'spin-gold-burst';
      layer.setAttribute('aria-hidden', 'true');
      directions.forEach(([dx, dy], i) => {
        const spark = document.createElement('i');
        spark.className = 'spin-gold-spark';
        spark.style.setProperty('--dx', `${dx}cqw`);
        spark.style.setProperty('--dy', `${dy}cqw`);
        spark.style.setProperty('--delay', `${(i % 4) * 18}ms`);
        spark.style.setProperty('--size', i % 3 === 0 ? '5px' : '4px');
        layer.appendChild(spark);
      });
      spin.appendChild(layer);
      window.setTimeout(() => layer.remove(), 900);
    };
    spin.addEventListener('pointerdown', event => {
      if (event.button !== undefined && event.button !== 0) return;
      burst();
    }, true);
    spin.addEventListener('keydown', event => {
      if (!event.repeat && (event.key === 'Enter' || event.key === ' ')) burst();
    }, true);
  };
  if (document.getElementById('spin')) bindGoldSparks();
  else document.addEventListener('DOMContentLoaded', bindGoldSparks, { once: true });
})();

// Load Cleopatra's button and ambience images before they are needed.
(() => {
  const setThemeArtwork = () => {
    const config = window.SLOT_GAME_CONFIG;
    const assets = config?.assets;
    const button = document.getElementById('menu');
    if (!assets) return;
    const absoluteAsset = path => new URL(path, document.baseURI).href;
    const retained = document.documentElement._cleoVisualPreloads ||= [];

    if (button && assets.menuButton) {
      const normalUrl = absoluteAsset(assets.menuButton.normal);
      const pressedUrl = absoluteAsset(assets.menuButton.pressed);
      button.style.setProperty('--menu-art-normal', `url("${normalUrl}")`);
      button.style.setProperty('--menu-art-pressed', `url("${pressedUrl}")`);
      [normalUrl, pressedUrl].forEach(url => {
        const image = new Image();
        image.fetchPriority = 'high';
        image.src = url;
        if (typeof image.decode === 'function') image.decode().catch(() => {});
        retained.push(image);
      });
    }

    if (assets.fogOverlay) {
      const fogUrl = absoluteAsset(assets.fogOverlay);
      document.documentElement.style.setProperty('--cleo-fog-art', `url("${fogUrl}")`);
      const fog = new Image();
      fog.src = fogUrl;
      if (typeof fog.decode === 'function') fog.decode().catch(() => {});
      retained.push(fog);
    }

    if (assets.niceWinBackground) {
      const winUrl = absoluteAsset(assets.niceWinBackground);
      document.documentElement.style.setProperty('--cleo-nice-win-bg', `url("${winUrl}")`);
      const winBackground = new Image();
      winBackground.fetchPriority = 'high';
      winBackground.src = winUrl;
      if (typeof winBackground.decode === 'function') winBackground.decode().catch(() => {});
      retained.push(winBackground);
    }

    if (assets.niceWinSparkles) {
      const sparkUrl = absoluteAsset(assets.niceWinSparkles);
      document.documentElement.style.setProperty('--cleo-nice-win-sparkles', `url("${sparkUrl}")`);
      const sparkTexture = new Image();
      sparkTexture.src = sparkUrl;
      if (typeof sparkTexture.decode === 'function') sparkTexture.decode().catch(() => {});
      retained.push(sparkTexture);
    }

    if (assets.niceWinTitle) {
      const titleUrl = absoluteAsset(assets.niceWinTitle);
      const titleImage = document.querySelector('.nicewin-word');
      if (titleImage) titleImage.src = titleUrl;
      const titleTexture = new Image();
      titleTexture.fetchPriority = 'high';
      titleTexture.src = titleUrl;
      if (typeof titleTexture.decode === 'function') titleTexture.decode().catch(() => {});
      retained.push(titleTexture);
    }

    if (assets.niceWinAmountFrame) {
      const frameUrl = absoluteAsset(assets.niceWinAmountFrame);
      const frameImage = document.querySelector('.nicewin-frame');
      if (frameImage) frameImage.src = frameUrl;
      const frameTexture = new Image();
      frameTexture.fetchPriority = 'high';
      frameTexture.src = frameUrl;
      if (typeof frameTexture.decode === 'function') frameTexture.decode().catch(() => {});
      retained.push(frameTexture);
    }
  };
  if (document.getElementById('menu')) setThemeArtwork();
  else document.addEventListener('DOMContentLoaded', setThemeArtwork, { once: true });
})();

// Keep the pressed menu art visible briefly before the paytable covers the button.
(() => {
  const bindMenuFeedback = () => {
    const button = document.getElementById('menu');
    if (!button || button.dataset.menuFeedbackBound === 'true') return;
    button.dataset.menuFeedbackBound = 'true';
    let waiting = false;
    let replaying = false;
    button.addEventListener('click', event => {
      if (replaying) { replaying = false; return; }
      event.preventDefault();
      event.stopImmediatePropagation();
      if (waiting) return;
      waiting = true;
      button.classList.add('is-pressed');
      window.setTimeout(() => {
        button.classList.remove('is-pressed');
        replaying = true;
        try { button.click(); }
        finally { replaying = false; waiting = false; }
      }, 300);
    }, true);
  };
  if (document.getElementById('menu')) bindMenuFeedback();
  else document.addEventListener('DOMContentLoaded', bindMenuFeedback, { once: true });
})();

// Keep Cleopatra's live balance readable on small screens without altering its art.
(() => {
  const bindMobileBalanceFit = () => {
    const value = document.getElementById('balance');
    const display = value && value.closest('.display.balance');
    if (!value || !display || value.dataset.mobileBalanceFit === 'true') return;
    value.dataset.mobileBalanceFit = 'true';
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const isMobile = () => window.matchMedia('(max-width: 700px)').matches;
    const fitBalance = () => {
      if (!isMobile()) {
        value.style.removeProperty('font-size');
        return;
      }
      const preferred = Math.min(16, Math.max(12, window.innerWidth * 0.04));
      const available = Math.max(12, display.getBoundingClientRect().width - 4);
      const text = (value.textContent || '').trim() || '0';
      let textWidth = text.length * preferred * .62;
      if (context) {
        const computed = getComputedStyle(value);
        context.font = `${computed.fontWeight} ${preferred}px ${computed.fontFamily}`;
        textWidth = context.measureText(text).width;
        const letterSpacing = parseFloat(computed.letterSpacing);
        if (Number.isFinite(letterSpacing) && letterSpacing > 0) {
          textWidth += letterSpacing * Math.max(0, text.length - 1);
        }
      }
      const fitted = Math.max(10, Math.min(preferred, preferred * available / Math.max(1, textWidth)));
      value.style.setProperty('font-size', `${fitted}px`, 'important');
    };
    const observer = new MutationObserver(() => requestAnimationFrame(fitBalance));
    observer.observe(value, { childList: true, characterData: true, subtree: true });
    window.addEventListener('resize', fitBalance, { passive: true });
    window.addEventListener('orientationchange', fitBalance, { passive: true });
    requestAnimationFrame(fitBalance);
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindMobileBalanceFit, { once: true });
  } else {
    bindMobileBalanceFit();
  }
})();
