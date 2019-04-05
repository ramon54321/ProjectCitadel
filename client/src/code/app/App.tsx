import * as React from 'react'
import * as ReactDOM from 'react-dom'
// import { Elements, StripeProvider } from 'react-stripe-elements'
import * as serviceWorkerClient from '../serviceWorkerClient'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import Dashboard from './Dashboard'
import Portal from './Portal'
import Settings from './Settings'

serviceWorkerClient.register()

// TODO: Add no cache headers to server

const App = () => {
  return (
    <React.Fragment>
      <Link to="/">Dashboard</Link>
      <Link to="/portal">Portal</Link>
      <Link to="/settings">Settings</Link>
      <Switch>
        <Route exact path="/" component={() => <Dashboard />} />
        <Route path="/portal" component={() => <Portal type="new" />} />
        <Route path="/settings" component={() => <Settings />} />
        <Route component={() => <p>404 Mate</p>} />
      </Switch>
    </React.Fragment>
  )
}

ReactDOM.render(
  <BrowserRouter basename="/app">
    <App />
  </BrowserRouter>,
  document.getElementById('app'),
)

// <StripeProvider apiKey="pk_test_U2078qbMdEEWDanmpzDAH1ny">
//   <Elements>
//     <CheckoutForm />
//   </Elements>
// </StripeProvider>