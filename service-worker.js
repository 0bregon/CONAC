const CACHE_NAME = 'conac-cache-v1';
const ARCHIVOS_A_GUARDAR = [
    'index.html',
    'CONAC.html',
    'asentamientos.html',
    'veraguas.html',
    'noticias.html',
    'noticia-gira.html',
    'galeria.html',
    'luchas.html',
    'contacto.html',
    'estilos.css',
    'js/menu.js',
    'imagenes/CONAC_LOGO.svg',
    'imagenes/icono-192.png',
    'imagenes/icono-512.png'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ARCHIVOS_A_GUARDAR);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((respuestaEnCache) => {
            return respuestaEnCache || fetch(event.request);
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((nombres) => {
            return Promise.all(
                nombres.filter((nombre) => nombre !== CACHE_NAME)
                       .map((nombre) => caches.delete(nombre))
            );
        })
    );
});