/*
 * Halloween Spins theme + game data.
 * To add another slot theme, copy this file, change the artwork/rules data,
 * and load the alternate config before main.js. The engine stays unchanged.
 */
window.SLOT_GAME_CONFIG = {
  schemaVersion: 1,
  id: 'halloween',
  assets: {
    frame: {
      portrait: 'assets/frame-mobile.webp?v=4',
      fallback: 'assets/frame-pc.webp'
    },
    loading: 'assets/loading-screen.webp',
    spin: {
      normal: 'assets/buttons/spin-normal.webp?v=1',
      pressed: 'assets/buttons/spin-pressed.webp?v=1'
    },
    indicators: {
      balance: 'assets/indicators/balance.webp?v=3',
      bet: 'assets/indicators/bet.webp?v=2',
      lines: 'assets/indicators/lines.webp?v=2'
    },
    announcementFrame: 'assets/announcement-frame.webp?v=1',
    bigWin: 'assets/big-win-cutout.webp?v=2',
    lowWin: 'assets/low-win-pumpkin.webp?v=1',
    paytableFrame: 'assets/paytable/frame.webp?v=1',
    symbols: 'assets/symbols',
    winFrames: [0, 1, 2, 3, 7, 9, 10].map(frame => ({
      key: `pumpkin-win-${frame}`,
      src: `assets/animations/pumpkin-win-${frame}.webp?v=20260920-2`
    }))
  },
  symbols: [
    { key: 'pumpkin', label: 'Calabaza', asset: 'assets/symbols/pumpkin.webp' },
    { key: 'ghost', label: 'Fantasma', asset: 'assets/symbols/ghost.webp' },
    { key: 'bat', label: 'Murciélago', asset: 'assets/symbols/bat.webp' },
    { key: 'cauldron', label: 'Caldero', asset: 'assets/symbols/cauldron.webp' },
    { key: 'castle', label: 'Castillo', asset: 'assets/symbols/castle.webp' },
    { key: '10', label: '10', asset: 'assets/symbols/10.webp' },
    { key: 'J', label: 'J', asset: 'assets/symbols/J.webp' },
    { key: 'Q', label: 'Q', asset: 'assets/symbols/Q.webp' },
    { key: 'K', label: 'K', asset: 'assets/symbols/K.webp' },
    { key: 'A', label: 'A', asset: 'assets/symbols/A.webp' },
    { key: 'wild', label: 'WILD', asset: 'assets/symbols/wild.webp' },
    { key: 'scatter', label: 'SCATTER', asset: 'assets/symbols/scatter.webp' },
    { key: 'bonus', label: 'BONUS', asset: 'assets/symbols/bonus.webp' }
  ],
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
    animatedWin: 'pumpkin'
  },
  rules: {
    targetRtpPercent: 93, payoutScale: 1.162492647355474,
    cols: 5,
    rows: 3,
    paylines: [
      [1,1,1,1,1], [0,0,0,0,0], [2,2,2,2,2], [0,1,2,1,0],
      [2,1,0,1,2], [0,0,1,2,2], [2,2,1,0,0], [1,0,0,0,1],
      [1,2,2,2,1], [1,0,1,0,1], [1,2,1,2,1], [0,1,1,1,0],
      [2,1,1,1,2], [0,1,0,1,0], [2,1,2,1,2], [1,1,0,1,1],
      [1,1,2,1,1], [0,0,2,0,0], [2,2,0,2,0], [0,2,0,2,0]
    ],
    lineColors: ['#eab308','#38bdf8','#f43f5e','#a855f7','#22c55e','#fb923c','#06b6d4','#ec4899','#84cc16','#f59e0b','#14b8a6','#6366f1','#d946ef','#e11d48','#10b981','#facc15','#38bdf8','#c084fc','#4ade80','#f472b6'],
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
    name: 'Halloween Spins',
    numberLocale: 'de-DE',
    scatterPaytableLabel: '{label} · BET total',
    freeSpinsSuffix: 'tiros',
    paytableMultiplierSuffix: '×',
    announcementAlt: 'Panel de anuncios',
    frameAlt: 'Marco Halloween',
    bigWinAlt: 'Premio grande',
    lowWinAlt: 'Premio',
    paytableBrand: 'LA CLAVE ARGENTINA',
    paytableTitle: 'Tabla de premios',
    paytableSubtitle: 'Multiplicador por ficha de línea · SCATTER por BET total',
    paytableSymbolHeader: 'Símbolo',
    rulesTitle: 'REGLAS',
    spinLabel: 'Girar',
    menuLabel: 'MENU',
    loadingLabel: 'Cargando',
    lowWinTitle: 'NICE WIN',
    labels: { balance: 'BALANCE', bet: 'BET', lines: 'LINES', win: 'WIN', jackpot: 'JACKPOT' },
    messages: {
      autoSpin: 'AUTO',
      stopAutoSpin: 'PARAR',
      stopAutoSpinOverlay: 'PARAR AUTO',
      insufficientBalance: 'SALDO INSUFICIENTE',
      bonusAward: 'BONUS +{awarded} TIROS GRATIS\nRESTANTES: {remaining}',
      scatterAward: 'SCATTER +${amount}\nPREMIO TOTAL: ${total}',
      prize: 'PREMIO: ${amount}'
    },
    paytableRules: [
      '• El BET total se reparte entre las líneas activas.',
      '• El premio cuenta de izquierda a derecha.',
      '• WILD reemplaza cualquier símbolo.',
      '• BONUS: 3, 4 o 5 símbolos dan 3, 5 o 8 tiros gratis.',
      '• RTP teórico: 93% a largo plazo; no garantiza resultados en una sesión.'
    ]
  },
  colors: {
    accent: '#d8ff82',
    glow: '#94ff31',
    highlight: '#fff0a8',
    panel: '#171126',
    particlePalette: ['#d8ff82','#ffe45e','#ff75d8','#6ee7ff','#ffffff','#a78bfa'],
    lowWinParticlePalette: ['#ffd34d','#fff0a8','#ff9d00','#ffffff'],
    winningTint: '#c6ff50'
  }
};
