--- layout: post
title: "The magics of scrcpy"
tags:
  - freedom
---

##### When you already have a super powerful camera and microphone in your phone, why should you struggle with video on your computer? #####

[scrcpy](https://github.com/Genymobile/scrcpy) (which I read as screen-copy) is one of those tools which you didn't know you wanted. I forgot who introduced me to it. As per Telegram history [Jishnu](https://j15h.nu/) messaged about it first. I definitely remember [Subin](https://subinsb.com/) giving a talk using it. And I am pretty sure I heard it mentioned in [FSCI chatrooms](https://fsci.in/) a couple of times. Nevertheless, I have used it often to play around with my phone from my computer.

Basically, it is a script of some sort which when run sends some payload to your connected android device via adb (android debugging bridge) and then gets the whole screen of your phone on your computer - and you can interact with the whole thing using keyboard, mouse, etc.

But today I read [Arya's blog about scrcpy](https://aryak.me/blog/06-phone-webcam-scrcpy.html) in which Arya documents how to use it as an input camera for the computer. And that was next level!

I have always struggled to get my face recorded for [my YouTube channel](https://www.youtube.com/@AkshaySDinesh). So was sound a problem. I love the audio-video quality of my phone camera. [Earlier I wrote about using an IP webcam software](../obs-android-cam/) to get the Android camera on the computer. But to get synchronization correct on this takes a bit of effort. It is definitely not neat.

With scrcpy, it is just a matter of:

```bash
scrcpy --v4l2-sink=/dev/video2 --video-source=camera --camera-id=1 --orientation=270 --camera-size=1920x1080
```

Here, `--v4l2-sink` redirects the video to a virtual video device set up by [v4l2loopback](https://github.com/umlaeute/v4l2loopback) which is yet another interesting discovery today. This is a kernel module that allows a software to act as a video device. That means, whichever programs capture your video can capture this software generated video as well.

If you're on Arch, here're the things you have to install:

```bash
sudo pacman -Syu scrcpy v4l2loopback-dkms v4l2loopback-utils dkms linux-headers
```

You will probably need a restart after that.

And then to load it, you need to modprobe it.

```bash
sudo modprobe v4l2loopback
```

Now you should be able to see new video devices in

```bash
v4l2-ctl --list-devices
```

If you want to capture both the screen and the camera, you can do that by running scrcpy twice (with the corresponding parameters). (Try getting both front and back cameras). But if you need both as virtual camera, you'll need two virtual devices which can be done like this:

```bash
sudo modprobe -r v4l2loopback      # remove the already loaded module
sudo modprobe v4l2loopback devices=2
```

There are [more options like renaming the devices](https://github.com/umlaeute/v4l2loopback/wiki/Multiple-Devices).

[Arya's blog post](https://aryak.me/blog/06-phone-webcam-scrcpy.html) includes details on what needs to be done in OBS. One thing I didn't understand was what the "Start Virtual Camera" thing did. Well [as per OBS website](https://obsproject.com/kb/virtual-camera-guide): "The Virtual Camera is a feature of OBS Studio that allows you to share your OBS Studio scene with any applications that can make use of a webcam, such as Zoom, Skype, Discord, etc. This feature is particularly useful for applications that cannot capture the screen directly."

Hoping to do more videos now because this is fun!
