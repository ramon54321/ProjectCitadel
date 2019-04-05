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
        <p>Some of your words are...</p>
      </React.Fragment>
    )
  }
}

export default Dashboard
