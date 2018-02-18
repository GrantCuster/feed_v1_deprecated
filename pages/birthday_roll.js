import React from "react";
import fetch from "isomorphic-unfetch";
import Head from "next/head";
import Link from "next/link";

let choices = ["\\", "X", "/", "·"];
let roll_num = 0;
let dict = {
  "\\": "backslash",
  X: "an X",
  "/": "forward slash",
  "·": "draw a dot in the middle"
};
let colors = ["red", "green", "lightblue", "orange"];
function rollIt() {
  let index = Math.floor(Math.random() * 4);
  roll_num++;
  return choices[index];
}

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roll_value: rollIt()
    };
  }
  render() {
    return (
      <div>
        <Head>
          <title>Grant Custer → Birthday Roll</title>
        </Head>

        <div className="center mb3">
          <h1>Birthday Roll</h1>
        </div>
        <div className="measure-max image-max mx-auto px2 mb4">
          <div style={{ marginBottom: "20px" }}>
            Roll {roll_num} in this session
          </div>
          <div>Draw an</div>
          <div
            style={{
              fontSize: "86px",
              textAlign: "center",
              background: colors[roll_num % 4]
            }}
          >
            {this.state.roll_value}
          </div>
          <div style={{ marginBottom: "20px" }}>
            ({dict[this.state.roll_value]})
          </div>
          <button
            style={{
              background: "blue",
              fontSize: "18px",
              borderRadius: "4px",
              color: "#fff",
              cursor: "pointer",
              boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
              padding: "10px"
            }}
            onClick={() => this.setState({ roll_value: rollIt() })}
          >
            Roll the dice
          </button>
        </div>
      </div>
    );
  }
}
