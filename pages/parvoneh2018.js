import React, { Component } from 'react'
import Head from 'next/head'

let image_prefix = '/static/images/parvoneh2018/'

let image_urls = {
  princebodywhite: 'prince-body-white.gif',
  princeheadwhite: 'prince-head-white.gif',
  princebody: 'prince-body.png',
  princehead: 'prince-head.png',
  erniebodywhite: 'ernie-body-white.png',
  ernieheadwhite: 'ernie-head-white.png',
  erniebody: 'ernie-body.png',
  erniehead: 'ernie-head.png',
  scissors: 'scissors.gif',
  ducktales: 'ducktales.webm',
}

let abs_cover = {
  position: 'absolute',
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
}
let bg_contain = {
  backgroundSize: 'contain',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
}

function source(name) {
  return image_prefix + image_urls[name]
}

let dog_scale = 0
let cat_scale = 0
let global_scale = 0

let clicked = false

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      $scissors: null,
      $headbobdog: null,
      $headbobcat: null,
      clicked: false,
    }
    this.handleMousemove = this.handleMousemove.bind(this)
    this.handleStartClick = this.handleStartClick.bind(this)
  }
  handleStartClick() {
    clicked = true
    this.setState({ clicked: true })
  }
  handleMousemove(e) {
    let { $scissors } = this.state
    let x_offset = window.innerWidth / 4
    let y_offset = window.innerHeight / 2
    let dog_center = [x_offset, y_offset]
    let dog_x_scale = Math.max(
      1 - Math.abs(dog_center[0] - e.clientX) / x_offset,
      0
    )
    let dog_y_scale = Math.max(
      1 - Math.abs(dog_center[1] - e.clientY) / y_offset,
      0
    )
    dog_scale = (dog_x_scale + dog_y_scale) / 2
    let cat_center = [window.innerWidth / 2 + x_offset, y_offset]
    let cat_x_scale = Math.max(
      1 - Math.abs(cat_center[0] - e.clientX) / x_offset,
      0
    )
    cat_scale = (cat_x_scale + dog_y_scale) / 2
    let global_center = [window.innerWidth / 2, window.innerHeight / 2]
    let global_x_scale = Math.max(
      1 - Math.abs(global_center[0] - e.clientX) / (window.innerWidth / 2),
      0
    )
    let global_y_scale = Math.max(
      1 - Math.abs(global_center[1] - e.clientY) / (window.innerHeight / 2),
      0
    )
    global_scale = (global_x_scale + global_y_scale) / 2
    cat_scale = (cat_x_scale + dog_y_scale) / 2
    if ($scissors) {
      $scissors.style.left = e.clientX + 'px'
      $scissors.style.top = e.clientY + 'px'
    }
  }

  componentDidMount() {
    let $scissors = document.getElementById('scissors')
    let $headbobdog = document.getElementsByClassName('head-bob-dog')
    let $headbobcat = document.getElementsByClassName('head-bob-cat')
    this.setState({ $scissors, $headbobdog, $headbobcat })
    window.addEventListener('mousemove', this.handleMousemove)
    let bob_limit = 10
    let dog_pos = 0
    let dog_dir = 'cw'
    let cat_pos = 0
    let cat_dir = 'cw'

    function repeatOften() {
      if (clicked) {
        let dog_rate = 0.25 + global_scale * 1
        if (dog_dir === 'cw') {
          dog_pos = dog_pos + dog_rate
          if (dog_pos > bob_limit) {
            dog_pos = bob_limit
            dog_dir = 'cc'
          }
        } else {
          dog_pos = dog_pos - dog_rate
          if (dog_pos < -bob_limit) {
            dog_pos = -bob_limit
            dog_dir = 'cw'
          }
        }

        let cat_rate = 0.25 + global_scale * 1
        if (cat_dir === 'cw') {
          cat_pos = cat_pos + cat_rate
          if (cat_pos > bob_limit) {
            cat_pos = bob_limit
            cat_dir = 'cc'
          }
        } else {
          cat_pos = cat_pos - cat_rate
          if (cat_pos < -bob_limit) {
            cat_pos = -bob_limit
            cat_dir = 'cw'
          }
        }

        for (let i = 0; i < $headbobdog.length; i++) {
          let headbob = $headbobdog[i]
          headbob.style.transform = `rotate(${dog_pos}deg)`
        }
        for (let i = 0; i < $headbobcat.length; i++) {
          let headbob = $headbobcat[i]
          headbob.style.transform = `rotate(${cat_pos}deg)`
        }
      }
      requestAnimationFrame(repeatOften)
    }
    requestAnimationFrame(repeatOften)
  }

  render() {
    return (
      <div>
        <Head>
          <title>Happy Birthday Parvoneh 2018</title>
        </Head>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            width: '100%',
            height: '100vh',
            cursor: 'grabbing',
            overflow: 'hidden',
            position: 'relative',
          }}
          onClick={() => {
            document.getElementById('music').play()
          }}
        >
          <audio id="music" src={source('ducktales')} loop="true" />
          <div
            style={{
              position: 'relative',
              background: '#efefef',
            }}
          >
            <div
              style={{
                ...abs_cover,
                ...bg_contain,
                backgroundImage: `url(${source('princebodywhite')})`,
              }}
            />
            <div
              className="head-bob-dog"
              style={{
                ...abs_cover,
                ...bg_contain,
                transformOrigin: '54% 38.5% 0px',
                backgroundImage: `url(${source('princeheadwhite')})`,
              }}
            />
            <div
              style={{
                ...abs_cover,
                ...bg_contain,
                backgroundImage: `url(${source('princebody')})`,
              }}
            />
            <div
              id="prince_head"
              className="head-bob-dog"
              style={{
                ...abs_cover,
                ...bg_contain,
                left: '0',
                top: '0',
                transformOrigin: '54% 38.5% 0px',
                transform: 'rotate(15deg)',
                backgroundImage: `url(${source('princehead')})`,
              }}
            />
          </div>
          <div
            style={{
              position: 'relative',
              background: '#efefef',
            }}
          >
            <div
              style={{
                ...abs_cover,
                ...bg_contain,
                backgroundImage: `url(${source('erniebodywhite')})`,
              }}
            />
            <div
              className="head-bob-cat"
              style={{
                ...abs_cover,
                ...bg_contain,
                transformOrigin: '37.8% 38.1%',
                backgroundImage: `url(${source('ernieheadwhite')})`,
              }}
            />
            <div
              style={{
                ...abs_cover,
                ...bg_contain,
                backgroundImage: `url(${source('erniebody')})`,
              }}
            />
            <div
              id="ernie_head"
              className="head-bob-cat"
              style={{
                ...abs_cover,
                ...bg_contain,
                transformOrigin: '37.8% 38.1%',
                backgroundImage: `url(${source('erniehead')})`,
              }}
            />
          </div>
          <div
            id="scissors"
            style={{
              position: 'absolute',
              left: 125,
              top: 125,
              width: 0,
              height: 0,
            }}
          >
            {this.state.clicked ? null : (
              <div
                style={{
                  position: 'absolute',
                  top: '-100px',
                  left: '-125px',
                  width: '250px',
                  height: '200px',
                  textAlign: 'center',
                }}
              >
                Click to start
              </div>
            )}
            <div
              style={{
                position: 'absolute',
                top: '-100px',
                left: '-125px',
                width: '250px',
                height: '200px',
                cursor: 'grabbing',
                ...bg_contain,
                backgroundImage: `url(${source('scissors')})`,
              }}
              onClick={this.handleStartClick}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default App
