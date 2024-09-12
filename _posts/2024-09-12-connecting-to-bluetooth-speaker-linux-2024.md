---
layout: post
title: "Connecting to Bluetooth Speaker in Linux in 2024"
tags:
  - linux
---

##### One might think that by the second half of 2024, bluetooth speakers would work on linux seamlessly. #####

There are two things I'm absolutely terrified of connecting to my linux computer. A printer, and a bluetooth device.

Today I dared myself and decided to connect my "Resound" football shaped speaker. I started the `bluetooth.service` with systemd. I could see the device listed in the KDE Plasma bluetooth applet (maybe I had already "paired" this one previously). When I clicked "Connect" it actually said "Your device is connected". It was working!

And then I decided to be stupid and changed the speaker to "FM mode" to listen to some radio. Once I was convinced that that was a bad idea, I came back to bluetooth mode. And tried connecting from the plasma applet again. Unfortunately, I had messed it up.

I tried the usual, switched off the device, restarted bluetooth service. I didn't want to turn off my computer.

So, I thought, maybe I can actually debug this, and went into `sudo journalctl -f -u bluetooth`. When it failed to connect, it failed with this error: "Unable to get Hands-Free Voice gateway SDP record: Host is down".

Searching that led me to [this issue on bluez from 2022](https://github.com/bluez/bluez/issues/356) in which Sharelter commented:

> I repaired by bluetooth yesterday by edit /etc/bluetooth/main.conf to change ControllerMode = bredrand and replaced pulse-bluetooth with pipewire-pulse to get aptX support.

I didn't know what ControllerMode was, so I searched for that and found [one](https://stackoverflow.com/a/38081576), [two](https://unix.stackexchange.com/a/737142) StackOverflow answers which talks about something like Bluetooth 4.0, low energy, and so on. I surmised that since this is a pretty cheap speaker, it must not be having whatever new thing is, and followed Sharelter's solution.

I edited /etc/bluetooth/main.conf and set ControllerMode to bredrandSharelter's solution.

I edited /etc/bluetooth/main.conf and set ControllerMode to bredrand. And then I did `sudo systemctl restart bluetooth` and it magically connected to the speaker immediately and started playing from it!
