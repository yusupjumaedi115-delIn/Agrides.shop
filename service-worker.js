const CACHE_NAME = 'agrishop-v1';
const urlsToCache = [
  'index.html',
  'manifest.json',
  'assets/icon.png',
  'assets/sayur.jpg',
  'assets/kangkung.jpg',
  'assets/pupuk.jpg',
  'assets/beras.jpg',
  'assets/bibit_tomat.jpg',
  'assets/madu.jpg',
  'assets/keripik.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(k => { if (k !== CACHE_NAME) return caches.delete(k); })
    ))
  );
});