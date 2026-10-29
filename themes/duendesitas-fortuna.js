/*
 * Halloween Spins theme + game data.
 * To add another slot theme, copy this file, change the artwork/rules data,
 * and load the alternate config before main.js. The engine stays unchanged.
 */
window.SLOT_GAME_CONFIG = {
  schemaVersion: 1,
  id: 'duendesitas-fortuna',
  assets: {
    frame: {
      portrait: 'assets/duendesitas-fortuna/frame.jpg?v=4',
      fallback: 'assets/duendesitas-fortuna/frame.jpg?v=4'
    },
    loading: 'assets/duendesitas-fortuna/loading-screen.jpg?v=4',
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
    winFrames: [],
    extraPreload: [
      'assets/duendesitas-fortuna/symbols/galera.png?v=3',
      'assets/duendesitas-fortuna/symbols/cauldron.png?v=3',
      'assets/duendesitas-fortuna/symbols/clover.png?v=5',
      'assets/duendesitas-fortuna/symbols/bonus.png?v=4',
      'assets/duendesitas-fortuna/symbols/mushroom.webp?v=20261029',
      'assets/duendesitas-fortuna/symbols/potion.webp?v=20261029',
      'assets/duendesitas-fortuna/symbols/wand.webp?v=20261029',
      'assets/symbols/A.webp?v=1',
      'assets/symbols/K.webp?v=1',
      'assets/symbols/Q.webp?v=1',
      'assets/symbols/J.webp?v=1',
      'assets/symbols/10.webp?v=1'
    ]
  },
  symbols: [
    { key: 'galera', label: 'Galera de la suerte', asset: 'assets/duendesitas-fortuna/symbols/galera.png?v=3' },
    { key: 'cauldron', label: 'Caldero mágico', asset: 'assets/duendesitas-fortuna/symbols/cauldron.png?v=3' },
    { key: 'clover', label: 'Trébol Mágico', asset: 'assets/duendesitas-fortuna/symbols/clover.png?v=5' },
    { key: 'bonus', label: 'BONUS', asset: 'assets/duendesitas-fortuna/symbols/bonus.png?v=4' },
    { key: 'mushroom', label: 'Hongo mágico', asset: 'assets/duendesitas-fortuna/symbols/mushroom.webp?v=20261029' },
    { key: 'potion', label: 'Poción mágica', asset: 'assets/duendesitas-fortuna/symbols/potion.webp?v=20261029' },
    { key: 'wand', label: 'Varita de trébol', asset: 'assets/duendesitas-fortuna/symbols/wand.webp?v=20261029' },
    { key: 'A', label: 'A', asset: 'assets/symbols/A.webp?v=1' },
    { key: 'K', label: 'K', asset: 'assets/symbols/K.webp?v=1' },
    { key: 'Q', label: 'Q', asset: 'assets/symbols/Q.webp?v=1' },
    { key: 'J', label: 'J', asset: 'assets/symbols/J.webp?v=1' },
    { key: '10', label: '10', asset: 'assets/symbols/10.webp?v=1' }
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
    wild: '__none__',
    scatters: [],
    bonus: 'bonus',
    animatedWin: 'galera'
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
    symbolWeights: [110,110,110,40,110,110,110,60,60,60,60,60],
    weightTotal: 1000,
    paytableCounts: [3, 4, 5],
    minimumMatch: 3,
    specialMinimumMatch: 3,
    paytable: {
      0:{3:25,4:90,5:300}, 1:{3:20,4:75,5:240},
      2:{3:18,4:65,5:200}, 3:{3:12,4:40,5:125},
      4:{3:10,4:34,5:105}, 5:{3:8,4:28,5:88}, 6:{3:6,4:18,5:55},
      7:{3:9,4:28,5:90}, 8:{3:7,4:22,5:70}, 9:{3:6,4:18,5:60},
      10:{3:5,4:15,5:50}, 11:{3:4,4:12,5:40}
    },
    bonusFreeSpins: {3:3, 4:5, 5:8},
    paytableOrder: [0,1,2,4,5,6,7,8,9,10,11,3]
  },
  features: { allowFreeSpinRetrigger: false },
  visual: { symbolScale: 1.30, symbolScales: {galera:1,cauldron:1,clover:1,bonus:0.82,mushroom:0.72,potion:0.72,wand:0.72,A:0.72,K:0.72,Q:0.72,J:0.72,10:0.72}, symbolFit:'cell-width', winEffects: {
    galera: {type:'galera-tilt',color:'#ffd447',highlight:'#fff5b2'},
    cauldron: {type:'cauldron-bubble',color:'#66ef9a',highlight:'#d1ffe0'},
    clover: {type:'clover-spin',color:'#ffe000',highlight:'#fff8ba'},
    bonus: {type:'bonus-glow',when:'line-win',color:'#ffc83d',highlight:'#fff0a1'},
    mushroom: {type:'mushroom-bounce',color:'#ff5964',highlight:'#fff0a1'},
    potion: {type:'potion-glow',color:'#cc72ff',highlight:'#f6ddff'},
    wand: {type:'wand-tilt',color:'#52e5a4',highlight:'#d8ff9d'}
  } },

  ui: {
    name: 'Duendesitas de la Fortuna',
    numberLocale: 'de-DE',
    scatterPaytableLabel: '{label} · BET total',
    freeSpinsSuffix: 'tiros',
    paytableMultiplierSuffix: '×',
    announcementAlt: 'Panel de anuncios',
    frameAlt: 'Marco Duendesitas de la Fortuna',
    bigWinAlt: 'Premio grande',
    lowWinAlt: 'Premio',
    paytableBrand: 'DUENDESITAS DE LA FORTUNA',
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
      '• Aparecen galera, caldero, trébol, hongo, poción, varita, letras A, K, Q, J, 10 y BONUS. BONUS paga en línea y tres o más dan tiros gratis.',
      '• RTP teórico: 93% a largo plazo; no garantiza resultados en una sesión.'
    ]
  },
  colors: {
    accent: '#ffd55b',
    glow: '#ffb82e',
    highlight: '#fff0a8',
    panel: '#171126',
    particlePalette: ['#d8ff82','#ffe45e','#ff75d8','#6ee7ff','#ffffff','#a78bfa'],
    lowWinParticlePalette: ['#ffd34d','#fff0a8','#ff9d00','#ffffff'],
    winningTint: '#ffe47a'
  }
};
