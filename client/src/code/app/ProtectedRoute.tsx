import * as React from 'react'
import { Route, Redirect, withRouter } from 'react-router-dom'

class ProtectedRoute extends React.Component<any> {
  constructor(props) {
    super(props)
  }

  render() {
    const { allowed, fallback, render, ...rest } = this.props
    if (allowed) {
      return (
        <Route render={render} {...rest} />
      )
    } else {
      return (
        <Redirect to={fallback} />
      )
    }
  }
}

export default withRouter(ProtectedRoute)
