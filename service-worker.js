// service-worker.js
const CACHE_NAME = 'my-cache-v1';
const urlsToCache = [
  '/',
  'index.html',
  'style.css',
  'script.js',
  'app_icon_img.jpg',
  'app_icon_img.jpg'
];

// インストール時にキャッシュする
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

// フェッチイベントでキャッシュから取得する
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // キャッシュにヒットした場合はそれを返す
        if (response) {
          return response;
        }
        // キャッシュに無い場合はネットワークから取得する
        return fetch(event.request);
      })
  );
});
