---
layout: post
title: "Automatic Wildcard Certificate from Let's Encrypt"
tags: ["devops"]
---

##### How to get around the DNS challenge automatically #####

If you wanted to get wildcard certificate for your domain from letsencrypt you are bound to use DNS challenge. But, how do you then automate this for renewal?

That's where acme-dns comes in.

### ACME-DNS ###

Follow installation steps in the [acme-dns repo](https://github.com/joohoi/acme-dns).

We are going to make it systemd service, so move executable into /usr/local/bin and all that.

Copy paste config in the readme file of [github.com/joohoi/acme-dns](https://github.com/joohoi/acme-dns) and change values. (Mostly chaning example.org to your server)

Make sure you point sqlite connection to `/var/lib/acme-dns/acme-dns.db` and [ensure](https://github.com/joohoi/acme-dns/issues/88) `chown -R acme-dns:acme-dns /var/lib/acme-dns`

### ACME-DNS certbot ###
Now we need certbot to automatically do stuff.

That's where [github.com/joohoi/acme-dns-certbot](https://github.com/joohoi/acme-dns-certbot) comes in.

Follow the instructions there, edit the hook file to amend the ACMEDNS_URL

### DNS ###
All this will work only if we set our current DNS to point to ACME.

Use the values in the acme-dns configuration to put the same values in our dns.