+++
type = 'post'
title = 'Next 14 learnings'
tags = ['programming', 'nextjs', 'webdev']
date = '2024-10-21'
+++

##### I migrated a popular health magazine from Next 13 to Next 14. Here's what I learnt #####

[Nivarana](https://nivarana.org) had been running on a borrowed version of Next 13. In the javascript ecosystem, if you don't keep running, you'll fall behind and die. Also, I didn't like this codebase (I'll list down a few of the problems below). So I thought I would just migrate the thing to Next 14. It took me almost a full day to do so (spread over the last week, especially Sunday).

Please keep in mind that some of what I write here might already have been part of Next 13, but I'm just including them to mean the "newest" features in NextJS.

### Next 14

#### App Router

App router is like a power packed version of directory based URL routing. The earlier version is now called "Page router" and it is still possible to have both.

All of the route paths now have to be at the directory level. For example:

Earlier, Nivarana's links used to be like `https://nivarana.org/singleBlogDetails/Digital-Health-Obsession-Has-Compromised-Care-In-Anganwadis-65d49dc9a6dad` where the folder structure was `src/pages/singleBlogDetails/[singleBlogLink].jsx`

I got rid of the ugly "singleBlogDetails" and made it to `https://nivarana.org/article/Digital-Health-Obsession-Has-Compromised-Care-In-Anganwadis-65d49dc9a6dad`. The folder looks like `src/app/article/[slug]/page.tsx`

Pushing all of the path information to directories leaves the leaf nodes (page.tsx, layout.tsx, loading.tsx) available for predictably writing code.

This also introduces some complicated concepts like [Parallel Routes](https://nextjs.org/docs/app/building-your-application/routing/parallel-routes) which seem useful for the UI where a new route has to load while the current page fades out into background (as is common in Obsidian websites, github projects, and for sign-in modals)

#### React Server Components

We all know React team worked closely with NextJS to release RSC. What this means is that NextJS 14 leverages the greatest of RSC. The `loading.tsx`, for example makes things so neat and we don't have to manually create Suspense boundaries for the page.

The biggest mindset shift required was in creating server components. There are several [differences between server component and client component](https://nextjs.org/learn/react-foundations/server-and-client-components). There are several pages to read to understand these fully: [Server Components docs](https://nextjs.org/docs/app/building-your-application/rendering/server-components), [Client Component Docs](https://nextjs.org/docs/app/building-your-application/rendering/client-components), [Composition Patterns](https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns) (super useful), react documentation on ["use client"](https://react.dev/reference/rsc/use-client), ["use server"](https://react.dev/reference/rsc/use-server).

Server components are not magic. They work only if they can be fully done on the server. If you're using useState, useEffect, etc, you're likely using client components (with or without your knowledge). Just marking a component as "use server" doesn't make it a server component (having no "use client" doesn't make something server component either).

I'm still learning best patterns for this paradigm, and for good resources to read. If you come across any, please do share.

After being almost 90% done, I faced three problems and came across three different ways to solve them.

##### Toggle-able navigation menu

The [header component](https://github.com/nivarana-org/nivarana.org/blob/db4316fff47432420fa2696273cdcff27f949b87/src/components/header/Header.jsx) had to be marked as 'use client' because I had a toggle feature in it (for mobile devices). I went ahead with it (a bit worried) and turns out even though it is marked 'use client' it is getting sent as html in the initial server response itself. This made me read more and I discovered that the very first paragraph of [Client Components docs](https://nextjs.org/docs/app/building-your-application/rendering/client-components) talks about how client components do get pre-rendered on the server. It leads to [this discussion](https://github.com/reactwg/server-components/discussions/4) which has nice architectural diagrams that explain the difference between server tree, client tree, html, and code bundle. Short summary is that just as it was possible to render react components on the server earlier, components on the 'use client' tree (client tree) also can get pre-rendered. Quoting Dan:

> One way to think about it is that in RSC, "Server" and "Client" doesn't directly correspond to a physical server and client. You can think of them more as "React Server" and "React Client". Props always flow from React Server to React Client, and there is a serialization boundary between them. React Server typically runs either at the build time (default), or on an actual server. React Client typically runs in both environments (in the browser it manages the DOM, in other environments it generates initial HTML).

##### Infinite loading

To allow the posts on the home page to be infinite loaded, again I was hesitant to use 'use client'. I found a [solution in this YouTube video](https://www.youtube.com/watch?v=FKZAXFjxlJI) where they had the first page in server component, and then used the load more button (which is a client component) to start loading from second page onwards. I [implemented the same](https://github.com/nivarana-org/nivarana.org/blob/db4316fff47432420fa2696273cdcff27f949b87/src/app/page.tsx).

This pattern looks neat for now, although the idea of a load more button doing the same task as the home page component feels a bit... icky.

##### Analytics script

I had been using Matomo integration [of @SocialGouv](https://github.com/SocialGouv/matomo-next). It hooks into the router and the very initialization has to be through a useEffect hook. Since it had to be also integrated at the root component level I was thinking, "Oh, all this work and now I have to make the whole thing be 'use client' anyway". Luckily, on their repo, they have [an issue talking about how it doesn't work with app router](https://github.com/SocialGouv/matomo-next/issues/99). So I could start looking for better ways.

When I logged in to Matomo, I coincidentally noticed that it was asking for integration through its own Tag Manager. This was like a blessing in disguise. NextJS has a page on [third party libraries like Google Tag Manager](https://nextjs.org/docs/app/building-your-application/optimizing/third-party-libraries). It is a [wrapper for Script component](https://github.com/vercel/next.js/blob/05c7df9d06713811df3c9dca3dc777036ffdf2eb/packages/third-parties/src/google/gtm.tsx). [Script component](https://nextjs.org/docs/app/api-reference/components/script) lets us load javascript without worrying about them getting wiped out of the dom. Accordingly, I [added the Matomo Tag Manager script directly](https://github.com/nivarana-org/nivarana.org/commit/16b78163f343a1ceff0a99527818029fd3c84721) through `<Script>`.

I had to set up triggers and tags correctly and it seems to be working (at least it is tracking initial page views)


#### Convenience features

Next ships with a lot of convenience features.

[Managing Metadata](https://nextjs.org/docs/app/building-your-application/optimizing/metadata) is just a matter of a function which returns an object.

Similar convenience exists for [sitemap](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap), [Web manifest](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/manifest), [favicon](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/app-icons).

There are [several ways](https://nextjs.org/docs/app/building-your-application/routing/redirecting) for redirects. I have for now used caddy based redirects (documented below) for the singleBlogDetails -> article move. But I've put the same redirect in [next.config](https://github.com/nivarana-org/nivarana.org/blob/db4316fff47432420fa2696273cdcff27f949b87/next.config.mjs) too.

### Problems in previous codebase

Here're a few problems that were there in the previous codebase.

#### No API layer

The data fetching calls where within components that used them. [See example](https://github.com/webixun-infoways/nivarana_blogs/blob/58bd73637a2bf2c3beca74d01054c257305a538c/src/pages/singleBlogDetails/%5BsingleBlogLink%5D.jsx#L13).

I moved all of those calls into a [single API layer](https://github.com/nivarana-org/nivarana.org/blob/db4316fff47432420fa2696273cdcff27f949b87/src/network/api.ts).

This opens up the possibility for me to now directly call the database from server side and completely eliminate the backend API on the read side. I know that I have exactly 9 SQL queries to write.

#### Bootstrap + semantic CSS

Bootstrap for CSS is fine. But the earlier code also heavily used custom semantic CSS in a global styles file. For React codebases, I prefer the utility class (for [good reasons](https://adamwathan.me/css-utility-classes-and-separation-of-concerns/)) approach of tailwind. So I switched to tailwind which was set up automatically by Next. I had not much luck in asking ChatGPT to convert the earlier code to tailwind (in retrospect, this could be because I didn't pass in the CSS definitions, I just passed the html with class names).

#### Code issues

The earlier codebase had rookie mistakes like using array index as key.

But the bigger worry for me was how shabbily kept the files and folders were. Functions were not neatly organized, there was a lot of duplication, logic was interweaved with presentation.

### Aside

#### Handling redirects in caddy

To handle redirects within caddy, I used this:

```
    handle_path /singleBlogDetails/* {
        redir * /article{uri} 302
    }
```

Notice that handle_path (as opposed to handle) automatically strips the leading prefix.

### Pending

#### Redirects middleware

I want to also allow the editors to manually edit the links of posts (while retaining the older link). For this to happen we can't rely on any static methods of redirect. I will be writing a [redirects middleware](https://nextjs.org/docs/app/building-your-application/routing/redirecting#managing-redirects-at-scale-advanced) to handle this negotiation directly with the database.

#### Proper Typescript Usage

I had to disable linting and typescript because I didn't have time for these. Also because I wasted some time trying to [set up COC and nerdtree in vim](https://gitlab.com/asdofindia/dotfiles/-/commit/b6d306a3d54180dfdbbe36832a536163688ed63e) and couldn't become productive enough, I switched back to vscode which kept crashing when I was opening many files, and in all the code editors weren't really helpful at all.