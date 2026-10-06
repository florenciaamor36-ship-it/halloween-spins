/* Local V8 Road King mask. Prize math is temporary and not user-approved final rules. */
if (new URLSearchParams(window.location.search).get('desktop-preview') === '1') document.documentElement.classList.add('rk-desktop-preview');
(() => {
 const transparent='assets/v8-power-road-king/transparent.webp';
 window.SLOT_GAME_CONFIG={schemaVersion:1,id:'v8-road-king',assets:{frame:{portrait:'assets/v8-power-road-king/frame.webp',fallback:'assets/v8-power-road-king/frame.webp'},loading:'assets/v8-power-road-king/loading.webp',spin:{normal:transparent,pressed:transparent},indicators:{balance:transparent,bet:transparent,lines:transparent},announcementFrame:transparent,bigWin:'assets/v8-power-road-king/effects/big-win.webp',lowWin:'assets/v8-power-road-king/effects/low-win.webp',paytableFrame:transparent,winFrames:[{key:'v8-win-glow',src:'assets/v8-power-road-king/effects/win-glow.webp'}]},
 symbols:[
    { key: 'cosmic-engine-heart', label: 'Cosmic Engine Heart', asset: 'assets/v8-power-road-king/symbols/cosmic-engine-heart-normal-centered.webp', winAsset: 'assets/v8-power-road-king/symbols/cosmic-engine-heart-bright-centered.webp' },
    { key: 'celestial-piston', label: 'Celestial Piston & Spark Plug', asset: 'assets/v8-power-road-king/symbols/celestial-piston-normal-centered.webp', winAsset: 'assets/v8-power-road-king/symbols/celestial-piston-bright-centered.webp' },
    { key: 'steampunk-v8-crown', label: 'Steampunk V8 Crown', asset: 'assets/v8-power-road-king/symbols/steampunk-v8-crown-normal-centered.webp', winAsset: 'assets/v8-power-road-king/symbols/steampunk-v8-crown-bright-centered.webp' },
    { key: 'cosmic-dust-jar', label: 'Cosmic Dust Jar', asset: 'assets/v8-power-road-king/symbols/cosmic-dust-jar-normal-centered.webp', winAsset: 'assets/v8-power-road-king/symbols/cosmic-dust-jar-bright-centered.webp' },
    { key: 'alchemists-gear-shard', label: 'Alchemist\'s Gear Shard', asset: 'assets/v8-power-road-king/symbols/alchemists-gear-shard-normal-centered.webp', winAsset: 'assets/v8-power-road-king/symbols/alchemists-gear-shard-bright-centered.webp' },
    { key: 'stargazers-lens', label: 'Stargazer\'s Lens', asset: 'assets/v8-power-road-king/symbols/stargazers-lens-normal-centered.webp', winAsset: 'assets/v8-power-road-king/symbols/stargazers-lens-bright-centered.webp' },
    { key: 'engraved-planchette', label: 'Engraved Planchette', asset: 'assets/v8-power-road-king/symbols/engraved-planchette-normal-centered.webp', winAsset: 'assets/v8-power-road-king/symbols/engraved-planchette-bright-centered.webp' },
    { key: 'letter-a', label: 'Letter A', asset: 'assets/v8-power-road-king/symbols/letter-a-normal-centered.webp', winAsset: 'assets/v8-power-road-king/symbols/letter-a-bright-centered.webp' },
    { key: 'letter-j', label: 'Letter J', asset: 'assets/v8-power-road-king/symbols/letter-j-normal-centered.webp', winAsset: 'assets/v8-power-road-king/symbols/letter-j-bright-centered.webp' },
    { key: 'letter-q', label: 'Letter Q', asset: 'assets/v8-power-road-king/symbols/letter-q-normal-centered.webp', winAsset: 'assets/v8-power-road-king/symbols/letter-q-bright-centered.webp' },
    { key: 'letter-t', label: 'Letter T', asset: 'assets/v8-power-road-king/symbols/letter-t-normal-centered.webp', winAsset: 'assets/v8-power-road-king/symbols/letter-t-bright-centered.webp' },
    { key: 'wild', label: 'WILD', asset: 'assets/v8-power-road-king/symbols/wild-centered.webp' },
    { key: 'scatter', label: 'SCATTER', asset: 'assets/v8-power-road-king/symbols/scatter-centered.webp' },
    { key: 'bonus', label: 'BONUS', asset: 'assets/v8-power-road-king/symbols/bonus-centered.webp' }
 ],visual:{symbolScale:.94,symbolScaleY:1,symbolFit:'cell-width'},
 defaults:{balance:1000,bet:25,jackpot:0,lines:20,minBet:25,maxBet:500,betStep:25,minLines:5,maxLines:20,lineStep:5,jackpotContributionRate:0,minimumJackpotContribution:0,bigWinBetMultiplier:10,lowWinBetMultiplier:3,freeSpins:0},
 specialSymbols:{wild:'wild',scatter:'scatter',bonus:'bonus',animatedWin:'cosmic-engine-heart'},
 rules:{targetRtpPercent:93, // temporary baseline math; pending user approval
 payoutScale:1.272758225647115,cols:5,rows:3,
    paylines: [
      [1,1,1,1,1], [0,0,0,0,0], [2,2,2,2,2], [0,1,2,1,0],
      [2,1,0,1,2], [0,0,1,2,2], [2,2,1,0,0], [1,0,0,0,1],
      [1,2,2,2,1], [1,0,1,0,1], [1,2,1,2,1], [0,1,1,1,0],
      [2,1,1,1,2], [0,1,0,1,0], [2,1,2,1,2], [1,1,0,1,1],
      [1,1,2,1,1], [0,0,2,0,0], [2,2,0,2,0], [0,2,0,2,0]
    ],
 lineColors:["#ffd166", "#4cc9f0", "#ef476f", "#a78bfa", "#06d6a0", "#fb8500", "#00b4d8", "#f72585", "#90be6d", "#f9c74f", "#43aa8b", "#577590", "#b5179e", "#e63946", "#52b788", "#ffbe0b", "#48cae4", "#c77dff", "#80ed99", "#ff6b6b"],symbolWeights:[75,75,75,85,85,85,85,87,86,86,86,40,25,25],weightTotal:1000,paytableCounts:[3,4,5],minimumMatch:3,specialMinimumMatch:3,
 paytable:{0:{3:82.53,4:150,5:300},1:{3:33.01,4:82.53,5:165.07},2:{3:33.01,4:82.53,5:165.07},3:{3:33.01,4:82.53,5:165.07},4:{3:33.01,4:82.53,5:165.07},5:{3:33.01,4:82.53,5:165.07},6:{3:33.01,4:82.53,5:165.07},7:{3:16.50,4:33.01,5:82.53},8:{3:16.50,4:33.01,5:82.53},9:{3:16.50,4:33.01,5:82.53},10:{3:16.50,4:33.01,5:82.53},11:{5:300},12:{3:.9,4:1.8,5:3.6},13:{3:0,4:0,5:0}},bonusFreeSpins:{3:3,4:5,5:8},paytableOrder:[7,8,9,10,3,4,5,6,1,2,0,11,12,13]},
 features:{allowFreeSpinRetrigger:false},ui:{name:'V8 Power Slots · Road King',numberLocale:'es-AR',scatterPaytableLabel:'{label} · APUESTA total',freeSpinsSuffix:'giros',paytableMultiplierSuffix:'×',announcementAlt:'Panel Road King',frameAlt:'Máscara V8 Power Slots Road King',bigWinAlt:'Premio grande provisional',lowWinAlt:'Premio provisional',paytableBrand:'V8 POWER SLOTS · ROAD KING',paytableTitle:'Tabla de premios',paytableSubtitle:'Multiplicador por línea · SCATTER por apuesta total',paytableSymbolHeader:'Símbolo',rulesTitle:'REGLAS',spinLabel:'Girar',menuLabel:'INFO',loadingLabel:'Cargando Road King',lowWinTitle:'¡PREMIO!',labels:{balance:'SALDO',bet:'APUESTA',lines:'LÍNEAS',win:'PREMIO',jackpot:'JACKPOT'},messages:{autoSpin:'AUTO',stopAutoSpin:'PARAR',stopAutoSpinOverlay:'PARAR AUTO',insufficientBalance:'SALDO INSUFICIENTE',bonusAward:'BONUS +{awarded} GIROS GRATIS\nRESTANTES: {remaining}',scatterAward:'SCATTER +${amount}\nPREMIO TOTAL: ${total}',prize:'PREMIO: ${amount}'},paytableRules:['• La apuesta total se reparte entre las líneas activas.','• Los premios cuentan de izquierda a derecha.','• WILD reemplaza cualquier símbolo.','• BONUS: 3, 4 o 5 símbolos dan 3, 5 u 8 giros gratis (regla provisional).','• RTP teórico objetivo: 93%; premios y pesos provisionales, a aprobar antes de publicar.']},colors:{accent:'#f7a23b',glow:'#ff5a22',highlight:'#c8edff',panel:'#101923',particlePalette:['#ff6b35','#ffc857','#d9f4ff','#8bc9ff','#d23a23','#fff0be'],lowWinParticlePalette:['#ffd34d','#fff0a8','#d89039','#fff'],winningTint:'#fff0bc'}};
})();
