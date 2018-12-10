import React from 'react'
import Link from 'next/link'
import SizedImage from './SizedImage'
import { slugDate } from '../utils/utils-general.js'

function capitalize(string) {
  return string.replace(/^\w/, c => c.toUpperCase())
}

export default ({ post, grid, feed_width, post_page }) => {
  let {
    width,
    height,
    font_size,
    line_height,
    unit,
    margin_top,
    margin_bottom,
    margin_left,
    margin_right,
    columns,
    column_width,
    column_gap,
  } = grid
  let date_slug = slugDate(post.posted)
  return (
    <li style={{ marginBottom: unit }}>
      <div>
        {capitalize(post.type)} ↓{' '}
        {post_page ? (
          <span>{new Date(post.posted).toLocaleDateString()}</span>
        ) : (
          <Link
            href={`/gl_post_page?date_slug=${date_slug}`}
            as={`/post/${date_slug}`}
          >
            <a>{new Date(post.posted).toLocaleDateString()}</a>
          </Link>
        )}
      </div>
      <div style={{ margin: `${unit / 2}px 0` }}>
        {post_page ? (
          <SizedImage src={post.img} grid={grid} max_width={feed_width} />
        ) : (
          <Link
            href={`/gl_post_page?date_slug=${date_slug}`}
            as={`/post/${date_slug}`}
          >
            <a style={{ display: 'block', lineHeight: 0 }}>
              <SizedImage
                src={post.img}
                grid={grid}
                max_width={feed_width}
                max_height={(Math.floor(height / unit) - 6) * unit}
              />
            </a>
          </Link>
        )}
      </div>
      {post.text ? (
        <div>
          <div style={{ textIndent: unit }}>{post.text}</div>
        </div>
      ) : null}
      {post.src ? (
        <div style={{ textIndent: unit, wordBreak: 'break-word' }}>
          <a href={post.src}>{post.src}</a>
          {post.via ? (
            <span>
              {' '}
              via <a href={post.via}>{post.via}</a>
            </span>
          ) : null}
        </div>
      ) : null}
    </li>
  )
}
