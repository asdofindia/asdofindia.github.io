---
layout: post
title: Working on Mammoth-sized Repositories and 2G speed Internet
date: 2015-11-26 17:16:58 +0530
categories: code
---
[Firefox OS simulators](https://ftp.mozilla.org/pub/labs/fxos-simulator/) are becoming old. They haven't been updated in quite some time. The current way to simulate gaia on desktop is to use [mulet](https://developer.mozilla.org/en-US/Firefox_OS/Developing_Gaia/Different_ways_to_run_Gaia#Using_Gaia_in_Firefox_Mulet).

The first step to running mulet is downloading gaia code base. And it's a very large git repo with around 50,000 commits already. Aeroway 80 GB for this month expired last day and I'm limited to 512Kbps speed for a week now.

There's no way I can complete a git clone without broken pipes.

That's where `--depth` comes in.

I do `git clone mozilla-b2g/gaia --depth=1` and the download now is a manageable size. It still took more than I can remember, but manageable.

Now, how do I stay in sync with upstream? How do I fetch older commits?

`git fetch` will fetch all commits from the beginning of time because it works by comparing the last common point in the tree starting from root.

`git fetch --depth=10` fetches the latest 10 commits.

But what if there are newer commits than our HEAD? How do we move HEAD to the tip?

Well, one thing that sucks is you can't just `git merge` them.

You've to `git reset --hard upstream/master`

And you'll lost the commits in the old branch too.

---

So I did all that. And did `make mulet`.

That's when it downloads a lot of other things and then does `npm install` and everything.

I was indeed able to run mulet at the end of it. And there was gaia running on my desktop with a lot of errors in the console.

But during npm install there was an error at marionette-js-runner.

The script does a ``which python`` to decide the python binary to use. On ArchLinux, the binary is python3.

But the tasks that marionette runs requires python to be 2.

And then no matter what I do, I couldn't get ``which python`` to be /usr/bin/python2

And I was so fatigued that I quit.

But that's how programming is. No matter how many errors you see, you keep coming back to it. Trying new ways, stubbornly trying to make old ways work.
