import fetch from 'isomorphic-unfetch'
import React from 'react'
import Nav from '../components/nav'
import Head from 'next/head'
import Link from 'next/link'
import { makeBaseUrl, extractHostname } from '../utils/utils-general'
import { format, startOfHour } from 'date-fns'
import { last } from 'lodash'

export default class extends React.Component {
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
        console.log(sa)
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
    const { url, stacks, posts, post_dates } = this.props
    return (
      <div>
        <Head>
          <title>Grant Custer → Stacks</title>
        </Head>
        <Nav url={url} />
        <div className="center mb3">
          <h1>Stacks</h1>
        </div>
        <div
          className="image-max mb3 px2 mx-auto"
          style={{
            maxWidth: 740,
          }}
        >
          Collections of posts based around certain projects or themes.
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
            padding: '1rem',
            gridColumnGap: '2rem',
            gridRowGap: '3rem',
            paddingBottom: '4rem',
          }}
        >
          {stacks.map(stack => {
            let sorted_posts = stack.posts.slice(0).sort()
            let last_date = last(sorted_posts)
            let index = post_dates.indexOf(last_date)
            let last_post = posts[index]
            return (
              <div key={stack.name} style={{}}>
                <div style={{}}>
                  <Link
                    href={`/stack_page?title_slug=${stack.id}`}
                    as={`/stack/${stack.id}`}
                  >
                    <a
                      src={last_post.img}
                      style={{
                        width: '100%',
                        display: 'block',
                        paddingTop: '56.25%',
                        backgroundImage: `url('${last_post.img}')`,
                        backgroundSize: 'contain',
                        backgroundPosition: 'center center',
                        backgroundRepeat: 'no-repeat',
                      }}
                    />
                  </Link>
                </div>
                <div>
                  <Link
                    href={`/stack_page?title_slug=${stack.id}`}
                    as={`/stack/${stack.id}`}
                  >
                    <a>
                      <h3 style={{ margin: 0, marginTop: '1rem' }}>
                        {stack.name}
                      </h3>
                    </a>
                  </Link>
                  <div>{stack.description}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}
