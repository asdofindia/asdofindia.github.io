---
layout: post
title: "Java lessons I learned from GBIF's github repository"
tag:
  - code
---

#####  A well-written software is a textbook in itself. This is a list of java language related stuff I figured out when I went through GBIF's repositories on github #####

## AutoClosable ##

You've probably seen the [try-with-resources](https://docs.oracle.com/javase/tutorial/essential/exceptions/tryResourceClose.html) statement which allows you to open resources and `try` doing something without having to explicit close the resource in a `finally` block.

AutoClosable is the interface that makes this possible. If you implement [AutoClosable](https://docs.oracle.com/javase/8/docs/api/java/lang/AutoCloseable.html) (by just having a `close()` method) you can have this for your own resources too.

I saw this in GBIF pipeline's [elasticsearch client wrapper](https://github.com/gbif/pipelines/blob/master/tools/elasticsearch-tools/src/main/java/org/gbif/pipelines/estools/client/EsClient.java) class.

## Lombok ##

In the same file, there is a `@SneakyThrows` which is actually a [Lombok](https://projectlombok.org/) annotation to automatically catch errors that are too rare to be thrown. I had mentioned Lombok and code generation in [my previous post](https://asd.learnlearn.in/builder-pattern-java/) about builder pattern. But, it maybe worth checking out in the context of not having to write getters and setters and such easily guessable simple things. (Of course, the better thing to do is to switch to kotlin)

## Decorator pattern ##

While writing the previous paragraph, I wasn't really sure what they called @something in java. I first tried searching "decorator" because in python decorators start with '@'. Turns out it is not called decorator in java. But landed on this [nice article about decorator pattern](https://refactoring.guru/design-patterns/decorator/java/example) on a website that seems to have many other patterns. Talking about patterns, there is also [java-design-patterns.com](https://java-design-patterns.com/patterns/) which lists many cool patterns.

## Annotations for type-checking ##

What's the deal about annotations then? [This quick lesson on oracle's tutorial](https://docs.oracle.com/javase/tutorial/java/annotations/index.html) gives a very friendly introduction on annotations. Annotations are seen all over java code in modern projects and therefore it is worth the three minute that you spend on this lesson to know how they actually work. It also introduces the idea of type annotations and [pluggable type systems](https://docs.oracle.com/javase/tutorial/java/annotations/type_annotations.html) which is really intresting because that allows things like `@NonNull` to exist freeing your mind from NullPointerExceptions. On implementation side, lombok has [support for @NonNull](https://projectlombok.org/features/NonNull), IntelliJ [automatically warns](https://www.jetbrains.com/help/idea/nullable-and-notnull-annotations.html), and [The Checker Framework](https://checkerframework.org/) has a whole lot of custom types.

## Apache ##

Apache has a [million projects](https://www.apache.org/index.html#projects-list). Including [avro](https://avro.apache.org/), [beam](https://beam.apache.org/), and [spark](https://spark.apache.org/). It is definitely worth knowing about the Apache software foundation and the projects it supports.

---

There probably will be a part two for this post.
