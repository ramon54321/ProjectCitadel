import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { Elements, StripeProvider } from 'react-stripe-elements'
import CheckoutForm from './pay'
import * as serviceWorker from '../serviceworker'

serviceWorker.register()

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
