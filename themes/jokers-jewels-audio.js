(() => {
  const root = 'assets/jokers-jewels/audio/original/bundles/';
  const probe = new Audio();
  const useOgg = Boolean(probe.canPlayType('audio/ogg; codecs="vorbis"'));
  const format = useOgg ? 'ogg' : 'mp3';
  const mime = useOgg ? 'audio/ogg' : 'audio/mpeg';
  const ids = {
    spinLayer: '5a0f1cd858b757447bc8922c77638eda',
    reelStart: '7466eae9fa1a8ca43ba573a19bfd04d6',
    symbolWin: '8f89a6bf762dfd94ca4af48db13aaba6',
    bonus: '8d33b7e80ab75454598a7d74ea9e7644',
    paytableButton: 'eb676f1125280a44ea444439633afbe0',
    reelStops: [
      '2c5945eef37c8f843989fc1feaa5f774',
      '8b11b54b721817d4ba95cfacd79af491',
      '001df54acc624694a94820f46856578b',
      '42e7dee34b4ce9442bbf2c7f71a5b613',
      '41965fe4f5e42d44baf4babc1245047c'
    ]
  };
  const sources = new Map();
  const pool = new Map();
  let muted = false;
  let started = false;
  const decode = encoded => {
    const binary = atob(encoded);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return bytes;
  };
  const loadBundle = async name => {
    const response = await fetch(`${root}${name}.${format}.json`, { cache: 'force-cache' });
    if (!response.ok) throw new Error(`Audio bundle unavailable: ${name}`);
    const pack = await response.json();
    for (const entry of pack.sounds || []) {
      if (!sources.has(entry.id)) sources.set(entry.id, URL.createObjectURL(new Blob([decode(entry.data)], { type: mime })));
    }
  };
  const ready = loadBundle('sounds').catch(() => {});
  loadBundle('GUI_sounds').catch(() => {});
  const getAudio = (key, url, loop = false) => {
    if (!pool.has(key)) {
      const audio = new Audio(url);
      audio.preload = 'auto';
      audio.loop = loop;
      audio.volume = loop ? 0.42 : 0.68;
      pool.set(key, audio);
    }
    return pool.get(key);
  };
  const play = (key, id, loop = false) => {
    if (muted || !id) return;
    ready.then(() => {
      if (muted) return;
      const url = sources.get(id);
      if (!url) return;
      const audio = getAudio(key, url, loop);
      if (!loop && !audio.paused) audio.currentTime = 0;
      const result = audio.play();
      if (result?.catch) result.catch(() => {});
    });
  };
  const startMusic = () => {
    if (muted) return;
    started = true;
    play('spin-layer', ids.spinLayer, true);
  };
  const stopAll = () => pool.forEach(audio => { audio.pause(); audio.currentTime = 0; });
  const setMuted = value => {
    muted = Boolean(value);
    if (muted) stopAll(); else if (started) startMusic();
    window.dispatchEvent(new CustomEvent('slot:sound-change', { detail: { muted } }));
    return muted;
  };

  window.addEventListener('slot:spin-start', () => {
    startMusic();
    play('reel-start', ids.reelStart);
  });
  window.addEventListener('slot:reel-stop', event => {
    const column = Number(event.detail?.column) || 0;
    play(`reel-stop-${column}`, ids.reelStops[column] || ids.reelStops[0]);
  });
  window.addEventListener('slot:spin-result', event => {
    const result = event.detail || {};
    if (Number(result.totalWin) > 0) play('symbol-win', ids.symbolWin);
    if (Number(result.scatterCount) >= 3) play('bonus', ids.bonus);
  });
  window.addEventListener('slot:paytable-open', () => play('paytable-button', ids.paytableButton));
  window.addEventListener('slot:paytable-close', () => play('paytable-button', ids.paytableButton));
  window.addEventListener('slot:bet-change', () => play('paytable-button', ids.paytableButton));

  window.SLOT_JJ_AUDIO = Object.freeze({
    format,
    ready,
    isMuted: () => muted,
    toggleMute: () => setMuted(!muted),
    setMuted,
    playUi: name => { if (name === 'button') play('paytable-button', ids.paytableButton); }
  });
})();
