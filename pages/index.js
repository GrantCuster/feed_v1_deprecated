import React from 'react'
import Head from 'next/head'
import fetch from 'isomorphic-unfetch'
import { makeBaseUrl } from '../utils/utils-general'
import { grid_constants, getColumns } from '../components/grid_contants'
import GridNav from '../components/GridNav'
import Sizer from '../components/Sizer'

class Feed extends React.Component {
  static async getInitialProps({ req, query, asPath }) {
    let baseUrl = ''
    if (req) {
      baseUrl = makeBaseUrl(req)
    }
    const res = await fetch(`${baseUrl}/api/feed_posts`)
    const feed_posts = await res.json()
    return { feed_posts: feed_posts.slice(0, 300) }
  }

  constructor(props) {
    super(props)
    this.state = {
      width: null,
      height: null,
    }
    this.setSize = this.setSize.bind(this)
  }

  setSize(width, height) {
    this.setState({
      width,
      height,
    })
  }

  render() {
    let { url, feed_posts } = this.props
    let { width, height } = this.state

    let grid_always = grid_constants()
    let grid_sized = { width, height, columns: null }
    if (width !== null) grid_sized.columns = getColumns(width)
    let grid = Object.assign({}, grid_always, grid_sized)

    let { font_size, line_height, grem, indent, page_margin } = grid

    let grid_page_style = {
      fontSize: font_size,
      lineHeight: line_height,
      margin: page_margin,
    }

    return (
      <div>
        <Sizer setSize={this.setSize} />
        <Head>
          <title>Grant Custer → Feed</title>
          <meta
            name="description"
            content="A feed of things I'm working on and inspired by."
          />
          <link
            rel="alternate"
            type="application/rss+xml"
            href="http://feed.grantcuster.com/rss"
          />
          <link rel="stylesheet" type="text/css" href="/static/grid.css" />
        </Head>
        <div style={{ ...grid_page_style }}>
          <GridNav grid={grid} url={url} />
        </div>
      </div>
    )
  }
}

export default Feed
