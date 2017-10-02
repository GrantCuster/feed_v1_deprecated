const timeChunk = (tp, start, end) => {
  if (tp >= start && tp <= end) {
    return (tp - start)/(end - start);
  } else {
    return false;
  }
}

const rotateXY = (angle, point, center) => {
  const a = angle * (Math.PI/180);
  const rx = Math.cos(a) * (point.x - center.x) - Math.sin(a) * (point.y - center.y) + center.x;
  const ry = Math.sin(a) * (point.x - center.x) + Math.cos(a) * (point.y - center.y) + center.y;
  return { x: rx, y: ry };
}

export const makeY = (tick, l_width, l_height, center_x, center_y) => {
  const duration = 200;
  const t = (tick % duration)/duration;
  const offset_x = center_x - l_width/2;
  const offset_y = center_y - l_height/2;
  const lwp = l_width/100;
  const lhp = l_height/100;

  const key0 = timeChunk(t, 0, 0.4);
  const key1 = timeChunk(t, 0.4, 0.6);
  const key2 = timeChunk(t, 0.6, 1);

  let h_main = {};
  h_main.type = 'path';
  h_main.strokeWidth = 6 * lwp;

  const top = {};
  const base = {};

  top.ax = 0;
  top.ay = 0;
  top.bx = l_width/2;
  top.by = l_height/2;
  top.cx = l_width;
  top.cy = 0;

  base.ax = l_width/2;
  base.ay = l_height/2;
  base.bx = l_width/2;
  base.by = l_height;

  if (key0) {
    top.ax = key0 * l_width/2;
    top.cx = l_width - top.ax;
  } else if (key1) {
    const angle = key1 * 90;
    const post_top = rotateXY(
      angle,
      {x: l_width / 2, y: 0 + key1 * (l_height - l_width) / 2},
      {x: l_width / 2, y: l_height / 2},
    );
    const post_bot = rotateXY(
      angle,
      {x: l_width / 2, y: l_height - key1 * (l_height - l_width) / 2},
      {x: l_width / 2, y: l_height / 2},
    );
    top.ax = post_top.x;
    top.cx = top.ax;
    top.ay = post_top.y;
    top.cy = top.ay;
    base.bx = post_bot.x;
    base.by = post_bot.y;
  } else if (key2) {
    top.ay = l_height/2 - key2 * l_height/2;
    top.cy = top.ay;
    base.by = l_height/2 + key2 * l_height/2;
  }
  
  h_main.paths = [
    { type: 'move', x: top.ax, y: top.ay },
    { type: 'line', x: top.bx, y: top.by },
    { type: 'line', x: top.cx, y: top.cy },
    { type: 'move', x: base.ax, y: base.ay },
    { type: 'line', x: base.bx, y: base.by },
  ]

  for (let path of h_main.paths) {
    path.x = path.x + offset_x;
    path.y = path.y + offset_y;
  }
  return [h_main];
}

