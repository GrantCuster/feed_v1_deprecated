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
  static async getInitialProps({ req, query, asPath }) {
    let baseUrl = "";
    if (req) {
      baseUrl = makeBaseUrl(req);
    }
    const res = await fetch(`${baseUrl}/api/feed_posts`);
    const feed_posts = await res.json();
    return { feed_posts };
  }

  render() {
    const { url, feed_posts } = this.props;
    console.log(feed_posts);
    return (
      <div>
        <Head>
          <title>Grant Custer → Featured</title>
        </Head>
        <Nav url={url} />
        <div className="center mb3">
          <h1>Featured Selector</h1>
        </div>
        {feed_posts.map(post => {
          return (
            <div key={post.posted} style={{ padding: "2rem 0" }}>
              <div>{new Date(post.posted).toLocaleString()}</div>
              <div>
                <img src={post.img} style={{ height: 200 }} />
              </div>
              <input
                value={post.posted}
                onFocus={e => e.target.select()}
                style={{ fontSize: "100%" }}
              />
            </div>
          );
        })};
      </div>
    );
  }
}
