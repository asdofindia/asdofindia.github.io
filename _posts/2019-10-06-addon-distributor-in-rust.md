---
layout: post
title: "Addon Distributor (for self-hosted web extensions) in Rust"
tags:
  - code
  - mozilla
---

##### How Mozilla's decision to ban my add-on made me build a simple tool to maintain an update_link for keeping my extensions self-hosted and updateable, and using rust #####

I was distributing my addon *Porn Unban* through Firefox's addons.mozilla.org service. But after it had already gathered some users, some reviewer suddenly removed it from the service. I tried [protesting](https://discourse.mozilla.org/t/what-is-the-scope-of-grant-access-to-content-that-includes-graphic-depictions-of-sexuality-or-violence-in-mozillas-conditions-of-use/38658) but nobody did bat an eyelid. Therefore I decided I'm going to self-publish all my addons henceforth.

It is simple to self-host addons. You just need to provide an update_url in the extension's manifest and this URL should serve a [json file](https://extensionworkshop.com/documentation/manage/updating-your-extension/) with a specific structure. (The json will include information about various versions of the addon we are publishing and the link to get the new xpi file)

But there is no fun in doing this manually. Therefore I decided I will write a simple tool that can be used to maintain such an update file. I knew I had to do this in rust because that's a language I have been trying to build useful stuff in.

### Setting up rust ###

I knew I had installed rust on my computer sometime in the past. But when I ran the command `rust` there was nothing found. Then I looked up the [arch documentation](https://wiki.archlinux.org/index.php/Rust) and remembered that I had used `rustup` to install rust. Sure `rustc` command was available and `rustc -V` showed me I was running 1.22.1 which was from 2017! So I did a `rustup toolchain install stable` which updated the toolchain to 1.38.0 which was released last month.

I went through the [get started](https://www.rust-lang.org/learn/get-started) of rust's website and figured out I can use `cargo new` for the scaffolding. It already created a hello world app for me. I also noticed that it had initialized a git repository with even `.gitignore` ready.

I wanted to TDD. Rust Book has a [chapter on tests](https://doc.rust-lang.org/book/ch11-01-writing-tests.html). The [3rd section](https://doc.rust-lang.org/book/ch11-03-test-organization.html) talked about the prescribed way of organizing unit tests (and integration tests). Unit test go with the code itself (in the same file!) and integration tests go into `tests` folder. All was fine when I reached [this section](https://doc.rust-lang.org/book/ch11-03-test-organization.html#integration-tests-for-binary-crates) about integration tests for binary crates. Binary crates do not expose functions that other crates can use. Therefore we can't do the integration test structure. The way to go around this is to have a `lib.rs` with the main logic and use `main.rs` just to call that code.

With that information I decided to have a lib file which would hold the logic part that reads json and inserts new update objects and returns the new json while the main file would only have a CLI and write the new json back to file.

At this point I had to read [the chapter on crates and folder structure](https://doc.rust-lang.org/book/ch07-00-managing-growing-projects-with-packages-crates-and-modules.html) to figure out how rust organizes code.

With all that I tried setting up a unit test in `src/lib.rs`. I started with something like this:

```rust
mod distributor {
    fn empty_json() {
        return "{}"
    }
}

#[cfg(test)]
mod tests {
    #[test]
    fn empty_json() {
        assert_eq!(distributor::empty_json(), "{}")
    }
}
```

The idea was to have a function that returns an empty json `{}`. We would then make it return proper json later. But this immediately failed. Running `cargo test` gave me a few errors. The first one was about how return was not appropriate. One of the best things about rust compiler as told by many others is that it gives helpful error messages. This one said "try adding a return type: `-> $'static str`". That's when I remembered that rust is a typed language and therefore now we have to deal with types.

I looked at the functions page on [rust by example](https://doc.rust-lang.org/rust-by-example/fn.html) to figure out how the functions have to be defined. Combining that information with the error messages, I made a lot of changes to reach the following:

```rust
mod distributor {
    pub fn empty_json() -> &'static str {
        return "{}"
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn empty_json() {
        assert_eq!(distributor::empty_json(), "{}")
    }
}
```

This still gave me a warning about unused code. But that's probably not important.

### Types, Ownership ###

Now that I typed some type without really knowing about what type is (from the error message), it was time for me to learn types. I looked up the chapter on [types](https://doc.rust-lang.org/book/ch03-02-data-types.html) but it didn't talk about string. String first enters the book in the [chapter on ownership](https://doc.rust-lang.org/book/ch04-01-what-is-ownership.html#the-string-type). I know that ownership is something people struggle with in rust and therefore I read this chapter and the next one on borrowing very very **very** carefully. There is more about string in a [later chapter](https://doc.rust-lang.org/book/ch08-02-strings.html) which I conveniently skipped.

I could not find any mention of the `&'static str` part here and therefore ducked it and landed on the [std library documentation](https://doc.rust-lang.org/std/primitive.str.html). They say str or 'string slice' is a type of string other than the `String` type. As to `'static` they say it refers to the lifetime. Time to read lifetime.

### Lifetime ###

[Lifetime](https://doc.rust-lang.org/book/ch10-00-generics.html) is clubbed with generic types and traits in the book and I don't know why. But I read all of that and lifetime which mentions about the `'static` lifetime somewhere inside it including a warning on not using it unnecessarily.

### External Crate ###

At this point I knew that I should be using a library for json that has all the types and stuff in it. I had seen [serde_json](https://docs.serde.rs/serde_json/) in the past and decided to use it. A lot of practical information on getting started is in the [second chapter](https://doc.rust-lang.org/book/ch02-00-guessing-game-tutorial.html) on guessing game.

So, even though [serde_json](https://docs.serde.rs/serde_json/) has a website on its own, the way to find the latest version is by searching on [crates.io](https://crates.io/) where you can directly copy the line you have to add to the `Cargo.toml`. So I added `serde_json = "1.0.41"` and looked at the documentation on how to [create a json with serde](https://docs.serde.rs/serde_json/#constructing-json-values).

With that, I quickly rewrote the empty_json function and its test like this:

```rust
use serde_json;

mod distributor {
    pub fn empty_json() -> serde_json::Value {
        serde_json::json!({})
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn empty_json() {
        assert_eq!(distributor::empty_json().to_string(), "{}")
    }
}
```

### Struct, Enum, Option\<T\>, match ###

The next thing I wanted to do is [creating JSON from rust data structures](https://docs.serde.rs/serde_json/#creating-json-by-serializing-data-structures). This is the point I decided to look at [structs](https://doc.rust-lang.org/book/ch05-00-structs.html). One thing led to the other and I was soon reading about Enum, Option\<T\>, and my favourite part of rust - match. I knew the purpose of Option\<T\> for having listened to [Railway Oriented Programming in F#](https://fsharpforfunandprofit.com/rop/).

That reminded me to check out how [functional programming works](https://doc.rust-lang.org/book/ch13-00-functional-features.html) in rust. But that chapter wasn't really the way I expected it to be.

At this point I thought I could make the structure of an update file into a struct. I implemented like this:

```rust
struct Update {
    version: String,
    update_link: String,
    update_hash: String,
    update_info_url: String,
    multiprocess_compatible: bool,
    applications: Application
}
```

But when trying to instantiate these structs I realized that all fields are mandatory in structs. (`rustc --explain E0063`)

So I replaced just String with `Option<String>` thinking that would make them optional. That alone doesn't make anything optional. But the trick is then initializing the struct with `None` for all those optional fields.

### Serde ###

Serde seems to be a framework for doing a lot of data conversions in rust. To convert from data structures to json, serde_json requires using `#[derive(Serialize)]` macro. That needs to be [setup in `Cargo.toml`](https://serde.rs/derive.html).

Using [skip_serializing](https://serde.rs/attr-skip-serializing.html) field attribute, it is possible to exclude fields from serializing if Option is None.

Once I figured out I could go from rust struct to json through serde, I wanted to figure out how to build a cli.

### dialoguer ###

I wanted to build interactivity into the cli and discovered the combination of dialoguer, console, and indicatif appropriate. The documentation of dialoguer was sparse. But there is an [examples directory](https://github.com/mitsuhiko/dialoguer/tree/master/examples) in the source code which made it easy to figure out how to use the various features.

**By this point I was too tired and got a good sleep till 8 in the next morning**

Good morning. Just as I woke up I saw a [commit on the incremental scheme builder](https://github.com/jaseemabid/inc/commit/069ccc07e1d3c218b2355563f5b552baf9e02989) that Jaseem is building. I realized that I am not adding comments and that rust has support for [documentation being generated from comments](https://doc.rust-lang.org/book/ch14-02-publishing-to-crates-io.html).

### IO ###

Now I wanted to read the json from a file, write to it, etc. While trying to figure out the canonical way to read files, I saw the [`?` operator](https://doc.rust-lang.org/book/ch09-02-recoverable-errors-with-result.html) which wraps around a function that could return an error.

Then, in the serde docs I found an [excellent example](https://docs.serde.rs/serde_json/fn.from_reader.html) of how to read from file buffer. Reading from file was easier than expected. But, then disaster struck.

I spent an entire day trying to figure out how to update the vector I'm storing the updates in and fighting the borrow checker.

### Epiphany on borrowing ###

The fundamental problem was that I was still thinking in javascript/python/whatever. I had to think in low-level, think about the heap. Variables in rust is about memory and pointers to memory location. References are everything. Immutability saves life. I think this can be learnt only through fighting the borrow checker. Immutability saves life. I think this can be learnt only through fighting the borrow checker.

Then it was simply about creating functions that directly modified the memory. I did that and I suddenly had all the [logical functions I needed](https://gitlab.com/asdofindia/addon_distributor/commit/ac88a3867dc2ad06f6833a1a943f692561f3f1d0) to get going.

Then it was just about stitching together functions to get all the values from the user. And building a cli using [clap](https://crates.io/crates/clap).

Or so I thought. Because I got stuck again. I almost gave up in trying to insert into a vector when I finally figured out thanks to [stackoverflow](https://stackoverflow.com/questions/38215753/how-do-i-implement-copy-and-clone-for-a-type-that-contains-a-string) that clone can be implemented without copy. For all this while I was thinking copy and clone are the same. I could probably have solved the entire problem hours ago if I had just cloned the stuff I wanted to. But going through a thousand websites was worth it.

### Publishing ###

Now that the features I wanted have been added, I wanted to publish it to crates.io, then download it, and then use it to build the updates file on my website. The [rust book](https://doc.rust-lang.org/book/ch14-02-publishing-to-crates-io.html) gives instructions to that too.

And thus, I [got my first crate published](https://crates.io/crates/addon_distributor) while at the same time creating a self-distribution setup for my firefox add-ons.

And so did I make a [projects](https://learnlearn.in/projects/) page and it hosts the [updates.json](https://learnlearn.in/projects/updates.json) file created through the addon_distributor crate.
