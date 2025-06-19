+++
type = 'post'
title = 'Firefox: Copy from urlbar without encoding'
tags = ['tips']
date = '2025-03-22'
+++

##### Firefox somehow changed its behaviour of what it does when I paste multiline strings from pdf into the titlebar. Here's how I undid that for me #####

You know how when you copy a paragraph from a PDF, the lines are broken into new lines at the end of where the column originally ended?

There's a trick I use to quickly fix this which is basically the following series of shortcuts in Firefox:

* Select the text
* Ctrl + C (to copy from the PDF)
* Ctrl + T (to open a new blank tab)
* Ctrl + V (to paste the text)
* Ctrl + A (to select it all again)
* Ctrl + X (to cut it)
* Ctrl + W (to close the tab)

Voilah! Now there's the same text in a single line.

Recently when I was doing this for [this blog post](https://blog.learnlearn.in/democracy-is-a-useless-word/) I got a weird urlencoded copy

Instead of 

```
Ribiang: But why do we need to work on a defini- tion? The other day you quoted Abraham Lincoln to us: “Democracy is government of the people, by the people and for the people”. We in Meghalaya always ruled ourselves. That is accepted by everyone. Why do we need to change that? Lyngdoh Madam: I am not saying we need to change it. I too find this definition very beautiful.
```

I got

```
ribiang: But why do we need to work on a defini- tion?%20The%20other%20day%20you%20quoted%20Abraham%20Lincoln%20to%20us:%20%E2%80%9CDemocracy%20is%20government%20of%20the%20people,%20by%20the%20people%20and%20for%20the%20people%E2%80%9D.%20We%20in%20Meghalaya%20always%20ruled%20ourselves.%20That%20is%20accepted%20by%20everyone.%20Why%20do%20we%20need%20to%20change%20that?%20Lyngdoh%20Madam:%20I%20am%20not%20saying%20we%20need%20to%20change%20it.%20I%20too%20find%20this%20definition%20very%20beautiful.
```

I noticed only the bottom part of that and I was like "oh shit, firefox must have changed its behaviour"

So I went and searched for the firefox source code. The last time I did this was a decade ago when I first came to Bangalore for a Mozilla event and downloaded and compiled Firefox on my computer. It was in mercurial back then ([which I suspect is still the case](https://groups.google.com/a/mozilla.org/g/firefox-dev/c/QnfydsDj48o/m/8WadV0_dBQAJ?pli=1)) and it was very difficult to understand the codebase.

But now I see an amazing documentation of each part of the code base at [firefox-source-docs.mozilla.org](https://firefox-source-docs.mozilla.org/)

Anyhow, I checked out the [searchfox](https://searchfox.org/mozilla-central/source) thing and it was very difficult to navigate and find any commit messages. Fortunately there was a "Git log" link in actions of file and I could find the github repo at [mozilla/gecko-dev](https://github.com/mozilla/gecko-dev).

With some searching I knew that the component I'm looking on would be "urlbar" and by searching for "copy" within that path (which github makes easy these days) I reached the 5k line long `UrlbarInput.sys.mjs`

By looking at recent commits that could have caused the issue, I discovered commit [`31c2064`](https://github.com/mozilla/gecko-dev/commit/31c20640095866607a0903918f1aa9cbde153b7c) which had this commit message:

```
Bug 1939658 - Replace new URL usage with URL.parse/URL.canParse where possible. r=robwu,Standard8,Gijs,mtigley,pdahiya,settings-reviewers,credential-management-reviewers,devtools-reviewers,tabbrowser-reviewers,places-reviewers,omc-reviewers,migration-reviewers,firefox-desktop-core-reviewers ,home-newtab-reviewers,webcompat-reviewers,urlbar-reviewers,twisniewski,mossop,dao,nchevobbe,webdriver-reviewers,whimboo,issammani,mconley,nbarrett,beth
Differential Revision: https://phabricator.services.mozilla.com/D233071
```

Definitely sounds like the issue, right?

And it did touch some codelines that included words like `lazy.UrlbarPrefs.get("decodeURLsOnCopy")`

That led me to discover that there is a browser config that can be changed in about:config called `browser.urlbar.decodeURLsOnCopy` which when I set to "true", and tried making the above copy paste, I didn't have the weird encoding issue.

End of story?

Well, I wanted to be sure that this commit indeed introduced the issue and so I started looking at the diff carefully and checking the function.

```js
 _getSelectedValueForClipboard() {
    let selectedVal = this.#selectedText;

    // Handle multiple-range selection as a string for simplicity.
    if (this.editor.selection.rangeCount > 1) {
      return selectedVal;
    }
```

It starts like this. What's a rangeCount?!

So I searched "multiple range selection firefox" and discoverd that [selecting multiple ranges](https://developer.mozilla.org/en-US/docs/Web/API/Selection) is possible in firefox by pressing control while making the new selection!

So I could copy only the first line and last line from a paragraph by selecting the first line, then pressing down control, and then selecting the last line!

Back to the problem, I looked at the whole function for a while and tried to do some tests like calling `new URL()` and `URL.canParse()` with the selected text and so on. I couldn't spot the cause.

So I anyhow started writing this post thinking I'll talk about the config flag `decodeURLsOnCopy` and when I copy pasted the actual buggy text above, I noticed that the first word is `ribiang:` and the whole text is not actually url encoded.

And that means, there's probably no change in behaviour. It was probably operating the same way in the past as well when having a protocol like thing at the beginning along with question mark and so on. For sure if I copied from the pdf the part without "ribiang:" it would copy correctly.

It is indeed possible to dig into this further, but I have to go finis the other blog post first.