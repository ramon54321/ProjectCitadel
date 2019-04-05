import * as React from 'react'

export interface AddToHomeScreenProps {}

class AddToHomeScreen extends React.Component<AddToHomeScreenProps> {
  deferredPrompt
  constructor(props) {
    super(props)
    window.addEventListener('beforeinstallprompt', event => {
      event.preventDefault()
      this.deferredPrompt = event
    })
  }

  prompt = () => {
    if (!this.deferredPrompt) {
      return
    }
    this.deferredPrompt.prompt()
    this.deferredPrompt.userChoice.then(choiceResult => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt')
      } else {
        console.log('User dismissed the A2HS prompt')
      }
      this.deferredPrompt = null
    })
  }

  render() {
    return <button onClick={() => this.prompt()}>AddToHomeScreen</button>
  }
}

export default AddToHomeScreen
