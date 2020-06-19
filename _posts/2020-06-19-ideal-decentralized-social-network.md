---
layout: post
title: "My Idea Of an Ideal Decentralized Social Network built with blogs, RSS feeds (and some existing messaging system)"
date: 2020-06-19 20:36 +0530
tags:
  - ideas
---

##### RSS and static sites can act just as good as a centralized social network (or even better, considering how the latter are turning out to be universally bad) when combined with a messaging system for comments. #####

When I look at a social network like twitter, I see only three vastly important functions it serves:
* Allow people to make posts easily
* Allow people to follow a set group of people
* Be able to interact with someone else (through posts)

Having this centralized makes it easy for a team like twitter to build apps, notification mechanisms, etc. But these functions can exist in the decentralized web as well.

And, we don't need separate protocols like activitypub or diaspora for these.

All we need is three things.
1. An RSS reader.
2. An easy way to create a blog and post to it.
3. Some communication medium like email or matrix or telegram or whatever.

The second part is still underdeveloped (unless you are willing to use a hosted blogging platform like wordpress). But there are many RSS readers out there (including ones with excellent mobile support) and way too many communication apps (including decentralized ones like riot, conversations, etc)

Here's how the thing works.

Everyone has a blog. This could be hosted on platforms like wordpress. But this could also be static sites built with jekyll, hugo, etc and hosted on gitlab, netlify, etc. The world does not yet have a simple mobile application to quickly update a static site, but what fun would it be if all the parts of the solution existed already.

Everyone has a RSS feed reader. This could be something like tiny tiny RSS self-hosted or a hosted solution. One follows others by adding their RSS feed to their reader.

When you have a comment to make on a particular post by someone else, you write a post on your blog linking to that post. Then, to notify the original person, you send the link to your post as an email/IM/tweet/whatever.

If the other person thinks your comment is great, they can publish another post linking to your comment, including any remarks they may have. In fact, the other person could link to multiple comment posts in their follow-up blog post. And so on.

Yes, all of this isn't as simple as quote tweeting. Yes, random people can't be reached out to as easily. Yes, discoverability would remain a problem. Yes, all that.

But, this also alleviates a lot of problems of centralization. Some arbitrary algorithm will no more decide what you see. You won't be character counted and [misread](/anti-social-twitter/) and attacked. Pointless banter would be abolished. Using [blogs to chat](/blogs-to-chat/) has various other advantages.

Now imagine an application that is an email reader, a feed reader, and a blogging client in one! It's a possibility.
