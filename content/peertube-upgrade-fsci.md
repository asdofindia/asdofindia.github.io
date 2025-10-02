+++
date = '2025-10-02T11:55:59+05:30'
title = 'Doing 5 Years of Sysadmin Work in 5 Hours (Without LLMs)'
type = 'post'
tags = ['sysadmin', 'fsci']
+++

##### Clickbait aside, this is a description of how I upgraded an old Peertube instance multiple versions #####

Free Software Community of India has a peertube instance at [videos.fsci.in](https://videos.fsci.in/). It was set up originally in 2018 and upgraded last in 2021. It was not just a tech debt, but also a financial debt costing about ₹11,000 rupees every year to be running as it is (without even getting new uploads).

The key to remaining healthy is pruning out whatever is unhealthy.

Yes, there is [Killed by Google](https://killedbygoogle.com/), [Microsoft Graveyard](https://microsoftgraveyard.com/), and even [Killed by Mozilla](https://killedbymozilla.com/). Yes, people think of killing services as a sin and as a sign of weakness. But no. [Even birds do it](https://www.youtube.com/watch?v=hUi6n-JDNE0).

And thus, I started a [consensus process on FSCI's collaborative decision making platform](https://codema.in/d/RlXtu91S/is-video-hosting-financially-sustainble-for-fsci-/1) to sunset the peertube instance. Many people reluctantly agreed and I was looking forward to happily shutting the instance down.

But then, curveball! A couple of people said they are thinking of setting up a new (!) peertube instance and would think about taking over this instance. That changes everything.

Maybe Google and Microsoft can still go ahead and kill services even if people say they'll take it over. But FSCI is an open community operating on anarchic principles and a [commitment to user freedom](https://codema.in/d/mMBW5Py3/creating-fsci-manifesto). Meaning, if I force-kill a service when people said they are thinking of taking it over, I would look very bad.

And there was also the risk that because this peertube instance wasn't maintained well, this group might after all decide not to go ahead with this proposal. I wanted to eliminate that risk. I also get great pleasure in going through the pain of intense sysadmin tasks. And I also wanted to see what's so great about peertube. So I decided to just upgrade.

## Reconnaissance

The first step to doing anything like this is to figure out what exactly is the set up right now. To maximum (full) detail.

I had already gotten SSH access to the server.

First I used the `history` command for both the admin user and the root user to get all the recorded commands and saved it into a file. By going through this history I could figure out what kind of commands have been run on this server, which folders where visited, what services were run, etc.

There were several `docker-compose` commands and some folders came up repeatedly

* /root/peertube
* /mnt/videos

Then I ran the `ss` command to see what software was serving the network requests. In the response I saw that docker was directly serving to the world. Which means all my work will have to be in docker.

One problem with logging into old systems is that there would often be several copies, backups, etc of old configurations. We are always taking backups and never deleting them because there's a remote possibility that we might have to refer to these later. So, the challenge is then to figure out which are the actually relevant, currently running configuration files, in this case, the `docker-compose.yml`.

While technically I could maybe have used [`docker inspect`](https://forums.docker.com/t/find-the-directory-where-docker-compose-was-launched/50190/10) to find out which folder the actually used `docker-compose.yml` was in, I just assumed it would be in /root/peertube by reading the command history and looking at the contents of this file.

This file would give me everything I needed to know about how the system was organized. Well, almost everything. Here's how it started:

```yml
version: "3.3"

services:

  # You can comment this webserver section if you want to use another webserver/proxy
  webserver:
    image: chocobozzz/peertube-webserver:latest
    # If you don't want to use the official image and build one from sources:
    # build:
    #   context: .
    #   dockerfile: Dockerfile.nginx
    env_file:
      - .env
    ports:
     - "80:80"
     - "443:443"
    volumes:
      - type: bind
        # Switch sources if you downloaded the whole repository
        #source: ../../nginx/peertube
        source: ./docker-volume/nginx/peertube
        target: /etc/nginx/conf.d/peertube.template
      - assets:/var/www/peertube/peertube-latest/client/dist:ro
      - /mnt/videos/docker-volume/data:/var/www/peertube/storage
      - certbot-www:/var/www/certbot
      - /mnt/videos/docker-volume/certbot/conf:/etc/letsencrypt

```

and some more

```yml
  peertube:
    # If you don't want to use the official image and build one from sources:
    # build:
    #   context: .
    #   dockerfile: ./support/docker/production/Dockerfile.buster
    image: chocobozzz/peertube:production-buster
    # Use a static IP for this container because nginx does not handle proxy host change without reload
    # This container could be restarted on crash or until the postgresql database is ready for connection
    networks:
      default:
        ipv4_address: 172.18.0.42
    env_file:
      - .env

    ports:
     - "1935:1935" # If you don't want to use the live feature, you can comment this line
    #  - "9000:9000" # If you provide your own webserver and reverse-proxy, otherwise not suitable for production
    volumes:
      - assets:/app/client/dist
      - /mnt/videos/docker-volume/data:/data
      - /mnt/videos/docker-volume/config:/config
    depends_on:
      - postgres
      - redis
      - postfix
    restart: "always"

  postgres:
    image: postgres:10-alpine
    env_file:
      - .env
    volumes:
      - /mnt/videos/docker-volume/db:/var/lib/postgresql/data
    restart: "always"
```

and at the end

```yml
volumes:
  assets:
  certbot-www:

```

It says that the data was in `/mnt/videos/docker-volume`. There was also a `/root/peertube/docker-volume`. I used `du -sh` for both folders to find that the `/mnt/videos` one was 45G which was the real deal. One of the previous maintainers had also told me that they had to attach an external volume when they ran out of space on the root filesystem. So, I guessed that they would have copied the original docker-volume to the mounted one, and left the original as it is.

But there is also a reference to the /root/peertube/docker-volume in the nginx configuration.

So, it was using both folders?

I did a quick `diff` between the two nginx files and saw that they're the same. Meaning, it was probably an oversight and only the `/mnt/videos` folder mattered.

Now comes the question of "what version is this running?". Notice how it says `image: chocobozzz/peertube:production-buster`. That tag [doesn't even exist now](https://hub.docker.com/r/chocobozzz/peertube/tags?name=production-buster). Then how do I know what's the actual running version?

Luckily peertube exposes its version information easily in the admin UI. And it said 2.2.0. But I can't be so sure?

Docker does show the SHA hash of the image. But finding the image on dockerhub using the SHA hash is complicated. So, instead, I used `docker images --format "{{.Repository}} {{.CreatedAt}}"`. This showed me the date of when the peertube image was created at and the [v2.2.0 image](https://hub.docker.com/layers/chocobozzz/peertube/v2.2.0-buster/images/sha256-6df7b6956cb08acb274a8e7ba85ca8d9f1cabcbb70f29dccfc1e6d1ab31aea74) was created on the same day.

The peertube-webserver image was a little more tricky in that it just said latest and [dockerhub doesn't even have any other tag](https://hub.docker.com/r/chocobozzz/peertube-webserver/tags) for it. I just assumed it would be okay since it is an nginx container and it would be unlikely for it to break between versions.

And the other images where all versioned or stateless.

Cool. So I now know the configuration that's presently running, and I can begin my work.

Also, `lsb_release -a` told me that the host system was running Debian Buster (version 10).

## What needs to be done

I had just two goals:

- Upgrade peertube to the latest version
- Upgrade the host debian to the latest version

Debian puts lots of care into making it possible to easily upgrade the system. And therefore I wasn't worried much about that.

Peertube had some complications. First, their recommended installation method is to install [directly on the host device](https://docs.joinpeertube.org/install/any-os) and much of the documentation is based on the assumption that this is the way people install it. The [upgrade step](https://docs.joinpeertube.org/install/docker#upgrade) in docker part of documentation simply asks to pull and restart. This wouldn't work obviously.

Thankfully, Peertube maintains a [very good changelog](https://github.com/Chocobozzz/PeerTube/blob/develop/CHANGELOG.md) which details the steps required to be done for each version upgrade, starting from very long ago versions. (This is great, as a lot of software starts maintaing changelog only after a particular point of maturity and it would be very difficult to find the exact instructions for each version).

If Peertube had automatic migrations, we wouldn't even have to worry about all this. We would just have to update to the latest version at once.

But there were a few things we had to carefully migrate — configuration changes, manual steps corresponding to architectural changes.

So, I decided that the strategy would be:

1. Set docker-compose to the exact version 2.2.0
2. Increment the version one by one, making migrations as per changelog as we go
3. Repeat step 2 till reaching 7.3.0

## Doing it

Before I would make any change, I first tried to see if I could restart the system and make it come back online. I did a `docker-compose down` and a `docker-compose up -d` and had the system go down and come back online (verified through visiting the site on the browser). This gave me confidence that I'm working with a system that is not in a broken state.

Next, as planned, I changed the version tag of peertube to `image: chocobozzz/peertube:v2.2.0-buster` and restarted. It was working, as expected.

Then `image: chocobozzz/peertube:v2.3.0-buster`, and so on...

I took a shortcut with configuration changes.

Instead of adding configurations manually for each version, I downloaded the latest configuration set from peertube's github (peertube-version), the present configuration from docker-volume/config (vfi-version) and did a three way merge into a new file (new-version) on my local computer using `meld peertube-version new-version vfi-version`

This shortcut works as long as new paramteres are being added to the configuration set. The older app version will just ignore (or not use) these parameters.

But there were some steps where the existing parameters had to change (especially [in v6.0.0](https://github.com/Chocobozzz/PeerTube/blob/develop/CHANGELOG.md#v600)). And this I had to manually change by keeping the older configuration till I crossed this version and switching to the new one at the crossing point.

When doing these incremental updates, at some point, I hit [docker hub pull limits](https://docs.docker.com/docker-hub/usage/). I had also reached a version they said docker compose 2.x was needed. Then I decided to pause the peertube upgrades and switch to upgrading the host system.

Since all the data was on an attached volume, the easy way to do the upgrade would have been to simply disconnect the volume and attach it to a freshly minted Debian Trixie image. But I didn't want to chase access to the hetzner cloud, so I did it the riskier way of in-place upgrade following instructions from release notes of [bullseye](https://www.debian.org/releases/bullseye/amd64/release-notes.en.txt), [bookworm](https://www.debian.org/releases/bookworm/amd64/release-notes.en.txt), and [trixie](https://www.debian.org/releases/trixie/release-notes/upgrading.en.html), being careful not to override sudoers configuration.

After doing that and installing the newer docker compose version, I finished the peertube upgrade. I also did some cleanup:

* Moving all the necessary files to `/mnt/videos` (the mounted volume)
* Adding the mount to `/etc/fstab` to have it mount automatically on restart
* Creating `trash` directories everywhere and moving old files to that directory.
* Documenting things in ~/README

## Things I learnt

The importance of changelog in making it easy for upgrades. Peertube has good documentation and changelog.

Some ideas about how to make configurations easier when releasing newer versions of software I write (content for another blog post)

That docker-compose uses the concept of a project name to uniquely identify running services. And this name [can be specified](https://docs.docker.com/compose/how-tos/project-name/). The file/location that was used to start a process is not important. (In retrospect this is obvious)

That it is a good idea to use specific version tags and not `master`, `latest`, etc when deploying things with docker.

[HLS](https://en.wikipedia.org/wiki/HTTP_Live_Streaming).

## Future ideas

* How to have two different peertube domains be running on the same server?
* Moving to podman?