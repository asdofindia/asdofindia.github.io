---
layout: post
title: "Checking if Aarogya Setu's Source Code Produces the App from Play Store"
date: 2020-06-01 20:24 +0530
tag:
  - code
---

##### Aarogya Setu's Android source code is supposedly on github. How do we know if it is the real app? #####

<div class="youtube-embed">
<iframe src="https://www.youtube.com/embed/qU16qhccknQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

### Setup ###
* Get a copy of the APK (either [from a device](https://gist.github.com/oozzal/8646279) with it installed or from a web service like [apkpure](https://apkpure.com/aarogya-setu/nic.goi.aarogyasetu/))
* Clone the source code. `git clone https://github.com/nic-delhi/AarogyaSetu_Android`. If you have already, update to the latest with `git pull`
* Update `keystore.properties` as per README.
* Use a mock [google-services.json](https://github.com/firebase/quickstart-android/blob/master/mock-google-services.json). But replace the `client_info.client_id` and `client_info.android_client_info.pakcage_name` to the one expected `nic.goi.aarogyasetu`
* Create a keystore (probably using [Android Studio](https://www.youtube.com/watch?v=HNbtFTtq-8o) (Build -> Generate Signed APK))

### Build ###

* Execute the gradle task `assembleRelease`. Probably using Android Studio


### Diff ###
* Get a diff utility, like [apkdiff](https://github.com/daniellockyer/apkdiff)
* Make sure you have `meld` on your path. (`apt install meld`)
* Also, [configure meld to ignore line endings](https://rootfs.wordpress.com/2011/03/09/ubuntu-ignore-line-ending-differences-in-the-meld-tool/)
* `python apkdiff.py -o ~/reproducibility -m  ~/Downloads/Aarogya\ Setu_v1.2.2_apkpure.com.apk ~/AarogyaSetu_Android/app/build/outputs/apk/release/app-release.apk`