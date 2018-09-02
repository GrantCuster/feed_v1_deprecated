import React from "react";
import fetch from "isomorphic-unfetch";
import Link from "next/link";
import { slugDate } from "../utils/utils-general";
import Nav from "../components/nav";
import FeedPost from "../components/feed_post";
import Head from "next/head";
import { makeBaseUrl } from "../utils/utils-general";
import CenterPost from '../components/center_post.js'

export default class extends React.Component {
  static async getInitialProps({ req, query }) {
    const baseUrl = makeBaseUrl(req);
    const res = await fetch(`${baseUrl}/api/feed_posts`);
    const feed_posts = await res.json();
    const date_slug = query.date_slug;
    const post_dates = feed_posts.map(p => slugDate(p.posted));
    const post_index = post_dates.indexOf(date_slug);
    const post = feed_posts[post_index];
    return { post };
  }

  render() {
    const { url, layout, post } = this.props;

    return (
      <div>
        <Head>
          <title>Grant Custer → Post</title>
        </Head>

        <Nav url={url} />
        <div className="center mb3">
          <h1>Post</h1>
        </div>
        <CenterPost post={post} layout="page" />
        <div className="center px2 mb4">
          <Link href="/">
            <a>Go to Feed</a>
          </Link>
        </div>
      </div>
    );
  }
}
