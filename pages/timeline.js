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

export default class extends React.Component {
  static async getInitialProps({ req, query }) {
    const baseUrl = makeBaseUrl(req)
    const res = await fetch(`${baseUrl}/api/feed_posts`)
    let feed_posts = await res.json()
    let display_posts = feed_posts.filter(p => p.type === 'work')
    return { feed_posts: display_posts }
  }

  render() {
    const { url, feed_posts } = this.props
    let space = 40
    let display_posts = feed_posts.slice(0, 50).reverse()
    let today = new Date()
    let today_month = startOfMonth(today)
    let end_date = subMonths(startOfMonth(display_posts[0].posted), 1)
    let months = differenceInMonths(today_month, end_date)
    let month_list = []
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
    return (
      <div>
        <Head>
          <title>Grant Custer → Timeline</title>
        </Head>

        <Nav url={url} />
        <div className="center mb3">
          <h1>Timeline</h1>
        </div>

        <div className="measure-max image-max mx-auto px2 mb2">
          My work posts spaced by date and time of day.
        </div>
        <div
          style={{
            position: 'relative',
          }}
        >
          <div>
            {display_posts.map((post, i) => {
              const date_slug = slugDate(post.posted)
              let dated = new Date(post.posted)
              let hours = parseInt(format(startOfHour(dated), 'H'))
              let column = hours + 1
              let days_offset = differenceInCalendarDays(today, dated)
              return (
                <Link
                  href={`/feed_post_page?date_slug=${date_slug}`}
                  as={`/post/${date_slug}`}
                >
                  <a
                    style={{
                      position: 'absolute',
                      display: 'block',
                      left: `${(column / 24) * (100 - 33)}%`,
                      width: '33%',
                      top: `${days_offset * space}`,
                    }}
                    title={dated.toLocaleString()}
                  >
                    <img
                      key={post.posted}
                      src={post.img}
                      style={{
                        display: 'block',
                        maxHeight: '22vw',
                        maxWidth: '100%',
                      }}
                    />
                  </a>
                </Link>
              )
            })}
          </div>
          <div>
            {month_list.map((month, i) => {
              return (
                <div
                  className="px2"
                  style={{
                    position: 'absolute',
                    display: 'block',
                    left: `0`,
                    width: '33%',
                    top: `${month.offset * space}`,
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
      </div>
    )
  }
}
