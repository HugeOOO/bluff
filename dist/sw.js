const cachePrefix = 'bluff-shell-';
const cacheName = cachePrefix + 'v116';
const appShell = [
  './',
  './styles.css?v=116',
  './app.js?v=116',
  './words.js?v=116',
  './categories.js?v=116',
  './word-deck.js?v=116',
  './discussion-timer.js?v=116',
  './ruler-motion.js?v=116',
  './presets.js?v=116',
  './manifest.webmanifest',
  './icons/grain.png',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/maskable-512.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) =>
      cache.addAll(appShell.map((url) => new Request(url, { cache: 'reload' })))
    )
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(
      names.filter((name) => name.startsWith(cachePrefix) && name !== cacheName)
        .map((name) => caches.delete(name))
    );
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) {
    return;
  }

  if (request.mode === 'navigate') {
    event.respondWith(fetch(request).catch(async () =>
      (await caches.open(cacheName)).match('./')
    ));
    return;
  }

  event.respondWith((async () => {
    const cache = await caches.open(cacheName);
    return (await cache.match(request)) ?? fetch(request);
  })());
});
