---
layout: post
title: "My Gnome Shell Setup"
date: 2020-11-07 22:04 +0530
tags:
  - free
---

##### There was a DE show-off in Free Software Camp today. This is an expanded version of what I presented #####

*(For first time readers, this website acts like a [bin](/welcome/) where I [document everything I can](/why-document/). I use it to sometimes [replace chat messages](/blogs-to-chat/))*

I was a KDE user from [2015 July](https://github.com/jamessan/vim-gnupg/issues/40) till I suppose 2017. I probably used Gnome Shell before that. And Gnome 2 or XFCE before even that. Who remembers? I'm pretty sure the first DE I used is Gnome because [BOSS Linux](https://blog.learnlearn.in/2009/03/bharath-operating-system-solutions-boss.html) comes with that. [According to the blog I wrote when I tested bspwm](/bspwm/), I switched to i3 somewhere in 2017. The [git history of my dotfiles](https://gitlab.com/asdofindia/dotfiles/-/commits/master/i3/.config/i3) confirms that I was using i3 for many months in 2018. My primary laptop at that time had a 2GB RAM and i3 was the only thing that would keep it responsive when I run 10 applications at a time.

When I joined [metastring](https://metastringfoundation.org/) I got a laptop with 16GB RAM and Ubuntu + Gnome Shell preinstalled. I didn't care to set things to my taste again on this laptop and therefore I have been using Gnome Shell since the end of 2019. That has lead to some interesting things too.

I do some of the same things on my computer every day. I am either in my Firefox window reading, browsing, typing emails/chats, etc. Or I'm coding - with terminals open running local servers, etc.

When I'm in Firefox all I want from my DE is for it to be invisible.

When I'm coding, I want my DE to help tile windows so that I get an overview.

Sometimes when I'm coding and my phone is on my table and the phone vibrates I want to know what notification has come up on the phone, but I don't want to move my hands away from my keyboard. So I need my phone to connect seamlessly with my laptop. With KDE this was possible with KDE Connect.

Turns out in Gnome Shell this is possible with an extension called [GSConnect](https://github.com/andyholmes/gnome-shell-extension-gsconnect/) which is a KDE connect implementation for Gnome Shell. So, I can use the very same app on the phone and access all the features in Gnome Shell.

For tiling window management, I was using some extension or perhaps I wasn't using anything at all. And that's when I first saw [Material Shell](https://material-shell.com) (HT: tachyons). I was in instant love and [ended up switching to ArchLinux](/how-not-to-update-ubuntu/) while trying to install it.

Material Shell filled the void that leaving i3 left in my workflow. It had the ability to switch between different tiling layouts with the existing windows. It also has a very nice full screen mode where all of the interface can be hidden allowing me to give my 100% to what I'm doing at any moment.

Some other points:

* These days I use a desktop resolution of 1280x768 because I find myself sharing my screen all too often (or recording videos). And the lower resolution helps visibility for viewers.
* Gnome online accounts was very much broken in the past, but it is working okay now.
* Nautilus file manager has some nifty extensions
* [extensions.gnome.org](https://extensions.gnome.org) has some cool extensions for Gnome itself. And Gnome extensions are written in Javascript which makes it easier for me to contribute.
* Gnome has a nightlight mode which makes screen colours warmer towards end of the day (what redshift used to do earlier)
* The [clipboard indicator](https://extensions.gnome.org/extension/779/clipboard-indicator/) extension makes it possible to store clipboard history (like the functionality in KDE)
* Wallpaper, desktop widgets, etc are things that I never find useful because I'm almost always working inside an application.
* Opening [`data:text/html, <html contenteditable>`](data:text/html, <html contenteditable>) in the URL bar will open a quick text editor in your browser

How is your desktop environment set up? [Let me know](../comments/)
