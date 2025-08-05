+++
date = '2025-08-05T11:52:58+05:30'
title = 'Postfix to Loomio on Same Server'
tags = ['sysadmin', 'postfix', 'email-server', 'fsci']
+++

##### Loomio has a container that listens on port 25 to accept incoming emails (for post via mail). How do we then run an MTA on the same server? #####

On FSCI's [loomio instance](https://codema.in/) there's been a situation I noticed since a few months. To make the wiki (mediawiki) send emails out, it needs a local sendmail functionality. This takes up port 25. But loomio was also listening on port 25 with its loomio-mailin container.

For far too long I worked around this by stopping sendmail before restarting loomio. What I was essentially doing was disabling outbound emails from that server.

Recently someone in FSCI channel wanted to get emails from the wiki. And of course, they didn't get.

So, I decided to fix the situation.

## Moving loomio to a different port

First I had to make space for the smtp server by moving loomio-mailing to listen on a different port. This was easy. I just edited the docker-compose

from 

```
    ports:
      - "25:25"
```

to

```
    ports:
      - "127.0.0.1:2525:25"
```


This means, on the host I can run smtp on port 25, and then forward the codema.in emails to 2525.

## Making sendmail forward codema.in mails to port 2525

This proved harder than ever.

I was using a AI enabled approach of asking Gemini for the steps to do, then taking its answer and reading about from the documentation/blog posts around what the configuration parameters do.

### Sendmail

Sendmail provided by the sendmail-bin package has its configuration written using m4 macro processor. It is like a procedural way to write config (as opposed to declarative). For example, to enable a feature called mailertable, the config would look like

```
FEATURE(`mailertable')dnl
```

In there `dnl` stands for delete till next line. And that's what is used for comments too.

```
dnl this is a comment
```

Anyhow, after writing the mailertable,

```
codema.in      esmtp:[127.0.0.1]:2525
```

and making it compile with `makemap hash mailertable.db < mailertable`, and restarting sendmail and all of that, I sent mail and got an instant rejection.

Turns out I also had to change the listener setting to listen on all interfaces:

```
# dnl DAEMON_OPTIONS(`Family=inet, Name=MTA-v4, Port=smtp, Addr=127.0.0.1')dnl
DAEMON_OPTIONS(`Family=inet, Name=MTA-v4, Port=smtp')dnl
```

Even with this it wouldn't accept email sent to codema.in until I specified in `/etc/mail/local-host-names` that codema.in should be accepted.

But from then on it would complain "User unknown" when I send mail.

Basically there was a mismatch when the mail was being relayed.

I had enough of sendmail by now and decided to install exim4 as [debian recommended it in its documentation](https://www.debian.org/releases/stable/i386/ch08s04.en.html).

### Exim4

Exim has a set of routers and transports. I created a custom transport:

```
loomio_transport:
  driver = smtp
  port = 2525
```

and a custom router:

```
loomio_router:
  driver = manualroute
  domains = codema.in
  transport = loomio_transport
  route_data = 127.0.0.1
```

Unfortunately for a long time exim kept trying to look up codema's MX records and route it there (and fail because the MX records point to the same server ("lowest numbered MX record points to local host"))

Sometime in between I realized that although in `dpkg-reconfigure` I was answering "No" to split-file configuration, the configuration I was editing was actually split files. Perhaps I was editing the wrong file!

So, I did dpkg-reconfigure again and asked for split file configuration. Now my router/transport started getting loaded.

But again, it was having difficulty routing it correctly.

I was too tired by now as it was 2:30 in the middle of the night. So I decided to just call it a day and go to sleep.

Next day morning I woke up and decided I'll try again, but this time with postfix.

### Postfix

With postfix installed, I could find all default configuration with `sudo postconf -d` and all changed ones with `sudo postconf -n`. This allowed me to quickly debug and set configurations safely.

First I did dpkg-reconfigure to configure the instance to accept emails, without including codema.in as a domain to accept mails for.

This created a main.cf that had a `mydestination = localhost, ....` line *without* codema.in

Then, I extended the following:

```
relay_domains = ${{$compatibility_level} <level {2} ? {$mydestination} : {}}
```

to 

```
relay_domains = ${{$compatibility_level} <level {2} ? {$mydestination} : {}} codema.in
```

By adding codema.in to relay_domains without adding it to mydestination, I could tell postfix to accept the mail (for relaying), but not to look for a user.

Following this I edited `/etc/postfix/transport` to include

```
codema.in       smtp:[127.0.0.1]:2525
```

This meant that mails to codema.in would be transported via port 2525. (Gemini was actually suggesting me to have this transport to a named transport, and then edit master.cf to add a transport and so on. But that didn't make sense)

Thus with about two lines of configuration, things were working fine!

I ran [an open relay test tool online](https://tools.appriver.com/OpenRelay.aspx) to find if I had made a mess and built an open-relay. It seems to be passing with "relay not accepted" in 18/18 tests.

I also tested sending email to codema (external provider -> port 25 -> port 2525 -> loomio) and receiving email from wiki (mediawiki -> port 25 -> external provider). Both seemed to be working.

As an AI would say at this stage, configuring postfix to make it possible for it to operate alongside another smtp receiver is a rewarding and exhilarating task. For more such challenges that build character, join volunteer groups like FSCI.