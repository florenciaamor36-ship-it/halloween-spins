# Chicken Fire — reconstrucción experimental (NO LISTA PARA USO PÚBLICO)

Trabajo en curso fuera del menú. Vista web 3×3 con cinco líneas y artes originales de usuario. Se incluyen música y efectos originales, convertidos o reempaquetados para navegador. No es la implementación ni el runtime oficial del juego y no comparte todavía el motor principal.

La tabla de pagos se transcribió de una captura pública que muestra apuestas de 0.10: https://wolfbet.com/blog/wp-content/uploads/2026/11/chicken-fire-gameplay-3.webp y https://wolfbet.com/blog/wp-content/uploads/2026/11/chicken-fire-gameplay-2.webp. Mecánicas descritas: https://bgaming.com/news/bgamings-chicken-fire-hatches-a-fruit-slot-built-for-mobile y https://www.aboutslots.com/casino-slots/chicken-fire. Fotografías de referencia: https://www.aboutslots.com/casino-slots/chicken-fire.

El RNG, probabilidades y la selección de valores de moneda son provisionales y NO son oficiales. Las apariciones de jackpots dentro de la demo también usan una frecuencia inventada. El orden exacto del bonus, el cómputo del giro que lo activa, los jackpots y las variantes de compra no están validados contra el juego real. El segundo botón de compra (Super) y Chance x2 están deshabilitados; autoplay no está implementado. No anunciar RTP; no tratar este prototipo como terminado ni como una reproducción fiel.

Pruebas unitarias del cálculo de líneas y del bonus: `node mechanics.test.mjs`. La vista web y el audio no se han podido validar visualmente en esta sesión porque el navegador de pruebas no responde. Pendiente: pruebas de navegador, integración al motor principal, probar transiciones y sonidos contra la demo y revisión visual de la usuaria.
