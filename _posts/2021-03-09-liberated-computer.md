---
layout: post
title: "Liberated Computer"
tags:
  - hardware
---

##### I bought a Liberated Computer from Libre Tech Shop last week. I love it! #####

I asked my sibling (who incidentally works with a computer chip manufacturing company) about which laptop to buy for me. The response was to wait till June for Ryzen 5th generation laptops to be available in India.

Last week, Ravi asked in [FSCI's Matrix room](https://fsci.in/#join-us) whether there were any Indian vendors for laptops in [RYF](https://ryf.fsf.org/categories/laptops). That's when I saw [Libre Tech Shop](https://libretech.shop/) for the first time.

The decision was instant. I don't need the "fastest-at-the-moment" laptop which comes with pre-installed Windows and a graphics card that is as good as fried banana chips in GNU/Linux. I wanted a computer that respects my freedom and lets me mess with its internals.

I contacted Abhas and went to [Mostly Harmless' office](https://mostlyharmless.io/) last Saturday, along with Anivar. The room where Abhas was hacking on hardware is exactly how it looks like in video calls - full of hardware hacks. There were some LED lamps and boards, fancy keyboards of various shapes, colours, and weights, a couple of fried motherboards, many old laptops, cables, screwdrivers, clips, wires, tamed smart switches, routers, lots of books with inviting titles, and many other things that I cannot identify. Abhas did talk about many of these things, although I did not catch many of the names of components.

I had requested for a 980GB SSD and 8+8 GB RAM on my laptop. These had arrived. A device was chosen previous day itself and load tested to make sure the fans are working well and there is spare cooling capacity.

The story of the device is that it is a laptop that was previously being used by office employees and was given away at relatively good condition. These devices are sourced from sellers and cleaned up and liberated.

The first thing we had to do was to replace Intel's wirless card which had poor free software support. We put in an [Atheros AR9462 Wireless card](https://www.digchip.com/datasheets/5483679-ar9462-qualcomm-atheros-xspan.html) which has dual band wifi and bluetooth in it. The [ath9k](https://wireless.wiki.kernel.org/en/users/Drivers/ath9k) driver works well for this (and that's part of the Linux kernel).

We did that and Abhas restarted the computer just to show me how Lenovo would say "Unauthorized network card" and refuse to boot. This can be thought of as a security feature. But if someone were to open my laptop and change wireless cards, they might as well be able to hack the BIOS. It serves more as a control over customers than as a security feature.

There are two SPI flash chips inside the X230. One (the 4MB one towards the hinge) contains the BIOS. The other (8MB, towards the open end) contains what is known as [Management Engine](https://www.flashrom.org/ME) and a few other things. Manipulating this flash memory is how we win the robot war. And there are many players on our side.

There is coreboot which is a free firmware meant to support various architectures and make them boot. (An alternative is libreboot). But coreboot doesn't do everything. It boots up and gives control away to its payload. Many things can be [payload](https://www.coreboot.org/Payloads). There is [SeaBIOS](https://seabios.org/) which is a simple payload that allows booting from hardware, CD, USB, etc. Even [GRUB2](https://www.coreboot.org/GRUB2) can be directly used as payload. [Skulls](https://github.com/merge/skulls) is a project that releases coreboot images with SeaBIOS and installation scripts specific for Thinkpad X230. The [documentation of skulls](https://github.com/merge/skulls/tree/master/x230) includes details on what hardware is required.

If we have a Raspberry Pi, it can directly work as a flasher because it has the pins that can connect directly to the clip. If we don't have that, we will need a [flasher/programmer](https://www.flashrom.org/Supported_programmers) than can connect to our computer (a different computer than the one you are trying to flash) through its USB which can in turn connect to the clip.

The last thing we need is [flashrom](https://www.flashrom.org/Flashrom) which is the program that actually does the flashing.

In our case, we used the skulls external install scripts to flash the top and bottom chips using a programmer attached to USB port of Abhas' notebook on one end and a ₹2,300 worth clip on the other end. The top chip was flashed with coreboot + SeaBIOS + proprietary VGA BIOS from Intel (the alternative was to use [SeaVGABIOS](https://www.seabios.org/SeaVGABIOS) but that would not be able to show the bootsplash image as of writing this). On the bottom chip we did two things. We cleaned up the Intel Management Engine. And we unlocked the Intel Flash Descriptor. The latter would allow us to do further flashes to the top chip from within the booted operating system.

We then started the computer to verify that the flashing had succeeded. The skulls bootsplash appeared and the device was ready to go. But there was one last thing to do. We had to replace the skulls bootsplash with the [liberated.computer](https://liberated.computer) one. We first read the rom into a file with flashrom. Then modified it with [cbfstool](https://doc.coreboot.org/cbfstool/) to replace the bootsplash image (a carefully created JPG). Then we wrote the modified rom back with flashrom.

Abhas kindly cleaned the entire computer (inside and outside) with isopropyl alcohol and connected my SSD, RAM, and screwed everything back together. The Intel wireless card was added to the collection of battle scars. Since I wanted to install [Arch](https://archlinux.org/) myself, we didn't install an operating system there. Instead, we booted from a live USB of KDE Neon and made sure things were working. The battery had a capacity of 72% (good for a couple of hours backup as per Abhas). The wirless was working. And all of that.

We then talked a bit about various free software projects and other hardware hacks. Liberating smart switches, for example. Then I came home to install the OS.

Remember this is a 2012 computer running in 2021. I had to go back in history for a few things. For example, there is no UEFI stuff anymore. So, partitioning the disk was complicated. I went ahead with a BIOS/GPT setup. Turns out GRUB needs a special partition called BIOS boot partition in GPT. Somehow it worked on the first try with parted setting the `bios_grub` flag on that partition.

The first thing I noticed about this computer is the speed with which file operations work. Installing packages, for example is a breeze. SSD is the reason. This is the first time I use SSD and I am loving it. I ditched Gnome Shell and switched to KDE Plasma for this machine. The boot to firefox time is about 40 seconds (In the first 7 seconds the GRUB OS selection is made, in the next 16 the login password has been entered, and in the last 18 seconds Firefox has loaded with the tabs from previous session and a fresh tab has made the network connection) with this.

I might not have used it long enough for figuring out the drawbacks. It is small. 12.5". But it is also light weight. The keyboard is not backlit. But it is front-lit. There is a red thing between G, H, and B keys on the keyboard. Turns out that is something called TrackPoint which doubles as a mouse. (I have used ThinkPad earlier and never knew this). There are many nice indicators and dedicated sound/mic buttons (very useful in these times). The build is sturdy. But above all is the fact that I have been encouraged by the seller to open the device and tinker with it. That is what it means to own a [liberated.computer](https://liberated.computer).
