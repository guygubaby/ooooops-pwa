// importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

// if (workbox) {
//   console.log(`Yay! Workbox is loaded 🎉`);
// } else {
//   console.log(`Boo! Workbox didn't load 😬`);
// }


const CACHE_NAME = 'static-cache-pwa-v1';

// CODELAB: Add list of files to cache here.
const FILES_TO_CACHE = [
];

self.addEventListener('install', (evt) => {
  // console.log('[ServiceWorker] Install');
  // CODELAB: Precache static resources here.

  self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
  // console.log('[ServiceWorker] Activate');
  // CODELAB: Remove previous cached data from disk.

  self.clients.claim();
});

self.addEventListener('fetch', (evt) => {
  // console.log('[ServiceWorker] Fetch', evt.request.url);
  // CODELAB: Add fetch event handler here.
  if(evt.request.mode!=='navigate'){
    return
  }
  evt.respondWith(
    fetch(evt.request).catch(()=>{
      console.log('xoxi');
      return caches.open(CACHE_NAME).then(cache=>{
        return cache.match('offline.html')
      })
    })
  )
});