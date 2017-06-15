import fetch from "isomorphic-unfetch";
import React from "react";
import Nav from "../components/nav";
import Remarkable from "remarkable";
import Head from 'next/head';
import Link from "next/link";

export default class extends React.Component {
	static async getInitialProps({ req, query }) {
		let domain;
		req
			? (domain = `http://${req.headers.host}`)
			: (domain = window.location.origin);
		const res = await fetch(`${domain}/api/list_writings`);
		const files = await res.json();
		return { files };
	}

	render() {
		const { url, files } = this.props;
		const md = new Remarkable();

		return (
			<div>
				<Head>
					<title>Grant Custer → Writing</title>
				</Head>

				<Nav url={url} />
				<div className="center mb3">
					<h1>Writing</h1>
				</div>
				<div className="measure-max mx-auto px2">
					Coming soon.
				</div>
				{files.map(f => {
					(
						<div className="measure-max mx-auto px2 mb4" key={f.meta.filename}>
							<div className="sans-serif">
								{new Date(f.meta.date).toLocaleString()}
							</div>
							<div className="">
								<h2><Link href={`/writing_page?file_slug=${f.meta.filename.slice(0,-3)}`} as={`/writing/${f.meta.filename.slice(0,-3)}`}><a>{f.meta.title}</a></Link></h2>
							</div>
							<div className="">
								{f.content.replace(/\n\n/g, " ¶ ").replace(" ¶ ", "")}
								{" "}
							</div>
						</div>
					);
				})}
			</div>
		);
	}
}
