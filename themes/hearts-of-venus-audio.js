/* Audio bridge driven by original sound JSON and Unity config event map. */
(() => {
 const base='assets/hearts-of-venus/source-json/';
 const configUrl=base+'audio-event-map.json';
 let cfg=null, sources={game:new Map(),gui:new Map()}, ready=false;
 const cache=new Map(), active=new Set(), diagnostics={ready:false,configuredEvent:'Evt_DataToCode_Pressed_Spin',whenToPlay:0,soundId:null,plays:[]};
 window.__VENUS_AUDIO_TEST=diagnostics;
 const load=async()=>{const c=await fetch(configUrl).then(r=>{if(!r.ok)throw Error('audio-event-map '+r.status);return r.json()});const gui=await fetch(base+'0085_GUI_sounds.ogg.json').then(r=>{if(!r.ok)throw Error('GUI sounds '+r.status);return r.json()});for(const s of gui.sounds||[])sources.gui.set(s.id,s.data);cfg=c;ready=true;diagnostics.ready=true;diagnostics.soundId=cfg.events.uiSpinPressed?.id||null;};
 function audioFor(event){if(!ready)return null;const spec=cfg.events[event];if(!spec)return null;const key=spec.source+':'+spec.id;if(cache.has(key))return cache.get(key);const encoded=sources[spec.source]?.get(spec.id);if(!encoded){console.warn('Configured Venus sound ID missing from source JSON',event,spec.id);return null;}const raw=atob(encoded),bytes=new Uint8Array(raw.length);for(let i=0;i<raw.length;i++)bytes[i]=raw.charCodeAt(i);const url=URL.createObjectURL(new Blob([bytes],{type:'audio/ogg'}));cache.set(key,url);return url;}
 function play(event,volume=.5){const url=audioFor(event);if(!url){diagnostics.plays.push({event,ok:false,error:'No mapped audio URL'});return;}try{const player=new Audio(url),rec={event,id:cfg.events[event]?.id||null,src:url,playPromise:'pending',playing:false,error:null,duration:null};diagnostics.plays.push(rec);active.add(player);player.addEventListener('loadedmetadata',()=>rec.duration=player.duration,{once:true});player.addEventListener('playing',()=>rec.playing=true,{once:true});player.addEventListener('ended',()=>active.delete(player),{once:true});player.addEventListener('error',()=>{rec.error=player.error?.message||`media error ${player.error?.code}`;active.delete(player)},{once:true});player.volume=volume;player.play().then(()=>rec.playPromise='resolved').catch(e=>{rec.playPromise='rejected';rec.error=String(e);active.delete(player)});}catch(e){diagnostics.plays.push({event,ok:false,error:String(e)});console.warn('Venus source sound playback failed',event,e);}}
 load().catch(e=>console.warn('Original Venus audio JSON/config unavailable',e));
 document.addEventListener('click',e=>{if(e.target?.closest?.('#spin'))play('uiSpinPressed',.48)},true);
 window.addEventListener('pagehide',()=>{for(const player of active)player.pause();active.clear();for(const url of cache.values())URL.revokeObjectURL(url);cache.clear()});
})();
