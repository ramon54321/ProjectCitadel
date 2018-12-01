const ACTIVE_CACHE = 'main-v1'

// -- Delete all caches but active cache
const deleteOtherCaches = async () => {
  logInfo('Deleting old caches')
  const cacheKeys = await caches.keys()
  const prunedCaches = cacheKeys
    .filter(cacheKey => cacheKey !== ACTIVE_CACHE)
    .map(cacheKey => caches.delete(cacheKey))
  return prunedCaches
}

// -- Fetch and add to cache
const fetchAndCache = async (request: Request) => {
  logInfo('Fetching request and updating cache')
  const cache = await caches.open(ACTIVE_CACHE)
  const response: Response = await fetch(request)
  cache.put(request, response.clone())
  logInfo('Returning fetch response')
  return response
}

// -- Get from cache if possible, but fetch update anyway
const getAndUpdateCache = async (request: Request) => {
  const cache = await caches.open(ACTIVE_CACHE)
  const match = await cache.match(request)
  if (match) {
    logInfo('Getting request from cache')
    fetchAndCache(request)
    logInfo('Returning cache match')
    return match
  } else {
    logInfo('Cache missed')
    const response = await fetchAndCache(request)
    return response
  }
}

// -- Fetch and add to cache all static resources
const fetchAndCacheStaticResources = async () => {
  logInfo('Caching static resources')
  const urlsToCache = ['favicon.ico', '/app', '/static/app.css', '/static/app.citadel.js']
  const cache = await caches.open(ACTIVE_CACHE)
  return cache.addAll(urlsToCache)
}

self.addEventListener('install', (event: any) => {
  logInfo('Installing')
  event.waitUntil(Promise.all([fetchAndCacheStaticResources(), deleteOtherCaches()]))
})

self.addEventListener('activate', (_event: any) => {
  logInfo('Activating')
})

self.addEventListener('fetch', async (event: any) => {
  const requestUrl = new URL(event.request.url)

  if (requestUrl.origin === location.origin) {
    logInfo('Responding to origin request')
    event.respondWith(getAndUpdateCache(event.request))
  } else {
    logInfo('Responding to external request')
    event.respondWith(fetch(event.request))
  }
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
