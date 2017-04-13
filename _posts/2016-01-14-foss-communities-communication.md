---
layout: post
title: Communication Tools in FOSS Communities
tags: [social, foss, mozilla]
---

Chat apps are probably used as the hello world project for learning server-client programming. I think so because there are so many messaging apps out there and rarely do they inter-operate. The shift to mobile phones and rich text messaging just speeds up the process of fragmented communication channels.

What does communication look like in a typical FOSS community these days? Fragmented, incomplete, confusing, and altogether chaotic.

## The culprits ##

These are the most commonly used communication tools (in the order that I have seen them being used):

* IRC - Internet Relay Chat
* Mailing Lists - most often hosted with [GNU Mailman](https://www.gnu.org/software/mailman/) and archived in a Google Group or a simple HTML website.
* Facebook pages, groups
* Twitter accounts, hashtags
* GitHub issues
* Bugzilla
* XMPP chat rooms
* Blogs - with announcements, invitation for comments, proposals, etc.
* WhatsApp - yes, some people use this thing

And some strong newcomers

* Telegram
* Slack
* Discourse
* Gitter

## The problem ##

There are several characters for communication tools.

**Synchronicity** is the state of being quick and synchronous. Synchronous communication media are suitable for quick chats, discussions, question-answers. The sender and recipient are both online and on the same page talking to each other at the same time.

* IRC, Telegram, Slack, etc are very synchronous.
* Discourse, Facebook groups, etc are synchronous to a certain extent.
* And mailing list, blogs, etc are very asynchronous.

**Openness** is when communications are out in the open, easy to access, and in an open standard.

* Discourse, Bugzilla, etc. are built on the Web, which is as open as it can get.
* IRC, XMPP chat rooms, Mailing list, etc are also open in the sense that they are built on open standards and doesn't need sacrificing privacy to listen to.
* Slack, Telegram, etc are proprietary platforms which aren't very good in this category. WhatsApp might be the [best example of a closed platform](http://blog.learnlearn.in/2015/08/response-to-whatsapp-cease-and-desist-threat.html).

**History, threading, and link-ability** are features that make communication effortless. A message which is easily retrievable months later, a discussion that's archived forever, etc make communication meaningful in the long term. This allows new contributors to read and learn history. Similarly, threading allows ease and eliminates confusion in discussions. Link-ability is the property of a message having a permanent link which can be used to access the same from anywhere.

* Discourse shines in this category. And GitHub issues is very close.
* Mailing lists, Bugzilla, slack, Telegram etc have these properties but unsatisfactorily so.
* IRC, XMPP, etc simply fails here.

**Ease of use** might be very important in a community which expects a lot of newcomers.

* Telegram, Slack, etc being mobile focused are very easy to use.
* Discourse, Facebook groups, etc, although web focused, have easy interfaces.
* Bugzilla, mailing lists, diaspora, XMPP etc have very bad interface or usability.

**Number of active users** (or the size of the cloud) is, although a catch-22, important for communication to reach as many people as possible.

* Facebook, WhatsApp, Twitter etc lead here unfortunately due to Metcalfe's law.
* Telegram, Slack etc does okay okay in this category because they are easy to install and once installed, they keep you in the loop with notifications and everything. Discourse and mailing lists are slightly worse in that they are difficult to get started with unless you already are a heavy email user.
* XMPP, IRC, etc are new technology (although very old technology) for a lot of newcomers and this is a big barrier.

Now you know the problem. There is no one tool that is good in all categories.

## Working towards a solution ##

Being prescriptive about a tool and pushing people to it will only help in alienating a lot of people. And there is no one tool you can sincerely recommend to people either. Even hardcore FOSS activists [cannot decide between their software](http://blog.learnlearn.in/2015/08/secure-communication-on-mobile-phones.html).

And that's why I propose that we choose all tools available. Have presence on multiple platforms. Open communication channels everywhere.

Easily said. Who will maintain multiple tools? How should one cross-post on multiple channels? What happens to discussions?

I have no perfect answer. But I do have some recommendations that work.

* Use tools like [ifttt](http://ifttt.com/) to post to multiple social accounts. (If you are aware of a FOSS tool that does this, [let me know](/about/#contact)). You can even automate this yourself with some scripts (which I'm yet to upload).
* Bridge communication channels together. For example, [grambot](/grambot/) is a Telegram-IRC bot that I made to bridge IRC channels and Telegram chats. This could easily be extended to XMPP also. People can join the conversation on whichever channel they prefer. Similar work is being done by [matrix.org](http://matrix.org/).
* [Use blogs to communicate serious ideas](/blogs-to-chat/). Make it a habit to create content on an open platform and link to it from other platforms.

There could still be interactions that happen inside platforms which aren't relayed to other platforms. Well, in that matter, there are also real life conversations between community members that happens in private spaces. If these conversations are important, they deserve more attention and should be summarized and broadcasted to all channels. But if nobody cares enough to sit down and write a blog post or discourse thread about it, maybe that conversation isn't worth it.
