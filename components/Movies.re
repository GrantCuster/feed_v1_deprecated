let R = ReasonReact;
let Str = R.string;
let Arr = R.array;
let Comp = R.statelessComponent;

type movie = {title: string};

module Movie = {
  let component = Comp("Movie");
  let make = (~movie, children) => {
    ...component,
    render: self => <div> {Str(movie.title)} </div>,
  };
};

let movies = [|{title: "Jaws"}, {title: "Armageddon"}|];

let app = Comp("App");
let make = _children => {
  ...component,
  render: _ => <div> {Arr(Arr.map(movie => <Movie movie />, movies))} </div>,
};

/* React interop */
let default = R.wrapReasonForJs(~app, _ => make([||]));