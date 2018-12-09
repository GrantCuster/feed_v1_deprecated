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
      <link
        rel="stylesheet"
        type="text/css"
        href="https://rsms.me/inter/inter-ui.css"
      />
      <link rel="stylesheet" type="text/css" href="/static/grid.css" />

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
                <a href={l[1]}>{l[0]}</a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
