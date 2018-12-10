import React from 'react'
import Link from 'next/link'
import Head from 'next/head'

export default ({ grid }) => {
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
  return (
    <div
      style={{
        marginTop: unit,
        padding: `0 ${margin_left}px`,
        textIndent: unit,
      }}
    >
      {Object.keys(grid)
        .map(key => `${key}: ${grid[key]}`)
        .join(', ')}
    </div>
  )
}
