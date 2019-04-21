import fetch from 'isomorphic-unfetch'
import React from 'react'
import Nav from '../components/nav'
import Head from 'next/head'
import Link from 'next/link'
import { makeBaseUrl, extractHostname } from '../utils/utils-general'
import GridNav from '../components/GridNav'
import Footer from '../components/Footer'
import { format, startOfHour } from 'date-fns'
import { last } from 'lodash'
import SizedImage from '../components/SizedImage'
import { calcLayout } from '../components/calcLayout'

class Stacks extends React.Component {
  static async getInitialProps({ req, query }) {
    let baseUrl = ''
    if (req) {
      baseUrl = makeBaseUrl(req)
    }
    let stacks_raw = await fetch(`${baseUrl}/api/stacks`)
    let stacks = await stacks_raw.json()
    let posts_raw = await fetch(`${baseUrl}/api/feed_posts`)
    let posts = await posts_raw.json()
    let post_dates = posts.map(p => p.posted)

    stacks = stacks
      .sort((a, b) => {
        let sa = last(a.posts.sort())
        let sb = last(b.posts.sort())
        if (sb > sa) {
          return -1
        } else if (sa > sb) {
          return 1
        } else {
          return 0
        }
      })
      .reverse()

    return { stacks, posts, post_dates }
  }

  render() {
    const { url, stacks, posts, post_dates, grid } = this.props
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

    let max_columns_each = 2
    let actual_columns_width = max_columns_each
    if (columns < max_columns_each) {
      actual_columns_width = columns
    }

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
          <title>Grant Custer → Stacks</title>
        </Head>
        <GridNav url={url} grid={grid} />
        <div
          style={{
            fontSize: font_size,
            marginTop: unit,
            marginLeft: margin_left,
            marginBottom: unit,
            width: width - column_gap,
          }}
        >
          <div style={{ fontSize: font_size }}>Stacks</div>
          <div style={{ textIndent: unit }}>
            Collections of posts based around certain projects or themes.
          </div>
        </div>
        <div
          style={{
            display: 'grid',
            padding: `0 ${unit / 2}px`,
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gridColumnGap: column_gap,
            gridRowGap: unit,
          }}
        >
          {stacks.map(stack => {
            let sorted_posts = stack.posts.slice(0).sort()
            let last_date = last(sorted_posts)
            let index = post_dates.indexOf(last_date)
            let last_post = posts[index]
            return (
              <div
                key={stack.name}
                style={{
                  gridColumn: `span ${actual_columns_width}`,
                }}
              >
                <div
                  style={{
                    height: (Math.floor(height / unit) / 3) * unit,
                    marginBottom: unit / 2,
                    marginTop: unit / 2,
                  }}
                >
                  <Link
                    href={`/stack_page?title_slug=${stack.id}`}
                    as={`/stack/${stack.id}`}
                  >
                    <a style={{ display: 'block', lineHeight: 0 }}>
                      <SizedImage
                        src={last_post.img}
                        max_width={
                          actual_columns_width * column_width - column_gap
                        }
                        grid={grid}
                        container_height={
                          (Math.floor(height / unit) / 3) * unit
                        }
                        max_height={(Math.floor(height / unit) / 3) * unit}
                      />
                    </a>
                  </Link>
                </div>

                <div style={{}}>
                  <Link
                    href={`/stack_page?title_slug=${stack.id}`}
                    as={`/stack/${stack.id}`}
                  >
                    <a>
                      <h3>{stack.name}</h3>
                    </a>
                  </Link>
                </div>

                <div>
                  <div style={{ textIndent: unit }}>{stack.description}</div>
                </div>
              </div>
            )
          })}
        </div>
        <Footer grid={grid} />
      </div>
    )
  }
}

export default calcLayout(Stacks)
