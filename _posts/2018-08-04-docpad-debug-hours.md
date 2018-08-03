---
layout: post
title: "How a tiny temporary file made me waste hours"
tags: ["code"]
---

##### Sometimes the bugs are because your working directory is not clean #####

As I sat down to update [my website](https://learnlearn.in) today, docpad was not generating the site. But it was working correctly on the deployment server. Maybe it was a node issue. So I tried downgrading my node version - no use.

Then I tried installing docpad freshly after removing node_modules. No change, it kept throwing errors (and not very meaningful errors either).

Then I decided to see if it's docpad's error by creating a new site with docpad. That would compile perfectly.

So, I figured out it's something to do with the configuration of my site.

And then I started uninstalling all the plugins I had. Nothing helped.

I deleted all the blog posts. Nothing helped.

I made sure every file in the skeleton site I had created and my site were the same - package.json, package-lock.json, even README. Still the skeleton site was working on `docpad run` but my site wasn't.

Then I ran `diff -arq skeleton_site my_site`.

Turns out there was a 0 byte temporary file created by vim in my src/documents `.#trauma.html.md` and it was this file that was creating all the problems.

I removed the file and magically `docpad run` started working.

Of course I was working on a backup of my original site folder, and so, I removed the file in the original folder and voilah, no bug!

**Lesson learned: when things aren't working, try cleaning everything**