import React from 'react'
import fetch from 'isomorphic-unfetch'
import Link from 'next/link'
import { slugDate } from '../utils/utils-general'
import GridNav from '../components/GridNav'
import GridPost from '../components/gl_post'
import Footer from '../components/Footer'
import Head from 'next/head'
import { makeBaseUrl } from '../utils/utils-general'
import { calcLayout } from '../components/calcLayout'

class Post extends React.Component {
  static async getInitialProps({ req, query }) {
    const baseUrl = makeBaseUrl(req)
    const res = await fetch(`${baseUrl}/api/feed_posts`)
    const feed_posts = await res.json()
    const date_slug = query.date_slug
    const post_dates = feed_posts.map(p => slugDate(p.posted))
    const post_index = post_dates.indexOf(date_slug)
    const post = feed_posts[post_index]
    return { post }
  }

  render() {
    const { url, grid, post } = this.props
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

    // if (ww < 600 || wh < 600) {
    //   font_size = 14
    // }

    // let lines_fit = Math.floor(wh / lh)
    // let vspacer = lh * 2
    // if (lines_fit < 24 || ww < lines_fit * lh) {
    //   vspacer = lh
    // }

    let actual_feed_width = columns * column_width - column_gap
    let feed_offset = margin_left

    let vspacer = unit

    return (
      <div
        style={{
          fontSize: font_size,
          lineHeight: line_height,
          marginTop: unit / 2,
          marginBottom: unit / 2,
        }}
      >
        <Head>
          <title>Grant Custer → Post</title>
        </Head>
        <div>
          <GridNav url={url} grid={grid} />
          <div
            style={{
              width: actual_feed_width,
              marginLeft: feed_offset,
            }}
          >
            <div
              style={{
                fontSize: font_size,
                margin: `${vspacer}px ${0}px ${0}px ${0}px`,
              }}
            >
              Post
            </div>
            <ul>
              <GridPost
                key={post.posted}
                feed_width={actual_feed_width}
                post={post}
                grid={grid}
                post_page={true}
              />
            </ul>
            <div
              style={{
                margin: `${vspacer}px ${0}px ${0}px ${0}px`,
              }}
            >
              <Link href="/">
                <a>Go to Feed</a>
              </Link>
            </div>
          </div>
          <Footer grid={grid} />
        </div>
      </div>
    )
  }
}

export default calcLayout(Post)
