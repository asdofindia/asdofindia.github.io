+++
date = '2026-11-01T09:49:28+05:30'
title = 'Pragmatism and Free Software'
type = 'post'
tags = ['freedom']
+++

##### This is an excrept from the [FSCI](https://fsci.in) xmpp chat room discussing the philosophy behind ideology, pragmatism, and how free software deals with AI #####


**2026-10-30 16:39:38 spaciouskarter78_:**
Debian went all in on AI thanks to one person. Somebody integrated LLM reviews to the NEW package queue. It’s opt out and the LLM sends you a review of your package when you upload it to the NEW queue. 

**2026-10-30 16:51:20 Pirate Pulawen:**
it is the dfsg team, each team makes their own decisions as GR did not forbid AI usage.

**2026-10-30 16:56:24 Pirate Pulawen:**
the models used are open weigt (deepseek, qwen, glm) and hosted independently by Scaleway. So at least big tech dependency is removed, though other llm problems remain, like energy usage, possible bias (could be mitigated somewhat by using different models with different training data). Since it is not used for code generation, copyleft concern is not applicable.

**2026-10-30 16:57:46 Pirate Pulawen:**
it is not one person, the policy was decided through a GR and this person was within what the policy allowed.

**2026-10-30 16:59:18 Pirate Pulawen:**
yes, some people are not happy, but llm policy was a collective decision and every debian member was part of the decision making.

**2026-10-30 17:02:04 Pirate Pulawen:**
I think faster review/response helps new contributors, so I think this is good. People can opt out if they don't want to see the llm review mail.

**2026-10-30 17:04:52 Pirate Pulawen:**
https://dfsg-new-queue.debian.org/dashboard you can see the llm review comments here

**2026-10-30 17:05:46 spaciouskarter78_:**
> yes, some people are not happy, but llm policy was a collective decision and every debian member was part of the decision making.

The policy focused on “responsible use of AI” I don’t see how this is exactly responsible when this is opt-out by default and not opt-in. This would only incur additional credit charges for the project and would be pretty much avoided if this was opt-in


**2026-10-30 17:07:53 spaciouskarter78_:**
This being opt-out by default leaves an impression that LLMs are being forced onto people who don’t want them 


**2026-10-30 17:08:14 Pirate Pulawen:**
llm check cannot be opt out as dfsg team wants it, so maintener can only opt out of the email notification.


**2026-10-30 17:08:36 spaciouskarter78_:**
I know many people who’ve been distancing themselves from Debian because of the pro-LLM discussions and this was the final straw for most of them 


**2026-10-30 17:09:45 spaciouskarter78_:**
Just a few minutes ago somebody posted in the Debian Med mailing list that they will stop contributing to packages because of the LLM stuff in the DFSG queue 


**2026-10-30 17:10:04 Pirate Pulawen:**
also llm cost is sponsored by Scaleway, unused credits just expires, can't carry forward.


**2026-10-30 17:10:51 Pirate Pulawen:**
that is over reaction, other developers can't stop dfsg team from using llm.


**2026-10-30 17:11:16 Pirate Pulawen:**
not wanting to see llm review I can understand


**2026-10-30 17:11:47 Pirate Pulawen:**
but insisting other teams to not use llm is beyong the llm policy.


**2026-10-30 17:12:08 spaciouskarter78_:**
> I think faster review/response helps new contributors, so I think this is good. People can opt out if they don't want to see the llm review mail.

I’m not exactly sure how good this new review system is though. I haven’t tried it myself so won’t comment on the efficiency but there should’ve been some discussion about adding this in the first place. 

**2026-10-30 17:12:54 Pirate Pulawen:**
many people already commented they found the review as useful.

**2026-10-30 17:13:10 spaciouskarter78_:**
I’d like to see it myself before I decide whether I’ll enable/disable it 

**2026-10-30 17:13:27 Pirate Pulawen:**
you can go through the reviews now

**2026-10-30 17:13:35 Pirate Pulawen:**
https://dfsg-new-queue.debian.org/dashboard see

**2026-10-30 17:13:39 spaciouskarter78_:**
Oh are they public?

**2026-10-30 17:20:28 Pirate Pulawen:**
https://dfsg-new-queue.debian.org/reviews/kate/4:26.08.2-2/096b16c6a480ef710c069a1bc3298d7b2b354ccdb541a7cca2d192ecbaf3dbff

**2026-10-30 17:20:51 Pirate Pulawen:**
this is interesting, no ml training data makes it non free!

**2026-10-30 17:21:48 Pirate Pulawen:**
so in an effort to stop llms, people are making software itself non-free!

**2026-10-30 17:22:52 GNU/Tushar:**
This debate came up in guix as well

**2026-10-30 17:23:00 GNU/Tushar:**
With this exact package

**2026-10-30 17:25:06 GNU/Tushar:**
https://codeberg.org/guix/guix/issues/5928

**2026-10-30 17:26:10 GNU/Tushar:**
https://codeberg.org/guix/guix/issues/5928#issuecomment-10257270

**2026-10-30 17:26:27 GNU/Tushar:**
They concluded it is still *free software*

**2026-10-30 17:29:18 badrihippo:**
Basically it's clarifying the attribution clause. I wouldn't call that "an effort to stop llms"

**2026-10-30 17:30:04 badrihippo:**
Interesting case study though

**2026-10-30 17:30:59 GNU/Tushar:**
If we call every restriction "making it nonfree" then even GNU GPL is nonfree

**2026-10-30 17:31:12 GNU/Tushar:**
(Which BSD folks do call it haha)

**2026-10-30 17:32:19 badrihippo:**
I don't disagree, but in this case no new restrictions have been added, they've just added a few examples of existing restrictions

**2026-10-30 17:33:46 badrihippo:**
I don't think anyone would argue that "adding clarificatory examples" makes a licence nonfree 😉

**2026-10-30 17:34:10 DPandya:**
> (Which BSD folks do call it haha)

Haha. Permissive license doesn't put restrictions like copyleft but the concern is that company like Apple can create proprietary system using bsd codes! 

**2026-10-30 17:37:34 Pirate Pulawen:**
no, they removed the embedded copy of singleapplication so kate is not affected

**2026-10-30 17:39:18 GNU/Tushar:**
> So while this can no longer be considered the Expat license, it still is an Expat-like license, for which I do not see any issues w.r.t. to the GNU FSDG. I think the issue can thus be resolved on our side by marking the single-application package license as

**2026-10-30 17:39:50 Pirate Pulawen:**
how so? we have a commonly accepted understanding of what restrictions are ok, validated by fsf, osi and debian. In this case, this restriction makes adding their notice to even files edited by kate.

**2026-10-30 17:40:05 GNU/Tushar:**
> Kate 25.12 is currently in the kde-team branch, but is not available in master. Unfortunately, that version still has the bundled SingleApplication, with the nonfree license, so we would need permission from the copyright holder to use the new terms.

**2026-10-30 17:40:33 GNU/Tushar:**
I think they are talking about the particular wording in the bundled version

**2026-10-30 17:41:53 GNU/Tushar:**
Even files edited by kate?

**2026-10-30 17:42:14 Pirate Pulawen:**
there were further comments blow it see https://codeberg.org/guix/guix/issues/5928#issuecomment-13947788 @GentooCommits Thank you for opening this issue. In the guix/guix#8207 PR I unbundled SingleApplication from kate and made it use the single-application package instead. The commit closes this issue since the license issue with kate gets resolved but the issue with the license of single-application being expat still remains unsolved. I am not a member of @guix/qt but the suggestion by @apteryx looks good to me and I hope that the commit regarding this lands soon.

**2026-10-30 17:42:53 Pirate Pulawen:**
https://codeberg.org/guix/guix/issues/5928#issuecomment-11173949

**2026-10-30 17:42:57 GNU/Tushar:**
Pirate Pulawen: does the package change the license back to expat?

**2026-10-30 17:43:19 Pirate Pulawen:**
It's not just new license terms, Kate would need to be updated to mark saved documents as per the Debian Legal discussion:

> For example, if this license were applied to LibreOffice, it would require that any documents produced by LibreOffice be distributed with an attribution saying it was produced using LibreOffice and a copy of the LibreOffice license.


**2026-10-30 17:44:11 GNU/Tushar:**
I thought this about attribution of the code.

**2026-10-30 17:44:18 Pirate Pulawen:**
"Permission is not granted to distribute or redistribute this software, the
derivative works of this software, or any of its associated files that was
generated in any approach (including building machine learning models), for any
purpose, without attributing the source material by including its license."

**2026-10-30 17:44:22 GNU/Tushar:**
I am confused how this relates

**2026-10-30 17:45:06 Pirate Pulawen:**
"any of its associated files that was generated in any approach"

**2026-10-30 17:45:37 GNU/Tushar:**
But it says derivative of the source files right?

**2026-10-30 17:45:59 Pirate Pulawen:**
basically trying to write a new license is always problematic.

**2026-10-30 17:46:44 Pirate Pulawen:**
as legal interpretations vary and people take a more cautious approach.

**2026-10-30 17:47:28 Pirate Pulawen:**
so it is always better to use existing licenses that are validated by fsf, osi etc than trying to invent your own licenses.

**2026-10-30 17:48:01 GNU/Tushar:**
Agree but I think wanting attribution would still not make it nonfree

**2026-10-30 17:48:20 Pirate Pulawen:**
read it again "or any of associated files"

**2026-10-30 17:49:11 GNU/Tushar:**
Loose wording

**2026-10-30 17:49:35 Pirate Pulawen:**
basically it is about confidence for users, if a user has to read every single license before using every software, that does not scale.

**2026-10-30 21:52:12 contrapunctus:**
Some projects are reiterating the attribution/share-alike clauses - so if you use the program for ML training, you have to credit the authors, and (in case of share alike licenses) your weights (if released) have to be under the same license.

**2026-10-31 07:50:58 irfus:**
> Some projects are reiterating the attribution/share-alike clauses - so if you use the program for ML training, you have to credit the authors, and (in case of share alike licenses) your weights (if released) have to be under the same license.

This is good, but it would be even better if the fsf gets their act together and realises that GPL enforcement can already ask for this. 
Or is that what you meant by  "reiterating"? Do you have links to anybody trying this in courts?

**2026-10-31 08:32:29 Akshay S Dinesh:**
Modifying the license is purely a political articulation.
As for actually trying to prevent ML training, it has no effect. After all ML training has been done on fully propriety code too. :D
So basically, this political "strategy" makes the author feel good that they've taken an anti-ML policy, but in effect only affects projects like Debian

**2026-10-31 08:45:45 Akshay S Dinesh:**
The TV series "Halt and Catch Fire" includes a legal challenge between IBM and a fictional company Cardiff. Cardiff reverse engineers IBM PC.  Then IBM sues them. Then Cardiff has to do a clean room implementation of the BIOS to somehow get out of the lawsuit. (I assume what they copied first was protected as fair use, but the BIOS was considered as creative expression and copyrightable). 

**2026-10-31 08:49:09 contrapunctus:**
Akshay S Dinesh: by that logic, even GPL code can be used in proprietary codebases, and the only solution is to loginwall all code forges.

The real test is to fight these parasites in court, as irfus mentions.

**2026-10-31 08:50:18 Akshay S Dinesh:**
Yes, copyright is a legal mechanism and only winning court cases or the threat of winning court cases will make it useful

**2026-10-31 08:59:20 Akshay S Dinesh:**
I think more than FSF, the book publishers and all have a fair chance in courts. 
GPL after all is easy to comply with for LLM training. You're not conveying modified source, you don't need to display license.
Training on proprietary work is the court case that needs to be won first. 

**2026-10-31 09:01:08 Akshay S Dinesh:**
It'll be interesting to see if an LLM can be prompted to produce significant parts of a GPL codebase. Then it can be shown to have violated GPL right there."Exhibit A".

**2026-10-31 09:02:47 Akshay S Dinesh:**
https://www.scobserver.in/journal/public-interest-copyright-and-fair-dealing-ani-v-openai/

**2026-10-31 09:03:46 Akshay S Dinesh:**
I suppose the courts are always in favor of the giants

**2026-10-31 09:13:33 irfus:**
> It'll be interesting to see if an LLM can be prompted to produce significant parts of a GPL codebase. Then it can be shown to have violated GPL right there."Exhibit A".

There's research already demonstrating this. Unfortunately that research is motivated/funded by commercial logics of how to avoid those violations from the standpoint of proprietary code sellers. Meanwhile fsf and the larger foss community are too busy  worrying about the inverse possibility of their gpl'ed code somehow getting infected with proprietary code, instead of single-mindedly pursuing the matter of GPL violations by llm training in court. Or, even worse, opposing llm usage driven by a pro-copyright stance. 

**2026-10-31 09:24:10 irfus:**
https://arxiv.org/html/2408.02487
Example of such research. 

> Using LiCoEval, we evaluate 14 popular LLMs, finding that even top-performing LLMs produce a non-negligible proportion (0.88% to 2.01%) of code strikingly similar to existing open-source implementations. Notably, most LLMs fail to provide accurate license information, particularly for code under copyleft licenses. These findings underscore the urgent need to enhance LLM compliance capabilities in code generation tasks. 

**2026-10-31 09:27:31 irfus:**
> I think more than FSF, the book publishers and all have a fair chance in courts.

Publishers winning these battles would be a terrible outcome, from an anti-copyright standpoint. 

**2026-10-31 09:33:05 spaciouskarter78_:**
https://share.durare.org/file_share/01a19020-1255-7904-bb36-6ac0b1318277/IMG_2594.jpg

**2026-10-31 09:35:16 spaciouskarter78_:**
> https://arxiv.org/html/2408.02487
> Example of such research. 
>> Using LiCoEval, we evaluate 14 popular LLMs, finding that even top-performing LLMs produce a non-negligible proportion (0.88% to 2.01%) of code strikingly similar to existing open-source implementations. Notably, most LLMs fail to provide accurate license information, particularly for code under copyleft licenses. These findings underscore the urgent need to enhance LLM compliance capabilities in code generation tasks. 

https://dl.acm.org/doi/10.1109/ICSE55347.2025.00052 this was published over a year ago though. Might be different now. 

**2026-10-31 09:44:07 irfus:**
>> https://arxiv.org/html/2408.02487
>> Example of such research.
> 
> https://dl.acm.org/doi/10.1109/ICSE55347.2025.00052 this was published over a year ago though. Might be different now.

Yup. The difference would be that tech corps' and llm purveyors' legal departments have had this time to start figuring out how to cover their asses, while the free software folk continue to infight over moral purity circlejerks. 

Nevertheless, llms have been used for code generation for more time than that thanks to big tech's collective AI psychosis, and it'd be really hard to go back in time and catch all the possible GPL violations that could/would have already occurred. 

**2026-10-31 09:45:59 irfus:**
The trojan horse has been in the inner citadel for a while now. It'd be really unfortunate if we simply sit back or squabble amongst ourselves while they try to figure out how to wheel it back out. 

**2026-10-31 09:46:54 Akshay S Dinesh:**
> Publishers winning these battles would be a terrible outcome, from an anti-copyright standpoint.

I agree. I don't want copyright to win. I actually enjoy that copyright is going to become irrelevant. But that's apparently a difficult position for people to take. 

**2026-10-31 11:25:44 badrihippo:**
Agreed, it would be better if the FSF gets their act together and attempts to enforce the terms we already have in the licence

**2026-10-31 11:26:30 badrihippo:**
"The legal situation is still unclear" that excuse makes no sense. If it's not clear, now's the time to attempt to enforce it so that it becomes clear either way

**2026-10-31 11:29:51 badrihippo:**
Assuming LLMs are in fact violating GPS: we already have LLM based tools that include "references" such as backlinks in their answers. It should be possible to similarly propagate copyright notices/info to code generated (or reiterated as the case may be) by LLMs

**2026-10-31 11:31:14 badrihippo:**
Many products already have a long list of licences for each open source dependency that nobody reads (my Kobo ereader for example); the resulting copyright notice would just be an extension of that along with an easy way to avoid code under licences you don't want to be bound by in your project

**2026-10-31 11:31:29 badrihippo:**
s/GPS/GPL/

**2026-10-31 11:33:40 badrihippo:**
Imagine being able to tell the LLM: "this codebase is under  AGPL, so you can include GPL and AGPL code in what you generate and automatically add the respective projects to the credits" or "I'm developing a proprietary app, avoid code taken from *GPL projects but MIT and stuff is fine"

**2026-10-31 11:36:43 badrihippo:**
(Whoops sorry for all the typos)

**2026-10-31 12:34:07 Akshay S Dinesh:**
> we already have LLM based tools that include "references" such as backlinks in their answers. It should be possible to similarly propagate copyright notices/info to code generated (or reiterated as the case may be) by LLMs

I am reasonably sure that the backlinks can only be done when doing search/retrieval-augmented generation. The plain model-inference token generation kind of generation doesn't have that kind of one-to-one mapping of where the "generated" code is "copied" from. 

**2026-10-31 12:34:59 Akshay S Dinesh:**
No matter how much anti-AI activists say that LLMs are just copying code, there's actual some kind of "new" code coming here. 

**2026-10-31 13:03:53 smlckz:**
Like many others things, the matter of originality is a spectrum. Between blatant byte to byte equivalent copy and completely independent reimplementation of an idea, lies the grey area of 'inspiration' and designation as 'derived work'. At which point in this spectrum, moving towards the direction of originality, does something stop being a derived work and be considered an original work of authorship, is difficult to determine in general and need to be considered on a case-by-case basis. For example, if a sufficiently precisely specified algorithm (which should not be able to be copyrighted, yet see software patents), how does a reimplementation avoid being classified as derived work.. I remember reading when the GNU utilities were being developed, its developers had to avoid looking at the (copyrighted) source code of the original implementations, and focus on a different set of tradeoffs to optimize towards in the code they wrote, to inadvertently writing code that would've turned out as 'derived work'. Now, should it affect the models in question, given the amount of resources they have in hand, they should be easily, relatively speaking, get themselves tuned out of the problem..

**2026-10-31 13:07:37 Akshay S Dinesh:**
Remembering https://fairscan.org/blog/did-ente-locker-copy-my-code-without-attribution/  which was shared here last week in context of the question of originality. 

**2026-10-31 13:12:50 smlckz:**
Also: https://beyondloom.com/blog/onwigglypaint.html

**2026-10-31 13:19:00 Akshay S Dinesh:**
very relevant.

**2026-10-31 13:21:12 Akshay S Dinesh:**
I also want to point out that all of these also unravel a fundamental bug (or feature) of free software philosophy - that software "ownership" is bad and that all software need to be collectively owned.

**2026-10-31 13:22:00 Akshay S Dinesh:**
It is relevant in the context of proprietary big-techs code (like Microsoft). But it's not universally right.

**2026-10-31 13:23:44 Akshay S Dinesh:**
(or rather, it shouldn't be the sole criteria for making decisions on what's right)

**2026-10-31 13:25:54 Akshay S Dinesh:**
https://www.gnu.org/philosophy/rms-pavia-doctoral-address.html - read this alongside the wigglypaint blog and we can see how extremism needs to be applied only to extreme situations.

**2026-10-31 13:53:58 badrihippo:**
Akshay S Dinesh, I didn't understand what you meant to point out by reading that doctoral address along with the wigglypaint blog?

**2026-10-31 13:54:34 badrihippo:**
On a different but related note the wigglypaint thing sounds like something that could've happened even without LLMs being involved..

**2026-10-31 13:57:22 Akshay S Dinesh:**
> Akshay S Dinesh, I didn't understand what you meant to point out by reading that doctoral address along with the wigglypaint blog?

The wigglypaint story basically is a small, individual developer's lament on why there needs to be protection/incentives for innovation. 

The RMS address is why innovation always comes only second to freedom

**2026-10-31 13:57:39 badrihippo:**
That aside WigglyPaint itself sounds really cool: it's interesting to see all the design decisions that went into making something that on the surface seems so simple

**2026-10-31 13:58:40 badrihippo:**
Hmm

**2026-10-31 14:01:16 badrihippo:**
I wonder if this stems from the difference between trying to go directly to an ideal situation and trying to see what we can do in the interim, given the current situation, to incrementally make it better

**2026-10-31 14:01:37 badrihippo:**
(Both of which have their own advantages as well as problems)

**2026-10-31 14:05:26 fantastic_monocle:**
LLMs can't cite sources from it's internal weight.

Citation is part of the system prompt.

**2026-10-31 14:05:30 badrihippo:**
I'm tempted to make a comment on how this relates to copyrights, but maybe I'll refrain since I think we're all agreed that we should stop harping over copyrights

**2026-10-31 14:06:23 badrihippo:**
(To the extent that, in more heated debates, people tend to accuse each other of being stuck talking about copyrights, usually while themselves ending up also talking about copyrights in order to make their point)

**2026-10-31 14:06:47 badrihippo:**
"This" as in the above ^ not fantastic_monocle's comment btw

**2026-10-31 14:07:15 badrihippo:**
If anyone wants to know what my comment was, DM me 😜

**2026-10-31 14:07:42 Akshay S Dinesh:**
I don't think we agreed that we should stop harping copyright.  (I think we should) 

**2026-10-31 14:07:56 badrihippo:**
Okay

**2026-10-31 14:08:03 Akshay S Dinesh:**
So you should make the comment here

**2026-10-31 14:08:04 badrihippo:**
Then here's my comment:

**2026-10-31 14:08:06 badrihippo:**
Looking at it through the "copyright" lens: not having copyright is great if we were also not under a capitalistic sytem that allows the creation of powerful entities capable of leeching off your work, but since we are under that system copyrights are one thing that helps small individual creators hold some ground (something which is also constantly being eroded by aforementioned powerful entities, but still)

**2026-10-31 14:10:25 Akshay S Dinesh:**
I would say that's arguable. I could rhetorically say copyrights wee built by the capitalistic system to protect their interests, and has been only serving that role. Small creators don't get any benefit, they can't go to court and win, etc.

(I am not saying I'm right here, I'm saying this needs to be evidence based argument) 

**2026-10-31 14:13:25 badrihippo:**
> this needs to be evidence based argument

I'd agree *if* this were an argument but I think it's still a discussion, not an argument, since at least from my end it's very exploratory as opposed to having some conclusion I'm trying to push for

**2026-10-31 14:16:20 badrihippo:**
> I would say that's arguable. I could rhetorically say copyrights wee built by the capitalistic system to protect their interests, and has been only serving that role. Small creators don't get any benefit, they can't go to court and win, etc.

Let me modify the statement then:

**2026-10-31 14:18:12 Akshay S Dinesh:**
> I'd agree *if* this were an argument but I think it's still a discussion, not an argument, since at least from my end it's very exploratory as opposed to having some conclusion I'm trying to push for

Ha ha. What do you call a statement in a exploratory  discussion if not an argument ?

**2026-10-31 14:18:55 Akshay S Dinesh:**
Okay, statement it can be called

**2026-10-31 14:19:39 Akshay S Dinesh:**
Statement also sounds like a stated position. 

**2026-10-31 14:20:28 Akshay S Dinesh:**
Perhaps what you can do is preface the statement with "let us hypothesize that..." or something similar

**2026-10-31 14:20:35 badrihippo:**
I think I was confusing argument as in "a debate between two or more people arguing for opposing viewpoints" as opposed to "a statement used to support other statements that come later"

**2026-10-31 14:20:44 badrihippo:**
We can continue calling it "argument" if you want :)

**2026-10-31 14:20:46 smlckz:**
This reminds me of https://en.wiktionary.org/wiki/Auseinandersetzung

**2026-10-31 14:21:24 badrihippo:**
How about: Not having copyright is great if we're not under a capitalistic system (etc. etc.) but since we *are* under such a system we cannot *assume* that "no copyrights" is a workable solution today. (And we certainly can't assume that getting rid of copyrights is all it takes to get into the ideal state of not being under capitalism)

**2026-10-31 14:21:24 RD:**
Wow, someone throws a German word :)

**2026-10-31 14:21:29 Akshay S Dinesh:**
> We can continue calling it "argument" if you want :)

As long as people don't think we're arguing in FSCI. 

**2026-10-31 14:22:40 Akshay S Dinesh:**
I agree. I will probably restate it as "we do not know how to get to a better state, and we do not know what to do with copyright"

**2026-10-31 14:22:46 smlckz:**
A good addition in such a meta-discussion..

**2026-10-31 14:23:37 badrihippo:**
I recently saw a post by someone (Elena Rossini) on the Fediverse about planning to learn German because there's so much German content on the Fediverse that she wants to be able to understand

**2026-10-31 14:24:32 smlckz:**
Realpolitik and pragmatism much?

**2026-10-31 14:24:43 smlckz:**
/me sighs

**2026-10-31 14:24:53 RD:**
Why do you know this word smlckz?

**2026-10-31 14:25:01 Akshay S Dinesh:**
now that's a german word I really can use more

**2026-10-31 14:25:35 badrihippo:**
Are you talking about planning to learn German or not knowing how to get to a better state? 😜

**2026-10-31 14:25:35 Akshay S Dinesh:**
plugging: https://blog.learnlearn.in/giving-up-ideological-purism/

**2026-10-31 14:26:40 badrihippo:**
And specifically: just because our ideal state includes "X condition" does not make "changing the condition to X today" the best approach or even guarantee that it'll help us get to the ideal state

**2026-10-31 14:27:50 badrihippo:**
I think it's good to have an ideal state in mind, but we need to at the same time also be aware of the *current* state and not try to blindly copy-paste things from the ideal state onto the current one

**2026-10-31 14:27:54 Akshay S Dinesh:**
"not changing the condition to X today" may not be the best approach or guarantee either :D

**2026-10-31 14:28:28 badrihippo:**
Yes, it's okay to copy-paste things with open eyes, just not blindly

**2026-10-31 14:29:45 Akshay S Dinesh:**
For example: I seriously don't know whether a strong anti-LLM/anti-AI politics is better or a pragmatic position is better. (I do choose the pragmatist position for me, for reasons I've written in the blog, but is it right, I don't know.)

**2026-10-31 14:30:13 Akshay S Dinesh:**
I seriously don't know whether keeping copyright alive is better or copyright getting destroyed is better.

**2026-10-31 14:30:20 badrihippo:**
> Pragmatism is the way of figuring out the good and bad of capitalism, the good and bad of socialism, and the good and bad of all the ways to organize economic activity and to figure out a way to work it out in your life towards your goals of a better world. Pragmatism is the way of figuring out how to use proprietary software, free software, and all kinds of software for making things happen.

This (from the post your shared) is essentially my "argument" :D

**2026-10-31 14:30:58 Akshay S Dinesh:**
> I don’t have an answer to how I can change the system from within.

Also from the blog

**2026-10-31 14:31:35 badrihippo:**
I think the word "pragmatic" might have been misused so much that people have started equating it to "morally compromised"?

**2026-10-31 14:31:43 badrihippo:**
(Due to constant use by morally compromised people)

**2026-10-31 14:31:56 Akshay S Dinesh:**
When contrapunctus takes a strong position against telegram, etc and asks OSM groups to not use it, I sometimes think she's right, and sometimes think she's wrong. I know for sure that I don't know what's right.

**2026-10-31 14:32:11 badrihippo:**
Because your description is what I was trying to get at, but the word "pragmatism" didn't occur to me as the correct term to use for it

**2026-10-31 14:32:52 badrihippo:**
> And pragmatism doesn’t have to be lazy and directionless.

Does this mean pragmatism *can* be lazy and directionless too? :P

**2026-10-31 14:32:53 Akshay S Dinesh:**
Strong agree. A lot of words have been ruined by misinterpreting usage. "Intersectionality", "anarchism", "feminism", "socialism"

**2026-10-31 14:33:32 Akshay S Dinesh:**
of course!!! pragmatism is at high risk of being in support of status quo, and unless a constant vigil is kept, it can be incredibly corrupting and oppressive.

**2026-10-31 14:35:19 badrihippo:**
Akshay S Dinesh, so it's about whether one is pragmatic in a shortsighted or self-serving way versus being pragmatic in working towards the ideal/goal you want to achieve

**2026-10-31 14:36:03 Akshay S Dinesh:**
I think so. 

**> Realpolitik (/reɪˈɑːlpɒlɪˌtiːk/ ray-AHL-po-lih-teek German:**
[ʁeˈaːlpoliˌtiːk] ⓘ) is the approach of conducting diplomatic or political policies based primarily on considerations of given circumstances and factors, rather than strictly following ideological, moral, or ethical premises.[1][2] In this respect, it shares aspects of its philosophical approach with those of realism and pragmatism.

**2026-10-31 14:36:07 badrihippo:**
In other words, it's not a different thing from philosophies like socialism, software freedom, fascism, etc. but an approach that can be applied to any of those

**2026-10-31 14:36:54 Akshay S Dinesh:**
> realpolitik, politics based on practical objectives rather than on ideals.

**2026-10-31 14:37:41 badrihippo:**
I think that's a bit different (maybe a subset of pragmatism)? What I have in mind is politics based on practical objectives *aimed at* eventually reaching certain ideals

**2026-10-31 14:38:12 Akshay S Dinesh:**
Then that's your practical objective :D

**2026-10-31 14:39:13 badrihippo:**
> realpolitik, politics based on practical objectives ~rather than on ideals~ whether in pursuit of an ideal or otherwise

**2026-10-31 14:41:05 Akshay S Dinesh:**
I think pragmatism/realpolitik is just another way of saying "consider more than one issue/ideology". "Do I use AI for the next function I'm going to write?" - The idealist will answer purely based on 1 ideology (anti-AI ideology). The pragmatist/realist/realpolitik will use a mix of ideologies to arrive at it - "capitalism, nature conservation, free software, environment, alternatives, benefit, what's at stake, etc. etc." 

**2026-10-31 14:41:11 smlckz:**
Perhaps one might even need to go in the opposite direction of what the ideals dictate/point to, temporarily, to later eventually move towards that ideal; to use a Chinese idiom: losing the battle to win the war. (Don't ask me how is this relevant or applicable, it's for you to figure out)

**2026-10-31 14:41:49 Akshay S Dinesh:**
It's not that pragmatism doesn't include ideology, it includes a mix of ideologies and can reconfigure what's necessary at what time all the time

**2026-10-31 14:43:13 Akshay S Dinesh:**
aha, that's another way of seeing pragmatism - as in practical strategy towards a single ideology... (I'm processing....)

**2026-10-31 14:43:42 badrihippo:**
Which takes a lot of decision-making and cognitive load, moreso when you're trying to transfer the same philosophy to someone else, with the result that many people either default to a blanket rule or give up saying the blanket rule is not sustainable

**2026-10-31 14:43:56 badrihippo:**
~Unless they have an LLM to "guide" them through the thought process of course~

**2026-10-31 14:44:47 Akshay S Dinesh:**
smlckz, can you give an example of going in opposite direction of the ideal's dictat?

**2026-10-31 14:45:05 badrihippo:**
Nice idiom. I think this is what I was getting at. Sometimes, we might need to keep $thing now to help us reach a world where $thing doesn't exist later (in my argument, copyright, but could be anything).

**2026-10-31 14:45:35 badrihippo:**
(No don't try to use that as your example Akshay S Dinesh)

**2026-10-31 14:46:00 Akshay S Dinesh:**
yeah, the copyright thing I would call not as pragmatism, but as incrementalism

**2026-10-31 14:46:09 Akshay S Dinesh:**
incrementalism is the opposite of radicalism

**2026-10-31 14:46:19 Akshay S Dinesh:**
pragmatism is the opposite of idealism

**2026-10-31 14:46:38 badrihippo:**
What's idealism?

**2026-10-31 14:46:50 badrihippo:**
I'm guessing it's not == "having ideals"

**2026-10-31 14:47:08 Akshay S Dinesh:**
sorry, i meant, ideological purism

**2026-10-31 14:48:04 Pirate Pulawen:**
I too agree. Copyright going away would be a good outcome, copyleft came because, copyright was already present.

**2026-10-31 14:48:10 smlckz:**
What can't adapt and evolve is ''dead'', what we have to avoid is getting stuck in any particular ideology. Ideologies too have to keep up with the developments to remain relevant. Principles can remain constant.

**2026-10-31 14:48:14 Akshay S Dinesh:**
I think a pragmatist can sometimes choose to be radical - if that's more practical than advocating a slow change.

**2026-10-31 14:48:59 Akshay S Dinesh:**
I for sure think that with caste, gender one has to be radical because it's very important to shake people's indoctrination

**2026-10-31 14:49:37 Akshay S Dinesh:**
With copyright, I don't know how radicalism can operate as it will also require figuring out a lot of economic questions/answers.

**2026-10-31 14:49:44 smlckz:**
Again, avoid falling into a pit. If one great unified theory of everything could not be achieved, how would 'one' ideology be sufficient?

**2026-10-31 14:50:19 Akshay S Dinesh:**
good. then you're also saying pragmatism is about multiple ideologies. then we're on the same page

**2026-10-31 14:54:09 Akshay S Dinesh:**
I agree. I think this is one of the reasons why it'll be very difficult for pragmatist people to come together as a movement. (Oh, that also explains why I keep feeling like an outsider in every movement space)

**2026-10-31 14:54:12 smlckz:**
Like isn't this a very common thing? Countries with different set of ideals cooperating, parties with different set of ideals forming coalition governments and such. Not exactly extreme 'opposite', to the point of irreconcilability, but still.

**2026-10-31 14:55:22 Akshay S Dinesh:**
not a straightforward example that one. Because when parties come together, we don't know whether they actually care about their party ideology, or they just care about getting power

**2026-10-31 14:55:52 Akshay S Dinesh:**
It'd be interesting to see a personal example... Like someone who's really committed to an ideology going against it. YES! I got one

**2026-10-31 14:56:08 Akshay S Dinesh:**
When RMS makes someone else book a flight for him using proprietary software - that's pragmatism :D

**2026-10-31 14:57:11 Akshay S Dinesh:**
One thing that's a definite feature of pragmatism is that it can only be worked out in a real world decision/problem's context. There's no way to hypothetically discuss pragmatism.

**2026-10-31 15:01:24 DPandya:**
> It is relevant in the context of proprietary big-techs code (like Microsoft). But it's not universally right.

Ethics is important however unfortunately some people find it subjective

**2026-10-31 15:08:34 smlckz:**
I am talking about avoiding the entrenchment of any one or multiple ideologies. Ideologies, as organization of ideas, are useful tools/mechanisms/systems to reach goals and realize ideals, but has to be constantly nurtured over time, to avoid it going stale, turning rigid, to turn into 'religion', so to speak. The mind need to have primacy over its implements, not let it happen the other way around.

**2026-10-31 15:38:46 smlckz:**
This I suppose has to do with the 'user experience' of the manner in which one is supposed to deal with the complexities of reality. That's how I suppose religion has been popular, it reduces the reality, helps with the cognitive load. Any ideology, movement that simplifies in the same manner to reach a level of popularity has the same problem; the original intentions have been vastly diluted in the process. How are we supposed to deal with the reality of people seeking simple solutions in face of complex, multi-faceted problems is a hard problem indeed. In a meta-manner, I too have simplified and reduced the situation in this exposition, please fill in the relevant details that I can not put in a few words that is applicable to it. How to deal with information overload, the DDoS attacks on the psyche of people, for them to have the leisure to think through and organize with understanding of the inherent complexity..

**2026-10-31 15:57:11 RD:**
I think religious activities (like do certain tasks in a ritualistic manner) do reduce cognitive load, but with fundamental questions unanswered, I am not sure how it reduces cognitive load. For example, there being so many religions and a person only follows the one they are born in. Naturally, that should make people question religion. I am not sure how people deal with the contradictions. Another example is when their prayers are not fulfilled. I don't agree it is about cognitive load only but probably conformity plays a role too. 

**2026-10-31 16:03:30 smlckz:**
Yes, capacity of curiosity; peer pressure. As I said, there are more details, I can not be aware of all aspects involved, nor can I list the ones I'm aware of and thoroughly discuss them. Do you have time and leisure to follow along?

**2026-10-31 16:04:29 RD:**
I get your point :)

**2026-10-31 18:29:03 badrihippo:**
I wanted to say something like this too. Free Software movements (and also at least a bunch of leftist movements) have to be careful not to be too tied down by past decisions

**2026-10-31 18:30:31 badrihippo:**
That may in some cases require making decisions that are the *opposite* of what has been done in the past. Not because they're compromising on philosophy but because the situation (and/or information) we're working with now is different from what was there when those past decisions were made

**2026-10-31 18:31:28 badrihippo:**
This ties in with what you said Akshay S Dinesh about the impossibility of making pragmatic decisions without looking at the real world

**2026-10-31 18:31:59 smlckz:**
Yes. Generalized to _all_ movements.

**2026-10-31 18:32:19 badrihippo:**
A corollary is that, since the real world keeps changing, it is likely that the decisions being made change too (even if the goal/philosophy remains constant)

**2026-10-31 18:33:23 badrihippo:**
Well I'd be happy if some movements like fascism did tie themselves down too much by past decisions, but I guess from the perspectives of people supporting those ideologies they'd want to look out for the same things too 🫠

**2026-10-31 18:34:48 badrihippo:**
And *that* means maybe a blog post written by a leader of the movement 10 years ago should not automatically be taken as an absolute source of truth today. Not that we should discard all old writings, but that we should remain aware of the context in which they were written and how much of that context still applies to us

**2026-10-31 18:35:10 badrihippo:**
(Or a licence, manifesto, speech, conclusion, argument, etc.)

**2026-10-31 18:38:02 badrihippo:**
Gandhi recognised this too when he said something to the effect that he may keep changing his views as he  learns things, and if there are any statements he make that contradict each other, then people should go with the later one

**2026-10-31 18:41:27 smlckz:**
As nice as it might have been, they too have intelligent people in their rank.. Javier Milei for example from what I can gather is quite well read/educated. As much we want to ascribe incompetence, we can't underestimate anyone. As Mao put it: Despise the enemy strategically, but take them seriously tactically.

**2026-10-31 18:43:49 badrihippo:**
Oh, I don't doubt their competence at all. In fact I would go so far as to say that fascism is among the most competent movements in action today

**2026-10-31 18:44:09 badrihippo:**
We should all learn from them

**2026-10-31 18:55:08 smlckz:**
When we have this spirit and mindset of learning, there's hope. It's just that this place doesn't seem suitable to discuss general political theory (instead of what's relevant to software freedom) further. Perhaps in a different channel.

**2026-10-31 18:57:55 badrihippo:**
I think it's relevant here, as it provides a foundation for undestanding where we are (as a movement as well as as individual supporters of Free Software)?

**2026-10-31 18:58:51 badrihippo:**
And I like the way the discussion is moving forward rather than being stuck going around in circles with pro/anti LLM arguments :P

**2026-10-31 18:58:52 smlckz:**
Then I'll have to keep it relevant to matters of software and computing.

**2026-10-31 18:59:03 badrihippo:**
Yes, I was going to suggest that

**2026-10-31 19:04:02 badrihippo:**
Is this an example of "losing the battle to win the war"?

**2026-10-31 19:11:04 smlckz:**
He's not strictly adhering to not relying on proprietary software (compare Thunberg, who would not take flights and ride on boats), but taking flights allows him to spread his ideology further, to a broader audience, perhaps?

**2026-10-31 19:21:00 smlckz:**
To consider fundametal issues relevant to the movement: how to ensure its sustainability in its current state and transmission of the ideals to contemporary peers who may benefit from it as well as to the future generations, ensuring the continuation of the movement.

**2026-10-31 20:01:37 smlckz:**
Regarding the schism that has arisen out of various degrees of LLM usage to generate code and the impact it has on the community, some feeling alienated, and others feeling empowered instead, and everything in between: in the end, who is this supposed to benefit, who is benefited instead? In the earlier divide between free and open source software, regarding monetizability, the insistence to giving back to the commons and later forcing them to do so has alienated away corporate/industrial participation in free software, or discouraged the same; if I've understood what David Chrisnall has to say on this matter.

Perhaps they weren't interested in giving back to commons at all, as much fond of taking in, insofar to ensure market position and profit. Therefore two distinct stream of developers, with little overlap could be observed: one about ensuring software freedom for its users, perhaps end-users, and another 'socialism for the rich' industrial open source software, avoiding reimplementation of same basic software in common, every corporate player benefitting, with any benefit for end-users entirely coincidental. Any poor developer contributing to these projects benefit these entities, performing unpaid labour for 'greater good'. At least an accumulation of such contributions may be considered positively for hiring in some places, you still have situations like xz or the very recent PHP2Shell one.

It's a question of dignity and respect of the developers toiling on myriad projects, in case they may not be entitled to monetary remuneration through donations and grants, that led to a certain amount of outcry. In the manner Torvalds positioned himself in this subject does not help. Inasmuch they see disregard of both their person and the effort, they are withdrawing themselves to places where they still can find mutual respect.

**2026-10-31 20:23:34 smlckz:**
In the way western identity politics work, you are to consider which position to adopt between the binaries: to those who believe in human dignity being violated (as well climate concerns, concerns on loss of expertise or cognitive decline and so on, but I consider these as supplimentary arguments used to discourage others) through use of LLMs, thus distancing themselves from it and anything they perceive that may have been tainted by LLM usage, and others oblivious and un/disaffected to such concerns, thereby continuing their use of it. Eithers LLMs has to progress to the point when the former group can concede defeat and give up decisively, in the way it worked for Chess and Go; or the the fight for meaning and dignity continues. If this was merely a fight for ensuring software freedom, there wouldn't be a reason to deny using (open weight) LLMs for the benefit of free software development (see Cory Doctorow's stance for instance). Thus I've brought out human dignity and respect (as distinct from prestige and pride) to provide explanation on this situation.

**2026-10-31 20:33:34 Akshay S Dinesh:**
smlckz: very insightful.

**2026-10-31 20:36:29 smlckz:**
This has been on my mind for a while, just spent an hour or so this evening putting it into words here.

**2026-10-31 20:38:52 Akshay S Dinesh:**
Working on smlckz's dignity/meaning framework, I think the way dignity/meaning is distributed in free software movement is also skewed in ways. Linus gets a lot of meaning and dignity from Linux project regardless of whether he codes or AI codes. But another contributor might get disproportionately less dignity/meaning to begin with, and it'll become even more diminished if their code is replaced by AI code. So naturally, some people have more to lose when Linus encourages AI.

**2026-10-31 20:40:07 Shakil Tech:**
You can't solve all issues single handedly 
There needs to be focus and specialising

**2026-10-31 20:40:34 Akshay S Dinesh:**
For me, personally, I don't derive much dignity from doing coding per se. Much of my dignity/meaning come from the use of software in the real world. So I don't lose much when my coding dignity is taken away. Many of the people I've been referring to as heavy users of AI also get more dignity and meaning because they can now build more projects with AI

**2026-10-31 20:43:07 Akshay S Dinesh:**
To add to the framework, I might perhaps tie in psychology and say there might be people for whom their dignity/meaning is tightly connected to the work they do, and others who derive dignity/meaning outside work. 

**2026-10-31 20:49:32 smlckz:**
From German constitution's Article 1(1) of Basic Law (Grundgesetz) reads:

>  Human dignity shall be inviolable. To respect and protect it shall be the duty of all state authority.

In this sense, dignity can not be derived, only respected, acknowledged. The matter of meaning, motivation has to be considered seperately. E.g. Maslow's Hierarchy of Needs and so on.

**2026-10-31 20:55:30 smlckz:**
They are getting prestige, clout. Take away the ability to showcase their 'work' to others and derive popularity from it, immediately it becomes meaningless to produce code like this. I'm here talking about all these projects that have been LLM generated en masse and then put forward publicly as open source to be showcased.

**2026-10-31 21:00:18 smlckz:**
There has been this dichotomy between software artifact as a product to be 'sold' (monetarily or otherwise) and software as art.. these two surely have difference with regard to how they derive meaning through their work

**2026-10-31 22:51:24 smlckz:**
If we go deeper into it, there's two modalities to consider from a sociological perspective: that of individual developer towards the fringes of the social graph, connecting none or few edges to them, and the ones closer to the centre.

At the beginning, some may contribute with bug reports and small patches as fixes to them, building rapport as they become more prolific, prominent, across multiple projects, till they become core developers of such projects. Their path of gradual development is getting cut off or severely hindered from competition with LLM generated code. (The same situation, or worse, inside a company, especially when dealing with code that wont cause severe damage should things go wrong.) If you consider what Terrence 

Tao had to say with regard to the way mathematics usually develops and how that is being affected (I say threatened) with the use of LLMs, we can borrow and adapt it to apply in our case: in the manner of building rapport, building a relationship of guidance, of mentorship by senior developers to junior ones, that ensures the inheritance of the wealth of invaluable experience, of tacit knowledge, to following generations; how does LLMs disrupt this process and what will be its repercussions should this process be hindered in this manner?

Then there's projects that get developed by one person (or a small group of people) that slowly snowball to prominence, with a prominent leader (whence BDFL applies) (or a core group of leadership) as its face, that may exert a certain, significant, degree of influnce over its community of developers and the free software community overall, in proportion to the influence of the project, or even the level of personal achievement. For example: Rich Hickey (Clojure), Andrew Kelly (Zig), perhaps Drew DeVault (SourceHut) to name a few. ((The process of delegitimization of the spiritual leadership of RMS in free software movement is another matter entirely, regarding the delicacy with which we needed to seperate his views regarding software freedom and his other views that caused him denouncement.)) When decisions of few affect a large number of people, arises politics naturally. One example could be how Guido van Rossum (Python) has to leave his BDFL position and a Steering Council oversees the current situation. Then there's forking of software due to disagreement with how software is to be developed (the forks of BSD, MariaDB, Forgego, Vinyl Cache, Fossify, perhaps we can count Libera.chat as well?). Apart from benevolent dictatorship, there could be democracies like Debian and Codeberg e.V. as well.

On the other hand, there are leaders like DHH who brought mainstream politics directly into the domain of discourse within the FOSS community, such that no one needed any longer to hide behind the fig leaf of purported 'apolitical' nature of software. Again, codes of conduct present in various repositories are expression of, and commitment to, respect towards, and intent to uphold, within their modest means, human dignity and values, from respective communities in their limited shared space. Work towards those new programmers who inadvertently find themselves in the wrong side of the aisle, out of rebelliousness than of actual malice, to have them realize they've been associating with the wrong kind of people and rehabilitate them, at least those who didn't go into the deep end and turn irredeemable, 'saving' whomever as much as possible. Compare similar effort w.r.t. inceldom.

After writing out this, do I realize how much have I observed over time, even as mostly an outsider.

**2026-10-31 22:57:44 smlckz:**
Sorry (but not really) for dumping half a blogpost worth of text. Enjoy :D 

**2026-11-01 08:43:00 smlckz:**
Continuing from where I left and got a bit sidetracked, the derivation of meaning, was it.. again a spectrum between these two extremes: one of reverence of the spirit of computing, programming, and one of regard as a tool, a mere means of livelihood, people distributed in between, perhaps even moving in certain direction.

Reverence of the spirit manifests through a certain kind of sanctification of the process and the resulting code; I don't mean in a strictly religious sense, please generalize to see what I'm intending to convey. In practice, we are talking about ensuring quality, correctness, performance, security and so on. These are all desirable in code, and developers may feel an intrinsic sense of validation, satisfaction, in being able to uphold their role of sincerity, through the extent to which they can realize these in their code. There's also extrinsic validation from peers through performance of such realization, in the manner of profilicity. (See research by Moeller and D'Ambrosio on sincerity, authenticity and profilicity as 'identity technologies'.) We can see the 'worship' (again generalize, or find me better analogies to describe the collective motivational framework and organization as such) of the former in myriad books, research articles, blog posts that expound on their importance, develop ways to 
better achieve them and so on. When the latter, external validation, which by no means less important in regards to the development of self-esteem, yet can still go awry is perhaps demonstrated through the example of the overzealousness with Rust. This is where a little of the ills of religiosity manifests overtly: in the proliferation of 'rewrite in Rust' movement  or outright blame and shame of developers that has happened from not adopting Rust (at all or well enough) in many existing projects. On one hand there's extensive research behind affine typing, borrow checking that allows Rust to provide the gurantees of memory safety, yet it's not a panacea of other ills of software, that is to say, this zeal is perhaps unbalanced with regard to benefits obtained vs amount of effort need to be put in. Not all software is as mission critical to need rewrite into Rust, they can still manage with existing automatic memory management systems. More research on finding better developer experience of ensuring memory safety need to be carried out as well. I heard similar stories for X11 to Wayland transition. Matters behind systemd and init systems are something else entirely; that's for another day to discuss in depth.


The matter of mere means of livelihood is perhaps better understood when generalized to motivation behind studying, acquisition of knowledge in the first place. Some study because they genuinely like it (count me in here), from purely intrinsic motivation, some others have extrinsic ones. The latter can be laid down in a spectrum: from personal gain to bringing benefits to society and humanity overall. The manner of selfishness is exemplifed in seeking lucrative jobs and limiting coding strictly as a means of obtaining better livelihood, to ensure upward social mobility, disregarding ethics involved in code, perhaps not gaining any intrinsic reward from authorship of code, or not taking it seriously. See earlier discussion about rehabilitation (let's call it 'conversion', or to reappropriate a word: 'jihad', quite apt for the struggle involved, from the misuse in Indian media; also see 'Butlerian jihad' for comparison.)

Most relevant to us, is the betterment of society and perhaps humanity as a whole. Meaning here is primarily obtained from the users of software who benefit from it and express their gratitude. There's a nuance involved, in that there need to be the development of a healthy relationship between the developers and users. It wont be good in the long term should the developers get burned out delivering value, yet continuing to get disparaged/disrespected from users with a sense of entitlement, for more features and so on. (Similarly for security, see xz incident. Similarly LLM generated pull requests, especially ones without demonstration of understanding of the code, as exemplar of disrespect/disregard to the time and effort of the developer.) A sense of mutual respect, recognition need to be fostered. As such, those disgruntled users of existing proprietary software gets introduced to free software, that they receive a modicum of understanding about the values involved in organizing and maintaining the movement. To put it succinctly, _muft nehi, mukt_. It helps us that we can rely on the rich philosophical tradition associated with the concept of _mukti_. Quite relevant in the Indian context, where people are eager to get a bargain, ignoring and disregarding what cost might be behind, that we make it clear at the first instance, before they get the wrong idea and any misunderstanding can form. I'd recommend reading through this rather dense post (as well as other writing you can find there) regarding  ideas that are relevant to us, appropriately generalized:

https://coding.social/blog/reimagine-social/#social-coding-commons

**2026-11-01 09:40:49 Akshay S Dinesh:**
The last part on the relationship between developers and users is where I think prav reversed it fully and got to the other extreme.
As in, usually there's a balance between users and developers in free software where users sometimes contribute and developers in general take user feedback into consideration. Because of the friction between Daniel and others, Prav decided to go full on "let's ignore developers and build something fully user centric". In that process, I believe, it has become unsustainable (prav people here may disagree)
