---
layout: post
title: 'Bad, Java! Builder Pattern, Fluent Programming'
tags:
  - code
---
##### In this post on learning Java (and OOP) as a functional programming person, I look at the builder pattern, what problem it solves, and why it may be that way

Certain design decisions in Java are very hard to understand. The lack of named arguments, default parameter value, or optional parameters are for example one such thing.

For example, in Python, you can do this

```python
def divide(numerator, denominator):
    return numerator/denominator

divide(1, 2)  # returns 0.5

divide(denominator=2, numerator=1)  # again returns 0.5
```

In Java, this would not be possible. Neither in Javascript.

Javascript devs get around this by passing in objects. For example,

```js
function divide({numerator, denominator}) {
    return numerator/denominator
}

divide({denominator: 2, numerator: 1})  // returns 0.5
```

But Java doesn't have these kind of objects. It has [HashMap](https://stackoverflow.com/a/26785904), but using a HashMap for this would make us write more code and without the compiler type-checks. Using a separate config object means that your configuration is suddenly [too much tightly integrated with your class](https://stackoverflow.com/a/3394880).

That's where the builder pattern comes in. I read about it first in Joshua Bloch's book *Effective Java*. But before going into that, let us first take note of one situation.

Java is heavily object oriented. Therefore even simple functions like the one above will be part of some class. With Java 8, however, anonymous lambda functions can be created which may improve conditions a bit. Nevertheless, in this article, we will only focus on the actual function.

In Java, you might have something like this:

```java
public static final float divide(float numerator, float denominator) {
    return numerator/denominator;
}
```

But you have to pass the arguments in the exact order. Or you may have a division class like this:

```java
// warning: java code written by beginner.
public class Divider {
    private float numerator;
    private float denominator;

    Divider(float num, float den) {
      numerator = num;
      denominator = den;
    }

    public float getResult() {
      return numerator/denominator;
    }
}
```

The latter is common when we are dealing with real-life projects (rather than simple division of numbers). You might call the functions like this:

```java
Divider divider = new Divider(1, 2);
divider.getResult();  // would be 0.5
```

Now, builder pattern is a thing here. Consideer this Divider class.

```java
// warnings still apply

public class Divider {
    private float numerator;
    private float denominator;

    public float getResult() {
      return numerator/denominator;
    }

    public static class builder {
      private float numerator;
      private float denominator;

      public builder numerator(float val) {
        numerator = val;
        return this;
      }
      public builder denominator(float val) {
        denominator = val;
        return this;
      }

      public Divider build() {
        return new Divider(this);
      }
    }

    private Divider(builder b) {
      numerator = b.numerator;
      denominator = b.denominator;
    }
}
```

Now our caller code can do this:

```java
Divider divider = new Divider.builder().denominator(2).numerator(1).build();
divider.getResult();  // is 0.5
```

That is what happens when your language does not have named arguments, nor simple objects. Anyhow, at this point one might wonder why create a subclass when these numerator, denominator methods can be put in the parent class itself.

If we did that, our [object would become mutable](https://softwareengineering.stackexchange.com/a/380413).

The way these calls are chained (very commonly used in JavaScript), it is apparently called [fluent interface](https://en.wikipedia.org/wiki/Fluent_interface).

Here is [another example of builder pattern](https://stackoverflow.com/a/1988035).

If you think that is too much boilerplate code, there are things like [AutoValue](https://github.com/google/auto/blob/master/value/userguide/index.md), [Immutables](https://immutables.github.io/), and [Lombok](https://projectlombok.org/) which are code generators that let you mark classes with annotations and automatically include builder code in those when being compiled.

If you think that is a hack, you should go learn [kotlin](https://kotlinlang.org/).
