+++
date = '2025-08-28T15:36:13+05:30'
title = 'Mediawiki Crawler Spam (DDoS!)'
type = 'post'
tags = ['sysadmin']
+++

##### These days everyone wants to crawl the internet. And if you're a sysadmin of a mediawiki instance, that means hundreds of thousands of requests to the links on your site #####

The problem is especially bothersome for mediawiki because each page in wikis built with mediawiki open hundreds of links. There's Special:RecentChanges which link to several pages, and each page's history has links to several diffs, and so on and so on.

Essentially, bad crawlers will go in infinite-loop on your site.

Previously, such momentary failures could be handled on small sites by increasing php-fpm workers. But now, it is becoming too much!

And this is a [problem even for Wikimedia Foundation](https://www.youtube.com/watch?v=8pcdNweh8oA).

Some helpful suggestions are documented on [this meza issue](https://github.com/freephile/meza/issues/156) and on [this wiki page](https://www.mediawiki.org/wiki/Handling_web_crawlers)

These options include installing extensions like [CrawlerProtection](https://www.mediawiki.org/wiki/Extension:CrawlerProtection) (that prevents access to heavy pages like RecentChanges) and blocking very old user agents.

So if your wiki is being inundated with requests by bots, making it a DDoS kind of situation, you know where to find help.

## Home-grown solutions

For [SMC's wiki](https://wiki.smc.org.in), since there's no content in Chinese, and since there's probably not many people from China who should be using it, I added a block based on whether Accept-Language header including zh. In caddy that's like:

```
wiki.smc.org.in {
    root * /var/www/wiki.smc.org.in
    php_fastcgi unix//var/run/php/php8.2-fpm-wiki-smc.sock
    file_server
    log {
        output file /var/log/caddy/wiki.smc.log
    }
    handle {
        @blocked {
            header Accept-Language *zh*
        }
        respond @blocked 403
    }
}

```