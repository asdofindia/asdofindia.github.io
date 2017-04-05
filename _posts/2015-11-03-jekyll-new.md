---
layout: post
title: Fish function for creating a new Jekyll post with front matter
date: 2015-11-03 19:23:32 +0530
tags: code
---
I started using jekyll for this feed aggregation and I couldn't make myself write the weird date format in jekyll front matter. That's how I came up with this simple snippet that creates a file automatically with the YAML front matter for jekyll.

```sh
function jeknew
    if [ -d "_posts" ]
        set JekyllFileName (echo (date +"%Y-%m-%d") (echo $argv).md | sed 's/ /-/g' | sed 's/.*/\L&/')
        echo Creating $JekyllFileName
        set JekyllDate (date +"%Y-%m-%d %H:%M:%S %z")
        echo "---
layout: post
title: $argv
date: $JekyllDate
categories:
---" >> _posts/$JekyllFileName
    else
        echo "No _posts directory. Are you in a jekyll folder?"
    end
end
```
I run it like

```sh
$ jeknew Post Title
```
