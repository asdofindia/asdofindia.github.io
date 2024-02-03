---
layout: post
title: "PostgreSQL Gotchas"
tags:
  - postgres
  - rdbms
---

##### These are some interesting things I learnt about postgres from reading Learn PostgreSQL by Luca Ferrari, Enrico Pirozzi #####

**Note: This post wasn't published till 3rd February, 2024 because I lost interest in it. It eventually got published (at the older date) because I didn't want to just discard them. But it hasn't been updated or completed.**

### Roles can have roles within. A user is just a role with login ###

I used to be wonder what the difference between a user and a role was. Postgres actually has only one of these feature. Role. And roles can have roles. Which means, roles can be used to group roles. A group of roles is another role. So, you can have one role like "staff" and many other roles like "engineer-1", "engineer-2" in the `staff` role.

We can conceptually use role as "user" or "group" (or both). A role with the ability to login can be considered as a user. A role that has `NOLOGIN` and is used to group other roles can be considered as a group.

`createuser` utility internally just creates a role.

### `\e` in psql opens the last command in $EDITOR ###

`\e filename.sql` runs the SQL in filename.sql


