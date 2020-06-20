---
layout: post
title: "Where does a program start at?"
date: 2020-06-21 01:05 +0530
tags:
  - code
---

##### This is live notes from a talk about how programs are executed #####

Different programming projects have programs that start execution in different places. Let us look at some common examples.

* Javascript - starts from the top of the file. The file to run is usually specified in `package.json`.
* Python - starts from the top of the file. The file to run is mostly specified from command line. (Eg: `python setup.py`)
* R - starts from the top of the file. In R studio, we can run any line we want. (Python notebooks are similar)
* Java - "main" method of whichever class we specify. Depends.
* Modern web projects - index.html, script tags within html, package.json, build scripts
* Android - AndroidManifest.xml, lifecycle methods.

The biggest difference is between Object-Oriented languages like Java and scripting languages like javascript and python. They run programs in completely different ways.

<div class="youtube-embed">
<iframe width="560" height="315" src="https://www.youtube.com/embed/oDl-Duk7Xkg" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
