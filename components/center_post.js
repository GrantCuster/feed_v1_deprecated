import React from "react";
import Link from "next/link";
import { slugDate } from "../utils/utils-general.js";

export default ({ post, layout }) => {
  const date_slug = slugDate(post.posted);
  let video_check;
  if (post.img) {
    let splits = post.img.split(".");
    let extension = splits[splits.length - 1].toLowerCase();
    if (extension === "mp4") video_check = true;
  }
  return (
    <div className={layout === 'page' ? 'image-max' : `image-max py3 mx-auto big-100vh`} style={{ maxWidth: layout === 'post' ? 740 : 'none', display: 'grid', alignItems: 'center' }} key={post.posted}>
      <div className="py3">
        <div className="px2 mx-auto" style={{ maxWidth: 740 }}>
          <div className="mb2" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ textTransform: 'capitalize' }}>{post.type} ↓</div>
            <Link
              href={`/center_post_page?date_slug=${date_slug}`}
              as={`/post/${date_slug}`}
            >
              <a className="no-underline hover-underline">
                {new Date(post.posted).toLocaleString()}
              </a>
            </Link>
          </div>
        </div>
        <div className={layout === 'page' ? '' : "small-px2"}>
          {
            post.img ? (
              video_check ? (
                <video
                  src={`${post.img}`}
                  autoPlay
                  loop
                  controls
                />
              ) : (
                  layout === 'page' ?
                    <img
                      className="mx-auto"
                      style={{ display: 'block' }}
                      src={`${post.img}`}
                    />
                    :
                    <Link
                      href={`/center_post_page?date_slug=${date_slug}`}
                      as={`/post/${date_slug}`}
                    >
                      <a className="no-underline hover-underline">
                        <img
                          className="mx-auto"
                          style={{ display: 'block' }}
                          src={`${post.img}`}
                        />
                      </a>
                    </Link>
                )
            ) : (
                <div
                  className="flex"
                  style={{
                    justifyContent: post.type === "work" ? "flex-end" : "flex-start"
                  }}
                >
                  <div
                    className="px2 mb2"
                    style={{
                      fontSize: "2rem",
                      maxWidth: layout === "post" ? "calc(100vw - 1rem)" : "100%"
                    }}
                  >
                    “{post.quote}”
          </div>
                </div>
              )
          }
        </div>
        <div className="px2 mx-auto" style={{ maxWidth: 740 }}>
          {post.text ? (
            <div
              className="mt2"
            >
              <div style={{ color: "#888" }}>
                {post.text}
              </div>
            </div>
          ) : null}
          {post.src ? (
            <div className="mt2" style={{ wordBreak: 'break-word' }}>
              <a href={post.src}>{post.src}</a>
              {post.via ? (
                <span>
                  {" "}
                  via <a href={post.via}>{post.via}</a>
                </span>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
