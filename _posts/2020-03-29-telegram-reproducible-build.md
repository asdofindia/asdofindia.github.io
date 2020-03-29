---
layout: post
title: "Verifying Telegram Reproducible Build Diff Tool"
tags:
  - code
---

##### A failed attempt at proving that Telegram's apkdiff.py is broken #####

I was looking at Telegram for android's [source code](https://github.com/DrKLO/Telegram) today to learn how they handle [creating the chat UI](https://blog.sendbird.com/android-chat-tutorial-building-a-messaging-ui/). Then I saw that they seem to have introduced [reproducible builds](https://core.telegram.org/reproducible-builds) at least for mobile apps.

I have heard a lot about reproducible builds but never actually thought how simple it would be to verify a build is reproducible. It is as simple as building a build on your own and diffing the output with the official release.

Telegram asks us to use [apkdiff.py](https://github.com/DrKLO/Telegram/blob/master/apkdiff.py) from their own source code to do the actual diff. Gotta be careful there, right? What if there is a bug there that causes incorrect diffing?

Turns out there indeed was a bug which was fixed after a week the file was first released. I'll post the old source code here:

```python
def compareFiles(first, second):
	while True:
		firstBytes = first.read(4096);
		secondBytes = second.read(4096);
		if firstBytes != secondBytes:
			return False

		if firstBytes != b"" or secondBytes != b"":
			break

	return True
```

Can you spot the bug? [Here's the answer](https://github.com/DrKLO/Telegram/commit/7fb9f0b85621940e0a5ba977278f6f27fc323046).

We go into the loop. We read 4096 bytes from each file. If these bytes aren't equal, the files differ. Now, if the bytes from either file is not empty (`b""`) you break out of the loop. In other words, if bytes from either file contain any content you break. That is the problem. The bytes from either file are going to contain some content unless you have both empty files (and in that latter case, you would have an infinite loop here).

Where did this error come from though? Turns out [Signal for Android has a similar apkdiff.py](https://github.com/signalapp/Signal-Android/blob/master/apkdiff/apkdiff.py). And that has a very similar function.

```python
def compareFiles(self, sourceFile, destinationFile):
    sourceChunk      = sourceFile.read(1024)
    destinationChunk = destinationFile.read(1024)

    while sourceChunk != b"" or destinationChunk != b"":
        if sourceChunk != destinationChunk:
            return False

        sourceChunk      = sourceFile.read(1024)
        destinationChunk = destinationFile.read(1024)

    return True
```

Telegram's apkdiff is obviously related to this apkdiff. This one does a same kind of check, but the loop is different and therefore doesn't have the bug. Let us go through it once. First you read some bytes from both files. Then you start a loop. As long as the bytes from either file is not empty, you keep looping. Inside the loop you first check if the bytes are the same. If they aren't, the files differ, you end the function. Then you read some more bytes from both files and continue the loop. This loop, because there is an or in it, will terminate only when bytes from both files are empty. And by definition empty == empty. So the loop condition itself does an implicit equality check at the very end.

Let us go back to the fixed Telegram code.

```python
def compareFiles(first, second):
	while True:
		firstBytes = first.read(4096);
		secondBytes = second.read(4096);
		if firstBytes != secondBytes:
			return False

		if firstBytes == b"":
			break

	return True
```

First, let us think about what the developer is trying to do here. The signal dev used a one-time only setup of the loop where they read the first bytes of both files first and then use that as the condition of the loop. But the Telegram dev didn't want to repeat the lines that read the bytes. So they initiated the loop early and then read the bytes. This is a common situation I face myself. Because the loop has to be initated with no variable at hand, it will have to be a `while True` loop. And a `while True` loop will definitely need a break statement in it. Now the break statement will be inside the loop and it can quickly get confusing. [This is exactly what makes it a bad idea](https://stackoverflow.com/questions/390481/is-while-true-with-break-bad-programming-practice).

But let's leave that debate for later. Does this code have a bug? Here only `firstBytes == b""` is checked and then the loop is broken. What if file 1 ends exactly at 8192 (4096 * 2) bytes and file 2 has some malicious code from 8193 byte onwards?

I had to make a counter-example.

I figured out that `truncate -s 8192 testfile` [gives me](https://www.ostechnix.com/create-files-certain-size-linux/) a binary testfile of size 8192 bytes. But binary files look like garbage inside vim. So I looked ahead and figured `base64 /dev/urandom | head -c 10000` [gives some ascii data](https://superuser.com/questions/692175/how-to-create-a-random-txthuman-readable-text-like-ascii-file-in-linux). I initially didn't look at head manual and did a truncate to cut the file to 8192 bytes. But turns out `head -c 8192` would have done the same thing. Anyhow, here is what I came up with:

```sh
base64 /dev/urandom | head -c 10000 > testfile
truncate -s 8192 testfile
zip apk1.apk testfile
echo "malicious code" >> testfile
zip apk2.apk testfile
python apkdiff.py apk1.apk apk2.apk
```

Well, guess what? The apkdiff did find out the difference between the files.

On a closer look at the loop above I found out why Telegram's new code works although it checks only for `firstBytes == b""`. Can you find out why? [Let me know](/about/#contact).
