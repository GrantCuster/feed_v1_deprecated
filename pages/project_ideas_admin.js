import React from "react";
import Nav from "../components/nav";
import axios from "axios";
import Head from "next/head";

export default class extends React.Component {
	constructor() {
		super();
		this.state = {
			ideas_text: "loading project ideas..."
		};
	}

	componentDidMount() {
		axios.get("/api/project_ideas").then(response => {
			this.setState({ ideas_text: response.data });
		});
	}

	handleTextChange(e) {
		this.setState({ ideas_text: e.target.value });
	}

	handleSubmit() {
		const { ideas_text } = this.state;
		console.log(ideas_text);
		axios.post("/api/project_ideas", { ideas_text: ideas_text });
	}

	render() {
		const { url } = this.props;
		const { ideas_text } = this.state;
		return (
			<div>
				<Head>
					<title>Grant Custer → Admin</title>
				</Head>

				<Nav url={url} />
				<div className="center">
					<h1>Project Ideas Admin</h1>
				</div>
				<div className="measure-max mx-auto px2">
					<div className="mb2 flex justify-end">
						<button
							onClick={this.handleSubmit.bind(this)}
							className="block py1"
						>
							Save Project Ideas
						</button>
					</div>
					<div className="col-12 relative">
						<textarea
							style={{
								height: "60vh",
								width: "calc(100% - 1rem)",
								fontSize: "16px",
								lineHeight: "1.5",
								padding: "6px 8px"
							}}
							onChange={this.handleTextChange.bind(this)}
							value={ideas_text}
						/>
					</div>
				</div>
			</div>
		);
	}
}
