'use strict';

var CACHE_NAME = 'Gridrunner';
var urlsToCache = [
  'c64/c64_tiny_host.js',
  'c64/c64_tiny.js',
  'c64/c64_tiny.wasm',
  'c64/keyboard.js',
  'c64/pp_javascript.js',
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
