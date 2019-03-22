---
layout: post
title: "Intro to Live Coding"
tags:
  - art
  - code
---

##### Report on a live coding workshop I attended today #####

As I'm writing this I'm attending a [workshop on live coding](https://www.instamojo.com/kavitaarora/workshop-live-coding-visuals-with-hydra/).

We started with the instructor's [blog post with live coding functions](http://khoparzi.com/hydra-functions/) on [hydra](https://hydra-editor.glitch.me).

We also looked at an [awesome list for live coding](https://github.com/toplap/awesome-livecoding). I ran [hydra locally](https://github.com/ojack/hydra) for my purpose.

We quickly went through how to run functions, and one by one these functions were introduced:
* solid
* osc
* rotate
* scrollX
* scrollY
* scale

At this point, this is what I came up with

```javascript
frequency = 10
sync = 0.2
saturation = 1
pi = Math.PI
rotate = pi/4
rotation_speed = 0.2
scroll_x = 0.2
osc(frequency, sync, saturation)
  .rotate(rotate, rotation_speed)
  .scrollX(0, scroll_x)
  .rotate(-rotate, -rotation_speed)
  .scrollY(0, -scroll_x)
  .scale(1)
  .out()
```

* noise
* pixelate
    ...and a lot of other functions

    We started using different outputs, blending audio and video input,a nd so on.

We talked about [@hydra_patterns](https://twitter.com/hydra_patterns), [estuary](http://intramuros.mcmaster.ca:8002/)
