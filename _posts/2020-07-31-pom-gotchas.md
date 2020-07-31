---
layout: post
title: "Gotchas in setting up pom.xml (Maven)"
date: 2020-07-31 09:19 +0530
tags:
  - code
---

##### These are certain things that maven does which confuses new Java programmers #####

Maven is a tool in the Java ecosystem that allows dependency management, build automation, etc. It is useful to know a few things about it to use it effectively. In this post I will write about certain things that may be counter intuitive. Wherever relevant, I will compare things to the nodejs ecosystem.


## Best practices ##

Maven is an opinionated tool. It has a [prescribed directory structure](https://maven.apache.org/guides/introduction/introduction-to-the-standard-directory-layout.html). It uses this directory structure to separate unit tests from source code and also to differentiate different types of files within source code. This becomes useful for maven and its plugins to do things "intelligently".

## Repositories ##

Maven, like npm in nodejs, manages dependencies by downloading them from the internet and caching it.

Like npm uses npmjs.com as the default registry, maven has a ["central" repository](https://repo.maven.apache.org/maven2/).

In maven world, though, it is very common for large organizations to keep a complete mirror of the central and use this mirror for dependency resolution rather than the "central" central. (Possibly avoids single point of failure and speeds up builds).

Unlike npm (which has node_modules folder), maven doesn't store dependencies per project. There is a folder in the home directory where a local copy of any dependency of any project is saved. Technically this becomes a partial mirror of maven central.

[Read about repositories](https://maven.apache.org/guides/introduction/introduction-to-repositories.html) on the official guide to figure out how to use internal repositories and such.

## Dependency scopes ##

In npm there are only two dependency scopes: `devDependencies` and `dependencies`. In maven there are 6. These are:

* compile
* provided
* runtime
* test
* system
* import

Understanding what these mean is important to figure out dependency resolution issues. [The official guide](https://maven.apache.org/guides/introduction/introduction-to-dependency-mechanism.html) is helpful.

Compile is the default scope.

Test dependencies are used only when running tests. Might look like devDependencies from npm, but it works differently.

In npm, you can choose to install either dependencies with or without devDependencies at the beginning of the project. You can also install dependencies without mentioning them in `package.json`. This works because a project's dependencies is defined by what is present in the `node_modules` folder.

But in maven, the dependencies are all stored in a global folder. A project can run with various combinations of dependencies as per the pom.xml. When a dependency is specified in the `test` scope and the project tests are being run, the dependency will be available. When you are compiling a production build, these dependencies won't be included.

The `provided` scope is meaningful only when you understand what an `Interface` does in Java. It maybe useful to read [my previous post](../java-web/) in which I talk about how java is driven by specifications (in the form of interfaces) and implementations and how that allows the possibility of swapping out dependencies on-the-fly if they conform to the same interface.

The `import` scope is special in that it is used to get dependencies from a different project. This is a common pattern in maven. Large frameworks which will need you to use multiple dependencies provide a parent project called bom (bill of materials). When you import this parent project of a specific version, you can include child dependencies without specifying version as the version will get looked up in the parent pom you imported.

For example, if you are building a jersey project, your [pom.xml](https://github.com/eclipse-ee4j/jersey/blob/master/examples/helloworld-cdi2-se/pom.xml) might have an entry like this:

```xml
    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>org.glassfish.jersey</groupId>
                <artifactId>jersey-bom</artifactId>
                <version>${jersey.version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
        </dependencies>
    </dependencyManagement>
```

With that in place, your normal dependencies will look like this:

```xml
    <dependencies>
        <dependency>
            <groupId>org.glassfish.jersey.containers</groupId>
            <artifactId>jersey-container-grizzly2-http</artifactId>
        </dependency>
        <dependency>
            <groupId>org.glassfish.jersey.media</groupId>
            <artifactId>jersey-media-json-jackson</artifactId>
        </dependency>
    </dependencies>
```

The version of jersey-media-json-jackson would now be picked up from jersey-bom because the pom.xml of jersey-bom contains jersey-media-json-jackson.

## Properties ##

You might have noticed `${jersey.version}` in the code snippet above. This is a property. Properties are neat. They are like variables. They allow you to specify things like versions at the top of the file and refer to them later by using the property name. For example, something like the following would exist in the above pom.xml:

```xml
    <properties>
        <jersey.version>2.31</jersey.version>
    </properties>
```

## Parent POM ##

Maven POMs can have parents (and children). Parent poms can be extended by child poms. There is a super POM which is the parent of all poms. [Here is the super POM of maven 3.6.3](https://maven.apache.org/ref/3.6.3/maven-model-builder/super-pom.html). Then there are default POMs maven internally uses like the [default pluings](https://maven.apache.org/pom-archives/default-plugins-LATEST/) pom.

When maven does things magically, these default POMs are the ones specifying those behaviours.

## Plugins ##

All the commands that maven has are actually plugins doing its duty. For example, `mvn clean` runs the [maven-clean-plugin](https://github.com/apache/maven-clean-plugin/). By default the version of the plugin that is run is as is specified in the default plugins pom. This often runs old versions of plugins. So, if you want to run newer versions of plugins, make the version of the plugin explicit in [plugin configuration](https://maven.apache.org/guides/mini/guide-configuring-plugins.html).

[Read about plugins available](https://maven.apache.org/plugins/).

A lot of errors with plugins happen when we expect the latest version of a plugin to be running whereas in reality it will be an old version.

## Compiler Plugin ##

Maven doesn't automatically use whatever your system's default java version is when compiling your project.

By default the compiler plugin is configured to use an ancient version of Java. [Explicitly set the version to a newer version](https://maven.apache.org/plugins/maven-compiler-plugin/examples/set-compiler-source-and-target.html). I would say use the latest version of Java wherever possible.

## Versions ##

Like plugins, your dependencies should also preferably be latest versions. This is especially important for rapidly developing frameworks like jersey where there would be large bugs in old versions.

You can use [`mvn versions:use-latest-versions`](https://stackoverflow.com/a/974787/589184) to do this. But this doesn't respect the versions you set by properties. You can use `mvn versions:update-properties` to update only properties. [Read documentation to see what is possible](https://www.mojohaus.org/versions-maven-plugin/index.html).

You can also [configure dependabot](https://docs.github.com/en/github/managing-security-vulnerabilities/configuring-github-dependabot-security-updates) on github to get automatic pull requests when there are vulnerabilities in your application dependencies.

## Uber JAR ##

Maven can be configured to build a large single JAR file which includes all dependencies within it. This allows running a project like `java -jar project.jar`. This can be done using [shade plugin](https://maven.apache.org/plugins/maven-shade-plugin/). But if your project is sufficiently complicated, you will definitely have to use [Resource Transformers](https://maven.apache.org/plugins/maven-shade-plugin/examples/resource-transformers.html) to properly generate resource files and other things.

## More ##

There are many more secrets in Maven. Some of them I don't know. If you find something that's not here but that causes a great deal of confusion, [let me know](../comments/).
