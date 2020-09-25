---
layout: post
title: "Debugging Without Logs? Use strace"
date: 2020-09-25 13:58 +0530
tags:
  - devops
---

##### You have a process/service running in what seems to be an infinite loop. The log is turned off or is empty. How do you debug this? #####

[FSCI](https://fsci.in/)'s mailman instance which runs mailman3 was having trouble sending emails to lists that were imported from mailman 2 using import21 command. I logged in to the server to see what was happening. The logs of mailman showed no errors whatsoever. The web log showed that mailman was hitting the archiving endpoint of hyperkitty every second or so to try to archive the mails that were not getting sent. 

The /var/lib/mailman3/queue/out folder showed a lot of activity every instant. Files were being continuously processed and re-written. They were being rewritten so fast and with different names that doing an `ls` and then trying to open one of the files would fail becaues by the time the second command is run the file would have been rewritten with a different name. So I had to do `mailman qfile $(ls -tr | tail -n 1)` to get the last modified file to be opened up with mailman. It confirmed my suspicion that these are indeed the mails that were stuck without getting delivered.

So, for some reason mailman was continuously trying to deliver these mails and failing. Other lists on the same mailman instance was working which ruled out an issue with the postfix MTA or configuration of email sending. (There weren't any errors in /var/log/mail either).

I spent the first day of debugging this searching the internet for answers. Various email threads related to mailman would crop up with many similar complaints - either things not getting archived on hyperkitty, or emails not being sent out, and so on. Often the response would be to see if the out runner of mailman was running or to see if the hyperkitty URLs and auth were configured correctly. None of this was a problem in our case.

Next I directly checked the database to see if there were any differences between the lists that were not working and the lists that were indeed working. There seemed to be many differences (probably because of settings used in older mailman being different), but making them uniform didn't fix the issue.

The thought did occur to me to enable debug logging in mailman to see if there would be any helpful logs. But others had tried doing that and more importantly I didn't want to restart the mailman service for the fear of breaking things. So, on the second day, I decided to [read the source, Luke](https://blog.codinghorror.com/learn-to-read-the-source-luke/). Turns out mailman3's code is beautifully documented, idiomatic python code. But unfortunately, I couldn't figure out what was going on with the out queue despite reading that. There had to be some error log somewhere.

That's when I thought about strace. Turns out you can attach strace to an existing process with `-p`. So I figured out the out runner's process ID with `ps aux | grep runner` and passed that to `sudo strace -p 12345 2> strace` (which would redirect the stderr of strace to a file called strace). The strace output is verbose. I searched for the name of the list that was failing and started reading from there. After a while I saw a line that went like `openat(AT_FDCWD, "/var/lib/mailman3/templates/lists/.... EACCES (Permission denied)`

So I went to that folder to see what was different about permission structure there. Turns out those files were owned by root while the rest of the files were owned by the user running mailman. I changed the ownership and voila, things were working again.

When logs fail you, attach strace to your process.
