import React from 'react'
import fetch from 'isomorphic-unfetch'
import Link from 'next/link'
import Nav from '../components/nav'
import Head from 'next/head'
import { makeBaseUrl } from '../utils/utils-general'
import CenterPost from '../components/center_post'

export default class extends React.Component {
  static async getInitialProps({ req, query }) {
    const baseUrl = makeBaseUrl(req)
    const res = await fetch(`${baseUrl}/api/stacks`)
    const stacks_data = await res.json()
    const title_slug = query.title_slug
    const stack_ids = stacks_data.map(s => s.id)
    let stack_index = stack_ids.indexOf(title_slug)
    const stack = stacks_data[stack_index]
    const posts_raw = await fetch(`${baseUrl}/api/feed_posts`)
    const posts = await posts_raw.json()
    const post_dates = posts.map(p => p.posted)
    return { stack, posts, post_dates }
  }

  render() {
    const { url, stack, posts, post_dates } = this.props

    let sorted_posts = stack.posts.slice(0).sort()

    return (
      <div>
        <Head>
          <title>Grant Custer → Stack</title>
        </Head>
        <Nav url={url} />
        <div className="center mb3">
          <div>Stacks ↓</div>
          <h1>{stack.name}</h1>
        </div>
        <div className="px2 py3 mx-auto" style={{ maxWidth: '740px' }}>
          <div>{stack.recap}</div>
        </div>
        <div>
          {sorted_posts.map(post_id => {
            let index = post_dates.indexOf(post_id)
            let post = posts[index]
            return <CenterPost key={post.posted} post={post} layout="post" />
          })}
        </div>
        <div className="center px2 mb4">
          <Link href="/stacks">
            <a>Go to Stacks</a>
          </Link>
        </div>
      </div>
    )
  }
}
