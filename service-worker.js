/*
  SERVICE WORKER — «фоновый помощник» приложения.
  Его задача: запомнить файлы приложения, чтобы оно открывалось
  ДАЖЕ БЕЗ ИНТЕРНЕТА (курсы тогда покажутся запасные).
  Именно service worker + manifest.json превращают сайт в
  устанавливаемое приложение (PWA).

  Работает он только когда приложение открыто по ссылке (http/https),
  а не с диска (file://). Поэтому его эффект ты увидишь после того,
  как мы выложим приложение в интернет.
*/

const CACHE = "valuta-v1"; // имя "кладовки" с файлами

// Файлы, которые сохраняем для работы офлайн.
const FILES = [
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png"
];

// При установке — складываем файлы в кэш.
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(FILES))
  );
});

// При каждом запросе — сначала пробуем отдать из кэша, если нет — из сети.
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
