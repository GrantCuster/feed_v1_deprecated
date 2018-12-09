import React from 'react'
import fetch from 'isomorphic-unfetch'
import Link from 'next/link'
import { slugDate } from '../utils/utils-general.js'
// import Nav from "../components/nav";
import Nav from '../components/nav2'
import FeedPost from '../components/feed_post'
import CenterPost from '../components/grid_post'
import Head from 'next/head'
import Router from 'next/router'
import { makeBaseUrl } from '../utils/utils-general'

export default class extends React.Component {
  static async getInitialProps({ req, query, asPath }) {
    let baseUrl = ''
    if (req) {
      baseUrl = makeBaseUrl(req)
    }
    const res = await fetch(`${baseUrl}/api/feed_posts`)
    const feed_posts = await res.json()
    return { feed_posts }
  }

  constructor() {
    super()
    this.state = {
      scrollPosition: 0,
      max_pages: false,
      ww: null,
      wh: null,
    }
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
  }

  componentDidMount() {
    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }

  updateWindowDimensions() {
    this.setState({
      ww: window.innerWidth,
      wh: window.innerHeight,
    })
  }

  displayPosts(posts, style) {
    const { url } = this.props
    const query = url.query

    let {
      lh,
      feed_actual_columns,
      cstep,
      coffset,
      gutter,
      feed_width,
      vspacer,
    } = style

    let pages = 0
    if (this.state.max_pages !== false) {
      pages = this.state.max_pages
    } else {
      if (query.page) pages = parseInt(query.page)
    }

    let use_pages = pages + 1

    let per_page = 20
    let temp_page_array = []
    for (let i = 0; i < use_pages; i++) {
      temp_page_array.push(posts.slice(i * per_page, (i + 1) * per_page))
    }
    let pages_obj = (
      <div>
        {temp_page_array.map((posts, i) => {
          return (
            <div key={`page_${i}`} className="posts-page" data-page-num={i}>
              {posts.map(post => {
                return (
                  <CenterPost
                    key={post.posted}
                    post={post}
                    style={style}
                    vspacer={vspacer}
                    layout="post"
                  />
                )
              })}
            </div>
          )
        })}
      </div>
    )
    return pages_obj
  }

  render() {
    let { ww, wh } = this.state
    let font_size = 16
    let line_height = 1.4
    let lh = font_size * line_height
    let column_target = 240
    let columns = Math.floor(ww / column_target)
    let gutter = lh
    let cstep = ww / columns
    let coffset = lh / 2

    const { url, feed_posts } = this.props
    const query = url.query

    let nav_links = ['Feed', 'Stacks', 'Info', 'Writing', 'Misc', 'Twitter']

    let feed_target_width = 740
    let feed_target_columns = Math.ceil(feed_target_width / cstep)
    let feed_actual_columns =
      feed_target_columns <= columns ? feed_target_columns : columns
    let feed_target_offset = Math.ceil((columns - feed_actual_columns) / 2)

    let feed_title_style = {}
    if (columns > 3) {
      feed_title_style.position = 'absolute'
      feed_title_style.left = Math.floor((columns - 4) / 2) * cstep + coffset
      feed_title_style.width = cstep
    } else {
      feed_title_style.marginLeft = coffset
      feed_title_style.width = ww - gutter
    }

    let display_posts = feed_posts.slice(0)

    let lines_fit = Math.floor(wh / lh)

    let vspacer = lh * 2
    if (lines_fit < 24 || ww < lines_fit * lh) {
      vspacer = lh
    }

    return (
      <div style={{ background: '#efefef' }}>
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
          <link
            rel="stylesheet"
            type="text/css"
            href="https://rsms.me/inter/inter-ui.css"
          />
          <link rel="stylesheet" type="text/css" href="/static/grid.css" />
        </Head>

        {[...Array(columns)].map((c, i) => (
          <div
            style={{
              position: 'fixed',
              left: i * cstep + coffset,
              width: cstep - gutter,
              height: '100%',
              background: '#ddd',
              display: true ? 'none' : 'block',
            }}
          />
        ))}

        {this.state.ww !== null ? (
          <div style={{ padding: `${lh / 2}px 0` }}>
            <div style={{}}>
              <div style={{ marginLeft: lh / 2, width: ww - gutter }}>
                <div>Grant Custer</div>
              </div>
              <div style={{ marginLeft: lh / 2, width: ww - gutter }}>
                <ul style={{ marginLeft: lh / 2 }}>
                  {nav_links.map(name => (
                    <li style={{ display: 'inline-block', marginLeft: lh / 2 }}>
                      {name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div
              style={{
                width: feed_actual_columns * cstep - gutter,
                marginLeft: feed_target_offset * cstep + coffset,
              }}
            >
              <div
                style={{
                  fontSize: font_size * 2,
                  lineHeight: line_height,
                  paddingTop: vspacer,
                  paddingBottom: vspacer,
                }}
              >
                <h1>Feed</h1>
              </div>

              {this.displayPosts(display_posts, {
                lh,
                feed_actual_columns,
                cstep,
                coffset,
                gutter,
                vspacer,
                feed_width: feed_actual_columns * cstep - gutter,
              })}
            </div>
            <div style={{ marginLeft: lh / 2, width: ww - gutter }}>
              {ww}x{wh}
            </div>
          </div>
        ) : null}
      </div>
    )
  }
}
