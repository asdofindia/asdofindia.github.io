---
layout: post
title: "Converting PDF with transparency to PNG"
date: 2020-06-15 19:44 +0530
---

##### I keep forgetting how to convert a PDF with transparency to PNG and keep a white background

```bash
convert -density 110 input.pdf -background white -alpha remove output.png
```
