import React from "react";
import Link from "next/link";
import { slugDate } from "../utils/utils-general.js";

export default ({ post, layout }) => {
	const date_slug = slugDate(post.posted);
	return (
		<div className={`feed-post post-${post.type} mb4`} key={post.posted}>
			<div className="mb2 px2">
				{layout === "post"
					? <Link
							href={`/feed_post_page?date_slug=${date_slug}`}
							as={`/post/${date_slug}`}
						>
							<a className="no-underline hover-underline">
								{new Date(post.posted).toLocaleString()}
							</a>
						</Link>
					: new Date(post.posted).toLocaleString()}
			</div>
			<img
				style={{
					maxHeight: layout === "post" ? "calc(80vh)" : "none",
					maxWidth: layout === "post" ? "calc(100vw - 1rem)" : "100%"
				}}
				src={`${post.img}`}
			/>
			{post.text ? <div className={"flex mt2 " + (post.type === "work" ? "justify-end" : "")}><div className="px2 measure-max" style={{color: "#888"}}>{post.text}</div></div> : null}
			{post.src
				? <div className="mt2 px2">
						<a href={post.src}>{post.src}</a>{post.via ? (<span> via <a href={post.via}>{post.via}</a></span>) : null}
					</div>
				: null}
		</div>
	);
};
