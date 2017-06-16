import React from "react";
import fetch from "isomorphic-unfetch";
import Link from "next/link";
import { slugDate } from '../utils/utils-general';
import Nav from "../components/nav";
import FeedPost from '../components/feed_post';
import Head from 'next/head';
import feed_posts from "../static/feed_posts.json";

export default class extends React.Component {
	render() {
		const { url, layout } = this.props;
		const query = url.query;
		const date_slug = query.date_slug;
		const post_dates = feed_posts.map(p => slugDate(p.posted));
		const post_index = post_dates.indexOf(date_slug);
		const post = feed_posts[post_index];

		return (
			<div>
				<Head>
					<title>Grant Custer → Post</title>
				</Head>

				<Nav url={url} />
				<div className="center mb3">
					<h1>
						Post
					</h1>
				</div>
				<div className="flex justify-between px2 mb4">
						<div>
							{post.type === "inspiration" ?
								"↓ Inspiration" : null}
						</div>
						<div>
							{post.type === "work" ?
								"Work ↓"
							: null}
						</div>
				</div>
				<FeedPost post={post} layout="page" />
				<div className="center px2 mb4">
					<Link href="/">
						<a>Go to Feed</a>
					</Link>
				</div>
			</div>
		);
	}
}
