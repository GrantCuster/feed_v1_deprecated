export let grid_constants = () => {
  let font_size = 16
  let line_height = 1.4
  let grem = Math.round(font_size * line_height)
  let indent = grem / 2
  return {
    font_size,
    line_height,
    grem,
    indent,
    page_margin: grem / 2,
  }
}

export let getColumns = width => {
  let column_target = 240
  let columns = Math.floor(width / column_target)
  return {
    columns,
  }
}
