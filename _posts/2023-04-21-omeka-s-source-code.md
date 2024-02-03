---
layout: post
title: "Browsing through Omeka S source code"
tags:
  - code
---

##### I like to learn things by looking at the source code. #####

**Note: This post wasn't published till 3rd February, 2024 because I lost interest in it. It eventually got published (at the older date) because I didn't want to just discard them. But it hasn't been updated or completed.**

Omeka S has a good [developer documentation](https://omeka.org/s/docs/developer/). The first thing I noticed is how they stress on coding standards.

There's [PSR-2](https://www.php-fig.org/psr/psr-2/) which is a (now outdated) standard developed by the PHP Framework Interop Group. FIG itself is interesting:
> "We're a group of established PHP projects whose goal is to talk about commonalities between our projects and find ways we can work better together."

Then there is [Lamina's coding style guide](https://docs.laminas.dev/laminas-coding-standard/v2/coding-style-guide/). Laminas is a popular PHP framework, so I assumed Omeka S was built using that. But the documentation said it is built on Zend framework v3. That's when I realized I was confusing Laminas with Laravel. Laminas is the new name of Zend framework.

Now on [Lamina's homepage](https://getlaminas.org/) I see references to [PSR-7](https://www.php-fig.org/psr/psr-7/) and [PSR-15](https://www.php-fig.org/psr/psr-15/). These are again by PHP FIG. So it looks like the kind of standardization Java has might be there with PHP too now.
