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

export const makeA2 = (tick, l_width, l_height, center_x, center_y) => {
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

  l.ax = 0;
  l.bx = l_width / 2;
  l.cx = l_width;
  l.dx = l_width / 4;
  l.ex = l_width * 3 / 4;
  l.ay = l.cy = l_height;
  l.by = 0;
  l.dy = l.ey = l_height / 2;

  if (key0) {
    l.ax = key0 * l_width / 2;
    l.cx = l_width - l.ax;
    l.dx = l_width / 4 + key0 * l_width / 4;
    l.ex = l_width * 3 / 4 - key0 * l_width / 4;
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
    l.bx = l.dx = l.ex = post_top.x;
    l.by = l.dy = l.ey = post_top.y;
    l.ax = l.cx = post_bot.x;
    l.ay = l.cy = post_bot.y;
  } else if (key2) {
    l.ay = l.cy = l_height / 2 + key2 * l_height / 2;
    l.by = l_height / 2 - key2 * l_height / 2;
  }

  main.paths = [
    {type: 'move', x: l.ax, y: l.ay},
    {type: 'line', x: l.bx, y: l.by},
    {type: 'line', x: l.cx, y: l.cy},
    {type: 'move', x: l.dx, y: l.dy},
    {type: 'line', x: l.ex, y: l.ey},
  ];

  for (let path of main.paths) {
    path.x = path.x + offset_x;
    path.y = path.y + offset_y;
  }
  return main;
};
