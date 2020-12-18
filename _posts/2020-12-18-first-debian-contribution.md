---
layout: post
title: "My first (real) Debian Contribution"
tags:
  - foss
  - free-culture
---

##### Debian is the flagship free operating system. Over the last week I made a small, but useful contribution to Debian. It made me so happy! #####

I have never used Debian directly on my computer. But many of the servers I operate or maintain use Debian. At least, Ubuntu. I prefer to use ArchLinux everywhere for its wonderful wiki and PKGBUILD based Arch User Repository. But many free software contributors whom I know prefer Debian as their daily driver.

In the [free software camp](/free-software-camp-opening/) there were more discussions about how nice Debian is and it was increasingly becoming difficult to stay away from it. Besides, Pirate Praveen [has been asking](https://social.masto.host/@praveen/105236594536260204) for help with upgrading the yarn package. I knew that it was time that I make my first contribution to Debian.

I had earlier been able to [find the reason for a bug](https://joindiaspora.com/posts/19102750) in diaspora (and thus the diaspora Debian package). But I could do that without setting up a Debian environment or learning Debian packaging. This time, I wanted to do something that would really make me learn a lot of things specific to Debian. So, when last week Praveen asked me again to see if I could fix the yarn package, I decided to dedicate a large block of time towards it.

Debian has an interesting bug tracker called the Bug Tracking System (BTS). It has a [web interface](http://bugs.debian.org), but you cannot submit a bug through it. Bugs are [submitted via email](https://www.debian.org/Bugs/Reporting) and there is even a dedicated tool called `reportbug` which makes it easy.

In fact, it appears like Debian uses emails a lot. There are numerous [mailing lists](https://www.debian.org/MailingLists/) and each of them gets countless emails. But all the communications I made in order to help fix the yarn package was through the #debian-js IRC channel on OFTC accessed via Matrix.

Debian packaging has many nuances. A lot of it is guided by [debian policy](https://www.debian.org/doc/debian-policy/) (which I haven't read). There is an [introduction page](https://wiki.debian.org/Packaging) on the wiki. Fun fact I learnt from one of the slides in there is that Debian was born in the same year as I was.

Since I only wanted to fix bugs in a package that already has been worked on by the JavaScript team (Debian moves forward through teams like these), I didn't read a lot of packaging documentation, but just enough to build the yarnpkg on my computer.

First, I had to have an unstable Debian running. For that, I used [schroot and debootstrap](https://wiki.debian.org/Packaging/Pre-Requisites). Interestingly, these were available in Arch's repositories and I could very quickly set up the schroot. Yet, there were some issues related to /etc/network, related to users/groups, etc which I had to find answers through internet. I still get warnings about missing groups inside the schroot which I fix by doing `groupadd <whichevergroup>`. There is some sort of copying that happens from host system to schroot which I have to read more about.

Next, I created an account on Debian's gitlab instance - [salsa](https://salsa.debian.org/) and downloaded the [node-yarnpkg](https://salsa.debian.org/js-team/node-yarnpkg) repo. I didn't know that `dh` is an easy tool for packaging and therefore used dpkg-buildpackage command with various flags I found from the internet (`dpkg-buildpackage -b -rfakeroot -us -uc`) to make it build the deb. Then I installed the deb with `dpkg -i` and tried running `yarnpkg` (in Debian, `yarn` was already taken by some other package, and therefore the javascript `yarn` is `yarnpkg`) and surely it threw the same errors that [were reported](https://bugs.debian.org/cgi-bin/bugreport.cgi?bug=960120).

For those who are interested, the issue specifically was this. Debian is moving on to babel version 7 while yarn version 1 depends on babel 6. Since yarn 1 is not actively updated any more, we had to somehow update it to work with babel 7. The migration guide for babel 7 was useful, but there were some plugins being used which were not updated for babel 7. Removing them would cause problems, keeping them wouldn't work. A lot of work has been put into packaging all dependencies and also removing various errors within the yarn package and the packages for the [next version of Debian](https://wiki.debian.org/DebianBullseye) are going to be frozen soon.

I decided I will try to get the upstream yarn work with babel 7 first. So, I cloned the upstream source, and followed babel migration guide to have something built. I removed an obsolete plugin and was able to somehow build and run `yarnpkg`. So I recorded the change that I had to make [using quilt](https://wiki.debian.org/UsingQuilt) and made [a merge request](https://salsa.debian.org/js-team/node-yarnpkg/-/merge_requests/2). Quilt is like git, but for producing patches. It has to be configured for use in Debian and you have to do at least `export QUILT_PATCHES=debian/patches` to make it work with Debian patches. `debian/patches` is the directory inside a package's source where the patches required for packaging the software is stored.

The package building helpers will run quilt to apply the series of patches before moving on to the actual build.

With that merge request submitted, Praveen let me know that the yarn package depends on a particular requests library which is deprecated and it might be useful to migrate it to a different library. This made me look up the functioning of that particular library and see how yarn was using it and so on. Essentially, I read lots and lots of code. **Well written software is software that a new person can read and understand without trouble**.

My merge request, meanwhile, was not useful. It just changed the error to a new one. This made me really invested and I tried a lot of things including pulling out the `node` package (which I suspected to be buggy) and patching it. There were plenty of people on #debian-js who were helping (including gargantua\_kerr, jonas apart from Praveen). I had been awake till 3 AM that night and I decided I might have better luck if I got some sleep. I am almost sure I saw a solution in my dream, but I forgot what it was by morning.

Next night, I was so tired for the previous night's sleep debt. There was also lots of trial and error and for a long time I was editing the wrong section of the configuration file and scratching my head. Something I learnt through this process is this: **When configuring/coding something and you're not sure if you're changing the right section of configuration/code, deliberately introduce an error and see if that makes things go wrong.** Otherwise, you might be making the right change to the wrong section and scratching your head on why it isn't working. Even worse, sometimes you will discard the right solution because you tried it in the wrong place and it didn't work. By the time my brain stopped working I had figured out my mistake.

The next morning, therefore, I had a plan - I would restart from the beginning. By then I knew more things about how the debian/rules file worked and I knew how to reproduce the autopkgtest error by directly running the script in debian/tests. Like Praveen had suspected, I had to reintroduce [the lazy loading functionality](https://github.com/zertosh/babel-plugin-transform-inline-imports-commonjs/pull/13#issuecomment-747881043) of the plugin I removed. This helped things move forward and I made another merge request before I went to the clinic for a team meeting.

But even then, the autopkgtest was failing due to a different error. I tried putting in many of the plugins that make up babel's (deprecated) stage-0 preset, one by one. None of them helped. I tried to see how the build from upstream was different from our build. It had something to do with `this` and `Object.defineProperty`. Enough said. I decided to take the easy route and patch just this function. Turns out this function was the one which would show if there is an updated version of yarn available. Since it doesn't make any sense for Debian, removing the function call was the easiest thing to do. I updated my [new MR](https://salsa.debian.org/js-team/node-yarnpkg/-/merge_requests/3) with this hack and it passed all the tests. Yet, I wasn't sure that there wouldn't be an error anywhere else.

Praveen used this yarn to build some things in the gitlab package and confirmed that it didn't have any obvious issues. It maybe my first contribution to Debian, but I already know how big of a [team work](https://social.masto.host/@praveen/105400828905675712) the entire thing is. I was so happy by then that I looked for more ways to contribute. I joined the [Debian Med](https://www.debian.org/devel/debian-med/) mailing list and other interesting mailing lists. I decided to try out [GNUMed](https://www.gnumed.de/documentation/). I wrote this blog post. And I decided to install Debian Unstable on the spare partition in my harddisk.

