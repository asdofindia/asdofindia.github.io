---
layout: post
title: "Choosing Between Home Server and Cloud Server"
date: 2020-06-23 23:27 +0530
tags:
  - tech
---

##### Running a server on one's and accessing it from a different computer on a different network is one of the happiest things in learning to be a web developer. Here is how to go about it #####

A "server" is a fancy word for a computer that is always on and always connected to the internet with an IP address that's universally resolvable to itself.

A server can run a webserver software within it which can listen to and respond to web requests.

Imagine typing in "asd.learnlearn.in" on your browser. Somewhere in the world I am running a computer with a software that responds with data required to render my website in your browser. When you type the address "asd.learnlearn.in" it gets resolved into a series of numbers like `18.188.31.177` called an IP address. This, for computers, is like a complete postal address to your home is for a home delivery person. Your computer on behalf of your browser will then make a connection to my computer which will be handled by the webserver software I am running at the other end. The webserver software will respond with the content that should get displayed for the home page of my website.

Read also: [3 important things about the internet that millions do not know](https://learnlearn.in/3-things-internet/)

Now, let us go look at the definition of a server again. A server needs to be:
* **always on**: because you could be visiting my website at any time of the day and for your computer to connect to my computer, my computer has to be on all the time.
* **always connected to internet**: again, to be able to connect over the internet, both sides have to have internet connection.
* **with an IP address that is universally resolvable to itself**: not all computers have a permanent address accessible from anywhere on earth. This is a technolgical issue we created for ourselves because long back when the internet was being created nobody imagined that one day there would be so many computers in the world.

### Setting up one's own server ###

When you want to run a server of your own, you have two options.

If you have a computer of your own and good internet connection you could think about setting up a home server. The alternative is, you could request someone in the business of running servers - like amazon, digitalocean, scaleway, etc to run a server for you. There are pros and cons of both.

#### Home server

Setting up a home server is an incredible learning opportunity. The very first time you see a "hello world" that's coming from your own computer over the internet is an unforgettable moment.

It will require you to figure out multiple things.

1. Your internet service provider may not have assigned a universally accessible IP address for your connection. You may have to talk to them and get a public (and optionally static) IP address. Sometimes you would have to pay extra for this.
2. You will most definitely have to configure your router to forward the requests to your computer (unless you have directly connected the internet connection to your computer through ethernet or something).
3. You will have to run a server software on your computer and configure it correctly too.

Read: [Setting up Home Server](https://asd.learnlearn.in/home-server/)

#### Cloud server

This may cost you some money. Although, most cloud server providers do give a free preview for one month (and some upto an year even).

Essentially, someone else will run a server in their "house" (or data center). You will be able to interact with "your" server through special programs like `ssh`. And you will have to configure it with the webserver software to respond to visitors.

There are several advantages to a cloud server:
* You don't have to worry about electricity, internet, etc.
* Static, public IP is a given in most services.
* Because of this reliability you can run services like a mail server that requires 24x7 connectivity.

Of course there are disadvantages:
* These servers are costly. You will have to spend at least $5 a month. (If you get cheaper providers, [let me know](/about/#contact))
* The cheapest tier servers usually have very low specs like 1GB RAM and 1 CPU core which means your server becomes slow when you try to run two-three services at once.

### Conclusion

Either way, setting up a server gives you complete understanding of the web stack.

Afterwards, you may want to [buy a domain](https://learnlearn.in/keep-in-touch/) and build yourself a home on one corner of the internet.

Feel free to [reach out to me](/about/#contact) if you are stuck somewhere on this path.
