import React from 'react'
import Link from 'next/link'

export default ({ url }) => {
  return (
    <div className="flex justify-between mb2">
      <div className="p1 bold">
        <Link prefetch href="/">
          <a className="no-underline p1 block">Grant Custer</a>
        </Link>
      </div>
      <div className="flex p1 flex-wrap">
        <div className="">
          <Link prefetch href="/">
            <a
              className={`${
                url.pathname === '/' ? 'link-active' : ''
              } p1 block`}
            >
              Feed
            </a>
          </Link>
        </div>
        <div className="">
          <Link prefetch href="/stacks">
            <a
              className={`${
                url.pathname === '/stacks' ? 'link-active' : ''
              } p1 block`}
            >
              Stacks
            </a>
          </Link>
        </div>

        <div className="">
          <Link prefetch href="/info">
            <a
              className={`${
                url.pathname === '/info' ? 'link-active' : ''
              } p1 block`}
            >
              Info
            </a>
          </Link>
        </div>
        <div className="">
          <Link prefetch href="/writing">
            <a
              className={`${
                url.pathname === '/writing' ? 'link-active' : ''
              } p1 block`}
            >
              Writing
            </a>
          </Link>
        </div>
        <div className="">
          <Link prefetch href="/misc">
            <a
              className={`${
                url.pathname === '/misc' ? 'link-active' : ''
              } p1 block`}
            >
              Misc
            </a>
          </Link>
        </div>
        <div className="">
          <a className="p1 block" href="http://twitter.com/grantcuster">
            Twitter→
          </a>
        </div>
      </div>
    </div>
  )
}
