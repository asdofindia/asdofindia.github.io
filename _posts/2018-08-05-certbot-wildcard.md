---
layout: post
title: "Certbot command for wildcard certificate"
tags: ["devops"]
---
##### Forgot certbot parameters again? #####

```
sudo certbot certonly --email me@example.com --agree-tos --eff-email --manual-public-ip-logging-ok --preferred-challenges dns --manual -d example.com -d \*.example.com --server https://acme-v02.api.letsencrypt.org/directory
```