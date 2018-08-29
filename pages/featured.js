import fetch from 'isomorphic-unfetch'
import React from 'react'
import Nav from '../components/nav'
import Head from 'next/head'
import Link from 'next/link'
import { makeBaseUrl, extractHostname } from '../utils/utils-general'
import { format, startOfHour } from 'date-fns'

export default class extends React.Component {
  static async getInitialProps({ req, query }) {
    let baseUrl = ''
    if (req) {
      baseUrl = makeBaseUrl(req)
    }
    const featured_raw = await fetch(`${baseUrl}/api/featured`)
    const featured = await featured_raw.json()
    const posts_raw = await fetch(`${baseUrl}/api/feed_posts`)
    const posts = await posts_raw.json()
    const post_dates = posts.map(p => p.posted)
    return { featured, posts, post_dates }
  }

  render() {
    const { url, featured, posts, post_dates } = this.props
    let space = 40
    let column_width = 8
    return (
      <div>
        <Head>
          <title>Grant Custer → Featured</title>
        </Head>

        <Nav url={url} />
        <div className="center mb3">
          <h1>Stacks</h1>
        </div>
        <div>
          {featured.map(feature => {
            let selected_posts = feature.posts.slice(0, 4)
            return (
              <div key={feature.name}>
                <div className="p2">{feature.name}</div>
                {/* <div>{feature.description}</div> */}
                <div
                  style={{
                    position: 'relative',
                    display: 'grid',
                    gridTemplateColumns: `repeat(${24 + 8 - 1}, 1fr)`,
                    // gridAutoRows: '20px',
                  }}
                >
                  {selected_posts.map((post_date, i) => {
                    let index = post_dates.indexOf(post_date)
                    let post = posts[index]
                    let dated = new Date(post_date)

                    let hours = parseInt(format(startOfHour(dated), 'H'))
                    let column = hours + 1
                    let grid_column = `${column} / ${column + column_width}`
                    return (
                      <div
                        style={{
                          gridColumn: grid_column,
                          marginTop: `${i * space}`,
                          gridRowStart: 1,
                          position: 'relative',
                        }}
                        title={hours}
                      >
                        <img
                          key={post_date}
                          src={post.img}
                          style={{
                            display: 'block',
                            maxWidth: '100%',
                          }}
                        />
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}
