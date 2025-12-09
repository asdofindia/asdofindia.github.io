+++
date = '2025-12-05T13:52:15+05:30'
title = 'Resuscitating Old SMC Services'
type = 'post'
tags = ['sysadmin']
+++

##### How I migrated old services of Swathanthra Malayalam Computing to a new server saving software (and money) #####

When web based software get old, people stop caring for them. Shiny new alternatives become commonly used. The old ones are forgotten. One day you'll find the server down. And poof, nobody can restart the service anymore.

This is one way death of software looks like.

There are other costs of not taking care of old web services:
- the server could get hacked because of insecurities
- the financial expense on maintaing several old servers could be high.

## Age of SMC's services and infra

SMC has several software projects. Some very old, some still relevant, and some cutting edge.

The old ones include things like [grandham](https://grandham.in) which nobody has contributed code for many years. I also include old infrastructure like mailman 2 based mailing list, mediawiki not updated in years, etc in this list.

Then there are some things that are old, but are still relevant. This is where [libindic](https://libindic.org/), website(s), [discourse](https://community.smc.org.in/), etc get included.

And finally there are ultra-modern technologies like [morphology analyzer](https://morph.smc.org.in/) and [phonetic analyzer](https://phon.smc.org.in/).

## My philosophy about old software

I am an archivist. I like to keep things forever.

Don't get me wrong. I am not a hoarder. I'm a big fan of cutting out useless things. But some things are ageless. They remain relevant simply because they are an artefact of relevance.

[Digital Preservation](https://en.wikipedia.org/wiki/Digital_preservation) is a science of its own. [Video game preservation](https://en.wikipedia.org/wiki/Video_game_preservation) has entire cults dedicated to it, like [the Clickwheel Games Preservation Project](https://www.macstories.net/linked/the-clickwheel-games-preservation-project-completes-its-efforts-to-preserve-all-54-ipod-games/) which recently succeeded in painfully preserving 54 games that could be played on iPod.

That's the spirit in which I preserve software that I am personally connected with.

I just don't like link rot and bit rot.

## The safe ones

As a sysadmin, if you keep interacting with a software's backend, and frequently apply updates, then this software is safe. It means two things:
1. The software is maintained
2. The instance is maintained, up-to-date, and any changes can be done with current documentation

In SMC's case this was:
- discourse
- libindic
- static sites
- (to some extent) wiki

I've personally been upgrading and updating discourse and libindic for the past many years. So, it was trivial for me to migrate them to a new server.

As for discourse, the steps I followed were:
- Make the old instance readonly and take a backup from CLI 
- Transfer backup to new server
- Setup discourse on the new server, including [socket listener](https://meta.discourse.org/t/run-other-websites-on-the-same-machine-as-discourse/17247)
- Restore the backup

And for libindic, which is stateless, it was as simple as:
- Clone libindic-web
- Install requirements
- Setup systemd service

For the static sites (like [jokes.smc.org.in](https://jokes.smc.org.in)) I just did an rsync pulling from the old server.

As for wiki, since I've been obsessively working on mediawiki instances for the past month, I set it up in a breeze, rsyncing old content and mysqldumping old database.

Several other websites of SMC (including the [homepage](https://smc.org.in)) are hosted on gitlab pages and cloudflare pages and didn't need any action, not to forget the newer services are hosted by [Santhosh](https://thottingal.in/) and maintained separately.

## The unsafe ones

### Ghost

SMC's [blog](https://blog.smc.org.in) is running on ghost. And it was running on version 3 of ghost which was released in 2019 and had its end of life in 2022.

The difficulty with migrating this was that ghost does too much of its own maintenance. It has a CLI which is supposed to help with backup, update, installation, and everything. And this CLI assumes a very specific way that things are setup (with a specific user with sudo access, with specific permissions, and specific node versions)

I struggled a lot with it and set it up in this way:

- created a ghost-admin user with /var/ghost as its home directory
- Edited /etc/sudoers.d/ghost to include permissions for ghost-admin
- installed nvm for ghost-admin to use old node versions

Then I used the CLI to update from v3 to v4. Ghost refused to upgrade itself to v5 unless I would use mysql (mariadb wouldn't work). So, I set up a mysql container with docker-compose.yml like this:

```yaml
name: mysql

services:
  mysql:
    volumes:
      - ./data:/var/lib/mysql
      - ./conf:/etc/mysql/conf.d
    environment:
      - "MYSQL_ROOT_PASSWORD=password"
    ports:
      - 127.0.0.1:3307:3306
    image: "mysql:9"
```

I then created a user and database for ghost and migrated the mariadb database to it using mysqldump.

As I was doing that I came across this error:

```
Unknown collation: 'utf8mb4_uca1400_ai_ci'
```

Turns out mariadb supports a collation defined by Unicode Collation Algorithm, version 14. But mysql doesn't support this yet. I did a quick search and replaced all collations to `utf8mb4_general_ci` (editing the sql dump).

This caused [another problem for me](https://docs.ghost.org/faq/troubleshooting-mysql-database#error-er-cant-create-table-with-%E2%80%9Cforeign-key-constraint-is-incorrectly-formed%E2%80%9D-or-er-fk-incompatible-columns): 

```
ghost alter table `comments` add constraint `comments_post_id_foreign` foreign key (`post_id`) references `posts` (`id`) on delete CASCADE - Referencing column 'post_id' and referenced column 'id' in foreign key constraint 'comments_post_id_foreign' are incompatible.
```

This was because newer versions of mysql was automatically using collation of `utf8mb4_0900_ai_ci` when collation was not specified. Ideally I should have set the collation to this one but at that point in time I decided to change the default collation in mysql by [adding a configuration](https://forum.ghost.org/t/unable-to-upgrade-ghost-from-v4-2-0-to-v4-3-0-cascade-unknown-code-please-report/22086/56) `init-connect='SET default_collation_for_utf8mb4=utf8mb4_general_ci'`.

With the database in place, I could run `ghost update` with some tweaking of node versions as required using nvm.

### Grandham

Grandham is built in rails 5.1 from ruby 2.5.1 era. Its last commit was in 2019 and it was last deployed in early 2020 using capistrano. On the server it was running, this was the situation:

```bash
$ lsb_release -a
No LSB modules are available.
Distributor ID: Ubuntu
Description:    Ubuntu 16.04.3 LTS
Release:        16.04
Codename:       xenial
```

Initially I tried to see if I could migrate to modern ruby/rails by trial and error. I simply changed the rails and ruby versions. But I wasn't sure how to proceed with db migrations that relied on paperclip and the like. I couldn't set up a live development environment on my computer.

So I decided to use docker again.

I created a `Dockerfile` like this based on [official guidance](https://hub.docker.com/_/ruby/#create-a-dockerfile-in-your-ruby-app-project):

```dockerfile
FROM ruby:2.5.1

# throw errors if Gemfile has been modified since Gemfile.lock
#RUN bundle config --global frozen 1
RUN bundle config github.https true

WORKDIR /usr/src/app

COPY Gemfile Gemfile.lock ./
RUN bundle install

COPY . .
RUN bundle install

CMD ["bundle", "exec",  "puma", "-C", "puma.rb"]
```

I couldn't rely on the Gemfile.lock because of [the mimemagic fiasco](https://accidentaltechnologist.com/ruby-on-rails/overcoming-the-mimemagic-fiasco/) and had to modify Gemfile to pull mimemagic from github.

With this in place, I created another docker-compose.yml like this:

```yaml
name: grandham

services:
  grandham:
    build: .
    volumes:
      - ./tmp/sockets/:/usr/src/app/tmp/sockets/
      - ./log/:/usr/src/app/log/
      - /var/run/mysqld/mysqld.sock:/var/run/mysqld/mysqld.sock
    environment:
      - "ELASTICSEARCH_URL=search:9200"
  search:
    image: "elasticsearch:5"
    environment:
      - "discovery.type=single-node"
    volumes:
      - es-data:/usr/share/elasticsearch/data

volumes:
  es-data:
```

I also rsync'd the previous data and configurations to the new server such that everything remained as it is (except for changing paths to the new locations).

And voilah, by running `docker compose up -d --build` I would be able to recreate and run grandham on the new server.

## Lessons learnt

* When building software, leave control to sysadmins to figure out how to deploy. Do not assume everyone would prefer you run sudo'ed commands through your CLI. I'm looking at ghost here. Ghost [maybe now trying](https://docs.ghost.org/install/docker) to move to docker based deployment.
* Docker is amazing at preventing software rot. Docker is actually an amazing repository of old software.
* When backing up a server about to be deleted, think about .bash_history and .ssh folder of all users, and nginx/caddy configs in addition to any data. Use `ncdu /` to find out where data exists.
* [`db:setup` is more reliable than `db:migrate`](https://codewithrails.com/clean-up-db-migrations) and old migrations can even be removed in rails.
