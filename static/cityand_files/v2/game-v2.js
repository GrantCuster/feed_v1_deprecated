const dialog = document.getElementById("dialog");
const c = document.getElementById("canvas");
const ctx = c.getContext("2d");

const state = {
  tiles: [],
  tile_lookup: {},
  building_corner: "",
  people: [],
  messages: []
};

const terrain_colors = {
  land: "pink",
  building: "orange"
};

const directionTransforms = {
  w(obj, speed) {
    return { x: obj.x - speed, y: obj.y };
  },
  nw(obj, speed) {
    return { x: obj.x - speed, y: obj.y - speed };
  },
  n(obj, speed) {
    return { x: obj.x, y: obj.y - speed };
  },
  ne(obj, speed) {
    return { x: obj.x + speed, y: obj.y - speed };
  },
  e(obj, speed) {
    return { x: obj.x + speed, y: obj.y };
  },
  se(obj, speed) {
    return { x: obj.x + speed, y: obj.y + speed };
  },
  s(obj, speed) {
    return { x: obj.x, y: obj.y + speed };
  },
  sw(obj, speed) {
    return { x: obj.x - speed, y: obj.y + speed };
  }
};

const oppositeDirection = {
  n: "s",
  w: "e",
  s: "n",
  e: "w"
};

const canvas_width = 300;
const canvas_height = 300;
const tile_size = 20;

const stringXY = (x, y) => {
  return x + "_" + y;
};

const random = limit => {
  return Math.floor(Math.random() * limit);
};

const initiateTiles = () => {
  let _tiles = [];
  let _tile_lookup = {};
  for (
    let i = 0;
    i < canvas_width * canvas_height / (tile_size * tile_size);
    i++
  ) {
    const row = Math.floor(i / (canvas_width / tile_size));
    const column = i % (canvas_height / tile_size);
    _tiles.push({
      x: column,
      y: row,
      terrain: "land"
    });
    _tile_lookup[stringXY(column, row)] = i;
  }
  state.tiles = _tiles;
  state.tile_lookup = _tile_lookup;
};

const makeABuilding = () => {
  const divide_width =
    canvas_width / tile_size * 0.4 +
    Math.floor(canvas_width / tile_size * 0.2 * Math.random());
  // const divide_height =
  //   canvas_height / tile_size * 0.4 +
  //   Math.floor(canvas_height / tile_size * 0.2 * Math.random());
  const divide_height = divide_width;
  const x_region = random(2);
  const y_region = random(2);
  let x, y, w, h, _corner;
  if (y_region === 0) {
    y = 0;
    h = divide_height;
    _corner = "n";
  } else {
    y = divide_height;
    h = canvas_height / tile_size - divide_height;
    _corner = "s";
  }
  if (x_region === 0) {
    x = 0;
    w = divide_width;
    _corner += "w";
  } else {
    x = divide_width;
    w = canvas_width / tile_size - divide_width;
    _corner += "e";
  }
  let building = { x, y, w, h };
  // side effect
  state.building_corner = _corner;
  return building;
};

const addBuilding = ({ x, y, w, h }) => {
  for (let tile of state.tiles) {
    if (tile.x >= x && tile.x < x + w && tile.y >= y && tile.y < y + h) {
      tile.terrain = "building";
    }
  }
};

const addPeople = () => {
  let row_start, column_start, x_direction, v_direction;
  const frequency = 0.2;
  if (state.building_corner.includes("s")) {
    row_start = canvas_height / tile_size - 1;
    v_direction = "n";
  } else {
    row_start = 0;
    v_direction = "s";
  }
  if (state.building_corner.includes("e")) {
    column_start = canvas_width / tile_size - 1;
    x_direction = "w";
  } else {
    column_start = 0;
    x_direction = "e";
  }
  for (let tile of state.tiles) {
    if (tile.y === row_start && tile.terrain === "land") {
      if (Math.random() < frequency) {
        state.people.push({
          x: tile.x,
          y: tile.y,
          c: "green",
          d: v_direction,
          alpha: 1,
          turn: 0
        });
      }
    } else if (tile.x === column_start && tile.terrain === "land") {
      if (Math.random() < frequency) {
        state.people.push({
          x: tile.x,
          y: tile.y,
          c: "purple",
          d: x_direction,
          alpha: 1,
          turn: 0
        });
      }
    }
  }
};

const updatePerson = person => {
  const new_coords = directionTransforms[person.d](person, 0.5);
  if (
    new_coords.x > canvas_width / tile_size ||
    new_coords.x < 0 ||
    new_coords.y > canvas_height / tile_size ||
    new_coords.y < 0
  ) {
    return false;
  } else {
    let updated_person = Object.assign({}, person, {
      x: new_coords.x,
      y: new_coords.y,
      alpha: 1,
      turn: person.turn + 1
    });
    return updated_person;
  }
};

const tryToResolve = (person, occupy_list) => {
  let opposite_direction = oppositeDirection[person.d];
  const new_coords = directionTransforms[opposite_direction](person, 1);
  let string = stringXY(new_coords.x, new_coords.y);
  if (occupy_list.indexOf(string) === -1) {
    let resolved_person = Object.assign({}, person, {
      x: new_coords.x,
      y: new_coords.y,
      alpha: 1
    });
    return resolved_person;
  } else {
    return false;
  }
};

const resolveCollisions = (collider_pair, occupy_list, updated_people) => {
  let pick_0 = Math.floor(Math.random() * 2);
  let pick_1 = 1 - pick_0;
  let resolve_0 = tryToResolve(collider_pair[pick_0]["person"], occupy_list);
  if (resolve_0) {
    state.messages.push({
      type: "excuse",
      message: "Excuse me.",
      color: collider_pair[pick_0]["person"]["c"],
      duration: 8
    });
    updated_people[collider_pair[pick_0]["index"]] = resolve_0;
  } else {
    let resolve_1 = tryToResolve(collider_pair[pick_1]["person"], occupy_list);
    if (resolve_1) {
      state.messages.push({
        type: "excuse",
        message: "Excuse me.",
        color: collider_pair[pick_1]["person"]["c"],
        duration: 8
      });
      updated_people[collider_pair[pick_1]["index"]] = resolve_1;
    }
  }
  return updated_people;
};

const updatePeople = () => {
  const people = state.people;
  let updated_people = people.map(person => updatePerson(person));
  updated_people = updated_people.filter(p => p);
  let occupy_list = [];
  let occupiers = [];
  let collision_tiles = [];
  let colliders = [];
  updated_people.forEach((person, i) => {
    let string = stringXY(person.x, person.y);
    if (occupy_list.indexOf(string) === -1) {
      occupy_list.push(string);
      occupiers.push(person);
    } else {
      collision_tiles.push(string);
      let partner_i = occupy_list.indexOf(string);
      let partner = occupiers[partner_i];
      colliders.push([
        { person: partner, index: partner_i },
        { person: person, index: i }
      ]);
    }
  });
  for (let collider_pair of colliders) {
    updated_people = resolveCollisions(
      collider_pair,
      occupy_list,
      updated_people
    );
  }
  state.people = updated_people;
};

const didMount = () => {
  initiateTiles();
  let building = makeABuilding();
  addBuilding(building);
  addPeople();
  setInterval(() => {
    updatePeople();
  }, 100);
  setInterval(() => {
    addPeople();
  }, 600);
  // c.addEventListener("click", function() {
  //   updatePeople();
  // });
};

const drawTiles = tiles => {
  for (let tile of tiles) {
    ctx.fillStyle = terrain_colors[tile.terrain];
    ctx.fillRect(tile.x * tile_size, tile.y * tile_size, tile_size, tile_size);
  }
};

const drawPeople = people => {
  for (let person of people) {
    ctx.globalAlpha = person.alpha;
    ctx.fillStyle = person.c;
    // ctx.fillRect(
    //   person.x * tile_size,
    //   person.y * tile_size,
    //   tile_size,
    //   tile_size
    // );
    ctx.beginPath();
    ctx.arc(
      person.x * tile_size + tile_size / 2,
      person.y * tile_size + tile_size / 2,
      tile_size / 2 * 0.9,
      0,
      Math.PI * 2,
      true
    );
    ctx.closePath();
    ctx.fill();
    ctx.globalAlpha = 1;
  }
};

const displayMessages = messages => {
  let message_string = "";
  let filtered_messages = messages.filter(m => m.duration > -1);
  for (let message of filtered_messages) {
    message.duration = message.duration - 1;
    message_string += `<span style="color: ${message.color};">${message.message}</span> `;
  }
  state.messages = filtered_messages;
  dialog.innerHTML = message_string;
};

const render = () => {
  drawTiles(state.tiles);
  drawPeople(state.people);
  displayMessages(state.messages);
};

didMount();

setInterval(() => {
  render();
}, 50);
