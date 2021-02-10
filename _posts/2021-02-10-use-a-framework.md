---
layout: post
title: "Use a Framework"
tags:
  - code
---

##### Ever so often there is a blog post or a comment that talks about how "needlessly complicated" development in \<language> is. If you don't want to handle all those complications, you have a way forward which doesn't involve using a less powerful language - use a framework that deals with the complications. #####

There is a sure shot way to reach the front page of hackernews. Write an article about how complicated frontend development is in the year `${(new Date).getFullYear()}`. People love to be nostalgic about the "good old days" of writing things in HTML and then refreshing their browser to see the new website. They make fun of webpack, babel, etc. They feel self-validated when complaining about [Hotwire](https://hotwire.dev/) as having "reinvented" the web.

But they're wrong. There are very good reasons for why there are things like babel, typescript, webpack, etc in the javascript ecosystem. I will quickly summarize them in this paragraph. Package managers like npm/yarn/pnpm makes it possible to use third party libraries in your code and keep them up to date without having to clutter your codebase. Bundlers like webpack allow you to write code without worrying about how many bytes your user will have to download or how many network requests they will have to make. Transpilers like babel allow you to use the most convenient new features of the language without having to wait for the entire world to update their browser (which will happen never). TypeScript brings the confidence of type-safety and static analysis. Eslint helps you write better code without inadvertent errors. Prettier formats your code to make it have consistent style. Put together, all of these things make your life as a programmer easier because you will be writing readable, maintainable, better code.

Setting up all of these together from scratch is a pain. Yet there are many ways to avoid that. And also, this happens to anyone in any language when they want to bring together many best practices.

For example, imagine you want to set up a [modern java web backend](/java-web/). If you try to bring together things like Context and Dependency Injection, JAX-RS, database connection pooling, static analysis (with something like PMD), package management (with gradle/maven), and so on it will take you hours to reach a boilerplate. And you would be a fool. There are brilliant frameworks like [Quarkus](https://quarkus.io/) which take care of putting together such things so that you can focus on what matters the most - your own code.

The solution, therefore, to the problem of boilerplate code being too complicated is to use frameworks that abstract away such complications.

In Python, there are the old players - Django, Flask, etc - and newer ones like [FastAPI](https://fastapi.tiangolo.com/).

For javascript package development, there is [TSDX](https://tsdx.io/).

In frontend development, that would be frameworks like [Next.js](https://nextjs.org/), [NuxtJS](https://nuxtjs.org/), or [Sapper](https://sapper.svelte.dev/).

You will eventually run into a situation which your framework doesn't help you with. This could be either because you are having a very narrow use case or because you have written code weirdly. When you are in such a situation, before you start writing hate posts about the ecosystem, think about how far you have come from marquees and blink texts in HTML.
