---
layout: post
title: "[SOLVED] Netbeans won't start in ArchLinux | Fix xdm-archlinux from messing up path"
tags:
  - tech
---

##### Netbeans won't start in ArchLinux if you are using xdm or xdm-archlinux because of xdm messing up with the PATH variable. Here is a fix #####

If you tried installing netbeans and it did not start, giving this error: `Cannot read cluster file: //etc/netbeans.clusters` then this fix is probably for you.

This happens because [netbeans is relatively loading the clusters file](https://bugs.archlinux.org/task/60533) and for some reason, you're running netbeans from `/bin/netbeans` instead of `/usr/bin/netbeans`.

ArchLinux users should not have `/bin` in their path.

But who put it in your path? If it is not you, if it is not zsh, if it is not any other files in your `/etc/profile.d`, it maybe your xdm.

xdm (and by consequence, xdm-archlinux) automatically sets to `/bin:/usr/bin:/usr/ucb` without asking anyone.

The way to override this, is by editing `/etc/X11/xdm/archlinux/xdm-config` and adding this line

```xresources
DisplayManager*userPath:/usr/bin
```

The line sets the userPath to `/usr/bin` thereby rewriting the default which includes `/bin`. It maybe possible to set it to empty and let /etc/profile do the correct job of setting the PATH, but I did not try.

Log out and log back in, netbeans should start working. Do a `echo $PATH` to see if `/bin` is still there.
