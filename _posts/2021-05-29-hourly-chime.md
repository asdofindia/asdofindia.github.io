---
layout: post
title: "Hourly Chime With Timers and TTS"
tags:
  - freedom
---

##### In an online session today a participant had a chime every hour that said the time "It is 4", "It is 5", etc. I wanted it on my computer. #####

First thing I did is search for an existing application that did this. I found some talking alarm clock apps. But some of them were outdated and some of the websites had gone down too. So I decided to do it by hacking a cron job together with a TTS software.

ArchLinux has [several Text-to-Speech apps](https://wiki.archlinux.org/title/TTS). I chose [espeak-ng](https://github.com/espeak-ng/espeak-ng) for no reason.

Systemd timers [can do](https://wiki.archlinux.org/title/Systemd/Timers) what cron used to do.

So, I created the timer first and then the service.

```
$ cat ~/.config/systemd/user/hourly-chime.timer
[Unit]
Description=Run chime hourly

[Timer]
OnCalendar=hourly

[Install]
WantedBy=timers.target
```

The timer unit is straightforward. If `Persistent=true` was added, then if we switch on the computer in the morning, the timer would run once even if it is the middle of the hour.


```
$ cat ~/.config/systemd/user/hourly-chime.service
[Unit]
Description=Chime the hour

[Service]
Type=oneshot
ExecStart=sh -c 'espeak-ng -v grandma "It is `date +%%l`"'
# Alternatively
# ExecStart=sh -c "espeak-ng -v grandma \"It is $$(date +%%l)\""
```

The service unit is complicated by escaping. `echo $(date +%l)` will print the current hour inside shell. But, in ExecStart the `$` needs to be escaped and so should the `%` because systemd will do its own expansions on it. Even then, for the command substitution to work we should call this inside a `sh -c ""`

To check if the command works, we can do `systemctl --user start hourly-chime.service` and when we are satisfied we can `systemctl --user enable --now hourly-chime.timer`
