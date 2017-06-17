import React from "react";
import fetch from "isomorphic-unfetch";
import Nav from "../components/nav";
import Remarkable from "remarkable";
import Link from "next/link";
import {makeBaseUrl} from "../utils/utils-general";

export default class extends React.Component {
	static async getInitialProps({ req, query }) {
		const baseUrl = makeBaseUrl(req);
		const res = await fetch(`${baseUrl}/api/writing/${query.file_slug}.md`);
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
				<div className="center">
					{new Date(file.meta.date).toLocaleString()}
				</div>
				<div className="measure-max mx-auto px2 mb4">
					<div
						className=""
						dangerouslySetInnerHTML={{ __html: md.render(file.content) }}
					/>
				</div>
				<div className="center px2 mb4">
					<Link href="/writing">
						<a>Go to Writing</a>
					</Link>
				</div>
			</div>
		);
	}
}
