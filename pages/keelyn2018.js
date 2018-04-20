import React, { Component } from 'react'

if (!String.prototype.padStart) {
  String.prototype.padStart = function padStart(targetLength, padString) {
    targetLength = targetLength >> 0 //truncate if number or convert non-number to 0;
    padString = String(typeof padString !== 'undefined' ? padString : ' ')
    if (this.length > targetLength) {
      return String(this)
    } else {
      targetLength = targetLength - this.length
      if (targetLength > padString.length) {
        padString += padString.repeat(targetLength / padString.length) //append to original to ensure we are longer than needed
      }
      return padString.slice(0, targetLength) + String(this)
    }
  }
}

function getRandom(array) {
  let selector = Math.floor(array.length * Math.random())
  return array[selector]
}

let holderStyle = props => {
  return {
    display: 'grid',
    height: '100vh',
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
    gridTemplateRows: '1fr 1fr 1fr',
    position: 'relative',
    overflow: 'hidden',
  }
}

let sceneStyle = props => {
  return {
    position: 'relative',
    height: '100vh',
  }
}

let color_palette = [
  '#8dd3c7',
  '#ffffb3',
  '#bebada',
  '#fb8072',
  '#80b1d3',
  '#fdb462',
  '#b3de69',
  '#fccde5',
  '#d9d9d9',
  '#bc80bd',
  '#ccebc5',
  '#ffed6f',
]

let catalog_words = [
  'happy',
  'birthday',
  'kee',
  'lyn',
  'from',
  'grant',
  'parvoneh',
  'ernie',
  'and',
  'prince',
]

let image_prefix = '/static/images/keelyn/keelyn-2018-frames-'

let image_set_length = 3
let catalog_images = catalog_words.map((word, i) => {
  let image_urls = []
  let starter = i * image_set_length
  for (let j = 1; j <= image_set_length; j++) {
    let image_url =
      image_prefix + (j + starter).toString().padStart(2, 0) + '.png'
    image_urls.push(image_url)
  }
  return image_urls
})

let default_images = catalog_images.map(urls => {
  return getRandom(urls)
})

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      orientation: 'landscape',
      synth: null,
      images_displayed: [],
      styles: [],
    }
  }

  initiateSynth() {
    let synth = window.speechSynthesis
    this.setState({ synth: synth })
  }

  speak(text) {
    this.cancelSpeech()
    var utterThis = new window.SpeechSynthesisUtterance(text)
    this.state.synth.speak(utterThis)
  }

  cancelSpeech() {
    this.state.synth.cancel()
  }

  determineOrientation() {
    let orientation
    let window_width = window.innerWidth
    let window_height = window.innerHeight
    if (window_width > window_height) orientation = 'landscape'
    if (window_height < window_width) orientation = 'portrait'
    this.setState({ orientation: orientation })
  }

  componentDidMount() {
    this.determineOrientation()
    this.initiateSynth()
  }

  removeWord(image_url) {
    let { images_displayed, styles } = this.state
    let index = images_displayed.indexOf(image_url)
    images_displayed.splice(index, 1)
    styles.splice(index, 1)
    this.setState({ images_displayed: images_displayed })
  }

  createStyle() {
    let rotation = 30 - Math.floor(Math.random() * 60)
    return {
      rotation,
    }
  }

  wordFlow(to_say, to_display) {
    let word_index = catalog_words.indexOf(to_display)
    let image_urls = catalog_images[word_index]
    let image_url = getRandom(image_urls)
    let { images_displayed, styles } = this.state
    images_displayed.push(image_url)
    this.speak(to_say)
    let style = this.createStyle()
    styles.push(style)
    this.setState({
      images_displayed,
      styles,
    })
    let me = this
    setTimeout(() => {
      me.removeWord(image_url)
    }, 1000)
  }

  render() {
    let { images_displayed, styles } = this.state
    return (
      <div style={sceneStyle()}>
        <div style={holderStyle()}>
          {catalog_words.map((word, i) => (
            <div
              className="keelyn-hover"
              style={{
                position: 'relative',
                cursor: 'pointer',
                background: color_palette[i],
              }}
              onClick={() => this.wordFlow(word, word)}
            >
              <div
                className="image-text"
                style={{
                  position: 'absolute',
                  width: '80%',
                  left: '10%',
                  top: '10%',
                  height: '80%',
                  backgroundImage: `url(${default_images[i]})`,
                  backgroundSize: 'contain',
                  backgroundPosition: 'center center',
                  backgroundRepeat: 'no-repeat',
                }}
              />
            </div>
          ))}
        </div>
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            pointerEvents: 'none',
            overflow: 'hidden',
          }}
        >
          {images_displayed.map((url, i) => (
            <div
              style={{
                position: 'absolute',
                left: '5%',
                top: '5%',
                width: '90%',
                height: '90%',
                backgroundImage: `url(${url})`,
                backgroundSize: 'contain',
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat',
                transform: `rotate(${styles[i].rotation}deg)`,
              }}
            />
          ))}
        </div>
      </div>
    )
  }
}

export default App
