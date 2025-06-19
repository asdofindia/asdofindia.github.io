+++
date = '2025-06-19T23:11:20+05:30'
title = 'Moving From Jekyll to Hugo'
type = 'post'
tags = ['meta']
+++

After years of struggling with jekyll's limitations and idiosyncracies, today I moved to hugo.

It took several hours.

### Importing content

The [Migrate to Hugo](https://gohugo.io/tools/migrations/) page suggests a few tools.

First I tried the jekyll import command built-in. It moved the posts correctly. But the filename retained the date prefix as in jekyll. And I wasn't sure if the date was correctly captured in frontmatter.

Then I looked at the [JekyllToHugo](https://github.com/fredrikloch/JekyllToHugo/) tool. It was just a simple python file. I liked this because I could change the behaviour to my liking. In fact, I did change a lot. I'm attaching the modified version of this at the end of this post.

Anyhow, with that I was able to get all the pages moved with dates removed from filename, and the frontmatter to my liking.

### Changing theme

Instead of importing the theme, I just decided to start from a minimal theme. I copy pasted the content of [nostyleplease](https://github.com/hanwenguo/hugo-theme-nostyleplease) theme into my themes/asd folder and started using that. I plan to add features as I like later. I've already added hugo's internal partials for opengraph, etc.

### Feed

To get [atom feed](https://asd.learnlearn.in/feed.atom), I used the file from [kaushalmodi/hugo-atom-feed](https://github.com/kaushalmodi/hugo-atom-feed).

### Tag URL

There was one small snag. On jekyll, my tags were coming in a URL like `/tag/devops`. But on hugo it was at `/tags/devops`.

The documentation about this is confusing. There a [couple of](https://discourse.gohugo.io/t/change-the-url-for-categories-and-tags/1110) [discourse threads](https://discourse.gohugo.io/t/changing-taxonomy-urls/6023) and a [github issue](https://github.com/gohugoio/hugo/issues/1208) for this. But no solution seemed to work. Eventually I looked into the test case added via the [commit](https://github.com/gohugoio/hugo/commit/d9a78b61adefe8e1803529f4774185874af85148) that closed that github issue. And doing the following in `hugo.toml` worked

```toml
[taxonomies]
  tag = 'tags'

[permalinks]
  tags = "/tag/:slug"
```

You can see the whole diff [here](https://gitlab.com/asdofindia/asdofindia.gitlab.io/-/commit/9d5db14384647fd7408eb76242adde49a1b8f0cc)

## Archetypes

I created an archetype called post.md and used this command to create this post: `hugo new content --kind post moving-to-hugo.md`


### Appendix

#### Modified jekyllToHugo.py

[View in Gitlab Snippet](https://gitlab.com/-/snippets/4864948) (since it contains what hugo interprets as a shortcode and fails rendering, I had to move it to gitlab)