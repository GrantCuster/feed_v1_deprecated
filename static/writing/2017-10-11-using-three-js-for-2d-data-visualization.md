---
title: "First look: using three.js for 2D data visualization"
date: "Wed, 11 Oct 2017 03:00:00 GMT"
preview_image: "http://blog.fastforwardlabs.com/images/2017/10/tsne-final.png"
external: "http://blog.fastforwardlabs.com/2017/10/04/using-three-js-for-2d-data-visualization.html"
---

We've started work on our next prototype. While the design is still evolving, we're pretty sure one element of it will be a visualization of tens of thousands of data points, clustered through a dimensional reduction algorithm (most likely using T-SNE). For the past week I've been exploring how to render that many points in the browser and I wanted to document some early lessons in this post, specifically about using the three.js library.

I'm new to three.js so this isn't a best practices post. Hopefully this provides a starting point for people interested in doing similar data visualization work. If you have ideas on how to do this stuff better, I'd love to hear them via Twitter (@grantcuster).
