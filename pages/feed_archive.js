import React from "react";
import fetch from "isomorphic-unfetch";
import Link from "next/link";
import { slugDate } from "../utils/utils-general.js";
import Nav from "../components/nav";
import FeedPost from "../components/feed_post";
import Head from "next/head";
import Router from "next/router";
import { makeBaseUrl } from "../utils/utils-general";

export default class extends React.Component {
	static async getInitialProps({ req, query }) {
		const baseUrl = makeBaseUrl(req);
		const res = await fetch(`${baseUrl}/api/feed_posts`);
		const feed_posts = await res.json();
		return { feed_posts };
	}

	render() {
		const { url, feed_posts } = this.props;
		const query = url.query;

		const month_array = [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December"
		];

		let display_posts = feed_posts.slice(0);
		let filter_type = "work";
		if (query.show && query.show === "inspiration") filter_type = "inspiration";
		display_posts = display_posts.filter(p => p.type === filter_type);

		const months_array = [];
		const date = new Date(Date.now());
		const current_month = date.getMonth();
		const current_year = date.getYear();

		function getMonthAndYear(post) {
			const date = new Date(post.posted);
			const month = date.getMonth();
			const year = date.getFullYear();
			return { month, year };
		}

		function startNewGroup(array, month_obj, post) {
			posts_month_grouped.push({
				month: month_obj.month,
				year: month_obj.year,
				posts: [post]
			});
		}

		let posts_month_grouped = [];
		for (let i = 0; i < display_posts.length; i++) {
			const post = display_posts[i];
			const month_obj = getMonthAndYear(post);
			if (i > 0) {
				const prev_post = display_posts[i - 1];
				const prev_month_obj = getMonthAndYear(prev_post);
				if (
					month_obj.year !== prev_month_obj.year ||
					month_obj.month !== prev_month_obj.month
				) {
					startNewGroup(posts_month_grouped, month_obj, post);
				} else {
					posts_month_grouped[posts_month_grouped.length - 1].posts.push(post);
				}
			} else {
				startNewGroup(posts_month_grouped, month_obj, post);
			}
		}

		const meta = {};
		meta.title = "Grant Custer → Feed Archive";
		meta.description = "Showing all feed posts grouped by month.";
		const share_image_base_url = "http://feed.grantcuster.com";
		meta.share_image = share_image_base_url + "/static/images/other/feed_archive_meta.jpg";


		return (
			<div>
				<Head>
					<title>{meta.title}</title>
			    <meta name="og:title" content={meta.title} />
					<meta name="og:description" content={meta.description} />
			    <meta name="og:image" content={meta.share_image} />
				  <meta name="twitter:card" content="summary_large_image" />
				  <meta name="twitter:site" content="@grantcuster" />
				  <meta name="twitter:creator" content="@grantcuster" />
			    <meta name="twitter:title" content={meta.title} />
			    <meta name="twitter:description" content={meta.description} />
			    <meta name="twitter:image" content={meta.share_image} />
				</Head>

				<Nav url={url} />
				<div className="px2 center mb3">
					<h1>Feed Archive View</h1>
				</div>
				<div className="mb3">
					<div className="mb3 px2">
						Showing all
						{" "} 
							{query.show && query.show === "inspiration" ? (
								<span><Link href="/feed_archive"><a className="faded-link">work</a></Link>{" "}<span className="bold">inspiration</span></span>
							) : (
								<span><span className="bold">work</span>{" "}<Link href="/feed_archive?show=inspiration"><a className="faded-link">inspiration</a></Link></span>
							)}
						{" "}
						feed posts grouped by month.
					</div>
					<div className="">
						{posts_month_grouped.map(group => {
							return (
								<div>
									<div className="px2 pb2">
										{month_array[group.month]}
										{" "}
										{group.year}
										{" "}
										–
										{" "}
										{group.posts.length}
										{" "}
										posts
									</div>
									<div className="flex flex-wrap px1 mb2">
										{group.posts.map(post => {
											const date_slug = slugDate(post.posted);
											return (
												<div className="px1 pb2" style={{ maxWidth: "calc(20vw + 1rem)",lineHeight: "0" }}>
													<Link
														href={`/feed_post_page?date_slug=${date_slug}`}
														as={`/post/${date_slug}`}
													>
														<a style={{lineHeight: 0}}>
															<img
																src={post.img}
																style={{ maxWidth: "20vw", maxHeight: "10rem" }}
															/>
														</a>
													</Link>
												</div>
											);
										})}
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		);
	}
}