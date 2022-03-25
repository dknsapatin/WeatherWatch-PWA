const CACHE_NAME = "version-1";
const urlsToCache = ["index.html", "offline.html"];

const self = this;

// Install SW
self.addEventListener("install", (event) => {
  // waiting until something is done
  event.waitUntil(
    //   Open the cache     | Return a promise
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");

      return cache.addAll(urlsToCache);
    })
  );
});

// Listen for requests
self.addEventListener("fetch", (event) => {
  // We respond
  event.respondWith(
    // Match all the request that the pages are saving
    caches
      .match(event.request)
      // Then for all the request
      .then(() => {
        // fetch them again
        return (
          fetch(event.request)
            // If theres no internet connection match them with offline
            .catch(() => caches.match("offline.html"))
        );
      })
  );
});

// Activate the SW
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [];
  cacheWhitelist.push(CACHE_NAME);

  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
