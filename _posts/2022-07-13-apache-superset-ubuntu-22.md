---
layout: post
title: "Installing Apache Superset on Ubuntu 22.04 in July 2022"
tags:
  - code
---

##### Apache superset has some fragile libraries. It took a while for me to install it on my computer. This is the documentation #####

It is python3.10 in Ubuntu 22.04. But, numpy doesn't support that version. And superset needs numpy.

So, we have to first install a lower python version. Superset uses some python3.8 features, which means a minimum of 3.8 is required.

Different python versions can be obtained from [deadsnake's ppa](https://launchpad.net/%7Edeadsnakes/+archive/ubuntu/ppa)

```
sudo add-apt-repository ppa:deadsnakes/ppa
sudo apt update
```

Now, we have to install a few python stuff

```
sudo apt install python3.8 python3.8-dev python3.8-venv
```

The -dev library is required for `python-geohash` which is a dependency.

Now we can start installation.

```
python3.8 -m venv venv
source venv/bin/activate
pip install apache-superset
```

The markupsafe version is broken. We have to downgrade it.

```
pip install markupsafe==2.0.1
```

Now proceed with superset initializations

```
export FLASK_APP=superset
superset fab create-admin

superset db upgrade

superset load_examples

superset init
```

Finally you can run it

```
superset run -p 8088 -h 0.0.0.0 --with-threads --reload --debugger
```

### Windows

If you are a Windows user you are better off installing Linux.

If that's not possible you can use VirtualBox and install Linux inside that.

If even that's not possible, docker desktop with WSL might be an option for you.

If you want to try installing from scratch, make sure that you have "Build Tools for Visual Studio 2022" installed [from](https://visualstudio.microsoft.com/downloads/?q=build+tools) (scroll down on that page. It is not visual studio code)
