
const timeChunk = (tp, start, end) => {
  if (tp >= start && tp < end) {
    return (tp - start)/(end - start);
  } else {
    return false;
  }
}

export const makeH = (tick, l_width, l_height, center_x, center_y) => {
  const offset_x = (center_x - l_width)/2;
  const offset_y = (center_y - l_height)/2;
  const lwp = l_width/100;
  const lhp = l_height/100;
  const duration = 200;
  const t = (tick % duration)/duration;
  const th1 = t * 2;
  const th2 = (t - 50) * 2;
  let t_0_33 = timeChunk(t, 0, 0.33);
  let t_33_66 = timeChunk(t, 0.33, 0.66);
  let t_33_43 = timeChunk(t, 0.33, 0.43);
  let t_56_66 = timeChunk(t, 0.56, 0.66);
  let t_66_100 = timeChunk(t, 0.66, 1);
  let left_bar_x, right_bar_x, cross_bar_x, cross_bar_width, left_bar_rotate, left_bar_height, left_bar_y;
  left_bar_height = l_height;
  left_bar_y = 0;
  if (t_0_33) {
    left_bar_x = t_0_33 * (l_width/2 - 3 * lwp);
    right_bar_x = l_width - (6 * lwp) - (t_0_33* l_width/2);
    cross_bar_x = t_0_33 * (l_width/2 - 3 * lwp); 
    cross_bar_width = l_width - t_0_33 * l_width;
  } else if (t_33_66) {
    left_bar_rotate = t_33_66 * Math.PI;
    left_bar_x = l_width/2 - 3 * lwp;
    if (t_33_43) {
      left_bar_y = t_33_43 * ((l_height - l_width)/2);
      left_bar_height = l_height - (t_33_43 * (l_height - l_width));
    } else if (t_56_66) {
      left_bar_y = (l_height - l_width)/2 - t_56_66 * ((l_height - l_width)/2);
      left_bar_height = l_width + (t_56_66 * (l_height - l_width));
    } else {
      left_bar_y = (l_height - l_width)/2;
      left_bar_height = l_width;
    }
  } else if (t_66_100) {
    left_bar_x = (1 - t_66_100) * (l_width/2 - 3 * lwp);
    right_bar_x = l_width - (6 * lwp) -  ((1 - t_66_100) * l_width/2);
    cross_bar_x = (1 - t_66_100) * (l_width/2 - 3 * lwp);
    cross_bar_width = l_width - (1 - t_66_100) * l_width;
  }
  const left_bar = {
    type: "rectangle",
    x: left_bar_x + offset_x,
    y: left_bar_y + offset_y,
    width: 6 * lwp,
    height: left_bar_height,
    rotate: left_bar_rotate,
    full_x: center_x,
    full_y: center_y
  };
  const right_bar = { 
    type: 'rectangle',
    x: right_bar_x + offset_x,
    y: left_bar_y + offset_y,
    width: 6 * lwp,
    height: left_bar_height,
    rotate: left_bar_rotate,
    full_x: center_x,
    full_y: center_y
  };
  const cross_bar = {
    type: 'rectangle',
    x: cross_bar_x + offset_x,
    y: (l_height/2) - 6 * lwp + offset_y,
    width: cross_bar_width,
    height: 6 * lwp,
  };
  return [left_bar, right_bar, cross_bar];
}


