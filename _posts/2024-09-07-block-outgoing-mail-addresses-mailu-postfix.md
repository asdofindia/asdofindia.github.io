---
layout: post
title: "Block Specific Outgoing Mail Addresses in Mailu / Postfix"
---

##### Have you ever had a mailu server keep retrying mails to email addresses that don't exist? What if you didn't want to or didn't have access to stop emails to this address at the source? #####

If you have a setup like this:

Application A  -> Mailu based mailserver M  ->  non-existent recipient R

And your application keeps sending emails to R (let's say "notification" emails).

And you do not want to configure A to stop sending (or A doesn't have the feature to block emails to particular addresses.)

Then what you can do is the following.

### Transport.map of postfix to the rescue ###

[transport](https://www.postfix.org/transport.5.html) is a mechanism that allows postfix to pattern-match To addresses and decide what to do with the emails.

If you want to discard emails being sent to "user@example.com", you can edit ``/var/mailu/overrides/postfix/transport.map` to include this line:

```
user@example.com discard:
```

(Do notice there's a colon (:) at the end of discard)

This tells postfix to send the emails to user@example.com to the discard transport. (Something like piping to /dev/null)

If you want to block emails to an entire domain (say one that's expired), you can do:

```
example.com discard:
```

You might have to restart the smtp service for changes to be picked up.
