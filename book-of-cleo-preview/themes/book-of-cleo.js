/* Book of the Cleo: independent visual theme for the shared slot engine.
   The Scatter image is a temporary Cleopatra placeholder, as requested. */
(() => {
  const A = 'assets/book-of-cleo/';
  const S = `${A}symbols/`;
  const paylines = [
    [1,1,1,1,1], [0,0,0,0,0], [2,2,2,2,2], [0,1,2,1,0], [2,1,0,1,2],
    [0,0,1,2,2], [2,2,1,0,0], [1,0,0,0,1], [1,2,2,2,1], [1,0,1,0,1],
    [1,2,1,2,1], [0,1,1,1,0], [2,1,1,1,2], [0,1,0,1,0], [2,1,2,1,2],
    [1,1,0,1,1], [1,1,2,1,1], [0,0,2,0,0], [2,2,0,2,0], [0,2,0,2,0],
    [1,0,1,1,2], [1,2,1,1,0], [0,0,1,1,2], [2,2,1,1,0], [2,1,0,0,1]
  ];
  const lineColors = Array.from({length:25}, (_,i) => `hsl(${(i*47+35)%360} 88% ${i%2?62:70}%)`);
  window.SLOT_GAME_CONFIG = {
    schemaVersion: 1,
    renderer: 'auto',
    id: 'book-of-cleo',
    assets: {
      frame: { portrait: `${A}gm-frame.webp?v=cleo-atlas-frame-1`, fallback: `${A}gm-frame.webp?v=cleo-atlas-frame-1` },
      loading: `${A}loading-bg.webp`,
      spin: { normal: `${S}bonus.webp`, pressed: `${S}bonus.webp` },
      indicators: { balance: `${A}gm-base.webp`, bet: `${A}gm-base.webp`, lines: `${A}gm-base.webp` },
      announcementFrame: `${A}gm-base.webp`,
      bigWin: `${A}big-win.svg`,
      lowWin: `${A}low-win.svg`,
      paytableFrame: `${A}panel.svg`,
      winFrames: [{ key: 'cleo-gold-glow', src: `${A}win-glow.svg?v=cleo-test-1` }]
    },
    symbols: [
      { key: 'h1', label: 'Faraona', asset: `${S}h1.webp` },
      { key: 'h2', label: 'Gato sagrado', asset: `${S}h2.webp` },
      { key: 'h3', label: 'Anj dorado', asset: `${S}h3.webp` },
      { key: 'h4', label: 'Escarabajo', asset: `${S}h4.webp` },
      { key: 'r1', label: 'A', asset: `${S}r1.webp` },
      { key: 'r2', label: 'K', asset: `${S}r2.webp` },
      { key: 'r3', label: 'Q', asset: `${S}r3.webp` },
      { key: 'r4', label: 'J', asset: `${S}r4.webp` },
      { key: 'r5', label: '10', asset: `${S}r5.webp` },
      { key: 'blue-book', label: 'Libro azul', asset: `${S}bluebook.webp` },
      { key: 'wild', label: 'Libro dorado · WILD', asset: `${S}goldbook-wild.webp` },
      { key: 'scatter', label: 'PIRÁMIDE · SCATTER (TEMPORAL)', asset: `${S}scatter-test.webp` },
      { key: 'bonus', label: 'Moneda · BONUS', asset: `${S}bonus.webp` }
    ],
    visual: {
      domSymbols: true,
      symbolScale: 0.87,
      symbolScaleY: 1,
      symbolFit: 'cell-width',
      winEffects: {
        'blue-book': { type: 'blue-lotus', when: 'line-win', color: '#50d8f0', highlight: '#e8fbff' },
        bonus: { type: 'gold-chest', when: 'bonus-awarded', color: '#ffcc50', highlight: '#fff4bb' }
      }
    },
    defaults: {
      balance: 10000, bet: 50, jackpot: 75420, lines: 25,
      minBet: 25, maxBet: 500, betStep: 25,
      minLines: 5, maxLines: 25, lineStep: 5,
      jackpotContributionRate: 0.1, minimumJackpotContribution: 1,
      bigWinBetMultiplier: 10, lowWinBetMultiplier: 0.000001, freeSpins: 0
    },
    specialSymbols: { wild: 'wild', scatter: 'scatter', bonus: 'bonus', animatedWin: 'blue-book' },
    features: {
      freeSpinTriggers: { wild: { 3: 10 }, scatter: { 3: 10 } },
      holdAndRing: { threshold: 6, cells: 15, respins: 3 },
      allowFreeSpinRetrigger: false
    },
    rules: {
      cols: 5, rows: 3, paylines, lineColors,
      symbolWeights: [70,75,80,85,100,100,105,110,110,45,40,20,60],
      weightTotal: 1000,
      freeSpinWeights: [65,70,75,80,92,92,98,102,102,75,90,25,34],
      paytableCounts: [3,4,5], minimumMatch: 3, specialMinimumMatch: 3,
      paytable: {
        0:{3:40,4:160,5:700}, 1:{3:32,4:130,5:560}, 2:{3:26,4:100,5:440}, 3:{3:22,4:84,5:360},
        4:{3:10,4:36,5:160}, 5:{3:10,4:36,5:160}, 6:{3:8,4:30,5:130}, 7:{3:8,4:30,5:130}, 8:{3:6,4:24,5:100},
        9:{3:36,4:150,5:600}, 10:{5:1000}, 11:{3:2,4:4,5:10}, 12:{3:0,4:0,5:0}
      },
      bonusFreeSpins: {}, paytableOrder: [0,1,2,3,9,4,5,6,7,8,10,11,12],
      freeSpinTriggers: { wild: { 3: 10 }, scatter: { 3: 10 } }
    },
    ui: {
      name: 'Book of the Cleo', numberLocale: 'es-AR',
      scatterPaytableLabel: '{label} · APUESTA total', freeSpinsSuffix: 'giros gratis', paytableMultiplierSuffix: '×',
      announcementAlt: 'Panel de Book of the Cleo', frameAlt: 'Marco egipcio de Book of the Cleo',
      bigWinAlt: 'Premio grande de Book of the Cleo', lowWinAlt: 'Premio de Book of the Cleo',
      paytableBrand: 'BOOK OF THE CLEO', paytableTitle: 'Tabla de premios',
      paytableSubtitle: 'Multiplicador por línea · Scatter por apuesta total',
      paytableSymbolHeader: 'Símbolo', rulesTitle: 'REGLAS', spinLabel: 'Girar', menuLabel: 'PREMIOS',
      loadingLabel: 'Cargando tesoros del Nilo', lowWinTitle: '¡PREMIO!',
      labels: { balance:'SALDO', bet:'APUESTA', lines:'LÍNEAS', win:'PREMIO', jackpot:'TESORO' },
      messages: {
        autoSpin:'AUTO', stopAutoSpin:'PARAR', stopAutoSpinOverlay:'PARAR AUTO',
        insufficientBalance:'SALDO INSUFICIENTE',
        bonusAward:'¡GIROS GRATIS! +{awarded}\nRESTANTES: {remaining}',
        scatterAward:'SCATTER +${amount}\nPREMIO TOTAL: ${total}',
        prize:'PREMIO: ${amount}'
      },
      paytableRules: [
        '• Hay 25 líneas de pago; elegí 5, 10, 15, 20 o 25.',
        '• El premio de línea cuenta de izquierda a derecha.',
        '• El WILD sustituye símbolos regulares.',
        '• 3 o más WILD o SCATTER activan giros gratis.',
        '• 6 o más BONUS activan Hold & Ring; la moneda 15 otorga el Grand Jackpot.',
        '• SCATTER temporal para probar la máscara.'
      ]
    },
    colors: {
      accent:'#f6d36f', glow:'#ffb72b', highlight:'#fff1b5', panel:'#211328',
      particlePalette:['#ffd54f','#fff1a8','#f3a43b','#54d9ef','#ffffff','#e4b876'],
      lowWinParticlePalette:['#ffd54f','#fff1a8','#f3a43b','#ffffff'], winningTint:'#fff5c7'
    }
  };
})();

(() => {
  const base='assets/book-of-cleo/audio/';
  const trackNames=[
    "ambient_free_end",
    "ambient_free_loop",
    "ambient_free_start",
    "ambient_hold_cash",
    "ambient_hold_end",
    "ambient_hold_loop",
    "ambient_hold_start",
    "ambient_loop",
    "blue_book_2",
    "blue_book_active",
    "blue_book_win",
    "book",
    "book_2",
    "boost",
    "boost_win",
    "button_auto",
    "button_bet",
    "button_spin",
    "character_click_1",
    "character_click_2",
    "character_click_3",
    "character_click_4",
    "coin_3",
    "coins_end",
    "coins_loop",
    "dynamite",
    "firework",
    "game_intro",
    "golden_symbol_2",
    "golden_symbol_stop",
    "golden_symbol_win",
    "hold_2",
    "hold_3",
    "hold_cash_2",
    "hold_reel_stop",
    "jackpot",
    "money",
    "mystery_stop",
    "mystery_win",
    "pop_up_symb",
    "reel_more",
    "reel_stop1",
    "reel_stop_bonus",
    "reel_stop_scatter",
    "sun",
    "wild_appear",
    "win_2",
    "win_coins",
    "win_symbol_01",
    "win_symbol_02",
    "win_symbol_03",
    "win_symbol_04",
    "win_symbol_05",
    "wins_lines01",
    "wins_wild"
  ];
  const tracks=Object.fromEntries(trackNames.map(name=>[name,new Audio(`${base}${name}.mp3`)]));
  const loopNames=new Set(['ambient_loop','ambient_free_loop','ambient_hold_loop','coins_loop']);
  Object.entries(tracks).forEach(([name,audio])=>{audio.preload='auto';audio.volume=loopNames.has(name) ? .18 : .54;});
  let activeLoop=null,activeSfx=null,audioReady=false,bgTimer=null,bgGeneration=0;
  const stopTrack=audio=>{if(!audio)return;audio.pause();try{audio.currentTime=0}catch{}};
  const play=(name,loop=false)=>{
    const audio=tracks[name];if(!audio)return;
    const isLoop=loop||loopNames.has(name);
    if(isLoop){if(activeLoop&&activeLoop!==audio)stopTrack(activeLoop);activeLoop=audio;audio.loop=true;audio.volume=.18;}
    else{if(activeSfx&&activeSfx!==audio)stopTrack(activeSfx);activeSfx=audio;audio.loop=false;audio.volume=.54;}
    try{audio.pause();audio.currentTime=0;audio.play().catch(()=>{})}catch{}
  };
  const pause=name=>{const audio=tracks[name];if(!audio)return;stopTrack(audio);if(activeLoop===audio)activeLoop=null;if(activeSfx===audio)activeSfx=null;};
  const switchBackground=(name,delay=0)=>{
    if(bgTimer)clearTimeout(bgTimer);const generation=++bgGeneration;
    if(activeLoop){stopTrack(activeLoop);activeLoop=null;}
    if(!name)return;
    bgTimer=window.setTimeout(()=>{if(generation===bgGeneration)play(name,true)},delay);
  };
  const randomPlay=names=>play(names[Math.floor(Math.random()*names.length)]);
  const unlock=()=>{if(audioReady)return;audioReady=true;switchBackground('ambient_loop',1100);};
  document.addEventListener('pointerdown',unlock,{once:true,passive:true});
  document.addEventListener('keydown',unlock,{once:true});
  document.querySelector('.cleo-title')?.addEventListener('click',()=>{unlock();randomPlay(['character_click_1','character_click_2','character_click_3','character_click_4']);});
  ['minus','plus','lineDown','lineUp'].forEach(id=>document.getElementById(id)?.addEventListener('click',()=>{unlock();play('button_bet')}));
  document.getElementById('autoSpin')?.addEventListener('click',()=>{unlock();play('button_auto')});
  document.getElementById('menu')?.addEventListener('click',()=>{unlock();play('pop_up_symb')});
  const symbolKey=index=>window.SLOT_GAME_CONFIG?.symbols?.[index]?.key;
  window.addEventListener('slot:spin-start',()=>{unlock();play('button_spin')});
  window.addEventListener('slot:reel-stop',event=>{
    const d=event.detail||{},keys=d.keys||[];
    if(keys.includes('scatter'))play('reel_stop_scatter');
    else if(keys.includes('bonus'))play('reel_stop_bonus');
    else if(keys.includes('wild'))play('wild_appear');
    else if(keys.includes('blue-book'))play('blue_book_2');
    else play(d.column>0?'reel_more':'reel_stop1');
  });
  window.addEventListener('slot:spin-result',event=>{
    const d=event.detail||{},keys=(d.values||[]).map(symbolKey),winning=(d.wins||[]).map(win=>symbolKey(win.symbol)),maxCount=Math.max(0,...(d.wins||[]).map(win=>win.count));
    if(Number(d.awarded)>0){play(keys.includes('blue-book')?'blue_book_active':'boost_win');switchBackground('ambient_free_loop',900);}
    else if(Number(d.bonusCount)>=6){play('dynamite');}
    else if(Number(d.totalWin)>0){
      let cue='win_2';
      if(Number(d.totalWin)>=Number(d.bet||50)*10)cue='win_coins';
      else if(Number(d.scatterCount)>=3)cue='mystery_win';
      else if(Number(d.wildCount)>0)cue='wins_wild';
      else if(winning.includes('blue-book'))cue='blue_book_win';
      else if(d.wins?.length)cue=`win_symbol_0${Math.min(5,Math.max(1,maxCount-2))}`;
      play(cue);
    }
    if(d.isFreeSpin&&Number(d.freeSpinsRemaining)===0){if(!Number(d.awarded)&&!Number(d.totalWin))play('ambient_free_end');switchBackground('ambient_loop',1800);}
  });
  window.addEventListener('slot:feature-start',()=>{switchBackground('ambient_hold_loop',700);play('book_2');});
  window.addEventListener('slot:feature-end',event=>{
    const d=event.detail||{};play(d.jackpot?'jackpot':'coins_end');
    switchBackground(Number(d.freeSpinsRemaining)>0?'ambient_free_loop':'ambient_loop',900);
  });
  window.addEventListener('slot:hold-respin',()=>play('hold_reel_stop'));
  window.addEventListener('slot:hold-hit',()=>play('hold_3'));
  const randomIndex=n=>{const limit=Math.floor(0x100000000/n)*n,a=new Uint32Array(1);do{crypto.getRandomValues(a)}while(a[0]>=limit);return a[0]%n;};
  const values=[1,2,3,4,5,8,10,15,20,25,50];
  const drawValue=()=>{
    const weights=[24,20,16,12,9,7,5,3,2,1,1];
    let t=randomIndex(weights.reduce((a,b)=>a+b,0));
    for(let i=0;i<weights.length;i++){if(t<weights[i])return values[i];t-=weights[i];}
    return 1;
  };
  const startHoldAndRing=({bonusPositions=[],bet=50,respins=3,cells=15}={})=>new Promise(resolve=>{
    const overlay=document.createElement('section'); overlay.className='cleo-hold-overlay'; overlay.setAttribute('role','dialog'); overlay.setAttribute('aria-modal','true');
    const valuesOnBoard=Array(cells).fill(null); bonusPositions.forEach(pos=>{if(pos<cells)valuesOnBoard[pos]=drawValue();});
    let tries=respins,locked=false,total=valuesOnBoard.reduce((sum,n)=>sum+(n||0),0);
    const paint=()=>{
      overlay.innerHTML=`<div class="cleo-hold-card"><p class="hold-kicker">BOOK OF THE CLEO</p><h2>HOLD &amp; RING</h2><p class="hold-copy">Juntá monedas en 3 respins. Cada acierto reinicia los respins.</p><div class="hold-status">RESPINS: <b>${tries}</b> · MONEDAS: <b>${valuesOnBoard.filter(v=>v!==null).length}/15</b></div><div class="hold-grid">${valuesOnBoard.map((v,i)=>`<div class="hold-cell ${v!==null?'is-held':''}">${v===null?'?':`<img src="assets/book-of-cleo/symbols/bonus.webp" alt=""><b>×${v}</b>`}</div>`).join('')}</div><div class="hold-total">TOTAL VIRTUAL: <b>${total}× APUESTA</b></div><button class="hold-spin" type="button" ${locked?'disabled':''}>RESPIN · ${tries}</button></div>`;
      const button=overlay.querySelector('.hold-spin');
      button?.addEventListener('click',()=>{
        if(locked||tries<=0)return; locked=true; button.disabled=true;
        window.dispatchEvent(new CustomEvent('slot:hold-respin'));
        let hits=0;
        for(let i=0;i<cells;i++)if(valuesOnBoard[i]===null&&randomIndex(100)<16){valuesOnBoard[i]=drawValue();total+=valuesOnBoard[i];hits++;}
        if(hits>0){window.dispatchEvent(new CustomEvent('slot:hold-hit',{detail:{hits}}));tries=respins;} else tries--;
        window.setTimeout(()=>{
          locked=false;
          if(tries<=0||valuesOnBoard.every(v=>v!==null)){
            const jackpot=valuesOnBoard.every(v=>v!==null); const amount=bet*(total+(jackpot?1000:0));
            overlay.innerHTML=`<div class="cleo-hold-card hold-finished"><p class="hold-kicker">${jackpot?'¡GRAN JACKPOT!':'TESOROS REUNIDOS'}</p><h2>${jackpot?'GRAND JACKPOT':'HOLD & RING'}</h2><p>MONEDAS: ${valuesOnBoard.filter(v=>v!==null).length}/15</p><div class="hold-total">PREMIO VIRTUAL: <b>$${Math.round(amount).toLocaleString('es-AR')}</b></div><button class="hold-spin" type="button">COBRAR Y SEGUIR</button></div>`;
            overlay.querySelector('.hold-spin')?.addEventListener('click',()=>{overlay.remove();resolve({amount,announcement:`HOLD & RING · PREMIO VIRTUAL: $${Math.round(amount).toLocaleString('es-AR')}`,jackpot});},{once:true});
          } else paint();
        },420);
      });
    };
    paint(); document.body.appendChild(overlay); overlay.focus?.();
  });
  window.SLOT_GAME_FEATURES={holdAndRing:startHoldAndRing};
})();
