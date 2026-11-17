HEARTS OF VENUS — ASSETS PARA PREVIEW AISLADA

La máscara está en hearts-of-venus-preview.html y usa el motor compartido Phaser/SlotEngine, la hoja de estilos común y los símbolos extraídos.

ORIGEN: 10 imágenes transparentes se extrajeron de texturas inline de la demo pública. venus-scatter-captured.png es un recorte de la captura real de juego, no un sprite limpio de atlas. wild-demo.png y bonus-demo.png son marcadores creados para esta preview, no arte original del proveedor.

AUDIO: audio-sprite.opus concatena los 196 clips Ogg/Vorbis capturados (reencodeados a Opus para alojarlos como un recurso); audio-sprite-map.json registra el intervalo de cada clip. Los archivos JSON de sonidos originales se conservan en source-json/. Los IDs son hashes de recursos, no nombres de eventos: no había mapeo evento→sonido verificable. El controlador usa clips de muestra al girar y al finalizar con premio, sin atribuirles nombres de evento oficiales.

JSON: source-json/ conserva manifest, metadatos de juego, idioma/UI y los dos JSON con recursos de audio. La captura contuvo otros JSON fragmentarios y no se presenta esa extracción parcial como una integración completa de la configuración oficial.

LÓGICA: esta es una preview aislada. Los valores de pago, pesos y premios configurados en themes/hearts-of-venus.js son solo de demostración: no son los del proveedor, no certifican ni reproducen el RTP/RNG y no hay dinero real ni backend. No cambiar la página principal Hearts of Venus ni otras máquinas sin aprobación posterior.
