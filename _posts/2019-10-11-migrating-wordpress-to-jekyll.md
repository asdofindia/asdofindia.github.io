---
layout: post
title: Migrating Wordpress to Jekyll
tags:
  - code
  - mozilla
---

##### Mozilla India blog has been on wordpress for almost 9 years. The community felt that it had to be migrated to a modern framework. As a dutiful admin, I did it. This is how. #####

## Why ##

If you are on Telegram, you can see the [actual conversation that led to this](https://t.me/MozillaIN/30525). Static site generators are awesome. They put the fun and simplicity of developing an HTML website back into the game. I have been generating [my website](https://learnlearn.in) with a relatively unpopular SSG called `docpad` and this blog you are reading with jekyll. I just looked back at the first commit on my website to see that this has been going on for just under 6 years now. So, even SSGs are becoming old. And there are newcomers on the field, like gatsby which is a react off-shoot. (My [clinic's website](https://www.pcmhrestorehealth.com) is built with gatsby.)

A static site generator has dead simple technology - put the content in simple text files, include other assets as files, put configuration in files, put everything in files, and then generate the website out of these files. This makes them able to go on code sharing repositories like github - the code, the content, the style, everything at one place. That is like a nightmare for large teams who don't talk to each other, but makes collaboration and transparency extremely easy.

The Mozilla India blog has been running on wordpress since almost 9 years. This wordpress instance has itself been moved around from server to server, corrupting a lot of content in the process. There are also a lot of issues around user management, plugin management, theme management, content creation, etc that were killing the blog. There were two posts in the last two years. Wordpress simply had to go.

## How ##

### Constraints ###

I did not have access to the wordpress database. Since it is a multisite installation with other very important sites probably running on the same database, I would never have been able to get that access.

I could not install plugins on the wordpress site on my own. I would have to raise a ticket and get a super-admin to install plugin.

### Literature Review ###

This is becoming an academic article now. Ha ha. I read these articles first:

* [The End of an Era: Migrating from WordPress to Gatsby](https://www.taniarascia.com/migrating-from-wordpress-to-gatsby/) where I got a link to [ExitWP](https://github.com/thomasf/exitwp)
* [4 Steps To Migrate From WordPress To Jekyll](https://blog.webjeda.com/wordpress-to-jekyll-migration/) where I got a link to [Jekyll Exporter](https://wordpress.org/plugins/jekyll-exporter/)

I perhaps read a few more links too, but these were the ones that seemed promising.

### Options ###

I read the readme of ExitWP and discarded it straight off the bat considering how old it is and how it was probably not going to convert text well.

Jekyll Exporter seemed promising, but I could not install new plugins on the wordpress site.

## The real how ##

Wordpress has an in-built Export (and Import) tool. I figured if the tool can do export and import, it definitely has access to the entire content.

So, first I exported the blog. But this xml stuff had to be somehow parsed and converted to the format that SSGs need it to be in. That's where I got an idea.

I set up a local wordpress installation on my computer. I had to set up Apache (because nginx rules for wordpress seemed complicated), I had to set up PHP to work with Apache (with php-fpm). I had to set up PHP to work with mysql/mariadb. I did all that in the hope of being able to import the backup to a server I completely control. And then disaster struck.

The importer was failing! It was a relatively large import. And the import script wasn't showing any output. I was totally confused.

I figured out that perhaps it was a problem with server timing out. Then while reading about it, I also figured out that maybe php-fpm was not the right thing to do. So I switched to libphp which is directly supported by Apache and also set up very big timeouts.

Now the import was working smoothly. Within a minute I had the entire blog on my computer.

At this point I discovered a new option - the official [jekyll-import wordpress](https://import.jekyllrb.com/docs/wordpress/) tool. This is the one I had seen in jekyll docs and the tool I trusted to do the best job at importing content. I wasn't wrong. It created beautiful documents with rich front-matter by directly connecting to the database (rather than parsing the export).

But there was yet another problem. The permalinks weren't really the way the original blog had it. To fix this, I decided to monkey patch jekyll-import. The code is very beautifully written and anyone who can assign variables can change it to output the YAML frontmatter the way they wanted. But I didn't know how to *run* the ruby code. Here's the answer.

* `git clone git@github.com:jekyll/jekyll-import.git && cd jekyll-import`
* `$EDITOR lib/jekyll-import/importers/wordpress.rb`
* ```
ruby -r rubygems -e 'require "./lib/jekyll-import.rb";
    JekyllImport::Importers::WordPress.run({
      "dbname"         => "name",
      "user"           => "user",
      "password"       => "pass",
      "host"           => "localhost",
      "port"           => "3306",
      "table_prefix"   => "wp_",
      "site_prefix"    => "",
      "clean_entities" => true,
      "comments"       => true,
      "categories"     => true,
      "tags"           => true,
      "more_excerpt"   => true,
      "more_anchor"    => true,
      "extension"      => "html",
      "status"         => ["publish", "draft", "private", "revision"]
    })'
```

That's it. This script runs in two seconds. I kept changing and changing the frontmatter till I was sure the output would retain all the necessary content while still keeping the permalink structure intact.

But there was still a problem. This script did not import the uploads. So I used the jekyll exporter plugin and made an export. That gave me all the images that were on the server in a folder neatly organized by the subfolders.

I created a new jekyll site and copied over the content from both the above sources.

I still had to do [`find ./ -type f -exec sed -i -e 's#http://localhost/wp-content#./wp-content#g' {} \;`](https://stackoverflow.com/a/6759339/589184) and even then manually remove the '-600x485' like strings that wordpress had added to all the images.

And then the migration was done.

The blog is now on [github.com/mozillaindia/blog](https://github.com/mozillaindia/blog) and requires lots of features to be added. If you are interested in the [Mozilla mission](https://www.mozilla.org/mission/) and want to contribute, you can join the effort too.
