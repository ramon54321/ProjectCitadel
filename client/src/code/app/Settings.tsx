import * as React from 'react'
import { deleteCookie, callApi } from '../utils'
import { Store } from './App'
import { signout } from '../api'
import { logWarning } from '../logger'

export interface SettingsProps {
  store: Store
}

class Settings extends React.Component<SettingsProps> {
  constructor(props) {
    super(props)
  }

  signout = async () => {
    callApi({
      onFail: () => logWarning('Signout failed'),
      onError: data => logWarning('Signout error ' + data.error),
      onSuccess: _data => {
        deleteCookie('token')
        this.props.store.token = undefined
      }
    }, signout())
  }

  render() {
    return (
      <React.Fragment>
        <h2>Settings</h2>
        <button onClick={() => this.signout()}>Sign Out</button>
      </React.Fragment>
    )
  }
}

export default Settings
