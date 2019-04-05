import * as React from 'react'

export interface PortalProps {

}

class Portal extends React.Component<PortalProps> {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <React.Fragment>
        <h2>Portal</h2>
      </React.Fragment>
    )
  }
}

export default Portal
