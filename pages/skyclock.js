import React, { Component } from "react";
import { format } from "date-fns";
import Head from "next/head";

// get closest number from array from https://stackoverflow.com/questions/8584902/get-closest-number-out-of-array
function closest(arr, target) {
  if (!arr || arr.length === 0) return null;
  if (arr.length === 1) return arr[0];

  for (var i = 1; i < arr.length; i++) {
    // As soon as a number bigger than target is found, return the previous or current
    // number depending on which has smaller difference to the target.
    if (arr[i] > target) {
      var p = arr[i - 1];
      var c = arr[i];
      return Math.abs(p - target) < Math.abs(c - target) ? p : c;
    }
  }
  // No number in array is bigger so return the last.
  return arr[arr.length - 1];
}

// rgbToHex from https://stackoverflow.com/a/5624139/8691291
function rgbToHex(rgb) {
  let [r, g, b] = rgb;
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function zeroPad(number) {
  return number.toString().padStart(2, "0");
}

function makeTimeSlots() {
  let time_slots = [];
  for (var i = 0; i < 24; i++) {
    let hour = zeroPad(i);
    for (var j = 0; j < 60; j += 15) {
      let minutes = zeroPad(j);
      let time = hour + ":" + minutes;
      time_slots.push(time);
    }
  }
  return time_slots;
}

// getLuminance from https://stackoverflow.com/a/3943023/8691291
function getLuminance(rgb) {
  let [R, G, B] = rgb;
  console.log(R, G, B);
  let C = [R / 255, G / 255, B / 255];
  for (var i = 0; i < C.length; ++i) {
    if (C[i] <= 0.03928) {
      C[i] = C[i] / 12.92;
    } else {
      C[i] = Math.pow((C[i] + 0.055) / 1.055, 2.4);
    }
  }
  console.log(C);
  return 0.2126 * C[0] + 0.7152 * C[1] + 0.0722 * C[2];
}

function getContrastTextColor(rgb) {
  let L = getLuminance(rgb);
  if (L > 0.179) {
    return "#000000";
  } else {
    return "#ffffff";
  }
}

function getFactors(box_num) {
  // Get factors for chosen number of boxes
  let factors = [];
  for (let i = 0; i < box_num; i++) {
    if (box_num % i === 0) {
      factors.push(i);
    }
  }
  return factors;
}

let time_slots = makeTimeSlots();
let box_num = time_slots.length;
let box_factors = getFactors(box_num);
let box_factor_ratios = box_factors.map(
  first_factor => first_factor / (box_num / first_factor)
);

function processArchive(archive) {
  let object = {};
  let today = format(new Date(), "YYYY-MM-DD");
  for (let item of archive) {
    let item_date = new Date(item.time);
    let day_check = format(item_date, "YYYY-MM-DD");
    if (today === day_check) {
      let time = format(item_date, "HH:mm");
      if (object[time] === undefined) {
        object[time] = item.color;
      }
    }
  }
  return object;
}

// Changing canvas favicon idea from
// https://github.com/CMTegner/favicolor/blob/master/index.js
// TODO: Set a good default favicon
function setFavicon(rgb) {
  let link = document.querySelector("link[rel~='icon']");
  if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    document.head.append(link);
  }
  let canvas = document.createElement("canvas");
  canvas.width = 16;
  canvas.height = 16;
  let ctx = canvas.getContext("2d");
  ctx.fillStyle = "rgb(" + rgb.toString() + ")";
  ctx.fillRect(0, 0, 16, 16);
  link.href = canvas.toDataURL();
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current_color: [0, 0, 0],
      archive: [],
      width: 400,
      height: 600,
      columns: 8,
      rows: 12,
      grid_loaded: false,
      last_archive_time: "00:00",
      minute_time: ""
    };
  }

  fetchData() {
    // fetch("/color/brooklyn")
    // fetch("/color/tokyo")
    fetch("http://skycolor.toymaker.ops.fastforwardlabs.com/color/brooklyn")
      .then(response => response.json())
      .then(response => {
        let minute_time = format(new Date(), "HH:mm");
        let rgb = response;
        let hex = rgbToHex(rgb);
        console.log(
          "%c" + minute_time,
          "background: " + hex + "; color: " + getContrastTextColor(rgb) + ";"
        );
        setFavicon(rgb);
        this.setState({ current_color: rgb, minute_time });
      });
    // fetch("/archive/brooklyn")
    // fetch("/archive/tokyo")
    fetch("http://skycolor.toymaker.ops.fastforwardlabs.com/archive/brooklyn")
      .then(response => response.json())
      .then(response => {
        let last_archive_time = format(new Date(response[0].time), "HH:mm");
        let archive = processArchive(response);
        this.setState({ last_archive_time, archive });
      });
  }

  componentDidMount() {
    this.updateGrid();
    window.addEventListener("resize", this.updateGrid.bind(this));
    this.fetchData();
    setInterval(() => {
      this.fetchData();
    }, 60000);
  }

  updateGrid() {
    let width = window.innerWidth;
    let height = window.innerHeight;
    let ratio = width / height;
    let closest_ratio = closest(box_factor_ratios, ratio);
    let closest_index = box_factor_ratios.indexOf(closest_ratio);
    let closest_factor = box_factors[closest_index];
    let columns = closest_factor;
    let rows = box_num / closest_factor;
    this.setState({ width, height, columns, rows, grid_loaded: true });
  }

  render() {
    let last_time_index = time_slots.indexOf(this.state.last_archive_time);
    let filtered_time_slots = time_slots.slice(0, last_time_index + 1);
    return (
      <div>
        <Head>
          <title>Sky Clock</title>
        </Head>

        <div
          className="App"
          title={
            this.state.minute_time + " " + rgbToHex(this.state.current_color)
          }
          style={{
            display: "grid",
            height: "100vh",
            width: "100%",
            background: rgbToHex(this.state.current_color),
            transition: "background 0.25s linear",
            gridTemplateColumns: `repeat(${this.state.columns}, 1fr)`,
            gridTemplateRows: `repeat(${this.state.rows}, 1fr)`
          }}
        >
          {this.state.grid_loaded
            ? filtered_time_slots.map(time => {
                let archive_check = this.state.archive[time];
                let background = "transparent";
                if (archive_check) background = rgbToHex(archive_check);
                return (
                  <div
                    key={time}
                    title={`${time} ${background}`}
                    style={{
                      background: background
                    }}
                  />
                );
              })
            : null}
        </div>
      </div>
    );
  }
}

export default App;
