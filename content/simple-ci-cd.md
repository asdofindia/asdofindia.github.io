+++
date = '2025-11-24T12:53:03+05:30'
title = 'Simple CI/CD'
type = 'post'
tags = ['devops']
+++

##### Here's how I do CI/CD without all the fuss

You need only one thing for Continuous Integration - a working test suite.

You need only one thing for Continuous Deployment - automatic database migrations.

And you need only one thing for rolling out your own CI/CD - (web)hooks.

## What?

Let's look at how traditional CI/CD operate in github.

- You write a new feature.
- You push the commit to github.
- Github starts actions.
- The first action will be for test.
- If it passes, the second action is executed. (If the test fails, the deployment step is not executed and you have a failed workflow run)
- The second action is for deployment.
- Done

That it's done in YAML inside docker containers doesn't matter much to this flow of things.

What I do, for deploying [nivarana](https://nivarana.org/) website for example is:

- Write a new feature
- Push the commit to github
- Trigger webhook
- Execute shell script on production server
- Done

## Sample webhook setup

I use my own homegrown system called [service-manager](https://github.com/asdofindia/service-manager) for running webhooks. Service manager is simply an interface which runs specified shell scripts on the server and shows their output. In addition to a human clicking a button to do this, it allows a webhook call also to trigger the same commands. I configure it like this:

```json
{
  "services": {
    "nivarana": {
      "update": {
        "path": "/path/to/parent/directory/of/nivarana",
        "run": "update.sh",
        "webhook": "a-secret-url"
      }
    }
  }
}
```

But fact is that you just need some hook. If you [directly push to a git repo on your server](https://git-scm.com/book/en/v2/Git-on-the-Server-Getting-Git-on-a-Server) you could add [a post-receive hook](https://git-scm.com/docs/githooks) to run the same CI/CD script that a webhook might have run.

## Sample CI/CD script

The `update.sh` above is something like this:

```bash
#!/bin/bash
set -ex
echo "Starting update"

rm -rf nivarana.org.tmp  # Clean up temporary directory from previous run if existing

cp -r nivarana.org nivarana.org.tmp   # Use existing cache while building
cd nivarana.org.tmp

git pull  # fetch latest code
npm ci  # install any new dependencies

npm run build # build

cd ..
mv nivarana.org nivarana.org.bak  # backup present deployment
mv nivarana.org.tmp nivarana.org   # bring in new deployment

systemctl --user restart nivarana.org   # start the new deployment

rm -rf nivarana.org.bak # if we are here successfully, we don't need backup anymore

echo "all done"
```

I don't have CI here, but of course one could add a test step and add a [notification regarding failure](https://serverfault.com/a/266456) to achieve CI as well. (Ah, I think I'll add a notification for failure for my CD as well. Nice idea!)

You might also notice that I deploy using systemd and do not rely on docker, etc. But even if it were docker/kubernetes, it would have gone through the same steps (build, push to docker container registry, rollout to k8s)

## What happens

When I push code to github, github makes a request to the configured webhook URL example.com/a-secret-url. My service-manager is listening on that hook and runs the corresponding bash script `update.sh`. It runs all the commands needed to fetch the latest code, build, and deploy that.

## Caveats

This is just enough for this project. There might be projects with more complicated requirements which require more complicated workflows and tools.

Service-manager presently relies on obscurity of webhook URL to prevent abuse. It also doesn't have CSRF protection.

I haven't tested this system with many other projects as of now, and the workflow might need some modifications depending on other common needs.
