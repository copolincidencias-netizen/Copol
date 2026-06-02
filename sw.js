const CACHE_NAME = 'copol-v27';
const ASSETS = [
  '/Copol/COPOL_v25.html',
  '/Copol/manifest.json'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
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

self.addEventListener('fetch', e => {
  const url = e.request.url;
  // No interceptar Firebase, Anthropic, Cloudinary ni APIs externas
  if(url.includes('firestore.googleapis.com') ||
     url.includes('firebase') ||
     url.includes('anthropic.com') ||
     url.includes('cloudinary.com') ||
     url.includes('photon.komoot.io') ||
     url.includes('api.') ||
     e.request.method !== 'GET'){
    return; // dejar pasar sin interceptar
  }
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
