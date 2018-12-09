import React from 'react'
import Link from 'next/link'
import Head from 'next/head'

export default ({ url }) => {
  return (
    <div>
      <Head>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://rsms.me/inter/inter-ui.css"
        />
        <link rel="stylesheet" type="text/css" href="/static/grid.css" />
      </Head>
      <div>Grant Custer</div>
      <div>
        <ul className="inline-list">
          <li>
            <Link prefetch href="/">
              <a>Feed</a>
            </Link>
          </li>
          <li>
            <Link prefetch href="/">
              <a>Stacks</a>
            </Link>
          </li>
          <li>
            <Link prefetch href="/">
              <a>Info</a>
            </Link>
          </li>
          <li>
            <Link prefetch href="/">
              <a>Writing</a>
            </Link>
          </li>
          <li>
            <Link prefetch href="/">
              <a>Misc</a>
            </Link>
          </li>
          <li>
            <Link prefetch href="/">
              <a>Twitter</a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
