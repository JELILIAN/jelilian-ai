// Service Worker for JELILIAN - 缓存优化
const CACHE_NAME = 'jelilian-v1.0.0';
const urlsToCache = [
    '/',
    '/index.html',
    '/styles.min.css',
    '/styles.css',
    '/script.js',
    '/api.js',
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
];

// 安装Service Worker
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// 拦截网络请求
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                // 如果缓存中有，直接返回
                if (response) {
                    return response;
                }
                
                // 否则发起网络请求
                return fetch(event.request).then(function(response) {
                    // 检查是否是有效响应
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }
                    
                    // 克隆响应
                    const responseToCache = response.clone();
                    
                    caches.open(CACHE_NAME)
                        .then(function(cache) {
                            cache.put(event.request, responseToCache);
                        });
                    
                    return response;
                });
            })
    );
});

// 清理旧缓存
self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});