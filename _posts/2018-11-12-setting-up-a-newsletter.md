---
layout: post
title: Setting up a Newsletter
tags:
  - meta
  - devops
---
##### After struggling for weeks I have been able to set up mailman and create lists for self-hosted newsletter #####

I have been running my own email infrastructure for quite some time now. After weeks of struggling, I have now also installed mailman 3 list manager on my infrastructure making me able to host and send my own mailing list and campaigns.

You can read how to join the newsletter on the [+follow](https://asd.learnlearn.in/follow/#newsletter) page.

### Mailman 3 ###
Mailman 3 comes as different components.

* **[Mailman core](http://docs.mailman3.org/)** - the core application that handles mails. It is designed to be extensible by exposing its internals to other applications.
* **[Postorius](https://gitlab.com/mailman/postorius)** - the web front-end for managing lists, memberships, etc. (Remember listinfo.cgi? This one)
* **[Hyperkitty](http://hyperkitty.readthedocs.io/)** and its mailman plugin - an archiver for neatly displaying mail archives.

Postorius and hyperkitty are django modules that can stand alone, work with each other, and even be plugged into your own django website.

For the sake of simplicity there is even a [mailman-suite](https://gitlab.com/mailman/mailman-suite/) project which combines them into one.

The struggle is in setting up the projects with correct file permissions, systemd jobs, and so on.
