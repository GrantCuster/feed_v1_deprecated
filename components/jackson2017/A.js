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

export const makeA = (tick, l_width, l_height, center_x, center_y) => {
  const duration = 200;
  const t = (tick % duration)/duration;
  const t0033 = timeChunk(t, 0, 0.33);
  const t335 = timeChunk(t, 0.33, 0.5);
  const t566 = timeChunk(t, 0.5, 0.66);
  const t66100 = timeChunk(t, 0.66, 1);
  const offset_x = center_x - l_width/2;
  const offset_y = center_y - l_height/2;
  const lwp = l_width/100;
  const lhp = l_height/100;
  let a_main = {};
  a_main.type = 'path';
  a_main.strokeWidth = 6 * lwp;
  let l_bottom_x, r_bottom_x, bar_height, a_top, a_mid, clx, cly, crx, cry;
  if (t0033) {
    l_bottom_x = 0 + (l_width/2 * t0033);
    r_bottom_x = l_width - (l_width/2 * t0033);
    bar_height = l_height;
    a_top = 0;
    a_mid = l_width/2;
    clx = (l_width * 1/4) + (t0033 * l_width * 1/4);
    cly = l_height/2;
    crx = (l_width * 3/4) - (t0033 * l_width * 1/4);
    cry = l_height/2;
  } else if (t335) {
    l_bottom_x = l_width/2;
    r_bottom_x = l_width/2;
    bar_height = l_height - ((t335 * (l_height - l_width)))/2;
    a_top = t335 * (l_height - l_width)/2;
    a_mid = l_width/2;
  } else if (t566) {
    const angle = 90 * t566;
    const bottom_point = rotateXY(angle, { x: l_width/2, y: (l_height - (l_height - l_width)/2) }, { x: l_width/2, y: l_height/2 });
    const top_point = rotateXY(angle, { x: l_width/2, y: (l_height - l_width)/2 }, { x: l_width/2, y: l_height/2 });
    l_bottom_x = bottom_point.x;
    r_bottom_x = bottom_point.x;
    bar_height = bottom_point.y;
    a_mid = top_point.x;
    a_top = top_point.y;
  } else if (t66100) {
    l_bottom_x = 0;
    r_bottom_x = l_width;
    a_mid = l_width/2;
    bar_height = l_height/2 + (t66100 * l_height/2);
    a_top = l_height/2 - (t66100 * l_height/2);
    clx = l_width * 1/4;
    cly = l_height/2;
    crx = l_width * 3/4;
    cry = l_height/2;
  }
  a_main.paths = [
    { type: 'move', x: l_bottom_x, y: bar_height },
    { type: 'line', x: a_mid, y: a_top },
    { type: 'line', x: r_bottom_x, y: bar_height },
    { type: 'move', x: clx, y: cly },
    { type: 'line', x: crx, y: cry }
  ];
  for (let path of a_main.paths) {
    path.x = path.x + offset_x;
    path.y = path.y + offset_y;
  }
  return [a_main];
}

