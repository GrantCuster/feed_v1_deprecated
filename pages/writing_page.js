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
		const res = await fetch(`${baseUrl}/api/writing/${query.file_slug}.md`);
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
					<title>Grant Custer → {file.meta.title}</title>
			    <meta name="og:title" content={file.meta.title} />
					<meta name="og:description" content={file.content.replace(/\n\n/g, " ¶ ").replace(" ¶ ", "").split(" ").splice(0,60).join(" ")} />
			    <meta name="og:image" content={share_image_base_url + file.meta.preview_image} />
				  <meta name="twitter:card" content="summary_large_image" />
				  <meta name="twitter:site" content="@grantcuster" />
				  <meta name="twitter:creator" content="@grantcuster" />
			    <meta name="twitter:title" content={file.meta.title} />
			    <meta name="twitter:description" content={file.content.replace(/\n\n/g, " ¶ ").replace(" ¶ ", "").split(" ").splice(0,60).join(" ")} />
			    <meta name="twitter:image" content={share_image_base_url + file.meta.preview_image} />
				</Head>

				<Nav url={url} />
				<div className="center mb3">
					<h1>{file.meta.title}</h1>
				</div>
				<div className="center">
					{new Date(file.meta.date).toLocaleString()}
				</div>
				<div className="measure-max image-max mx-auto px2 mb4">
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
