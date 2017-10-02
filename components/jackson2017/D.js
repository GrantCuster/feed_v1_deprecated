// @format

const timeChunk = (tp, start, end) => {
  if (tp >= start && tp <= end) {
    return (tp - start) / (end - start);
  } else {
    return false;
  }
};

const rotateXY = (angle, point, center) => {
  const a = angle * (Math.PI / 180);
  const rx =
    Math.cos(a) * (point.x - center.x) -
    Math.sin(a) * (point.y - center.y) +
    center.x;
  const ry =
    Math.sin(a) * (point.x - center.x) +
    Math.cos(a) * (point.y - center.y) +
    center.y;
  return {x: rx, y: ry};
};

export const makeD = (tick, l_width, l_height, center_x, center_y) => {
  const duration = 200;
  const t = (tick % duration) / duration;
  const offset_x = center_x - l_width / 2;
  const offset_y = center_y - l_height / 2;
  const lwp = l_width / 100;
  const lhp = l_height / 100;

  const key0 = timeChunk(t, 0, 0.4);
  const key1 = timeChunk(t, 0.4, 0.6);
  const key2 = timeChunk(t, 0.6, 1);

  let main = {};
  main.type = 'path';
  main.strokeWidth = 6 * lwp;

  const l = {};

  l.ax = l.dx = l.ex = 0;
  l.bx = l.cx = l_width;
  l.ay = l.ey = 0;
  l.by = l_height / 4;
  l.cy = l_height - l_height / 4;
  l.dy = l_height;

  if (key0) {
    l.ax = l.ex = l.dx = key0 * l_width / 2;
    l.bx = l.cx = l_width - l.ax;
    l.ay = l.ey = 0;
    l.by = l_height / 4 - key0 * l_height / 4;
    l.cy = l_height * 3 / 4 + key0 * l_height / 4;
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
    l.ax = l.ex = l.bx = post_top.x;
    l.ay = l.by = l.ey = post_top.y;
    l.dx = l.cx = post_bot.x;
    l.dy = l.cy = post_bot.y;
  } else if (key2) {
    l.ax = l.ex = l.dx = l.ex = 0;
    l.bx = l.cx = l_width;
    l.ay = l.ey = l_height / 2 - key2 * l_height / 2;
    l.dy = l_height / 2 + key2 * l_height / 2;
    l.by = l_height / 2 - key2 * l_height / 4;
    l.cy = l_height / 2 + key2 * l_height / 4;
  }

  main.paths = [
    {type: 'move', x: l.ax, y: l.ay},
    {type: 'line', x: l.bx, y: l.by},
    {type: 'line', x: l.cx, y: l.cy},
    {type: 'line', x: l.dx, y: l.dy},
    {type: 'line', x: l.ex, y: l.ey},
    {type: 'line', x: l.bx, y: l.by},
  ];

  for (let path of main.paths) {
    path.x = path.x + offset_x;
    path.y = path.y + offset_y;
  }
  return main;
};
