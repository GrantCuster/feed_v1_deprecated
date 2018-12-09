import React from 'react'
import Link from 'next/link'
import Head from 'next/head'

export default ({ url, grid }) => {
  let {
    width,
    height,
    font_size,
    line_height,
    unit,
    columns,
    column_gap,
    column_width,
    margin_left,
  } = grid
  let full_row_style = { marginLeft: margin_left, width: width - column_gap }
  let nav_links = [
    ['Feed', '/'],
    ['Stacks', '/stacks'],
    ['Info', '/info'],
    ['Writing', '/writing'],
    ['Misc', '/misc'],
    ['Twitter', 'http://twitter.com/grantcuster'],
  ]
  return (
    <div>
      <div style={{ ...full_row_style }}>Grant Custer</div>
      <div style={{ ...full_row_style }}>
        <ul style={{ marginLeft: unit / 2 }}>
          {nav_links.map(l => (
            <li
              style={{ display: 'inline-block', marginLeft: unit / 2 }}
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
