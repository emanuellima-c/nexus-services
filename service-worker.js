// CHAMA Serviços — Service Worker
// Cache "app shell" para funcionamento offline básico.

const CACHE_NAME = "chama-v1";

const FILES = [
  "./",
  "./index.html",
  "./login.html",
  "./servicos.html",
  "./detalhes.html",
  "./perfil.html",
  "./css/style.css",
  "./js/script.js",
  "./js/data.js",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return (
        cached ||
        fetch(event.request).catch(() => {
          // Sem rede e sem cache: deixa o navegador lidar com o erro.
        })
      );
    })
  );
});
