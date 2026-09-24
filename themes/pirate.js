/* Pirate's Treasure standalone theme. Uses the shared slot engine unchanged. */
window.SLOT_GAME_CONFIG = {
  schemaVersion: 1,
  id: 'pirate',
  assets: {
    frame: { portrait: 'assets/pirate/frame.webp?v=1', fallback: 'assets/pirate/frame.webp?v=1' },
    loading: 'assets/pirate/frame.webp?v=1',
    spin: { normal: 'assets/pirate/spin-normal.svg?v=1', pressed: 'assets/pirate/spin-pressed.svg?v=1' },
    indicators: {
      balance: 'assets/pirate/balance.svg?v=1',
      bet: 'assets/pirate/bet.svg?v=1',
      lines: 'assets/pirate/lines.svg?v=1'
    },
    announcementFrame: 'assets/pirate/announcement-frame.svg?v=1',
    bigWin: 'assets/pirate/big-win.svg?v=1',
    lowWin: 'assets/pirate/low-win.svg?v=1',
    paytableFrame: 'assets/pirate/paytable-frame.svg?v=1',
    symbols: 'assets/pirate/symbols',
    winFrames: [{ key: 'pirate-win-glow', src: 'assets/pirate/win-glow.svg?v=1' }]
  },
  symbols: [
    { key: 'ship', label: 'Barco pirata', asset: 'assets/pirate/symbols/ship.webp' },
    { key: 'parrot', label: 'Loro', asset: 'assets/pirate/symbols/parrot.webp' },
    { key: 'anchor', label: 'Ancla', asset: 'assets/pirate/symbols/anchor.webp' },
    { key: 'treasure-map', label: 'Mapa del tesoro', asset: 'assets/pirate/symbols/treasure-map.webp' },
    { key: 'compass', label: 'Brújula', asset: 'assets/pirate/symbols/compass.webp' },
    { key: 'A', label: 'A', asset: 'assets/pirate/symbols/A.svg' },
    { key: 'K', label: 'K', asset: 'assets/pirate/symbols/K.svg' },
    { key: 'Q', label: 'Q', asset: 'assets/pirate/symbols/Q.svg' },
    { key: 'J', label: 'J', asset: 'assets/pirate/symbols/J.svg' },
    { key: '10', label: '10', asset: 'assets/pirate/symbols/10.svg' },
    { key: 'wild', label: 'WILD', asset: 'assets/pirate/symbols/wild-skull.webp' },
    { key: 'scatter', label: 'SCATTER', asset: 'assets/pirate/symbols/scatter-compass.webp' },
    { key: 'bonus', label: 'BONUS', asset: 'assets/pirate/symbols/bonus-chest.webp' }
  ],
  defaults: {
    balance: 10000, bet: 50, jackpot: 75420, lines: 20,
    minBet: 25, maxBet: 500, betStep: 25,
    minLines: 5, maxLines: 20, lineStep: 5,
    jackpotContributionRate: 0.1, minimumJackpotContribution: 1,
    bigWinBetMultiplier: 10, lowWinBetMultiplier: 3, freeSpins: 0
  },
  specialSymbols: { wild: 'wild', scatter: 'scatter', bonus: 'bonus', animatedWin: 'ship' },
  rules: {
    cols: 5, rows: 3,
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
    paytableCounts: [3,4,5], minimumMatch: 3, specialMinimumMatch: 3,
    paytable: {
      0:{3:90,4:270,5:900}, 1:{3:36,4:90,5:180},
      2:{3:36,4:90,5:180}, 3:{3:36,4:90,5:180},
      4:{3:36,4:90,5:180}, 5:{3:18,4:36,5:90},
      6:{3:18,4:36,5:90}, 7:{3:18,4:36,5:90},
      8:{3:18,4:36,5:90}, 9:{3:18,4:36,5:90},
      10:{3:180,4:450,5:1800}, 11:{3:1,4:2,5:5},
      12:{3:0,4:0,5:0}
    },
    bonusFreeSpins: {3:5,4:8,5:12},
    paytableOrder: [5,6,7,8,9,1,2,3,4,0,10,11,12]
  },
  visual: {
    symbolFit: 'cell-width', symbolScale: 1.48, symbolScaleY: 1,
    winEffects: { 'bonus': { type: 'gold-chest', color: '#f5ca62', highlight: '#fff1b4', when: 'bonus-awarded' } }
  },
  ui: {
    name: "Pirate's Treasure Spins", numberLocale: 'de-DE',
    scatterPaytableLabel: '{label} · BET total', freeSpinsSuffix: 'tiros', paytableMultiplierSuffix: '×',
    announcementAlt: 'Avisos del barco pirata', frameAlt: 'Marco del barco pirata',
    bigWinAlt: 'Gran tesoro', lowWinAlt: 'Premio pirata',
    paytableBrand: 'PIRATE’S TREASURE', paytableTitle: 'Tabla del botín',
    paytableSubtitle: 'Multiplicador por línea · SCATTER por BET total',
    paytableSymbolHeader: 'Símbolo', rulesTitle: 'REGLAS', spinLabel: 'Girar',
    menuLabel: 'BOTÍN', loadingLabel: 'Preparando el barco', lowWinTitle: '¡BUEN BOTÍN!',
    labels: { balance: 'SALDO', bet: 'BET', lines: 'LÍNEAS', win: 'PREMIO', jackpot: 'JACKPOT' },
    messages: {
      autoSpin: 'AUTO', stopAutoSpin: 'PARAR', stopAutoSpinOverlay: 'PARAR AUTO',
      insufficientBalance: 'SALDO INSUFICIENTE',
      bonusAward: 'BONUS +{awarded} TIROS GRATIS\nRESTANTES: {remaining}',
      scatterAward: 'SCATTER +${amount}\nPREMIO TOTAL: ${total}', prize: 'PREMIO: ${amount}'
    },
    paytableRules: [
      '• El BET total se reparte entre las líneas activas.',
      '• Los premios cuentan de izquierda a derecha.',
      '• WILD reemplaza cualquier símbolo.',
      '• BONUS: 3, 4 o 5 cofres dan 5, 8 o 12 tiros gratis.'
    ]
  },
  colors: {
    accent: '#f3c86a', glow: '#ffd45e', highlight: '#fff0bd', panel: '#21160f',
    particlePalette: ['#ffe28b','#f3c86a','#d4a24b','#f4f0d2','#ffffff','#b86c35'],
    lowWinParticlePalette: ['#ffd34d','#fff0a8','#ff9d00','#ffffff'], winningTint: '#ffdf82'
  }
};
