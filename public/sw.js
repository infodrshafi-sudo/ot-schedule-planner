/* Rivershore OT Planner: app-shell caching only. Cloud records and API calls always go to the network. */
const CACHE_NAME = 'rivershore-ot-shell-v9';
const APP_SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(APP_SHELL);
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys
      .filter(key => key.startsWith('rivershore-ot-shell-') && key !== CACHE_NAME)
      .map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Never cache Cloudflare Functions/API responses or data mutations.
  if (url.pathname.includes('/api/')) return;

  // Keep page navigation online-first so deployments are picked up immediately.
  if (request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const response = await fetch(request);
        if (response && response.ok && response.type === 'basic') {
          const cache = await caches.open(CACHE_NAME);
          await cache.put(request, response.clone());
          await cache.put('./index.html', response.clone());
        }
        return response;
      } catch (error) {
        return (await caches.match(request)) ||
          (await caches.match('./index.html')) ||
          new Response('Rivershore OT Planner is unavailable offline. Open the app once while connected to the internet.', {
            status: 503,
            headers: { 'Content-Type': 'text/plain; charset=utf-8' }
          });
      }
    })());
    return;
  }

  // Cache-first only for the small static app-shell files (manifest and icons).
  const isAppShellAsset = url.pathname.endsWith('/manifest.webmanifest') ||
    url.pathname.includes('/icons/');
  if (isAppShellAsset) {
    event.respondWith((async () => {
      const cached = await caches.match(request);
      if (cached) return cached;
      const response = await fetch(request);
      if (response && response.ok) {
        const cache = await caches.open(CACHE_NAME);
        await cache.put(request, response.clone());
      }
      return response;
    })());
  }
});
