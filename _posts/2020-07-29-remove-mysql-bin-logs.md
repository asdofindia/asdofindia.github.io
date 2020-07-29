---
layout: post
title: "Remove MySQL/MariaDB binary logs when binary logging not enabled"
date: 2020-07-29 20:23 +0530
tags:
  - devops
---

##### What happens when you get a "You are not using binary logging" error when you try to delete the binary logs that are taking up too much space in /var/lib/mysql #####

On my server recently I ran out of space. `ncdu` told me that it is mysql-bin.xxxx files on /var/lib/mysql that is taking the most space.

Since this server is not very important to me, I didn't want binary logging. There is [excellent documentation on how to get rid of these files](https://mariadb.com/kb/en/using-and-maintaining-the-binary-log/).

So, I tried the command `reset master` and got this:

```
ERROR 1186 (HY000): Binlog closed, cannot RESET MASTER
```

I tried `purge binary logs` and although it did not error out, the files were still on the file system.

Then I checked `show binary logs` and saw the error:
```
ERROR 1381 (HY000): You are not using binary logging
```

Turns out what had happened was, my system was set to do binary logging in the past. But somewhere down the line binary logging got disabled.

So mysql thinks I don't have to worry about binary logs because it is not enabled. But in reality the old log files are still there.

All I had to do to fix this was to turn binary logging back on by [changing the configuration](https://wiki.archlinux.org/index.php/MariaDB#MySQL_binary_logs_are_taking_up_huge_disk_space), restart mariadb, purge the files, and turn it back off.
