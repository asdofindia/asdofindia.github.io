---
layout: post
title: "PostgreSQL PostGIS Upgrade"
tags:
- sysadmin
---

##### Upgrading to postgresql 17 when postgis exists #####

As is often the case, archlinux upgraded my postgresql to 17, and gave me the wiki link to https://wiki.archlinux.org/title/PostgreSQL#Upgrading_PostgreSQL to fix the upgrade myself.

So, I just followed the pg_upgrade section of it and did:

```
# mv /var/lib/postgres/data /var/lib/postgres/olddata
# mkdir /var/lib/postgres/data /var/lib/postgres/tmp
# chown postgres:postgres /var/lib/postgres/data /var/lib/postgres/tmp
[postgres]$ cd /var/lib/postgres/tmp
[postgres]$ initdb -D /var/lib/postgres/data --locale=C.UTF-8 --encoding=UTF8 --data-checksums
[postgres]$ pg_upgrade -b /opt/pgsql-16/bin -B /usr/bin -d /var/lib/postgres/olddata -D /var/lib/postgres/data
```

At that step of running pg_upgrade I got a failure in dump. The log file had the following interesting line: `ERROR:  could not access file "$libdir/postgis-3": No such file or directory`

And the database it failed to dump was the 'osm' database where I had loaded the OSM planet.

First thing I tried is copying the `/usr/lib/postgresql/postgis-3.so` file to `/opt/pgsql-16/lib/` and try the whole sequence again (I got this idea from the manual dump and reload section of the wiki).

This time it failed with the message that the version of postgis was 17 but it needed 16.

Since postgis was already upgraded with pacman, I had to get the older version of postgis from somewhere else.

I went to [Arch Linux archive](https://wiki.archlinux.org/title/Arch_Linux_Archive) in the [postgis folder](https://archive.archlinux.org/packages/p/postgis/). I didn't know which version of postgis to download, so I looked at the date of postgresql 17 release from [postgresql folder](https://archive.archlinux.org/packages/p/postgresql/) and chose a version before that (in my case, 3.5.0).

Having downloaded the pkg.tar.zst file, I extracted it and then copied the files from the extracted folder to the pgsql-16 folder.

```
sudo rsync -avz postgis-3.5.0-1-x86_64.pkg/usr/lib/postgresql/ /opt/pgsql-16/lib/
```

Then I ran the commands from the wiki and it ran well this time.

As the script says, we have to execute the following too from the tmp folder:

```
psql -f update_extensions.sql 
```

Running `sh delete_old_cluster.sh` would also delete the olddata folder if needed.