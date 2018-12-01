import * as React from 'react'

export interface DashboardProps {

}

class Dashboard extends React.Component<DashboardProps> {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <React.Fragment>
        <h2>Dashboard</h2>
        <p>Daily words to learn!</p>
        <small>Version 3</small>
      </React.Fragment>
    )
  }
}

export default Dashboard
