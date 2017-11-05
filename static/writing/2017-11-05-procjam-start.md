---
title: "Procjam Start"
date: "Sun, 05 Nov 2017 16:07:06 GMT"
---

I've been dancing around a bit trying to decide where to start with my possible
NaNoGen month attempt and maybe my ProcJam thing as well.

## Starting scope:
- Make a room with walls (which will actually be the backyard for the backyard
  simulation).
- Get a dog simulation working where the dog wanders around.
- Add some actions for the dog. Probably start with peeing.
- Pee should persist in the general game state (decay over time?)

## Next steps:
- I'd like the dog to react differently based on different tiles (like grass vs
  cement). I'm going to need to think about how to structure that so the code
doesn't spiral out of control. It will be easier to think about once I have the
baseline down, though.

## Main concerns:
- General code structure. Something that allows me to keep building. Like I said
  above, this is hard to reason about in the abstract, but I'm going to keep it
in mind as I'm building.
- Ability to change parameters. This has come up a lot as I've tried things and
  I think I am finally motivated enough to integrate it well. This would be
something like dat.gui. Since I'm planning to structure as a Redux influenced
React app it *should* be relatively simple... The parameters will be in the
state, and I just need to make a little debug interface to change those
parameters. Maybe I'll need to think a little bit about what it does with the
current state. Easiest I think would be to restart the simulation (otherwise
what happens if the dog is on a tile that is outside the bounds of the new
parameters). But it would be nicer to do a kind of hot reload thing, and if I set
up the dog logic to handle those kind of changes gracefully that would probably
end up making it more robust anyway...
