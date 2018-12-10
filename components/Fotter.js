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

  let scaler = Math.max(width, height)
  let width_scaled = (width / scaler) * 0.8
  let height_scaled = (height / scaler) * 0.8

  return (
    <div>
      <div style={{ ...full_row_style }}>Grant Custer</div>
      <div style={{ ...full_row_style }}>Design–Build</div>
      <div style={{ ...full_row_style }}>
        <div
          style={{
            position: 'absolute',
            width: width_scaled * unit,
            left: (unit - width_scaled * unit) / 2,
            height: height_scaled * unit,
            top: (unit - height_scaled * unit) / 2,
            border: 'solid 1px black',
            display: 'none',
          }}
        />
        {grid.width}x{grid.height}
      </div>
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
