(() => {
 const root='assets/good-girl-bad-girl/';
 const asset=name=>`${root}symbols/${name}.webp`;
 const symbols=[
  {key:'good-girl',label:'Good Girl',asset:asset('good-girl-smile'),animationFrames:[asset('good-girl-smile'),asset('good-girl-happy')]},
  {key:'bad-girl',label:'Bad Girl',asset:asset('bad-girl-devil'),animationFrames:[asset('bad-girl-devil'),asset('bad-girl-devil-2'),asset('bad-girl-devil-3')]},
  {key:'mystic-seer',label:'Mystic Seer',asset:asset('mystic-seer')},
  {key:'wild-hunter',label:'Wild Hunter',asset:asset('wild-hunter')},
  {key:'spellbook',label:'Spellbook',asset:asset('spellbook')},
  {key:'golden-chalice',label:'Golden Chalice',asset:asset('golden-chalice')},
  {key:'silver-coins',label:'Silver Coins',asset:asset('silver-coins')},
  {key:'white-cat',label:'White Cat',asset:asset('white-cat')},
  {key:'black-devil-cat',label:'Black Devil Cat',asset:asset('black-devil-cat')},
  {key:'bad-cat',label:'Bad Cat',asset:asset('bad-cat')},
  {key:'good-harp',label:'Good Harp',asset:asset('good-harp')},
  {key:'bad-harp',label:'Bad Harp',asset:asset('bad-harp')},
  {key:'good-lyre',label:'Good Lyre',asset:asset('good-lyre')},
  {key:'bad-lyre',label:'Bad Lyre',asset:asset('bad-lyre')},
  {key:'gold-coin-stack',label:'Gold Coin Stack',asset:asset('gold-coin-stack')},
  {key:'good-gate',label:'Good Gate',asset:asset('good-gate')},
  {key:'bad-gate',label:'Bad Gate',asset:asset('bad-gate')},
  {key:'feature-wheel',label:'Feature Wheel',asset:asset('feature-wheel')},
  {key:'multiplier-trail',label:'Multiplier Trail',asset:asset('multiplier-trail')},
  {key:'map-bonus',label:'Map Bonus',asset:asset('map-bonus')},
  {key:'letter-9',label:'9',asset:asset('letter-9')},
  {key:'letter-10',label:'10',asset:asset('letter-10')},
  {key:'letter-j',label:'J',asset:asset('letter-j')},
  {key:'letter-q',label:'Q',asset:asset('letter-q')},
  {key:'letter-k',label:'K',asset:asset('letter-k')},
  {key:'letter-a',label:'A',asset:asset('letter-a')},
  {key:'wild',label:'WILD',asset:asset('wild'),animationFrames:[asset('wild'),asset('wild-2'),asset('wild-3')]},
  {key:'scatter',label:'SCATTER',asset:asset('scatter'),animationFrames:[asset('scatter'),asset('scatter-2')]},
  {key:'bonus',label:'BONUS CHEST',asset:asset('bonus-chest')}
 ];
 const high={3:2,4:5,5:15},mid={3:1.5,4:4,5:12},standard={3:1,4:3,5:8},low={3:.5,4:1.5,5:5};
 const paytable=Object.fromEntries(symbols.map((_,i)=>[i,
  i<2?high:i<4?mid:i===26?{5:20}:i===27?{3:1,4:2,5:5}:i===28?{}:i>=20?low:standard
 ]));
 const weights=[30,30,30,30,35,35,35,45,45,45,45,45,45,45,33,30,30,20,20,20,42,42,42,42,42,42,35,15,5];
 const transparent=`${root}transparent.webp`;
 window.SLOT_GAME_CONFIG={
  schemaVersion:1,id:'good-girl-bad-girl',
  assets:{frame:{portrait:`${root}frame-landscape.webp`,fallback:`${root}frame-landscape.webp`},loading:`${root}loading.webp`,spin:{normal:transparent,pressed:transparent},indicators:{balance:transparent,bet:transparent,lines:transparent},announcementFrame:transparent,bigWin:transparent,lowWin:transparent,paytableFrame:transparent,winFrames:[{key:'ggbg-win-glow',src:transparent}]},
  symbols,
  visual:{symbolScale:1,symbolScaleY:1,symbolFit:'cell-width',reelPerspective:0},
  defaults:{balance:1000,bet:25,jackpot:0,lines:10,minBet:25,maxBet:500,betStep:25,minLines:10,maxLines:10,lineStep:5,jackpotContributionRate:0,minimumJackpotContribution:0,bigWinBetMultiplier:1000,lowWinBetMultiplier:1000,freeSpins:0},
  specialSymbols:{wild:'wild',scatter:'scatter',bonus:'bonus',animatedWin:'good-girl'},
  rules:{cols:5,rows:3,payoutScale:1,paylines:[[1,1,1,1,1],[0,0,0,0,0],[2,2,2,2,2],[0,1,2,1,0],[2,1,0,1,2],[0,0,1,2,2],[2,2,1,0,0],[1,0,0,0,1],[1,2,2,2,1],[1,0,1,0,1]],lineColors:['#f5d47b','#64d9e8','#ff6b75','#b690ff','#f8aa52','#b9e887','#6dc0ff','#ff8ac5','#ffdf63','#82f0d5'],symbolWeights:weights,weightTotal:1000,paytableCounts:[3,4,5],minimumMatch:3,specialMinimumMatch:3,paytable,bonusFreeSpins:{},paytableOrder:symbols.map((_,i)=>i)},
  features:{allowFreeSpinRetrigger:false},
  ui:{name:'Good Girl Bad Girl · Prototipo',numberLocale:'es-AR',scatterPaytableLabel:'{label}',freeSpinsSuffix:'giros gratis',paytableMultiplierSuffix:'×',paytableMultiplierPrecision:1,announcementAlt:'',frameAlt:'Good Girl Bad Girl — arte original de la máquina',bigWinAlt:'',lowWinAlt:'',paytableBrand:'GOOD GIRL BAD GIRL',paytableTitle:'Tabla de premios (demo)',paytableSubtitle:'Valores provisionales; no son la tabla original',paytableSymbolHeader:'Símbolo',rulesTitle:'NOTAS DEL PROTOTIPO',spinLabel:'Girar',menuLabel:'MENÚ',loadingLabel:'Cargando',lowWinTitle:'¡PREMIO!',labels:{balance:'SALDO',bet:'APUESTA',lines:'LÍNEAS',win:'PREMIO',jackpot:'JACKPOT'},messages:{autoSpin:'AUTO',stopAutoSpin:'PARAR',stopAutoSpinOverlay:'PARAR AUTO',insufficientBalance:'SALDO INSUFICIENTE',bonusAward:'',scatterAward:'PREMIO SCATTER: {amount}',prize:'PREMIO: {amount}'},paytableRules:['Pagos y pesos provisionales de demostración; no son los originales y no se afirma un RTP.','La rueda, el mapa, la compra de bonus y otras funciones originales no están implementadas en este prototipo.','La máscara conserva 5 columnas × 3 filas y 10 líneas; los controles se activan sobre el arte original.']},
  colors:{accent:'#f2d484',glow:'#d47b44',highlight:'#fff2c6',panel:'#120c10',particlePalette:['#ffdc91','#ef9b5a','#f8e5be','#a4d8ff','#ff735f'],lowWinParticlePalette:['#ffdb90','#f8b66f','#fff4cf','#ee7c5f'],winningTint:'#fff1bd'}
 };
})();
