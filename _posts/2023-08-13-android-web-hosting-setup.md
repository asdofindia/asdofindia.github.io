---
layout: post
title: "Android Web Hosting Setup"
tags:
- code
---

##### You can theoretically (if all stars align) host a website on your android phone #####

### Getting connectivity

Firstly you need the ability to bring anyone on the internet to your android device. That means, your ISP should give you a public IP (even dynamic one will do). If you are behind a Carrier-grade NAT, you won't have a public IP. But I have fortunately been always on ISPs that provide public IP. (Also, moving to Bengaluru helps)

One challenge these days is some mobile ISPs provide *only* IPv6 IPs and because a lot of the internet is stuck in IPv4 many visitors can't come to your IP.

Now, if you're doing this via a router -> android setup using a regular ISP (and not your mobile data connection), you'll also have to do port forwarding of port 80 (and 443 if you need https) to your android device. (If you cannot root your device, you will have to choose a higher port like 8080 to be forwarded)

I have not seen ISPs block these ports.

### Setting up android

If you can root, you can use port 80 and 443 thus avoiding your visitors needing a custom port. But if you don't have root, you can still append the higher port to your address and enjoy. So, root if you can. I won't cover that here.

You need termux. There're lots of things to do with termux.

* [Setup wakelock](https://wiki.termux.com/wiki/Termux-wake-lock)
* Setup [termux-services](https://wiki.termux.com/wiki/Termux-services) (for running services)
* [Setup boot](https://wiki.termux.com/wiki/Termux:Boot)
* Remove battery optimizations
* Setup [remote access](https://wiki.termux.com/wiki/Remote_Access) so you can do things from your computer.


### Caddy

* You can do `pkg install caddy`

To easily start with termux-services, setup a file at $SVDIR/caddy/run

```bash
$ cat $SVDIR/caddy/run
#!/data/data/com.termux/files/usr/bin/sh
exec sudo caddy run --config /data/data/com.termux/files/home/Caddyfile 2>&1
```

(You can read about how to create the $SVDIR/caddy folder in [termux-services](https://wiki.termux.com/wiki/Termux-services))

Caddyfile is the regular Caddyfile you can put in your home directory as above. Example:

```bash
$ cat Caddyfile 
:80 fsci-demo.bucephalus.free.gen.in {
        root * /data/data/com.termux/files/home/demo-website
        file_server
}
```

**Don't start caddy till you configure IP if you're using https. It will try to get certificate and fail repeatedly**

### IP updation script

You can use this script if you have a [RFC 2136 DNS server which supports dynamic updates with nsupdate, etc](https://asd.learnlearn.in/ipv6-dynamic-dns/). Otherwise, modify this to interact with your DNS API or whatever.

Note that in this script, bucephalus.free.gen.in is the address I'm using to reach this device.

```bash
$ cat ip-update/change-ip 
#!/data/data/com.termux/files/usr/bin/bash
COMMANDBUFFER=/data/data/com.termux/files/home/ip-update/command-buffer
PRESENTMAP=/data/data/com.termux/files/home/ip-update/present-ip-mapping

IPADDR=`curl --silent icanhazip.com`

if [ -z "$IPADDR" ]; then
  echo "Not connected to internet I suppose. Exiting."
  exit
fi

echo "Our public IP is $IPADDR"

if [ ! -f "$PRESENTMAP" ]; then
  echo "We do not know what the DNS thinks our IP is. This is probably the first run of this script."
else
  if grep -q "$IPADDR" "$PRESENTMAP"; then
    echo "Our IP and what DNS thinks our IP is are same. Nothing to do. Exiting."
    exit
  fi
fi

echo "IP has changed. Updating DNS"

echo "zone free.gen.in" > $COMMANDBUFFER
echo "update delete bucephalus.free.gen.in" >> $COMMANDBUFFER
echo "update add bucephalus.free.gen.in 1800 IN A $IPADDR" >> $COMMANDBUFFER
echo "send" >> $COMMANDBUFFER

echo "Doing nsupdate with:"
cat "$COMMANDBUFFER"


if nsupdate -k keyfile -v $COMMANDBUFFER ; then
        echo "$IPADDR" > $PRESENTMAP
        echo "Done setting the IP in DNS to $IPADDR"
else
        echo "nsupdate failed. Better luck next time!"
fi
```


I could not find a way to run this only when IP changes, other than by running it frequently with a cron job.

You can get [cron with cronie package](https://wiki.termux.com/wiki/Termux-services). Enable it with sv-enable crond. Your crontab might look like this:

```bash
$ crontab -l
*/20 * * * * /data/data/com.termux/files/home/ip-update/change-ip
```

### Conclusion

That should work if all things work.

You can also try:

* php, php-fpm
* sqlite
* nodejs
