import React, { Component } from 'react'

let AppStyle = {
  background: '#222',
  minHeight: '100vh',
  color: '#eee',
  fontSmoothing: 'antialiased',
  fontFeatureSettings: '"tnum" 1',
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      button_started: 0,
      button_elapsed: 0,
    }
  }

  runElapsed() {
    let self = this
    function elapser() {
      self.setState({ button_elapsed: Date.now() - self.state.button_started })
      window.requestAnimationFrame(elapser)
    }
    elapser()
  }

  handleStart() {
    let now = Date.now()
    this.setState({ button_started: now })
    this.runElapsed()
  }

  render() {
    const { button_started, button_elapsed } = this.state
    return (
      <div style={AppStyle}>
        <div>
          <div>started: {new Date(button_started).toLocaleString()}</div>
          <div>
            elapsed:{' '}
            {Number.parseFloat(
              button_elapsed / 1000 / 60 / 60 / 24 * 100000 / 100000
            ).toFixed(5)}{' '}
            days
          </div>
          <button onClick={this.handleStart.bind(this)}>Start</button>
        </div>
      </div>
    )
  }
}

export default App
