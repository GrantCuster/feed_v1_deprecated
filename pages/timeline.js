import fetch from 'isomorphic-unfetch'
import React from 'react'
import Nav from '../components/nav'
import Head from 'next/head'
import Link from 'next/link'
import { makeBaseUrl, extractHostname } from '../utils/utils-general'
import {
  format,
  startOfHour,
  differenceInCalendarDays,
  startOfMonth,
  differenceInMonths,
  subMonths,
  endOfMonth,
} from 'date-fns'
import { slugDate } from '../utils/utils-general.js'

let chunk_size = 50

export default class extends React.Component {
  static async getInitialProps({ req, query }) {
    const baseUrl = makeBaseUrl(req)
    const res = await fetch(`${baseUrl}/api/feed_posts`)
    let feed_posts = await res.json()
    let display_posts = feed_posts.filter(p => p.type === 'work')
    return { feed_posts: display_posts }
  }

  constructor(props) {
    super(props)
    this.state = {
      chunks: 1,
      width: null,
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
    this.setState({ width: window.innerWidth })
  }

  loadMore() {
    this.setState({ chunks: this.state.chunks + 1 })
  }

  loadAll() {
    let max_chunks = Math.ceil(this.props.feed_posts.length / chunk_size)
    this.setState({ chunks: max_chunks })
  }

  render() {
    const { url, feed_posts } = this.props
    let chunk_limit = Math.min(
      this.state.chunks * chunk_size,
      feed_posts.length
    )
    let display_posts = feed_posts.slice(0, chunk_limit).reverse()
    let today = new Date()
    let today_month = startOfMonth(today)
    let end_date = subMonths(startOfMonth(display_posts[0].posted), 1)
    let months = differenceInMonths(today_month, end_date)
    let month_list = []

    let last_post = display_posts[0]
    let last_post_date = new Date(last_post.posted)
    let last_days_offset = differenceInCalendarDays(today, last_post_date)

    for (let i = 0; i < months; i++) {
      if (i === 0) {
        let object = {
          name: format(today_month, 'MMMM YYYY'),
          offset: 0,
        }
        month_list.push(object)
      } else {
        let month = subMonths(today_month, i)
        let object = {
          name: format(month, 'MMMM YYYY'),
          offset: differenceInCalendarDays(today, endOfMonth(month)),
        }

        month_list.push(object)
      }
    }

    let post_width = 33
    let max_height = 22
    let space = 40
    if (this.state.width < 600) {
      post_width = 50
      max_height = 33
      space = 20
    }
    return (
      <div>
        <Head>
          <title>Grant Custer → Timeline</title>
          <meta
            name="description"
            content="Work posts visualized by date and time of day."
          />
        </Head>

        <Nav url={url} />
        <div className="center mb3">
          <h1>Timeline</h1>
        </div>

        <div className="measure-max image-max mx-auto px2 mb2">
          My work posts spaced by date and time of day.{' '}
          {display_posts.length < feed_posts.length ? (
            <button className="button-link" onClick={this.loadAll.bind(this)}>
              Load all {feed_posts.length} images.
            </button>
          ) : null}
        </div>
        {this.state.width !== null ? (
          <div
            style={{
              position: 'relative',
            }}
          >
            <div
              style={{
                position: 'relative',
                paddingTop: `${last_days_offset * space}px`,
                width: '100%',
              }}
            >
              <div style={{ width: `${post_width}%` }}>
                <img
                  src={last_post.img}
                  style={{
                    display: 'block',
                    maxWidth: '100%',
                    maxHeight: `${max_height}vw`,
                    opacity: 0,
                  }}
                />
              </div>
              {display_posts.length < feed_posts.length ? (
                <button
                  className="button-link"
                  style={{
                    marginTop: space,
                    padding: '1em 0',
                    width: '100%',
                    background: '#efefef',
                  }}
                  onClick={this.loadMore.bind(this)}
                >
                  Load more
                </button>
              ) : (
                  <div style={{ height: 57 }} />
                )}
            </div>
            <div>
              {display_posts.map((post, i) => {
                const date_slug = slugDate(post.posted)
                let dated = new Date(post.posted)
                let hours = parseInt(format(startOfHour(dated), 'H'))
                let column = hours
                let days_offset = differenceInCalendarDays(today, dated)
                return (
                  <div
                    style={{
                      position: 'absolute',
                      display: 'block',
                      left: `${(column / 23) * (100 - post_width)}%`,
                      width: `${post_width}%`,
                      top: `${days_offset * space}px`,
                    }}
                  >
                    <Link
                      href={`/center_post_page?date_slug=${date_slug}`}
                      as={`/post/${date_slug}`}
                    >
                      <a
                        style={{
                          display: 'block',
                        }}
                        title={`${dated.toLocaleString()} - ${post.text}`}
                      >
                        <img
                          key={post.posted}
                          src={post.img}
                          style={{
                            display: 'block',
                            maxWidth: '100%',
                            maxHeight: `${max_height}vw`,
                          }}
                        />
                      </a>
                    </Link>
                  </div>
                )
              })}
            </div>
            <div>
              {month_list.map((month, i) => {
                return (
                  <div
                    className="px2"
                    key={month.name}
                    style={{
                      position: 'absolute',
                      display: 'block',
                      left: `0`,
                      width: `${post_width}%`,
                      top: `${month.offset * space}px`,
                      textTransform: 'uppercase',
                      color: '#aaa',
                    }}
                  >
                    {month.name}
                  </div>
                )
              })}
            </div>
          </div>
        ) : null}
      </div>
    )
  }
}
