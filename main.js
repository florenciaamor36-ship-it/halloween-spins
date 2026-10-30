const GAME_CONFIG=window.SLOT_GAME_CONFIG;
if(!GAME_CONFIG)throw new Error('Slot game configuration was not loaded');
const FEATURE_CONFIG=GAME_CONFIG.features||{};
const COLS=GAME_CONFIG.rules.cols,ROWS=GAME_CONFIG.rules.rows;
const SYMBOL_KEYS=GAME_CONFIG.symbols.map(symbol=>symbol.key);
const VISUAL_CONFIG=GAME_CONFIG.visual||{};const DUENDE_SLOT=GAME_CONFIG.id==='duendesitas-fortuna';
const SYMBOL_SCALE=VISUAL_CONFIG.symbolScale??.78;
const SYMBOL_SCALE_Y=VISUAL_CONFIG.symbolScaleY??1;
const SYMBOL_FIT=VISUAL_CONFIG.symbolFit||'short-side';
const WIN_EFFECTS=VISUAL_CONFIG.winEffects||{};
const WIN_FRAMES=GAME_CONFIG.assets.winFrames.map(frame=>frame.key);
const PAYLINES=GAME_CONFIG.rules.paylines,LINE_COLORS=GAME_CONFIG.rules.lineColors;
const SYMBOL_WEIGHTS=GAME_CONFIG.rules.symbolWeights,WEIGHT_TOTAL=GAME_CONFIG.rules.weightTotal;
const PAYTABLE=GAME_CONFIG.rules.paytable,BONUS_FREE_SPINS=GAME_CONFIG.rules.bonusFreeSpins;
const PAYOUT_SCALE=Number(GAME_CONFIG.rules.payoutScale??1);
const PAYTABLE_COUNTS=GAME_CONFIG.rules.paytableCounts, PAYTABLE_ORDER=GAME_CONFIG.rules.paytableOrder;
const MINIMUM_MATCH=GAME_CONFIG.rules.minimumMatch;
const SPECIAL_MINIMUM_MATCH=GAME_CONFIG.rules.specialMinimumMatch;
const MAX_PAYTABLE_MATCH=Math.max(...PAYTABLE_COUNTS);
const WILD_INDEX=SYMBOL_KEYS.indexOf(GAME_CONFIG.specialSymbols.wild);
const SCATTER_KEYS=DUENDE_SLOT?[]:(Array.isArray(GAME_CONFIG.specialSymbols.scatters)?GAME_CONFIG.specialSymbols.scatters:[GAME_CONFIG.specialSymbols.scatter]);
const SCATTER_INDICES=SCATTER_KEYS.map(key=>SYMBOL_KEYS.indexOf(key)).filter(index=>index>=0);
const SCATTER_INDEX=SCATTER_INDICES[0]??-1;
const BONUS_INDEX=SYMBOL_KEYS.indexOf(GAME_CONFIG.specialSymbols.bonus);
const ANIMATED_WIN_KEY=GAME_CONFIG.specialSymbols.animatedWin;
const UI=GAME_CONFIG.ui;
UI.labels=UI.labels||{balance:'BALANCE',bet:'BET',lines:'LINES',win:'WIN',jackpot:'JACKPOT'};
const gameMessage=(key,values={})=>Object.entries(values).reduce((text,[name,value])=>text.split(`{${name}}`).join(String(value)),UI.messages[key]||'');
const emitSlotEvent=(name,detail={})=>window.dispatchEvent(new CustomEvent(`slot:${name}`,{detail}));
if(!Number.isFinite(PAYOUT_SCALE)||PAYOUT_SCALE<=0)throw new Error('Skin payout scale must be finite and positive');
if(SYMBOL_KEYS.length!==SYMBOL_WEIGHTS.length)throw new Error('Skin symbol weights do not match its symbols');
if(GAME_CONFIG.rules.freeSpinWeights&&(GAME_CONFIG.rules.freeSpinWeights.length!==SYMBOL_KEYS.length||GAME_CONFIG.rules.freeSpinWeights.reduce((a,b)=>a+b,0)<=0))throw new Error('Skin free-spin weights do not match its symbols');
if(SYMBOL_WEIGHTS.reduce((sum,weight)=>sum+weight,0)!==WEIGHT_TOTAL)throw new Error('Skin symbol weights must add up to weightTotal');
if(PAYLINES.length<GAME_CONFIG.defaults.maxLines)throw new Error('Skin does not define enough paylines');
if(PAYLINES.some(path=>path.length!==COLS||path.some(row=>row<0||row>=ROWS)))throw new Error('Skin paylines do not match the reel grid');
if(!PAYTABLE_COUNTS.length||(!DUENDE_SLOT&&!WIN_FRAMES.length)||(!DUENDE_SLOT&&WILD_INDEX<0)||(!DUENDE_SLOT&&!SCATTER_INDICES.length)||SCATTER_INDICES.length!==SCATTER_KEYS.length||BONUS_INDEX<0||!SYMBOL_KEYS.includes(ANIMATED_WIN_KEY))throw new Error('Skin symbols, paytable counts, and win animation are incomplete');
if(LINE_COLORS.length<PAYLINES.length)throw new Error('Skin needs one line color per payline');
const $=id=>document.getElementById(id);function setLoadingProgress(value){const pct=Math.max(0,Math.min(100,Math.round(value*100)));const bar=$('loadingBar'),label=$('loadingPercent');if(bar)bar.style.width=pct+'%';if(label)label.textContent=pct+'%'}function finishLoading(){setLoadingProgress(1);const screen=$('loadingScreen');if(screen){screen.classList.add('is-hidden');screen.setAttribute('aria-hidden','true');setTimeout(()=>{screen.style.display='none'},500)}}let balance=GAME_CONFIG.defaults.balance,bet=GAME_CONFIG.defaults.bet,jackpot=GAME_CONFIG.defaults.jackpot,lines=GAME_CONFIG.defaults.lines,spinning=false,scene,resultLock=false,freeSpins=GAME_CONFIG.defaults.freeSpins||0,pendingAnnouncement="",autoFreeTimer=null,autoSpin=false,autoSpinTimer=null,autoSpinRemaining=null,freeSpinsAuto=false,activeFreeSpin=false,pendingBonusFeature=null,lastSpinTotal=0,turboKeyHeld=false,turboToggle=false;
function formatNumber(value){return Number(value).toLocaleString(UI.numberLocale||'de-DE',{maximumFractionDigits:2})}function formatMultiplier(value){const precision=Number.isFinite(Number(UI.paytableMultiplierPrecision))?Number(UI.paytableMultiplierPrecision):12;return Number(value).toLocaleString(UI.numberLocale||'de-DE',{maximumFractionDigits:precision})}function formatCredits(value){const precision=Number.isFinite(Number(UI.creditPrecision))?Math.max(0,Math.min(4,Math.floor(Number(UI.creditPrecision)))):0;return Number(value).toLocaleString(UI.numberLocale||'de-DE',{maximumFractionDigits:precision})}
function setAnnouncement(text){const box=$('announcementText');if(box){const panel=box.closest('.announcement-panel'),ui=$('game')?.querySelector('.ui'),active=Boolean(text);box.classList.remove('jj-prize-message','jj-prize-celebrating');panel?.classList.remove('jj-prize-celebrating');panel?.classList.toggle('rk-message-active',active);ui?.classList.toggle('rk-message-active',active);box.textContent=text;box.classList.toggle('announcement-pulse',active)}}
function scheduleNextSpin(){if(autoFreeTimer)clearTimeout(autoFreeTimer);if(resultLock||spinning)return;if(freeSpins>0){autoFreeTimer=setTimeout(()=>{autoFreeTimer=null;scene?.spin()},Math.max(0,Number(GAME_CONFIG.defaults.freeSpinStartDelay??1200)));return}freeSpinsAuto=false;if(autoSpin){if(autoSpinRemaining!==null&&autoSpinRemaining<=0){stopAutoSpin();return}if(balance<bet){stopAutoSpin();const button=$("autoSpin");button?.classList.remove("is-active");button?.setAttribute("aria-pressed","false");if(button)button.textContent=UI.messages.autoSpin;return}autoSpinTimer=setTimeout(()=>{autoSpinTimer=null;if(autoSpin&&balance>=bet)scene?.spin()},1200)}}
function syncAutoStopOverlay(){const button=$('autoStopOverlay'),awardOpen=document.querySelector('.bigwin-screen.open,.lowwin-screen.open');if(button)button.classList.toggle('is-visible',Boolean(autoSpin&&awardOpen))}
function stopAutoSpin(){autoSpin=false;autoSpinRemaining=null;if(autoSpinTimer){clearTimeout(autoSpinTimer);autoSpinTimer=null}const button=$('autoSpin');button?.classList.remove('is-active');button?.setAttribute('aria-pressed','false');if(button)button.textContent=UI.messages.autoSpin;syncAutoStopOverlay();emitSlotEvent('autoplay-change',{active:false})}
function isTurboActive(){return Boolean(FEATURE_CONFIG.turboSpin&&(turboToggle||turboKeyHeld))}
function setTurboMode(active){if(!FEATURE_CONFIG.turboSpin)return false;turboToggle=Boolean(active);emitSlotEvent('turbo-change',{active:isTurboActive()});return turboToggle}
function setBetValue(value){if(spinning||resultLock)return bet;const min=GAME_CONFIG.defaults.minBet,max=GAME_CONFIG.defaults.maxBet,step=GAME_CONFIG.defaults.betStep;const requested=Number(value);if(!Number.isFinite(requested))return bet;bet=Math.max(min,Math.min(max,min+Math.round((requested-min)/step)*step));setText();emitSlotEvent('bet-change',{bet,lines});return bet}
function changeBet(steps){return setBetValue(bet+Number(steps||0)*GAME_CONFIG.defaults.betStep)}
function setLinesValue(value){if(spinning||resultLock)return lines;const min=GAME_CONFIG.defaults.minLines,max=GAME_CONFIG.defaults.maxLines,step=GAME_CONFIG.defaults.lineStep||1,requested=Number(value);if(!Number.isFinite(requested))return lines;lines=Math.max(min,Math.min(max,min+Math.round((requested-min)/step)*step));setText();emitSlotEvent('lines-change',{bet,lines});return lines}
function changeLines(steps){return setLinesValue(lines+Number(steps||0)*(GAME_CONFIG.defaults.lineStep||1))}
function startAutoSpin(limit=null){if(autoSpin){stopAutoSpin();return false}if(!freeSpins&&balance<bet){setAnnouncement(gameMessage('insufficientBalance'));return false}autoSpin=true;autoSpinRemaining=limit===null||limit===undefined?null:Math.max(1,Math.floor(Number(limit)||1));if(autoSpinTimer){clearTimeout(autoSpinTimer);autoSpinTimer=null}const button=$('autoSpin');button.classList.add('is-active');button.setAttribute('aria-pressed','true');button.textContent=UI.messages.stopAutoSpin;syncAutoStopOverlay();emitSlotEvent('autoplay-change',{active:true,remaining:autoSpinRemaining});if(!spinning&&!resultLock)scene?.spin();return true}
function closeAward(screen){screen.classList.remove('open');screen.setAttribute('aria-hidden','true');resultLock=false;setAnnouncement(pendingAnnouncement);syncAutoStopOverlay();if(pendingBonusFeature){startPendingBonusFeature();return}scheduleNextSpin()}
function fitBalanceValue(){const value=$('balance'),box=value?.closest('.control-box');if(!value||!box)return;value.style.fontSize='';let size=parseFloat(getComputedStyle(value).fontSize)||16;const min=8;for(let i=0;i<24&&value.scrollWidth>box.clientWidth-4&&size>min;i++){size-=.5;value.style.fontSize=size+'px'}}function setText(options={}){if(!options.deferBalance)$('balance').textContent=formatCredits(balance);$('bet').textContent=formatCredits(bet);$('lines').textContent=formatCredits(lines);$('jackpot').textContent=formatCredits(jackpot);syncSettingControls();requestAnimationFrame(fitBalanceValue)}
let bigWinTimer=null;function showBigWin(amount){const screen=$('bigWinScreen'),number=$('bigWinNumber'),particles=$('bigWinParticles'),card=screen?.querySelector('.bigwin-card');if(!screen||!number)return;emitSlotEvent('big-win-start',{amount,bet,multiplier:bet?amount/bet:0});if(bigWinTimer)clearTimeout(bigWinTimer);if(particles){particles.innerHTML='';const colors=GAME_CONFIG.colors.particlePalette;for(let i=0;i<70;i++){const p=document.createElement('span');p.className='bigwin-particle';p.style.left='50%';p.style.top='50%';p.style.color=colors[i%colors.length];p.style.background=colors[i%colors.length];p.style.setProperty('--dx',((Math.random()-.5)*120)+'vw');p.style.setProperty('--dy',((Math.random()-.5)*120)+'vh');p.style.animationDelay=(Math.random()*1.2)+'s';particles.appendChild(p)}}screen.classList.remove('open');screen.onpointerdown=()=>closeAward(screen);if(card){card.style.animation='none';card.style.opacity='0';card.style.transform='scale(.08)'}void screen.offsetWidth;screen.classList.add('open');screen.setAttribute('aria-hidden','false');syncAutoStopOverlay();if(card)requestAnimationFrame(()=>{card.style.transition='transform 2.8s cubic-bezier(.16,1,.3,1),opacity 1.2s ease';card.style.opacity='1';card.style.transform='scale(1)' });number.textContent='0';const start=performance.now()+1800,duration=7200;const count=now=>{const progress=Math.max(0,Math.min(1,(now-start)/duration));const eased=1-Math.pow(1-progress,3);number.textContent=formatCredits(amount*eased);if(progress<1)requestAnimationFrame(count);else{number.textContent=formatCredits(amount);if(freeSpins>0||freeSpinsAuto)bigWinTimer=setTimeout(()=>closeAward(screen),1800);else bigWinTimer=null}};requestAnimationFrame(count)}
function showLowWin(amount){const screen=$('lowWinScreen'),number=$('lowWinNumber'),particles=$('lowWinParticles');if(!screen||!number)return;emitSlotEvent('low-win-start',{amount,bet,multiplier:bet?amount/bet:0});if(particles){particles.innerHTML='';const colors=GAME_CONFIG.colors.lowWinParticlePalette;for(let i=0;i<42;i++){const p=document.createElement('span');p.className='lowwin-particle';p.style.setProperty('--x',(10+Math.random()*80)+'vw');p.style.setProperty('--y',(10+Math.random()*80)+'vh');p.style.background=colors[i%colors.length];particles.appendChild(p)}}screen.classList.remove('open');void screen.offsetWidth;screen.classList.add('open');screen.setAttribute('aria-hidden','false');syncAutoStopOverlay();screen.onpointerdown=()=>closeAward(screen);number.textContent='0';const start=performance.now()+450,duration=2600;const count=now=>{const progress=Math.max(0,Math.min(1,(now-start)/duration));number.textContent=formatCredits(amount*(1-Math.pow(1-progress,3)));if(progress<1)requestAnimationFrame(count);else{number.textContent=formatCredits(amount);if(freeSpins>0||freeSpinsAuto)setTimeout(()=>closeAward(screen),1200)}};requestAnimationFrame(count)}

let dotCount=0;const dotsTimer=setInterval(()=>{const dots=$('loadingDots');if(!dots)return;dotCount=(dotCount+1)%4;dots.textContent='.'.repeat(dotCount||1)},420);
function rand(){const weights=activeFreeSpin&&GAME_CONFIG.rules.freeSpinWeights?GAME_CONFIG.rules.freeSpinWeights:SYMBOL_WEIGHTS,total=weights.reduce((a,b)=>a+b,0),limit=Math.floor(0x100000000/total)*total,a=new Uint32Array(1);do{crypto.getRandomValues(a)}while(a[0]>=limit);let ticket=a[0]%total;for(let i=0;i<weights.length;i++){if(ticket<weights[i])return i;ticket-=weights[i]}return weights.length-1}
function evaluateWins(values){const wins=[],lineStake=bet/lines;PAYLINES.slice(0,lines).forEach((path,line)=>{const ids=path.map((row,col)=>values[col+row*COLS]);const base=ids.find(id=>id!==WILD_INDEX);const symbol=base===undefined?WILD_INDEX:base;if(SCATTER_INDICES.includes(symbol)||(symbol===BONUS_INDEX&&!DUENDE_SLOT)||!PAYTABLE[symbol])return;let count=0;for(const id of ids){if(id===symbol||id===WILD_INDEX)count++;else break}if(count>=MINIMUM_MATCH&&PAYTABLE[symbol][count]!==undefined)wins.push({line,count,symbol,amount:lineStake*PAYTABLE[symbol][count]*PAYOUT_SCALE,positions:path.slice(0,count).map((row,col)=>col+row*COLS)})});return wins.sort((a,b)=>b.amount-a.amount)}
function getBonusAward(count){const thresholds=Object.keys(BONUS_FREE_SPINS).map(Number).sort((a,b)=>a-b);for(let i=thresholds.length-1;i>=0;i--)if(count>=thresholds[i])return BONUS_FREE_SPINS[thresholds[i]];return 0}
function getThresholdAward(count,table={}){const thresholds=Object.keys(table).map(Number).sort((a,b)=>a-b);for(let i=thresholds.length-1;i>=0;i--)if(count>=thresholds[i])return Number(table[thresholds[i]])||0;return 0}
function evaluateSpecial(values,symbols){const ids=Array.isArray(symbols)?symbols:[symbols],symbol=ids[0],positions=[];values.forEach((id,index)=>{if(ids.includes(id))positions.push(index)});const count=positions.length,payout=PAYTABLE[symbol]?.[Math.min(count,MAX_PAYTABLE_MATCH)];return count>=SPECIAL_MINIMUM_MATCH&&payout!==undefined?{symbol,count,amount:bet*payout*PAYOUT_SCALE,positions}:null}
function startPendingBonusFeature(){const start=pendingBonusFeature;if(!start)return;pendingBonusFeature=null;resultLock=true;emitSlotEvent('feature-start',{});Promise.resolve().then(()=>start()).then(result=>{const amount=Math.max(0,Number(result?.amount)||0);balance+=amount;lastSpinTotal+=amount;$('win').textContent=formatCredits(lastSpinTotal);pendingAnnouncement=result?.announcement||pendingAnnouncement;setAnnouncement(pendingAnnouncement);setText();resultLock=false;emitSlotEvent('feature-end',{amount,jackpot:Boolean(result?.jackpot),freeSpinsRemaining:freeSpins});scheduleNextSpin()}).catch(error=>{console.warn('Optional slot feature failed',error);resultLock=false;emitSlotEvent('feature-end',{amount:0,jackpot:false,failed:true,freeSpinsRemaining:freeSpins});setAnnouncement(pendingAnnouncement);scheduleNextSpin()})}
class SlotScene extends Phaser.Scene{
 constructor(){super('SlotScene');this.symbols=[];this.overlays=[];this.fx=[];this.fireFx=[];this.landingFx=[];this.landingFxUntil=[];this.landingScaleRestoreTimers=[];this.baseSymbolScales=[];this.grid=[];this.htmlSymbols=[];this.htmlGrid=null;this.idleGhosts=[];this.idleFrameStates=[];this.idleAnimationUpdate=null;this.payline=null;this.spinId=0;this.brightRestoreTimers=[];this.lastLayout={w:0,h:0}}
 preload(){setLoadingProgress(0);this.load.on('progress',value=>setLoadingProgress(value));this.load.on('loaderror',file=>{console.error('Slot asset failed to load:',file.src);if(DUENDE_SLOT){const text=$('loadingMessage');if(text)text.textContent='Revisando recursos';setLoadingProgress(.99)}});this.load.once('complete',()=>setLoadingProgress(1));GAME_CONFIG.symbols.forEach(symbol=>{this.load.image(symbol.key,symbol.asset);if(symbol.winAsset)this.load.image(`${symbol.key}-bright`,symbol.winAsset);(symbol.animationFrames||[]).forEach((src,index)=>this.load.image(`${symbol.key}-idle-${index}`,src))});GAME_CONFIG.assets.winFrames.forEach(frame=>this.load.image(frame.key,frame.src));(GAME_CONFIG.assets.extraPreload||[]).forEach((src,index)=>this.load.image(`duende-preflight-${index}`,src));this.load.once('complete',()=>{if(DUENDE_SLOT){this.symbols.forEach((symbol,index)=>{if(!this.textures.exists(SYMBOL_KEYS[index]))console.error('Missing Duendesitas symbol texture:',SYMBOL_KEYS[index])})}})}
 create(){scene=this;this.makeGrid();this.idleFrameCursor={};const hasIdleFrames=GAME_CONFIG.symbols.some(symbol=>(symbol.animationFrames||[]).length>1),smoothIdle=Boolean(GAME_CONFIG.animations?.idle?.smooth);this.idleAnimationUpdate=hasIdleFrames&&smoothIdle?()=>this.advanceSmoothIdleFrames(performance.now()):null;if(this.idleAnimationUpdate)this.events.on('update',this.idleAnimationUpdate);this.idleAnimTimer=hasIdleFrames&&!smoothIdle?window.setInterval(()=>this.advanceIdleFrames(),850):null;const loadingPreview=GAME_CONFIG.id==='v8-road-king'&&new URLSearchParams(window.location.search).get('loading-preview')==='1';setLoadingProgress(loadingPreview?0.62:1);if(!loadingPreview)requestAnimationFrame(()=>setTimeout(finishLoading,220));this.scale.on('resize',()=>this.layout());this.layout();if(GAME_CONFIG.id==='good-girl-bad-girl'&&new URLSearchParams(window.location.search).get('girl-fx-preview')==='1')this.playGirlLandingEffects(this.grid);if(new URLSearchParams(window.location.search).has('win-fx-preview'))this.previewWinFx();this.events.on('shutdown',()=>{this.landingScaleRestoreTimers.forEach(timer=>{if(timer)window.clearTimeout(timer)});this.clearPayline();if(this.idleAnimTimer)window.clearInterval(this.idleAnimTimer);if(this.idleAnimationUpdate)this.events.off('update',this.idleAnimationUpdate);this.htmlGrid?.remove()})}
 makeGrid(){if(VISUAL_CONFIG.domSymbols){this.htmlGrid=document.createElement('div');this.htmlGrid.className='cleo-html-symbol-grid';this.htmlGrid.setAttribute('aria-hidden','true');$('reels').appendChild(this.htmlGrid)}const params=new URLSearchParams(window.location.search),symbolsPreview=GAME_CONFIG.id==='v8-road-king'&&params.get('symbols-preview')==='1',wildFirePreview=GAME_CONFIG.id==='good-girl-bad-girl'&&params.get('wild-fire-preview')==='1',whiteCatPreview=GAME_CONFIG.id==='good-girl-bad-girl'&&params.get('white-cat-preview')==='1',girlFxPreview=GAME_CONFIG.id==='good-girl-bad-girl'&&params.get('girl-fx-preview')==='1',wildIndex=GAME_CONFIG.symbols.findIndex(symbol=>symbol.key==='wild'),whiteCatIndex=GAME_CONFIG.symbols.findIndex(symbol=>symbol.key==='white-cat'),goodGirlIndex=GAME_CONFIG.symbols.findIndex(symbol=>symbol.key==='good-girl'),badGirlIndex=GAME_CONFIG.symbols.findIndex(symbol=>symbol.key==='bad-girl'),smoothIdle=Boolean(GAME_CONFIG.animations?.idle?.smooth)&&!this.htmlGrid,wildFireEnabled=Boolean(GAME_CONFIG.effects?.wildFire?.enabled);for(let i=0;i<COLS*ROWS;i++){const symbolIndex=whiteCatPreview&&i===COLS+2?whiteCatIndex:girlFxPreview&&i===COLS+1?goodGirlIndex:girlFxPreview&&i===COLS+3?badGirlIndex:wildFirePreview&&i===COLS+2?wildIndex:symbolsPreview?i%SYMBOL_KEYS.length:rand(),t=this.add.image(0,0,SYMBOL_KEYS[symbolIndex]).setOrigin(.5);if(this.htmlGrid)t.setVisible(false);const fire=wildFireEnabled?this.add.graphics().setDepth(-1).setVisible(false):null,landing=GAME_CONFIG.id==='good-girl-bad-girl'?this.add.graphics().setDepth(-2).setVisible(false):null,ghost=smoothIdle?this.add.image(0,0,SYMBOL_KEYS[symbolIndex]).setOrigin(.5).setAlpha(0).setVisible(false).setDepth(1):null,glow=this.add.graphics().setDepth(20);glow.setVisible(false).setAlpha(0);const overlay=WIN_FRAMES.length?this.add.image(0,0,WIN_FRAMES[0]).setOrigin(.5).setAlpha(0):this.add.image(0,0,SYMBOL_KEYS[symbolIndex]).setOrigin(.5).setAlpha(0).setVisible(false);this.symbols.push(t);this.fireFx.push(fire);this.landingFx.push(landing);this.landingFxUntil.push(0);this.idleGhosts.push(ghost);this.idleFrameStates.push(null);this.fx.push(glow);this.overlays.push(overlay);this.grid.push(symbolIndex);if(this.htmlGrid){const img=document.createElement('img');img.className='cleo-html-symbol';this.htmlGrid.appendChild(img);this.htmlSymbols.push(img);this.updateHtmlSymbol(i,symbolIndex)}}}
 updateHtmlSymbol(index,symbolIndex,bright=false,frameOverride=null){const image=this.htmlSymbols[index],symbol=GAME_CONFIG.symbols[symbolIndex];if(!image||!symbol)return;const frames=symbol.animationFrames||[],frameIndex=frames.length>1?(frameOverride??this.idleFrameCursor?.[symbol.key]??0)%frames.length:0,state=bright&&symbol.winAsset?'bright':frames.length>1?`idle-${frameIndex}`:'normal',src=state==='bright'?symbol.winAsset:state.startsWith('idle-')?frames[frameIndex]:symbol.asset;if(image.dataset.symbol!==symbol.key||image.dataset.state!==state){image.src=src;image.dataset.symbol=symbol.key;image.dataset.state=state}image.alt=symbol.label||symbol.key}
 advanceIdleFrames(){if(spinning||resultLock)return;let changed=false;GAME_CONFIG.symbols.forEach(symbol=>{const frames=symbol.animationFrames||[];if(frames.length<2)return;this.idleFrameCursor[symbol.key]=((this.idleFrameCursor[symbol.key]||0)+1)%frames.length;changed=true});if(!changed)return;this.grid.forEach((symbolIndex,index)=>{const symbol=GAME_CONFIG.symbols[symbolIndex],frames=symbol?.animationFrames||[];if(frames.length<2||this.brightRestoreTimers[index])return;const frame=(this.idleFrameCursor[symbol.key]||0)%frames.length;this.symbols[index].setTexture(`${symbol.key}-idle-${frame}`);this.updateHtmlSymbol(index,symbolIndex,false)})}
 advanceSmoothIdleFrames(now){this.updateWildFire(now);if(spinning||resultLock)return;const config=GAME_CONFIG.animations?.idle||{},intervalMs=Math.max(1,Number(config.intervalMs??180)),transitionMs=Math.max(1,Number(config.transitionMs??170)),staggerMs=Math.max(0,Number(config.staggerMs??110));this.grid.forEach((symbolIndex,index)=>{const symbol=GAME_CONFIG.symbols[symbolIndex],frames=symbol?.animationFrames||[],image=this.symbols[index],ghost=this.idleGhosts[index];if(frames.length<2||!image||!ghost||this.brightRestoreTimers[index]||now<(this.landingFxUntil[index]||0))return;let state=this.idleFrameStates[index];if(!state){state={frame:0,nextAt:now+Math.random()*intervalMs};this.idleFrameStates[index]=state}if(now<state.nextAt)return;const nextFrame=(state.frame+1)%frames.length;this.tweens.killTweensOf(image);this.tweens.killTweensOf(ghost);ghost.setTexture(`${symbol.key}-idle-${state.frame}`).setPosition(image.x,image.y).setScale(image.scaleX,image.scaleY).setAlpha(1).setVisible(true);image.setTexture(`${symbol.key}-idle-${nextFrame}`).setAlpha(0);this.tweens.add({targets:image,alpha:1,duration:transitionMs,ease:'Sine.easeInOut'});this.tweens.add({targets:ghost,alpha:0,duration:transitionMs,ease:'Sine.easeInOut',onComplete:()=>ghost.setVisible(false)});state.frame=nextFrame;state.nextAt=now+intervalMs+Math.random()*staggerMs;this.updateHtmlSymbol(index,symbolIndex,false,nextFrame)})}
 updateWildFire(now){
  const config=GAME_CONFIG.effects?.wildFire;
  if(!config?.enabled)return;
  const wildIndex=GAME_CONFIG.symbols.findIndex(symbol=>symbol.key===(config.symbolKey||'wild'));
  const time=now*.001;
  this.fireFx.forEach((fire,index)=>{
   if(!fire)return;
   fire.clear();
   if(spinning||this.grid[index]!==wildIndex){fire.setVisible(false);return}
   const image=this.symbols[index],width=image.displayWidth,height=image.displayHeight,cell=Math.min(width,height);
   if(!cell){fire.setVisible(false);return}
   fire.setVisible(true);
   const count=10;
   for(let n=0;n<count;n++){
    const angle=(n/count)*Math.PI*2-Math.PI/2+Math.sin(time*2.8+n*1.9+index)*.024;
    const radialX=Math.cos(angle),radialY=Math.sin(angle);
    let dx=radialX*.82,dy=radialY*.55-.78;
    const directionLength=Math.hypot(dx,dy);dx/=directionLength;dy/=directionLength;
    const tx=-dy,ty=dx;
    const flicker=.5+.5*Math.sin(time*8+n*1.73+index*.61);
    const sway=Math.sin(time*10+n*2.1+index)*cell*.006;
    const bx=image.x+radialX*width*.39,by=image.y+radialY*height*.39;
    const halfWidth=cell*(.026+.014*flicker);
    const length=cell*(.065+.055*flicker)*(n%4===0?1.08:1);
    const drawFlame=(widthScale,lengthScale,color,alpha)=>{
     const w=halfWidth*widthScale,l=length*lengthScale;
     const points=[
      {x:bx-tx*w*.62,y:by-ty*w*.62},
      {x:bx+dx*l*.24-tx*w*1.04,y:by+dy*l*.24-ty*w*1.04},
      {x:bx+dx*l*.57-tx*w*.72,y:by+dy*l*.57-ty*w*.72},
      {x:bx+dx*l+tx*sway*widthScale,y:by+dy*l+ty*sway*widthScale},
      {x:bx+dx*l*.57+tx*w*.72,y:by+dy*l*.57+ty*w*.72},
      {x:bx+dx*l*.24+tx*w*1.04,y:by+dy*l*.24+ty*w*1.04},
      {x:bx+tx*w*.62,y:by+ty*w*.62}
     ];
     fire.fillStyle(color,alpha);fire.beginPath();fire.moveTo(points[0].x,points[0].y);
     points.slice(1).forEach(point=>fire.lineTo(point.x,point.y));fire.closePath();fire.fillPath();
    };
    drawFlame(1,1,0xff3212,.98);
    drawFlame(.72,.78,0xff9b20,1);
    drawFlame(.42,.58,0xffff69,1);
   }
  });
 }
 playGirlLandingFx(index,key){
  const symbol=this.symbols[index],g=this.landingFx[index];
  if(!symbol||!g||(key!=='good-girl'&&key!=='bad-girl'))return;
  const cell=Math.min(this.scale.width/COLS,this.scale.height/ROWS),base=this.baseSymbolScales[index]||{x:symbol.scaleX,y:symbol.scaleY};
  const isGood=key==='good-girl',preview=new URLSearchParams(window.location.search).get('girl-fx-preview')==='1',phase=performance.now()*.001;
  if(this.landingScaleRestoreTimers[index])window.clearTimeout(this.landingScaleRestoreTimers[index]);this.landingScaleRestoreTimers[index]=null;
  this.tweens.killTweensOf(g);this.tweens.killTweensOf(symbol);symbol.setScale(base.x,base.y);const ghost=this.idleGhosts[index];if(ghost){this.tweens.killTweensOf(ghost);ghost.setAlpha(0).setVisible(false)}symbol.setAlpha(1);
  g.clear();
  if(isGood){
   g.fillStyle(0xfff1b7,.15);g.fillCircle(0,0,cell*.34);
   g.fillStyle(0xbcecff,.09);g.fillCircle(0,0,cell*.41);
   g.lineStyle(Math.max(1.3,cell*.018),0xfff1bd,.94);g.strokeCircle(0,0,cell*.37);
   g.lineStyle(Math.max(1,cell*.011),0xaeeaff,.82);g.strokeCircle(0,0,cell*.45);
   for(let n=0;n<10;n++){
    const angle=phase*.25+n*Math.PI*2/10,inner=cell*.34,outer=cell*(.44+(n%3)*.018),x1=Math.cos(angle)*inner,y1=Math.sin(angle)*inner,x2=Math.cos(angle)*outer,y2=Math.sin(angle)*outer;
    g.lineStyle(Math.max(1.1,cell*.014),n%2?0xbdefff:0xfff2c0,.9);g.beginPath();g.moveTo(x1,y1);g.lineTo(x2,y2);g.strokePath();
    if(n%2===0){const r=cell*.026;g.fillStyle(0xffffff,.98);g.beginPath();g.moveTo(x2,y2-r);g.lineTo(x2+r*.48,y2);g.lineTo(x2,y2+r);g.lineTo(x2-r*.48,y2);g.closePath();g.fillPath()}
   }
  }else{
   const count=10;
   for(let n=0;n<count;n++){
    const angle=n*Math.PI*2/count-Math.PI/2+Math.sin(phase*4+n*1.8)*.04,rx=Math.cos(angle),ry=Math.sin(angle);
    let dx=rx*.68,dy=ry*.42-.66;const norm=Math.hypot(dx,dy);dx/=norm;dy/=norm;const tx=-dy,ty=dx;
    const flicker=.5+.5*Math.sin(phase*7+n*1.61),bx=rx*cell*.29,by=ry*cell*.29,w=cell*(.026+.016*flicker),len=cell*(.085+.065*flicker),sway=Math.sin(phase*9+n*2.3)*cell*.018;
    const draw=(ws,ls,color,alpha)=>{const ww=w*ws,ll=len*ls,points=[{x:bx-tx*ww*.58,y:by-ty*ww*.58},{x:bx+dx*ll*.22-tx*ww*1.02,y:by+dy*ll*.22-ty*ww*1.02},{x:bx+dx*ll*.56-tx*ww*.72,y:by+dy*ll*.56-ty*ww*.72},{x:bx+dx*ll+tx*sway*ws,y:by+dy*ll+ty*sway*ws},{x:bx+dx*ll*.56+tx*ww*.72,y:by+dy*ll*.56+ty*ww*.72},{x:bx+dx*ll*.22+tx*ww*1.02,y:by+dy*ll*.22+ty*ww*1.02},{x:bx+tx*ww*.58,y:by+ty*ww*.58}];g.fillStyle(color,alpha);g.beginPath();g.moveTo(points[0].x,points[0].y);points.slice(1).forEach(p=>g.lineTo(p.x,p.y));g.closePath();g.fillPath()};
    draw(1,1,0xff3515,.96);draw(.7,.78,0xff9d20,1);draw(.4,.58,0xffff69,1);
   }
  }
  g.setPosition(symbol.x,symbol.y).setVisible(true).setAlpha(0).setScale(.78);
  this.landingFxUntil[index]=preview?Number.MAX_SAFE_INTEGER:performance.now()+540;
  const restoreScale=()=>{if(this.landingScaleRestoreTimers[index])window.clearTimeout(this.landingScaleRestoreTimers[index]);this.landingScaleRestoreTimers[index]=null;symbol.setScale(base.x,base.y)};
  this.landingScaleRestoreTimers[index]=window.setTimeout(()=>{this.tweens.killTweensOf(symbol);restoreScale()},700);
  this.tweens.add({targets:symbol,scaleX:base.x*1.17,scaleY:base.y*1.17,duration:115,ease:'Back.Out',yoyo:true,repeat:1,hold:38,onComplete:restoreScale});
  if(preview){g.setAlpha(.96);this.tweens.add({targets:g,scale:1.06,duration:430,yoyo:true,repeat:-1,ease:'Sine.easeInOut'})}
  else this.tweens.add({targets:g,alpha:.96,scale:1.06,duration:135,yoyo:true,hold:230,ease:'Sine.easeOut',onComplete:()=>{g.clear().setVisible(false).setAlpha(0).setScale(1);this.landingFxUntil[index]=0;this.idleFrameStates[index]=null}});
 }
 playGirlLandingEffects(values){
  if(GAME_CONFIG.id!=='good-girl-bad-girl')return;
  values.forEach((symbolIndex,index)=>{const key=SYMBOL_KEYS[symbolIndex];if(key!=='good-girl'&&key!=='bad-girl')return;this.time.delayedCall((index%COLS)*55,()=>{if(!spinning&&this.grid[index]===symbolIndex)this.playGirlLandingFx(index,key)})});
 }
 symbolScaleFor(index,symbolIndex){const t=this.symbols[index];if(!t)return{x:1,y:1};const symbolConfig=GAME_CONFIG.symbols[symbolIndex],key=symbolConfig?.key,dimensions=VISUAL_CONFIG.symbolDimensions?.[key],texture=key?this.textures.get(key):null,frame=texture?.get?.(),source=texture?.getSourceImage?.(),imageWidth=Number(dimensions?.[0]??frame?.width??source?.naturalWidth??source?.width??t.width),imageHeight=Number(dimensions?.[1]??frame?.height??source?.naturalHeight??source?.height??t.height),w=this.scale.width,h=this.scale.height,cellW=w/COLS,cellH=h/ROWS,size=Math.min(cellW,cellH)*SYMBOL_SCALE,configured=Number(VISUAL_CONFIG.symbolScales?.[key]??1),factor=Number.isFinite(configured)&&configured>0?configured:1,symbolScale=SYMBOL_FIT==='cell-width'?Math.min(cellW*SYMBOL_SCALE*factor/imageWidth,cellH*SYMBOL_SCALE*factor/imageHeight):Math.min(size*factor/imageWidth,size*factor/imageHeight),perspective=Number(VISUAL_CONFIG.reelPerspective)||0,edgeDistance=Math.abs((index%COLS)-(COLS-1)/2)/Math.max((COLS-1)/2,1),curvedScale=Math.max(.9,1-perspective*edgeDistance);return{x:symbolScale*curvedScale,y:symbolScale*SYMBOL_SCALE_Y}}
 applySymbolScale(index,symbolIndex){const t=this.symbols[index];if(!t)return;if(typeof t.setSizeToFrame==='function')t.setSizeToFrame();const scale=this.symbolScaleFor(index,symbolIndex);t.setScale(scale.x,scale.y);this.baseSymbolScales[index]=scale;const ghost=this.idleGhosts[index];if(ghost)ghost.setScale(scale.x,scale.y)}
 layout(){const w=this.scale.width,h=this.scale.height;this.lastLayout={w,h};this.symbols.forEach((t,i)=>{const cellW=w/COLS,cellH=h/ROWS,x=((i%COLS)+.5)*cellW,y=(Math.floor(i/COLS)+.5)*cellH,size=Math.min(cellW,cellH)*SYMBOL_SCALE;t.x=x;t.y=y;const symbolIndex=this.grid[i],scale=this.symbolScaleFor(i,symbolIndex);t.setScale(scale.x,scale.y);this.baseSymbolScales[i]=scale;const landing=this.landingFx[i];if(landing)landing.setPosition(x,y);const ghost=this.idleGhosts[i];if(ghost)ghost.setPosition(x,y).setScale(scale.x,scale.y);this.fx[i].setPosition(x,y);const o=this.overlays[i];o.setPosition(x,y);const overlayScale=Math.min(size*1.22/o.width,size*.9/o.height);o.setScale(overlayScale,overlayScale*SYMBOL_SCALE_Y)})}
 baseY(index){return (Math.floor(index/COLS)+.5)*this.scale.height/ROWS}
 animateWinSymbol(i,effect=null){
  const glow=this.fx[i],symbol=this.symbols[i],symbolIndex=this.grid[i],symbolConfig=GAME_CONFIG.symbols[symbolIndex];
  if(symbolConfig?.winAsset){this.brightRestoreTimers[i]?.remove(false);symbol.setTexture(`${symbolConfig.key}-bright`);this.updateHtmlSymbol(i,symbolIndex,true);this.brightRestoreTimers[i]=this.time.delayedCall(3100,()=>{if(!spinning&&this.grid[i]===symbolIndex){symbol.setTexture(symbolConfig.key);this.updateHtmlSymbol(i,symbolIndex,false)}this.brightRestoreTimers[i]=null})}
  const accent=effect?.color||GAME_CONFIG.colors.accent||'#ffffff';
  const highlight=effect?.highlight||GAME_CONFIG.colors.highlight||'#ffffff';
  const color=Phaser.Display.Color.HexStringToColor(accent).color;
  const shine=Phaser.Display.Color.HexStringToColor(highlight).color;
  const cell=Math.min(this.scale.width/COLS,this.scale.height/ROWS);
  this.tweens.killTweensOf(glow);this.tweens.killTweensOf(symbol);
  symbol.clearTint();symbol.setAlpha(1);
  glow.clear();
  glow.lineStyle(Math.max(1.25,cell*.022),color,.84);
  glow.strokeCircle(0,0,cell*.35);
  glow.lineStyle(Math.max(1,cell*.012),shine,.9);
  glow.strokeCircle(0,0,cell*.45);
  glow.setVisible(true).setAlpha(0).setScale(.78);
  this.tweens.add({targets:glow,alpha:.92,scale:1.12,duration:260,yoyo:true,ease:'Sine.easeOut',onComplete:()=>{glow.setVisible(false);glow.setAlpha(0)}});
  if(DUENDE_SLOT){
   const base=this.baseSymbolScales[i]||{x:symbol.scaleX,y:symbol.scaleY};
   const type=effect?.type||'';
   if(type==='clover-spin'){
    this.tweens.add({targets:symbol,scaleX:base.x*1.16,scaleY:base.y*1.16,angle:360,duration:760,ease:'Cubic.easeOut',yoyo:true,hold:90,onComplete:()=>symbol.setScale(base.x,base.y).setAngle(0)});
   }else if(type==='clover-hat'){
    this.tweens.add({targets:symbol,scaleX:base.x*1.24,scaleY:base.y*1.24,angle:0,duration:620,ease:'Back.Out',yoyo:true,repeat:1,hold:70,onComplete:()=>symbol.setScale(base.x,base.y).setAngle(0)});
   }else if(type==='galera-tilt'){
    this.tweens.add({targets:symbol,angle:-22,duration:210,ease:'Sine.easeOut',yoyo:true,repeat:3,onComplete:()=>symbol.setAngle(0)});
    this.tweens.add({targets:symbol,scaleX:base.x*1.20,scaleY:base.y*1.20,duration:260,ease:'Back.Out',yoyo:true,repeat:2,onComplete:()=>symbol.setScale(base.x,base.y)});
   }else if(type==='cauldron-bubble'){
    this.tweens.add({targets:symbol,y:symbol.y-cell*.12,scaleX:base.x*1.18,scaleY:base.y*1.20,duration:330,ease:'Sine.easeOut',yoyo:true,repeat:2,onComplete:()=>symbol.setPosition(this.lastLayout.w/COLS*((i%COLS)+.5),this.lastLayout.h/ROWS*(Math.floor(i/COLS)+.5)).setScale(base.x,base.y)});
   }else if(type==='bonus-glow'){
    this.tweens.add({targets:symbol,scaleX:base.x*1.16,scaleY:base.y*1.16,duration:180,ease:'Back.Out',yoyo:true,repeat:2,onComplete:()=>symbol.setScale(base.x,base.y).setAngle(0)});
   }else{
    this.tweens.add({targets:symbol,scaleX:base.x*1.18,scaleY:base.y*1.18,angle:4,duration:240,ease:'Back.Out',yoyo:true,repeat:2,onComplete:()=>symbol.setScale(base.x,base.y).setAngle(0)});
   }
   if(type==='cauldron-bubble'){
    // Lift the potion bubbles to the opening of the cauldron so they read clearly.
    const potW=symbol.displayWidth||cell,potH=symbol.displayHeight||cell;
    for(let k=0;k<7;k++){
     const x=symbol.x+(Math.random()-.5)*potW*.28;
     const y=symbol.y-potH*.19+Math.random()*potH*.035;
     const r=Math.max(2.4,Math.min(potW,potH)*(.046+Math.random()*.024));
     const bubble=this.add.circle(x,y,r,k%2?0xe056fd:0x32ff7e,.84)
      .setStrokeStyle(Math.max(1.4,r*.24),0xffffff,.98).setDepth(42);
     const gleam=this.add.circle(x-r*.28,y-r*.32,Math.max(1,r*.18),0xffffff,.96).setDepth(43);
     const drift=(Math.random()-.5)*potW*.12;
     this.tweens.add({targets:[bubble,gleam],y:y-potH*(.42+Math.random()*.18),x:x+drift,scale:.22,alpha:0,duration:900+Math.random()*380,delay:k*120,ease:'Sine.easeOut',onComplete:()=>{bubble.destroy();gleam.destroy()}});
    }
    // Small tongues of fire flicker upward from the logs under the cauldron.
    for(let k=0;k<8;k++){
     const x=symbol.x+(Math.random()-.5)*potW*.40;
     const baseY=symbol.y+potH*.34+Math.random()*potH*.025;
     const fw=Math.max(2.2,potW*(.022+Math.random()*.016));
     const fh=Math.max(6,potH*(.11+Math.random()*.075));
     const flame=this.add.graphics().setPosition(x,baseY).setDepth(42);
     flame.fillStyle(k%3===0?0xffdf55:0xff782c,.98);
     flame.beginPath();flame.moveTo(-fw,0);flame.lineTo(-fw*.62,-fh*.50);
     flame.lineTo(-fw*.20,-fh*.28);flame.lineTo(fw*.10,-fh);
     flame.lineTo(fw*.60,-fh*.46);flame.lineTo(fw,0);flame.closePath();flame.fillPath();
     flame.fillStyle(0xfff19b,.98);
     flame.beginPath();flame.moveTo(-fw*.38,0);flame.lineTo(-fw*.12,-fh*.36);
     flame.lineTo(fw*.12,-fh*.22);flame.lineTo(fw*.36,0);flame.closePath();flame.fillPath();
     this.tweens.add({targets:flame,y:baseY-fh*.25,scaleX:.62,scaleY:.78,alpha:0,duration:650+Math.random()*230,delay:k*80,ease:'Sine.easeOut',onComplete:()=>flame.destroy()});
    }
   }else if(type==='galera-tilt'){
    for(let k=0;k<3;k++){
     const x=symbol.x+(Math.random()-.5)*cell*.28,y=symbol.y-cell*.24,r=cell*.022;
     const glint=this.add.star(x,y,4,r*.35,r,color,k===1?shine:color,.95).setDepth(36);
     this.tweens.add({targets:glint,y:y-cell*.12,alpha:0,scale:.15,rotation:Math.PI/2,duration:420+Math.random()*140,delay:k*105,ease:'Cubic.easeOut',onComplete:()=>glint.destroy()});
    }
   }else if(type==='clover-spin'){
    for(let k=0;k<4;k++){
     const a=Math.PI*2*k/4,r=cell*.32,x=symbol.x+Math.cos(a)*r,y=symbol.y+Math.sin(a)*r;
     const leaf=this.add.ellipse(x,y,cell*.06,cell*.035,k%2?shine:color,.92).setRotation(a).setDepth(36);
     this.tweens.add({targets:leaf,x:symbol.x+Math.cos(a)*cell*.46,y:symbol.y+Math.sin(a)*cell*.46,alpha:0,scale:.25,duration:500,delay:k*45,ease:'Cubic.easeOut',onComplete:()=>leaf.destroy()});
    }
   }else{
    for(let k=0;k<8;k++){
     const a=Math.PI*2*k/8,r=cell*.34,x=symbol.x+Math.cos(a)*r,y=symbol.y+Math.sin(a)*r;
     const star=this.add.star(x,y,4,Math.max(1.2,cell*.018),Math.max(2.3,cell*.04),k%2?shine:color,.94).setDepth(36);
     this.tweens.add({targets:star,angle:star.angle+90,x:x+Math.cos(a)*cell*.12,y:y+Math.sin(a)*cell*.12,alpha:0,scale:.2,duration:500,delay:k*35,ease:'Cubic.easeOut',onComplete:()=>star.destroy()});
    }
   }
  }
  if(!DUENDE_SLOT)this.animateWinSparkles(symbol.x,symbol.y,cell,effect);
  if(effect?.type==='gold-chest')this.animateGoldChest(i,effect);
  if(effect?.type==='blue-lotus')this.animateBlueLotus(i,effect);
 }
 animateWinSparkles(x,y,cell,effect=null){
  const palette=[effect?.color,effect?.highlight,...(GAME_CONFIG.colors.particlePalette||[])].filter(Boolean);
  if(!palette.length)palette.push(GAME_CONFIG.colors.accent||'#ffd866','#ffffff');
  const colors=palette.map(hex=>Phaser.Display.Color.HexStringToColor(hex).color);
  const count=8,start=Math.random()*Math.PI*2;
  for(let n=0;n<count;n++){
   const angle=start+(Math.PI*2*n/count)+(Math.random()-.5)*.16;
   const startRadius=cell*.24,endRadius=cell*(.42+Math.random()*.12);
   const outer=Math.max(2.5,cell*.075),color=colors[(n+Math.floor(Math.random()*colors.length))%colors.length];
   const star=this.add.star(x+Math.cos(angle)*startRadius,y+Math.sin(angle)*startRadius,4,Math.max(1,outer*.24),outer,color,.96).setDepth(35);
   star.setRotation(angle);
   this.tweens.add({targets:star,x:x+Math.cos(angle)*endRadius,y:y+Math.sin(angle)*endRadius,alpha:0,scale:.18,rotation:angle+(n%2?1:-1)*Math.PI/2,duration:460+Math.random()*150,delay:(n%4)*42,ease:'Cubic.easeOut',onComplete:()=>star.destroy()});
  }
 }
 previewWinFx(){
  if(DUENDE_SLOT){
   const samples=[{index:COLS+1,key:'galera'},{index:COLS+2,key:'cauldron'}];
   samples.forEach(({index,key})=>{const symbolIndex=GAME_CONFIG.symbols.findIndex(symbol=>symbol.key===key);if(symbolIndex<0)return;this.grid[index]=symbolIndex;this.symbols[index].setTexture(key);this.applySymbolScale(index,symbolIndex);this.updateHtmlSymbol(index,symbolIndex)});
   const play=()=>samples.forEach(({index,key},order)=>this.time.delayedCall(order*950,()=>{const config=WIN_EFFECTS[key];this.animateWinSymbol(index,config||null)}));
   this.time.delayedCall(320,play);
   this.time.addEvent({delay:3300,loop:true,callback:play});
   return;
  }
  const samples=[COLS+1,COLS+2,COLS+3].filter(index=>index<COLS*ROWS);
  if(!samples.length)return;
  const play=()=>samples.forEach((index,order)=>this.time.delayedCall(order*170,()=>this.animateWinSymbol(index,null)));
  this.time.delayedCall(180,play);
  this.time.addEvent({delay:1050,loop:true,callback:play});
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
  activeFreeSpin=freeSpins>0;if(autoSpin&&!activeFreeSpin&&autoSpinRemaining!==null)autoSpinRemaining--;spinning=true;$('reels')?.classList.add('is-spinning');this.htmlGrid?.classList.add('is-spinning');this.htmlSymbols.forEach(image=>image.classList.add('is-spinning'));setAnnouncement('');if(freeSpins>0)freeSpins--;else balance-=bet;emitSlotEvent('spin-start',{bet,lines,isFreeSpin:activeFreeSpin});jackpot+=Math.max(GAME_CONFIG.defaults.minimumJackpotContribution,Math.floor(bet*GAME_CONFIG.defaults.jackpotContributionRate));setText();this.clearPayline();
  const id=++this.spinId,stopped=Array(COLS).fill(false),values=Array(COLS*ROWS).fill(0),started=performance.now(),spinTiming=GAME_CONFIG.animations?.spin||{},firstStopMs=Math.max(1,Number(spinTiming.firstStopMs??850)),stopStaggerMs=Math.max(1,Number(spinTiming.stopStaggerMs??300)),symbolCycleMs=Math.max(16,Number(spinTiming.symbolCycleMs??75)),reelSpeed=Math.max(.1,Number(spinTiming.reelSpeed??1.35)),fallbackMs=Math.max(firstStopMs+COLS*stopStaggerMs+300,Number(spinTiming.fallbackMs??3400));let lastCycle=-1,finished=false;
  this.symbols.forEach((t,i)=>{this.brightRestoreTimers[i]?.remove(false);this.brightRestoreTimers[i]=null;t.setTint(0xffffff);t.setAngle(0);t.setTexture(SYMBOL_KEYS[this.grid[i]]);if(VISUAL_CONFIG.refitOnTextureChange)this.applySymbolScale(i,this.grid[i]);this.updateHtmlSymbol(i,this.grid[i],false);this.tweens.killTweensOf(t);if(this.landingScaleRestoreTimers[i])window.clearTimeout(this.landingScaleRestoreTimers[i]);this.landingScaleRestoreTimers[i]=null;if(this.baseSymbolScales[i])t.setScale(this.baseSymbolScales[i].x,this.baseSymbolScales[i].y);this.landingFxUntil[i]=0;const landing=this.landingFx[i];if(landing){this.tweens.killTweensOf(landing);landing.clear().setVisible(false).setAlpha(0).setScale(1)}const ghost=this.idleGhosts[i];if(ghost){this.tweens.killTweensOf(ghost);ghost.setAlpha(0).setVisible(false)}this.idleFrameStates[i]=null;t.alpha=1});
  this.overlays.forEach(t=>{t.setAlpha(0);t.setVisible(false)});this.fx.forEach(t=>{t.setVisible(false);t.setAlpha(0)});
  const stopColumn=col=>{if(stopped[col]||id!==this.spinId)return;stopped[col]=true;const keys=[];for(let r=0;r<ROWS;r++){const index=col+r*COLS;values[index]=rand();keys.push(SYMBOL_KEYS[values[index]]);this.symbols[index].setAngle(0);this.symbols[index].setTexture(SYMBOL_KEYS[values[index]]);if(VISUAL_CONFIG.refitOnTextureChange)this.applySymbolScale(index,values[index]);this.updateHtmlSymbol(index,values[index]);this.htmlSymbols[index]?.classList.remove('is-spinning');this.tweens.killTweensOf(this.symbols[index]);this.symbols[index].y=this.baseY(index);this.symbols[index].alpha=1}emitSlotEvent('reel-stop',{column:col,keys,isFreeSpin:activeFreeSpin})};
  let raf=null,fallback=null;
  const finishSpin=()=>{if(finished||id!==this.spinId)return;finished=true;$('reels')?.classList.remove('is-spinning');if(raf!==null)window.cancelAnimationFrame(raf);if(fallback)window.clearTimeout(fallback);for(let c=0;c<COLS;c++)stopColumn(c);for(let i=0;i<COLS*ROWS;i++){this.tweens.killTweensOf(this.symbols[i]);this.symbols[i].y=this.baseY(i);this.symbols[i].setAngle(0);this.symbols[i].alpha=1}this.grid=values.slice();spinning=false;const wins=evaluateWins(values),scatterWin=evaluateSpecial(values,SCATTER_INDICES),bonusPositions=[],bonusCount=values.reduce((n,id,index)=>{if(id===BONUS_INDEX)bonusPositions.push(index);return n+(id===BONUS_INDEX?1:0)},0),wildCount=values.reduce((n,id)=>n+(id===WILD_INDEX?1:0),0),scatterCount=values.reduce((n,id)=>n+(SCATTER_INDICES.includes(id)?1:0),0),freeSpinTriggers=FEATURE_CONFIG.freeSpinTriggers||GAME_CONFIG.rules.freeSpinTriggers||{},awarded=activeFreeSpin&&FEATURE_CONFIG.allowFreeSpinRetrigger===false?0:Math.max(getBonusAward(bonusCount),getThresholdAward(wildCount,freeSpinTriggers.wild),getThresholdAward(scatterCount,freeSpinTriggers.scatter)),lineTotal=wins.reduce((sum,win)=>sum+win.amount,0),specialTotal=scatterWin?scatterWin.amount:0,totalWin=lineTotal+specialTotal;if(totalWin>0)balance+=totalWin;const prizeTransferActive=Boolean(totalWin>0&&FEATURE_CONFIG.prizeBalanceTransfer?.enabled&&typeof window.SLOT_GAME_UI?.celebratePrize==='function');lastSpinTotal=totalWin;$('win').textContent=formatCredits(totalWin);if(awarded){freeSpinsAuto=true;freeSpins+=awarded;pendingAnnouncement=gameMessage('bonusAward',{awarded,remaining:freeSpins})+(totalWin>0?`\n${gameMessage('prize',{amount:formatCredits(totalWin)})}`:'')}else if(scatterWin&&lineTotal===0)pendingAnnouncement=gameMessage('scatterAward',{amount:formatCredits(specialTotal),total:formatCredits(totalWin)});else if(totalWin>0)pendingAnnouncement=gameMessage('prize',{amount:formatCredits(totalWin)});else pendingAnnouncement='';const holdConfig=FEATURE_CONFIG.holdAndRing;if(holdConfig&&bonusCount>=Number(holdConfig.threshold||6)&&typeof window.SLOT_GAME_FEATURES?.holdAndRing==='function'){pendingBonusFeature=()=>window.SLOT_GAME_FEATURES.holdAndRing({bonusPositions:bonusPositions.slice(),bonusCount,bet,respins:holdConfig.respins||3,cells:holdConfig.cells||COLS*ROWS,totalWin,freeSpinsAward:awarded})}const positions=wins.flatMap(win=>win.positions).concat(scatterWin?scatterWin.positions:[],bonusPositions).filter((index,position,array)=>array.indexOf(index)===position);positions.forEach(index=>{
  const key=SYMBOL_KEYS[values[index]],effect=WIN_EFFECTS[key],lineWin=wins.some(win=>win.positions.includes(index));
  const specialWin=key===SYMBOL_KEYS[BONUS_INDEX]?(awarded>0||Boolean(holdConfig&&bonusCount>=Number(holdConfig.threshold||6)))&&bonusPositions.includes(index):SCATTER_INDICES.includes(values[index])?Boolean(scatterWin&&scatterWin.positions.includes(index)):false;
  const shouldAnimate=effect&&(effect.when==='bonus-awarded'?specialWin:effect.when==='line-win'?lineWin:(lineWin||specialWin));
  if(DUENDE_SLOT){if(lineWin)this.animateWinSymbol(index,shouldAnimate?effect:{type:'duende-win',color:GAME_CONFIG.colors.accent,highlight:GAME_CONFIG.colors.highlight})}else if(lineWin||specialWin||key===ANIMATED_WIN_KEY)this.animateWinSymbol(index,shouldAnimate?effect:null);
});this.playGirlLandingEffects(values);emitSlotEvent('spin-result',{values:values.slice(),wins,scatterCount,wildCount,bonusCount,awarded,totalWin,bet,lines,freeSpinsRemaining:freeSpins,isFreeSpin:activeFreeSpin});if(prizeTransferActive){resultLock=true;setTimeout(()=>this.showPaylines(wins),450);setTimeout(()=>{const revealBalanceAndUnlock=()=>{try{const balanceValue=$('balance');if(balanceValue)balanceValue.textContent=formatCredits(balance);requestAnimationFrame(fitBalanceValue)}finally{resultLock=false;if(pendingBonusFeature){resultLock=true;startPendingBonusFeature()}else scheduleNextSpin()}};const multiplier=bet?totalWin/bet:0,title=awarded?`BONUS +${awarded} GIROS GRATIS`:scatterWin&&lineTotal===0?'PREMIO BONUS':multiplier>=GAME_CONFIG.defaults.bigWinBetMultiplier?'BIG WIN':multiplier>=GAME_CONFIG.defaults.lowWinBetMultiplier?'NICE WIN':'PREMIO';Promise.resolve().then(()=>window.SLOT_GAME_UI.celebratePrize({title,amountText:`${formatCredits(totalWin)} fichas`,balanceText:formatCredits(balance)})).catch(error=>{console.warn('Prize celebration failed; revealing awarded balance',error)}).then(revealBalanceAndUnlock)},1050)}else if(awarded>0&&typeof window.SLOT_GAME_UI?.celebrateBonusAward==='function'){resultLock=true;setTimeout(()=>this.showPaylines(wins),450);setTimeout(()=>{const finishBonusAward=()=>{resultLock=false;setAnnouncement(pendingAnnouncement);if(pendingBonusFeature){resultLock=true;startPendingBonusFeature()}else scheduleNextSpin()};Promise.resolve().then(()=>window.SLOT_GAME_UI.celebrateBonusAward({spins:awarded,remaining:freeSpins,prizeAmount:totalWin,prizeText:formatCredits(totalWin)})).catch(error=>{console.warn('Bonus celebration failed; continuing with awarded free spins',error)}).then(finishBonusAward)},1050)}else if(totalWin>0||awarded){resultLock=true;setTimeout(()=>this.showPaylines(wins),450);setTimeout(()=>{if(totalWin>=bet*GAME_CONFIG.defaults.bigWinBetMultiplier)showBigWin(totalWin);else if(totalWin>=bet*GAME_CONFIG.defaults.lowWinBetMultiplier)showLowWin(totalWin);else{resultLock=false;setAnnouncement(pendingAnnouncement);if(pendingBonusFeature){resultLock=true;startPendingBonusFeature()}else scheduleNextSpin()}},1050)}else{setAnnouncement('');if(pendingBonusFeature){resultLock=true;setTimeout(startPendingBonusFeature,450)}}setText({deferBalance:prizeTransferActive});if(!pendingBonusFeature&&!resultLock)scheduleNextSpin()};
  const tick=()=>{if(id!==this.spinId||finished)return;const elapsed=performance.now()-started,speed=isTurboActive()?Number(FEATURE_CONFIG.turboSpin.multiplier||2.2):1,accelerated=elapsed*speed;for(let c=0;c<COLS;c++)if(!stopped[c]&&accelerated>=firstStopMs+c*stopStaggerMs)stopColumn(c);const cycle=Math.floor(accelerated/symbolCycleMs);if(cycle!==lastCycle){lastCycle=cycle;for(let c=0;c<COLS;c++)if(!stopped[c])for(let r=0;r<ROWS;r++){const index=c+r*COLS;values[index]=rand();this.symbols[index].setAngle(0);this.symbols[index].setTexture(SYMBOL_KEYS[values[index]]);if(VISUAL_CONFIG.refitOnTextureChange)this.applySymbolScale(index,values[index]);this.updateHtmlSymbol(index,values[index])}}for(let c=0;c<COLS;c++)if(!stopped[c])for(let r=0;r<ROWS;r++){const index=c+r*COLS,cell=this.scale.height/ROWS,phase=(accelerated*reelSpeed+r*cell/2)%cell;this.symbols[index].y=this.baseY(index)+phase-cell/2}if(stopped.every(Boolean))finishSpin()};
  fallback=window.setTimeout(finishSpin,fallbackMs);const frame=()=>{if(id!==this.spinId||finished)return;tick();if(!finished)raf=window.requestAnimationFrame(frame)};tick();if(!finished)raf=window.requestAnimationFrame(frame);
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
  label.textContent=SCATTER_INDICES.includes(index)?UI.scatterPaytableLabel.replace('{label}',symbol.label):symbol.label;
  identity.append(image,label);row.appendChild(identity);
  PAYTABLE_COUNTS.forEach(count=>{const cell=document.createElement('td');if(index===BONUS_INDEX&&DUENDE_SLOT){const linePrize=paytable?.[count]===undefined?'—':`${formatMultiplier(paytable[count]*PAYOUT_SCALE)}${UI.paytableMultiplierSuffix}`,spins=BONUS_FREE_SPINS[count]===undefined?'':` + ${BONUS_FREE_SPINS[count]} ${UI.freeSpinsSuffix}`;cell.textContent=linePrize+spins}else if(index===BONUS_INDEX)cell.textContent=BONUS_FREE_SPINS[count]===undefined?'—':`${BONUS_FREE_SPINS[count]} ${UI.freeSpinsSuffix}`;else cell.textContent=paytable?.[count]===undefined?'—':`${formatMultiplier(paytable[count]*PAYOUT_SCALE)}${UI.paytableMultiplierSuffix}`;row.appendChild(cell)});
  return row;
 }));
}
applyGameSkin();
const config={type:GAME_CONFIG.renderer==='canvas'?Phaser.CANVAS:Phaser.AUTO,parent:'reels',backgroundColor:'rgba(0,0,0,0)',transparent:true,fps:{target:60,forceSetTimeOut:false},render:{antialias:true,powerPreference:'high-performance'},scale:{mode:Phaser.Scale.RESIZE,width:'100%',height:'100%'},scene:SlotScene};new Phaser.Game(config);
const paytableModal=$('paytableModal');const paytableRows=$('paytableRows');buildPaytable();
function openPaytable(){paytableModal?.classList.add('open');paytableModal?.setAttribute('aria-hidden','false');emitSlotEvent('paytable-open',{})}
function closePaytable(){paytableModal?.classList.remove('open');paytableModal?.setAttribute('aria-hidden','true');emitSlotEvent('paytable-close',{})}
const settingsMenu=$('rkSettingsMenu');let lastSettingsTrigger=null;
function syncSettingControls(){const value=$('betSettingValue'),step=Number(GAME_CONFIG.defaults.betStep)||1,down=$('betStepDown'),up=$('betStepUp'),hint=$('betStepHint');if(value)value.textContent=formatCredits(bet);if(down){down.textContent=`−${formatCredits(step)}`;down.disabled=bet<=GAME_CONFIG.defaults.minBet}if(up){up.textContent=`+${formatCredits(step)}`;up.disabled=bet>=GAME_CONFIG.defaults.maxBet}if(hint)hint.textContent=`Paso ${formatCredits(step)} · mínimo ${formatCredits(GAME_CONFIG.defaults.minBet)} · máximo ${formatCredits(GAME_CONFIG.defaults.maxBet)}`;document.querySelectorAll('#lineChoiceButtons [data-line-value]').forEach(button=>{const selected=Number(button.dataset.lineValue)===lines;button.classList.toggle('is-selected',selected);button.setAttribute('aria-pressed',String(selected))})}
function buildLineChoiceButtons(){const host=$('lineChoiceButtons');if(!host)return;host.replaceChildren();const min=Number(GAME_CONFIG.defaults.minLines),max=Number(GAME_CONFIG.defaults.maxLines),step=Math.max(1,Number(GAME_CONFIG.defaults.lineStep)||1);for(let value=min;value<=max;value+=step){const button=document.createElement('button');button.type='button';button.className='rk-line-option';button.dataset.lineValue=String(value);button.textContent=formatCredits(value);button.setAttribute('aria-label',`${value} líneas activas`);button.onclick=()=>{setLinesValue(value);closeSettingsMenu()};host.appendChild(button)}syncSettingControls()}
function openSettingsMenu(kind,trigger){if(!settingsMenu)return;lastSettingsTrigger=trigger||null;const isBet=kind==='bet',betPanel=$('betSetting'),linePanel=$('lineSetting');if(betPanel)betPanel.hidden=!isBet;if(linePanel)linePanel.hidden=isBet;$('settingsTitle').textContent=isBet?'CONFIGURAR APUESTA':'CONFIGURAR LÍNEAS';settingsMenu.classList.add('open');settingsMenu.setAttribute('aria-hidden','false');$('betIndicator')?.setAttribute('aria-expanded',String(isBet));$('linesIndicator')?.setAttribute('aria-expanded',String(!isBet));syncSettingControls();requestAnimationFrame(()=>{(isBet?$('betStepDown'):document.querySelector('#lineChoiceButtons button'))?.focus()})}
function closeSettingsMenu(){if(!settingsMenu)return;settingsMenu.classList.remove('open');settingsMenu.setAttribute('aria-hidden','true');$('betIndicator')?.setAttribute('aria-expanded','false');$('linesIndicator')?.setAttribute('aria-expanded','false');lastSettingsTrigger?.focus();lastSettingsTrigger=null}
if(settingsMenu){$('betStepDown').onclick=()=>setBetValue(bet-GAME_CONFIG.defaults.betStep);$('betStepUp').onclick=()=>setBetValue(bet+GAME_CONFIG.defaults.betStep);$('closeSettingsMenu').onclick=closeSettingsMenu;$('settingsBackdrop').onclick=closeSettingsMenu;buildLineChoiceButtons();document.addEventListener('keydown',e=>{if(e.key==='Escape'&&settingsMenu.classList.contains('open'))closeSettingsMenu()})}
$('spin').onclick=()=>scene?.spin();$('autoSpin').onclick=()=>autoSpin?stopAutoSpin():startAutoSpin();$('autoStopOverlay').onclick=stopAutoSpin;
$('plus').onclick=()=>setBetValue(bet+GAME_CONFIG.defaults.betStep);$('minus').onclick=()=>setBetValue(bet-GAME_CONFIG.defaults.betStep);$('maxBet')?.addEventListener('click',()=>setBetValue(GAME_CONFIG.defaults.maxBet));$('betIndicator')?.addEventListener('click',()=>openSettingsMenu('bet',$('betIndicator')));
$('lineUp').onclick=()=>changeLines(1);$('lineDown').onclick=()=>changeLines(-1);$('linesIndicator')?.addEventListener('click',()=>openSettingsMenu('lines',$('linesIndicator')));
$('menu').onclick=openPaytable;$('ggbgInfo')?.addEventListener('click',openPaytable);$('ggbgHamburger')?.addEventListener('click',openPaytable);$('buyBonus')?.addEventListener('click',openPaytable);$('closePaytable').onclick=closePaytable;paytableModal.onclick=e=>{if(e.target===paytableModal)closePaytable()};
window.SLOT_GAME_API=Object.freeze({getState:()=>({balance,bet,lines,spinning,resultLock,autoSpin,autoSpinRemaining,turbo:isTurboActive(),minBet:GAME_CONFIG.defaults.minBet,maxBet:GAME_CONFIG.defaults.maxBet,betStep:GAME_CONFIG.defaults.betStep,minLines:GAME_CONFIG.defaults.minLines,maxLines:GAME_CONFIG.defaults.maxLines,lineStep:GAME_CONFIG.defaults.lineStep}),setBet:setBetValue,changeBet,setLines:setLinesValue,changeLines,startAutoplay:startAutoSpin,stopAutoplay:stopAutoSpin,setTurbo:setTurboMode,toggleTurbo:()=>setTurboMode(!turboToggle),spin:()=>scene?.spin(),openPaytable,closePaytable});
if(FEATURE_CONFIG.keyboardControls){document.addEventListener('keydown',e=>{if(!['Space','Enter'].includes(e.code)||e.target?.matches?.('input,textarea,select,[contenteditable="true"]'))return;if(FEATURE_CONFIG.preventKeyboardWhenModal&&document.querySelector('.paytable-modal.open,.jj-modal.open,.rk-settings-menu.open'))return;e.preventDefault();if(FEATURE_CONFIG.turboSpin)turboKeyHeld=true;if(!e.repeat&&!spinning&&!resultLock)scene?.spin()},{passive:false});document.addEventListener('keyup',e=>{if(['Space','Enter'].includes(e.code))turboKeyHeld=false});window.addEventListener('blur',()=>{turboKeyHeld=false})}
setText();




















