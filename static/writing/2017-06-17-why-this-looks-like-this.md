---
title: "Why this looks like this"
date: "Sat June 17 2017 12:20:00 GMT-0400 (EDT)"
---

This is the second version of this blog. I added more sections (like this one), but the meat of it is the [feed]('/') which looks pretty much like it did in the first version.

## Inspiration

The main idea behind the feed was that I wanted a lightweight way to post things in process. I was inspired by people (especially indie game developers) who post lots of screenshots and GIFs of their work. I was also inspired by Mark Forscher's [workinonittt](https://workinonittt.tumblr.com/) blog, especially the posts that are screenshots of the work inside the applications, and David Rudnick's ["Incoming:" tweets](https://twitter.com/David_Rudnick/status/869240454713286656).

## Not a tumblr

The sensible approach would probably have been to start a tumblr, but I really didn't want all the extra tumblr overhead, and I wanted to be able to do things how I wanted to do them. It also seemed like a good, low-risk, opportunity to understand server-side programming better (more on development in another post).

## Scoping

So I started from scratch and worked out from the absolute minimum of what I wanted.
- I wanted to be able to post work in progress shots.
- I wanted the option to post those shots to twitter, with the full image attached (I don't think Tumblr lets you do this).

### Categories, tags?

I had to decide about categories and tags. On my previous [tumblr blog](http://grantcuster.tumblr.com/) I'd tried to set-up and stick to this tagging system, that would let you see across broad categories like "projects" and narrower slices like "web projects" and "fast forward labs projects". The idea was that the real interesting design challenge for the blog was an information design challenge, and that I'd work within the constraints of the tagging system. It was... an interesting experiment. I think the main problem was it just increased the friction every time I went to post, so I posted less, and eventually lost all momentum and stopped.

### Just post

With past experience in mind, I decided the top priority for the blog was to make something I would regularly post to. Any cool categorization stuff could wait until I made sure I was going to use it. So I settled on only two categories: **Inspiration** and **Work**, and no tags. 

The rest of the post options are also severly constrained. Besides the image and date, the only visible field is a source link. I don't directly expose any writing for each post because I thought that then I might feel pressure to write something good – and that friction might lead to me not posting. I do use title/alt text for each post, though. Since that is less immediately exposed it doesn't cause me much anxiety friction.

## Visual design

I knew I wanted something pretty minimal for the actual look of the blog. Since I knew I had two categories of posts to work with I really focused on designing a system that worked with that. The tension as I saw it was:

- Find the simplest mechanic to distinguish an inspiration post from a work post.
- That mechanic should not be so disruptive (like changing the background from black to white) that it becomes tiring to look through the collection.

### The grain

I was (and continue to be) fascinated by tryng to come up with web design metaphors that work off of some of the most basic web functionality. It feels satisfying to me in the same way that seeing a building where the joints are exposed does: this feeling that it's staying true to its form and not trying to hide or obscure how it's functioning. Frank Chimero talks about it in [The Web's Grain](https://www.frankchimero.com/writing/the-webs-grain/). I think you can also see it in [Brutalist Websites](http://brutalistwebsites.com/). I was also thinking about Ben Pierrat's original [This.cm design](http://feed.grantcuster.com/post/20160403T234211000Z), which tiled preview images to the length of the article title, a lot while trying to figure the blog out.

### Real is a feeling

I don't think the idea that spare websites are any more *honest* would really stand up to intense scrutiny. Especially since, with software interfaces, everything is an abstraction built on past arbitrary abstractions. There's nothing about any of this that is inherent to how, like, computers run at the level of 1s and 0s.

I think it's good to interrogate all of that, but there's also a point at which you should design your blog in a way that makes you happy. I like these kinds of designs. I love seeing what kinds of moves people make in them. I wanted to see what kind of moves I could make. That's enough for this.

### To the left, to the right

The move I decided on was aligning all the inspiration posts to the left, and all the work posts to the right. I like that probably everyone can imagine how you could make the design in a Word document, highlighting and clicking the paragraph align button for each entry. I set some limits on how wide and tall any one image could be, but I liked that, depending on their dimensions, they reached different distances in towards the center of the page. Doing web design, you have to figure out how to put a lot of things in standard-size boxes, it's nice to let the image kind of run wild.

The other kind of echo metaphor I think that I get out of the left and right alignment is the idea of a dialog. The place you're most likely to see this split alignment is in text message conversations, and I like the idea that I am getting these messages from my inspirations and then responding back. It's kind of a heavy conceptual metaphor so I don't emphasize it with the styling, really (like I think putting the posts in outlined text messages would be a step too far).

### A couple more points

I mentioned earlier that a priority was being able to post to twitter and automatically attach the full image. This turned out to be super important to motivating me to keep posting. I don't think many people visit this blog itself, but they do (sometimes) respond to the Twitter posts, that sense that somebody is seeing this stuff makes me more likely to keep going. It's kind of a nice split, here on the blog I get to present everything exactly the way on want to present it. Then it also gets to go venture into the (slightly) wider world on twitter.

A dilemma I went back and forth on a lot with the feed was whether to put some drop shadow on the images, since a lot of the screenshots I post are of websites where the background is white and the delineation between that and the background can be confusing. I tried it a few times but felt like it made the page suddenly feel much heavier and less informal. If this site was for anyone but me I would probably do it, since it does seem like the sensible thing, but this is my website so I left them out.