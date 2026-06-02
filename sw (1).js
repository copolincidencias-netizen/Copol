const CACHE_NAME = 'copol-v28';

self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// No interceptar ninguna petición — dejar pasar todo directamente
self.addEventListener('fetch', e => {
  // Sin caché — todo va directo a la red
});
