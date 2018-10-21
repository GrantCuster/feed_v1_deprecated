import React from 'react'
import fetch from 'isomorphic-unfetch'
import Nav from '../components/nav'
import axios from 'axios'
import Head from 'next/head'
import { makeBaseUrl, extractHostname } from '../utils/utils-general'

export default class extends React.Component {
  static async getInitialProps({ req, query }) {
    let baseUrl = ''
    if (req) {
      baseUrl = makeBaseUrl(req)
    }
    const posts_raw = await fetch(`${baseUrl}/api/feed_posts`)
    const posts = await posts_raw.json()
    const post_dates = posts.map(p => p.posted)
    return { posts, post_dates }
  }

  constructor(props) {
    super(props)
    this.state = {
      stacks: null,
    }
  }

  componentDidMount() {
    fetch(`/api/stacks`)
      .then(res => res.json())
      .then(stacks => {
        this.setState({ stacks: stacks })
      })
  }

  toggleStackAdd(checked, post_id, stack_id) {
    axios
      .post('/api/private/stackit', { post_id, stack_id })
      .then(response => {
        this.setState({ stacks: JSON.parse(response.data.stacks) })
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    let { stacks, posts, post_dates } = this.props
    return (
      <div>
        {posts.map(post => (
          <div
            style={{ padding: '1rem', maxWidth: 740, margin: '0 auto 2rem' }}
          >
            <div>{new Date(post.posted).toLocaleString()}</div>
            <img src={post.img} style={{ width: 740 }} />
            <div>{post.text}</div>
            <div>
              <div>stacks:</div>
              <div>
                {this.state.stacks !== null
                  ? this.state.stacks.map(stack => {
                      let checked = stack.posts.includes(post.posted)
                      return (
                        <span
                          style={{
                            border: 'solid 1px black',
                            marginRight: '0.75rem',
                            cursor: 'pointer',
                          }}
                          onClick={this.toggleStackAdd.bind(
                            this,
                            checked,
                            post.posted,
                            stack.id
                          )}
                        >
                          <input type="checkbox" checked={checked} /> {stack.id}
                        </span>
                      )
                    })
                  : null}
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }
}
