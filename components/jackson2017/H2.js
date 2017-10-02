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

export const makeH = (tick, l_width, l_height, center_x, center_y) => {
  const duration = 200;
  const t = (tick % duration)/duration;
  const offset_x = center_x - l_width/2;
  const offset_y = center_y - l_height/2;
  const lwp = l_width/100;
  const lhp = l_height/100;

  const key0 = timeChunk(t, 0, 0.33);
  const key1 = timeChunk(t, 0.33, 0.45);
  const key2 = timeChunk(t, 0.45, 0.66);
  const key3 = timeChunk(t, 0.66, 1);

  let h_main = {};
  h_main.type = 'path';
  h_main.strokeWidth = 6 * lwp;
  let left_post = {};
  let right_post = {};
  let bar = {};

  left_post.ax = 0;
  left_post.ay = 0;
  left_post.bx = 0;
  left_post.by = l_height;

  right_post.ax = l_width;
  right_post.ay = 0;
  right_post.bx = l_width;
  right_post.by = l_height;

  bar.ax = 0;
  bar.ay = l_height/2;
  bar.bx = l_width;
  bar.by = l_height/2;

  if (key0) {
    left_post.ax = 0 + (key0 * l_width/2);
    left_post.bx = left_post.ax;
    right_post.ax = l_width - (key0 * l_width/2);
    right_post.bx = right_post.ax;
    bar.ax = left_post.ax;
    bar.bx = right_post.ax;
  } else if (key1) {
    left_post.ax = l_width/2;
    left_post.bx = left_post.ax;
    right_post.ax = left_post.ax;
    right_post.bx = left_post.ax;
    bar.ax = left_post.ax;
    bar.bx = left_post.ax;
    left_post.ay = 0 + (key1 * (l_height - l_width)/2);
    right_post.ay = left_post.ay;
    left_post.by = l_height - left_post.ay;
    right_post.by = left_post.by;
  } else if (key2) {
    const angle = key2 * 90;
    const post_top = rotateXY(angle, { x: l_width/2, y: (l_height - l_width)/2 }, {x: l_width/2, y: l_height/2 }) 
    const post_bot = rotateXY(angle, { x: l_width/2, y: l_height - (l_height - l_width)/2 }, { x: l_width/2, y: l_height/2 })
    left_post.ax = post_top.x;
    right_post.ax = left_post.ax;
    left_post.ay = post_top.y;
    right_post.ay = left_post.ay;
    left_post.bx = post_bot.x;
    right_post.bx = left_post.bx;
    left_post.by = post_bot.y;
    right_post.by = left_post.y;
    bar.ax = l_width/2;
    bar.bx = l_width/2;
  } else if (key3) {
    left_post.ax = 0;
    right_post.ax = l_width;
    left_post.ay = l_height/2 - (key3 * l_height/2);
    right_post.ay = left_post.ay;
    left_post.bx = 0;
    right_post.bx = l_width;
    left_post.by = l_height/2 + (key3 * l_height/2);
    right_post.by = left_post.by;
    bar.ax = 0;
    bar.ay = l_height/2;
    bar.bx = l_width;
    bar.by = l_height/2;
  }


  h_main.paths = [
    { type: 'move', x: left_post.ax, y: left_post.ay },
    { type: 'line', x: left_post.bx, y: left_post.by },
    { type: 'move', x: bar.ax, y: bar.ay },
    { type: 'line', x: bar.bx, y: bar.by },
    { type: 'move', x: right_post.ax, y: right_post.ay },
    { type: 'line', x: right_post.bx, y: right_post.by },
  ]

  for (let path of h_main.paths) {
    path.x = path.x + offset_x;
    path.y = path.y + offset_y;
  }
  return [h_main];
}

