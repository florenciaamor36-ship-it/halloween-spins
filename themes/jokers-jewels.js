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
      lines: 5,
      minBet: 25,
      maxBet: 500,
      betStep: 25,
      minLines: 5,
      maxLines: 5,
      lineStep: 1,
      jackpotContributionRate: 0,
      minimumJackpotContribution: 0,
      bigWinBetMultiplier: 10,
      lowWinBetMultiplier: 3,
      freeSpins: 0
    },
    specialSymbols: {
      wild: 'inactive-wild',
      scatter: 'bonus',
      bonus: 'inactive-symbol-8',
      animatedWin: 'joker'
    },
    rules: {
      cols: 5,
      rows: 3,
      paylines: [
        [1,1,1,1,1], [0,0,0,0,0], [2,2,2,2,2], [0,1,2,1,0], [2,1,0,1,2]
      ],
      lineColors: ['#ff4fc8','#43e6ff','#f54466','#c77dff','#ffd54a'],
      symbolWeights: [139,139,139,139,139,140,140,0,0,0,0,0,25],
      weightTotal: 1000,
      paytableCounts: [2,3,4,5],
      minimumMatch: 2,
      specialMinimumMatch: 3,
      paytable: {
        0: {3:84.44,4:153.48,5:269.59},
        1: {3:33.78,4:84.44,5:168.90},
        2: {3:33.78,4:84.44,5:168.90},
        3: {3:16.89,4:33.78,5:84.44},
        4: {3:16.89,4:33.78,5:84.44},
        5: {3:16.89,4:33.78,5:84.44},
        6: {2:0.90,3:16.89,4:33.78,5:84.44},
        7: {3:0,4:0,5:0}, 8: {3:0,4:0,5:0}, 9: {3:0,4:0,5:0},
        10: {3:0,4:0,5:0}, 11: {3:0,4:0,5:0},
        12: {3:10,4:50,5:250}
      },
      bonusFreeSpins: {},
      paytableOrder: [0,1,2,3,4,5,6,12]
    },
    features: {
      allowFreeSpinRetrigger: false,
      turboSpin: { multiplier: 2.2 },
      keyboardControls: true,
      preventKeyboardWhenModal: true,
      autoSpinLimitOptions: [10,25,50]
    },
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
      paytableSubtitle: 'Premios por línea · BONUS paga sobre la apuesta total',
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
        scatterAward: 'PREMIO BONUS: {amount} fichas\nPREMIO TOTAL: {total} fichas',
        prize: 'PREMIO: {amount} fichas'
      },
      paytableRules: [
        '• Los símbolos comunes pagan de izquierda a derecha en 5 líneas fijas.',
        '• BONUS paga en cualquier posición: 10×, 50× o 250× la apuesta con 3, 4 o 5 símbolos.',
        '• La esfera azul también paga con 2 símbolos; no hay WILD ni giros gratis.',
        '• Los importes impresos en ARS son decorativos; esta tabla muestra los premios en fichas.'
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
