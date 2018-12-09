import React from 'react'

class SizedImage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      status: 'loading',
      ratio: null,
    }
  }

  handleImageLoaded({ target: img }) {
    let ratio = img.offsetWidth / img.offsetHeight
    this.setState({ status: 'loaded', ratio: ratio, og_width: img.offsetWidth })
  }

  render() {
    let { src, lh, feed_width, grid } = this.props
    let { status, ratio, og_width } = this.state
    let img_style = { display: 'block' }
    let container_style = {}
    if (ratio !== null) {
      let operating_width = Math.min(feed_width, og_width)
      let og_height = operating_width / ratio
      let container_height = Math.ceil(og_height / lh) * lh
      let padding_top = (container_height - og_height) / 2

      if (this.props.max_height) {
        let max_height = (Math.floor(grid.height / lh) - 3) * lh
        if (max_height < container_height) {
          container_height = max_height
          padding_top = 0
          img_style.height = container_height
        }
      }

      container_style.height = container_height
      container_style.paddingTop = padding_top
    } else {
      img_style.maxWidth = feed_width
    }
    return (
      <div style={{ ...container_style }}>
        <img
          onLoad={this.handleImageLoaded.bind(this)}
          style={{
            ...img_style,
          }}
          src={src}
        />
      </div>
    )
  }
}

export default SizedImage
