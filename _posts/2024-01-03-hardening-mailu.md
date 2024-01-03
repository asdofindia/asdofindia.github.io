---
layout: post
title: "Hardening Mailu"
tags:
  - sysadmin
---

##### I ran an open relay with Mailu for a few weeks. Here is how I fixed it. #####

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Upgraded to <a href="https://t.co/SoKasnytTf">https://t.co/SoKasnytTf</a> 2.0. (Switched to roundcube on the way). Dark mode and so on. I love it. <a href="https://t.co/KCEfaWhXtE">pic.twitter.com/KCEfaWhXtE</a></p>&mdash; Akshay S Dinesh (@asdofindia) <a href="https://twitter.com/asdofindia/status/1725427304703443283?ref_src=twsrc%5Etfw">November 17, 2023</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 

I did this upgrade about a month and a half ago.

About two weeks ago I noticed strange "Message delivery failed" emails in my inbox. I was under the impression that someone is trying to hack me because there were a couple of attachments in it that looked fishy.

But then, a couple of days ago I got a flood of such error emails, many of them without suspicious attachments. That's when I took it seriously and investigated. Turns out there were some bots connecting to my server and sending out emails.

From the rspamd logs, the pattern was like this:
- IP address was the local address of my own docker compose network (IPv6 and later IPv4 as explained below)
- From address was random non-existent emails on a domain I managed
- To address were random qq.com emails
- Subject included Chinese characters
- Authenticated user was "unknown"

### Immediate Response

The domain that was in the "From" address was unused by me. So I quickly tried deleting the domain from Mailu. But that didn't help.

Then I noticed that I was an idiot with respect to Mailu's warnings about using IPv6. I didn't read any of them. And I didn't disable userland proxy or setup any mitigation measures as they asked.

So, I immediately reverted to disabling IPv6.

But then the mails started getting sent with the docker network's IPv4 address.

That's when I noticed that in the docker compose I was listening on all interfaces (0.0.0.0 is the default when not specifying port.) So I changed the port mappings from this format

```
25:25
110:110
```

to this format:

```
65.108.245.227:25:25
65.108.245.227:110:110
```

I also disabled roundcube (later switch to snappymail) just because I couldn't pin down what exactly could be causing the issue.

Anyhow, with listening on the public IP, the relay stopped.

I suspect the postfix inside the container was somehow getting confused that the remote client's IP is the same as my local network IP. I haven't been able to pinpoint why.

Anyhow, the conclusion is that I should be reading mailu docs and following it properly.

### Further hardening

With this although the outgoing messages stopped, I could still see log entries of failed login attempts. This felt like a waste of resources.

I immediately set up UFW, allowed the ports I wanted, and denied these IP addresses. But the failed logins continued.

Then I realized that UFW rules are applied in order and the first rule that matches wins. Which means, when I set up the rule to allow ports, it took precedence. [So I followed stackoverflow](https://serverfault.com/a/748525) and inserted the IP blocks at the beginning.

But the failed logins continued. That's when I realized that [UFW inserts rules after docker's rules in iptables](https://docs.docker.com/network/packet-filtering-firewalls/#docker-and-ufw) and then docker completely bypasses the UFW blocks.

By now having learnt the lesson that I should stick with the documentation on Mailu, I read through and set up very carefully what [Mailu suggested with Fail2Ban](https://mailu.io/2.0/faq.html#fail2ban).

Fail2Ban immediately banned three IPs and started doing its job.