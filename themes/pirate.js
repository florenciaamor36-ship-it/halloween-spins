/* Máscara nueva: configuración conectada al motor compartido.
   Los símbolos quedan en blanco hasta que la usuaria agregue su arte. */
(() => {
  const pendingArtwork = 'assets/pirate/pending.webp';
  window.SLOT_GAME_CONFIG = {
    schemaVersion: 1,
    id: 'pirate',
    assets: {
      frame: { portrait: 'assets/pirate/frame.webp', fallback: 'assets/pirate/frame.webp' },
      loading: 'assets/pirate/frame.webp',
      announcementFrame: pendingArtwork,
      winFrames: [{ key: 'pirate-pending-win', src: `${pendingArtwork}?placeholder=win` }]
    },
  symbols: [
    { key: 'mask-symbol-1', label: 'Símbolo pendiente 1', asset: `${pendingArtwork}?slot=1` },
    { key: 'mask-symbol-2', label: 'Símbolo pendiente 2', asset: `${pendingArtwork}?slot=2` },
    { key: 'mask-symbol-3', label: 'Símbolo pendiente 3', asset: `${pendingArtwork}?slot=3` },
    { key: 'mask-symbol-4', label: 'Símbolo pendiente 4', asset: `${pendingArtwork}?slot=4` },
    { key: 'mask-symbol-5', label: 'Símbolo pendiente 5', asset: `${pendingArtwork}?slot=5` },
    { key: 'mask-10', label: '10', asset: `${pendingArtwork}?slot=10` },
    { key: 'mask-J', label: 'J', asset: `${pendingArtwork}?slot=J` },
    { key: 'mask-Q', label: 'Q', asset: `${pendingArtwork}?slot=Q` },
    { key: 'mask-K', label: 'K', asset: `${pendingArtwork}?slot=K` },
    { key: 'mask-A', label: 'A', asset: `${pendingArtwork}?slot=A` },
    { key: 'wild', label: 'WILD pendiente', asset: `${pendingArtwork}?slot=wild` },
    { key: 'scatter', label: 'SCATTER pendiente', asset: `${pendingArtwork}?slot=scatter` },
    { key: 'bonus', label: 'BONUS pendiente', asset: `${pendingArtwork}?slot=bonus` }
  ],
    visual: { symbolScale: 0.82, symbolScaleY: 1.15, symbolFit: 'cell-width' },
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
    specialSymbols: { wild: 'wild', scatter: 'scatter', bonus: 'bonus', animatedWin: 'mask-symbol-1' },
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
    lineColors: ['#eab308','#38bdf8','#f43f5e','#a855f7','#22c55e','#fb923c','#06b6d4','#ec4899','#84cc16','#f59e0b','#14b8a6','#6366f1','#d946ef','#e11d48','#10b981','#facc15','#38bdf8','#c084fc','#4ade80','#f472b6'],
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
      name: 'Máscara nueva · En preparación',
      numberLocale: 'es-AR',
      scatterPaytableLabel: '{label} · APUESTA total',
      freeSpinsSuffix: 'giros',
      paytableMultiplierSuffix: '×',
      announcementAlt: 'Panel de la máscara nueva',
      frameAlt: 'Arte base de la máscara nueva',
      bigWinAlt: 'Premio grande',
      lowWinAlt: 'Premio',
      paytableBrand: 'MÁSCARA NUEVA',
      paytableTitle: 'Tabla de premios',
      paytableSubtitle: 'Multiplicador por línea · SCATTER por apuesta total',
      paytableSymbolHeader: 'Símbolo',
      rulesTitle: 'REGLAS',
      spinLabel: 'Girar',
      menuLabel: 'PREMIOS',
      loadingLabel: 'Cargando máscara',
      lowWinTitle: '¡PREMIO!',
      labels: { balance: 'SALDO', bet: 'APUESTA', lines: 'LÍNEAS', win: 'PREMIO', jackpot: 'TESORO' },
      messages: {
        autoSpin: 'AUTO', stopAutoSpin: 'PARAR', stopAutoSpinOverlay: 'PARAR AUTO',
        insufficientBalance: 'SALDO INSUFICIENTE',
        bonusAward: 'BONUS +{awarded} GIROS GRATIS\nRESTANTES: {remaining}',
        scatterAward: 'SCATTER +${amount}\nPREMIO TOTAL: ${total}',
        prize: 'PREMIO: ${amount}'
      },
      paytableRules: [
        '• El BET total se reparte entre las líneas activas.',
        '• El premio cuenta de izquierda a derecha.',
        '• WILD reemplaza cualquier símbolo.',
        '• BONUS: 3, 4 o 5 símbolos dan 5, 8 o 12 tiros gratis.'
      ]
    },
    colors: {
      accent: '#e7c47a', glow: '#d79b39', highlight: '#fff0b3', panel: '#21170f',
      particlePalette: ['#f0d17a','#ffe4a1','#e29a42','#fff5cc','#c98438','#ffcf6a'],
      lowWinParticlePalette: ['#ffd34d','#fff0a8','#d89039','#ffffff'],
      winningTint: '#fff0bc'
    }
  };
})();
