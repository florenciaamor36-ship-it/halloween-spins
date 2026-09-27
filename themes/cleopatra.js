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
    niceWinSparkles: 'assets/cleopatra/effects/nice-win-sparkles.webp?v=1',
    niceWinTitle: 'assets/cleopatra/effects/nice-win-title.webp?v=nicewin-whitebg-20260925-1517',
    niceWinAmountFrame: 'assets/cleopatra/effects/nice-win-amount-frame.webp?v=1',
    indicators: {
      balance: 'assets/cleopatra/indicators/balance.webp?v=2',
      bet: 'assets/cleopatra/indicators/bet.webp?v=2',
      lines: 'assets/cleopatra/indicators/lines.webp?v=1'
    },
    announcementFrame: 'assets/cleopatra/announcement-frame.svg?v=1',
    bigWin: 'assets/cleopatra/effects/big-win-title.webp?v=bigwin-transparent-20260925-1548',
    bigWinCoinRain: 'assets/cleopatra/effects/big-win-coin-rain.webp?v=coin-rain-20260925-1602',
    lowWin: 'assets/cleopatra/low-win.svg?v=1',
    paytableFrame: 'assets/cleopatra/paytable-frame.svg?v=1',
    symbols: 'assets/cleopatra/symbols',
    winFrames: [{ key: 'cleopatra-win-glow', src: 'assets/cleopatra/win-glow.svg?v=1' }]
  },
  symbols: [
    { key: 'h1', label: 'Cleopatra', asset: 'assets/cleopatra/symbols/fitted-imported/h1.webp?v=book-symbols-fitted-20260927-0252' },
    { key: 'h2', label: 'Ojo de Horus', asset: 'assets/cleopatra/symbols/fitted-imported/h2.webp?v=book-symbols-fitted-20260927-0252' },
    { key: 'h3', label: 'Anillo esmeralda', asset: 'assets/cleopatra/symbols/fitted-imported/h3.webp?v=book-symbols-fitted-20260927-0252' },
    { key: 'h4', label: 'Ankh azul', asset: 'assets/cleopatra/symbols/fitted-imported/h4.webp?v=book-symbols-fitted-20260927-0252' },
    { key: 'blue-book', label: 'Libro azul', asset: 'assets/cleopatra/symbols/fitted-imported/bluebook.webp?v=book-symbols-fitted-20260927-0252' },
    { key: 'r1', label: 'A', asset: 'assets/cleopatra/symbols/fitted-imported/r1.webp?v=book-symbols-fitted-20260927-0252' },
    { key: 'r2', label: 'K', asset: 'assets/cleopatra/symbols/fitted-imported/r2.webp?v=book-symbols-fitted-20260927-0252' },
    { key: 'r3', label: 'Q', asset: 'assets/cleopatra/symbols/fitted-imported/r3.webp?v=book-symbols-fitted-20260927-0252' },
    { key: 'r4', label: 'J', asset: 'assets/cleopatra/symbols/fitted-imported/r4.webp?v=book-symbols-fitted-20260927-0252' },
    { key: 'r5', label: '10', asset: 'assets/cleopatra/symbols/fitted-imported/r5.webp?v=book-symbols-fitted-20260927-0252' },
    { key: 'wild', label: 'Libro dorado · WILD', asset: 'assets/cleopatra/symbols/fitted-imported/goldbook-wild.webp?v=book-symbols-fitted-20260927-0252' },
    { key: 'scatter', label: 'PIRÁMIDE · SCATTER', asset: 'assets/cleopatra/symbols/fitted/pyramid-scatter.webp?v=1' },
    { key: 'bonus', label: 'Moneda · BONUS', asset: 'assets/cleopatra/symbols/fitted-imported/bonus.webp?v=book-symbols-fitted-20260927-0252' }
  ],
  visual: {
    /* The supplied frame has a taller portrait window than a conventional 5×3
       reel bed. The fitted symbol copies normalize transparent margins while
       preserving each source aspect ratio; other themes keep their defaults. */
    symbolScale: 0.84,
    symbolScaleY: 1,
    symbolFit: 'cell-width',
    winEffects: {
      bonus: { type: 'gold-chest', when: 'bonus-awarded', color: '#f4c96b', highlight: '#fff1ad' },
      'blue-book': { type: 'blue-lotus', when: 'line-win', color: '#38bdf8', highlight: '#e0f7ff' }
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
    animatedWin: 'blue-book'
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
      0:{3:82.53,4:150,5:300}, 1:{3:33.01,4:82.53,5:165.07},
      2:{3:33.01,4:82.53,5:165.07}, 3:{3:33.01,4:82.53,5:165.07},
      4:{3:33.01,4:82.53,5:165.07}, 5:{3:16.50,4:33.01,5:82.53},
      6:{3:16.50,4:33.01,5:82.53}, 7:{3:16.50,4:33.01,5:82.53},
      8:{3:16.50,4:33.01,5:82.53}, 9:{3:16.50,4:33.01,5:82.53},
      10:{5:300}, 11:{3:0.90,4:1.80,5:3.60},
      12:{3:0,4:0,5:0}
    },
    bonusFreeSpins: {3:3, 4:5, 5:8},
    paytableOrder: [5,6,7,8,9,1,2,3,4,0,10,11,12]
  },
  features: { allowFreeSpinRetrigger: false },
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

    if (assets.niceWinSparkles) {
      const sparkUrl = absoluteAsset(assets.niceWinSparkles);
      document.documentElement.style.setProperty('--cleo-nice-win-sparkles', `url("${sparkUrl}")`);
      const sparkTexture = new Image();
      sparkTexture.src = sparkUrl;
      if (typeof sparkTexture.decode === 'function') sparkTexture.decode().catch(() => {});
      retained.push(sparkTexture);
    }

    if (assets.bigWinCoinRain) {
      const coinRainUrl = absoluteAsset(assets.bigWinCoinRain);
      document.documentElement.style.setProperty('--cleo-bigwin-coin-rain', `url("${coinRainUrl}")`);
      const coinRainTexture = new Image();
      coinRainTexture.fetchPriority = 'high';
      coinRainTexture.src = coinRainUrl;
      if (typeof coinRainTexture.decode === 'function') coinRainTexture.decode().catch(() => {});
      retained.push(coinRainTexture);
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

// Keep BET and LINES press glows visible on touch as well as mouse.
(() => {
  const bindPressedGlows = () => {
    document.querySelectorAll('.betminus, .betplus, .lineup, .linedown').forEach(button => {
      if (button.dataset.pressGlowBound === 'true') return;
      button.dataset.pressGlowBound = 'true';
      let releaseTimer = 0;
      const press = () => {
        window.clearTimeout(releaseTimer);
        button.classList.add('is-pressed');
      };
      const release = () => {
        window.clearTimeout(releaseTimer);
        releaseTimer = window.setTimeout(() => button.classList.remove('is-pressed'), 220);
      };
      button.addEventListener('pointerdown', press, { passive: true });
      button.addEventListener('pointerup', release, { passive: true });
      button.addEventListener('pointercancel', release, { passive: true });
      button.addEventListener('pointerleave', release, { passive: true });
      button.addEventListener('blur', release);
      button.addEventListener('keydown', event => {
        if (!event.repeat && (event.key === 'Enter' || event.key === ' ')) press();
      });
      button.addEventListener('keyup', event => {
        if (event.key === 'Enter' || event.key === ' ') release();
      });
      button.addEventListener('click', () => {
        press();
        release();
      });
    });
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindPressedGlows, { once: true });
  } else {
    bindPressedGlows();
  }
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

// Visual-only award previews: ?bigwin-preview=1 or ?nicewin-preview=1.
(() => {
  const params = new URLSearchParams(window.location.search);
  const mode = params.has('bigwin-preview') ? 'bigwin' : params.has('nicewin-preview') ? 'nicewin' : null;
  if (!mode) return;
  const showPreview = () => {
    const loadingScreen = document.getElementById('loadingScreen');
    const showAward = mode === 'bigwin' ? window.showBigWin : window.showLowWin;
    if (typeof showAward !== 'function' || (loadingScreen && !loadingScreen.classList.contains('is-hidden'))) {
      window.setTimeout(showPreview, 250);
      return;
    }
    showAward(mode === 'bigwin' ? 5000 : 450);
  };
  window.addEventListener('load', () => window.setTimeout(showPreview, 600), { once: true });
})();

// Cleopatra ambience: normal loop, Free Spins loop while free spins remain.
(() => {
  const musicSources = {
    normal: 'assets/cleopatra/audio/ambient_loop.cc7065347b0a237e9955be720db18ce2.mp3?v=cleo-ambient-20260927',
    free: 'assets/cleopatra/audio/ambient_free_loop.80394c45a1dae23b553261c4cb739950.mp3?v=cleo-free-loop-20260927'
  };
  const music = new Audio(musicSources.normal);
  music.preload = 'auto';
  music.loop = true;
  music.volume = 0.34;
  const freeMusicPreload = new Audio(musicSources.free);
  freeMusicPreload.preload = 'auto';
  freeMusicPreload.load();
  let mode = 'normal';
  let unlocked = false;
  let started = false;
  let pending = false;
  let generation = 0;
  const startCurrentTrack = () => {
    if (!unlocked || started || pending) return;
    pending = true;
    const token = ++generation;
    try {
      const attempt = music.play();
      if (attempt && typeof attempt.then === 'function') {
        attempt.then(() => {
          if (token === generation) { started = true; pending = false; }
        }).catch(() => {
          if (token === generation) { started = false; pending = false; }
        });
      } else {
        started = true;
        pending = false;
      }
    } catch {
      pending = false;
    }
  };
  const unlockMusic = () => {
    unlocked = true;
    startCurrentTrack();
  };
  const setMusicMode = nextMode => {
    if (nextMode === mode) return;
    mode = nextMode;
    generation++;
    started = false;
    pending = false;
    music.pause();
    music.src = musicSources[mode];
    try { music.currentTime = 0; } catch {}
    music.load();
    startCurrentTrack();
  };
  document.addEventListener('pointerdown', unlockMusic, { passive: true });
  document.addEventListener('keydown', unlockMusic);
  window.addEventListener('slot:spin-result', event => {
    const detail = event.detail || {};
    if (Number(detail.awarded) > 0) setMusicMode('free');
    else if (detail.isFreeSpin && Number(detail.freeSpinsRemaining) === 0) setMusicMode('normal');
  });
})();

// Layer the seamless coin loop and money cue while Cleopatra's Big Win is open.
(() => {
  const screen = document.getElementById('bigWinScreen');
  if (!screen) return;
  const coins = new Audio('assets/cleopatra/audio/coins_loop_seamless.mp3?v=cleo-loop-crossfade-250ms-20260927');
  const money = new Audio('assets/cleopatra/audio/money.f733bac8e9c46045c0bef5b78d1e1804.mp3?v=cleo-bigwin-money-20260927');
  coins.preload = 'auto';
  coins.loop = true;
  coins.volume = 0.72;
  money.preload = 'auto';
  money.loop = false;
  money.volume = 0.45;
  const playTrack = track => {
    if (!track.paused) return;
    try { track.currentTime = 0; } catch {}
    try {
      const attempt = track.play();
      if (attempt && typeof attempt.catch === 'function') attempt.catch(() => {});
    } catch {}
  };
  const stopTrack = track => {
    track.pause();
    try { track.currentTime = 0; } catch {}
  };
  const playBigWinSounds = () => { playTrack(coins); playTrack(money); };
  const stopBigWinSounds = () => { stopTrack(coins); stopTrack(money); };
  const syncSounds = () => screen.classList.contains('open') ? playBigWinSounds() : stopBigWinSounds();
  const observer = new MutationObserver(syncSounds);
  observer.observe(screen, { attributes: true, attributeFilter: ['class'] });
  syncSounds();
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopBigWinSounds();
    else syncSounds();
  });
  window.addEventListener('pagehide', stopBigWinSounds, { once: true });
})();

// Cleopatra reel-stop cues: normal stop, plus assigned BONUS/SCATTER variants.
(() => {
  const sources = {
    normal: 'assets/cleopatra/audio/reel-stop.mp3?v=cleo-reel-stop-20260927',
    bonus: 'assets/cleopatra/audio/reel_stop_bonus.mp3?v=cleo-reel-stop-20260927',
    scatter: 'assets/cleopatra/audio/reel_stop_scatter.mp3?v=cleo-reel-stop-20260927'
  };
  const cues = Object.fromEntries(Object.entries(sources).map(([key, src]) => {
    const track = new Audio(src);
    track.preload = 'none';
    track.volume = 0.34;
    return [key, track];
  }));
  let unlocked = false;
  const unlock = () => {
    if (unlocked) return;
    unlocked = true;
    Object.values(cues).forEach(track => { track.preload = 'auto'; track.load(); });
  };
  document.addEventListener('pointerdown', unlock, { once: true, passive: true });
  document.addEventListener('keydown', unlock, { once: true });
  const stopAll = () => Object.values(cues).forEach(track => {
    track.pause();
    try { track.currentTime = 0; } catch {}
  });
  const play = key => {
    if (!unlocked) return;
    const track = cues[key];
    track.pause();
    try { track.currentTime = 0; } catch {}
    try {
      const attempt = track.play();
      if (attempt && typeof attempt.catch === 'function') attempt.catch(() => {});
    } catch {}
  };
  window.addEventListener('slot:reel-stop', event => {
    const keys = event.detail?.keys || [];
    play(keys.includes('scatter') ? 'scatter' : keys.includes('bonus') ? 'bonus' : 'normal');
  });
  document.addEventListener('visibilitychange', () => { if (document.hidden) stopAll(); });
  window.addEventListener('pagehide', stopAll, { once: true });
})();

// The user-assigned hold_reel_stop cue plays only on a manual Spin button press.
(() => {
  const button = document.getElementById('spin');
  if (!button) return;
  const sound = new Audio('assets/cleopatra/audio/hold_reel_stop.b3d22c9127881cfbfe6df1989b20ee04.mp3?v=cleo-spin-button-20260927');
  sound.preload = 'auto';
  sound.volume = 0.34;
  const stop = () => {
    sound.pause();
    try { sound.currentTime = 0; } catch {}
  };
  button.addEventListener('click', () => {
    stop();
    try {
      const attempt = sound.play();
      if (attempt && typeof attempt.catch === 'function') attempt.catch(() => {});
    } catch {}
  });
  document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); });
  window.addEventListener('pagehide', stop, { once: true });
})();

// Play the two assigned cues together only while NICE WIN is visible.
(() => {
  const screen = document.getElementById('lowWinScreen');
  if (!screen) return;
  const symbolWin = new Audio('assets/cleopatra/audio/win_symbol_02.99861d0be6787ce80b2ded9b5d9aad74.mp3?v=cleo-nicewin-symbol-20260927');
  const money = new Audio('assets/cleopatra/audio/money.f733bac8e9c46045c0bef5b78d1e1804.mp3?v=cleo-nicewin-money-20260927');
  symbolWin.preload = 'auto';
  symbolWin.loop = false;
  symbolWin.volume = 0.55;
  money.preload = 'auto';
  money.loop = false;
  money.volume = 0.45;
  const playTrack = track => {
    if (!track.paused) return;
    try { track.currentTime = 0; } catch {}
    try {
      const attempt = track.play();
      if (attempt && typeof attempt.catch === 'function') attempt.catch(() => {});
    } catch {}
  };
  const stopTrack = track => {
    track.pause();
    try { track.currentTime = 0; } catch {}
  };
  const playNiceWinSounds = () => { playTrack(symbolWin); playTrack(money); };
  const stopNiceWinSounds = () => { stopTrack(symbolWin); stopTrack(money); };
  const syncSounds = () => screen.classList.contains('open') ? playNiceWinSounds() : stopNiceWinSounds();
  const observer = new MutationObserver(syncSounds);
  observer.observe(screen, { attributes: true, attributeFilter: ['class'] });
  syncSounds();
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopNiceWinSounds();
    else syncSounds();
  });
  window.addEventListener('pagehide', stopNiceWinSounds, { once: true });
})();

// Play the assigned boost-win cue only when the blue-book symbol triggers its ray effect.
(() => {
  const symbolIndex = window.SLOT_GAME_CONFIG?.symbols.findIndex(symbol => symbol.key === 'blue-book') ?? -1;
  if (symbolIndex < 0) return;
  const sound = new Audio('assets/cleopatra/audio/boost_win.46cf420e7b360bb5e35577076bb33248.mp3?v=cleo-bluebook-rays-20260927');
  sound.preload = 'none';
  sound.volume = 0.34;
  let unlocked = false;
  const unlock = () => {
    if (unlocked) return;
    unlocked = true;
    sound.preload = 'auto';
    sound.load();
  };
  document.addEventListener('pointerdown', unlock, { once: true, passive: true });
  document.addEventListener('keydown', unlock, { once: true });
  const stop = () => {
    sound.pause();
    try { sound.currentTime = 0; } catch {}
  };
  window.addEventListener('slot:spin-result', event => {
    const { values = [], wins = [] } = event.detail || {};
    const blueBookWon = wins.some(win => win.positions?.some(index => values[index] === symbolIndex));
    if (!unlocked || !blueBookWon) return;
    stop();
    try {
      const attempt = sound.play();
      if (attempt && typeof attempt.catch === 'function') attempt.catch(() => {});
    } catch {}
  });
  document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); });
  window.addEventListener('pagehide', stop, { once: true });
})();
