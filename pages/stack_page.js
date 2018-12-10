import React from 'react'
import fetch from 'isomorphic-unfetch'
import Link from 'next/link'
import Nav from '../components/nav'
import Head from 'next/head'
import { makeBaseUrl } from '../utils/utils-general'
import GridPost from '../components/gl_post'
import GridNav from '../components/GridNav'
import Footer from '../components/Footer'
import { calcLayout } from '../components/calcLayout'

class Stack extends React.Component {
  static async getInitialProps({ req, query }) {
    const baseUrl = makeBaseUrl(req)
    const res = await fetch(`${baseUrl}/api/stacks`)
    const stacks_data = await res.json()
    const title_slug = query.title_slug
    const stack_ids = stacks_data.map(s => s.id)
    let stack_index = stack_ids.indexOf(title_slug)
    const stack = stacks_data[stack_index]
    const posts_raw = await fetch(`${baseUrl}/api/feed_posts`)
    const posts = await posts_raw.json()
    const post_dates = posts.map(p => p.posted)
    return { stack, posts, post_dates }
  }

  render() {
    let { url, grid, posts, post_dates, stack } = this.props
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

    let sorted_posts = stack.posts.slice(0).sort()

    let target_feed_width = 860
    let actual_feed_columns = Math.min(
      columns,
      Math.round(target_feed_width / column_width)
    )
    let actual_feed_width = actual_feed_columns * column_width - column_gap

    let feed_offset =
      Math.ceil((columns - actual_feed_columns) / 2) * column_width +
      margin_left

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
          <title>Grant Custer → Stack</title>
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
              Stack
            </div>
            <h1 style={{ marginBottom: unit, fontSize: font_size * 2 }}>
              {stack.name}
            </h1>

            <div>{stack.recap}</div>
            <ul>
              {sorted_posts.map(post_id => {
                let index = post_dates.indexOf(post_id)
                let post = posts[index]
                return (
                  <GridPost
                    feed_width={actual_feed_width}
                    key={post.posted}
                    post={post}
                    grid={grid}
                  />
                )
              })}
            </ul>
            <div
              style={{
                margin: `${vspacer}px ${0}px ${0}px ${0}px`,
              }}
            >
              <Link href="/stacks">
                <a>Go to Stacks</a>
              </Link>
            </div>
          </div>
          <Footer grid={grid} />
        </div>
      </div>
    )
  }
}

export default calcLayout(Stack)
