import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { callbackify } from 'util'

export default ({ url, unit, grid }) => {
  let full_row_style = { marginLeft: unit / 2, marginRight: unit / 2 }
  let nav_links = [
    ['Feed', '/'],
    ['Stacks', '/stacks'],
    ['Info', '/info'],
    ['Writing', '/writing'],
    ['Misc', '/misc'],
    ['Twitter', 'http://twitter.com/grantcuster'],
  ]

  let { grem, width, height } = grid

  return (
    <div>
      <div>Grant Custer</div>
      <div>Design–Build</div>
      {width === null ? (
        <div>Calculating...</div>
      ) : (
        <div>
          {width}x{height}
        </div>
      )}
      <div>
        <ul style={{ marginLeft: grem / 2 }}>
          {nav_links.map(l => (
            <li
              style={{ display: 'inline-block', marginLeft: grem / 2 }}
              key={l[0]}
            >
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
    </div>
  )
}
