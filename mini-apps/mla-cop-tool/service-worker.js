const CACHE_NAME = 'mla-cop-v1';
const ASSETS = [
  '/mini-apps/mla-cop-tool/',
  '/mini-apps/mla-cop-tool/index.html',
  '/mini-apps/mla-cop-tool/app.html',
  '/mini-apps/mla-cop-tool/css/main.css',
  '/mini-apps/mla-cop-tool/css/print.css',
  '/mini-apps/mla-cop-tool/js/storage.js',
  '/mini-apps/mla-cop-tool/js/case-studies.js',
  '/mini-apps/mla-cop-tool/js/app.js',
  '/mini-apps/mla-cop-tool/js/results.js',
  '/mini-apps/mla-cop-tool/js/import.js',
  '/mini-apps/mla-cop-tool/js/analytics.js',
  '/mini-apps/mla-cop-tool/manifest.json',
  '/mini-apps/mla-cop-tool/assets/mla_logo.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => 
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request).then(response => {
        if (response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      });
    }).catch(() => {
      if (event.request.mode === 'navigate') {
        return caches.match('/mini-apps/mla-cop-tool/app.html');
      }
    })
  );
});