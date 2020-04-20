import React from 'react'
import Link from 'next/link'
import Head from 'next/head'

export default ({ url, grid }) => {
  let nav_links = [
    ['Feed', '/'],
    ['Index', 'http://index.grantcuster.com'],
    // ['Info', '/info'],
    // ['Writing', '/writing'],
    // ['Misc', '/misc'],
    ['Twitter', 'http://twitter.com/grantcuster'],
  ]

  return (
    <div>
      <div style={{}}>Grant Custer</div>
      <ul
        style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          display: 'flex',
          flexWrap: 'wrap',
          paddingLeft: '2ch',
          marginBottom: 24,
        }}
      >
        {nav_links.map(l => (
          <li key={l[0]} style={{ marginRight: '1ch' }}>
            {url && url.pathname === l[1] ? (
              <span>{l[0]}</span>
            ) : (
              <Link href={l[1]}>
                <a>{l[0]}</a>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
