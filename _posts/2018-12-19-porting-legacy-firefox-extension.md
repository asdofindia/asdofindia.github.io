---
layout: post
title: "Porting a Legacy Firefox Extension to the Latest Format"
date: 2018-12-19 18:53 +0530
tags:
  - code
---

Back when the war for net neutrality was on in India, when Jio hadn't yet come in lowering data prices (for the entire internet) for all, when [Fa(r)cebook](https://learnlearn.in/facebook/) was promoting [their walled garden of internet calling it "free basics"](https://learnlearn.in/net-neutrality/#violators) in India, I had created a Firefox add-on called [*Zero Internet*](https://www.reddit.com/r/india/comments/33bpcz/this_firefox_addon_lets_you_browse_only_those/) to shout for protecting net neutrality.

When I went today and tried to access that add-on, it was not available. Because I have not updated it to the latest extension format. I figured I may as well update it and write about it so someone can find it useful.

My add-on was written using the add-on SDK. MDN has a [very good page on porting legacy add-ons built like this to the web extension format](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Comparison_with_the_Add-on_SDK).

Here is a few of my own notes.

## manifest.json ##

Manifest file which was earlier package.json is now manifest.json and has a set of keys that are different.

| Key | Remarks |
| --- | ------- |
| manifest_version  | newly added, just `2` at the moment |
| name | The name field now corresponds to what was title field earlier with capitalizations and whitespace all allowed. The old name field is gone. |
| {title, id, main, engines, license} | all gone |
| icons | Similar to what was previously icon, but holds multiple icons for different sizes |
| homepage_url | same as previous homepage |
| author | They expect just a name here now |
| [content_scripts](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/content_scripts) | Replaces lib and main to be a way to specify which script to run where and adds a lot of granular controls on how to |
| [permissions](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/permissions) | There is more granularity in what kind of permissions are avaiable and need to be requested. In my case, I did not need any extra permission and left this key. |

### Content Scripts ###

This is a very important key. In fact, the sole thing that my extension used to do was check if the URL was allowed and block page loading if it was not allowed (not available on "Free Basics"). And content scripts include this matching and excluding by default.

I had to use `<all_urls>` which is a special value that matches all URLs. The exclude_globs did not work well for me so I had to switch to using exlude_matches and use some vim skills to convert everything to the format it expected.

### emit ###

Earlier, I had to emit a message to the worker script once the script had been attached. But since content scripts can be made to load only on the websites we want, I simply blocked whatever page the script was loaded in.

## Publishing ##

I did a good thing and installed [`web-ext`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Getting_started_with_web-ext) in between thereby allowing to do things like `web-ext lint` and `web-ext run`. Having tested that the extension is now working, I had to update my add-on on AMO. For that, I did `web-ext build` which put the zip in an artifacts folder. I then went to addons.mozilla.org and submitted a new version of mine.

Turns out there is no wait for reviewing these days. Extensions are automatically approved with a warning that it would be reviewed later and maybe taken down.
