// Чтобы выпустить обновление, поменяйте номер версии: sklad-v4, sklad-v5 и так далее
const V = "sklad-v3";
const FILES = ["./", "index.html", "manifest.json", "icon-192.png", "icon-512.png"];

// cache: "reload" заставляет брать свежие файлы с сервера, а не из временной памяти браузера
self.addEventListener("install", e =>
  e.waitUntil(caches.open(V)
    .then(c => c.addAll(FILES.map(f => new Request(f, { cache: "reload" }))))
    .then(() => self.skipWaiting())));

self.addEventListener("activate", e =>
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== V).map(k => caches.delete(k))))
    .then(() => self.clients.claim())));

self.addEventListener("fetch", e =>
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request))));
