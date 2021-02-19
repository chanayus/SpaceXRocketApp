var cacheVersion = 1;
var currentCache = {
  offline: 'offline-cache' + cacheVersion
};;
var offlineUrl = 'offline.html';
var urlsToCache = [
    offlineUrl
];

// Install a service worker
this.addEventListener('install', event => {
    // Perform install steps
    event.waitUntil(
        caches.open(currentCache.offline)
            .then(function (cache) {
                return cache.addAll(urlsToCache);
            })
    );
});

// Cache and return requests
this.addEventListener('fetch', event => {
    if (event.request.mode === 'navigate' || (event.request.method === 'GET' && event.request.headers.get('accept').includes('text/html'))) {
        event.respondWith(
          fetch(event.request.url).catch(error => {
              // Return the offline page
              return caches.match(offlineUrl);
          })
    );
  }
  else{
    // Respond with everything else if we can
    event.respondWith(caches.match(event.request)
                    .then(function (response) {
                    return response || fetch(event.request);
                })
        );
  }
    
});

// Update a service worker
this.addEventListener('activate', event => {
    var cacheWhitelist = ['pwa-task-manager'];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});