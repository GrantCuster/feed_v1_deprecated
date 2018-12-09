import React from 'react'
import Link from 'next/link'
import SizedImage from './SizedImage'
import { slugDate } from '../utils/utils-general.js'

export default ({ post, layout, style }) => {
  let {
    lh,
    feed_actual_columns,
    cstep,
    coffset,
    gutter,
    feed_width,
    vspacer,
  } = style
  const date_slug = slugDate(post.posted)
  let video_check
  if (post.img) {
    let splits = post.img.split('.')
    let extension = splits[splits.length - 1].toLowerCase()
    if (extension === 'mp4') video_check = true
  }
  return (
    <div key={post.posted} style={{ padding: `0 0 ${vspacer}px 0` }}>
      <div>
        <div>
          <div>
            <div>
              <span style={{ textTransform: 'capitalize' }}>{post.type}</span> ↓{' '}
              <Link
                href={`/center_post_page?date_slug=${date_slug}`}
                as={`/post/${date_slug}`}
              >
                <a className="">{new Date(post.posted).toLocaleString()}</a>
              </Link>
            </div>
          </div>
        </div>
        <div style={{ padding: `${lh * 0.5}px 0` }}>
          {post.img ? (
            video_check ? (
              <video src={`${post.img}`} autoPlay loop controls />
            ) : layout === 'page' ? (
              <img style={{ display: 'block' }} src={`${post.img}`} />
            ) : (
              <Link
                href={`/center_post_page?date_slug=${date_slug}`}
                as={`/post/${date_slug}`}
              >
                <a>
                  <SizedImage src={post.img} lh={lh} feed_width={feed_width} />
                </a>
              </Link>
            )
          ) : (
            <div>
              <div>“{post.quote}”</div>
            </div>
          )}
        </div>
        <div style={{ paddingLeft: lh }}>
          {post.text ? (
            <div>
              <div>{post.text}</div>
            </div>
          ) : null}
          {post.src ? (
            <div style={{ wordBreak: 'break-word' }}>
              <a href={post.src}>{post.src}</a>
              {post.via ? (
                <span>
                  {' '}
                  via <a href={post.via}>{post.via}</a>
                </span>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: lh / 2,
          left: 0,
          width: '100%',
          borderBottom: 'solid 1px black',
          display: 'none',
        }}
      />
    </div>
  )
}
