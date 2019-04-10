import * as React from 'react'
import * as ReactDOM from 'react-dom'
// import { Elements, StripeProvider } from 'react-stripe-elements'
import * as serviceWorkerClient from '../serviceWorkerClient'
import { BrowserRouter, Route, Switch, Link, withRouter } from 'react-router-dom'
import Dashboard from './Dashboard'
import Settings from './Settings'
import { observable } from 'mobx'
import { observer } from 'mobx-react'
import { getCookie } from '../utils'
import ProtectedRoute from './ProtectedRoute'
import SignIn from './SignIn'
import SignUp from './SignUp'

serviceWorkerClient.register()

// TODO: Add no cache headers to server

export interface AppProps {
  store: Store
}

export class Store {
  @observable token: string | undefined
}

@observer
class App extends React.Component<AppProps> {
  constructor(props) {
    super(props)
    this.props.store.token = getCookie('token')
  }

  render() {
    const navbar = (
      <React.Fragment>
        <Link to="/">Dashboard</Link>
        <Link to="/settings">Settings</Link>
      </React.Fragment>
    )
    return (
      <React.Fragment>
        {!!this.props.store.token && navbar}
        <Switch>
          <ProtectedRoute
            path="/signin"
            fallback="/"
            allowed={!this.props.store.token}
            render={() => <SignIn store={this.props.store} />}
          />
          <ProtectedRoute
            path="/signup"
            fallback="/"
            allowed={!this.props.store.token}
            render={() => <SignUp store={this.props.store} />}
          />
          <ProtectedRoute
            exact
            path="/"
            fallback="signin"
            allowed={!!this.props.store.token}
            render={() => <Dashboard store={this.props.store} />}
          />
          <ProtectedRoute
            path="/settings"
            fallback="signin"
            allowed={!!this.props.store.token}
            render={() => <Settings store={this.props.store} />}
          />
          <Route component={() => <p>404 Mate</p>} />
        </Switch>
      </React.Fragment>
    )
  }
}

const store = new Store()
const AppWithRouter = withRouter(App)
ReactDOM.render(
  <BrowserRouter basename="/app">
    <AppWithRouter store={store} />
  </BrowserRouter>,
  document.getElementById('app'),
)

// <StripeProvider apiKey="pk_test_U2078qbMdEEWDanmpzDAH1ny">
//   <Elements>
//     <CheckoutForm />
//   </Elements>
// </StripeProvider>
