const CACHE_NAME = 'schedule-cache-v1';

// Список файлов, которые нужно закэшировать при установке.
// Это "скелет" вашего приложения.
const URLS_TO_CACHE = [
  'index.html',
  'WhiteGround.png',
  'BlackGround.png',
  'mathan.html',
  'favicon.png',
  'laplas.html',
];

// 1. Установка Service Worker и кэширование файлов
self.addEventListener('install', (event) => {
  // Мы ждем, пока кэширование не будет завершено
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Кэш открыт');
        // Добавляем все нужные файлы в кэш
        return cache.addAll(URLS_TO_CACHE);
      })
  );
});

// 2. Перехват запросов (fetch)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    // Ищем соответствующий запрос в кэше
    caches.match(event.request)
      .then((response) => {
        // Если ответ найден в кэше, возвращаем его
        if (response) {
          return response;
        }
        // Если в кэше ответа нет, делаем реальный сетевой запрос
        return fetch(event.request);
      })
  );
});