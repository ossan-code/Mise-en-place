const CACHE_NAME = 'meal-planner-v1';
const urlsToCache = [
  '/',
  '/index.html'
];

// Install the service worker and open the cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch from cache when offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from internet
        return response || fetch(event.request);
      })
  );
});
