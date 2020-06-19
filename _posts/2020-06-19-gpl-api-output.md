---
layout: post
title: "Does GPL apply to the output of an API that is released under the GPL license?"
date: 2020-06-19 17:49 +0530
---

##### Imagine an API software is written in GPL. Would the data that comes out of the API be under GPL? #####

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Just wanted to point <a href="https://t.co/dW09rx7RV2">https://t.co/dW09rx7RV2</a> dashboard (called as a model) by <a href="https://twitter.com/Product_Nation?ref_src=twsrc%5Etfw">@Product_Nation</a> with the support of <a href="https://twitter.com/thoughtworks?ref_src=twsrc%5Etfw">@thoughtworks</a> is a GPLv3 license violation, since the source data sets from <a href="https://t.co/Hb4qqHZKb4">https://t.co/Hb4qqHZKb4</a> are under GPLv3. as mentioned here <a href="https://t.co/ACBgWOlGyL">https://t.co/ACBgWOlGyL</a></p>&mdash; 𝗔𝗻𝗶𝘃𝗮𝗿 𝗔𝗿𝗮𝘃𝗶𝗻𝗱 (@anivar) <a href="https://twitter.com/anivar/status/1273915175234494464?ref_src=twsrc%5Etfw">June 19, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

The fantastic [covid19india.org](https://www.covid19india.org/) website is built over a crowd-source COVID dataset. The data, I believe, is collected through google sheet, etc and made available through an [API](https://api.covid19india.org/). The API is actually a set of javascript scripts that convert data into various static files that in turn gets served over github. In essence, it is a brilliant, static API which keeps getting updated regularly.

Now, there is a LICENSE file in the repo which makes the software have GPL v3.0 license.

Question now is, does this LICENSE and its conditions extend to the data?

It is really for the people behind covid19india.org to say whether they intended to make the GPL license be applicable to the data too.

But, the way it is documented, the crowd-sourced data is not included in the repository. That means, the data is an input to a software that is GPL licensed.

> The output from running a
> covered work is covered by this License only if the output, given its
> content, constitutes a covered work.

This is what GPLv3 says about output of a program.

>  A "covered work" means either the unmodified Program or a work based
> on the Program.

This is what covered work is.

>  "The Program" refers to any copyrightable work licensed under this
> License.

This is what "the program" means.

Therefore, as per GPL, output of a source code would be covered under GPL only if the ouptut is a copyrightable work.

**Hey, I'm not a lawyer**

I think in most legislations a curated set of data is copyrightable. That would mean, the output of this API is copyrightable. Right?

Well, since I'm not a lawyer, I searched online. There is [this stackoverflow answer](https://softwareengineering.stackexchange.com/a/311087/111465) which says "That's not what that clause is about." and links to [Is there some way that I can GPL the output people get from use of my program? For example, if my program is used to develop hardware designs, can I require that these designs must be free? (#GPLOutput)](https://www.gnu.org/licenses/gpl-faq.en.html#GPLOutput) which is answered as:

> In general this is legally impossible; copyright law does not give you any say in the use of the output people make from their data using your program. If the user uses your program to enter or convert her own data, the copyright on the output belongs to her, not you. More generally, when a program translates its input into some other form, the copyright status of the output inherits that of the input it was generated from.

Essentially, if we take this answer as truth, the license of the data coming out of the API is the same as the license of the data going into the software.

And I think it is upto the covid19india team to specify what that license is.

**Update after about an hour**:

But then, there is another layer of complexity here. The API in question is a GPL software. If someone is using a GPL library to build a larger software and redistributing that software, they would have to distribute it in a GPL-compatible license too.

And there does not seem to be any exception for software that is interacting with a library over the internet. That would mean that a software that is using a GPL API would also have to be released in GPL license if being distributed.

But, the indiacovidmodel is running on a server. It is not being redistributed in the sense of GPL. It seems to be that only the output of the running software is distributed.

Here's a [stackoverflow answer about distributing output](https://opensource.stackexchange.com/a/2343) like this. GPL would not mind a web-service running whatever proprietary code and using GPL within it.

AGPL was created specifically for this purpose.

Now, imagine if the code here was actually released in AGPL. Would the indiacovidmodel then have to be released under AGPL too?

The crux of the question is whether the use of the API response would be considered as using a linked library.

If it wouldn't be considered as using a library, then you could essentially wrap any GPL library you want in a GPL microservice and use it in your proprietary service.

Therefore, I think, it is in the spirit of GPL license that libraries accessed through APIs is also considered as using the library directly. Therefore, if covid19india were using AGPL, indiacovidmodel would also have to use AGPL.

Similarly, if the covid19india data is released under GPL, any data or model derived from the same would have to be GPL too.
