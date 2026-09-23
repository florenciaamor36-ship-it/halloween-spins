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
    indicators: {
      balance: 'assets/cleopatra/indicators/balance.webp?v=1',
      bet: 'assets/cleopatra/indicators/bet.webp?v=1',
      lines: 'assets/cleopatra/plaque.svg?v=1'
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
