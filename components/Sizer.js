import React from 'react'

class Sizer extends React.Component {
  componentDidMount() {
    window.addEventListener('resize', this.setSize)
    this.setSize()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setSize)
  }

  setSize() {
    this.props.setSize(window.innerWidth, window.innerHeight)
  }

  render() {
    return null
  }
}

export default Sizer
