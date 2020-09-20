---
layout: post
title: "How Not to Update Ubuntu"
date: 2020-09-20 21:51 +0530
tags:
  - tech
---

##### tl;dr - backups matter #####

I wanted to install [Material Shell](https://material-shell.com/). That's all I wanted.

I was running Ubuntu 18.04 LTS. And the GNOME on that was 3.28 or something. Material Shell wanted GNOME shell 3.34+ or something. On my version of GNOME shell it just gave an error when enabling it, saying "expected ( before catch" or something.

Well, why not just upgrade to 20.04 LTS? After all, it is LTS to LTS, right? What can go wrong?

I changed `/etc/update-manager/release-upgrades` to prompt for lts and made my way through with software updater.

Everything was going smooth till the updater told me that I had some third party packages from PPAs that were causing trouble with the update. So I decided to remove PPAs using ppa-purge. I must have installed a lots of stuff from PPAs that it kept complaining that I had more everytime I ran the updater.

So I went into the `/var/log/dist-upgrade` and figured out which packages were causing problems. Something something `python-minimal`, something something `libgl1-mesa-dri`. Nothing that a `sudo apt-get remove` cannot fix, right? I did see that some of these would remove gnome, xorg, and so on along with it. But anyhow I'm going to do a dist-upgrade, why bother? Let everything go.

Finally, the dist-upgrade happened. I was on Ubuntu 20.04. Just one issue, there was no desktop environment.

Tried installing gnome-shell and it brought up some insane error about conflicting dependency or something like that. I didn't care because I was frustrated by the entire experience by then and had made up my mind to install ArchLinux. (Last time I used arch, I used it for years and didn't ever have a problem (apart from the one time I did `sudo rm -rf /*` (See, if you run `sudo rm -rf /` nothing will happen on modern systems because rm will preserve root inode by default. But that's not the case with `/*` because you're not removing the root inode there, rather everything inside `/`)))

I made a USB livedisk and had the arch installer running. The Arch installer is super cool now. It comes with a small prompt which talks about how to connect to wifi with `iwctl` and then there is a small script which can directly load installation guide using Lynx or something.

So, my 1TB hard disk was fully taken up by Ubuntu on /dev/sda3. (/dev/sda1 was EFI about 0.5GB, /dev/sda2 was some weird Microsoft partition about 6GB in size). I would have to shrink that. Easy.

I would first have to shrink the filesystem. Can do that with `resize2fs /dev/sda3 500G`. I just want it to be 500GB.

I guess this was the beginning of my problems. Firstly, I ran resize2fs without the `-p` flag which would show the progress. Therefore, it ran forever. I literally let it run overnight and woke up at 4:30 AM to see how it was. It had finished in 3.5 hours.

So, filesystem resized, groggy eyes, I start shrinking the partition with `parted /dev/sda3`.

`resizepart 3 507GiB` I tried first. (resizepart needs the end of the partition to be specified. 506 because 500GB of /dev/sda3 and 6.5GB of the partitions before that, was my thought)

GiB is a funny unit. It is larger than GB. So, that command made my partition /dev/sda3 go till 538GB or something like that. Which meant I was losing a lot of GBs. Greedy me wanted to cut it to exactly 500GB.

So, I did a quick search on Google and found out that [500GB+6.5GB would be less than 472GiB](https://www.google.com/search?hl=en&q=500GB%2B6GB%20in%20GiB) (input numbers made up from memory). Which meant I could set the end to 472 something GiB and it would be cool. Or that's what I thought.

I did a `resizepart 3 472GiB` and `print` showed me that /dev/sda3 was now ending at 507GB or something. I happily created another partition for holding arch `mkpart "ARCH" ext4 473GiB 100%` and then created a file system in that /dev/sda4 and installed archlinux in it.

Set up everything in arch and so on. After logging into GNOME I tried loading the /dev/sda3 again. And that's when I realized something was wrong.

For some reason which I still haven't figured out, the physical partition was smaller than the filesystem. e2fsck would tell me the exact number of blocks as per the superblock, and the number of blocks available as per the physical size. And the difference was about 6%.

For some reason, my physical partition was 6% smaller than the filesystem.

And I had already overwritten that 6% with archlinux.

It wouldn't mount no matter what I tried because the superblocks were wrong.

Remember I was sleepy. So, I didn't think about destroying the archlinux partition and restoring the physical partition to the larger size. I didn't think about using [testdisk](https://www.cgsecurity.org/wiki/TestDisk). Instead, I went with a [rather extreme stackoverflow answer](https://unix.stackexchange.com/a/41946) which rewrote the superblocks thinking that it would make the filesystem match the physical size. Suffice to say, I had destroyed the filesystem completely.

Luckily, I had a backup of my primary SSH private key. And most of the things I have on my computer are downloaded from the internet or pushed to cloud git hosts. I may have lost a few draft blog posts, some code explorations, some videos, and other things which I can't even remember. I lost one SSH private key, but it is being used only on one server which some others at my work have access to. (I will tell them I'm rotating my keys for security :D)

To be honest, if I was taking a backup, I would have backed up only these private keys and a few small files. But, not having that backup and destroying the filesystem made me feel like a fool. So, always backup the absolute-must-haves when working on the filesystem because you never know what could go wrong.

On the brighter side, ArchLinux feels like home.

**Update**: Pirate Bady helped me figure out the issue. It is the units. In computer science, there seems to be a confusion on what a GigaByte is. Scientifically, a GigaByte is 1000 times a MegaByte. (Just like SI units). But some like to do it 1024 times a MegaByte (where MegaByte is also derived that way). `resize2fs` uses ["power-of-two" gigabytes as units](https://superuser.com/a/1194439). Which means 500G in resize2fs terms is equivalent to 500GiB in parted's units. Which explains the lost 30GB. 
