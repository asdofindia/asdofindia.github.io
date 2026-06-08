+++
date = '2026-06-08T10:40:16+05:30'
title = 'NextJS App Router RSS, Atom, and JSON Feeds'
type = 'post'
tags = ['nextjs']
+++

##### How to add all kinds of feeds to your nextjs app router based app #####

You've rediscovered the small web. You came across amazing RSS readers like [FreshRSS](https://www.freshrss.org/) [Capy Reader](https://capyreader.com/). And suddenly you realized your NextJS based blog/website doesn't have an RSS feed.

So you start thinking. Should I add RSS or should it be Atom? Oh, I have heard about this [jsonfeed](https://www.jsonfeed.org/) format, perhaps that's what I want.

I'm here to tell you not to worry. Let's add all kinds of feeds!

### What you need

1. A nextjs app router based project.
2. A source of feed items (like blog posts)
3. Ability to add a dependency (it just has two extra dependencies): [`npm install feed`](https://www.npmjs.com/package/feed)

You also need to decide what your feed URLs are going to be.

For this post, I'm going to use the example of [nivarana.org](https://nivarana.org/) whose feeds are at:

- https://nivarana.org/feed/rss.xml
- https://nivarana.org/feed/atom.xml
- https://nivarana.org/feed/feed.json

There's no strong convention here, and feed discovery is done through "alternates" tag (which we will be implementing here) and so you can decide anything. Just remember that once you choose, you might not be able to change easily without breaking some RSS reader out there.

### Setting up feed

First, you create a common file where you can assemble the feed which can then serve all the different types. In my site's folder structure, I'm putting everything under `src/app/(public)/feed` folder. So I created an `assemble.ts` file there. You might place this in a util folder or anywhere you like. Then you need something like the following:

```js
import { getArticles } from "@/wherever/you/get/data/from";
import { Feed } from "feed";

export const getFeed = async () => {
    const feed = new Feed({
        title: "Example Site",
        description: "An online website with feeds",
        id: "https://example.com/",
        link: "https://example.com/",
        language: "en",
        image: "https://example.com/logo.png",
        favicon: "https://example.com/favicon.ico",
        feedLinks: {
            json: "https://example.com/feed/feed.json",
            atom: "https://example.com/feed/atom.xml",
            rss: "https://example.com/feed/rss.xml",
        },
    });
    const posts = await getArticles(20);
    posts.forEach((post) => {
        const authors = post.authors.map((a) => ({
            name: a.name,
            email: a.email,
            link: a.link,
        }));
        feed.addItem({
            title: post.title,
            id: post.url,
            link: post.url,
            description: post.description,
            content: post.content,
            author: authors,
            date: post.date,
            image: post.image,
            category: post.category,
        });
    });
    return feed;
};
```

You can find the documentation of what options are available in [feed's README](https://github.com/jpmonette/feed/blob/master/README.md). Be very careful that you're passing data to all properties as feed will silently drop fields that have null value.

### Setting up the feed routes

Here's where the brilliance of the feed package comes in (as opposed to something like [rss](https://www.npmjs.com/package/rss)).

You can use the same feed object to create all kinds of feeds like this:

In `feed/atom.xml/route.ts`, put

```js
import { getFeed } from "../assemble";

export async function GET() {
    const feed = await getFeed();
    return new Response(feed.atom1(), {
        headers: {
            "Content-Type": "application/atom+xml; charset=utf-8",
        },
    });
}
```


In `feed/rss.xml/route.ts`, put

```js
import { getFeed } from "../assemble";

export async function GET() {
    const feed = await getFeed();
    return new Response(feed.rss2(), {
        headers: {
            "Content-Type": "application/rss+xml; charset=utf-8",
        },
    });
}
```

In `feed/feed.json/route.ts`, put

```js
import { getFeed } from "../assemble";

export async function GET() {
    const feed = await getFeed();
    return new Response(feed.rss2(), {
        headers: {
            "Content-Type": "application/rss+xml; charset=utf-8",
        },
    });
}
```

Voilah, your feed routes are ready!

### Add alternates to your home page

Go to the `page.tsx` of your home page and add

```js
export const metadata = {
    alternates: {
        canonical: "https://example.com",
        types: {
            "application/rss+xml": "https://example.com/feed/rss.xml",
            "application/atom+xml": "https://example.com/feed/atom.xml",
            "application/feed+json": "https://example.com/feed/feed.json",
        },
    },
};
```

You might wonder, why not add this to `layout.tsx`. If you add this to layout, it becomes present in every page of your site. That's probably unnecessary. You might choose to have a different feed (say comments feed) for a different page, different feeds for category pages, tags, etc. You can decide based on your need.

### Validation

Once you deploy this change, put your feed URL in validators like [w3c feed validator](https://validator.w3.org/feed/). 

You might come across issues with encoding of special characters. You can escape those by following [this answer on StackOverflow](https://stackoverflow.com/a/27979933/589184).

Once done, add your website URL to your feed reader and see if it automatically discovers your feed and loads it well and good!

Bonus: The feed of this blog can be found at [this page](https://asd.learnlearn.in/follow/).
