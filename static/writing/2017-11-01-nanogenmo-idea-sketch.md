---
title: "NaNoGenMo idea sketch"
date: "Thu, 02 Nov 2017 02:18:37 GMT"
---

I’ve been thinking about joining in to [National Novel Generation
Month](https://github.com/NaNoGenMo/2017) and wanted to sketch out preliminary
thoughts here.

## The game

I’ve been experimenting with a procedurally generated simulation. Basically like a
game but with all non-playable characters. The scene is going to be our
backyard, and it will feature myself, my partner and our dog and cat.

![A GIF of four letters - standing if for characters - moving around a rectangle](http://feed.grantcuster.com/static/images/feed/r2-1503281192134.gif)

##### Four characters moving around an empty yard.

I’ll give each character certain actions, like ‘P begins weeding the garden’, ‘G
writes something in his notebook’, and ‘Prince pees in the garden.’ Everything
will have a frequency, and I’ll decide what everyone is up to by rolling the
Math.random(). After I get everyone to do their own thing I’ll put in some
reactions to what others do, and some overall systems like plant growth/health.
The ultimate goal is to have a bunch of systems interacting with some
emergent/somewhat unexpected results. For inspiration I’m thinking of [Dwarf
Fortress](https://en.wikipedia.org/wiki/Dwarf_Fortress) and [Universal
Paperclips](http://www.decisionproblem.com/paperclips/). Code-wise I’m
interested in figuring out how to manage the state of all those systems.

## The book

To make the experiment into a NaNoGenMo entry, I’m thinking I could generate the
log of those actions. So it would read mostly of mundane log entries but then
hopefully once and a while there’d be some strange event. I could set it up so
each section is a log for a different day, and I could do at least some basic
events based on time, like ‘The leaves started to fall’, or special Halloween
events. I think it would also be kind of fun to have the log be super mundane
matter-of-fact action-based stuff but then once and a while get a look into a
character’s emotional state, like ‘G felt incredibly sad that day.’ I think that
would need to be meaningfully tied into the system for me not to feel like it
was cheap though.

I think it’d be kind of fun to format that into a book like thing, and I could
take snapshots of the game state once and a while and include those as
illustrations.

## Scope

The main challenge is I have a lot of work to do just to get the basics of the
game working. So is it a good idea to add the novel generation in there as well?
I think it’s worth a shot. Maybe the artificial deadline will help me get moving
on the game. I’m also hoping it will make me more actively engage with the other
entries, there’s lots of interesting stuff there that I would like to learn more
about.

I’m going to think about it a little more than submit my idea as an issue on the
official repo.
