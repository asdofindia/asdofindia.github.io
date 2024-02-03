---
layout: post
title: "Caddy Statistics with GoAccess"
tags:
  - how-to
---

##### Setting up Caddy logging and GoAccess analysis #####

In caddy, add

```
    log {
        output file /var/log/caddy/domain.log
    }
```


Install [goaccess](https://goaccess.io/download#distro)


Generate report

```
goaccess domain.log -o report.html --log-format CADDY
```
