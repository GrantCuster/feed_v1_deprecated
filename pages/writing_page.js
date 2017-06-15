import React from "react";
import fetch from "isomorphic-unfetch";
import Nav from "../components/nav";
import Remarkable from "remarkable";

export default class extends React.Component {
	static async getInitialProps({ req, query }) {
		let domain;
		req
			? (domain = `http://${req.headers.host}`)
			: (domain = window.location.origin);
		const res = await fetch(`${domain}/api/writing/${query.file_slug}.md`);
		const file = await res.json();
		return { file };
	}

	render() {
		const { url, file } = this.props;

		const md = new Remarkable();

		return (
			<div>
				<Nav url={url} />
				<div className="center mb3">
					<h1>{file.meta.title}</h1>
				</div>
				<div className="measure-max mx-auto px2 mb4 text">
					<div className="center sans-serif">
						{new Date(file.meta.date).toLocaleString()}
					</div>
					<div
						className="text"
						dangerouslySetInnerHTML={{ __html: md.render(file.content) }}
					/>
				</div>
			</div>
		);
	}
}