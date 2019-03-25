---
layout: post
title: "Understanding Certbot"
tags:
  - devops
---

##### Ever wished you did not have to struggle with certbot and could just understand how it works? This guide is for you. #####

Despite an [excellent website](https://certbot.eff.org/), certbot took me some time to figure out and I think a few key insights can help others as well.

Insight 1: **Automation is the end goal**

Everything in certbot is built for automation. The age of certificate being 90 days is the best example. Certbot expects that renewals will be automated. The countless plugins are meant for exactly that. Running certbot manually should only be done once, when setting up.

Insight 2: **Certificates and configuration are organized based on certificate name**

If you run `certbot certificates` you see the list of existing certifcates. The same can be seen in `/etc/letsencrypt/renewals`. Organization of certificates is based on this certificate name.

The way certificate name is chosen is slightly confusing. If a specific name is given (using `--cert-name`) that is used. If not, if an existing certificate can be expanded, that is used. If not, the name of the first domain in the list of domains is used as certificate name.

It is important to get this right. If we are trying to create a separate certificate, we have to make sure that an older certificate is not being expanded. If we are trying to expand an exisiting certificate, we have to make sure that we are not creating a new certificate group.

Insight 3: **Automation is easy, if done correctly**

I use DNS based method for generating certificates because I take wildcard certificates. There is absolutely no need to manually add records on DNS to do this certificate generation. There are plugins for almost all major DNS providers and also a generic plugin for RFC2136 that standardizes DNS record management.

The first time I generate a certificate I have to be careful, figure out the appropriate time that the DNS records take to propagate (the default wait time of 60 seconds was too less for me and certbot was failing verification), set the correct certificate names, include the correct authentication credentials and so on. But afterwards, all it takes is a systemd timer and oneshot service to automate this. [ArchWiki](https://wiki.archlinux.org/index.php/Let%E2%80%99s_Encrypt) has excellent documentation.

That's it. Are you facing any difficulty using certbot to automate https? Let me know.
