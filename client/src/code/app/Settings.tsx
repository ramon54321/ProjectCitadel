import * as React from 'react'
import AddToHomeScreen from './AddToHomescreen'

export interface SettingsProps {}

class Settings extends React.Component<SettingsProps> {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <React.Fragment>
        <h2>Settings</h2>
        <AddToHomeScreen />
      </React.Fragment>
    )
  }
}

export default Settings
