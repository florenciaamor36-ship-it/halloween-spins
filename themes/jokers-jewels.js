(() => {
  const base = 'assets/jokers-jewels/';
  const symbols = `${base}symbols/`;
  const blank = `${base}transparent.webp?v=1`;
  window.SLOT_GAME_CONFIG = {
    schemaVersion: 1,
    id: 'jokers-jewels',
    assets: {
      frame: { portrait: `${base}frame.webp?v=1`, fallback: `${base}frame.webp?v=1` },
      loading: `${base}frame.webp?v=1`,
      spin: { normal: blank, pressed: blank },
      indicators: { balance: blank, bet: blank, lines: blank },
      announcementFrame: blank,
      bigWin: `${symbols}joker.webp?v=1`,
      lowWin: `${symbols}joker.webp?v=1`,
      paytableFrame: blank,
      winFrames: [{ key: 'jj-transparent-win', src: blank }]
    },
    symbols: [
      { key: 'joker', label: 'Joker', asset: `${symbols}joker.webp?v=1` },
      { key: 'mandolin', label: 'Mandolina', asset: `${symbols}mandolina.webp?v=1` },
      { key: 'juggling-clubs', label: 'Mazas', asset: `${symbols}mazas.webp?v=1` },
      { key: 'clown-boots', label: 'Botas', asset: `${symbols}botas.webp?v=1` },
      { key: 'ruby', label: 'Gema roja', asset: `${symbols}gema-roja.webp?v=1` },
      { key: 'aqua-gem', label: 'Gema celeste', asset: `${symbols}gema-celeste.webp?v=1` },
      { key: 'blue-orb', label: 'Esfera azul', asset: `${symbols}esfera-azul.webp?v=1` },
      { key: 'inactive-symbol-8', label: 'Inactivo', asset: blank },
      { key: 'inactive-symbol-9', label: 'Inactivo', asset: blank },
      { key: 'inactive-symbol-10', label: 'Inactivo', asset: blank },
      { key: 'inactive-wild', label: 'WILD inactivo', asset: blank },
      { key: 'inactive-scatter', label: 'SCATTER inactivo', asset: blank },
      { key: 'bonus', label: 'BONUS', asset: `${symbols}bonus.webp?v=1` }
    ],
    visual: { symbolScale: 0.78, symbolFit: 'cell-width', symbolScaleY: 1 },
    defaults: {
      balance: 10000,
      bet: 50,
      jackpot: 0,
      lines: 20,
      minBet: 25,
      maxBet: 500,
      betStep: 25,
      minLines: 5,
      maxLines: 20,
      lineStep: 5,
      jackpotContributionRate: 0,
      minimumJackpotContribution: 0,
      bigWinBetMultiplier: 10,
      lowWinBetMultiplier: 3,
      freeSpins: 0
    },
    specialSymbols: {
      wild: 'inactive-wild',
      scatter: 'inactive-scatter',
      bonus: 'bonus',
      animatedWin: 'joker'
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
      lineColors: ['#ff4fc8','#43e6ff','#f54466','#c77dff','#ffd54a','#68efac','#fd8a47','#69a7ff','#f66bd8','#a4f04b','#42d9c6','#ffc05c','#a898ff','#ff7895','#60f0c6','#e8d94b','#64cfff','#dc9cff','#6be07c','#ff85cf'],
      symbolWeights: [139,139,139,139,139,140,140,0,0,0,0,0,25],
      weightTotal: 1000,
      paytableCounts: [3,4,5],
      minimumMatch: 3,
      specialMinimumMatch: 3,
      paytable: {
        0: {3:93.97,4:170.79,5:300},
        1: {3:37.59,4:93.97,5:187.95},
        2: {3:37.59,4:93.97,5:187.95},
        3: {3:18.79,4:37.59,5:93.97},
        4: {3:18.79,4:37.59,5:93.97},
        5: {3:18.79,4:37.59,5:93.97},
        6: {3:18.79,4:37.59,5:93.97},
        7: {3:0,4:0,5:0}, 8: {3:0,4:0,5:0}, 9: {3:0,4:0,5:0},
        10: {3:0,4:0,5:0}, 11: {3:0,4:0,5:0},
        12: {3:0,4:0,5:0}
      },
      bonusFreeSpins: {3:3,4:5,5:8},
      paytableOrder: [0,1,2,3,4,5,6,12]
    },
    features: { allowFreeSpinRetrigger: false },
    ui: {
      name: "Joker's Jewels",
      numberLocale: 'es-AR',
      scatterPaytableLabel: '{label}',
      freeSpinsSuffix: 'giros',
      paytableMultiplierSuffix: '×',
      announcementAlt: 'Panel de premios de Joker’s Jewels',
      frameAlt: 'Máscara original de Joker’s Jewels',
      bigWinAlt: 'Joker',
      lowWinAlt: 'Joker',
      paytableBrand: "JOKER'S JEWELS",
      paytableTitle: 'Premios en fichas',
      paytableSubtitle: 'Multiplicador por línea · BONUS paga en cualquier posición',
      paytableSymbolHeader: 'Símbolo',
      rulesTitle: 'REGLAS',
      spinLabel: 'Girar',
      menuLabel: 'PREMIOS',
      loadingLabel: "Cargando Joker's Jewels",
      lowWinTitle: '¡PREMIO!',
      labels: { balance: 'SALDO', bet: 'APUESTA', lines: 'LÍNEAS', win: 'PREMIO', jackpot: 'JACKPOT' },
      messages: {
        autoSpin: 'AUTO', stopAutoSpin: 'PARAR', stopAutoSpinOverlay: 'PARAR AUTO',
        insufficientBalance: 'SALDO INSUFICIENTE',
        bonusAward: 'BONUS +{awarded} GIROS GRATIS\nRESTANTES: {remaining}',
        scatterAward: 'SCATTER +${amount}\nPREMIO TOTAL: ${total}',
        prize: 'PREMIO: ${amount}'
      },
      paytableRules: [
        '• Los símbolos comunes pagan de izquierda a derecha.',
        '• El BONUS puede aparecer en cualquier posición.',
        '• 3, 4 o 5 BONUS otorgan 3, 5 u 8 giros gratis.',
        '• El panel de importes impreso en la máscara es decorativo; esta tabla muestra los premios del juego en fichas.'
      ]
    },
    colors: {
      accent: '#e747bc', glow: '#4ddcff', highlight: '#fff0ad', panel: '#26103d',
      particlePalette: ['#ff4fc8','#4de2ff','#ffd54a','#b875ff','#fff0ad','#67f0c2'],
      lowWinParticlePalette: ['#ff74d5','#fff0ad','#4de2ff','#ffffff'],
      winningTint: '#fff4c4'
    }
  };
})();
