import fetch from "isomorphic-unfetch";
import React from "react";
import Nav from "../components/nav";
import Remarkable from "remarkable";
import Head from "next/head";
import Link from "next/link";
import { makeBaseUrl, extractHostname } from "../utils/utils-general";

export default class extends React.Component {
  static async getInitialProps({ req, query }) {
    const baseUrl = makeBaseUrl(req);
    const res = await fetch(`${baseUrl}/api/list_writings`);
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
        {files.map(f => {
          return (
            <div
              className="measure-max image-max mx-auto px2 mb4"
              key={f.meta.filename}
            >
              <div className="sans-serif">
                {new Date(f.meta.date).toLocaleString()}
                {f.meta.external ? (
                  <span> on {extractHostname(f.meta.external)}</span>
                ) : null}
              </div>
              <div className="">
                <h2>
                  {f.meta.external ? (
                    <a href={f.meta.external}>{f.meta.title}</a>
                  ) : (
                    <Link
                      href={`/writing_page?file_slug=${f.meta.filename.slice(
                        0,
                        -3
                      )}`}
                      as={`/writing/${f.meta.filename.slice(0, -3)}`}
                    >
                      <a>{f.meta.title}</a>
                    </Link>
                  )}
                </h2>
              </div>
              {f.meta.preview_image ? (
                <img
                  className="mb2 mt1"
                  style={{ maxHeight: "10rem" }}
                  src={f.meta.preview_image}
                />
              ) : null}
              <div className="mb2">
                {f.content
                  .replace(/\n\n/g, " ¶ ")
                  .replace(" ¶ ", "")
                  .split(" ")
                  .splice(0, 40)
                  .join(" ")}
                {"..."}
              </div>
              <div>
                {f.meta.external ? (
                  <a href={f.meta.external}>Read more</a>
                ) : (
                  <Link
                    href={`/writing_page?file_slug=${f.meta.filename.slice(
                      0,
                      -3
                    )}`}
                    as={`/writing/${f.meta.filename.slice(0, -3)}`}
                  >
                    <a>Read more</a>
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
