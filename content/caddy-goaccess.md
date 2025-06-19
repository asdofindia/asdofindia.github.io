+++
type = 'post'
title = 'Caddy Statistics with GoAccess'
tags = ['how-to']
date = '2024-02-03'
+++

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
