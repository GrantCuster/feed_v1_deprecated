import React from 'react'
import fetch from 'isomorphic-unfetch'
import Link from 'next/link'
import { slugDate } from '../utils/utils-general.js'
// import Nav from "../components/nav";
import Nav from '../components/nav2'
import FeedPost from '../components/feed_post'
import CenterPost from '../components/center_post'
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
    }
    this.handleInterval = this.handleInterval.bind(this)
    this.handleRequestAnimationFrame = this.handleRequestAnimationFrame.bind(
      this
    )
  }

  componentDidMount() {
    const INTERVAL = 100
    this.intervalID = setInterval(this.handleInterval, INTERVAL)
  }

  componentWillUnmount() {
    clearInterval(this.intervalID)
    cancelAnimationFrame(this.requestID)
    this.requestID = null
    this.intervalID = null
  }

  getWindowScrollTop() {
    return window.pageYOffset || document.documentElement.scrollTop
  }

  handleInterval() {
    cancelAnimationFrame(this.requestID)
    this.requestID = requestAnimationFrame(this.handleRequestAnimationFrame)
  }

  handleRequestAnimationFrame() {
    const { url } = this.props
    const query = url.query
    const { scrollPosition } = this.state
    const newScrollPosition = this.getWindowScrollTop()
    if (newScrollPosition !== scrollPosition) {
      this.setState({ scrollPosition: newScrollPosition })
      let posts_page = 0
      if (query.page) posts_page = parseInt(query.page)
      const doc_height = document.body.clientHeight
      const screen_height = window.innerHeight
      if (newScrollPosition > doc_height - screen_height * 4) {
        let new_pages = posts_page + 1
        if (new_pages > this.state.max_pages) {
          this.setState({ max_pages: new_pages })
        }
      }
      const post_pages = document.querySelectorAll('.posts-page')
      const top_offsets = Array.from(post_pages)
        .map(page => page.offsetTop)
        .reverse()
      let position_page = 0
      for (let i = 0; i < top_offsets.length; i++) {
        let offset = top_offsets[i]
        if (newScrollPosition > offset) {
          position_page = top_offsets.length - (i + 1)
          break
        }
      }
      if (posts_page !== position_page) {
        if (position_page === 0) {
          let new_query = Object.assign({}, query)
          delete new_query.page
          Router.replace({
            pathname: '/',
            query: new_query,
          })
        } else {
          let new_query = Object.assign({}, query, { page: position_page })
          Router.replace({
            pathname: '/',
            query: new_query,
          })
        }
      }
    }
  }

  displayPosts(posts) {
    const { url } = this.props
    const query = url.query

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
                  <CenterPost key={post.posted} post={post} layout="post" />
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
    const { url, feed_posts } = this.props
    const query = url.query

    let display_posts = feed_posts.slice(0)
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

        <Nav url={url} />
        <div className="center mb3">
          <h1>
            <Link href="/">
              <a className="no-underline">Feed</a>
            </Link>
          </h1>
        </div>
        <div>{this.displayPosts(display_posts)}</div>
      </div>
    )
  }
}
