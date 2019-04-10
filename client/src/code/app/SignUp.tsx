import * as React from 'react'
import { callApi } from '../utils'
import { Link } from 'react-router-dom'
import { signup } from '../api'
import { Store } from './App'

export interface SignUpProps {
  store: Store
}

export interface SignUpState {
  email: string
  password: string
  passwordConfirm: string
}

class SignUp extends React.Component<SignUpProps, SignUpState> {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      passwordConfirm: '',
    }
  }

  submit = async (email: string, password: string) => {
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
  handleChangePasswordConfirm = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      passwordConfirm: event.target.value,
    })
  }

  render() {
    const passwordsMatch = this.state.password === this.state.passwordConfirm
    const renderMatch = (
      <button onClick={() => this.submit(this.state.email, this.state.password)}>Sign Up</button>
    )
    const renderMismatch = <small>Passwords do not match</small>

    return (
      <React.Fragment>
        <h3>Sign Up</h3>
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
        <input
          value={this.state.passwordConfirm}
          onChange={this.handleChangePasswordConfirm}
          type="password"
          placeholder="password"
        />
        {passwordsMatch ? renderMatch : renderMismatch}
        <Link to="/signin">Signin</Link>
      </React.Fragment>
    )
  }
}

export default SignUp
