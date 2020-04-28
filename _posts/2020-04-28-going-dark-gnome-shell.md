---
layout: post
title: "Going Dark Theme in Gnome Shell, Firefox, and all sites that support it"
---

##### Did you know there is a CSS media query called `prefers-color-scheme` that websites can use to switch to dark mode automatically? How about going fully dark in Gnome Shell and Firefox? #####

I was reading [Smashing Magazine's article on implementing dark mode using styled components in react](https://www.smashingmagazine.com/2020/04/dark-mode-react-apps-styled-components/) and I saw that StackOverflow [has recently made it a feature](https://stackoverflow.blog/2020/03/30/introducing-dark-mode-for-stack-overflow/). There is a [nice blog post by them on how they actually developed it](https://stackoverflow.blog/2020/03/31/building-dark-mode-on-stack-overflow/) starting from design mocks.

I immediately logged into my stackoverflow settings and found that there were three options.

1. Light
2. System
3. Dark

I could get done with dark, but what does "System" do? How do we make the system tell we prefer dark mode?

In [Android 10 and above](https://developer.android.com/guide/topics/ui/look-and-feel/darktheme) there is a quicktile toggle to switch to dark mode. But, is this possible in Linux/Gnome Shell too?

I did a quick search and found a neat [article on how to switch to dark theme in Gnome Shell](https://www.addictivetips.com/ubuntu-linux-tips/switch-to-dark-mode-in-gnome-shell/). It essentially boils down to switching to "Adwaita-dark" theme using gnome-tweaks.

And there I had it. Stackoverflow was dark as per system theme.

In Firefox themes, there are again 3 options - "Default", "Light", and "Dark". If you choose "Default" it automatically chooses the system's dark/light.

As Aaron Shekey says on the SO blog, though, it is pretty difficult on the eyes to have everything in dark, especially web content.