const CACHE_NAME = 'mairaburger-cache-v1';
const FONT_CACHE = 'mairaburger-fonts-v1';
const PRECACHE_ASSETS = [
  './',
  './index.html',
  './styles.css',
  './script.js',
  './firebase-config.js',
  './manifest.webmanifest'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Navegación: estrategia network-first con fallback al index cacheado
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put('./index.html', copy));
          return response;
        })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  // Solo cachear GET
  if (request.method !== 'GET') {
    return;
  }

  const url = new URL(request.url);

  // Cachear Google Fonts y Font Awesome (cross-origin)
  const FONT_CDN_HOSTS = ['fonts.googleapis.com', 'fonts.gstatic.com', 'cdnjs.cloudflare.com'];
  if (FONT_CDN_HOSTS.includes(url.host) && (request.destination === 'style' || request.destination === 'font')) {
    event.respondWith(
      caches.open(FONT_CACHE).then((cache) => {
        return cache.match(request).then((cached) => {
          const network = fetch(request).then((response) => {
            // Cachea también respuestas opacas para poder usar offline
            if (response) {
              cache.put(request, response.clone());
            }
            return response;
          }).catch(() => cached);
          return cached || network;
        });
      })
    );
    return;
  }

  // Para recursos del mismo origen: cache-first con actualización en segundo plano
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(request).then((cached) => {
        const networkFetch = fetch(request).then((response) => {
          // Evitar cachear respuestas opacas o no válidas
          if (!response || response.status !== 200 || response.type === 'opaque') {
            return response;
          }
          const respClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, respClone));
          return response;
        }).catch(() => cached);

        // Si hay cache, devolverlo inmediatamente; de lo contrario, esperar red
        return cached || networkFetch;
      })
    );
  } else {
    // Cross-origin: network-first y no cachear respuestas opacas
    event.respondWith(
      fetch(request).catch(() => caches.match(request))
    );
  }
});