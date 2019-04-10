import * as React from 'react'
import { Store } from './App'
// import SignIn from './SignIn'
// import SignUp from './SignUp'
import { signin, signup } from '../api'
import { logWarning } from '../logger'
import { getCookie, setCookie, callApi } from '../utils'
import { withRouter } from 'react-router-dom'
export interface PortalProps {
  store: Store
}

class Portal extends React.Component<PortalProps> {
  constructor(props) {
    super(props)
  }

  signin = async (email: string, password: string) => {
    callApi(
      {
        onFail: () => logWarning('Signin failed'),
        onError: data => logWarning('Signin error ' + data.error),
        onSuccess: data => {
          setCookie('token', data.token)
          this.props.store.token = getCookie('token')
          ;(this.props as any).history.push('/')
        },
      },
      signin(email, password),
    )
  }

  signup = async (email: string, password: string) => {
    callApi(
      {
        onFail: () => logWarning('Signup failed'),
        onError: data => logWarning('Signup error ' + data.error),
        onSuccess: _data => {
          alert('You can now sign in')
        },
      },
      signup(email, password),
    )
  }

  render() {
    return (
      <React.Fragment>
        {/* <SignIn signin={this.signin} />
        <SignUp signup={this.signup} /> */}
      </React.Fragment>
    )
  }
}

export default withRouter(Portal)
