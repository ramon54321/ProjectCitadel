import * as React from 'react'
import { callApi, setCookie, getCookie } from '../utils'
import { Link } from 'react-router-dom'
import { Store } from './App'
import { signin } from '../api'

export interface SignInProps {
  store: Store
}

export interface SignInState {
  email: string
  password: string
}

class SignIn extends React.Component<SignInProps, SignInState> {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
    }
  }

  submit = async (email: string, password: string) => {
    callApi(
      {
        onFail: () => logWarning('Signin failed'),
        onError: data => logWarning('Signin error ' + data.error),
        onSuccess: data => {
          setCookie('token', data.token)
          this.props.store.token = getCookie('token')
        },
      },
      signin(email, password),
    )
  }

  handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      email: event.target.value,
    })
  }

  handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      password: event.target.value,
    })
  }

  render() {
    const allowSignIn =
      this.state.email &&
      this.state.email.length >= 3 &&
      this.state.password &&
      this.state.password.length >= 3
    return (
      <React.Fragment>
        <h3>Sign In</h3>
        <input
          value={this.state.email}
          onChange={this.handleChangeEmail}
          type="text"
          placeholder="email"
        />
        <input
          value={this.state.password}
          onChange={this.handleChangePassword}
          type="password"
          placeholder="password"
        />
        {allowSignIn && (
          <button onClick={() => this.submit(this.state.email, this.state.password)}>
            Sign In
          </button>
        )}
        <Link to="/signup">Signup</Link>
      </React.Fragment>
    )
  }
}

export default SignIn
