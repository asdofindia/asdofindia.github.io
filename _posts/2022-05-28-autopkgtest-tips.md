---
layout: post
title: "Tips for autopkgtest in Debian"
tags:
  - debian
---

##### You know how to run autopkgtest, but how to run it better? #####

When I was working on [this debian bug](https://bugs.debian.org/cgi-bin/bugreport.cgi?bug=1011973) I had to struggle to find any useful documentation on workflows related to autopkgtest. I'm just documenting some useful stuff here.

## My setup

I have an Oracle VM Virtualbox running Debian Unstable in it. I use lxc as virtual server for autopkgtest.

## Challenges

* How do we avoid autopkgtest hitting debian servers for `apt install`ing the system and dependencies every time?
* How do we debug failures quickly?

## Apt-cacher-ng

apt-cacher-ng helps to cache apt downloads and prevent hitting it again and again.

```
sudo apt-get install apt-cacher-ng
```

It should install and start the proxy. You can see it is running on port 3142:

```
$ sudo ss -lntp | grep apt-cacher-ng
LISTEN 0      250          0.0.0.0:3142      0.0.0.0:*    users:(("apt-cacher-ng",pid=53382,fd=11))
LISTEN 0      250             [::]:3142         [::]:*    users:(("apt-cacher-ng",pid=53382,fd=12))
```

Now, this will work beautifully with the host debian itself if you use auto-apt-proxy.

## Creating testbed

Autopkgtest restarts every test from a scratch debian system. These scratch systems are called testbeds. To create an lxc based testbed, we can use this command:

```
sudo autopkgtest-build-lxc debian sid
```

This will create an unstable testbed.

But if you run this command with auto-apt-proxy installed, it will detect the proxy address as "http://127.0.0.1:3142" as you will see towards the beginning of the logs.

The issue with that is that within the lxc virtual network, 127.0.0.1 means something else altogether.

You'll have to uninstall auto-apt-proxy to prevent this from happening.

Now, to find the actual address that we need we have to find the address of the lxc bridge network. The thing is, it might not be created till you create and run an autopkgtest testbed once. In my case, I had done this a few times for trial and error and the lxc bridge network was already created. So, I could find the IP address with `ip addr`:

```
$ ip addr
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host 
       valid_lft forever preferred_lft forever
2: enp0s3: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP group default qlen 1000
    link/ether 08:00:27:a8:a2:6c brd ff:ff:ff:ff:ff:ff
    inet 10.0.2.15/24 brd 10.0.2.255 scope global dynamic enp0s3
       valid_lft 55570sec preferred_lft 55570sec
    inet6 fe80::a00:27ff:fea8:a26c/64 scope link 
       valid_lft forever preferred_lft forever
3: lxcbr0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default qlen 1000
    link/ether 00:16:3e:00:00:00 brd ff:ff:ff:ff:ff:ff
    inet 10.0.3.1/24 brd 10.0.3.255 scope global lxcbr0
       valid_lft forever preferred_lft forever
    inet6 fe80::216:3eff:fe00:0/64 scope link 
       valid_lft forever preferred_lft forever
8: vethaAs5L3@if2: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue master lxcbr0 state UP group default qlen 1000
    link/ether fe:a4:48:d9:15:d9 brd ff:ff:ff:ff:ff:ff link-netnsid 0
    inet6 fe80::fca4:48ff:fed9:15d9/64 scope link 
       valid_lft forever preferred_lft forever
```

It is the address 10.0.3.1 that I was after. We can pass that to `autopkgtest-build-lxc` like this:

```
sudo AUTOPKGTEST_APT_PROXY=http://10.0.3.1:3142 autopkgtest-build-lxc debian sid
```

## Running from the current directory

If you have a package's source code in the current directory (perhaps one you created with `gbp clone`), you can do this:

```
$ autopkgtest . -- lxc --sudo autopkgtest-sid
```

This will build the package into a binary and install it in the testbed.

## Getting inside the test

If autopkgtest fails, how do we debug the failure?

That's where --shell-fail flag comes useful.

```
$ autopkgtest --shell-fail . -- lxc --sudo autopkgtest-sid
```

This will drop us into a shell within the testbed if there's a failure. From there we can edit files, run commands, etc. To re-run the test (in case of javascript team) you can do

```
# /usr/share/pkg-js-autopkgtest/runner
```

## Useful folders/files

The folder `/var/cache/apt-cacher-ng` is where apt-cacher-ng stores files. You can see if there are packages getting cached there to see if your caching setup is working.

Automatic proxy detection relies on a file in `/etc/apt/apt.conf.d`. Either `01proxy` or `auto-apt-proxy.conf`.

`/var/lib/lxc` stores your lxc containers.

