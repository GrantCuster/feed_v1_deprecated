import React from 'react'
import fetch from 'isomorphic-unfetch'
import GridPost from '../components/gl_post'
import Head from 'next/head'
import { makeBaseUrl } from '../utils/utils-general'
import GridNav from '../components/GridNav'
import { calcLayout } from '../components/calcLayout'
import InfiniteScroll from 'react-infinite-scroller'

function capitalize(string) {
  return string.replace(/^\w/, c => c.toUpperCase())
}

class Feed extends React.Component {
  static async getInitialProps({ req, query, asPath }) {
    let baseUrl = ''
    if (req) {
      baseUrl = makeBaseUrl(req)
    }
    const res = await fetch(`${baseUrl}/api/feed_posts`)
    const feed_posts = await res.json()
    return { feed_posts }
  }

  constructor(props) {
    super(props)
    this.state = {
      page: 0,
    }
  }

  loadMore(page) {
    this.setState({ page: page })
  }

  render() {
    let { url, feed_posts, grid } = this.props
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

    let full_row_style = { marginLeft: margin_left, width: width - column_gap }

    console.log(this.state)

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
          <title>Grant Custer → Feed</title>
          <link
            rel="alternate"
            type="application/rss+xml"
            href="http://feed.grantcuster.com/rss"
          />
          <meta
            name="description"
            content="A feed of things I'm working on and inspired by."
          />
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
              FEED
            </div>
            <ul>
              <InfiniteScroll
                pageStart={0}
                loadMore={this.loadMore.bind(this)}
                hasMore={true || false}
                loader={
                  <div className="loader" key={0}>
                    Loading ...
                  </div>
                }
              >
                {feed_posts.slice(0, this.state.page * 20 + 20).map(post => (
                  <GridPost
                    key={post.posted}
                    feed_width={actual_feed_width}
                    post={post}
                    grid={grid}
                  />
                ))}
              </InfiniteScroll>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default calcLayout(Feed)
