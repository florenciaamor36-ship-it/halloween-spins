(() => {
 const root='assets/good-girl-bad-girl/';
 const asset=name=>`${root}symbols/${name}.webp`;
 const symbols=[
  {key:'good-girl',label:'Good Girl',category:'reel',asset:asset('good-girl-smile'),animationFrames:[asset('good-girl-smile'),asset('good-girl-happy')]},
  {key:'bad-girl',label:'Bad Girl',category:'reel',asset:asset('bad-girl-devil'),animationFrames:[asset('bad-girl-devil'),asset('bad-girl-devil-2'),asset('bad-girl-devil-3')]},
  {key:'black-devil-cat',label:'Black Devil Cat',category:'reel',asset:asset('black-devil-cat')},
  {key:'white-cat',label:'White Cat',category:'reel',asset:asset('white-cat')},
  {key:'good-lyre',label:'Lyre',category:'reel',asset:asset('good-lyre')},
  {key:'letter-9',label:'9',category:'reel',asset:asset('letter-9')},
  {key:'letter-10',label:'10',category:'reel',asset:asset('letter-10')},
  {key:'letter-j',label:'J',category:'reel',asset:asset('letter-j')},
  {key:'letter-q',label:'Q',category:'reel',asset:asset('letter-q')},
  {key:'letter-k',label:'K',category:'reel',asset:asset('letter-k')},
  {key:'letter-a',label:'A',category:'reel',asset:asset('letter-a')},
  {key:'wild',label:'WILD',category:'special',asset:asset('wild'),animationFrames:[asset('wild'),asset('wild-2'),asset('wild-3')]},
  {key:'scatter-heaven',label:'SCATTER CIELO',category:'special',asset:asset('scatter-heaven')},
  {key:'scatter-hell',label:'SCATTER INFIERNO',category:'special',asset:asset('scatter-hell')},
  {key:'bonus',label:'BONUS FEATURE',category:'feature-placeholder',asset:asset('bonus-chest')}
 ];
 const nonReelAssets=['mystic-seer','wild-hunter','spellbook','golden-chalice','silver-coins','bad-cat','good-harp','bad-harp','bad-lyre','gold-coin-stack','good-gate','bad-gate','feature-wheel','multiplier-trail','map-bonus','bonus-chest'].map(asset);
 const high={3:2,4:5,5:15},mid={3:1.5,4:4,5:12},standard={3:1,4:3,5:8},low={3:.5,4:1.5,5:5};
 const scatterPayout={3:1,4:2,5:5};
 const payoutsByKey={'good-girl':high,'bad-girl':high,'black-devil-cat':mid,'white-cat':mid,'good-lyre':standard,'letter-9':low,'letter-10':low,'letter-j':low,'letter-q':low,'letter-k':low,'letter-a':low,'wild':{5:20},'scatter-heaven':scatterPayout,'scatter-hell':scatterPayout,'bonus':{}};
 const paytable=Object.fromEntries(symbols.map((symbol,index)=>[index,payoutsByKey[symbol.key]||{}]));
 const weights=[30,30,45,45,33,42,42,42,42,42,42,35,7,8,0];
 const weightTotal=weights.reduce((sum,weight)=>sum+weight,0);
 const transparent=`${root}transparent.webp`;
 window.SLOT_GAME_CONFIG={
  schemaVersion:1,id:'good-girl-bad-girl',
  assets:{frame:{portrait:`${root}frame-landscape.webp`,fallback:`${root}frame-landscape.webp`},loading:`${root}loading.webp`,spin:{normal:transparent,pressed:transparent},indicators:{balance:transparent,bet:transparent,lines:transparent},announcementFrame:transparent,bigWin:transparent,lowWin:transparent,paytableFrame:transparent,winFrames:[{key:'ggbg-win-glow',src:transparent}]},
  symbols,featureAssets:{nonReel:nonReelAssets},
  visual:{symbolScale:1,symbolScaleY:1,symbolFit:'cell-width',reelPerspective:0},
  animations:{spin:{firstStopMs:650,stopStaggerMs:220,symbolCycleMs:16,reelSpeed:1.5,fallbackMs:2600},idle:{smooth:true,intervalMs:150,transitionMs:140,staggerMs:100}},
  defaults:{balance:1000,bet:25,jackpot:0,lines:10,minBet:25,maxBet:500,betStep:25,minLines:10,maxLines:10,lineStep:5,jackpotContributionRate:0,minimumJackpotContribution:0,bigWinBetMultiplier:1000,lowWinBetMultiplier:1000,freeSpins:0},
  specialSymbols:{wild:'wild',scatter:'scatter-heaven',scatters:['scatter-heaven','scatter-hell'],bonus:'bonus',animatedWin:'good-girl'},
  rules:{cols:5,rows:3,payoutScale:1,paylines:[[1,1,1,1,1],[0,0,0,0,0],[2,2,2,2,2],[0,1,2,1,0],[2,1,0,1,2],[0,0,1,2,2],[2,2,1,0,0],[1,0,0,0,1],[1,2,2,2,1],[1,0,1,0,1]],lineColors:['#f5d47b','#64d9e8','#ff6b75','#b690ff','#f8aa52','#b9e887','#6dc0ff','#ff8ac5','#ffdf63','#82f0d5'],symbolWeights:weights,weightTotal,paytableCounts:[3,4,5],minimumMatch:3,specialMinimumMatch:3,paytable,bonusFreeSpins:{},paytableOrder:symbols.map((symbol,i)=>symbol.category==='feature-placeholder'?null:i).filter(i=>i!==null)},
  features:{allowFreeSpinRetrigger:false},
  ui:{name:'Good Girl Bad Girl · Prototipo',numberLocale:'es-AR',scatterPaytableLabel:'{label}',freeSpinsSuffix:'giros gratis',paytableMultiplierSuffix:'×',paytableMultiplierPrecision:1,announcementAlt:'',frameAlt:'Good Girl Bad Girl — arte original de la máquina',bigWinAlt:'',lowWinAlt:'',paytableBrand:'GOOD GIRL BAD GIRL',paytableTitle:'Tabla de premios (demo)',paytableSubtitle:'Valores provisionales; no son la tabla original',paytableSymbolHeader:'Símbolo',rulesTitle:'NOTAS DEL PROTOTIPO',spinLabel:'Girar',menuLabel:'MENÚ',loadingLabel:'Cargando',lowWinTitle:'¡PREMIO!',labels:{balance:'SALDO',bet:'APUESTA',lines:'LÍNEAS',win:'PREMIO',jackpot:'JACKPOT'},messages:{autoSpin:'AUTO',stopAutoSpin:'PARAR',stopAutoSpinOverlay:'PARAR AUTO',insufficientBalance:'SALDO INSUFICIENTE',bonusAward:'',scatterAward:'PREMIO SCATTER: {amount}',prize:'PREMIO: {amount}'},paytableRules:['Pagos y pesos provisionales de demostración; no son los originales y no se afirma un RTP.','Los Scatter CIELO e INFIERNO son símbolos separados, no animaciones; recursos de bonus y controles quedan fuera del carrete base.','La demo consultada muestra 5 × 4; este prototipo conserva la máscara acordada de 5 × 3 y 10 líneas.']},
  colors:{accent:'#f2d484',glow:'#d47b44',highlight:'#fff2c6',panel:'#120c10',particlePalette:['#ffdc91','#ef9b5a','#f8e5be','#a4d8ff','#ff735f'],lowWinParticlePalette:['#ffdb90','#f8b66f','#fff4cf','#ee7c5f'],winningTint:'#fff1bd'}
 };
})();
