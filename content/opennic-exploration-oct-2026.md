+++
date = '2026-10-05T16:07:05+05:30'
title = 'OpenNIC Exploration Oct 2026'
type = 'post'
tags = ['sysadmin', 'freedom']
+++

##### Some experiments with alternate DNS system #####

Yesterday Badri [asked on CoDeMa](https://codema.in/d/ZL6qpsAj/setup-private-dns-with-open-nic-servers/6):

> What do you think of setting up OpenNIC based DNS lookups on servers hosting FSCI operated services?

It prompted me to try out opennic myself.

The thread actually links to [FSCI's guide to using OpenNIC on android](https://fsci.in/blog/setup-private-dns-with-open-nic-servers/).

For my computer though, I used the opennic-up script that I discovered from [OpenNIC Wiki](https://wiki.opennic.org/). (It is available on AUR).

With that set up, I was able to browse through some listed sites like [be.libre](http://be.libre).

## Registering

be.libre was broken many times while I was trying to register, but I was finally able to take [akshay.geek](http://akshay.geek) and point it to my nameserver. On my bind nameserver, I just added a new zone for akshay.geek and started serving the DNS. For caddy, I just did

```
http://akshay.geek {
  respond "Hi"
}
```

And although it took some time for the DNS to propagate, it actually started working after a while.

I tried registering on `.o` as well ([http://akshay.o](http://akshay.o)). The [dot.o](http://dot.o/) registry was working very well, and even had an https mirror at [https://dot-o.eo.gl/](https://dot-o.eo.gl/). But after registering akshay.o, it had been in pending state for a few hours. I got impatient and emailed the support mail, and got it activated.

## HTTPS

While [investigating certificates](https://wiki.opennic.org/opennic/tls) I realized that caddy even can act as an [ACME server itself](https://caddyserver.com/docs/caddyfile/directives/acme_server). Anyhow, for TLS to be meaningful, everyone should install a common root CA certificate and the one in the wiki (playground.acme.libre) seems to be down and therefore there's no point in trying for TLS. Although, with caddy it would have been as easy as (maybe):

```
akshay.geek {
  tls {
    issuer acme {
      dir https://playground.acme.libre/directory
    }
  }
}
```

## Discovering sites

The search engine [grep.geek](http://grep.geek) was being intermittenly offline. And I couldn't find any interesting sites on the OpenNIC TLDs. So I set out to find some on my own.

I knew that Tier 1 DNS servers could do zone transfer from OpenNIC root DNS servers. So I figured that these would be public and I could just do the zone transfer on my computer (which I could). Thus I ran the following commands to get some domains from .geek TLD:

```bash
$ dig @ns2.opennic.glue. geek AXFR > geek
```

There are many results, but many sites are also offline. So I ran the following command to make curl see if they're up and healthy (with a three second timeout).

```bash
$ for f in $(awk '{print $1}' geek | uniq); do echo "$f" && curl --fail --out-null --connect-timeout 3 $f && echo $f >> geek-valid ; done
```

Then I removed duplicates with

```bash
$ sort --unique geek -o geek
```

Now, I added `http://` etc in zed's multiline editing (although I could have figured out doing that with awk or something) and opened the valid links in firefox with:

```bash
while read line; do firefox --new-tab "$line"; done  < geek-valid
```

(Actually I used [heredoc](https://linuxize.com/post/bash-heredoc/) but anyhow).

Now I could see which sites are actually meaningful and collect them.

And I repeated this for .bbs, .o, .libre, .epic, .chan, .cyb, .indy, .neo, .null, .oss, .oz, .pardoy, .pirate namespaces as well.

And here're the list of interesting sites I've come across. (Pretty disappointingly small, I must say)

### Interesting sites

People's homepages:

* http://akshay.geek/ and http://akshay.o/
* http://p4bl0.geek/
* http://pablo.rackham.pirate/
* http://pjvm.geek/
* http://www.corrin.geek/
* http://www.s-config.geek/
* http://habedieehre.geek/
* http://getimiskon.geek/
* http://marc.o/
* http://joshott.o/
* http://rackham.pirate/
* http://www.pnkp.indy/

Blogs:
* http://lila.oss/

BBS: 

* http://nixx.o/
* http://nixxnet.bbs/

Software:
* http://slackware.oss/
* http://thunix.oss/
* http://unplug.oss/
* http://www.i-love-ruby.cyb/

Other:

* http://bible4u.libre/
* http://opennic.oss/
* http://thewebsite.cyb/
* http://www.lainfaith.cyb/ or http://haskal.cyb/
