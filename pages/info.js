import React from "react";
import Head from "next/head";
import Nav from "../components/nav";
import Remarkable from 'remarkable';

const markdown_text = `
I am a designer-developer at [Fast Forward Labs](http://fastforwardlabs.com). We build prototypes and write reports on near future technologies.

On this site you'll find:
- [Feed](/) &ndash; images of my own work in progress and things I am inspired by.
- [Writing](/writing) &ndash; my writing. Mostly about design and coding but hopefully some other things as well.
- [Misc](/misc) &ndash; experimental stuff.

I'm happy to talk on Twitter [@GrantCuster](http://twitter.com/GrantCuster) or email [GrantCuster@gmail.com](mailto:grantcuster@gmail.com).
`

export default ({ url }) => {

	const md = new Remarkable();

	const markdown = md.render(markdown_text);

	return (
		<div>
			<Head>
				<title>Grant Custer → Info</title>
			</Head>

			<Nav url={url} />
			<div className="center mb3">
				<h1>Info</h1>
			</div>
			<div className="measure-max mx-auto px2" dangerouslySetInnerHTML={{ __html: markdown }}>
			</div>
		</div>
	);
};
