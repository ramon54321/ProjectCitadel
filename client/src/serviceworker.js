const cacheName = 'citadelCache'
const urlsToCache = ['/app', '/static/app.css', '/static/app.citadel.js']

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches
      .open(cacheName)
      .then(cache => {
        logInfo('Opened cache')
        return cache.addAll(urlsToCache)
      })
      .catch(error => {
        logError(error)
      }),
  )
})

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) {
        logInfo('Hit cache successfully')
        return response
      }
      logWarning(`Couldent find request in cache: ${JSON.stringify(event.request)}`)
      return fetch(event.request)
    }),
  )
})

function logInfo(message) {
  console.log('[INFO] [SERVICE WORKER] ' + message)
}

function logWarning(message) {
  console.log('[WARNING] [SERVICE WORKER] ' + message)
}

function logError(message) {
  console.log('[ERROR] [SERVICE WORKER] ' + message)
}
