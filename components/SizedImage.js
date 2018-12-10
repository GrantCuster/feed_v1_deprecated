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
    let { src, grid, max_width, max_height, container_height } = this.props
    let { unit } = grid
    let { ratio, og_width } = this.state
    let img_style = { display: 'block' }
    let container_style = {}

    if (ratio !== null) {
      let actual_width = Math.min(max_width, og_width)
      let actual_height = actual_width / ratio
      let rounded_height = Math.ceil(actual_height / unit) * unit

      if (max_height !== undefined) {
        if (rounded_height > max_height) {
          // assume max height is rounded already
          rounded_height = max_height
          img_style.height = max_height
        }
      }
      if (container_height !== undefined) {
        if (rounded_height > container_height) {
          img_style.height = container_height
        }
        rounded_height = container_height
      }

      let padding_top = (rounded_height - actual_height) / 2

      container_style.height = rounded_height
      container_style.paddingTop = padding_top
    } else {
      img_style.opacity = 0
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
