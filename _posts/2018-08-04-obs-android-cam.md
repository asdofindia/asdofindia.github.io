---
layout: post
title: Open Broadcaster Software (OBS) with Android IP Webcam
tags: ["video", "vlog"]
---

##### How to use your android phone as video source for OBS #####

I was recording a video for my youtube channel today and the background noice was incredibly loud. I did not want to set up noise cancellation software on pulseaudio just for this. I knew if I could record sound from my phone it would be much cleaner. This is what I did.

### IP Web Cam

[IP Webcam](https://play.google.com/store/apps/details?id=com.pas.webcam) is an incredible software for Android. It has umpteen features and amazingly well thought they are.

You set it up, start recording video and audio.

If you connect your phone to the computer with USB cable, the lag issues will be resolved. (Use USB tethering)

### Video capture

So I initially tried setting up window caputre of VLC, but that did not work because the media source would freeze when I switch to another window (I'm using i3 window manager and I'm sure this must have something to do with this problem)

Then I tried adding media source in OBS itself and it fantastically worked.

Steps:
* In OBS, Sources, add source -> `Media Source`
* Create new 
* Uncheck `local file`
* Enter the IP Webcam address `http://IPADDRESS:8080/video`
* Create another media source (this one is for audio)
* Uncheck `local file`
* Enter the IP Webcam audio addres `http://IPADDRESS:8080/audio.opus`
  * There are two more audio formats, `audio.wav`, `audio.aac`. Experiment and figure out which one works the best for you
* If there is slight delay in audio, it is best to delay the video as well. 
  * Media source (video) -> `filters` -> `Video Delay` -> 50ms (worked for me)