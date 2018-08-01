---
layout: post
title: "Test Driven Development"
tags: ["code"]
---

##### What is test driven development and why do it #####

As I sat down to write some code today, I decided to read about test driven development.

Uncle Bob (Robert Martin) has written his [three rules of TDD](http://butunclebob.com/ArticleS.UncleBob.TheThreeRulesOfTdd) which are:
1. that you can't write code other than to make failing tests pass,
2. that you can't write unit tests any more than what is required to fail, and
3. that you can't write code more than what is required to make the failing test pass.

This was wonderful principle. Following it makes you write unit tests every minute. And that is good as the article explains.

I followed it up with a three part series on test driven development in javascript by James Sinclair

* Part 1: [Getting started with unit tests](https://jrsinclair.com/articles/2016/gentle-introduction-to-javascript-tdd-intro/)
* Part 2: [Working with network requests in TDD](https://jrsinclair.com/articles/2016/gentle-introduction-to-javascript-tdd-ajax)
* Part 3: [Working with the DOM in TDD](https://jrsinclair.com/articles/2016/gentle-introduction-to-javascript-tdd-html-dom)

This is the point where my interest in [functional javascript](../functional-javascript) got piqued.

I also started to wonder if there are alternatives to test driven development, whether TDD is the way to go.

I read [this article on how TDD isn't just testing](https://www.stickyminds.com/article/test-driven-development-isnt-testing).

The [learn-tdd github project](https://github.com/dwyl/learn-tdd) is a quick overview of all the tools we need (this is where I came across code coverage tools).

I also read this [discussion about how not to do unit tests](https://dev.to/kayis/what-are-the-alternatives-to-unit-tests-2jii)? (Make sure you read the comments)

And a [post about why TDD is bad](http://david.heinemeierhansson.com/2014/tdd-is-dead-long-live-testing.html). This and the PDF linked at the end of it would make less sense if functional programming is used, I think.