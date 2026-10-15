(()=>{
 const cfg=window.SLOT_GAME_CONFIG;
 if(!cfg||cfg.id!=='good-girl-bad-girl')return;
 const root='assets/good-girl-bad-girl/audio/';
 const files={
  intro:'snd_background_music_intro_mpegl3a_medium.mp3',
  musicIdle:'snd_background_music_idle_mpegl3a_medium.mp3',
  musicMain:'snd_background_music_mpegl3a_medium.mp3',
  click:'snd_click1_mpegl3a_medium.mp3',
  clickAlt:'snd_click2_mpegl3a_medium.mp3',
  spin:'snd_spin_action_mpegl3a_medium.mp3',
  stop:'snd_stop_action_mpegl3a_medium.mp3',
  reelLoop:'snd_reels_spin_loop_mpegl3a_medium.mp3',
  reelStops:[1,2,3,4,5].map(n=>`snd_reel_stop_${n}_mpegl3a_medium.mp3`),
  wild:'snd_wild_landing_mpegl3a_medium.mp3',
  scatter:'snd_scatter_landing_mpegl3a_medium.mp3',
  scatterTrigger:'snd_scatter_trigger_mpegl3a_medium.mp3',
  winXS:'snd_wins_xsmall_mpegl3a_medium.mp3',
  winS:'snd_wins_small_mpegl3a_medium.mp3',
  winM:'snd_wins_medium_mpegl3a_medium.mp3',
  winL:'snd_wins_large_mpegl3a_medium.mp3',
  bigAccent:'snd_bigwin_accent_mpegl3a_medium.mp3',
  bigLevels:[1,2,3].map(n=>`snd_bigwin_level${n}_mpegl3a_medium.mp3`),
  bigOutro:'snd_bigwin_outro_mpegl3a_medium.mp3',
  fsTriggered:'snd_fs_triggered_mpegl3a_medium.mp3',
  fsTransition:'snd_fs_transition_mpegl3a_medium.mp3'
 };
 const active=new Set();
 let muted=false,unlocked=false,spinning=false,freeSpinMode=false,music=null,musicKey='',intro=null,reelLoop=null,bigWinLevel=null,spinCues=new Set();
 try{muted=localStorage.getItem('ggbg-sound-muted')==='1'}catch{}
 const button=document.createElement('button');
 button.id='ggbgSoundToggle';button.type='button';button.className='ggbg-sound-toggle';
 button.setAttribute('aria-pressed',String(muted));button.title=muted?'Activar sonido':'Silenciar sonido';button.setAttribute('aria-label',button.title);button.textContent=muted?'🔇':'🔊';
 const style=document.createElement('style');
 style.textContent=`:root[data-skin="good-girl-bad-girl"] .ggbg-sound-toggle{position:fixed!important;top:max(8px,env(safe-area-inset-top))!important;left:max(8px,env(safe-area-inset-left))!important;z-index:100003!important;width:40px!important;height:40px!important;padding:0!important;display:grid!important;place-items:center!important;border:1px solid rgba(246,220,177,.68)!important;border-radius:50%!important;background:rgba(20,11,14,.82)!important;color:#fff0cd!important;font:700 19px/1 system-ui,sans-serif!important;box-shadow:0 2px 12px rgba(0,0,0,.5)!important;cursor:pointer!important;touch-action:manipulation!important;-webkit-tap-highlight-color:transparent!important}:root[data-skin="good-girl-bad-girl"] .ggbg-sound-toggle:active{transform:scale(.93)!important}:root[data-skin="good-girl-bad-girl"] .ggbg-sound-toggle:focus-visible{outline:2px solid #ffdc91!important;outline-offset:2px!important}`;
 document.head.appendChild(style);document.body.appendChild(button);
 const url=name=>root+name;
 function play(name,volume=.62,loop=false){
  let file=files[name];
  if(!file&&name.startsWith('reelStop'))file=files.reelStops[Number(name.slice('reelStop'.length))-1];
  if(!file&&name.startsWith('bigLevel'))file=files.bigLevels[Number(name.slice('bigLevel'.length))-1];
  if(muted||!unlocked||!file)return null;
  const audio=new Audio(url(file));audio.preload='auto';audio.volume=volume;audio.loop=loop;active.add(audio);
  audio.addEventListener('ended',()=>{if(!audio.loop)active.delete(audio)},{once:true});
  const promise=audio.play();if(promise&&promise.catch)promise.catch(()=>active.delete(audio));
  return audio;
 }
 function stop(audio,fadeMs=150){
  if(!audio)return;
  const from=audio.volume,start=performance.now();
  const tick=now=>{if(audio.paused){audio.pause();audio.currentTime=0;active.delete(audio);return}const p=Math.min(1,(now-start)/Math.max(1,fadeMs));audio.volume=from*(1-p);if(p<1)requestAnimationFrame(tick);else{audio.pause();audio.currentTime=0;active.delete(audio)}};
  requestAnimationFrame(tick);
 }
 function fadeIn(audio,target=.18,duration=550){
  if(!audio)return;const start=performance.now();audio.volume=0;
  const tick=now=>{if(audio.paused||muted)return;const p=Math.min(1,(now-start)/Math.max(1,duration));audio.volume=target*p;if(p<1)requestAnimationFrame(tick)};
  requestAnimationFrame(tick);
 }
 function setMusic(key){
  if(muted||!unlocked)return;
  if(intro){stop(intro,180);intro=null}
  if(music&&musicKey===key&&!music.paused)return;
  if(music)stop(music,500);
  music=new Audio(url(files[key]));music.preload='auto';music.loop=true;music.volume=0;musicKey=key;active.add(music);
  const current=music;const promise=current.play();if(promise&&promise.catch)promise.catch(()=>active.delete(current));fadeIn(current,.18,600);
 }
 function startIntro(){
  if(muted||!unlocked)return;
  intro=play('intro',.18,false);
  if(!intro){setMusic('musicIdle');return}
  const current=intro;current.addEventListener('ended',()=>{active.delete(current);if(intro===current)intro=null;if(!muted)setMusic(spinning?'musicMain':'musicIdle')},{once:true});
 }
 function stopAll(){for(const audio of [...active]){audio.pause();audio.currentTime=0;active.delete(audio)}music=null;musicKey='';intro=null;reelLoop=null;bigWinLevel=null}
 function updateButton(){const label=muted?'Activar sonido':'Silenciar sonido';button.textContent=muted?'🔇':'🔊';button.title=label;button.setAttribute('aria-label',label);button.setAttribute('aria-pressed',String(muted))}
 function setMuted(value){muted=Boolean(value);try{localStorage.setItem('ggbg-sound-muted',muted?'1':'0')}catch{}if(muted)stopAll();else if(unlocked)setMusic(spinning?'musicMain':'musicIdle');updateButton()}
 function unlock(event){if(unlocked)return;unlocked=true;if(!muted&&!event?.target?.closest?.('#spin'))startIntro()}
 document.addEventListener('pointerdown',unlock,{capture:true,once:true});
 document.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' ')unlock(event)},{capture:true});
 button.addEventListener('click',()=>setMuted(!muted));
 document.addEventListener('click',event=>{const target=event.target.closest?.('button');if(!target||target.id==='ggbgSoundToggle'||target.id==='spin')return;play(Math.random()<.5?'click':'clickAlt',.32)},false);
 window.addEventListener('slot:spin-start',event=>{const isFreeSpin=Boolean(event.detail?.isFreeSpin);if(isFreeSpin&&!freeSpinMode)setTimeout(()=>play('fsTransition',.45),140);freeSpinMode=isFreeSpin;spinning=true;spinCues.clear();play('spin',.62);if(reelLoop)stop(reelLoop,80);reelLoop=play('reelLoop',.28,true);setMusic('musicMain')});
 window.addEventListener('slot:reel-stop',event=>{
  const detail=event.detail||{},column=Number(detail.column),index=Number.isFinite(column)?Math.max(0,Math.min(files.reelStops.length-1,column)):0,keys=Array.isArray(detail.keys)?detail.keys:[];
  play(`reelStop${index+1}`,.48);
  const special=keys.some(key=>key==='scatter-heaven'||key==='scatter-hell')?'scatter':keys.includes('wild')?'wild':null;
  if(special&&!spinCues.has(special)){spinCues.add(special);play(special,special==='scatter'?.5:.42)}
  if(index===files.reelStops.length-1&&reelLoop){stop(reelLoop,180);reelLoop=null}
 });
 window.addEventListener('slot:spin-result',event=>{
  spinning=false;const detail=event.detail||{};if(reelLoop){stop(reelLoop,160);reelLoop=null}setMusic('musicIdle');
  if(detail.awarded>0){if(detail.scatterCount>0)play('scatterTrigger',.7);setTimeout(()=>play('fsTriggered',.62),220)}
  const bet=Number(detail.bet)||0,amount=Number(detail.totalWin)||0,multiplier=bet?amount/bet:0,big=Number(cfg.defaults?.bigWinBetMultiplier)||Infinity;
  if(amount>0&&multiplier<big){const tier=multiplier>=20?'winL':multiplier>=8?'winM':multiplier>=3?'winS':'winXS';play(tier,.62)}
 });
 window.addEventListener('slot:low-win-start',()=>play('winL',.72));
 window.addEventListener('slot:big-win-start',event=>{
  const detail=event.detail||{},multiplier=Number(detail.multiplier)||0,base=Number(cfg.defaults?.bigWinBetMultiplier)||1000;
  const level=multiplier>=base*3?3:multiplier>=base*2?2:1;
  play('bigAccent',.78);setTimeout(()=>{if(!muted)bigWinLevel=play(`bigLevel${level}`,.62)},170);
 });
 window.addEventListener('slot:autoplay-change',event=>{if(event.detail?.active===false)play('stop',.38)});
 const bigScreen=document.getElementById('bigWinScreen');
 if(bigScreen){const observer=new MutationObserver(()=>{if(bigScreen.getAttribute('aria-hidden')==='true'&&bigWinLevel){stop(bigWinLevel,80);bigWinLevel=null;play('bigOutro',.55)}});observer.observe(bigScreen,{attributes:true,attributeFilter:['aria-hidden']})}
 if(!muted)updateButton();
})();
