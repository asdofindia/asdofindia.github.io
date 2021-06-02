---
layout: post
title: "Hash Constants Break Encryption"
tags:
  - politics
---

##### Government of India says that message hashes can be used to trace originator of messages without breaking encryption. This is a sincere lie. #####

What does a hash do? It gets you the fingerprint of a message. Let us take a simple hash function like SHA-1.

```
$ echo "This is a secret message" | sha1sum
d162e6f24e0af7f7b7bb9da3243f612338b8fd8a  -
```

If we change the message even slightly, it will produce a different hash.

```
$ echo "this is a secret message" | sha1sum
6f32d4378ddde79128bf4e67b277d18b8d8edc02  -
```

But for the same input, it will always produce the same output.

```
$ echo "This is a secret message" | sha1sum
d162e6f24e0af7f7b7bb9da3243f612338b8fd8a  -
```

This is mathematics and therefore, if you run this hash in your computer, it will produce the same hash too.

Many useful hashes are one-way hashes. That is, it is difficult to take a hash and get the original message from it. For example, if I gave you the hash `a9fcd54b25e7e863d72cd47c08af46e61b74b561`, you wouldn't be able to trivially calculate what the message that was hashed is.

But if I told you that it is a single character that I hashed to get that hash, you could try this:

```
$ echo "a" | sha1sum
3f786850e387550fdab836ed7e6dc881de23001b  -
$ echo "b" | sha1sum
89e6c98d92887913cadf06b2adb97f26cde4849b  -
$ echo "c" | sha1sum
2b66fd261ee5c6cfc8de7fa466bab600bcfe4f69  -
$ echo "d" | sha1sum
e983f374794de9c64e3d1c1de1d490c0756eeeff  -
$ echo "e" | sha1sum
094e3afb2fe8dfe82f63731cdcd3b999f4856cff  -
$ echo "f" | sha1sum
a9fcd54b25e7e863d72cd47c08af46e61b74b561  -
```

Aha! The message was "f". This is called brute-forcing a hash. If the hash of a message is computationally very expensive to calculate, the longer the message gets the more difficult it becomes to brute force a hash like this.

This is how passwords work too. Instead of storing the original password, most websites store the hash of it. And then they compare the hash to see if you entered the right password. That's why many websites ask you to use strong/long/cryptic passwords.

What the government is [asking WhatsApp to do is simple](https://www.hindustantimes.com/india-news/hash-constant-govt-s-solution-to-tracing-originator-of-viral-messages-101614667706841.html). For every message that people send on its platform, calculate a hash (they need not use SHA-1 algorithm, I just used it as an example), and if it is the first time they're seeing this hash, save the phone number of the user who sent it next to the hash.

So, if I'm the first person ever to send the message "This is a secret message" on WhatsApp, the hash `d162e6f24e0af7f7b7bb9da3243f612338b8fd8a` will be saved next to my number in WhatsApp's database.

So, weeks later when Government finds out that "This is a secret message" is a problematic message, they can go and ask WhatsApp, "Hey, who sent the message with the hash `d162e6f24e0af7f7b7bb9da3243f612338b8fd8a` for the first time?" and they will give my number to the government.

What's the problem with that?

Well, firstly, now WhatsApp can easily find out who is talking what.

```
$ echo "I am pregnant" | sha1sum
8be15046143901ec7c6eacd17d90f85679416c1b  -
```

Everytime someone sends a message with a hash `8be15046143901ec7c6eacd17d90f85679416c1b` WhatsApp knows that they are pregnant. Whether WhatsApp will store this fact or not is up to WhatsApp. As a user of WhatsApp, I'll never be able to tell what WhatsApp does with that information. They might tell Facebook that I am pregnant and that I should be shown pregnancy related ads. They might share this data with the government. A lot of things can happen if someone can see what message I'm sending to others.

The government innocently claims that adding a hash constant does not break encryption.

I dare the government to publish the password hashes of their servers and accounts if that's true.
