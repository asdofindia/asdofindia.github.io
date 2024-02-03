---
layout: post
title: "Concepts in Linux"
tags:
  - freedom
---

##### There are a few fundamental concpets in Linux family of operating systems that one needs to be aware of before one can be proficient in using Linux #####

**Note: This post wasn't published till 3rd February, 2024 because I lost interest in it. It eventually got published (at the older date) because I didn't want to just discard them. But it hasn't been updated or completed.**

### Command-Line ###

The Graphical User Interface is a familiar interface for those who have used Android/Windows/Websites. GUIs are driven by touch or mouse. You touch something, it is inspired into action. Command line is an alternative to GUI that uses a Text User Interface. Instead of touching, you type a command and that inspires action. There are many software that can be run both through a graphical interface and a command line interface. Let us look at file managers.

You have the "Desktop" folder open on your file manager (GUI). The files and folders inside "Desktop" are represented by small icons in a pane (probably with a thumbnail) in this software. To open a file, you double click on it. To delete a file you click on it and press "Delete" on your keyboard (or you right click and choose "delete" in the context menu). To make a copy of the file you right click the file, choose "copy" and then right click in an empty space and choose "paste".

All of these actions can be performed using command-line as well. First one opens the command-line itself through a program like "Gnome Terminal" or "Konsole". Then one opens the "Desktop" folder (changes the directory) by doing `cd Desktop`. To see the files and folders inside Desktop now one does `ls` which lists the files and directories as lines of text with the name of each file/directory representing them. Since there is nothing to click, the name forms the way to interact with these. For example, if I have to delete a file named "useless-file", I would do `rm useless-file` where I'm asking the computer to remove that file. If I want to make a copy of `useful-file` by the name `backup-of-useful`, I would do `cp useful-file backup-of-useful`. To see the state of the folder (what files are present, what files aren't), I would have to run `ls` again.

With GUIs things are usually "out there" represented graphically and you interact with them. With command-line you form a mental image of those things in your mind and keep updating the mental image as you run various commands on the things.

### Commands can behave differently based on parameters ###

We saw the `ls` command above. It shows us the names of files in the directory we are in (the folder we have opened). What if I want to see not just the name, but also the size of the files? We can run `ls -s` which displays the size of each file along with the name. 

Meanwhile, here're a couple of other common concepts - "system-wide configuration" and "lookup paths". 

By now you probably are aware of the [Filesystem Hierarchy Standard](https://en.wikipedia.org/wiki/Filesystem_Hierarchy_Standard) and the organization of files in Linux family of operating systems (including Debian). Everything in linux is a file and every file is connected to one tree and this tree starts at the root (trees in real life have roots that branch out under the soil. But in the software tree, the tree ends (or begins?) at just one root).  This "root" is what is `/` at the beginning of paths. (Not to be confused with the "root" user who has full access to all things on the Linux system). 


Now imagine there is a text editor software installed on this computer. By default this editor comes with a "dark theme". But it does support "configuring" the theme and choosing between "dark", "red", "blue", "light"


Here's an aside on "configuration" in Linux. Almost all software has various configurations/preferences/settings. On Android, for example, these are changed by going to three dot menu -> Settings (in many applications). In Linux there are applications like Firefox which offer a GUI to edit configurtion (Edit -> Preferences). But many apps (especially command-line applications) are configured in text files. These files are called configuration files.


Our text editor therefore can be configured by editing a configuration file. In Linux, most software support specifying multiple configuration files that apply hierarchically and changes the software's behaviour/configuration for different set of users.


There can be a "system-wide configuration". This configuration usually is inside the `/etc` folder. 

Now, as per filesystem hierarchy, there is the folder `/etc` where I put system wide configuration. By default only the root user can edit files in `/etc`. But on my computer there could be several users. There could be a user `sonnie`, or a user `akshay`. I might only trust `sonnie` and not `akshay`. I can give the root password to `sonnie`.
