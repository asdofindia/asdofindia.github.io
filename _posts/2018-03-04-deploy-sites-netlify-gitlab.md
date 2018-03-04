---
layout: post
title: "How I roll out my websites - gitlab, netlify, and others"
tags: ["tech"]
---

##### Static sites are the present day standard for web building. I publish this blog and [my website](https://learnlearn.in) using different static site generators and powered by git, gitlab, netlify, and other useful tools. Here's how the whole thing works #####

It all started with [github pages](https://pages.github.com/). Coders who are working in their git repositories all the time would love a way to publish blog posts using the same kind of technology. So, why not have a git powered blog/website. And there was [jekyll](https://jekyllrb.com/).

But later, gitlab introduced [gitlab pages](https://about.gitlab.com/features/pages/) and like all things gitlab does, it one upped github by using [gitlab ci](https://about.gitlab.com/features/gitlab-ci-cd/) to build sites using *any* static site generator and upload to gitlab pages. It also added the ability to [serve files over https](https://about.gitlab.com/2016/04/11/tutorial-securing-your-gitlab-pages-with-tls-and-letsencrypt/) and so I could get a certificate from [letsencrypt](https://letsencrypt.org/) and upload to my site.

But configuring https on gitlab is cumbersome and needs to be done [every 3 months](https://letsencrypt.org/2015/11/09/why-90-days.html).

And when my certificates expired yesterday and I had to look up letsencrypt documentation for the command to renew certificates (because my zsh_history file had gotten corrupted and `C-r certbot` was failing) I remembered [netlify](https://www.netlify.com/) that I had come across recently.

Netlify offers one-click provisioning of https certificate from letsencrypt for custom domains. Yes, you heard it right.

And setting up my website to be served from netlify took only a few minutes (most of the time spent on logging in to my domain seller's website to change dns and in sorting out the issues with NoScript add-on). Here are the actual steps I had to go through:

* Join netlify with github/gitlab/email/etc
* Add a new site from git by connecting to gitlab/github/etc
* Choose the build command to generate the static site from that git repo
* Done!
* Add CNAME
* Move DNS to being managed by netlify
* Add letsencrypt certificate (by clicking a button, literally!)
* Force https!
* Success!!

I additionally have [MGit](https://github.com/maks/MGit) and [labcoat](https://gitlab.com/Commit451/LabCoat) on my phone which makes it possible for me to pull, push, and publish from my phone!

What is next for my sites? Switching to [Gatsby](https://www.gatsbyjs.org/)
