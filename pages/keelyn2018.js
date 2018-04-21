import React, { Component } from 'react'
import Head from 'next/head'

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
    gridTemplateColumns: '1fr 1fr 1fr',
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
  'keelyn',
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

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      orientation: 'landscape',
      synth: null,
      images_displayed: [],
      styles: [],
      playing_through: false,
      default_images: [],
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
    return utterThis
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
    let default_images = catalog_images.map(urls => {
      return getRandom(urls)
    })
    this.setState({ default_images: default_images })
    this.initiateSynth()
  }

  clearWords() {
    this.setState({ images_displayed: [] })
  }

  removeWord(timestamp) {
    let { images_displayed, styles } = this.state
    let timestamps = images_displayed.map(array => array[0])
    let index = timestamps.indexOf(timestamp)
    if (index > -1) {
      images_displayed.splice(index, 1)
      styles.splice(index, 1)
      this.setState({ images_displayed: images_displayed })
    }
  }

  createStyle() {
    let rotation = 30 - Math.floor(Math.random() * 60)
    return {
      rotation,
    }
  }

  wordFlow(to_display, play_through) {
    if (to_display === 'play all') {
      let me = this
      this.setState({ playing_through: true }, () => {
        let iterate_count = catalog_words.length
        function utterNext(selector) {
          if (me.state.playing_through) {
            let word = catalog_words[selector]
            let utter = me.wordFlow(word, true)
            utter.onend = function() {
              let new_selector = selector + 1
              if (new_selector < iterate_count) {
                utterNext(new_selector)
              } else {
                me.clearWords()
              }
            }
          }
        }
        utterNext(0)
      })
    } else {
      if (!play_through) {
        // Cancel any play throughs that are running
        if (this.state.playing_through) {
          this.setState({ playing_through: false })
        }
      }
      let word_index = catalog_words.indexOf(to_display)
      let image_urls = catalog_images[word_index]
      let image_url = getRandom(image_urls)
      let { images_displayed, styles } = this.state
      let to_speak = to_display
      // if (to_speak === 'parvoneh') {
      //   to_speak = 'par vuh nay'
      // }
      let utterThis = this.speak(to_speak)
      let style = this.createStyle()
      styles = [style]
      let timestamp = +new Date()
      this.setState({
        images_displayed: [[timestamp, image_url]],
        styles,
      })
      if (play_through) {
        return utterThis
      } else {
        let me = this
        utterThis.onend = function() {
          me.removeWord(timestamp)
        }
      }
    }
  }

  render() {
    let { images_displayed, styles } = this.state
    return (
      <div>
        <Head>
          <title>Happy Birthday Keelyn 2018</title>
        </Head>
        <div style={sceneStyle()}>
          <div
            style={{
              display: 'grid',
              gridTemplateRows: 'auto 1fr',
              height: '100vh',
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
              <div
                style={{
                  textAlign: 'center',
                  fontSize: '19px',
                  padding: '1.5em',
                  background: color_palette[10],
                  fontStyle: 'italic',
                }}
              >
                Tap squares to play words
              </div>
              <div
                className="keelyn-hover"
                onClick={() => this.wordFlow('play all')}
                style={{
                  fontWeight: 'bold',
                  textAlign: 'center',
                  fontSize: '19px',
                  cursor: 'pointer',
                  padding: '1.5em',
                  cursor: 'pointer',
                  background: color_palette[11],
                }}
              >
                <div className="image-text">Play all (tap here)</div>
              </div>
            </div>
            <div style={holderStyle()}>
              {catalog_words.map((word, i) => (
                <div
                  key={`square_${word}`}
                  className="keelyn-hover"
                  style={{
                    position: 'relative',
                    cursor: 'pointer',
                    background: color_palette[i],
                  }}
                  onClick={() => this.wordFlow(word)}
                >
                  <div
                    className="image-text"
                    style={{
                      position: 'absolute',
                      width: '80%',
                      left: '10%',
                      top: '10%',
                      height: '80%',
                      backgroundImage:
                        this.state.default_images.length > 0
                          ? `url(${this.state.default_images[i]})`
                          : 'none',
                      backgroundSize: 'contain',
                      backgroundPosition: 'center center',
                      backgroundRepeat: 'no-repeat',
                    }}
                  />
                </div>
              ))}
            </div>
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
            {images_displayed.map((array, i) => {
              let url = array[1]
              return (
                <div
                  key={array[1]}
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
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}

export default App
