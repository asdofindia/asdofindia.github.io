---
layout: post
title: "Self hosting DNS server"
tags: ["devops"]
---
##### What if we set up our own DNS service? #####
I had netlify putting me in a difficult position wherein it was not allowing me to delete the A record for my apex domain.

So, I decided to host my own DNS server.

## Bind ##

BIND was my choice because the archwiki had a detailed article on configuring it.

Configuring it was straightforward. Follow the [arch doc](https://wiki.archlinux.org/index.php/BIND), but make sure you are configuring for an external facing DNS service as given in the [linked post](http://www.howtoforge.com/two_in_one_dns_bind9_views). Also wikipedia entry on [SOA record](https://en.wikipedia.org/wiki/SOA_record) is useful to understand the first line of zone file. The [ZONE file](https://en.wikipedia.org/wiki/Zone_file) entry is itself useful.

Reload and rejoice.