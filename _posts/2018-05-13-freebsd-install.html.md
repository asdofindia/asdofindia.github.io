---
layout: post
title: "Installing FreeBSD"
tags: ["tech"]
---

##### The hard but fruitful path to installing freeBSD #####

## GParted ##

The first issue I ran across is in running gparted on i3. If I ran via commandline, I would get

```
Error executing command as another user: No authentication agent found.
```

If I did `sudo gparted`, I'd get

```
No protocol specified

(gpartedbin:9428): Gtk-WARNING **: 11:50:24.881: cannot open display: :0
```

So I ran around trying different [authentication agents](https://wiki.archlinux.org/index.php/Polkit#Authentication_agents).

None seemed to be able to authenticate me. While trying to figure out how this is happening inside `journalctl -u polkit` I found out a workaround used in [wayland to make sudo work](https://wiki.archlinux.org/index.php/Running_GUI_apps_as_root#Using_xhost):

```
$ xhost si:localuser:root
```

This worked like a charm. I could run `sudo gparted` after this and later `xhost -si:localuser:root` would remove the hack.


## USB Image ##
The handbook mentioned "Additional installation files are included for computers that boot with UEFI (Unified Extensible Firmware Interface). The names of these files include the string uefi."

But when I went through the [list of images from the homepage](https://download.freebsd.org/ftp/releases/amd64/amd64/ISO-IMAGES/11.1/) none of the files had the string `uefi` in them. Turns out it was [only in version 10 that these files were named differently and now the uefi support comes baked in](https://forums.freebsd.org/threads/so-freebsd11-amd64-memstick-is-uefi-only.50660/).


## SHA512 ##
How do I check the integrity of the download over my flaky network? Well there's a checksum file they have given. But I wanted to do it the right way. `md5sum` didn't even accept the checksum file. But `sha512sum` did.

```
$ sha512sum -c CHECKSUM.SHA512-FreeBSD-11.1-RELEASE-amd64 --ignore-missing
FreeBSD-11.1-RELEASE-amd64-memstick.img.xz: OK
```

## tar ##

[Can I untar this without bombs going off](https://www.xkcd.com/1168/)?

```
$ tar xzvf FreeBSD-11.1-RELEASE-amd64-memstick.img.xz

gzip: stdin: not in gzip format
tar: Child returned status 1
tar: Error is not recoverable: exiting now
$ tar xvf FreeBSD-11.1-RELEASE-amd64-memstick.img.xz
tar: This does not look like a tar archive
tar: Skipping to next header
tar: Exiting with failure status due to previous errors
$ tar xbvf FreeBSD-11.1-RELEASE-amd64-memstick.img.xz
tar: Old option 'f' requires an argument.
Try 'tar --help' or 'tar --usage' for more information.
$ tar x --xz FreeBSD-11.1-RELEASE-amd64-memstick.img.xz
tar: Refusing to read archive contents from terminal (missing -f option?)
tar: Error is not recoverable: exiting now
$ tar xf --xz FreeBSD-11.1-RELEASE-amd64-memstick.img.xz
tar: --xz: Cannot open: No such file or directory
tar: Error is not recoverable: exiting now
$ tar --xz xf FreeBSD-11.1-RELEASE-amd64-memstick.img.xz
tar: You must specify one of the '-Acdtrux', '--delete' or '--test-label' options
Try 'tar --help' or 'tar --usage' for more information.
$ tar --xz xzvf FreeBSD-11.1-RELEASE-amd64-memstick.img.xz
tar: You must specify one of the '-Acdtrux', '--delete' or '--test-label' options
Try 'tar --help' or 'tar --usage' for more information.
$ tar --xz xtzvf FreeBSD-11.1-RELEASE-amd64-memstick.img.xz
$ tar xf FreeBSD-11.1-RELEASE-amd64-memstick.img.xz
tar: This does not look like a tar archive
tar: Skipping to next header
tar: Exiting with failure status due to previous errors
$ tar xJf FreeBSD-11.1-RELEASE-amd64-memstick.img.xz
tar: This does not look like a tar archive
tar: Skipping to next header
tar: Exiting with failure status due to previous errors
```

No. Nothing seems to be helping.

Is it an [issue with xz](https://askubuntu.com/questions/92328/how-do-i-uncompress-a-tarball-that-uses-xz)?

Oh, notice the filename. There is no `tar.xz` in it. Maybe it's only xz that is required?

```
$ unxz FreeBSD-11.1-RELEASE-amd64-memstick.img.xz
$ sha512sum -c CHECKSUM.SHA512-FreeBSD-11.1-RELEASE-amd64 --ignore-missing        
FreeBSD-11.1-RELEASE-amd64-memstick.img: OK
$ ls
CHECKSUM.SHA512-FreeBSD-11.1-RELEASE-amd64
FreeBSD-11.1-RELEASE-amd64-memstick.img
```

Aha, xz even deleted the original file.


## Data Destroy ##
`dd if=FreeBSD-11.1-RELEASE-amd64-memstick.img of=/dev/sdb bs=1M conv=sync` as per the manual

In hindsight, should have added [`status=progress`](https://askubuntu.com/a/215590/82660)

Finally, the dd command finished.

Nautilus seemed to think the USB drive was empty. Anyhow, should restart and see.
