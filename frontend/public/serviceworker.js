
const CacheName = "version-1";
const UrlsCache = ['index.html'];

const self = this;

// evento de instalação do service worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CacheName)
            .then((cache) => {
                console.log('Cache Aberto');
                return cache.addAll(UrlsCache);
            })
    );
});

// listen para requests 
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then(() => {
                return fetch(event.request)

            })
    );
});

// ativar o SW (event listener)
self.addEventListener('activate', (event) => {
    // remova todos os caches anteriores 
    const cacheWhiteList = [];
    cacheWhiteList.push(CacheName);
    event.waitUntil(
        caches.keys().then((cacheNames) => Promise.all(
            cacheNames.map((x) => {
                if (!cacheWhiteList.includes(x)) {
                    return caches.delete(x);
                }
                return caches;
            })
        ))
    );
});
