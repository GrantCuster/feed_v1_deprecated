import React from "react";
import Nav from "../components/nav";
import Remarkable from 'remarkable';
import Head from 'next/head';

const markdown_text = `
Experimental projects at varying stages of completion.
- [Feed Archive View](/feed_archive) (7/1/2017) - An alternate view of the feed, where post thumbnails are grouped by month. It loads a lot of images at once so proceed with caution if you're paying for data.
`

export default ({ url }) => {

	const md = new Remarkable();

	const markdown = md.render(markdown_text);

	return (
		<div>
			<Head>
				<title>Grant Custer → Miscellany</title>
			</Head>
			<Nav url={url} />
			<div className="center mb3">
				<h1>Misc</h1>
			</div>
			<div className="measure-max mx-auto px2" dangerouslySetInnerHTML={{__html: markdown}}>
			</div>
		</div>
	);
};