---
layout: post
title: Cleaning up Spam on MediaWiki
date: 2017-01-26 14:09:00 +0530
categories: knowledge, code
---

##### How I cleaned up about two thousand spam users and their thousands of spam pages and edits from a mediawiki instance #####

It was a national holiday and I had a lot of free time to send a mail to the [SMC](https://smc.org.in/) mailing list titled "Republic day cleanup". My purpose was to clean up whatever my eyes found dirty.

And it wasn't long before I picked up my pet peeve. Removing spam from [SMC wiki](https://wiki.smc.org.in).

Like many old mediawiki instances, SMC wiki had fallen a victim to spam and vandalism years back. The admins were able to combat spam by restricting user account creation and edits. But, what would one do with the thousands of pages that already exist?

[MediaWiki manual on combating spam](https://www.mediawiki.org/wiki/Manual:Combating_spam) talks a lot about prevention (Yes, we all know prevention is better than cure. But tell us something which is helpful!).

In the [cleaning up](https://www.mediawiki.org/wiki/Manual:Combating_vandalism#Cleaning_up) category there are many options, but I'll discuss how many of them are useless and how I finally succeeded to clear spam.

### Cleanup by Hand ###
> "If the problem is limited to a few pages, it can be cleaned up by hand using normal administrative functions."

True indeed. But the problem is never limited to a few pages.

### [deleteBatch.php](https://www.mediawiki.org/wiki/Manual:DeleteBatch.php) ###

`php maintenance/deleteBatch.php somepages.txt`

This will delete the pages we add in somepages.txt.

But if there were only enough pages to add to somepages.txt by hand, we could manually delete them.

### [Extension:Nuke](https://www.mediawiki.org/wiki/Extension:Nuke) ###
This extension is bundled with new versions of MediaWiki. But the problem is that this just helps when spam is contributed by very few users.

### [Extension:UserMerge](https://www.mediawiki.org/wiki/Extension:UserMerge) with [Extension:BlockAndNuke](https://www.mediawiki.org/wiki/Extension:BlockAndNuke) ###
The two extensions working together could have been a good way to delete a lot of spam. But, UserMerge is very slow to use because each pair had to be manually merged.

### [Extension:SpamBlacklist](https://www.mediawiki.org/wiki/Extension:SpamBlacklist) ###
This extension's primary role is in preventing new edits which link to blacklisted external domains. But the wikimedia manual says:

> his script automatically goes back and removes matching spam on your wiki after you make an update to the spam blacklist. It does this by scanning the entire wiki, and where spam is found, it reverts to the latest spam-free revision.

which I did not read properly and therefore I never tried this extension.

### [cleanupSpam.php](https://www.mediawiki.org/wiki/Manual:CleanupSpam.php) ###

I had fairly good success with this maintenance script. First thing to do is enter a new username for the exterminator bot in `MediaWiki:Spambot_username`. After that you can run the script like

`php maintenance/cleanupSpam.php --delete spammerwebsite.com`

and all pages which contain the link to spammerwebsite.com will get deleted. You can find more websites using Special:Random.

But this method had a lot of disadvantages. The script would first try to revert the page to a revision without the specified link. And in the wiki I was working on, there were many revisions for such spam pages and therefore the pages simply wouldn't be deleted.

I also had to run `php maintenance/deleteArchivedRevisions.php --delete` very often to actually get rid of the spam pages.

I could destroy a lot of pages at a time by giving a broad query like `php maintenance/cleanupSpam.php --delete *.ro` but sometimes that resulted in deleting genuine pages too (for \*.eu, \*.net, etc.)

### [CleanMediawiki.sh](http://www.actiu.net/mediawiki/) ###

Just when I was about to give up I glanced upon this neat little shell script which would destroy all traces of a range of users based on their userid in the database.

Almost all the spam accounts on SMC wiki was created after a majority of users had registered. So, I decided to install phpmyadmin and figure out which ranges of users had to be deleted.

---

**Pro-tip**: after installing phpmyadmin, the easiest way to configure it for your webserver would be to create a symbolic link inside an existing folder that is already served as a website.

**Pro-tip 2**: If you hadn't done so already, this is the best time to take a database backup

`mysqldump -u wikidatabaseuser -p wikidatabasename > dump.sql`

---



I logged into phpmyadmin as the wiki database user, and navigated to the users table inside the wiki database.

I chose to list 500 rows simultaneously and show only columns with username, user email, user full name, and whether the user had authenticated their email or not. These 4 parameters were enough for me to identify genuine users from spam users.

A great blessing awaited me. All the spam accounts had names that didn't have the Indianness which genuine account names had. Therefore, this method might not be very useful for an English wiki admin. (Happy Republic Day, Indians!)

So, I started from the last row on the last page, and could easily identify a large block (490 users) of spam accounts from userid 12021 to 12521 (let's say). I issued the following command:

`./cleanmediawiki.sh wikidatabasename 12021 12521`

This ran fairly quickly and deleted all those users and their contributions and associated pages and all that.

I repeated this till the first row, being careful towards the smaller userids to not delete genuine users who had registered first.

Just as I announced success, some pages, including the "Main_page" was showing a message like "The revision #1895 of the page named "Main_page" does not exist." Although I could see that there were many revisions in the revision history, wiki was stubborn on getting that lost revision (which probably got deleted when a spam user had edited the page and we later removed it)

I tried [findAnomalies.php](https://www.mediawiki.org/wiki/Manual:FindAnomalies.php) and it did show all the pages that were missing revisions with the command

`php findAnomalies.php --mode=plmra`

But the --fix derivative wasn't working (probably it was never coded and was just mentioned as an idea).

Luckily, [attachLatest.php](https://www.mediawiki.org/wiki/Manual:AttachLatest.php) worked! All I had to do was:

`php maintenance/attachLatest.php --regenerate-all --fix`

and it went through all the pages and fixed the latest revision according to time stamps.

ANd just like that all the spam was gone with all the genuine content intact!

## Tips ##

### Special:Statistics ###
Use this page to figure out stats of your wiki like how many pages and user accounts exist. This will give you an idea of the scale of the task.

### Special:Version ###
Use this page to find out which extra extensions are installed on your wiki instance.

### Special:Random ###
Use the random page to go to a random page and if it lands on a spam page 4 out of 5 times, chances are that your wiki has 4 times more spam than useful content.

---

Were you affected by MediaWiki spam? Did you find this post helpful? Do you have a simpler solution? [Let me know](/comments/).
