/* Audio bridge driven by original sound JSON and Unity config event map. */
(() => {
 const base='assets/hearts-of-venus/source-json/';
 const configUrl=base+'audio-event-map.json';
 let cfg=null, sources={game:new Map(),gui:new Map()}, ready=false, current=null;
 const cache=new Map();
 const load=async()=>{const c=await fetch(configUrl).then(r=>{if(!r.ok)throw Error('audio-event-map '+r.status);return r.json()});const [game,gui]=await Promise.all([fetch(base+'0089_sounds.ogg.json').then(r=>{if(!r.ok)throw Error('game sounds '+r.status);return r.json()}),fetch(base+'0085_GUI_sounds.ogg.json').then(r=>{if(!r.ok)throw Error('GUI sounds '+r.status);return r.json()})]);for(const s of game.sounds||[])sources.game.set(s.id,s.data);for(const s of gui.sounds||[])sources.gui.set(s.id,s.data);cfg=c;ready=true;};
 function audioFor(event){if(!ready)return null;const spec=cfg.events[event];if(!spec)return null;const key=spec.source+':'+spec.id;if(cache.has(key))return cache.get(key);const encoded=sources[spec.source]?.get(spec.id);if(!encoded){console.warn('Configured Venus sound ID missing from source JSON',event,spec.id);return null;}const raw=atob(encoded),bytes=new Uint8Array(raw.length);for(let i=0;i<raw.length;i++)bytes[i]=raw.charCodeAt(i);const url=URL.createObjectURL(new Blob([bytes],{type:'audio/ogg'}));cache.set(key,url);return url;}
 function play(event,volume=.5){const url=audioFor(event);if(!url)return;try{if(current){current.pause();current.currentTime=0;}current=new Audio(url);current.volume=volume;current.play().catch(()=>{});}catch(e){console.warn('Venus source sound playback failed',event,e);}}
 load().catch(e=>console.warn('Original Venus audio JSON/config unavailable',e));
 window.addEventListener('slot:spin-start',()=>play('uiSpinPressed',.48));
 window.addEventListener('slot:reel-stop',e=>{if(e.detail?.column===0)play('reelStart',.36)});
 window.addEventListener('slot:spin-result',e=>{if((e.detail?.totalWin||0)>0)play('spinWin',.55)});
 window.addEventListener('pagehide',()=>{if(current)current.pause();for(const url of cache.values())URL.revokeObjectURL(url);cache.clear()});
})();
