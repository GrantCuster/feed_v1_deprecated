import fetch from "isomorphic-unfetch";
import React from "react";
import Nav from "../components/nav";
import Head from "next/head";
import Link from "next/link";
import { makeBaseUrl, extractHostname } from "../utils/utils-general";

export default class extends React.Component {
  static async getInitialProps({ req, query }) {
    let baseUrl = "";
    if (req) {
      baseUrl = makeBaseUrl(req);
    }
    const featured_raw = await fetch(`${baseUrl}/api/featured`);
    const featured = await featured_raw.json();
    const posts_raw = await fetch(`${baseUrl}/api/feed_posts`);
    const posts = await posts_raw.json();
    const post_dates = posts.map(p => p.posted);
    return { featured, posts, post_dates };
  }

  render() {
    const { url, featured, posts, post_dates } = this.props;
    return (
      <div>
        <Head>
          <title>Grant Custer → Featured</title>
        </Head>

        <Nav url={url} />
        <div className="center mb3">
          <h1>Featured</h1>
        </div>
        <div>
          {featured.map(feature => {
            let selected_posts = feature.posts.slice(0, 4);
            return (
              <div key={feature.name}>
                <div>{feature.name}</div>
                <div>{feature.description}</div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gridTemplateRows: "1fr 1fr",
                    gridColumnGap: "1rem",
                    gridRowGap: "1rem",
                    padding: "1rem",
                    height: 400
                  }}
                >
                  {selected_posts.map(post_date => {
                    let index = post_dates.indexOf(post_date);
                    let post = posts[index];
                    return (
                      <div key={post_date} style={{ display: "grid" }}>
                        <div
                          style={{
                            display: "grid",
                            alignItems: "center",
                            justifyItems: "center"
                          }}
                        >
                          <img
                            src={post.img}
                            style={{
                              maxWidth: "100%",
                              maxHeight: "100%",
                              display: "block"
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
