---
title: "2017 Work Year in Review"
date: "Mon, 22 Jan 2018 04:15:41 GMT"
preview_image: "/static/images/feed/Screen_Shot_2017_11_13_at_4_49_50_PM-1510609839249.png"
---

This is my first full year of having and using this blog. So it’s my first
opportunity to do a year in review post. I’m going to go through month-by-month
for my work posts using my [archive
page](http://feed.grantcuster.com/feed_archive).

## January

![A screenshot of the Fast Forward Labs blog.](/static/images/feed/Screen%20Shot%202017-01-26%20at%2011.11.37%20AM-1485447148414.png)

*[The Fast Forward Labs blog design.](/post/20170126T161229000Z)*

I was finishing up the FFL blog in January. Now that we’re handing off some of
the branding to Cloudera I’ve been meaning to do a retrospective post on the FFL
brand + website stuff I did throughout FFL’s independence. I really tried to
pick a few minimal moves (flat, white-space, open, teal highlights, Chamber Sans
font) and stick with them. I think the blog was one of the more successful
applications of those. I tried to really trust the system and not overfit for
specific content. The blog was.a good project for that because through the
repetition of post previews you could really see the system at work. It was
harder to get the same sort of system view on the website because there is not
as much repetition of elements.

I made a pretty intense Jekyll post-loop to get the two-wide featured posts to
work. I also thought a lot about how to put variable length titles in
standard-sized boxes and I felt like my overlapping white-backed title
highlights turned out pretty nice. Looking at it now I can also see my
developing interest in procedural generation in the overlapping text and
image-cover background — a set of rules that can lead to varied and surprising
results. It would be fun to redo the layout with CSS grid someday.

## February

![A GIF of paging through the Fast Forward Labs Probabilistic Programming Report](/static/images/feed/ff05-new-1487028731493.gif)

*[A GIF of the Fast Forward Labs Probabilistic Programming
report.](/post/20170213T233212000Z)*

Fresh off the blog, I got to work on redesigning the FFL website, including our
client portal. I struggled more with the website than the blog. I had my
overlapping highlighted text to bring over from the blog, and I was super
excited about applying the same set of style rules to both. The key visual part
of the website were the report and prototype preview pairs. The overlap from the
blog didn’t work as well when applied to the GIFs and screen recordings of
those, however. I ended up using it for that revision of the client portal, but
I eventually got rid of the overlap in the final website design.

Before we had taken pictures of the physical reports open to different pages for
the GIFs. I really liked the actual pictures but the difficulty of exactly
reproducing the lighting conditions for each report (so they didn’t look
distractingly dissimilar) was getting to me. After briefly trying to figure out
if I should do real 3D modeling, I decided to fake the shadows in photoshop. It
had been a long time (since my early skeuomorphic Wordpress design work) since
I’d tried emulating real world shadows. It took me a long time, and I screwed up
several times and failed to back-up the right layers so that I would have to
start over. Compared to the past, my mind was definitely reaching for more ways
that I could program things rather than just repetitively grind them out (I got
really into layer organization). Still, the report images and GIFs that came out
of it were probably the most successful design elements of the new website.

## March

![A screenshot of the "we are reading" admin tool](/static/images/feed/Screen%20Shot%202017-03-17%20at%202.19.07%20PM-1489774814234.png)

*[The internal tool I built for coworkers to add "we are reading" posts to our
blog.](/post/20170317T182015000Z)*

There are a few images here from a revamp of the HTML reports to match style of
the blog and website. Then there is a shot of the internal tool I built to add
the “We are reading” entries to the blog. I really enjoyed making that tool and
have revamped and expanded a bit according to co-workers feedback. I also used
the Github API to auth into and append to the file. I still think, if expanded
on, that system could make for a nice CMS set-up for a Jekyll site.

![A screenshot of the interpretability prototype](/static/images/feed/Screen%20Shot%202017-03-29%20at%2011.54.02%20AM-1490802886754.png)

*[An early experiment for the interpretability prototype.](/post/20170329T155447000Z)*

Then there is the Interpretability prototype, which looked at churn data. Early
time was spent just getting stuff into a table and figuring out how to use
[React Virtualized](https://github.com/bvaughn/react-virtualized) to make sure
stuff didn’t get super bogged down on resorting. Then I started playing with
color — seeing how much information I could get out of a color scheme. Some of
those early shots are pretty close to how the final prototype ended up.

## April

![A GIF of the interpretability prototype individual record view, showing how
you can scrub through previous states of the record](/static/images/feed/history-scrub-1492033926613.gif)

*[An early version of the interpretability prototype individual record view where
you could scrub through past states.](/post/20170412T215216000Z)*

In the thick of Interpretability prototype work, with lots of screenshots. Early
in the month I was working on the other view of the prototype — showing how
changes to a customers attribute affected both the overall churn probability and
the individual contributions to that probability. Looking back, I am again
struck by the fact that the early version of this was pretty close to where I
ended up. The split view of the original and the changed — initially with
toggle-able checkboxes very much inspired by browser devtools for inspecting
CSS. With the early design, I did know that I had an issue of showing how
multiple changes related to the overall probability. I attempted to solve that
with a graph of the overall probability that would scroll back through the
changes as you hovered over each point. It was too distracting and actually
still confusing in the graph form, but it was a (very Redux influenced) step for
me in thinking about how to structure state in an application. It definitely
prepped me for thinking about how to manage game state in stuff I’m doing now.

![A screenshot of the FFL website
design](/static/images/feed/Screen%20Shot%202017-04-24%20at%202.57.24%20PM-1493060275896.png)

*[An early design for the FFL website intro page](/post/20170424T185757000Z)*

I also apparently took a break from the prototype to work on the FFL website
again. Mainly the the splash intro. I *really* wanted to get a full-width
background working, showing the reports and prototypes. Looking now, I think the
version with just the prototype backer was pretty solid, but it didn’t emphasize
the report aspect as much and it was still pretty busy. These were formally good
approaches but the end result was just too busy. I’d eventually give up on the
full-width part.

## May

![A screenshot of the interpretability prototype with the ribbon visualization.](/static/images/feed/Screen%20Shot%202017-05-08%20at%203.39.25%20PM-1494272799064.png)

*[An experiment where each customer record in the interpretability prototype got
a 'ribbon' visualization](/post/20170508T194639000Z)*

May is almost all work on the interpretability prototype. Early in the month I
was trying to figure out how to balance emphasizing the key features for each
customer while keeping also keeping the context there for all the fields so you
could compare in-between customers. I tried to set up a kind of picture for each
record, where a ribbon of color coded rectangles stood in for the importance of each factor,
and then the top ones were highlighted below that. I’ve tried to do this with a
few prototypes — figure out an abstract representation that gives you an idea of
the ‘shape’ of the item in comparison to others. It’s a really compelling
challenge to me, but it’s a tough one. In this case it’s not an immediately
intuitive idea, that row of color-coded boxes, so the person using the app would
have to learn to read it. It’s a big ask to have somebody learn to read that,
especially if it’s not an app they’re really engaged in. I ended up backing off
and returning to the table view. I think it was the right choice here but I’m
still fascinated by the challenge of figuring out how to intuitively visualize
‘shapes’ of data.

![A GIF of an analyze animation where colors pass over a row](/static/images/feed/loading-animate-1495230998200.gif)

*[An experimental 'analyze' animation for the interpretability
prototype](/post/20170519T215701000Z)*

Later on in the month I tried some animations for the ‘analyzing’ mode of the
prototype, where it figures out the importance of various factors. This seemed
like a fun one because it figures out those values through perturbations —
cycling through all the possible values for each factor — I had some ideas about
how to animate that concept. They were fun to code but ended up all being too
busy and too literal. So I backed off there as well.

## June

![A screenshot of the interpretability report
cover.](/static/images/feed/Screen%20Shot%202017-06-12%20at%205.17.14%20PM-1497302550662.png)

*[Experimenting with procedurally generated elements for the interpretability
report cover](/post/20170612T212231000Z)*

I spent most of June at work doing the figures for the interpretability report.
I also played around with light procedural generation for the cover for the
report. I ended up backing off the really procedural approaches (I did use it to
determine the shading for the boxes), but it was definitely another step for me
in realizing I really wanted to explore procedural generation.

![A screenshot from the Feed the Cat
game](/static/images/feed/Screen%20Shot%202017-06-25%20at%2010.12.45%20PM-1498443210569.png)

*[The feed the cat game experiment.](/post/20170626T021331070Z)*

I also worked a little bit on a game/simulation in June. The idea was there was
a cat and you could feed it and if you fed it too much its belly would get big
and it would roll over on its back. I had the idea and thought it was kind of
funny and decided to just roll with it. I made the basic mechanics for it but
lost interest a little bit. It shows the interest in system simulation I would
go on to explore.

## July

![A screenshot of a bunch of buttons with slight
variations](/static/images/feed/Screen%20Shot%202017-07-09%20at%204.34.01%20PM-1499632502926.png)

*[Exploring the possibility space of yellow
buttons.](/post/20170709T203503525Z)*

We released the interpretability report in July, so I finished the prototype and
the layout for the print edition. I also got interested in multi-armed bandit
problem and wanted to explore it with this evolving button idea, where I would
set the parameters for a button’s styles and then have people choose one or two
they liked and have it evolve over time based on people’s choices. There’s
definitely lots involved in that that I continue to be interested in, especially
the part where it’s exploring a possibility space, but I kind of lost interest
in it I think because its hard to be too continually excited about a button.

## August

![A GIF of different colored dots bumping into
eachother](/static/images/feed/bump-1502651967731.gif)

*[An early simulation experiment, where dots cross paths and say excuse me to
eachother](/post/20170813T191928641Z)*

August is when my interest in procedural generation and game/simulation
development really got serious. I started with this interest in making a game
based on _The City and the CIty_ by China Mieville, where there are two cities
on top of each other and each city’s residents just have to pretend they don’t
see the people from the other city. I still think it would be a great topic to
explore in a game but it was a bit too ambitious for me to start out with. By
the end of the month I’d found the electronic life example from _Eloquent
Javascript_ and started making a simple text based simulation based on that. I
continue to return to that guide. This was a fun time where I started to get an
idea of the complexity involved in making even a very simple game. I’d seen some
of the concepts, like a game loop, before, but now that I was trying to make my
own simple stuff I was much more invested in figuring out exactly how it worked.
I love when a new interest opens up this whole world of stuff figure out.

## September

![A GIF of animated letters spelling "Happy B"](/static/images/feed/hb-1506800962188.gif)

*[The beginning of an animated birthday website for my
newphew.](http://feed.grantcuster.com/static/images/feed/hb-1506800962188.gif)*

In September I did some more experiments with simulation, especially with
pathfinding, which was a whole other new world to explore. We also launched the
Fast Forward Labs site. I started making an animated website card for my nephew,
which turned into another way to explore game loop structure and tweening
between animations.

## October

![A screenshot of a lot of points in a
visualization.](/static/images/feed/Screen%20Shot%202017-10-03%20at%202.20.40%20PM-1507054955701.png)

*[Figuring out how to render a bunch of points with Three.js.](/post/20171003T182237192Z)*

In October, in prep for our next report, I started exploring using Three.js to
render a ton of points for our recommendation visualization. 

![A screenshot showing a graph of people and recommended television
shows.](/static/images/feed/Screen%20Shot%202017-10-20%20at%205.50.14%20PM-1508536247514.png)

*[Building a graph representation of collaborative filtering
recommendations](/post/20171020T215050730Z)*

I also started making a ’simple’ recommendation prototype to explore collaborative filtering.
I’ve made prototype with force-directed graphs a few times now, and each time I
try to get the data-structure a little more right, so that a list view of the
graph can sit next to the actual graph. I got a little closer this time, but I
also didn’t scope down the project enough, so eventually I had to set it aside
as we worked on the main prototype.

## November

![A screenshot of debugging the recommendation
prototype.](/static/images/feed/Screen_Shot_2017_11_13_at_4_49_50_PM-1510609839249.png)

*[Debugging the t-SNE visualization for the recommendations
prototype](/post/20171113T215040860Z)*

In November I really started in on the prototype for the Recommendations
prototype. Most of the early work was on getting the t-SNE visualization working
well.

![A GIF of abstract dogs peeing on
grass.](/static/images/feed/peeing-1510344087300.gif)

*[Dogs peeing on the grass in the backyard simulation.](/post/20171110T200128348Z)*

I also started in on my backyard simulator, which is sort of the culmination of
my simulation projects. I was really focused on data structure. I got different
tiles working, and a simple dog actor walking around and eventually peeing. I
frequently got frustrated with it as even though I tried to keep things really
simple I felt the complexity of it would spiral out of control and I’d feel like
I didn’t really have a handle on the code anymore. Still, the idea was the best
one I’d come up for a simulation project. It felt like the right scope and I
really want to see it happen. I’m planning on completing it in the near future.

## December

![A GIF of dogs peeing, this time they are emoji dogs.](/static/images/feed/dogpark-1512935856199.gif)

*[A more elaborate dog peeing
set-up](/post/20171210T195737545Z)*

December saw the continuation of work on the backyard simulator and the
recommendations prototype.

## 2017

It’s nice to look back and see all the things we put out at FFL last year. It’s
also great to watch the evolution of my interest in procedural generation and
simulation. I remain really excited to work more on the backyard simulation.
It’s somewhat rare I stay as excited about an idea as I have with that one. I’ve
been busy and sick for the start of January but I’m looking forward to really
diving back into it.
