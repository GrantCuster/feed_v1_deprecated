import React from 'react'
import Link from 'next/link'
import SizedImage from './SizedImage'
import { slugDate } from '../utils/utils-general.js'

function capitalize(string) {
  return string.replace(/^\w/, c => c.toUpperCase())
}

export default ({ post, post_page }) => {
  let date_slug = slugDate(post.posted)
  return (
    <li style={{ marginBottom: '1.5rem' }}>
      <div style={{ marginBottom: '0.5rem' }}>
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
      <div
        style={{
          marginBottom: '0.5rem',
          marginLeft: post_page ? '-2ch' : 0,
          marginRight: post_page ? '-2ch' : 0,
        }}
      >
        {post_page ? (
          <SizedImage src={post.img} />
        ) : (
          <Link
            href={`/gl_post_page?date_slug=${date_slug}`}
            as={`/post/${date_slug}`}
          >
            <a style={{ display: 'block' }}>
              <SizedImage src={post.img} />
            </a>
          </Link>
        )}
      </div>
      {post.text ? <div style={{ textIndent: '2ch' }}>{post.text}</div> : null}
      {post.src ? (
        <div style={{ textIndent: '2ch', wordBreak: 'break-word' }}>
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
