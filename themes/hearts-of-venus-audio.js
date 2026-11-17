/* Audio bridge for the shared SlotEngine. The captured resource IDs are not mapped
   to official events, so this preview cycles through short captured clips by length. */
(() => {
 const base='assets/hearts-of-venus/';
 let map=[];let player=null;let stopTimer=null;let cursor=0;let audioReady=false;
 const load=fetch(base+'audio-sprite-map.json').then(r=>r.json()).then(d=>{map=(d.sounds||[]).filter(x=>x.duration>=.16&&x.duration<=3.6);audioReady=true}).catch(e=>console.warn('Venus captured audio index unavailable',e));
 function playClip(kind){if(!audioReady||!map.length)return;const pool=kind==='win'?map.filter(x=>x.duration>=.5&&x.duration<=3.6):map.filter(x=>x.duration>=.16&&x.duration<=1.4);if(!pool.length)return;const clip=pool[cursor++%pool.length];if(stopTimer)clearTimeout(stopTimer);if(!player)player=new Audio(base+'audio-sprite.opus');player.pause();player.volume=.52;const start=()=>{player.currentTime=clip.start;player.play().catch(()=>{})};if(player.readyState>=1)start();else player.addEventListener('loadedmetadata',start,{once:true});stopTimer=setTimeout(()=>{player?.pause()},Math.max(120,clip.duration*1000));}
 window.addEventListener('slot:spin-start',()=>playClip('spin'));
 window.addEventListener('slot:reel-stop',e=>{if(e.detail?.column===5)playClip('spin')});
 window.addEventListener('slot:spin-result',e=>{if((e.detail?.totalWin||0)>0||e.detail?.awarded)playClip('win')});
 window.addEventListener('pagehide',()=>{if(stopTimer)clearTimeout(stopTimer);player?.pause()});
})();