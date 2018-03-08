---
title: "Scoping a mini-CMS for a static site generator"
preview_image: "/static/images/feed/Screen_Shot_2018_02_10_at_4_23_53_PM-1518297923315.png"
date: "Sun Feb 11 2018 19:17:26 GMT-0500 (EST)"
---

![](/static/images/feed/Screen_Shot_2018_02_10_at_4_23_53_PM-1518297923315.png)

_A screenshot of the new CFFL Post Editor_

Over the past week I built a post-editor for the [Cloudera Fast Forward Labs
blog](http://blog.fastforwardlabs.com/). It allows you to write markdown in the
left panel and see a preview of the post on the right. It is integrated with
Github so we can load and save posts through it.

I'm really happy with how the editor turned out, and I think there is a real
opportunity for it to be useful to people outside of CFFL. In this post I'm
going to think through ways I could open it up to a larger audience. The issue,
as it often is, is one of scoping.

## Why we needed a post editor

A few years ago I moved the CFFL blog from tumblr to Jekyll. One of the main
reasons was we wanted something that could handle long posts containing blocks
of code. Jekyll has been great for this. It's been less great for my co-workers
who were not used to the command line or markdown. Everyone has been game and
done a great job of making it work, but I've been conscious of several friction
spots, and wanting to do something about it for a while.

### 1. Adding images

We do a lot of our blog post editing through the Github interface. Github has
built a really nice editor and markdown preview, but  there are some tedious parts. The biggest
one of those is adding images, having to open a new tab, remembering which
folder to add the image to, and then how to write the link for it is a slog and
can break the flow of writing a post.

When we first made the switch I thought I would get everyone set-up with a text
editor. After looking around a lot, the closest I got was a plugin for Atom that
had nice formatting tools, and a good preview. It had a button to add images
that would automatically upload them to the right place (which is what I was
really after) but it was kind of brittle. It was also just a lot of set-up to
ask people to deal with, you needed to download a text editor, install a plugin,
and probably also install the Github client to do commits. The Github editor
turned out to be the easier option.

### 2. Previewing posts

If you're one person writing a blog, you preview your Jekyll posts by running
Jekyll locally. I had naively thought that I'd get everybody set up with their
own local version to preview posts with. I think I'm the only one who has ever run our
blog locally. Even my programmer co-workers haven't taken the time to set it up
(I do not blame them). Instead we use the Github markdown preview to check
formatting. Our blog is styled differently, but if I've set up the design right
it should be able to handle everything that looks decent in Github's preview.
Anything we missed just gets fixed right after the post goes up. We host
using Github pages so changes are deployed automatically and nearly immediately.
I kind of like the enforced style modularity of the system, but it would still
be nicer for everyone if they could see exactly what a post is going to look
like.

## Why I thought I could build a post editor

There were several side projects I'd done that made me feel like I could make a
post editor that addressed the image and preview issues. I'd made a couple of blog tools, one
for adding "We are reading" links to the blog, and another to try and smooth out
the image adding process by automatically uploading to the correct folder and
giving the user the code to copy and insert in the markdown post. Through those
I got familiar with using the Github API by setting up a node app to
authenticate people and handle actions like uploading images. I re-used that same
app as the back-end for the post editor.

## Why I really wanted to build a post editor

I'd been thinking about building a post editor ever since we moved to Jekyll. I
knew exactly how image uploading should be handled, so it bugged me a little bit
every week we had to do it in a sub-optimal way. I also saw other issues crop
up. I think the combination of having to name files with the date-title combo
and add some of the metadata caused people to post less. Sure, they could look
at old posts and figure out what to do, but slight friction like that can add
up. I wanted to get rid of the tedious aspects.

I think the part that pushed me over the edge was realizing how well the
split-pane editor and preview mode fit with the strengths of the React library.
I've been using React for our prototype projects for several years now, and I
could envsion pretty exactly the structure of the editor (of course there were
complications one I really got into the meat of it). Knowing that I knew the
right technical approach to the project, combined with that background knowledge
of the friction of the current system, made the project kind of irresistible to
me.












