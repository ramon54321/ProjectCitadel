const ACTIVE_CACHE = 'main-v1'

// -- Delete all caches but active cache
const deleteOtherCaches = async () => {
  logInfo('Deleting old caches')
  const cacheKeys = await caches.keys().catch(err => console.log('Caught: ' + err))
  const prunedCaches = (cacheKeys as string[])
    .filter(cacheKey => cacheKey !== ACTIVE_CACHE)
    .map(cacheKey => caches.delete(cacheKey).catch(err => console.log('Caught: ' + err)))
  return prunedCaches
}

// // -- Fetch and add to cache
// const fetchAndCache = async (request: Request) => {
//   const cache = await caches.open(ACTIVE_CACHE).catch(err => console.log('Caught: ' + err))
//   const response = await fetch(request).catch(err => console.log('Caught: ' + err))
//   if (request.method === 'GET') {
//     (cache as Cache).put(request, (response as Response).clone())
//   }
//   return response
// }

// // -- Get from cache if possible, but fetch update anyway
// const getAndUpdateCache = async (request: Request) => {
//   const cache = await caches.open(ACTIVE_CACHE).catch(err => console.log('Caught: ' + err))
//   const match = await (cache as Cache).match(request).catch(err => console.log('Caught: ' + err))
//   if (match) {
//     logInfo('Cache hit')
//     fetchAndCache(request)
//     return match
//   } else {
//     logInfo('Cache miss')
//     const response = await fetchAndCache(request).catch(err => console.log('Caught: ' + err))
//     return response
//   }
// }

// -- Fetch and add to cache all static resources
const fetchAndCacheStaticResources = async () => {
  logInfo('Caching static resources')
  const urlsToCache = ['favicon.ico', '/app', '/static/app.css', '/static/app.citadel.js']
  const cache = await caches.open(ACTIVE_CACHE).catch(err => console.log('Caught: ' + err))
  return (cache as Cache).addAll(urlsToCache).catch(err => console.log('Caught: ' + err))
}

self.addEventListener('install', (event: any) => {
  logInfo('Installing')
  event.waitUntil(Promise.all([fetchAndCacheStaticResources(), deleteOtherCaches()]))
})

self.addEventListener('activate', (_event: any) => {
  logInfo('Activating')
})

// self.addEventListener('fetch', async (event: any) => {
//   const requestUrl = new URL(event.request.url)
//   if (requestUrl.origin === location.origin) {
//     logInfo('Responding to origin request')
//     event.respondWith(getAndUpdateCache(event.request))
//   } else {
//     logInfo('Responding to external request')
//     event.respondWith(fetch(event.request))
//   }
// })

function logInfo(message) {
  console.log('[INFO] [SERVICE WORKER] ' + message)
}

function logWarning(message) {
  console.log('[WARNING] [SERVICE WORKER] ' + message)
}

function logError(message) {
  console.log('[ERROR] [SERVICE WORKER] ' + message)
}
