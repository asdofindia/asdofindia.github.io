---
layout: post
title: "BSNL injects ads into internet traffic"
tags: ["political"]
---

##### What is undoubtedly the worst internet service provider in India? ####

BSNL is undoubtedly the worst internet service provider in India.

Apart from having flaky internet connectivity, randomly dropping websites and sensoring any damn website they wish to, what is the latest thing that they are doing?

Injecting ads into internet traffic.

For the last one month I have been uninstalling various apps on my phone thinking that I've installed a malware which makes random ads pop-up when I click on links inside firefox. I even uninstalled firefox last day.

But today I saw the same thing happening in firefox on desktop.

And when I sat down and saw what it was, turns out it is ad injected from `117.254.84.212`. Who owns this IP? BSNL. And who is my ISP? Of course, BSNL.

Turns out others have found out about this long long back.

* [Reddit](https://www.reddit.com/r/india/comments/8wj6ec/bsnl_and_mtnl_are_injecting_malicious_ads_on/)
* [Stack Overflow](https://stackoverflow.com/questions/51064933/unknown-scripts-are-running-and-redirecting-on-click-to-unknown-websties/51127987)

They serve [monstrous obfuscated 350KB javascript](https://gist.github.com/asdofindia/e1e8eec222a0d5c3a535063d78630eef). They track each and every website (non-http) I visit. I don't even know how many of my passwords they've already logged.

But let's be serious. Fuck you, BSNL.