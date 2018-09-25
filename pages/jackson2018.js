import React, { Component } from 'react'
import Head from 'next/head'

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    // And swap it with the current element.
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }

  return array
}

let multiplier = 10
function m(number) {
  return number * multiplier
}
let z = 10
function mz(number, zoom) {
  return number * zoom
}

let bottom_spacer = 60

let pixels = {
  y: 'yellow',
  b: '#587DFF',
  t: 'tan',
  0: 'black',
  w: 'white',
  p: 'pink',
  g: 'gray',
  a: '#441205',
}

let jackson = {
  layout: [
    ['x', 'x', 'y', 'y', 'y', 'x', 'x'],
    ['x', 'x', 'b', 't', 'b', 'x', 'x'],
    ['x', 'x', 't', 't', 't', 'x', 'x'],
    ['x', 'x', 't', 't', 'x', 'x', 'x'],
    ['x', 'b', 'b', 'b', 'b', 'b', 'x'],
    ['x', 't', 'b', 'b', 'b', 't', 'x'],
    ['x', 't', 'b', 'b', 'b', 't', 'x'],
    ['x', 't', '0', '0', '0', 't', 'x'],
    ['x', 'x', '0', '0', '0', 'x', 'x'],
    ['x', 'x', '0', 'x', '0', 'x', 'x'],
    ['x', 'x', '0', 'x', '0', 'x', 'x'],
    ['x', 'x', 't', 'x', 't', 't', 'x'],
  ],
}

let jackson2 = {
  layout: [
    ['t', 'x', 'y', 'y', 'y', 'x', 'x'],
    ['t', 'x', 'b', 't', 'b', 'x', 't'],
    ['t', 'x', 't', 't', 't', 'x', 't'],
    ['t', 'x', 't', 't', 'x', 'x', 't'],
    ['t', 'b', 'b', 'b', 'b', 'b', 't'],
    ['x', 'x', 'b', 'b', 'b', 'x', 'x'],
    ['x', 'x', 'b', 'b', 'b', 'x', 'x'],
    ['x', 'x', '0', '0', '0', 'x', 'x'],
    ['x', 'x', '0', '0', '0', 'x', 'x'],
    ['x', 'x', '0', 'x', '0', 'x', 'x'],
    ['x', 'x', '0', 'x', '0', 'x', 'x'],
    ['x', 'x', 't', 'x', 't', 't', 'x'],
  ],
}

let parvoneh = {
  layout: [
    ['x', 'x', 'a', 'a', 'a', 'x', 'x'],
    ['x', 'a', 'a', 't', 't', 'a', 'x'],
    ['x', 'a', 'a', 't', 'a', 'a', 'x'],
    ['x', 'a', 't', 't', 't', 'a', 'x'],
    ['x', 'a', 't', 't', 'a', 'a', 'x'],
    ['x', 'y', 'y', 'y', 'y', 'y', 'x'],
    ['x', 't', 'y', 'y', 'y', 't', 'x'],
    ['x', 't', 'y', 'y', 'y', 't', 'x'],
    ['x', 't', 'y', 'y', 'y', 't', 'x'],
    ['x', 't', 'b', 'b', 'b', 't', 'x'],
    ['x', 'b', 'b', 'b', 'b', 'x', 'x'],
    ['x', 'b', 'b', 'b', 'b', 'b', 'x'],
    ['x', 'b', 'b', 'b', 'b', 'b', 'x'],
    ['x', 'x', 't', 'x', 't', 'x', 'x'],
    ['x', 'x', 't', 'x', 't', 't', 'x'],
  ],
}

let parvoneh2 = {
  layout: [
    ['x', 'x', 'a', 'a', 'a', 'x', 'x'],
    ['x', 'a', 'a', 't', 't', 'a', 't'],
    ['t', 'a', 'a', 't', 'a', 'a', 't'],
    ['t', 'a', 't', 't', 't', 'a', 't'],
    ['t', 'a', 't', 't', 'a', 'a', 't'],
    ['t', 'y', 'y', 'y', 'y', 'y', 't'],
    ['x', 'x', 'y', 'y', 'y', 'x', 'x'],
    ['x', 'x', 'y', 'y', 'y', 'x', 'x'],
    ['x', 'x', 'y', 'y', 'y', 'x', 'x'],
    ['x', 'x', 'b', 'b', 'b', 'x', 'x'],
    ['x', 'b', 'b', 'b', 'b', 'x', 'x'],
    ['x', 'b', 'b', 'b', 'b', 'b', 'x'],
    ['x', 'b', 'b', 'b', 'b', 'b', 'x'],
    ['x', 'x', 't', 'x', 't', 'x', 'x'],
    ['x', 'x', 't', 'x', 't', 't', 'x'],
  ],
}

let grant = {
  layout: [
    ['x', 'x', 'a', 'a', 'a', 'x', 'x'],
    ['x', 'x', 't', 't', 't', 'x', 'x'],
    ['x', 'x', 'a', 't', 'a', 'x', 'x'],
    ['x', 'x', 't', 't', 't', 'x', 'x'],
    ['x', 'x', 't', 't', 'x', 'x', 'x'],
    ['x', '0', '0', '0', '0', '0', 'x'],
    ['x', 't', '0', '0', '0', 't', 'x'],
    ['x', 't', '0', '0', '0', 't', 'x'],
    ['x', 't', '0', '0', '0', 't', 'x'],
    ['x', 't', '0', '0', '0', 't', 'x'],
    ['x', 't', '0', '0', '0', 't', 'x'],
    ['x', 'x', '0', '0', '0', 'x', 'x'],
    ['x', 'x', '0', 'x', '0', 'x', 'x'],
    ['x', 'x', '0', 'x', '0', 'x', 'x'],
    ['x', 'x', '0', 'x', '0', 'x', 'x'],
    ['x', 'x', 't', 'x', 't', 't', 'x'],
  ],
}

let grant2 = {
  layout: [
    ['x', 'x', 'a', 'a', 'a', 'x', 't'],
    ['t', 'x', 't', 't', 't', 'x', 't'],
    ['t', 'x', 'a', 't', 'a', 'x', 't'],
    ['t', 'x', 't', 't', 't', 'x', 't'],
    ['t', 'x', 't', 't', 'x', 'x', 't'],
    ['t', '0', '0', '0', '0', '0', 't'],
    ['x', 'x', '0', '0', '0', 'x', 'x'],
    ['x', 'x', '0', '0', '0', 'x', 'x'],
    ['x', 'x', '0', '0', '0', 'x', 'x'],
    ['x', 'x', '0', '0', '0', 'x', 'x'],
    ['x', 'x', '0', '0', '0', 'x', 'x'],
    ['x', 'x', '0', '0', '0', 'x', 'x'],
    ['x', 'x', '0', 'x', '0', 'x', 'x'],
    ['x', 'x', '0', 'x', '0', 'x', 'x'],
    ['x', 'x', '0', 'x', '0', 'x', 'x'],
    ['x', 'x', 't', 'x', 't', 't', 'x'],
  ],
}

let prince = {
  layout: [
    ['x', 'x', 'x', 'x', 'x', 'x'],
    ['x', 'x', 'x', 'x', 'x', 'x'],
    ['x', 'x', 'x', 'x', 'x', 'x'],
    ['x', 'x', 'x', 'x', 'x', 'x'],
    ['x', 'x', 'x', 'w', 'x', 'x'],
    ['x', 'w', 'w', 'w', 'w', 'w'],
    ['x', 'w', 'b', 'w', 'b', 'w'],
    ['x', 'w', 'w', 'p', 'w', 'w'],
    ['x', 'w', 'w', 'w', 'w', 'x'],
    ['x', 'w', 'w', 'w', 'w', 'x'],
    ['x', 'w', 'x', 'x', 'w', 'w'],
  ],
}

let prince2 = {
  layout: [
    ['x', 'x', 'x', 'x', 'x', 'x'],
    ['x', 'x', 'x', 'x', 'x', 'x'],
    ['x', 'x', 'x', 'x', 'x', 'x'],
    ['x', 'x', 'x', 'x', 'x', 'x'],
    ['x', 'x', 'x', 'x', 'x', 'x'],
    ['x', 'w', 'w', 'w', 'w', 'x'],
    ['x', 'w', 'b', 'w', 'w', 'x'],
    ['p', 'w', 'w', 'w', 'w', 'x'],
    ['x', 'w', 'w', 'w', 'w', 'x'],
    ['x', 'w', 'w', 'w', 'w', 'w'],
    ['x', 'w', 'x', 'x', 'w', 'x'],
  ],
}

let ernie = {
  layout: [
    ['x', 'x', 'x', 'x', 'x', 'x', 'x'],
    ['x', 'x', 'x', 'x', 'x', 'x', 'x'],
    ['x', 'x', 'x', 'x', 'x', 'x', 'x'],
    ['x', 'x', 'x', 'x', 'x', 'x', 'x'],
    ['x', 'x', 'x', 'x', 'g', 'x', 'g'],
    ['x', 'x', 'x', 'x', '0', 'g', '0'],
    ['x', 'x', 'x', 'g', 'w', 'p', 'w'],
    ['x', 'x', 'x', 'g', 'w', 'w', 'w'],
    ['x', 'x', 'g', 'g', 'w', 'w', 'w'],
    ['x', 'x', 'x', 'w', 'w', 'w', 'w'],
    ['x', 'x', 'x', 'w', 'x', 'x', 'w'],
  ],
}

let ernie2 = {
  layout: [
    ['x', 'x', 'x', 'x', 'x', 'x', 'x'],
    ['x', 'x', 'x', 'x', 'x', 'x', 'x'],
    ['x', 'x', 'x', 'x', 'x', 'x', 'x'],
    ['x', 'x', 'x', 'x', 'x', 'x', 'x'],
    ['x', 'x', 'x', 'x', 'x', 'x', 'x'],
    ['x', 'x', 'x', 'x', 'x', 'x', 'x'],
    ['w', 'x', 'x', 'g', 'x', 'x', 'x'],
    ['x', 'w', 'g', 'g', 'g', 'x', 'x'],
    ['x', 'w', 'w', 'w', 'w', '0', 'g'],
    ['x', 'w', 'w', 'g', 'p', 'w', 'x'],
    ['w', 'w', 'w', 'w', 'w', '0', 'g'],
  ],
}

let letter_h = {
  layout: [
    ['b', 'x', 'b'],
    ['b', 'x', 'b'],
    ['b', 'b', 'b'],
    ['b', 'x', 'b'],
    ['b', 'x', 'b'],
  ],
}

let letter_a = {
  layout: [
    ['x', 'b', 'x'],
    ['b', 'x', 'b'],
    ['b', 'b', 'b'],
    ['b', 'x', 'b'],
    ['b', 'x', 'b'],
  ],
}

let letter_p = {
  layout: [
    ['b', 'b', 'x'],
    ['b', 'x', 'b'],
    ['b', 'b', 'x'],
    ['b', 'x', 'x'],
    ['b', 'x', 'x'],
  ],
}

let letter_p2 = Object.assign({}, letter_p)

let letter_y = {
  layout: [
    ['b', 'x', 'b'],
    ['b', 'x', 'b'],
    ['x', 'b', 'x'],
    ['x', 'b', 'x'],
    ['x', 'b', 'x'],
  ],
}

let letter_b = {
  layout: [
    ['b', 'b', 'x'],
    ['b', 'x', 'b'],
    ['b', 'b', 'b'],
    ['b', 'x', 'b'],
    ['b', 'b', 'x'],
  ],
}

let letter_d = {
  layout: [
    ['b', 'b', 'x'],
    ['b', 'x', 'b'],
    ['b', 'x', 'b'],
    ['b', 'x', 'b'],
    ['b', 'b', 'x'],
  ],
}

let letter__ = {
  layout: [['x', 'x'], ['x', 'x'], ['b', 'b'], ['x', 'x'], ['x', 'x']],
}

let letter_a2 = Object.assign({}, letter_a)

let letter_y2 = Object.assign({}, letter_y)

let banner = {}

let line = {}

let lw = 5

let delay_count = 0

function offset(thing, axis) {
  if (axis === 'y') {
    return Math.floor(thing.layout.length / 2)
  } else {
    return Math.floor(thing.layout[0].length / 2)
  }
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      w: null,
      h: null,
      loaded: false,
      ctx: null,
    }
    this.draw = this.draw.bind(this)
    this.setUp = this.setUp.bind(this)
  }

  setUp() {
    if (window) {
      let canvas = document.getElementsByTagName('canvas')[0]
      let ctx = canvas.getContext('2d')
      this.setState({
        w: window.innerWidth,
        h: window.innerHeight,
        loaded: true,
        ctx: ctx,
      })
    }

    let ww = window.innerWidth
    let wh = window.innerHeight

    let y_off = 7
    let full_group_x =
      grant.layout[0].length +
      2 +
      parvoneh.layout[0].length +
      2 +
      jackson.layout[0].length +
      2 +
      ernie.layout[0].length +
      2 +
      prince.layout[0].length +
      2

    if (ww / z < full_group_x) {
      z = ww / full_group_x
    }

    let centerer = Math.floor(ww / z / 2) - Math.ceil(full_group_x / 2)

    let line_length = full_group_x
    line.layout = [[]]
    for (let i = 0; i < line_length; i++) {
      line.layout[0].push(i % 2 ? 'y' : 'x')
    }
    line.position = [
      centerer + offset(line, 'x'),
      2 + grant.layout.length + 3 + y_off,
    ]

    letter_h.position = [centerer + 3, 5]
    letter_a.position = [centerer + 3 + 3 + 1, 5]
    letter_p.position = [centerer + 3 + (3 + 1) * 2, 5]
    letter_p2.position = [centerer + 3 + (3 + 1) * 3, 5]
    letter_y.position = [centerer + 3 + (3 + 1) * 4, 5]

    letter_b.position = [centerer + 3 + (3 + 1) * 5 + 3, 5]
    letter__.position = [centerer + 3 + (3 + 1) * 6 + 3 - 1, 5]
    letter_d.position = [centerer + 3 + (3 + 1) * 7 + 3 - 1, 5]
    letter_a2.position = [centerer + 3 + (3 + 1) * 8 + 3 - 1, 5]
    letter_y2.position = [centerer + 3 + (3 + 1) * 9 + 3 - 1, 5]

    grant.position = [
      offset(grant, 'x') + 2 + centerer,
      offset(grant, 'y') + 2 + y_off,
    ]
    parvoneh.position = [
      grant.layout[0].length + 2 + offset(parvoneh, 'x') + 2 + centerer,
      offset(parvoneh, 'y') + 2 + 2 + y_off,
    ]
    ernie.position = [
      grant.layout[0].length +
        2 +
        parvoneh.layout[0].length +
        2 +
        jackson.layout[0].length +
        2 +
        offset(ernie, 'x') +
        2 +
        centerer,
      offset(ernie, 'y') + 2 + 6 + y_off,
    ]
    prince.position = [
      grant.layout[0].length +
        2 +
        parvoneh.layout[0].length +
        2 +
        jackson.layout[0].length +
        2 +
        ernie.layout[0].length +
        2 +
        offset(prince, 'x') +
        1 +
        centerer,
      offset(prince, 'y') + 2 + 6 + y_off,
    ]
    jackson.position = [
      grant.layout[0].length +
        2 +
        parvoneh.layout[0].length +
        2 +
        offset(jackson, 'x') +
        2 +
        centerer,
      Math.min(
        50,
        Math.floor(wh / z) -
          2 -
          Math.floor(bottom_spacer / z) -
          Math.floor(jackson.layout.length / 2)
      ),
    ]
  }

  componentDidMount() {
    if (document) {
      document.addEventListener('keydown', event => {
        let keyName = event.key
        switch (keyName) {
          case 'ArrowRight':
            jackson.position = [
              Math.min(jackson.position[0] + 1, Math.floor(this.state.w / z)),
              jackson.position[1],
            ]
            break
          case 'ArrowLeft':
            jackson.position = [
              Math.max(0, jackson.position[0] - 1),
              jackson.position[1],
            ]
            break
          case 'ArrowDown':
            jackson.position = [
              jackson.position[0],
              Math.min(jackson.position[1] + 1, Math.floor(this.state.h / z)),
            ]
            break
          case 'ArrowUp':
            jackson.position = [
              jackson.position[0],
              Math.max(0, jackson.position[1] - 1),
            ]
            break
        }
      })
    }

    window.addEventListener('resize', this.setUp)

    this.setUp()

    this.draw()
  }

  drawArt(art, ctx, position) {
    if (position === undefined) {
      position = art.position
    }
    let coordinates = []
    let center = [
      Math.ceil(art.layout[0].length / 2),
      Math.ceil(art.layout.length / 2),
    ]
    for (let r = 0; r < art.layout.length; r++) {
      for (let c = 0; c < art.layout[r].length; c++) {
        coordinates.push([r, c])
      }
    }
    coordinates = shuffle(coordinates)
    let variance = 0.25
    for (let i = 0; i < coordinates.length; i++) {
      let [r, c] = coordinates[i]
      let current = art.layout[r][c]
      if (current != 'x') {
        ctx.fillStyle = pixels[current]
        let size = Math.random() * variance
        ctx.fillRect(
          mz(
            position[0] + c - center[0] + Math.random() * variance - size / 2,

            z
          ),
          mz(
            position[1] + r - center[1] + Math.random() * variance - size / 2,
            z
          ),
          mz(1 + size, z),
          mz(1 + size, z)
        )
      }
    }
  }

  draw() {
    if (delay_count === 6 && this.state.loaded) {
      let ctx = this.state.ctx
      ctx.clearRect(0, 0, this.state.w, this.state.h)

      this.drawArt(line, ctx)

      if (jackson.position[1] < line.position[1]) {
        this.drawArt(letter_h, ctx)
        this.drawArt(letter_a, ctx)
        this.drawArt(letter_p, ctx)
        this.drawArt(letter_p2, ctx)
        this.drawArt(letter_y, ctx)

        this.drawArt(letter_b, ctx)
        this.drawArt(letter__, ctx)
        this.drawArt(letter_d, ctx)
        this.drawArt(letter_a2, ctx)
        this.drawArt(letter_y2, ctx)

        this.drawArt(grant2, ctx, grant.position)
        this.drawArt(parvoneh2, ctx, parvoneh.position)
        this.drawArt(prince2, ctx, prince.position)
        this.drawArt(ernie2, ctx, ernie.position)

        this.drawArt(jackson2, ctx, jackson.position)
      } else {
        this.drawArt(grant, ctx)
        this.drawArt(parvoneh, ctx)
        this.drawArt(prince, ctx)
        this.drawArt(ernie, ctx)
        this.drawArt(jackson, ctx)
      }

      delay_count = 0
    }
    window.requestAnimationFrame(this.draw)
    delay_count++
  }

  render() {
    let { w, h } = this.state
    let button_style = {
      background: '#ddd',
      borderRadius: '10%',
      cursor: 'pointer',
      height: '100%',
      padding: '10px 0',
      fontSize: '16px',
    }
    return (
      <div
        style={{
          height: '100vh',
          overflow: 'hidden',
          height: '100%',
          fontSize: '18px',
        }}
      >
        <Head>
          <title>Happy Birthday Jackson 2018</title>
        </Head>
        <canvas
          width={w}
          height={h - bottom_spacer}
          style={{ background: 'lightblue' }}
        />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr 1fr',
            maxWidth: 420,
            margin: '0 auto',
            padding: '5px 0',
            alignItems: 'center',
            textAlign: 'center',
            gridColumnGap: 5,
            gridTemplateRows: '100%',
            height: bottom_spacer - 10,
          }}
        >
          <button
            style={button_style}
            onClick={() => {
              jackson.position = [
                jackson.position[0],
                Math.max(0, jackson.position[1] - 1),
              ]
            }}
          >
            ↑ up
          </button>
          <button
            style={button_style}
            onClick={() => {
              jackson.position = [
                jackson.position[0],
                Math.min(jackson.position[1] + 1, Math.floor(this.state.h / z)),
              ]
            }}
          >
            ↓ down
          </button>
          <button
            style={button_style}
            onClick={() => {
              jackson.position = [
                Math.max(0, jackson.position[0] - 1),
                jackson.position[1],
              ]
            }}
          >
            ← left
          </button>
          <button
            style={button_style}
            onClick={() => {
              jackson.position = [
                Math.min(jackson.position[0] + 1, Math.floor(this.state.w / z)),
                jackson.position[1],
              ]
            }}
          >
            → right
          </button>
        </div>
      </div>
    )
  }
}

export default App
