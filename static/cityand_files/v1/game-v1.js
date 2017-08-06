const c = document.getElementById("canvas");
const ctx = c.getContext("2d");

const canvas = { w: 640, h: 480 };
const tile_size = 20;
const directions = [ "w", "nw", "n", "ne", "e", "se", "s", "sw" ];
const cardinals = {
	w: [ "sw", "w", "nw" ],
	n: [ "nw", "n", "ne" ],
	e: [ "ne", "e", "se" ],
	s: [ "sw", "s", "se" ]
}

const getRandomTileX = () => {
	const reduction = canvas.w/tile_size - 1;
	const random_x_red = Math.round(reduction * Math.random());
	return random_x_red * tile_size;
}

const getRandomTileY = () => {
	const reduction = canvas.h/tile_size - 1;
	const random_x_red = Math.round(reduction * Math.random());
	return random_x_red * tile_size;
}

const getRandomDirection = () => {
	return directions[Math.floor(Math.random() * directions.length)];
}

const createPerson = () => {
	return { x: getRandomTileX(), y: getRandomTileY(), d: getRandomDirection() };
}

const createPeople = (num) => {
	let people = [];
	for (let i = 0; i < num; i++) {
		let person = createPerson();
		people.push(person);
	}
	return people;
}

const initial_land = { x: 0, y: 0, w: canvas.w, h: canvas.h };
const cities = ["beszel", "ul_qoma"];
const region_colors = { beszel: "orange", ul_qoma: "pink" };
const directionTransforms = {
	w(obj, speed) { return { x: obj.x - speed, y: obj.y }},
	nw(obj, speed) { return { x: obj.x - speed, y: obj.y - speed }},
	n(obj, speed) { return { x: obj.x, y: obj.y - speed }},
	ne(obj, speed) { return { x: obj.x + speed, y: obj.y - speed }},
	e(obj, speed) { return { x: obj.x + speed, y: obj.y }},
	se(obj, speed) { return { x: obj.x + speed, y: obj.y + speed }},
	s(obj, speed) { return { x: obj.x, y: obj.y + speed }},
	sw(obj, speed) { return { x: obj.x - speed, y: obj.y + speed }}
}

const state = {
	lands: [initial_land],
	people: createPeople(40)
}

const createLand = raw_land => {
	const city = Math.random() > 0.5 ? cities[0] : cities[1];
	raw_land.city = city;
	return raw_land;
}

const createLands = lands => {
	for (let land of lands) {
		createLand(land);
	}
}

const sizeLand = land => {
	return land.w * land.h;
};

const getRegionColor = city => {
	return region_colors[city];
}

const divideSide = (coord, dimension) => {
	const tile_size = 20;
	const dimension_divided = dimension/tile_size;
	const divide = 0.4 + Math.random() * 0.2;
	const divided = tile_size * Math.round(divide * dimension_divided);
	return [[coord, divided], [divided + coord, dimension - divided]];
};

const divideLand = land => {
	let new_lands;
	if (land.w > land.h) {
		let new_coords = divideSide(land.x, land.w);
		let new_land_1 = Object.assign({}, land, { w: new_coords[0][1] });
		let new_land_2 = Object.assign({}, land, {
			x: new_coords[1][0],
			w: new_coords[1][1]
		});
		new_lands = [new_land_1, new_land_2];
	} else {
		let new_coords = divideSide(land.y, land.h);
		let new_land_1 = Object.assign({}, land, { h: new_coords[0][1] });
		let new_land_2 = Object.assign({}, land, {
			y: new_coords[1][0],
			h: new_coords[1][1]
		});
		new_lands = [new_land_1, new_land_2];
	}
	createLands(new_lands);
	return new_lands;
};

const getBiggestLand = lands => {
	let selected_land = { w: 0, h: 0 };
	let selected_index = 0;
	for (let [i, land] of lands.entries()) {
		const selected_land_size = sizeLand(selected_land);
		const land_size = sizeLand(land);
		if (land_size > selected_land_size) {
			selected_land = land;
			selected_index = i;
		}
	}
	return [selected_land, selected_index];
};

const drawLands = lands => {
	for (let land of lands) {
		ctx.fillStyle = getRegionColor(land.city);
		ctx.fillRect(land.x, land.y, land.w, land.h);
	}
}

const drawPeople = people => {
	for (let person of people) {
		ctx.fillStyle = "#000";
		ctx.fillRect(person.x, person.y, 20, 20);
	}
}

const initializeLands = (initial_lands, division_num) => {
	let lands = initial_lands;
	for (let i = 0; i < division_num; i++) {
		const [biggest_land, biggest_land_i] = getBiggestLand(lands);
		const divided_lands = divideLand(biggest_land);
		lands = [...lands.slice(0, biggest_land_i), ...divided_lands, ...lands.slice(biggest_land_i + 1)];
	}
	return lands;
}

const checkSafeDirection = (person, direction) => {
	const next_coords = directionTransforms[direction](person, 10);
	if (next_coords.x > canvas.w - tile_size)  {
		// too far east
		return cardinals["w"][Math.floor(Math.random() * 3)]
	} else if (next_coords.y > canvas.h - tile_size) {
		return cardinals["n"][Math.floor(Math.random() * 3)]
	} else if (next_coords.x < 0) {
		return cardinals["e"][Math.floor(Math.random() * 3)]
	} else if (next_coords.y < 0) {
		return cardinals["s"][Math.floor(Math.random() * 3)]
	} else {
		return direction;
	}
}

// const getNewDirection = (current_direction) => {
// 	const current_i = directions.indexOf(current_direction);
// 	const last_i = directions.length - 1;
// 	const range = Math.floor((directions.length - 4) * Math.random());
// 	let new_direction_i = current_i + 2 + range;
// 	if (new_direction_i > last_i) new_direction_i = new_direction_i - last_i;
// 	return directions[new_direction_i];
// }

// const _getSafe = (person) => {
// 	const new_direction = getNewDirection(person.d);
// 	const check = checkSafeDirection(person, new_direction);
// 	if (check) {
// 		return new_direction;
// 	} else {
// 		return _getSafe(person);
// 	}
// }

// const getSafeDirection = (updated_person, direction) => {
// 	const first_check = checkSafeDirection(updated_person, direction);
// 	if (first_check) {
// 		return direction;
// 	} else {
// 		return altGetDirection(updated_person, direction);
// 	}
// }

const updatePerson = (person) => {
	const new_coords = directionTransforms[person.d](person, 10);
	const updated_person = Object.assign({}, person, { x: new_coords.x, y: new_coords.y });
	updated_person.d = checkSafeDirection(updated_person, updated_person.d);
	return updated_person;
}

const updatePeople = () => {
	const updated_people = state.people.map(person => updatePerson(person))
	state.people = updated_people;
}

const didMount = () => {
	state.lands = initializeLands(state.lands, 59);
	setInterval(() => {
		updatePeople();
	}, 100)
}

const render = () => {
	drawLands(state.lands);
	drawPeople(state.people);
}

didMount();
render();

setInterval(() => {
	render()
}, 50)


