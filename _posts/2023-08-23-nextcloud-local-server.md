---
layout: post
title: "Nextcloud instance on local network"
tags:
- freedom
---

##### How to get nextcloud kinda working on the local network (on Windows) #####

Things would have been rather easy with Linux I guess. But I had to install Nextcloud on a Windows laptop recently and here's how I went ahead.

https://github.com/nextcloud/all-in-one/ also called as AIO is what is recommended for this. There is a section on how to run it on windows. It is basically a docker based setup. 

So first thing we need is to install [Docker Desktop](https://www.docker.com/products/docker-desktop/).

It will take a restart to finish installation.

I had two errors after Docker Desktop was installed:
* Virtualiation technology was not enabled.
* WSL was not up-to-date.

Had to reboot into bios and enable "Virtualization" in BIOS settings for solving the first one. The second one was just a matter of installing wsl with `wsl --update`

With docker running, I had to run the following command:

```batch
docker run ^
--init ^
--sig-proxy=false ^
--name nextcloud-aio-mastercontainer ^
--restart always ^
--publish 8080:8080 ^
--env APACHE_PORT=11000 ^
--env APACHE_IP_BINDING=0.0.0.0 ^
--volume nextcloud_aio_mastercontainer:/mnt/docker-aio-config ^
--volume //var/run/docker.sock:/var/run/docker.sock:ro ^
nextcloud/all-in-one:latest
```

Unfortunately the NEXTCLOUD_DATADIR directive wasn't working correctly at all! So although I had `--env NEXTCLOUD_DATADIR="/run/desktop/mount/host/c/Users/Sochara/Documents/NextCloud" ^` in the above, I removed it.

The `APACHE_PORT` directive is required to be able to run the thing behind a reverse proxy.

Running it behind a reverse proxy is necessary because AIO doesn't work without an https certificate.

So I set up caddy as the reverse proxy like this:

```
https://nc.sochara.org {
        reverse_proxy localhost:11000
        tls {
                dns cloudflare secretcloudflaretoken
        }
}
```

This works because I was managing DNS via cloudflare and a token can be obtained via the cloudflare interface.

To run this we need a custom download of caddy which includes `dns.providers.cloudflare` from [caddyserver.com/download](https://caddyserver.com/download).

We can make it a system service on windows using `sc.exe` [as documented](https://caddyserver.com/docs/running#windows-service).

Similarly docker desktop can be enabled from task manager -> startup apps.

With all this setup, I had to go to https://192.168.0.19:8080 (where the computer I was installing this had 192.168.0.19 as the local IP), proceed with the SSL warning and let AIO finish installation.

Then, I had to change the hosts file at `C:\Windows\System32\Drivers\etc\hosts` and add this line:

```
192.168.0.19 nc.sochara.org
```

This would redirect all nc.sochara.org links to 192.168.0.19 (obviously this works only in the same network).


With this setup I was able to see nextcloud on a different computer.

But due to various issues related to DATADIR not being set correctly by nextcloud and network failures, I abandoned this idea.