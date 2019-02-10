---
layout: post
title: Setting up Home Server
date: 2019-02-09 17:56 +0530
tags:
  - tech
---

##### How I set up a home server #####

After I paid my first full month on AWS, I decided that it works out much cheaper to use a home server infrastructure.

## Networking ##

The main problem most people have in India in setting up a home server is that of static IP. It is either too expensive, or simply not available. But ACT Fibernet in Bangalore who is my ISP is very good in that regard. They give you a static IP at about ₹1500 for 6 months. That works for me.

Now, if you are also on the same ISP, here is some more info on ACT's static IP offering for home customers. They run a separate PPPoE service for static IP. So the way you configure router is you create a PPPoE connection and use username and password of ACT account as the credentials. Everything else can remain in the default state. I had good trouble for a day to get this working. But somehow magically after hours of patient work from ACT customer care, tech team, backend tech team, and me, it worked. Kudos there, ACT.

Next task is to change the router settings so that it reserves a private IP address for the machine your server is going to run on and forward the requests on port 80 (and 22, 443, whatever) to that IP address. This is pretty straightforward on most routers.

## Hardware ##

Initially my idea was to run the server on a Raspberry Pi. But the RAM and processor of a RPi is low. I could have had two or three of these running, but fortunately I had an old laptop of my girlfriend lying around. The screen was dying and battery was non-existent, keyboard and mouse worked partially, but none of these matters for a server. The processor and RAM are in pretty good condition and much more powerful than a Pi. I will need to buy a UPS as well to power the router and server (laptop) when power goes down. Fortunately, ACT infrastructure of the apartment has 4 hour battery backup even in case power goes down.

## Software ##

Now, the interesting part. I knew the OS that I was going to run was Arch. I followed the standard [Installation Guide](https://wiki.archlinux.org/index.php/Installation_guide) and got a working Arch Linux installation. For connecting to the internet from the live disc, I used my favourite trick of connecting my android phone to wifi and then using USB tethering. Running `ip link` then would show me the interface name (something like `enp0s29f7u1`) which then can be connected with `systemctl start dhcpcd@enp0s29f7u1`.

Whoever does all this should follow [security guidelines](https://wiki.archlinux.org/index.php/Security) on Arch.
