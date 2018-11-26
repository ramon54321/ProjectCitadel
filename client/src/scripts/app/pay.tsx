import * as React from 'react'
import { CardElement, injectStripe } from 'react-stripe-elements'

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props)
    this.submit = this.submit.bind(this)
  }

  async submit(_ev) {
    // User clicked submit
    console.log('Helooooo')
  }

  render() {
    return (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <CardElement />
        <button onClick={this.submit}>Send</button>
      </div>
    )
  }
}

export default injectStripe(CheckoutForm)
