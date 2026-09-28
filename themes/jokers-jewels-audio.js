(() => {
  const root = 'assets/jokers-jewels/audio/original/bundles/';
  const probe = new Audio();
  const useOgg = Boolean(probe.canPlayType('audio/ogg; codecs="vorbis"'));
  const format = useOgg ? 'ogg' : 'mp3';
  const mime = useOgg ? 'audio/ogg' : 'audio/mpeg';
  const ids = {
    introMusic: '03f479c4b31870b46a50406a8f4210aa',
    highWin: '5a0f1cd858b757447bc8922c77638eda',
    symbolWin: '8f89a6bf762dfd94ca4af48db13aaba6',
    bonus: '8d33b7e80ab75454598a7d74ea9e7644',
    guitaritaStop: '449b467a62eb8f146958821523282d81',
    // The third reel stop has no assigned clip.
    reelStops: [
      '2c5945eef37c8f843989fc1feaa5f774',
      '8b11b54b721817d4ba95cfacd79af491',
      null,
      '42e7dee34b4ce9442bbf2c7f71a5b613',
      '41965fe4f5e42d44baf4babc1245047c'
    ]
  };
  const sources = new Map();
  const pool = new Map();
  let muted = false;
  let started = false;
  let currentMusic = 'paused';
  let musicGeneration = 0;
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
  const pauseIdleMusic = () => {
    currentMusic = 'paused';
    musicGeneration++;
    const audio = pool.get('intro-music');
    if (audio) { audio.pause(); audio.currentTime = 0; }
  };
  const startIdleMusic = () => {
    started = true;
    currentMusic = 'idle';
    const generation = ++musicGeneration;
    const existing = pool.get('intro-music');
    if (existing) { existing.pause(); existing.currentTime = 0; }
    if (muted) return;
    ready.then(() => {
      if (muted || generation !== musicGeneration) return;
      const url = sources.get(ids.introMusic);
      if (!url) return;
      const audio = getAudio('intro-music', url, true);
      audio.currentTime = 0;
      const result = audio.play();
      if (result?.catch) result.catch(() => {});
    });
  };
  const stopAll = () => pool.forEach(audio => { audio.pause(); audio.currentTime = 0; });
  const setMuted = value => {
    muted = Boolean(value);
    if (muted) stopAll(); else if (started && currentMusic === 'idle') startIdleMusic();
    window.dispatchEvent(new CustomEvent('slot:sound-change', { detail: { muted } }));
    return muted;
  };

  // Start idle music only after the first user gesture (browser autoplay policy).
  const startIdleAfterPointer = event => {
    if (!started && !event.target?.closest?.('#spin')) startIdleMusic();
  };
  const startIdleAfterKey = event => {
    if (!started && !['Space', 'Enter'].includes(event.code)) startIdleMusic();
  };
  document.addEventListener('pointerdown', startIdleAfterPointer, { once: true, capture: true });
  document.addEventListener('keydown', startIdleAfterKey, { once: true, capture: true });

  // Spin and reel motion are intentionally silent; stop any idle loop while spinning.
  window.addEventListener('slot:spin-start', pauseIdleMusic);
  window.addEventListener('slot:reel-stop', event => {
    const detail = event.detail || {};
    const column = Number(detail.column) || 0;
    const landedSymbols = Array.isArray(detail.keys) ? detail.keys : [];
    if (landedSymbols.includes('mandolin')) {
      play(`guitarita-stop-${column}`, ids.guitaritaStop);
      return;
    }
    const stopId = ids.reelStops[column];
    if (stopId) play(`reel-stop-${column}`, stopId);
  });
  window.addEventListener('slot:spin-result', event => {
    startIdleMusic();
    const result = event.detail || {};
    if (Number(result.totalWin) > 0) play('symbol-win', ids.symbolWin);
    if (Number(result.scatterCount) >= 3) play('bonus', ids.bonus);
  });
  window.addEventListener('slot:big-win-start', () => play('high-win', ids.highWin));

  window.SLOT_JJ_AUDIO = Object.freeze({
    format,
    ready,
    isMuted: () => muted,
    toggleMute: () => setMuted(!muted),
    setMuted,
    // Generic GUI sounds remain unmapped until their event IDs are identified.
    playUi: () => {}
  });
})();
