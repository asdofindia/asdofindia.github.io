---
layout: post
title: "It Was Working In Previous Release, But Not In The Present - Debugging Bugs Introduced By Dependency Upgrades"
date: 2021-05-23 23:05 +0530
tags:
  - programming
---

##### Errors introduced by dependency upgrades are sometimes difficult to track down, especially if you are not clear about how dependency resolution works in node #####

Let's start with a quiz. There's a dependency to `@chakra-ui/react` in your `package.json` with version specified as `^1.3.2`. You clone your codebase on to a new computer and run `npm install`. What's the version of `@chakra-ui/react` that will be installed in the project on the new computer?

* 1.3.2
* The latest 1.x.x version on npmjs.com
* Something else

The answer seems to be 1.6.2 (which is the latest version on npmjs.com as of now)

Now let's look at a similar question. Imagine in the above situation, you also had a package-lock.json file originally. What would your answer be?

* 1.3.2
* The latest 1.x.x version on npmjs.com
* The version of @chakra-ui/react as specified in package-lock.json
* Something else

Turns out, the behaviour of `npm install` is [super confusing now](https://stackoverflow.com/a/45566871) and that what this will do is rewrite package-lock.json to point to the latest 1.x.x version on npmjs.com

### Versions specified in package.json aren't guaranteed, unless explicitly locked

When you do `npm i dependency`, the package.json version is generated with a caret (^) prefixed. That means that you're choosing a range of versions. A common mistake is to think that `1.3.2` and `^1.3.2` are the same. They are not. The documentation on [node-semver](https://github.com/npm/node-semver#tilde-ranges-123-12-1) package is useful to understand what the caret, tilde, and other prefixes mean in version ranges.

### Semantic versioning is generally good

Why would a developer want to specify a range rather than a specific version? Isn't it a good idea to use a specifc version by default? Why poor defaults, npm?

Well, the reason is that it is generally a good idea to use the latest version of any dependency. It would have been horrible, though, if that meant that every time we installed the dependencies there would be random new updates that cause our code to crash. That's where semantic versioning comes in and makes things easier.

In a project that follows semantic versioning, version "1.3.2" has major version 1, minor version 3, and patch version 2.

Suppose I release version 1.3.2 today and find that there is a small bug which made a function perform too slowly or return incorrect result. I would roll out a fix and release a new version and that version would be 1.3.3.

Suppose I add new features and/or improve the functioning of existing features with some rewriting of underlying code. I might choose to release that as 1.4.0 to signify that there's a lot of changes.

Suppose I change an existing feature in such a way that someone who was using it earlier will now have to change their code for it to continue to work. For example, imagine I had a function that took one parameter in 1.3.2 and imagine I rewrote it in a way that it takes two parameters and fails if only one parameter is passed in. Then that is a breaking change and I would have to release the new version as 2.0.0.

With these in mind, we can see that usually it is safe to update 1.3.2 to anything 1.x.x - it would bring enhancements and wouldn't take a lot of our effort. That's why the defaults are like that.

### Minor version updates can introduce new bugs

When going from version 1.3.2 to 1.3.4 (a patch version update), there's usually very little that changes and these updates are usually for bug fixes.

But minor version updates (1.3.2 to 1.4.0) would have lots of code that has changed and therefore there is a chance that new bugs were introduced too! Even though there won't be any breaking changes that breaks our code directly, it is possible that the newly introduced bugs can cause our apps to fail in runtime.

So, the default behaviour of `npm install` can sometimes make a working software broken.

### `git bisect` can also fail

In situations where you had a software that worked which suddenly starts failing, you would usually do a [`git bisect`](https://stackoverflow.com/questions/4713088/how-to-use-git-bisect). If you are not used to that command, chances are you would do it nevertheless, manually, by checking out an old commit and seeing if it works.

With node projects and checking out old git commits, one thing we have to remember is to install the dependencies when going back in history (because they could have changed).

With the command `npm install`, there is a tricky situation though (as described above). Imagine version 1.4.0 of a library has a bug. Imagine two months ago the library we installed was 1.3.2 and we specified the version range as ^1.3.2. Now if we do `npm install` on our newest commit, it'll pull the latest version (1.4.0 or later) including the bug. So searching through git history to find which commit introduced a bug we will go back to our code two months ago. We do `npm install`. And without any qualms, npm will install 1.4.0 or later and the bug. And we will know no better.

In such situation one can use the `npm ci` command. It tries to build reproducibly. Therefore, when we go back in time, it'll use the older package-lock.json to produce a dependency tree that is closer to what is specified in package-lock.json

### To lock version, or not to

When we find out that version 1.4.0 has a problem, we might be inclined to lock the version to 1.3.x. That's usually okay in the short term. But we must keep an eye on the upstream bug report (creating one if non-existent, or subscribing to an existing one). And as soon as a fix is released, we should revert to 1.x.x range.
