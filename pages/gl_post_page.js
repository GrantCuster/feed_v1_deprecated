import React from 'react'
import fetch from 'isomorphic-unfetch'
import Link from 'next/link'
import { slugDate } from '../utils/utils-general'
import GridNav from '../components/GridNav'
import GridPost from '../components/gl_post'
import Footer from '../components/Footer'
import Head from 'next/head'
import { makeBaseUrl } from '../utils/utils-general'

class Post extends React.Component {
  static async getInitialProps({ req, query }) {
    const baseUrl = makeBaseUrl(req)
    const res = await fetch(`${baseUrl}/api/feed_posts`)
    const feed_posts = await res.json()
    const date_slug = query.date_slug
    const post_dates = feed_posts.map(p => slugDate(p.posted))
    const post_index = post_dates.indexOf(date_slug)
    const post = feed_posts[post_index]
    return { post }
  }

  render() {
    const { url, post } = this.props

    return (
      <div>
        <Head>
          <title>Grant Custer → Post</title>
        </Head>
        <div style={{ paddingLeft: '2ch', paddingRight: '2ch' }}>
          <GridNav url={url} />
          <div style={{}}>
            <div style={{}}>Post</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <GridPost key={post.posted} post={post} post_page={true} />
            </ul>
            <div style={{}}>
              <Link href="/">
                <a>Go to Feed</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Post
