---
layout: post
title: "Simple Self-hosted Newsletter"
tags:
  - tech
---

##### I have been trying really hard to get a simple, small, non-scalable, flat-file based mailing list going on for a long time now. This is a note of what I am building #####

I have previously [set up a mailman 3 based newsletter](../setting-up-a-newsletter/) and even sent out an edition to a few subscribers. But, soon I had to scale down my EC2 server (should write a separate blog post about the failure of my [home server](../home-server/)) and with it I had to stop the mailman also.

I have been thinking, though. There are various challenges in setting up a newsletter (read [this post by Abhas Abhinav](https://abhas.io/2018/05/self-hosted-email-newsletters/) for an overview). But most of the problems are in the mail server side of it - ensuring reputation and deliverability, for example. The list management side of it is something that the recipients (or their mail servers) should have no worry about.

I already have a self-hosted mailing server setup on EC2. Therefore, I shouldn't be worrying a lot about the problems at the mailing server side.

What are the challenges in the list management side though?

* Having a list of subscribers. Duh.
* Adding or deleting from the list.
* Tracking, analysing newsletter open, click, etc.
* HTML newsletter vs plain text newsletter vs both.
* Keeping an archive of the previous newsletters.

Now, if we have to solve all of that, we will have to use a software like mailman or mailtrain and that brings back the trouble of hosting, etc. I wanted a simpler approach. My restrictions were these:

* The list subscribers would be managed in a flat file, on my laptop.
* Adding or deleting will be done manually by me, and subscribers can email me their wishes.
* There will be no tracking.
* Only plain text newsletter.
* Archive will be preserved on this blog manually.
* To avoid getting into spam, List-Id and List-Unsubscribe headers should be set.

## Solutions ##

The first thing I looked at was whether Thunderbird can do this. Thunderbird does have list management features, but in the end it is handled through BCC recipients. This was a no-no for me.

Then I looked at whether running Haraka on the local server could be an option. But it requires a lot of custom plugin writing and felt like unnecessarily complicated for this simple requirement of relaying mail.

Then I started thinking about using the unix approach and stiching together existing solutions. There are command line utilities for sending email through an SMTP server. It is definitely possible to send email from a text file. How to get this working, though?

I looked at ArchWiki and figured out the possible option was to use s-nail's mailx with msmtp and write a bash script that would read from a file and send mails one by one. But, would this break my mail server when I get 100 subscribers?

I did some more googling and found out [postman](https://github.com/zachlatta/postman). It felt old and unmaintained, but I decided to give it a go (pun intended, postman is written in go).

Postman does everything brilliantly, but it doesn't support the List-Id and List-Unsubscribe headers. I could either patch postman or look for alternatives.

I decided to look for alternatives rather. There is a node package called [newsletter-cli](https://www.npmjs.com/package/newsletter-cli) but it seems to work only with Amazon SES.

That's when I found out [nodemailer](https://nodemailer.com/). Nodemailer is only a library, but it supports all the options I want and I would only have to write a wrapper script. Building a solution using this would also mean I could probably expand it one day if I wanted to.

It took me a full Saturday and Sunday of effort (with most of it spent struggling in fantasy land with sanctuary and fluture) but at the end of it, I came up with my first proper npm package - [node-simple-newsletter](https://www.npmjs.com/package/node-simple-newsletter).

I will write documentation later, but essentially this one takes a csv file with some email addresses, a template for the email to be sent (written in pug), a dotenv file with smtp server configuration, and sends across the mails using nodemailer! Success!
