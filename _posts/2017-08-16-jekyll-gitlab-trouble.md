---
layout: post
title: Jekyll Post Not Reflecting On Gitlab Pages [solved]
tags: ["tech"]
---
##### The short story of a cute little problem between Jekyll, Gitlab Pages, and me #####

It was late past midnight when I finished writing [yesterday's post on independence day](/independent-resolutions/). I wanted to share the article on my [social channels](/follow/) fast and get it done with.

So I commit and push. The slack integration immediately tells me that the commit has been pushed and I get a notification for successful completion of pipeline in about a minute.

**The problem**: I go to the [live site](/) and I can't see the new post!

I check, double check
* On my local machine when I run `jekyll serve` the post shows up first on the list.
* The commit has indeed gone to the right repository and is reflected on Gitlab.
* Gitlab, though was having problems earlier that day with missing repositories wasn't mentioning anything about pages having any problem. Also, the push to [my other website](https://learnlearn.in) that I did half an hour previously worked fine.

Then it suddenly struck me.

### Solution ###
This is a time zone problem!

To be true to time, I had put the post date as `2017-08-16` in the file name. It was past midnight of 15th night and I was on August 16th IST. I also do not include post time in front matter because I rarely post more than one post per day.

[Jekyll, by default, doesn't output posts with a future date](https://github.com/jekyll/jekyll/pull/3892).

Now, when I generate the site on my computer, since I'm on IST, the post compiles and shows up in the site.

But when I commit and Gitlab CI builds the site, probably somewhere in Europe, the clock is still in August 15 and therefore the post I wrote in August 16 is in the future.

So I changed the date of my post to August 15 and voila, it was instantaneously published.

##### Footnotes #####
My sincere apologies for getting angry at Gitlab for a second and thinking of even going back to Github pages before realizing what the acutal problem was.