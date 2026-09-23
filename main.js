const GAME_CONFIG=window.SLOT_GAME_CONFIG;
if(!GAME_CONFIG)throw new Error('Slot game configuration was not loaded');
const COLS=GAME_CONFIG.rules.cols,ROWS=GAME_CONFIG.rules.rows;
const SYMBOL_KEYS=GAME_CONFIG.symbols.map(symbol=>symbol.key);
const VISUAL_CONFIG=GAME_CONFIG.visual||{};
const SYMBOL_SCALE=VISUAL_CONFIG.symbolScale??.78;
const SYMBOL_SCALE_Y=VISUAL_CONFIG.symbolScaleY??1;
const SYMBOL_FIT=VISUAL_CONFIG.symbolFit||'short-side';
const WIN_EFFECTS=VISUAL_CONFIG.winEffects||{};
const WIN_FRAMES=GAME_CONFIG.assets.winFrames.map(frame=>frame.key);
const PAYLINES=GAME_CONFIG.rules.paylines,LINE_COLORS=GAME_CONFIG.rules.lineColors;
const SYMBOL_WEIGHTS=GAME_CONFIG.rules.symbolWeights,WEIGHT_TOTAL=GAME_CONFIG.rules.weightTotal;
const PAYTABLE=GAME_CONFIG.rules.paytable,BONUS_FREE_SPINS=GAME_CONFIG.rules.bonusFreeSpins;
const PAYTABLE_COUNTS=GAME_CONFIG.rules.paytableCounts, PAYTABLE_ORDER=GAME_CONFIG.rules.paytableOrder;
const MINIMUM_MATCH=GAME_CONFIG.rules.minimumMatch;
const SPECIAL_MINIMUM_MATCH=GAME_CONFIG.rules.specialMinimumMatch;
const MAX_PAYTABLE_MATCH=Math.max(...PAYTABLE_COUNTS);
const WILD_INDEX=SYMBOL_KEYS.indexOf(GAME_CONFIG.specialSymbols.wild);
const SCATTER_INDEX=SYMBOL_KEYS.indexOf(GAME_CONFIG.specialSymbols.scatter);
const BONUS_INDEX=SYMBOL_KEYS.indexOf(GAME_CONFIG.specialSymbols.bonus);
const ANIMATED_WIN_KEY=GAME_CONFIG.specialSymbols.animatedWin;
const UI=GAME_CONFIG.ui;
UI.labels=UI.labels||{balance:'BALANCE',bet:'BET',lines:'LINES',win:'WIN',jackpot:'JACKPOT'};
const gameMessage=(key,values={})=>Object.entries(values).reduce((text,[name,value])=>text.split(`{${name}}`).join(String(value)),UI.messages[key]||'');
if(SYMBOL_KEYS.length!==SYMBOL_WEIGHTS.length)throw new Error('Skin symbol weights do not match its symbols');
if(SYMBOL_WEIGHTS.reduce((sum,weight)=>sum+weight,0)!==WEIGHT_TOTAL)throw new Error('Skin symbol weights must add up to weightTotal');
if(PAYLINES.length<GAME_CONFIG.defaults.maxLines)throw new Error('Skin does not define enough paylines');
if(PAYLINES.some(path=>path.length!==COLS||path.some(row=>row<0||row>=ROWS)))throw new Error('Skin paylines do not match the reel grid');
if(!PAYTABLE_COUNTS.length||!WIN_FRAMES.length||WILD_INDEX<0||SCATTER_INDEX<0||BONUS_INDEX<0||!SYMBOL_KEYS.includes(ANIMATED_WIN_KEY))throw new Error('Skin symbols, paytable counts, and win animation are incomplete');
if(LINE_COLORS.length<PAYLINES.length)throw new Error('Skin needs one line color per payline');
const $=id=>document.getElementById(id);function setLoadingProgress(value){const pct=Math.max(0,Math.min(100,Math.round(value*100)));const bar=$('loadingBar'),label=$('loadingPercent');if(bar)bar.style.width=pct+'%';if(label)label.textContent=pct+'%'}function finishLoading(){setLoadingProgress(1);const screen=$('loadingScreen');if(screen){screen.classList.add('is-hidden');screen.setAttribute('aria-hidden','true');setTimeout(()=>{screen.style.display='none'},500)}}let balance=GAME_CONFIG.defaults.balance,bet=GAME_CONFIG.defaults.bet,jackpot=GAME_CONFIG.defaults.jackpot,lines=GAME_CONFIG.defaults.lines,spinning=false,scene,resultLock=false,freeSpins=GAME_CONFIG.defaults.freeSpins||0,pendingAnnouncement="",autoFreeTimer=null,autoSpin=false,autoSpinTimer=null,freeSpinsAuto=false;
function formatNumber(value){return Number(value).toLocaleString(UI.numberLocale||'de-DE')}
function setAnnouncement(text){const box=$('announcementText');if(box){box.textContent=text;box.classList.toggle('announcement-pulse',Boolean(text))}}
function scheduleNextSpin(){if(autoFreeTimer)clearTimeout(autoFreeTimer);if(resultLock||spinning)return;if(freeSpins>0){autoFreeTimer=setTimeout(()=>{autoFreeTimer=null;scene?.spin()},1200);return}freeSpinsAuto=false;if(autoSpin){if(balance<bet){autoSpin=false;const button=$("autoSpin");button?.classList.remove("is-active");button?.setAttribute("aria-pressed","false");if(button)button.textContent=UI.messages.autoSpin;return}autoSpinTimer=setTimeout(()=>{autoSpinTimer=null;if(autoSpin&&balance>=bet)scene?.spin()},1200)}}
function syncAutoStopOverlay(){const button=$('autoStopOverlay'),awardOpen=document.querySelector('.bigwin-screen.open,.lowwin-screen.open');if(button)button.classList.toggle('is-visible',Boolean(autoSpin&&awardOpen))}
function stopAutoSpin(){autoSpin=false;if(autoSpinTimer){clearTimeout(autoSpinTimer);autoSpinTimer=null}const button=$('autoSpin');button?.classList.remove('is-active');button?.setAttribute('aria-pressed','false');if(button)button.textContent=UI.messages.autoSpin;syncAutoStopOverlay()}
function closeAward(screen){screen.classList.remove('open');screen.setAttribute('aria-hidden','true');resultLock=false;setAnnouncement(pendingAnnouncement);syncAutoStopOverlay();scheduleNextSpin()}
function fitBalanceValue(){const value=$('balance'),box=value?.closest('.control-box');if(!value||!box)return;value.style.fontSize='';let size=parseFloat(getComputedStyle(value).fontSize)||16;const min=8;for(let i=0;i<24&&value.scrollWidth>box.clientWidth-4&&size>min;i++){size-=.5;value.style.fontSize=size+'px'}}function setText(){$('balance').textContent=formatNumber(balance);$('bet').textContent=formatNumber(bet);$('lines').textContent=formatNumber(lines);$('jackpot').textContent=formatNumber(jackpot);requestAnimationFrame(fitBalanceValue)}
let bigWinTimer=null;function showBigWin(amount){const screen=$('bigWinScreen'),number=$('bigWinNumber'),particles=$('bigWinParticles'),card=screen?.querySelector('.bigwin-card');if(!screen||!number)return;if(bigWinTimer)clearTimeout(bigWinTimer);if(particles){particles.innerHTML='';const colors=GAME_CONFIG.colors.particlePalette;for(let i=0;i<70;i++){const p=document.createElement('span');p.className='bigwin-particle';p.style.left='50%';p.style.top='50%';p.style.color=colors[i%colors.length];p.style.background=colors[i%colors.length];p.style.setProperty('--dx',((Math.random()-.5)*120)+'vw');p.style.setProperty('--dy',((Math.random()-.5)*120)+'vh');p.style.animationDelay=(Math.random()*1.2)+'s';particles.appendChild(p)}}screen.classList.remove('open');screen.onpointerdown=()=>closeAward(screen);if(card){card.style.animation='none';card.style.opacity='0';card.style.transform='scale(.08)'}void screen.offsetWidth;screen.classList.add('open');screen.setAttribute('aria-hidden','false');syncAutoStopOverlay();if(card)requestAnimationFrame(()=>{card.style.transition='transform 2.8s cubic-bezier(.16,1,.3,1),opacity 1.2s ease';card.style.opacity='1';card.style.transform='scale(1)' });number.textContent='0';const start=performance.now()+1800,duration=7200;const count=now=>{const progress=Math.max(0,Math.min(1,(now-start)/duration));const eased=1-Math.pow(1-progress,3);number.textContent=formatNumber(Math.floor(amount*eased));if(progress<1)requestAnimationFrame(count);else{number.textContent=formatNumber(amount);if(freeSpins>0||freeSpinsAuto)bigWinTimer=setTimeout(()=>closeAward(screen),1800);else bigWinTimer=null}};requestAnimationFrame(count)}
function showLowWin(amount){const screen=$('lowWinScreen'),number=$('lowWinNumber'),particles=$('lowWinParticles');if(!screen||!number)return;if(particles){particles.innerHTML='';const colors=GAME_CONFIG.colors.lowWinParticlePalette;for(let i=0;i<42;i++){const p=document.createElement('span');p.className='lowwin-particle';p.style.setProperty('--x',(10+Math.random()*80)+'vw');p.style.setProperty('--y',(10+Math.random()*80)+'vh');p.style.background=colors[i%colors.length];particles.appendChild(p)}}screen.classList.remove('open');void screen.offsetWidth;screen.classList.add('open');screen.setAttribute('aria-hidden','false');syncAutoStopOverlay();screen.onpointerdown=()=>closeAward(screen);number.textContent='0';const start=performance.now()+450,duration=2600;const count=now=>{const progress=Math.max(0,Math.min(1,(now-start)/duration));number.textContent=formatNumber(Math.floor(amount*(1-Math.pow(1-progress,3))));if(progress<1)requestAnimationFrame(count);else{number.textContent=formatNumber(amount);if(freeSpins>0||freeSpinsAuto)setTimeout(()=>closeAward(screen),1200)}};requestAnimationFrame(count)}

let dotCount=0;const dotsTimer=setInterval(()=>{const dots=$('loadingDots');if(!dots)return;dotCount=(dotCount+1)%4;dots.textContent='.'.repeat(dotCount||1)},420);
function rand(){const limit=Math.floor(0x100000000/WEIGHT_TOTAL)*WEIGHT_TOTAL,a=new Uint32Array(1);do{crypto.getRandomValues(a)}while(a[0]>=limit);let ticket=a[0]%WEIGHT_TOTAL;for(let i=0;i<SYMBOL_WEIGHTS.length;i++){if(ticket<SYMBOL_WEIGHTS[i])return i;ticket-=SYMBOL_WEIGHTS[i]}return SYMBOL_WEIGHTS.length-1}
function evaluateWins(values){const wins=[],lineStake=bet/lines;PAYLINES.slice(0,lines).forEach((path,line)=>{const ids=path.map((row,col)=>values[col+row*COLS]);const base=ids.find(id=>id!==WILD_INDEX);const symbol=base===undefined?WILD_INDEX:base;if(symbol===SCATTER_INDEX||symbol===BONUS_INDEX||!PAYTABLE[symbol])return;let count=0;for(const id of ids){if(id===symbol||id===WILD_INDEX)count++;else break}if(count>=MINIMUM_MATCH&&PAYTABLE[symbol][count]!==undefined)wins.push({line,count,symbol,amount:lineStake*PAYTABLE[symbol][count],positions:path.slice(0,count).map((row,col)=>col+row*COLS)})});return wins.sort((a,b)=>b.amount-a.amount)}
function getBonusAward(count){const thresholds=Object.keys(BONUS_FREE_SPINS).map(Number).sort((a,b)=>a-b);for(let i=thresholds.length-1;i>=0;i--)if(count>=thresholds[i])return BONUS_FREE_SPINS[thresholds[i]];return 0}
function evaluateSpecial(values,symbol){const positions=[];values.forEach((id,index)=>{if(id===symbol)positions.push(index)});const count=positions.length;return count>=SPECIAL_MINIMUM_MATCH&&PAYTABLE[symbol]?.[Math.min(count,MAX_PAYTABLE_MATCH)]!==undefined?{symbol,count,amount:bet*PAYTABLE[symbol][Math.min(count,MAX_PAYTABLE_MATCH)],positions}:null}
class SlotScene extends Phaser.Scene{
 constructor(){super('SlotScene');this.symbols=[];this.overlays=[];this.fx=[];this.grid=[];this.payline=null;this.spinId=0;this.lastLayout={w:0,h:0}}
 preload(){setLoadingProgress(0);this.load.on('progress',value=>setLoadingProgress(value));this.load.once('complete',()=>setLoadingProgress(1));GAME_CONFIG.symbols.forEach(symbol=>this.load.image(symbol.key,symbol.asset));GAME_CONFIG.assets.winFrames.forEach(frame=>this.load.image(frame.key,frame.src))}
 create(){scene=this;this.makeGrid();setLoadingProgress(1);requestAnimationFrame(()=>setTimeout(finishLoading,220));this.scale.on('resize',()=>this.layout());this.layout();this.events.on('shutdown',()=>this.clearPayline())}
 makeGrid(){for(let i=0;i<COLS*ROWS;i++){const t=this.add.image(0,0,SYMBOL_KEYS[rand()]).setOrigin(.5);const glow=this.add.graphics();glow.fillStyle(Phaser.Display.Color.HexStringToColor(GAME_CONFIG.colors.glow).color,.42);glow.fillCircle(0,0,58);glow.setVisible(false);const overlay=this.add.image(0,0,WIN_FRAMES[0]).setOrigin(.5).setAlpha(0);this.symbols.push(t);this.fx.push(glow);this.overlays.push(overlay);this.grid.push(rand())}}
 layout(){const w=this.scale.width,h=this.scale.height;this.lastLayout={w,h};this.symbols.forEach((t,i)=>{const cellW=w/COLS,cellH=h/ROWS,x=((i%COLS)+.5)*cellW,y=(Math.floor(i/COLS)+.5)*cellH,size=Math.min(cellW,cellH)*SYMBOL_SCALE;t.x=x;t.y=y;const symbolScale=SYMBOL_FIT==='cell-width'?Math.min(cellW*SYMBOL_SCALE/t.width,cellH*SYMBOL_SCALE/t.height):Math.min(size/t.width,size/t.height);t.setScale(symbolScale,symbolScale*SYMBOL_SCALE_Y);this.fx[i].setPosition(x,y);const o=this.overlays[i];o.setPosition(x,y);const overlayScale=Math.min(size*1.22/o.width,size*.9/o.height);o.setScale(overlayScale,overlayScale*SYMBOL_SCALE_Y)})}
 baseY(index){return (Math.floor(index/COLS)+.5)*this.scale.height/ROWS}
 animateWinSymbol(i,effect=null){
  const glow=this.fx[i],symbol=this.symbols[i],accent=effect?.color||GAME_CONFIG.colors.accent;
  const color=Phaser.Display.Color.HexStringToColor(accent).color;
  this.tweens.killTweensOf(glow);this.tweens.killTweensOf(symbol);
  if(effect){glow.clear();glow.fillStyle(color,.5);glow.fillCircle(0,0,effect.type==='gold-chest'?70:58)}
  glow.setVisible(true).setAlpha(.25).setScale(.6);symbol.setTint(color);
  this.tweens.add({targets:glow,alpha:.95,scale:1.45,duration:260,yoyo:true,repeat:3,ease:'Sine.easeInOut',onComplete:()=>{glow.setVisible(false);symbol.clearTint()}});
  this.tweens.add({targets:symbol,alpha:.55,duration:260,yoyo:true,repeat:3,ease:'Sine.easeInOut'});
  if(effect?.type==='gold-chest')this.animateGoldChest(i,effect);
  if(effect?.type==='blue-lotus')this.animateBlueLotus(i,effect);
}
animateGoldChest(i,effect){
  const symbol=this.symbols[i],cell=Math.min(this.scale.width/COLS,this.scale.height/ROWS);
  const gold=Phaser.Display.Color.HexStringToColor(effect.color||'#f4c96b').color;
  const shine=Phaser.Display.Color.HexStringToColor(effect.highlight||'#fff1ad').color;
  const g=this.add.graphics().setDepth(30),x=symbol.x,y=symbol.y;
  g.lineStyle(3,gold,.82);g.strokeCircle(x,y,cell*.76);
  g.lineStyle(1.6,shine,.78);g.strokeCircle(x,y,cell*1.02);
  for(let n=0;n<16;n++){
    const a=(Math.PI*2*n)/16,inner=cell*.48,outer=cell*(.85+.16*Math.sin(n*1.7));
    g.lineStyle(n%2?1.8:2.8,n%2?gold:shine,n%2?.68:.92);
    g.beginPath();g.moveTo(x+Math.cos(a)*inner,y+Math.sin(a)*inner);g.lineTo(x+Math.cos(a)*outer,y+Math.sin(a)*outer);g.strokePath();
    if(n%2===0){g.fillStyle(shine,.95);g.fillCircle(x+Math.cos(a)*(outer+cell*.09),y+Math.sin(a)*(outer+cell*.09),cell*.075)}
  }
  g.fillStyle(gold,.11);g.fillRect(x-cell*.36,y-cell*.36,cell*.72,cell*.72);
  this.tweens.add({targets:g,alpha:.18,duration:190,yoyo:true,repeat:4,ease:'Sine.easeInOut',onComplete:()=>g.destroy()});
}
animateBlueLotus(i,effect){
  const symbol=this.symbols[i],cell=Math.min(this.scale.width/COLS,this.scale.height/ROWS);
  const blue=Phaser.Display.Color.HexStringToColor(effect.color||'#38bdf8').color;
  const ice=Phaser.Display.Color.HexStringToColor(effect.highlight||'#e0f7ff').color;
  const g=this.add.graphics().setDepth(31),x=symbol.x,y=symbol.y;
  g.lineStyle(3,blue,.84);g.strokeCircle(x,y,cell*.77);
  g.lineStyle(1.4,ice,.82);g.strokeCircle(x,y,cell*1.01);
  g.fillStyle(blue,.13);g.fillCircle(x,y,cell*.5);
  const targets=this.symbols.map((target,index)=>({target,index,d:Math.hypot(target.x-x,target.y-y)})).filter(q=>q.index!==i).sort((a,b)=>a.d-b.d).slice(0,5);
  const bolt=(target,width,color,alpha)=>{
    const points=[{x,y}];
    for(let step=1;step<5;step++){
      const t=step/5,jitter=(Math.random()-.5)*cell*.55;
      points.push({x:x+(target.x-x)*t+Math.cos(t*8+step)*jitter,y:y+(target.y-y)*t+Math.sin(t*7+step)*jitter});
    }
    points.push({x:target.x,y:target.y});
    g.lineStyle(width,color,alpha);g.beginPath();g.moveTo(points[0].x,points[0].y);points.slice(1).forEach(p=>g.lineTo(p.x,p.y));g.strokePath();
  };
  targets.forEach(({target})=>{
    bolt(target,3.2,blue,.9);bolt(target,1.25,ice,.96);
    g.fillStyle(ice,.95);g.fillCircle(target.x,target.y,cell*.09);
    g.lineStyle(1.8,blue,.78);g.strokeCircle(target.x,target.y,cell*.23);
  });
  this.tweens.add({targets:g,alpha:.12,duration:115,yoyo:true,repeat:6,ease:'Sine.easeInOut',onComplete:()=>g.destroy()});
}
 clearPayline(){if(this.payline){this.payline.destroy();this.payline=null}}
 showPaylines(wins){this.clearPayline();if(!wins.length)return;const g=this.add.graphics();const w=this.scale.width,h=this.scale.height;wins.forEach((win,n)=>{const color=Phaser.Display.Color.HexStringToColor(LINE_COLORS[win.line%LINE_COLORS.length]).color;const p=PAYLINES[win.line],pts=p.map((r,c)=>({x:(c+.5)*w/COLS,y:(r+.5)*h/ROWS}));g.lineStyle(10,color,.48);g.beginPath();g.moveTo(pts[0].x,pts[0].y);pts.slice(1).forEach(q=>g.lineTo(q.x,q.y));g.strokePath();g.lineStyle(2.5,0xffffff,.9);g.beginPath();g.moveTo(pts[0].x,pts[0].y);pts.slice(1).forEach(q=>g.lineTo(q.x,q.y));g.strokePath();});this.payline=g;this.time.delayedCall(2600,()=>this.clearPayline())}
 spin(){
  if(spinning||resultLock||(!freeSpins&&balance<bet))return;
  spinning=true;setAnnouncement('');if(freeSpins>0)freeSpins--;else balance-=bet;jackpot+=Math.max(GAME_CONFIG.defaults.minimumJackpotContribution,Math.floor(bet*GAME_CONFIG.defaults.jackpotContributionRate));setText();this.clearPayline();
  const id=++this.spinId,stopped=Array(COLS).fill(false),values=Array(COLS*ROWS).fill(0),started=performance.now();let lastCycle=-1,finished=false;
  this.symbols.forEach(t=>{t.setTint(0xffffff);this.tweens.killTweensOf(t);t.alpha=1});
  this.overlays.forEach(t=>{t.setAlpha(0);t.setVisible(false)});this.fx.forEach(t=>{t.setVisible(false);t.setAlpha(0)});
  const stopColumn=col=>{if(stopped[col]||id!==this.spinId)return;stopped[col]=true;for(let r=0;r<ROWS;r++){const index=col+r*COLS;values[index]=rand();this.symbols[index].setTexture(SYMBOL_KEYS[values[index]]);this.tweens.killTweensOf(this.symbols[index]);this.symbols[index].y=this.baseY(index);this.symbols[index].alpha=1}};
  let interval=null,fallback=null;
  const finishSpin=()=>{if(finished||id!==this.spinId)return;finished=true;if(interval)window.clearInterval(interval);if(fallback)window.clearTimeout(fallback);for(let c=0;c<COLS;c++)stopColumn(c);for(let i=0;i<COLS*ROWS;i++){this.tweens.killTweensOf(this.symbols[i]);this.symbols[i].y=this.baseY(i);this.symbols[i].alpha=1}this.grid=values.slice();spinning=false;const wins=evaluateWins(values),scatterWin=evaluateSpecial(values,SCATTER_INDEX),bonusPositions=[],bonusCount=values.reduce((n,id,index)=>{if(id===BONUS_INDEX)bonusPositions.push(index);return n+(id===BONUS_INDEX?1:0)},0),awarded=getBonusAward(bonusCount),lineTotal=wins.reduce((sum,win)=>sum+win.amount,0),specialTotal=scatterWin?scatterWin.amount:0,totalWin=lineTotal+specialTotal;if(totalWin>0)balance+=totalWin;$('win').textContent=formatNumber(totalWin);if(awarded){freeSpinsAuto=true;freeSpins+=awarded;pendingAnnouncement=gameMessage('bonusAward',{awarded,remaining:freeSpins})+(totalWin>0?`\n${gameMessage('prize',{amount:formatNumber(totalWin)})}`:'')}else if(scatterWin&&lineTotal===0)pendingAnnouncement=gameMessage('scatterAward',{amount:formatNumber(specialTotal),total:formatNumber(totalWin)});else if(totalWin>0)pendingAnnouncement=gameMessage('prize',{amount:formatNumber(totalWin)});else pendingAnnouncement='';const positions=wins.flatMap(win=>win.positions).concat(scatterWin?scatterWin.positions:[],bonusPositions).filter((index,position,array)=>array.indexOf(index)===position);positions.forEach(index=>{
  const key=SYMBOL_KEYS[values[index]],effect=WIN_EFFECTS[key],lineWin=wins.some(win=>win.positions.includes(index));
  const specialWin=key===SYMBOL_KEYS[BONUS_INDEX]?awarded>0&&bonusPositions.includes(index):key===SYMBOL_KEYS[SCATTER_INDEX]?Boolean(scatterWin&&scatterWin.positions.includes(index)):false;
  const shouldAnimate=effect&&(effect.when==='bonus-awarded'?specialWin:effect.when==='line-win'?lineWin:(lineWin||specialWin));
  this.symbols[index].setTint(Phaser.Display.Color.HexStringToColor(GAME_CONFIG.colors.winningTint).color);
  if(key===ANIMATED_WIN_KEY||shouldAnimate)this.animateWinSymbol(index,shouldAnimate?effect:null);
});if(totalWin>0||awarded){resultLock=true;setTimeout(()=>this.showPaylines(wins),450);setTimeout(()=>{if(totalWin>=bet*GAME_CONFIG.defaults.bigWinBetMultiplier)showBigWin(totalWin);else if(totalWin>=bet*GAME_CONFIG.defaults.lowWinBetMultiplier)showLowWin(totalWin);else{resultLock=false;setAnnouncement(pendingAnnouncement);scheduleNextSpin()}},1050)}else setAnnouncement('');setText();scheduleNextSpin()};
  const tick=()=>{if(id!==this.spinId||finished)return;const elapsed=performance.now()-started;for(let c=0;c<COLS;c++)if(!stopped[c]&&elapsed>=850+c*300)stopColumn(c);const cycle=Math.floor(elapsed/75);if(cycle!==lastCycle){lastCycle=cycle;for(let c=0;c<COLS;c++)if(!stopped[c])for(let r=0;r<ROWS;r++){const index=c+r*COLS;values[index]=rand();this.symbols[index].setTexture(SYMBOL_KEYS[values[index]])}}for(let c=0;c<COLS;c++)if(!stopped[c])for(let r=0;r<ROWS;r++){const index=c+r*COLS,cell=this.scale.height/ROWS,phase=(elapsed*1.35+r*cell/2)%cell;this.symbols[index].y=this.baseY(index)+phase-cell/2}if(stopped.every(Boolean))finishSpin()};
  interval=window.setInterval(tick,35);fallback=window.setTimeout(finishSpin,3400);tick();
 }
}
function applyGameSkin(){
 const cfg=GAME_CONFIG,assets=cfg.assets,ui=cfg.ui,root=document.documentElement;
 root.dataset.skin=cfg.id;
 root.style.setProperty('--skin-accent',cfg.colors.accent);
 root.style.setProperty('--skin-glow',cfg.colors.glow);
 root.style.setProperty('--skin-highlight',cfg.colors.highlight);
 root.style.setProperty('--skin-panel',cfg.colors.panel);
 document.title=ui.name;
 const setAttr=(selector,attr,value)=>{const el=document.querySelector(selector);if(el&&value!==undefined)el.setAttribute(attr,value)};
 setAttr('.frame source','srcset',assets.frame.portrait);
 setAttr('.frame img','src',assets.frame.fallback);
 setAttr('.frame img','alt',ui.frameAlt);
 setAttr('.loading-art','src',assets.loading);
 setAttr('.loading-art','alt',ui.name);
 setAttr('.spin-art-normal','src',assets.spin.normal);
 setAttr('.spin-art-pressed','src',assets.spin.pressed);
 setAttr('.bet-bar','src',assets.indicators.bet);
 setAttr('.balance-bar','src',assets.indicators.balance);
 setAttr('.lines-bar','src',assets.indicators.lines);
 setAttr('.announcement-panel img','src',assets.announcementFrame);
 setAttr('.announcement-panel img','alt',ui.announcementAlt);
 setAttr('.bigwin-art','src',assets.bigWin);
 setAttr('.lowwin-card img','src',assets.lowWin);
 setAttr('.bigwin-art','alt',ui.bigWinAlt||'');
 setAttr('.lowwin-card img','alt',ui.lowWinAlt||'');
 const paytable=document.querySelector('.paytable-card');
 if(paytable)paytable.style.setProperty('background-image',`url("${assets.paytableFrame}")`,'important');
 const text=(selector,value)=>{const el=document.querySelector(selector);if(el&&value!==undefined)el.textContent=value};
 text('.paytable-brand',ui.paytableBrand);
 text('.paytable-card h2',ui.paytableTitle);
 text('.paytable-subtitle',ui.paytableSubtitle);
 text('.paytable-rules b',ui.rulesTitle);
 text('#loadingMessage',ui.loadingLabel);
 text('.lowwin-title',ui.lowWinTitle);
 text('.display.balance .label',ui.labels.balance);
 text('.display.bet .label',ui.labels.bet);
 text('.display.lines .label',ui.labels.lines);
 text('.display.win .label',ui.labels.win);
 text('#jackpotLabel',ui.labels.jackpot);
 text('#autoSpin',ui.messages.autoSpin);
 text('#autoStopOverlay',ui.messages.stopAutoSpinOverlay);
 text('#menu',ui.menuLabel);
 setAttr('#spin','aria-label',ui.spinLabel);
 const head=document.querySelector('#paytableModal thead tr');
 if(head){head.replaceChildren();const symbolHead=document.createElement('th');symbolHead.textContent=ui.paytableSymbolHeader;head.appendChild(symbolHead);PAYTABLE_COUNTS.forEach(count=>{const th=document.createElement('th');th.textContent=String(count);head.appendChild(th)})}
 const rules=document.querySelector('.paytable-rules');
 if(rules){const heading=rules.querySelector('b');rules.replaceChildren();if(heading)rules.appendChild(heading);ui.paytableRules.forEach(rule=>{const row=document.createElement('span');row.textContent=rule;rules.appendChild(row)})}
}
function buildPaytable(){
 const body=$('paytableRows'),symbols=GAME_CONFIG.symbols;
 if(!body)return;
 body.replaceChildren(...PAYTABLE_ORDER.map(index=>{
  const symbol=symbols[index],paytable=PAYTABLE[index],row=document.createElement('tr'),identity=document.createElement('td'),image=document.createElement('img'),label=document.createElement('span');
  image.className='pay-symbol';image.src=symbol.asset;image.alt=symbol.label;
  label.textContent=index===SCATTER_INDEX?UI.scatterPaytableLabel.replace('{label}',symbol.label):symbol.label;
  identity.append(image,label);row.appendChild(identity);
  PAYTABLE_COUNTS.forEach(count=>{const cell=document.createElement('td');if(index===BONUS_INDEX)cell.textContent=BONUS_FREE_SPINS[count]===undefined?'—':`${BONUS_FREE_SPINS[count]} ${UI.freeSpinsSuffix}`;else cell.textContent=paytable?.[count]===undefined?'—':`${paytable[count]}${UI.paytableMultiplierSuffix}`;row.appendChild(cell)});
  return row;
 }));
}
applyGameSkin();
const config={type:Phaser.AUTO,parent:'reels',backgroundColor:'rgba(0,0,0,0)',transparent:true,render:{antialias:true,powerPreference:'high-performance'},scale:{mode:Phaser.Scale.RESIZE,width:'100%',height:'100%'},scene:SlotScene};new Phaser.Game(config);$('spin').onclick=()=>scene?.spin();$('autoSpin').onclick=()=>{if(autoSpin)stopAutoSpin();else{if(!freeSpins&&balance<bet){setAnnouncement(gameMessage('insufficientBalance'));return}autoSpin=true;if(autoSpinTimer){clearTimeout(autoSpinTimer);autoSpinTimer=null}const button=$('autoSpin');button.classList.add('is-active');button.setAttribute('aria-pressed','true');button.textContent=UI.messages.stopAutoSpin;syncAutoStopOverlay();if(!spinning&&!resultLock)scene?.spin()}};$('autoStopOverlay').onclick=stopAutoSpin;$('plus').onclick=()=>{bet=Math.min(GAME_CONFIG.defaults.maxBet,bet+GAME_CONFIG.defaults.betStep);setText()};$('minus').onclick=()=>{bet=Math.max(GAME_CONFIG.defaults.minBet,bet-GAME_CONFIG.defaults.betStep);setText()};document.querySelector('.bet').onclick=()=>{bet=bet>=GAME_CONFIG.defaults.maxBet?GAME_CONFIG.defaults.minBet:bet+GAME_CONFIG.defaults.betStep;setText()};$('lineUp').onclick=()=>{lines=Math.min(GAME_CONFIG.defaults.maxLines,lines+GAME_CONFIG.defaults.lineStep);setText()};$('lineDown').onclick=()=>{lines=Math.max(GAME_CONFIG.defaults.minLines,lines-GAME_CONFIG.defaults.lineStep);setText()};document.querySelector('.lines').onclick=()=>{setText()};const paytableModal=$('paytableModal');const paytableRows=$('paytableRows');buildPaytable();$('menu').onclick=()=>{paytableModal.classList.add('open');paytableModal.setAttribute('aria-hidden','false')};$('closePaytable').onclick=()=>{paytableModal.classList.remove('open');paytableModal.setAttribute('aria-hidden','true')};paytableModal.onclick=e=>{if(e.target===paytableModal)$('closePaytable').click()};setText();




















