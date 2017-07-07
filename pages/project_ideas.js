import React from "react";
import fetch from "isomorphic-unfetch";
import Nav from "../components/nav";
import Remarkable from "remarkable";
import Head from 'next/head';
import Link from "next/link";
import {makeBaseUrl} from "../utils/utils-general";

export default class extends React.Component {
	static async getInitialProps({ req, query }) {
		const baseUrl = makeBaseUrl(req);
		const res = await fetch(`${baseUrl}/api/project_ideas`);
		const file = await res.json();
		return { file };
	}

	render() {
		const { url, file } = this.props;
		const share_image_base_url = "http://feed.grantcuster.com"
		const md = new Remarkable();

		return (
			<div>
				<Head>
					<title>Grant Custer → Project Ideas</title>
				</Head>

				<Nav url={url} />
				<div className="center mb3">
					<h1>Project Ideas</h1>
				</div>
				<div className="measure-max image-max mx-auto px2 mb4">
					<div
						className=""
						dangerouslySetInnerHTML={{ __html: md.render(file) }}
					/>
				</div>
			</div>
		);
	}
}
