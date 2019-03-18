---
layout: post
title: "Inserting ZWJ in LyX"
tags:
  - code
---

##### Zero-Width Joiner is a character used in languages like Malayalam and Persian to connect characters and form a complex character. LyX was giving me trouble in inserting those characters. This is how deep the rabbit hole goes #####

LyX having [got malayalam support](../lyx-malayalam-support/) now it is important that there are no bugs in the way Malayalam is rendered by LyX.

When I tried copy pasting some text into LyX I immediately came across an issue. The *chillu* characters were being mangled up. That is, the characters like ര്‍ and ല്‍ where being converted to ര് and ല് and similar counterparts. This was strange. I initially thought it was a rendering problem, but the LaTeX output also was not showing the *chillus*.

Then I saw Joice's output did show those characters without any trouble. Even stranger!

The first hint came from [StackExchange](https://tex.stackexchange.com/a/313116). LyX is based on QT. [QT uses XIM](https://bugreports.qt.io/browse/QTBUG-8?focusedCommentId=112955&page=com.atlassian.jira.plugin.system.issuetabpanels:comment-tabpanel#comment-112955) for input if no other input method is configured.

[Read this about different input methods](https://unix.stackexchange.com/a/262220) and you will see XIM is outdated.

Turns out there ~~is~~ was [a bug in QT](https://bugreports.qt.io/browse/QTBUG-42074) which made these character get ignored in old versions of QT.

So, I installed `ibus` and `ibus-qt` (and `ibus-m17n`) and configured LyX to use ibus as the input method and *chillus* started working again.
