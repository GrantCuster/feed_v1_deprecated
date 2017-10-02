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

export const makeP = (tick, l_width, l_height, center_x, center_y) => {
  const duration = 200;
  const t = (tick % duration)/duration;
  const offset_x = center_x - l_width/2;
  const offset_y = center_y - l_height/2;
  const lwp = l_width/100;
  const lhp = l_height/100;

  const key0 = timeChunk(t, 0, 0.15);
  const key1 = timeChunk(t, 0.15, 0.3);
  const key2 = timeChunk(t, 0.3, 0.6);
  const key3 = timeChunk(t, 0.6, 0.75);
  const key4 = timeChunk(t, 0.75, 1);
  
  let a_main = {};
  a_main.type = 'path';
  a_main.strokeWidth = 6 * lwp;
  let post = {};
  let curl = {};

  post.ax = 0;
  post.ay = 0;
  post.bx = 0;
  post.by = l_height;

  curl.ax = 0;
  curl.ay = 0 + 3 * lwp;
  curl.bx = 0
  curl.by = l_height/2;
  curl.cp1x = l_width;
  curl.cp1y = 3 * lwp;
  curl.cp2x = l_width;
  curl.cp2y = l_height/2;

  if (key0) {
    post.ay = 0 + (key0 * l_height * 1/4);
    post.by = l_height - (key0 * l_height * 1/4);
    curl.ay = 3 * lwp + (key0 * l_height * 1/4);
    curl.cp1y = 3 * lwp + (key0 * l_height * 1/4);
    curl.by = l_height/2 + (key0 * l_height * 1/4);
    curl.cp2y = l_height/2 + (key0 * l_height * 1/4);
  } else if (key1) {
    post.ax = key1 * l_width/2;
    post.ay = l_height * 1/4;
    post.bx = key1 * l_width/2;
    post.by = l_height * 3/4;
    curl.ax = key1 * l_width/2;
    curl.bx = key1 * l_width/2;
    curl.ay = 3 * lwp + l_height * 1/4;
    curl.by = l_height * 3/4 - 3 * lwp;
    curl.cp1x = l_width - (key1 * l_width/2);
    curl.cp2x = l_width - (key1 * l_width/2);
    curl.cp1y = 3 * lwp + l_height * 1/4;
    curl.cp2y = l_height * 3/4 - 3 * lwp;
  } else if (key2) {
    const angle = key2 * 180;
    const post_top = rotateXY(angle, { x: l_width/2, y: l_height * 1/4 }, { x: l_width/2, y: l_height/2 });
    const post_bottom = rotateXY(angle, { x: l_width/2, y: l_height * 3/4 }, { x: l_width/2, y: l_height/2 });
    post.ax = post_top.x;
    post.ay = post_top.y;
    post.bx = post_bottom.x;
    post.by = post_bottom.y;
    curl.ax = post.ax;
    curl.ay = post.ay;
    curl.bx = post.bx;
    curl.by = post.by;
    curl.cp1x = post.ax;
    curl.cp1y = post.ay;
    curl.cp2x = post.bx;
    curl.cp2y = post.by;
  } else if (key3) {
    post.ax = l_width/2 - (key3 * l_width/2);
    post.ay = l_height * 1/4;
    post.bx = post.ax;
    post.by = l_height * 3/4;
    curl.ax = post.ax;
    curl.ay = l_height * 1/4 + 3 * lwp;
    curl.bx = post.ax;
    curl.by = l_height * 3/4 - 3 * lwp;
    curl.cp1x = l_width/2 + key3 * l_width/2;
    curl.cp2x = l_width/2 + key3 * l_width/2;
    curl.cp1y = post.ay;
    curl.cp2y = post.by;
  } else if (key4) {
    post.ax = 0;
    post.ay = l_height * 1/4 - (key4 * l_height * 1/4);
    post.bx = 0;
    post.by = l_height * 3/4 + (key4 * l_height * 1/4);
    curl.ax = post.ax;
    curl.ay = post.ay + 3 * lwp;
    curl.bx = post.bx;
    curl.by = l_height * 3/4 - 3 * lwp - (key4 * l_height * 1/4);
    curl.cp1x = l_width;
    curl.cp2x = curl.cp1x;
    curl.cp1y = curl.ay;
    curl.cp2y = curl.by;
  }

  a_main.paths = [
    { type: 'move', x: post.ax, y: post.ay },
    { type: 'line', x: post.bx, y: post.by },
    { type: 'move', x: curl.ax, y: curl.ay },
    { type: 'curve', x: curl.bx, y: curl.by, cp1x: curl.cp1x, cp1y: curl.cp1y, cp2x: curl.cp2x, cp2y: curl.cp2y }
  ];
  for (let path of a_main.paths) {
    path.x = path.x + offset_x;
    path.y = path.y + offset_y;
    if (path.type === 'curve') {
      path.cp1x = path.cp1x + offset_x;
      path.cp2x = path.cp2x + offset_x;
      path.cp1y = path.cp1y + offset_y;
      path.cp2y = path.cp2y + offset_y;
    }
  }
  return [a_main];
}

