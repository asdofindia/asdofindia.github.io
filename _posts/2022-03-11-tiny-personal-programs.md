---
layout: post
title: "Some Tiny Personal Programs I've Written"
tags:
  - foss
  - code
---

##### Tiny personal programs are tiny programs that you build for yourself for various reasons. This is a list of my tiny personal programs #####

Long long time ago, when I used to use Windows, I [had](https://blog.learnlearn.in/2009/12/billy-media-players-cant-get-lighter.html) a tiny music player I loved - [Billy](https://www.sheepfriends.com/index-page=billy.html). It was part of a set of tiny apps called Sheep Friends. Tiny apps that does one thing and one thing well had a distinct lure on me. [No wonder](https://en.wikipedia.org/wiki/Unix_philosophy#Do_One_Thing_and_Do_It_Well) I became a fan of Linux family operating systems soon afterwards, huh?

I just saw Julia Evans' [post about the tiny programs she wrote](https://jvns.ca/blog/2022/03/08/tiny-programs/). Maybe I should write about my tiny programs as well.

### Mailman Admin

I am the moderator of a high-volume spam receiving mailing list that runs on mailman 2. Whenever there is a pending message (read: spam) mailman sends me an email notification with a link. I would then have to click on that, then autofill a password, login, click a button that says all pending emails have to be discarded, and then click submit. In total, around 5 clicks. I was so tired of this that I wrote a very simple Android app that can do this in two taps (one to open the app, one to discard mails).

Along the way, I learnt some [jetpack compose](https://developer.android.com/jetpack/compose) too. So it was double the fun.

[Source code](https://gitlab.com/asdofindia/mailman-admin)

### Blogger navigate extension

It's an obsession that I have that when I see a new blog I want to read all the posts on it from start to finish. Many long-running blogs like these are on blogger. And the navigation between blog posts is sometimes cumbersome. So I built a tiny firefox extension that adds a "next post" button in the URL bar called [Blogger Navigate](https://learnlearn.in/projects/blogger-navigate/).

### Blog to eBook converter

Recently, I found an even better solution to the above problem. Convert the whole blog to an ebook and read it with an ebook reader. For this [I had to write a whole tiny software in nodejs](https://github.com/asdofindia/blogspot-to-ebook/). Read what I wrote about it on twitter:

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">I have an obsession.<br>When I find a new interesting blog post or an interesting person&#39;s blog, I have to stop and read *all* the posts in that blog. From the very first, till the very last.<br><br>But it&#39;s so difficult to do that in the browser. So I did what every programmer does...</p>&mdash; Akshay S Dinesh (@asdofindia) <a href="https://twitter.com/asdofindia/status/1498551409184481280?ref_src=twsrc%5Etfw">March 1, 2022</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script> 

### Porn Unban

I have a love-hate relationship with porn. There are times when I'm obsessed and there are times when I'm a [fapstronaut](https://reddit.com/r/nofap) who considers porn sites as exploitative and [unethical](https://www.theguardian.com/culture/2014/nov/01/ethical-porn-fair-trade-sex). Anyhow, when government banned many porn sites, I had to act (remember the [Zero Internet add-on](https://blog.learnlearn.in/2015/04/everyone-has-angel-and-devil-in-them.html) that was built in response to Free Basics? Like that). Also because when links stop working in the middle of, *cough* you know what, it is kind of frustrating. So I found various mirrors of porn sites and built an extension that automatically redirects URLs to these mirrors. At its peak it had two known users. It even has a nice logo. [Link](https://learnlearn.in/projects/porn-unban/).

This came in handy some months later when I was trying to browse [r/soccer](https://reddit.com/r/soccer) and all the streamable links were blocked in India.

### Chekkans Web

Ok, this is an ASCII-unicode encoding converter which has only one known user - [Hrishikesh](https://stultus.in/). It works exactly like every other converter, except for one thing - the map it uses to convert fonts is editable right below the interface and therefore it is easy to quickly fix things. [Here is it](http://asdofindia.github.io/chekkans-web/). 

### Google Direct

There was a time when you could download a lot of books, movies, etc from Google using a [clever little search trick](https://www.quora.com/What-can-I-learn-know-right-now-in-10-minutes-that-will-be-useful-for-the-rest-of-my-life/answer/Shibu-Lijack?comment_id=7022661&comment_type=2). I built a [tiny site that automatically added those search operators](http://asdofindia.github.io/googledirect/).

### Node Simple Newsletter

This is a tiny newsletter software that takes a csv file and a pug template to send emails. I have [written about it earlier](https://asd.learnlearn.in/simple-newsletter/). It is on [npm](https://www.npmjs.com/package/node-simple-newsletter). It is what I use to send my newsletters. (Of course, I haven't sent a newsletter in the last hundred years.)

### Beat Clock

Maye I should talk about failures too. If you are a nerd, you heard about [Swatch Internet Time](https://en.wikipedia.org/wiki/Swatch_Internet_Time) when trying to bring discipline in to your life by following a different time system altogether. I wanted an android home screen widget to show swatch time. So I learnt some Android programming while building [this widget](https://gitlab.com/asdofindia/beat-clock). It is [on play store and all](https://play.google.com/store/apps/details?id=in.learnlearn.beatclock) but there is no way at all to run a clock widget with custom code on Android. Every damn widget internally uses the [TextClock](https://developer.android.com/reference/android/widget/TextClock) in-built view and that of course doesn't support beat time.

Going by the reviews on play store, a few people have tried using this even. And one can deduce based on what rating each person gives whether they review apps immediately after installing or only after testing it for a few days. Because this widget stops working after 15 minutes of installation (killed by Android).

### Hourly Chime

This gets a lot of people who sit next to me confused. My computer blurts out the time every hour. And it is a [simple systemd timer and service](https://asd.learnlearn.in/hourly-chime/). The grandmother voice is so unnatural and confusing for first time listeners.

### Addon Distributor

If you clicked on the firefox extension links above you'll notice that they are not hosted on Mozilla Addons service. That's because I broke up with them because of an editorial decision (over Porn Unban). For poetic justice, I learnt Rust (Mozilla's home-grown language) while building a tiny script that makes it easy to self-publish addons. That's [addon distributor](https://asd.learnlearn.in/addon-distributor-in-rust/). It is available on [crates.io](https://crates.io/crates/addon_distributor). 


---

What are some of your tiny programs? Write a blog post and [share with me](/about/#contact).

Here are some other tiny personal programs:

- [Anant Shrivastava](https://github.com/anantshri/script-collection/) (look at loop.sh and gc for sure)
- [Anand Chitipothu](https://github.com/anandology/hacks)