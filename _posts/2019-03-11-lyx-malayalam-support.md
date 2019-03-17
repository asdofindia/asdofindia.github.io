---
layout: post
title: Getting Malayalam Support in LyX (XeTeX/LaTeX)
tags:
  - how-to
---

##### How to type Malayalam in LaTeX using LyX #####

Last month [I wrote about](../lyx-malayalam/) LyX requiring Malayalam language support. [Joice](https://twitter.com/J01ce_) went ahead and got it patched. Now it won't be available for public use till the next release, but we can compile LyX from source and see how it works.

## Requirements ##

The following has been tested on ArchLinux only. You will need a malayalam font installed. I've used Manjari for testing. You will also need various developer packages to compile lyx successfully. Read the `README` and `INSTALL` files in the lyx folder for knowing about these.

## Compiling ##

```bash
git clone git://git.lyx.org/lyx
cd lyx
./autogen.sh
./configure
make
```

## Running ##

```bash
./src/lyx
```

## Getting Malayalam ##

* Create a new LyX document
* Insert Malayalam text into it
* Go to Document -> Settings -> Language and set Language to "Malayalam"
* Go to Document -> Settings -> LaTeX Preamble and insert `\setmainfont[HyphenChar="00AD]{Manjari}`[^thottingal]
* Document -> View PDF

[^thottingal]: Santhosh Thottingal whose pioneering work in this field enables all of this had originally [written this critical line in his blog](https://thottingal.in/blog/2014/07/20/typesetting-malayalam-using-xetex/)

### Here's a video demonstration ###

<iframe class="youtube-embed" width="560" height="315" src="https://www.youtube.com/embed/D6z9Z0OaLJM?rel=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


### Here is a preview document generated using LyX ###

<iframe src="https://drive.google.com/file/d/1HYAnZknN9sKZVQZZhFGagrQ44md8MSSZ/preview" width="640" height="480"></iframe>

---
