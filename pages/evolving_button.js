import React from "react";
import Nav from "../components/nav";
import axios from "axios";
import Head from "next/head";
import chroma from "chroma-js";

const base_height = 1.5;

// TODO: Add text color

export default class extends React.Component {
	constructor() {
		super();
		let hue_options = [];
		for (let i = 0; i < 45; i++) {
			hue_options.push(i * 8);
		}
		let padding_options = ["0rem", "0.5rem", "1rem", "2rem"];
		let border_radius_options = [0, 0.25, 0.5, 1];
		let border_options = ["0rem", "0.2rem", "0.4rem"];
		let text_color_options = ["#000", "#fff"];
		this.state = {
			parameters: {
				hue_options: {
					options: hue_options,
					display: function(option) {
						return { background: chroma(option, 1, 0.6, "hsl").hex() };
					}
				},
				x_padding_options: {
					options: padding_options,
					display: function(option) {
						return { paddingLeft: option, paddingRight: option };
					}
				},
				y_padding_options: {
					options: padding_options,
					display: function(option) {
						return { paddingTop: option, paddingBottom: option };
					}
				},
				border_options: {
					options: border_options,
					display: function(option) {
						return { border: "solid " + option + " #000" };
					}
				},
				border_radius_options: {
					options: border_radius_options,
					display: function(option) {
						return { borderRadius: option * (base_height + 1) + "rem" };
					}
				}
			},
			generated_button: false
		};
	}

	componentDidMount() {
		this.generateButton();
		setInterval(() => {
			this.generateButton()
		}, 1000);
	}

	renderOption(display, option) {
		const style_obj = Object.assign(display(option), { minWidth: "2frem" });
		return (
			<div className="mb1 mr1 p1 border" style={{ borderColor: "#ccc" }}>
				<div className="p1 bg-gray center" style={style_obj}>{option}</div>
				<div className="font-14 center mt1">0%</div>
			</div>
		);
	}

	renderOptions(display, options) {
		return options.map(option => {
			return this.renderOption(display, option);
		});
	}

	renderOptionGroup(key, option_group) {
		return (
			<div>
				<div className="bold px2 mb1">{key}</div>
				<div className="flex flex-wrap items-center px2" style={{}}>
					{this.renderOptions(option_group.display, option_group.options)}
				</div>
			</div>
		);
	}

	generateButton() {
		const {parameters} = this.state;
		let style = {transition: "1s linear", position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", color: "transparent" };
		Object.keys(parameters).map(key => {
			const options = parameters[key].options;
			const display = parameters[key].display;
			const random_option = options[Math.floor(Math.random() * options.length)];
			const rule = display(random_option);
			style = Object.assign(style, rule);
			return key;
		});
		this.setState({ generated_button: style });
	}

	renderNav(url) {
		const path = "/evolving_button";
		const query_start = "?section=";
		const nav_items = [
			["Vote", undefined],
			["Leaderboard", "leaderboard"],
			["Every Button", "every_button"],
			["Mutating", "mutating"]
		];
		return (
			<div className="flex justify-between p1 mb2">
				<div className="p1 bold">Evolving Button</div>
				<div className="flex">
					{nav_items.map(item => {
						return (
							<a
								href={path + (item[1] ? query_start + item[1] : "")}
								className={
									"p1 " + (url.query.section === item[1] ? "link-active" : "")
								}
							>
								{item[0]}
							</a>
						);
					})}
				</div>
			</div>
		);
	}

	_renderEvery(parameters_array, level, style) {
		const option_group = parameters_array[level];
		return option_group.options.map(option => {
			let new_style = Object.assign({}, style, option_group.display(option));
			if (level !== parameters_array.length - 1) {
				return this._renderEvery(parameters_array, level + 1, new_style)
			} else {
				return <div className="mb1 mr1" style={new_style}>Click Me</div>
			}
		})
	}

	renderEvery(parameters) {
		const parameters_array = Object.keys(parameters).map(key => parameters[key]);
		return this._renderEvery(parameters_array, 0, {})
	}

	render() {
		const { url } = this.props;
		const { parameters, generated_button } = this.state;

		return (
			<div>
				{this.renderNav(url)}
				<div>
					{url.query.section === "leaderboard"
						? <div>
								<div className="center mb3">
									<h1>Leaderboard</h1>
								</div>
								<div className="mb3">
									{Object.keys(parameters).map(key => {
										const option_group = parameters[key];
										return this.renderOptionGroup(key, option_group);
									})}
								</div>
							</div>
						: null}
				</div>
				<div>
					{url.query.section === "every_button"
						? <div>
								<div className="center mb3">
									<h1>Every Button</h1>
								</div>
								<div className="flex flex-wrap items-center mb3 pl2 pr1">
									{this.renderEvery(parameters)}
								</div>
							</div>
						: null}
				</div>
				<div>
					{url.query.section === "mutating"
						? <div>
								<div className="center mb3">
									<h1>Mutating</h1>
								</div>
								<div className="mb3 relative" style={{height: "10rem"}}>
									{generated_button ? <div>
										<div style={generated_button}>Click Me</div>
										<div style={{position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)"}}>Click Me</div>
									</div> : null}
								</div>
							</div>
						: null}
				</div>
			</div>
		);
	}
}
