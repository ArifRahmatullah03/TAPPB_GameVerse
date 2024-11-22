/* eslint-disable no-restricted-globals */
const CACHE_NAME = "gameverse-cache-v1";
const urlsToCache = ["/", "/index.html", "/static/js/bundle.js", "/static/css/main.css"];

// Event 'install' untuk caching awal
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log("Cache opened:", CACHE_NAME);
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.error("Failed to cache resources during install:", error);
      })
  );
  // Memastikan service worker langsung diaktifkan tanpa menunggu reload
  self.skipWaiting();
});

// Event 'fetch' untuk melayani cache terlebih dahulu, lalu fallback ke network
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cache jika ada, jika tidak fallback ke fetch
        return response || fetch(event.request);
      })
      .catch(error => {
        console.error("Fetch failed:", error);
        throw error;
      })
  );
});

// Event 'activate' untuk menghapus cache lama
self.addEventListener("activate", event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys()
      .then(cacheNames => 
        Promise.all(
          cacheNames.map(cacheName => {
            if (!cacheWhitelist.includes(cacheName)) {
              console.log("Deleting old cache:", cacheName);
              return caches.delete(cacheName);
            }
            return null;
          }).filter(Boolean) // Menghapus nilai null
        )
      )
      .catch(error => {
        console.error("Error during activation:", error);
      })
  );
});
