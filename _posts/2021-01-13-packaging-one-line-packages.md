---
layout: post
title: "Packaging One Line Packages"
tags:
  - thoughts
  - debian
---

##### Debian project is constantly troubled by javascript (and maybe go, ruby, etc) ecosystem where projects would have too many dependencies, some of them too small. How should Debian deal with it? #####

**Note: This post wasn't published till 3rd February, 2024 because I lost interest in it. It eventually got published (at the older date) because I didn't want to just discard them. But it hasn't been updated or completed.**

This post is written in response to [Debian discusses vendoring - again](https://lwn.net/SubscriberLink/842319/8adb13e08d0302bd/). I initially was going to write about why one line packages are awesome. But there's a nice page for it: [Awesome Micro npm Packages](https://github.com/parro-it/awesome-micro-npm-packages). So I wondered what Debian should be doing to deal with such software.

### The friction on preparing packages should be low ###

Yes, Debian can have a model where Debian Developers are trusted contributors who are selected after a rigorous process. That's not the friction.

The friction is in preparing packages. The recommended toolchains have ancient interfaces and require the user to have lots of context. While I understand why this is so, it doesn't help people who want to help.

Another thing is
