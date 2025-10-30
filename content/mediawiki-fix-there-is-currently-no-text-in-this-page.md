+++
date = '2025-10-30T15:16:18+05:30'
title = '[FIXED] Mediawiki: There Is Currently No Text in This Page'
type = 'post'
tags = ['bugs']
+++

##### On the FSCI wiki there were some old pages which were erroring out even though it had page history entries. This is how I fixed it. #####

In the last couple of days, I've been doing some maintenance work on FSCI Wiki. First I [upgraded the mediawiki version](https://status.fsci.in/issues/20251028-wiki.fsci.in-upgrade/), then I created an article on [Self-hosting](https://wiki.fsci.in/Self-hosting) complete with an image from Wikimedia Commons using the InstantCommons extension, and so on.

Yesterday, as I often do on wikis, I was pressing the [Random](https://wiki.fsci.in/Special:Random) button to reach a random page. And I got an Error message!

> There is currently no text in this page. You can search for this page title in other pages, search the related logs, or create this page.

The page was [Palakkad/linksplus](https://wiki.fsci.in/Palakkad/linksplus). And it was worrying.

My first worry was whether the upgrade itself caused the issue. I jumped over to Wayback Machine and put the link there to discover that there was [a capture from 2023 June](https://web.archive.org/web/20230606070033/https://wiki.fsci.in/Palakkad/linksplus) that showed the same error. That meant, the error was there for a long time.

What was interesting though was that when I went to "View History" I could see many revisions of the page with content.

On searching the error message online, I could find a couple of pages that discussed this. They were suggesting things like [latest revision missing text](https://stackoverflow.com/questions/18424787/mediawiki-there-is-currently-no-text-in-this-page-displayed-in-pages-listed), or [skipping too many versions during upgrade](https://www.mediawiki.org/wiki/Topic:Xca95abrvu7h52cs), or [some migration issues](https://www.mediawiki.org/wiki/Topic:X65yl4ij97b5ka8w). None of it seemed to be relevant for this scenario.

This particular wiki also has a long history of being migrated from different instances, having combatted spam, etc. And much of that is unknown to me. So, I didn't bother to think about why this might have happened, and rather chose to dig into what could be done.

First I tried to read [MediaWiki database schema](https://www.mediawiki.org/wiki/Manual:Database_layout) to find how the text is actually stored. There is a text table, but it is not a straightforward mapping between text and a page.

A page has a latest revision. A revision has one or more slots. A slot has content. Content has content_address. And content address resolves to a row in text.

So, to find content one would have to jump all these unions. And I did that for a couple of pages (including the page that had error) and figured out that the page with error had everything properly populated. It had the latest_revision `6911`. That revision had the content_id `6859`. And that content row had the content_address `6911` and that row in text table had some text. The page should be working.

But it wasn't working.

Then I tried to look for [any maintenance script](https://www.mediawiki.org/wiki/Manual:Maintenance_scripts/List_of_scripts) that might help. I tried running a few scripts but none of them were finding any problems to fix. In that process I came across the [`getText`](https://www.mediawiki.org/wiki/Manual:GetText.php) script which would technically make it easier for me to fetch the text without having to write SQL. 

When I ran the script, I got a new error. "Could not load revision 6911". Huh?

I had manually checked revision 6911 above. It exists. Why can't it be loaded then? Maybe if I dig into this script I can figure out what's going wrong, I thought.

So I went into the source code of the script. It was just calling a RevisionLookup service (getRevisionByTitle) with the title and the latest revision ID. I looked into the RevisionLookup service which was just an interface. So I went to the implementation at RevisionStore and looked at the implementation of the method. It turns out it was doing many levels of abstraction and I couldn't continue just eyeball debugging.

So I started doing print statement debugging. I inserted `print` lines following the path of the code and verifying if each line was working as expected or not. I would basically insert a print command in the code, re-run the getText script, and look for the output. This was on the live system, yes. And so I would immediately remove the print command after I get my result. PHP is fun.

I had to switch to `print_r` to print arrays.

Eventually I narrowed the issue down to the function fetchRevisionRowFromConds which was basically calling the database using a QueryBuilder. I used the `getSQL()` method of this query builder to get the actual SQL query that was being run and it was something like

```sql
SELECT  rev_id, rev_page,rev_timestamp,rev_minor_edit,rev_deleted,rev_len,rev_parent_id,rev_sha1,actor_rev_user.actor_user AS `rev_user`,actor_rev_user.actor_name AS `rev_user_text`,rev_actor,comment_rev_comment.comment_text AS `rev_comment_text`,comment_rev_comment.comment_data AS `rev_comment_data`,comment_rev_comment.comment_id AS `rev_comment_cid`,page_namespace,page_title,page_id,page_latest,page_is_redirect,page_len,user_name  FROM `revision` JOIN `actor` `actor_rev_user` ON ((actor_rev_user.actor_id = rev_actor)) JOIN `comment` `comment_rev_comment` ON ((comment_rev_comment.comment_id = rev_comment_id)) JOIN `page` ON ((page_id = rev_page)) LEFT JOIN `user` ON ((actor_rev_user.actor_user != 0) AND (user_id = actor_rev_user.actor_user))   WHERE page_namespace = 0 AND page_title = 'Palakkad/linksplus' AND rev_id = 6911;
```

Or here's a formatted version

```sql
 SELECT rev_id,
       rev_page,
       rev_timestamp,
       rev_minor_edit,
       rev_deleted,
       rev_len,
       rev_parent_id,
       rev_sha1,
       actor_rev_user.actor_user        AS `rev_user`,
       actor_rev_user.actor_name        AS `rev_user_text`,
       rev_actor,
       comment_rev_comment.comment_text AS `rev_comment_text`,
       comment_rev_comment.comment_data AS `rev_comment_data`,
       comment_rev_comment.comment_id   AS `rev_comment_cid`,
       page_namespace,
       page_title,
       page_id,
       page_latest,
       page_is_redirect,
       page_len,
       user_name
FROM   `revision`
       JOIN `actor` `actor_rev_user`
         ON (( actor_rev_user.actor_id = rev_actor ))
       JOIN `comment` `comment_rev_comment`
         ON (( comment_rev_comment.comment_id = rev_comment_id ))
       JOIN `page`
         ON (( page_id = rev_page ))
       LEFT JOIN `user`
              ON ( ( actor_rev_user.actor_user != 0 )
                   AND ( user_id = actor_rev_user.actor_user ) )
WHERE  page_namespace = 0
       AND page_title = 'Palakkad/linksplus'
       AND rev_id = 6911;  
```

Hmm. This was not at all the path I was expecting it to take. Where is all that actor stuff coming from?

When I ran this SQL manually, I got 0 results. So that was indeed the problem. I wanted to simplify this SQL by removing parts I thought could be excluding the revision. While I was doing that, I noticed the clause `actor_user != 0`. Hmmm... So, the "actor" of a revision is somehow important.

I went back and looked at the revision record 6911 and it had `rev_actor` as 0. In the `actor` table, the `actor_id` began from 1. So the `0` couldn't have been a valid actor.

That was the issue. Somehow the latest revision of this page had its actor set to an invalid id (0). What do we do now? There were some maintenance scripts with relation to actor, but none seemed to be applicable here.

This is where I made a hypothesis. Perhaps there was a spam attack and some spam actors were deleted. And in that process perhaps the edits they made were removed and their actor record itself removed? Perhaps there was some relinking to be done with the edits?

But if revision `6911` was by a bad actor, then it should have been completely removed as the edit would also be bad.

I checked the content of 6911 and manually diff'd it with the previous revision of that page. Turns out it was a genuine edit! (Adding a now defunct website called freeme.in ([as discovered on wayback machine](https://web.archive.org/web/20070501175942/http://www.freeme.in/) to that links page) (On another note, Wayback machine rocks!).

So I checked all the revisions with actor 0, there were about 2700 of them, and it looked like this wasn't a bad actor. Maybe there was some sort of data corruption and I don't know what went wrong.

So what to do now? If these are genuine edits, they should be assigned to some genuine actor. But who was the actor?

I looked at the actor table and it was just three columns (`actor_id`, `actor_user`, and `actor_name`). Where `actor_user` was NULL, `actor_name` was an IP address. In other cases, it linked to a username. Hmm. So when anonymous edits happen, the IP address gets stored in the actor table (and not the user table). Makes sense.

If that's the case, I could just create a new actor and attribute all these 2700 revisions to this actor. And that's what I did.

```sql
INSERT into actor (actor_name) values ('Missing actor');
BEGIN;
UPDATE revision SET rev_actor=925 WHERE rev_actor=0;
SELECT count(*) FROM revision WHERE rev_actor = 925;
COMMIT;
```

I inserted a new actor providing only the name. It was assigned the ID 925. I used this ID as the rev_actor for all revisions which was currently assigned to 0. I did this inside a transaction to be sure I'm not destroying any data, and only changing 2700 rows.

And then I refreshed [wiki.fsci.in/Palakkad/linksplus](https://wiki.fsci.in/Palakkad/linksplus) and there it was! The error had gone and the text was visible. In revision history the latest revision was now attributed to "Missing Actor", and on clicking it you could see all the contributions of this actor. 

There indeed is at least a couple of spam contributions inside a lot of genuine contributions. So, it probably was not just one actor, but many actors who somehow coalesced into actor 0. In any case, the error I started with is gone now with some data coming back from ether.