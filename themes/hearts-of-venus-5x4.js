/* Hearts of Venus: isolated 5×4 preview on the shared Halloween Spins SlotEngine.
   Paytable, weights and special symbols here are demo-only—not provider parameters. */
window.SLOT_GAME_CONFIG = {
 schemaVersion:1,id:'hearts-of-venus-5x4',
 assets:{
  frame:{portrait:'assets/hearts-of-venus/frame.webp',fallback:'assets/hearts-of-venus/frame.webp'},
  loading:'assets/hearts-of-venus/frame.webp',
  spin:{normal:'assets/hearts-of-venus/spin-normal.webp',pressed:'assets/hearts-of-venus/spin-pressed.webp'},
  indicators:{balance:'assets/hearts-of-venus/transparent.png',bet:'assets/hearts-of-venus/transparent.png',lines:'assets/hearts-of-venus/transparent.png'},
  announcementFrame:'assets/hearts-of-venus/transparent.png',bigWin:'assets/hearts-of-venus/symbols/heart-rose.png',lowWin:'assets/hearts-of-venus/symbols/heart-rose.png',
  paytableFrame:'assets/hearts-of-venus/frame.webp',
  winFrames:[{key:'venus-win',src:'assets/hearts-of-venus/symbols/heart-rose.png'}]
 },
 symbols:[
  {key:'helmet',label:'Casco',asset:'assets/hearts-of-venus/symbols/helmet.png'},
  {key:'lyre',label:'Lira',asset:'assets/hearts-of-venus/symbols/lyre.png'},
  {key:'gem-blue',label:'Gema azul',asset:'assets/hearts-of-venus/symbols/gem-blue.png'},
  {key:'gem-green',label:'Gema verde',asset:'assets/hearts-of-venus/symbols/gem-green.png'},
  {key:'gem-purple',label:'Gema violeta',asset:'assets/hearts-of-venus/symbols/gem-purple.png'},
  {key:'gem-red',label:'Gema roja',asset:'assets/hearts-of-venus/symbols/gem-red.png'},
  {key:'gem-silver',label:'Gema plateada',asset:'assets/hearts-of-venus/symbols/gem-silver.png'},
  {key:'shell-pearl',label:'Concha',asset:'assets/hearts-of-venus/symbols/shell-pearl.png'},
  {key:'heart-rose',label:'Corazón',asset:'assets/hearts-of-venus/symbols/heart-rose.png'},
  {key:'apple-gold',label:'Manzana',asset:'assets/hearts-of-venus/symbols/apple-gold.png'},
  {key:'wild-demo',label:'WILD (arte de Cleopatra reutilizado)',asset:'assets/helios-triple-sun/wild-sun.webp?v=venus-no-text-1'},
  {key:'venus-scatter',label:'Gema de dispersión (arte de Helios reutilizado)',asset:'assets/hearts-of-venus/symbols/scatter-orb-helios.webp'},
  {key:'bonus-demo',label:'BONUS (cofre de Cleopatra reutilizado)',asset:'assets/book-of-cleo/symbols/bonus.webp?v=venus-no-text-1'}
 ],
 defaults:{balance:10000,bet:50,jackpot:0,lines:20,minBet:25,maxBet:500,betStep:25,minLines:5,maxLines:20,lineStep:5,jackpotContributionRate:0,minimumJackpotContribution:0,bigWinBetMultiplier:10,lowWinBetMultiplier:3,freeSpins:0,freeSpinStartDelay:700},
 specialSymbols:{wild:'wild-demo',scatter:'venus-scatter',bonus:'bonus-demo',animatedWin:'helmet'},
 rules:{
  targetRtpPercent:null,payoutScale:1,cols:5,rows:4,
  paylines:[[1,1,1,1,1],[0,0,0,0,0],[2,2,2,2,2],[3,3,3,3,3],[0,1,2,3,2],[3,2,1,0,1],[0,1,1,2,3],[3,2,2,1,0],[1,0,1,2,1],[2,3,2,1,2],[0,0,1,2,3],[3,3,2,1,0],[1,2,3,2,1],[2,1,0,1,2],[0,1,2,2,3],[3,2,1,1,0],[1,1,0,1,2],[2,2,3,2,1],[0,1,0,1,3],[3,2,3,2,0]],
  lineColors:['#f6d47b','#ff74cf','#83d8ff','#ff865d','#c69cff','#82f0ce','#fff0aa','#ff61a5','#9dfbff','#ffbf72','#cf9bff','#84ef8d','#fb7ac6','#71c5ff','#ffdb69','#e7a6ff','#86efcf','#ffa274','#d5ed78','#ff91d1'],
  symbolWeights:[75,75,90,90,90,90,90,90,75,75,35,25,25],weightTotal:925,
  paytableCounts:[3,4,5],minimumMatch:3,specialMinimumMatch:3,
  paytable:{0:{3:1,4:3,5:12},1:{3:1,4:3,5:10},2:{3:.7,4:2,5:7},3:{3:.7,4:2,5:7},4:{3:.7,4:2,5:7},5:{3:.7,4:2,5:7},6:{3:.7,4:2,5:7},7:{3:.5,4:1.5,5:5},8:{3:.4,4:1,5:4},9:{3:.4,4:1,5:4},10:{3:1,4:4,5:15},11:{3:0.5,4:1,5:2},12:{}},
  bonusFreeSpins:{3:5,4:8,5:12},paytableOrder:[9,8,7,6,5,4,3,2,1,0,10,11,12]
 },
 animations:{spin:{firstStopMs:850,stopStaggerMs:70,symbolCycleMs:75,reelSpeed:1.35,fallbackMs:1900},sourceReelStop:{source:'source-json/0025_game009.json',clips:['stop0','stop1','stop2','stop3','stop4'],sourceReboundUnits:20,sourceCellUnits:147.9,dipMs:50,settleMs:83}},
 features:{allowFreeSpinRetrigger:false,keyboardControls:false},
 visual:{symbolScale:.90,symbolScaleY:.96,symbolFit:'cell-width'},
 ui:{name:'Hearts of Venus · preview 5×4',numberLocale:'es-AR',scatterPaytableLabel:'{label} · premio demo',freeSpinsSuffix:'giros',paytableMultiplierSuffix:'×',announcementAlt:'Avisos de demostración',frameAlt:'Fondo visual capturado de Hearts of Venus',bigWinAlt:'Celebración demo',lowWinAlt:'Premio demo',paytableBrand:'HEARTS OF VENUS · PREVIEW',paytableTitle:'Tabla demo',paytableSubtitle:'Pagos de prueba, no oficiales',paytableSymbolHeader:'Símbolo',rulesTitle:'AVISO',spinLabel:'Girar',menuLabel:'PREMIOS',loadingLabel:'Cargando Hearts of Venus',lowWinTitle:'PREMIO DEMO',labels:{balance:'CRÉDITOS',bet:'APUESTA',lines:'LÍNEAS',win:'PREMIO',jackpot:'DEMO'},messages:{autoSpin:'AUTO',stopAutoSpin:'PARAR',stopAutoSpinOverlay:'PARAR AUTO',insufficientBalance:'SALDO DEMO INSUFICIENTE',bonusAward:'BONUS DEMO: +{awarded} GIROS GRATIS\nRESTANTES: {remaining}',scatterAward:'SCATTER DEMO: +{amount}\nPREMIO TOTAL: {total}',prize:'PREMIO DEMO: {amount}'},paytableRules:['Preview local conectada al motor común de Halloween Spins.','Los símbolos y el SCATTER proceden de recursos visuales capturados de la demo pública.','WILD, BONUS y SCATTER usan arte gráfico reutilizado de otras máscaras del repositorio; no son símbolos originales de Hearts of Venus.','Pagos, pesos y giros gratis son reglas de demostración, no del proveedor.','No es RTP certificado, juego oficial ni saldo real.']},
 colors:{accent:'#ff83d4',glow:'#ff56c5',highlight:'#ffe4a8',panel:'#320d38',particlePalette:['#ff8ed9','#f4d16b','#fff4c6','#dc7dff','#ffb4eb'],lowWinParticlePalette:['#ffb4e9','#ffd67a','#fff4c6','#dc7dff'],winningTint:'#fff1aa'}
};