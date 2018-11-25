import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { Elements, StripeProvider } from 'react-stripe-elements'
import CheckoutForm from './pay'

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(
      function(registration) {
        // Registration was successful
        console.log('ServiceWorker registration successful with scope: ', registration.scope)
      },
      function(err) {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err)
      },
    )
  })
} else {
  console.log('no service worker in navigator')
}

const App = () => {
  return (
    <StripeProvider apiKey="pk_test_U2078qbMdEEWDanmpzDAH1ny">
      <Elements>
        <CheckoutForm />
      </Elements>
    </StripeProvider>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
