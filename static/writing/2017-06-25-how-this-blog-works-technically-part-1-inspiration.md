---
title: "How this blog works (technically) part 1: inspiration"
date: "Mon, 26 Jun 2017 00:16:50 GMT"
preview_image: "/static/images/writing/12.png"
---

*This is a post about the code this blog runs on. My original post got really long so I split it into two parts. This first part talks about the other projects that influenced how I set up this blog. The next part will be about coding the blog.*

## A Quick Rundown

![A screenshot of the server.js file.](/static/images/writing/12.png)

*A look inside the top of the server.js file*

This blog is built on the [next.js](https://github.com/zeit/next.js/) framework, which lets you (relatively) easily build server-rendered [React](https://facebook.github.io/react/) javascript apps. It runs a custom [Express.js](https://expressjs.com/) server (as opposed to the default next.js one) so that I can do dynamic routing stuff. There is no database. The feed section runs off a JSON file and the writing part runs off a folder of posts written in markdown.

## Origins

As mentioned in [my post on the design of this blog](/writing/2017-06-17-why-this-looks-like-this), this whole thing started because I wanted a stripped down tumblr-like feed. I mainly do design and front-end development. I thought this was a good opportunity to learn more about back-end dev and deployment.

## Feed v1

![A screenshot of v1 of this blog.](/static/images/writing/9.png)

*The first version of the blog. It had a black top header and a lot of different code*

This is the second version of this blog. It incorporates a lot of the code and lessons from version one. Some highlights from the decisions and lessons from that project:

### Starting from scratch

I got really excited about the idea of starting from (relative) scratch and only adding what I absolutely needed to run the app. For me and for this project, that meant starting with Node. I briefly considered trying to write the server without the Express.js framework, but that just seemed like I was being unnecessarily stubborn. A big part of this project was trying to push myself out of my comfort zone to better understand things that I generally leave to frameworks or co-workers., but I didn't want to jump so far into the deep-end that I stopped enjoying the project and therefore stopped working on it. I used Express and was happier for it.

### The problem of the database

After I got the app running and some simple page templates loading, there was the issue of the database. I've always found setting up a database to be a bummer part of my small personal projects. For v1 I used MongoDB, which I've done several times, but I still stumble and google my way through most of its set-up and commands. For projects like this, adding a database feels like the end of the honeymoon phase of the project, where I go from feeling like I really have a handle on how the app works to feeling like there's a big piece of it that I kind of have to tiptoe around to make sure I don't upset it. For v1, I got it set up without too much trouble, but the experience left me on the lookout for different and simpler solutions.

### Server-side templates

In the interest of keeping things simple, I was set on sticking to server-side rendering. I ended up using jade templates (which I was surprised to learn had been renamed to PUG) for simple templating. I was using and enjoying React in a lot of my work projects, but I felt like I should forego it in the interest of broadening my experience.

### Deployment on AWS

The least fun aspect, as usual for me, was deployment. This was another area where I really wanted to start from the basics, and really understand step-by step why I was doing the things I was doing. I figured AWS EC2 was a good place to start from scratch. I followed the documentation pretty closely, and I didn't have any big problems, but I still felt like I didn't have a strong grasp on what I was doing. I did get the app and database up, and I learned to use `screen` to keep a session going. I didn't enjoy it, but I think the experience did give me more context for reading about deployment or hearing my co-workers discuss it.

### V1 Limitations

The biggest achievement of v1 was that I got it up and that I actually posted to it. There were a couple of limitations with it that I would focus on fixing for the next version:

- **The database**: I built a post upload form but I hadn't set up edit or delete endpoints for the posts, so I had to login to the database to correct anything I entered wrong. That process was annoying so I'd put off doing it. It'd take me a few days to get around to fixing a miscategorized post and the low-level guilt and annoyance from that made me like the blog a little less.
- **Dev experience**: Using only server-side javascript did help me learn some things, but it ended up making the blog less fun for me to work on. I got really used to using [Create React App](https://github.com/facebookincubator/create-react-app) in work projects and having acess to stuff like ES6 features and hot module reloading. Without that stuff, the blog was less fun to work on. I couldn't apply the cool stuff I was learning on other projects to the blog.

## The Fast Forward Labs blog

![A screenshot of the Fast Forward Labs blog.](/static/images/writing/10.png)

*The [Fast Forward Labs Blog](http://blog.fastforwardlabs.com)*

There was another blog in my life at the time, which would end up having a big influence on how I approached v2 of my personal one. We moved the [Fast Forward Labs](http://blog.fastforwardlabs.com) from tumblr to [Jekyll](jekyllrb.com) about six months ago, primarily because we wanted to have more control over the presentation of our technical posts. After looking around at some other options and a couple of false starts, I had settled on Jekyll because I knew it could handle technical posts well. I had been curious about Jekyll for a while, not least because it used static files in place of a database.

As I set up the FFL blog, I tried to "go with the grain" of Jekyll and do things their way even if I didn't immediately completely understand the reasons for it. It was interesting to see how the simplicity of the set-up depended on users closely following the conventions (i.e. the file name format for posts and the YAML metadata blocks). My respect for the simplicity has grown as we've used the blog longer and as I built my own version of some of the functionality for this blog. It was interesting to switch my mind-set from client-side javascript apps to a blog where everything was pre-built. Compared to tumblr, it was very comforting to know that underlying the content was a tidy markdown file, rather than the mess of overlapping `<span>` tags that we ended up with after a few edits of our tumblr posts.

### FFL blog limitations

The FFL blog is a more robust app then v1 of the feed, but there were still areas that I wanted to improve upon.

- **Dev experience**: this is the same issue I had with v1. I think it was a good decision to go with a battle-tested solution like Jekyll for the FFL Blog (rather than one of the Jekyll-like javascript frameworks), but it did make doing work on the front-end of the blog less fun. The trade-off made sense for the company blog, but it reinforced my desire to get a little experimental on the next version of my own.
- **Ease of posting for many people**: this isn't something I really addressed in my new blog (because only I post on it), but it is something I am still interested in figuring out. Transferring the FFL blog made posting a lot easier for technical team members but harder for people who were less technical. I spent a fair amount of time looking at CMS solutions but never felt like anyone did it right. So far I've managed to restrain myself from making us a custom FFL markdown CMS but I don't know long I will hold out.

### We are reading

![A screenshot of the links section of the Fast Forward Labs blog.](/static/images/writing/11.png)

*[We are reading links](http://blog.fastforwardlabs.com/links.html) on the FFL blog*

Perhaps the strongest influence on the new blog comes out of a feature on the FFL blog. Partly to break up the main FFL blog page from the monotony of just post links, I added a feature to the FFL blog where we could post links to articles we were reading. These link posts lived in a static YAML file. I built a simple interface for adding them using Vue.js. Posting a new link meant appending the info to the YAML file and committing the changes. Since Jekyll is integrated with the github pages hosting of our blog, those changes are automatically deployed. Besides easy automatic deployment, I really appreciated how transparent this system was. If you made a typo in your entry you could just go fix the YAML file in the github interface. Much easier than logging into the database.

It was in the "We Are Reading" mini-app set-up that I really felt like I had some ideas for how to redo my personal blog in a simpler and more transparent way.

## V2 goals

The next blog post will get into the development of this blog. This part was meant to provide some context for my decisions about the new version of the blog. The main things I drew from other projects, that I wanted to really put to use in the new blog were:

- **No database**: I wanted the ease of use and transparency of a static set-up.
- **All the modern JS dev niceties**: I wanted to be able to use ES6 features and hot reloads. I wanted the dev experience to be fun enough that I'd enjoy working on the blog.

I did end up with both of those things! But there were lots of trade-offs to get there that I'll talk about in the next post.








