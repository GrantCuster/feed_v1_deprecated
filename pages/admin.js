import React from "react";
import Nav from "../components/nav";
import axios from "axios";
import Head from 'next/head';

export default class extends React.Component {
	constructor() {
		super();
		this.state = {
			category: "work",
			local_file: false,
			alt: "",
			from: "",
			download_url: "",
			tweet: false
		};
	}

	handleCategoryClick(value) {
		this.setState({ category: value });
	}

	handleFileChange(e) {
		const reader = new FileReader();
		let file = e.target.files[0];
		if (!file) file = false;
		this.setState({ local_file: file });
	}

	handleUrlChange(e) {
		this.setState({ download_url: e.target.value });
	}

	handleAltChange(e) {
		this.setState({ alt: e.target.value });
	}

	handleFromChange(e) {
		this.setState({ from: e.target.value });
	}

	handleTweetChange(e) {
		const target = e.target;
		const value = target.type === "checkbox" ? target.checked : target.value;
		this.setState({
			[target.name]: value
		});
	}

	checkText(string) {
		if (string) {
			let checked = string.trim();
			if (checked.length === 0) checked = false;
			return checked;
		} else {
			return false;
		}
	}

	handlePost(e) {
		let formData = new FormData();
		const post_object = {
			type: this.state.category,
			text: this.checkText(this.state.alt),
			src: this.checkText(this.state.from),
			tweet: this.state.tweet
		};
		Object.keys(post_object).forEach(key => {
			if (post_object[key] !== false) {
				formData.append(key, post_object[key]);
			}
		});
		if (this.state.local_file !== false) {
			formData.append("image", this.state.local_file);
		} else {
			formData.append("download_url", this.checkText(this.state.download_url));
		}
		axios
			.post("/api/private/post", formData)
			.then(response => {
				console.log(response);
			})
			.catch(error => {
				console.log(error);
			});
		e.preventDefault();
	}

	render() {
		const { url } = this.props;
		return (
			<div>
				<Head>
					<title>Grant Custer → Admin</title>
				</Head>

				<Nav url={url} />
				<div className="center mb3">
					<h1>New Post</h1>
				</div>
				<form>
					<div className="measure-max mx-auto px2">
						<div>
							<div>
								category
							</div>
							<div>
								<label>
									<input
										type="radio"
										value="work"
										onChange={this.handleCategoryClick.bind(this, "work")}
										checked={this.state.category === "work"}
									/>
									work
								</label>
								<label>
									<input
										type="radio"
										value="inspiration"
										onChange={this.handleCategoryClick.bind(
											this,
											"inspiration"
										)}
										checked={this.state.category === "inspiration"}
									/>
									inspiration
								</label>
							</div>
						</div>
						<div>
							<div>
								Image Upload Options
							</div>
							<div className="p1 border">
								<div>
									<input
										type="file"
										onChange={this.handleFileChange.bind(this)}
									/>
								</div>
								<div>
									URL
								</div>
								<div>
									<input
										type="text"
										onChange={this.handleUrlChange.bind(this)}
									/>
								</div>
							</div>
						</div>
						<div>
							<div>
								alt/title
							</div>
							<div>
								<textarea onChange={this.handleAltChange.bind(this)} />
							</div>
						</div>
						<div>
							<div>
								From
							</div>
							<div>
								<input
									type="text"
									onChange={this.handleFromChange.bind(this)}
								/>
							</div>
						</div>
						<div>
							<label>
								<input
									name="tweet"
									type="checkbox"
									checked={this.state.tweet}
									onChange={this.handleTweetChange.bind(this)}
								/>
								Tweet
							</label>
						</div>
						<div>
							<input
								type="submit"
								className="p1 block mt2"
								onClick={this.handlePost.bind(this)}
								value="Post"
							/>
						</div>
					</div>
				</form>
			</div>
		);
	}
}
