+++
date = '2025-11-17T08:22:29+05:30'
title = 'Guide to Setting Up StopForumSpam Extension on MediaWiki'
type = 'post'
tags = ['sysadmin']
+++

##### MediaWiki = Spam. But can you install StopForumSpam? #####

It has happened to all of us. We set up a wiki with the grand goal of letting everyone contribute to a fledgling knowledge base. And then 5 days later the wiki is taken over by penis enhancement advertisements.

MediaWiki documentation has a page on [combating spam](https://www.mediawiki.org/wiki/Manual:Combating_spam) and another on [combating vandalism](https://www.mediawiki.org/wiki/Manual:Combating_vandalism) to help you with a few tools you could try out.

And there's one that's especially useful. It is called "StopForumSpam".

This extension works by using a global list on stopforumspam.com contributed by various forum administrators.

But before using it, one has to set the following variable in `LocalSettings.php`:

```php
$wgSFSIPListLocation = "https://www.stopforumspam.com/downloads/listed_ip_30_ipv46_all.gz";
$wgSFSValidateIPListLocationMD5 = "https://www.stopforumspam.com/downloads/listed_ip_30_ipv46_all.gz.md5";
```

This is the last 30 days IPv4 and IPv6 list. You can use [whichever list](https://www.stopforumspam.com/downloads) is appropriate for you.

Now, to actually load this list and see if it's loaded you can run the maintenance script. But it's part of the extension (and not part of the core maintenance list). So you have to run it with the extension name as prefix. Like this:

```bash
php maintenance/run.php StopForumSpam:updateDenyList
```

The `--show` command will show you the presently loaded IPs.

```bash
php maintenance/run.php StopForumSpam:updateDenyList --show
```

By default it is set to expire and reload in 5 days. You can change this by setting `$wgSFSDenyListCacheDuration` like this:

```php
$wgSFSDenyListCacheDuration = 86400; // seconds in a day
```
