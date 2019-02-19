---
layout: post
title: lyx-malayalam
date: 2019-02-19 18:49 +0530
tags:
  - code
---

##### Adding Malayalam language support to Lyx. Adding any language to lyx. #####

"LyX is a document processor that encourages an approach to writing based on the structure of your documents (WYSIWYM) and not simply their appearance (WYSIWYG)." - [Lyx homepage](https://www.lyx.org/Home)

Lyx is commonly used as a GUI frontend for [TeX](https://tug.org/begin.html)

### Issue ###

Lyx interface is translated to many languages, but this is not what I mean by Malayalam support.

Lyx does not have Malayalam listed as a language to be used in documents at all. This can be seen in various language settings, for example "Document -> Document Settings -> Language -> Language".

This means, there is no way to tell Lyx that a particular document is in Malayalam, uses unicode characters in Malayalam's block, requires Malayalm hyphenation, etc. When Lyx does not know it, neither can the underlying TeX system know it.

### The fix ###

Fixing the issue is simple. Someone has to add support in the code, and send a patch. Lyx page on [How To Use Git](https://www.lyx.org/HowToUseGIT) gives details on the workflow.

But what about the patch? I did some preliminary investigation on where the list of languages is pulled up from using `ack Hindi` inside /usr/share/lyx folder. Turns out there is a file called `languages`. It is in the `lib` folder in the [source code](https://www.lyx.org/trac/browser/lyxgit/lib/languages).

By using `git bisect` I figured out that Hindi was introduced in commit `1aa5a0d`. This approach can be used to find out how other languages were added as well.

To really add support one might have to send a corresponding patch on [polyglossia](https://github.com/reutenauer/polyglossia) or [babel](https://www.ctan.org/pkg/babel) unless they already support Malayalam. But I'm half sure they already support Malayalam.

I have offered help in the [Swathanthra Malayalam Computing telegram group](https://t.me/smc_project/12244) to anyone who wants to work on this. If you are reading this and you're interested, feel free to [ping me](../about/#contact).
