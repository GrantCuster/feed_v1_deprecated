import React from 'react'

class SizedImage extends React.Component {
  render() {
    let { src } = this.props

    return <img style={{ maxWidth: '100%', display: 'block' }} src={src} />
  }
}

export default SizedImage
