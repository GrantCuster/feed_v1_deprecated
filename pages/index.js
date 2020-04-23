import React from 'react'
import fetch from 'isomorphic-unfetch'
import GridPost from '../components/gl_post'
import Head from 'next/head'
import { makeBaseUrl } from '../utils/utils-general'
import GridNav from '../components/GridNav'
import InfiniteScroll from 'react-infinite-scroller'
import { grid_constants, getColumns } from '../components/grid_contants'

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
    return (
      <div>
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
        <div style={{ maxWidth: 840, margin: '0 auto' }}>
          <GridNav url={url} />
          <div style={{}}>
            <div style={{ marginBottom: 16 }}>
              <h1
                style={{
                  fontSize: '1rem',
                  margin: 0,
                  padding: 0,
                  lineHeight: 1.5,
                  fontWeight: 'normal',
                }}
              >
                Feed
              </h1>
              <div style={{ textIndent: '2ch' }}>
                Work and Inspiration in progress.
              </div>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
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
                  <GridPost key={post.posted} post={post} />
                ))}
              </InfiniteScroll>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Feed
