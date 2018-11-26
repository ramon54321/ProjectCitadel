import { logInfo, logError, logWarning } from './logger'

export function register() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/serviceworker').then(
        registration => {
          logInfo(`ServiceWorker registration successful: ${registration.scope}`)
        },
        error => {
          logError(`ServiceWorker registration failed: ${error}`)
        },
      )
    })
  } else {
    logWarning('No ServiceWorker found in navigator')
  }
}
