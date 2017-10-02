// @format

import React, {Component} from 'react';
import {makeH} from '../components/jackson2017/H3';
import {makeA} from '../components/jackson2017/A';
import {makeP} from '../components/jackson2017/P2';
import {makeY} from '../components/jackson2017/Y';
import {makeB} from '../components/jackson2017/B';
import {makeI} from '../components/jackson2017/I';
import {makeR} from '../components/jackson2017/R';
import {makeT} from '../components/jackson2017/T';
import {makeD} from '../components/jackson2017/D';
import {makeA2} from '../components/jackson2017/A2';
import {makeJ} from '../components/jackson2017/J';
import {makeC} from '../components/jackson2017/C';
import {makeK} from '../components/jackson2017/K';
import {makeS} from '../components/jackson2017/S';
import {makeO} from '../components/jackson2017/O';
import {makeN} from '../components/jackson2017/N';
import Head from 'next/head';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animate_mode: 'animate_all',
      interval: false,
    };
  }

  timeChunk(tp, start, end) {
    if (tp >= start && tp < end) {
      return (tp - start) / (end - start);
    } else {
      return false;
    }
  }

  componentDidMount() {
    document.body.style.background = '#111';
    this.ticker();
    window.addEventListener('resize', () => {
      clearInterval(this.state.interval);
      this.ticker();
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.animate_mode !== this.state.animate_mode) {
      clearInterval(this.state.interval);
      this.ticker();
    }
  }

  drawShapes(ctx, c_width, c_height, shapes) {
    ctx.clearRect(0, 0, c_width, c_height);
    for (let shape of shapes) {
      if (shape.type === 'rectangle') {
        ctx.fillStyle = '#aaa';
        if (shape.rotate) {
          ctx.save();
          ctx.translate(shape.full_x / 2, shape.full_y / 2);
          ctx.rotate(shape.rotate);
          ctx.fillRect(
            shape.x - shape.full_x / 2,
            shape.y - shape.full_y / 2,
            shape.width,
            shape.height,
          );
          ctx.restore();
        } else {
          ctx.fillRect(shape.x, shape.y, shape.width, shape.height);
        }
      } else if (shape.type === 'path') {
        ctx.beginPath();
        for (let path of shape.paths) {
          if (path.type === 'move') {
            ctx.moveTo(path.x, path.y);
          } else if (path.type === 'line') {
            ctx.lineTo(path.x, path.y);
          } else if (path.type === 'curve') {
            ctx.bezierCurveTo(
              path.cp1x,
              path.cp1y,
              path.cp2x,
              path.cp2y,
              path.x,
              path.y,
            );
          }
        }
        ctx.strokeStyle = '#ccc';
        ctx.lineJoin = 'bevel';
        ctx.lineWidth = shape.strokeWidth;
        ctx.stroke();
      }
    }
  }

  ticker() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    const c_width = window.innerWidth;

    let padding = 40;
    if (window.innerWidth < 1000) {
      padding = 20;
    } else if (window.innerWidth < 500) {
      padding = 10;
    }

    const first_line_length = 5;
    const first_space_width = window.innerWidth / first_line_length;
    const first_letter_width = first_space_width - padding * 2;
    const first_space_height = first_space_width * 1.25;
    const first_letter_height = first_space_height - padding * 2;

    const three_letter_space_width = window.innerWidth / 3;
    const three_letter_width = three_letter_space_width - padding * 2;
    const three_space_height = three_letter_space_width * 1.25;
    const three_letter_height = three_space_height - padding * 2;

    const four_letter_space_width = window.innerWidth / 4;
    const four_letter_width = four_letter_space_width - padding * 2;
    const four_space_height = four_letter_space_width * 1.25;
    const four_letter_height = four_space_height - padding * 2;

    const c_height =
      first_space_height * 2 + four_space_height + three_space_height * 2;

    canvas.width = c_width;
    canvas.height = c_height;

    let og_counter = 0;
    let five_spacer = 200 - 200 / 5 * 0;
    let interval = setInterval(() => {
      const {animate_mode} = this.state;
      const am = animate_mode === 'animate_all';

      const one_m = og_counter % (200 * 20);

      function counter(i, alt) {
        if (am) {
          if (alt) {
            return og_counter + 100;
          } else {
            return og_counter;
          }
        } else {
          if (i * 200 < one_m && (i + 1) * 200 > one_m) {
            return og_counter;
          } else {
            return 0;
          }
        }
      }

      let h_shapes = makeH(
        counter(0, false),
        first_letter_width,
        first_letter_height,
        first_space_width / 2,
        first_space_height / 2,
      );
      let a_shapes = makeA2(
        counter(1, false),
        first_letter_width,
        first_letter_height,
        first_space_width * 1.5,
        first_space_height / 2,
      );
      let p_shapes = makeP(
        counter(2, false) + five_spacer * 3,
        first_letter_width,
        first_letter_height,
        first_space_width * 2.5,
        first_space_height / 2,
      );
      let p_shapes_2 = makeP(
        counter(3, false) + five_spacer * 4,
        first_letter_width,
        first_letter_height,
        first_space_width * 3.5,
        first_space_height / 2,
      );
      let y_shapes = makeY(
        counter(4, false) + five_spacer * 5,
        first_letter_width,
        first_letter_height,
        first_space_width * 4.5,
        first_space_height / 2,
      );
      let b_shapes = makeB(
        counter(5, true),
        first_letter_width,
        first_letter_height,
        first_space_width / 2,
        first_space_height * 1.5,
      );
      let i_shapes = makeI(
        counter(6, true),
        first_letter_width,
        first_letter_height,
        first_space_width * 1.5,
        first_space_height * 1.5,
      );
      let r_shapes = makeR(
        counter(7, true),
        first_letter_width,
        first_letter_height,
        first_space_width * 2.5,
        first_space_height * 1.5,
      );
      let t_shapes = makeT(
        counter(8, true),
        first_letter_width,
        first_letter_height,
        first_space_width * 3.5,
        first_space_height * 1.5,
      );
      let h_shapes_2 = makeH(
        counter(9, true),
        first_letter_width,
        first_letter_height,
        first_space_width * 4.5,
        first_space_height * 1.5,
      );
      let d_shapes = makeD(
        counter(10, false),
        three_letter_width,
        three_letter_height,
        three_letter_space_width * 0.5,
        first_space_height * 2 + three_space_height / 2,
      );
      let a_shapes_2 = makeA2(
        counter(11, false),
        three_letter_width,
        three_letter_height,
        three_letter_space_width * 1.5,
        first_space_height * 2 + three_space_height / 2,
      );
      let y_shapes_2 = makeY(
        counter(12, false),
        three_letter_width,
        three_letter_height,
        three_letter_space_width * 2.5,
        first_space_height * 2 + three_space_height / 2,
      );
      let j_shapes = makeJ(
        counter(13, true),
        four_letter_width,
        four_letter_height,
        four_letter_space_width * 0.5,
        first_space_height * 2 + three_space_height + four_space_height / 2,
      );
      let a_shapes_3 = makeA2(
        counter(14, true),
        four_letter_width,
        four_letter_height,
        four_letter_space_width * 1.5,
        first_space_height * 2 + three_space_height + four_space_height / 2,
      );
      let c_shapes = makeC(
        counter(15, true),
        four_letter_width,
        four_letter_height,
        four_letter_space_width * 2.5,
        first_space_height * 2 + three_space_height + four_space_height / 2,
      );
      let K_shapes = makeK(
        counter(16, true),
        four_letter_width,
        four_letter_height,
        four_letter_space_width * 3.5,
        first_space_height * 2 + three_space_height + four_space_height / 2,
      );
      let s_shapes = makeS(
        counter(17, false),
        three_letter_width,
        three_letter_height,
        three_letter_space_width * 0.5,
        first_space_height * 2 + three_space_height * 1.5 + four_space_height,
      );
      let o_shapes = makeO(
        counter(18, false),
        three_letter_width,
        three_letter_height,
        three_letter_space_width * 1.5,
        first_space_height * 2 + three_space_height * 1.5 + four_space_height,
      );
      let n_shapes = makeN(
        counter(19, false),
        three_letter_width,
        three_letter_height,
        three_letter_space_width * 2.5,
        first_space_height * 2 + three_space_height * 1.5 + four_space_height,
      );
      this.drawShapes(ctx, c_width, c_height, [
        h_shapes,
        a_shapes,
        p_shapes,
        p_shapes_2,
        ...y_shapes,
        b_shapes,
        i_shapes,
        r_shapes,
        t_shapes,
        h_shapes_2,
        d_shapes,
        a_shapes_2,
        ...y_shapes_2,
        j_shapes,
        a_shapes_3,
        c_shapes,
        K_shapes,
        s_shapes,
        o_shapes,
        n_shapes,
      ]);
      og_counter++;
    }, this.state.animate_mode === 'animate_all' ? 12 : 8);
    this.setState({interval: interval});
  }

  handleModeChange = new_mode => {
    this.setState({animate_mode: new_mode});
  };

  render() {
    return (
      <div>
        <Head>
          <title>Grant Custer → Feed</title>
        </Head>

        <div style={{background: '#111'}}>
          <div
            className="relative"
            style={{
              background: '#222',
              color: '#eee',
              fontSmoothing: 'antialiased',
              fontSize: '18px',
            }}>
            <div
              className="py1 px2"
              style={{
                fontSize: '0.8em',
                background: '#333',
                letterSpacing: '0.05em',
              }}>
              MODE
            </div>
            <div className="py1 flex flex-wrap px1" style={{color: '#ccc'}}>
              <div
                className="col-12 sm-col-6 flex items-center px1"
                onClick={this.handleModeChange.bind(this, 'animate_all')}>
                <input
                  type="radio"
                  id="animate_all"
                  name="animate_mode"
                  value="animate_all"
                  className="py1"
                  checked={this.state.animate_mode === 'animate_all'}
                />
                <label className="pl1 py1  col-12" htmlFor="animate_all">
                  Animate All
                </label>
              </div>
              <div
                className="col-12  sm-col-6 flex items-center px1"
                onClick={this.handleModeChange.bind(this, 'animate_hover')}>
                <input
                  type="radio"
                  id="animate_hover"
                  name="animate_mode"
                  value="animate_hover"
                  className="py1"
                  checked={this.state.animate_mode === 'animate_hover'}
                />
                <label className="pl1 py1 col-12" htmlFor="animate_hover">
                  One at a time
                </label>
              </div>
            </div>
          </div>
          <canvas
            id="canvas"
            className="relative"
            style={{background: '#111'}}
          />
          <div
            className="px2 pt2 pb3 center relative"
            style={{background: '#111', color: '#ccc'}}>
            &mdash; From Grant, Parvoneh, Ernie and Prince
          </div>
        </div>
      </div>
    );
  }
}

export default App;
