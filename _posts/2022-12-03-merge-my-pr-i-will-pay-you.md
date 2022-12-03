---
layout: post
title: "Merge My PR, I Will Pay You"
tags:
  - freedom
---

##### If FOSS is collaboratively built, how can FOSS developers reject contributions? #####

FOSS - Free and Open Source Software.

Freedom to tinker with software, share modifications, and so on.

Collaboration and sharing are the cornerstone of FOSS.

Would it then make sense if I send a pull request to a project on github and the maintainer(s) rejected it?

Let us look at what happened with AppImage support in OBS.

A PR was made in [2018 by probonopd](https://github.com/obsproject/obs-studio/pull/1565). It was closed because it broke the CI testing.

Another PR was made in [2019 by probonopd](https://github.com/obsproject/obs-studio/pull/1926). This PR had issues related to git branches and was closed.

Come [2020, azubieta made a PR](https://github.com/obsproject/obs-studio/pull/2868). This is where it got heated up.

After a few back and forths, the last PR was almost ready to be merged. But there were a few hurdles.

"*The biggest hurdle right now, from my perspective, is post-merge support*", said Fenrirthviti.

To this azubieta responded, "*@Palakis @Fenrirthviti about the maintenance of the AppImage related bits, you can count on me for doing any update on the recipe. Yet, maintaining the recipe should not be complicated as it only requires to add or remove packages from the apt include section.*"

After this a few issues were discovered in the build and the PR which were fixed, at which point probonopd asked: "*Anything else holding this back from being merged?*"

To this, RytoEX made a detailed comment that pointed out several issues including commitment of post-merge support, documentation of what works and what doesn't, following contribution guidelines, and waiting till CMake and CI workflows issues were resolved. RytoEX also said, "*Given all of this, I'm converting this into a Draft PR. Please keep in mind that even if all of this is addressed, that does not guarantee that this will be merged.*"

Things started going downhill from there. Suffice to say after a few months of the PR being created, it was not merged, there were many angry comments, allegations were being made on twitter, and the github discussion was locked with a couple of clarifying posts from OBS maintainers.

### When does a "contribution" get rejected in FOSS?

In the OBS issue, a couple of observations can be made:

1. The minority who wanted and were working on appimage support in OBS were also the people who were developing appimage. In other words, there seemed to be a conflict of interest on why appimage support would be required.

2. Adding appimage support would require non-trivial effort and so would maintaining that in the future require.

I argued in a [previous post](../remaking-capitalism/) that "*open-source maintainer burden occurs because there is no shared ownership*". While in that post I was talking about how the interface of github makes it hard to share ownership, the example here is about how passive contributors cannot actually have shared ownership.

Often, the people who "contribute" just want a particular feature to be added and don't take "ownership" of a project the way the original author(s) of a project take ownership. There are considerations about the overall state of the project that the "owners" care about which might not be considered by the "passing by" contributors.

These considerations can include things like

- code quality
- complexity of the project or the architecture
- expectations of end users and reliability
- stability of features
- project direction and roadmap

### When does a rejection turn ugly?

Sometimes the *passing by contributor* is unable to see the reason why the maintainer is rejecting their contribution (or in some cases even the idea of making a contribution). In this misaligned expectation, the *passing by contributor* decides that the maintainer is being unreasonable and starts expressing resentment. The maintainer might not always have the time, patience, or energy to explain and convince the *passing by contributor* in this situation. If the wrong words are used, the conversation can become heated quickly.

### What can you do as a passing by contributor to avoid this?

* Understand that a patch/PR/MR is only half the job. There are furhter considerations in merging a patch.
* Do not assume that paying maintainers is going to help get a feature added. That is demeaning.
* Try to build trust with maintainers through smaller contributions before making large, controversial contributions.
* Try to understand why a feature is not in the roadmap of a project. If you want the roadmap to be altered, consider whether you're able to join the project as a maintainer.
* If you have conflicts of interest, consider whether your interests are in the best interest of the project you're trying to contribute to.

### What can you do as a maintainer to avoid this?

* Clearly articulate the project's goals and non-goals in the readme.
* Have a clear contribution guideline that includes information about what kind of contributions are encouraged and what procedure to be followed.
* If you are particular about code quality, include this in contribution guidelines and consider adding linting/static analysis tools that will automatically fail code.
* If you have any other concerns related to contributions (security, stability, reliability, etc), list these out in the contribution guidelines and set requirements on what you would consider mandatory before contribution can be accepted.
* Be open about how much ownership and control you would like to retain on the project, and the governance of the project.


### Collaborative art?

For many software developers, software is not just a tool, but also an art. It is a creative expression that feels poetic. This aspect also contributes to preventing shared ownership. Because it is difficult to collaborate on creative endeavours.

Whether artistic or not, developing free software takes a lot of effort. It is in the best interest of everyone if authors/maintainers are given the freedom to make choices for their project. If someone disagrees and truly feels shared ownership, then they're free to fork the project and become authors/maintainers themselves.