+++
date = '2026-03-21T12:41:48+05:30'
title = 'Poshan Tracker Face Verification'
type = 'post'
tags = ['investigation']
+++

##### Decompiling Poshan Tracker app to inspect its face verification functionality #####

[A Decode investigation reported that "AI Facial Recognition Is Denying Food To Pregnant Women Across India"](https://www.boomlive.in/decode/ai-facial-recognition-is-denying-food-to-pregnant-women-across-india-30878) on March 19. The article is worth reading and includes quotes from several people with lived experience talking about the exclusionary systems being designed.

As a public health professional who has been looking at Poshan Tracker and other digital intrusions intermittently, I agree with the political statement the article is making and stand by it. It has been pointed out for years that [Digital health obsession has compromised care in anganwadis](https://nivarana.org/reality-check/digital-health-obsession-has-compromised-care-in-anganwadis). It has also been pointed out that [surveillance apps in welfare is nothing but snake oil](https://www.thehindu.com/opinion/lead/surveillance-apps-in-welfare-snake-oil-for-accountability/article70369384.ece).

## The eyesore

But when I was reading this article, the technical aspect of it didn't make sense to me. The article seemed to rely on just the presence of Google ML Kit in the `AndroidManifest.xml` to state that ML Kit was being used for face verification/matching. It even included a quote from Google:

> Google said that ML Kit “does not have facial recognition capabilities” and is not designed to identify specific individuals

But it went on to frame this as a design flow:

> A Fundamental Design Flaw
>
> Anoop, tech researcher, said the problem goes beyond implementation and points to a fundamental design flaw. He explained, “At its core, ML Kit is designed to detect faces, not reliably recognise people over time,” he said.

## The hypothesis

As a critical thinker, I came up with an alternative explanation. 

* **Maybe** ML Kit was being used just to draw a rectangle around the face when the worker was taking the photograph.

UIDAI is supposed to provide a [face verification API](https://uidai.gov.in/images/resource/Aadhaar_Authentication_API-2.5_Revision-1_of_January_2022.pdf) (pdf, page 19)

* **Maybe** they are sending the photo to UIDIA to do the face authentication

## The methodology

Whatever be the hypothesis, the method to proceed would be to look at how the app really operates. There are two ways to do it:
1. Dynamic analysis - look at the app while it is running
2. Static analysis - look at the code

### Dynamic analysis

If I was doing dynamic analysis, I would first check whether the app was able to do face verification/matching offline. If we could, for example, turn off internet at the last moment between photo capture and verification, and it still gave a result, then we would know that the verification was being done offline. That would rule out the use of Aadhaar authentication API.

If the app refused to function when internet is off, then it would require a slightly more involved proxy setup where I routed all traffic from the app via a software I control and check for whether it makes any internet call in that verification phase.

In any case, doing a dynamic analysis requires running the app (bypassing credentials) and interacting with the servers of Poshan Tracker. This I didn't want to do.

### Static analysis

With static analysis, you don't disturb the system in any way. All you're doing is looking at the code and trying to figure out what it does.

Unfortunately, the Government hasn't asked the vendors here to publish the source code of Poshan Tracker despite it being built with public money. This is a violation of the Constitutional spirit and GoI's [policy on adoption of open source software](https://www.meity.gov.in/static/uploads/2024/05/policy_on_adoption_of_oss.pdf).

So, it falls upon us to decompile the APK and try to figure out what it does. The more obfuscated the code is, the harder it becomes to be certain about what it does. But still we can find some properties by looking at the code.

## The results

### APK source

First, I downloaded the APK (XAPX) version 25.2.5 from two sources:
- [APKPure](https://poshan-tracker.en.softonic.com/android/download)
- [Softonic](https://poshan-tracker.en.softonic.com/android/download)

The md5sum of both sources where `72ceb4e1993e7cefe58775ac8571d460` and the size was `199M` (`208514024` bytes).

### Extraction

I used `apktool` to decompress the XAPK, and then again decompile the main APK.

```
apktool d com.poshantracker_25.2.5.xapk
apktool d com.poshantracker_25.2.5.xapk.out/unknown/com.poshantracker.apk
```

I also used `jadx-gui` for the second step (to be able to view the result in a more user friendly way).

### Needle in the haystack

With decompiled source code, reading the whole source code to find out the program flow or lifecycle of the app is very complicated (for me). So, I used search based investigation where I search for key terms that might show up in the app and then read the code around that term. This creates a **major limitation in the methodology** as it is quite possible that some code is included in the app without actually being used, and vice versa some code that is being used might not be discovered by the researcher.

In some sense, Anoop was doing the same, except Anoop stopped at the easiest step of looking at the `AndroidManifest.xml` and making inferences based on that.

### Architecture

The present architecture of the Poshan Tracker android app includes:
- React Native - the frontend that is actually seen by people and is included in Decode's photos.
- Kotlin - the glue code of Android
- [Chaquopy](https://chaquo.com/chaquopy/) - SPOILER ALERT: the face verification system in python

### 199 MB?

Usually an app like this would be about 50MB. But this one is almost 200MB. Why?

Use `ncdu` and you see that `48.2%` of the size is contributed by `assets` and >80% of that is by chaquopy. Or alternatively,

```bash
$ eza -lDT -rs size --total-size --no-permissions --no-user --no-time --no-quotes -L2 | head -n 20
 322M .
 182M ├── assets
 157M │   ├── chaquopy
10.0M │   ├── fonts
 4.3M │   ├── models_bundled
 1.5M │   ├── net
 3.8k │   └── dexopt
  68M ├── smali_classes2
  38M │   ├── com
 3.7M │   ├── okhttp3
 3.3M │   ├── net
 1.6M │   ├── r8
 1.2M │   ├── q8
 1.1M │   ├── zb
 1.0M │   ├── Fa
 978k │   ├── io
 760k │   ├── b7
 754k │   ├── okio
 595k │   ├── f9
 541k │   ├── ta
```

If they bundled an asset that adds almost 100MB to an app that is downloaded all over India by Anganwadi workers, then they probably really wanted that asset. (Although if one looks at the fonts folder, one can also assume that these developers didn't bother a bit about decreasing the bundle size).

### Chaquopy

[Chaquopy](https://chaquo.com/chaquopy/) is a way to run python inside Android. It is very rare to run python inside Android.

When we look inside the chaquopy folder inside assets, we see several files with `.imy` format with `app.imy` being the largest one.

```bash
$ ls -lh assets/chaquopy/
total 144M
-rw-r--r-- 1 asd asd  89M Mar 20 12:54 app.imy
-rw-r--r-- 1 asd asd 419K Mar 20 12:54 bootstrap.imy
drwxr-xr-x 6 asd asd 4.0K Mar 20 12:54 bootstrap-native
-rw-r--r-- 1 asd asd 5.3K Mar 20 12:54 build.json
-rw-r--r-- 1 asd asd 284K Mar 20 12:54 cacert.pem
-rw-r--r-- 1 asd asd  11M Mar 20 12:54 requirements-arm64-v8a.imy
-rw-r--r-- 1 asd asd 9.3M Mar 20 12:54 requirements-armeabi-v7a.imy
-rw-r--r-- 1 asd asd 2.8M Mar 20 12:54 requirements-common.imy
-rw-r--r-- 1 asd asd  13M Mar 20 12:54 requirements-x86_64.imy
-rw-r--r-- 1 asd asd  11M Mar 20 12:54 requirements-x86.imy
-rw-r--r-- 1 asd asd 1.4M Mar 20 12:54 stdlib-arm64-v8a.imy
-rw-r--r-- 1 asd asd 1.3M Mar 20 12:54 stdlib-armeabi-v7a.imy
-rw-r--r-- 1 asd asd 2.9M Mar 20 12:54 stdlib-common.imy
-rw-r--r-- 1 asd asd 1.5M Mar 20 12:54 stdlib-x86_64.imy
-rw-r--r-- 1 asd asd 1.4M Mar 20 12:54 stdlib-x86.imy
```

These are just zip files and can be extracted with `unzip`.

The most important one (and the largest one) is `app.imy` and I unzipped that to see the following:

```bash
$ eza --tree --long app
drwxr-xr-x    - asd 21 Mar 13:41 app
drwxr-xr-x    - asd  1 Feb  1980 ├── face_matching_models
.rw-r--r--  22M asd  1 Feb  1980 │   ├── dlib_face_recognition_resnet_model_v1.dat
.rw-r--r-- 100M asd  1 Feb  1980 │   └── shape_predictor_68_face_landmarks.dat
.rw-r--r-- 4.0k asd  1 Feb  1980 └── script.pyc
$ file app/script.pyc 
app/script.pyc: Byte-compiled Python module for CPython 3.8 (magic: 3413), timestamp-based, .py timestamp: Tue Feb 18 05:59:10 2025 UTC, .py size: 5165 bytes
```

So you have a folder with two face matching models and a compiled python script.

We will come back to this folder after briefly looking at what we could find with React Native and the decompiled java.

### Keywords search in decompiled java

Within `jadx` I tried several keywords like "https", "uidai", "face", "verification", "matching", "ekyc", and so on. I was able to find two very important classes: `FaceRecognitionActivity` and `FaceVerificationActivity`. 

For example, here's one function:

```java
    public final void b(InterfaceC0288b callback, List messageArray, String faceEmbedding, double d10, int i10, double d11, double d12, boolean z10, boolean z11, boolean z12, boolean z13, boolean z14) {
        j.f(callback, "callback");
        j.f(messageArray, "messageArray");
        j.f(faceEmbedding, "faceEmbedding");
        Intent intent = new Intent(this.f31064a, (Class<?>) FaceVerificationActivity.class);
        intent.putExtra("messageArray", (String[]) messageArray.toArray(new String[0]));
        intent.putExtra("checkFaceDirection", z10);
        intent.putExtra("checkEyesOpen", z11);
        intent.putExtra("checkFaceWidthRatio", z12);
        intent.putExtra("checkImageBlurry", z13);
        intent.putExtra("checkImageBrightness", z14);
        intent.putExtra("faceEmbedding", faceEmbedding);
        intent.putExtra("verificationThreshold", d10);
        intent.putExtra("blurThreshold", i10);
        intent.putExtra("darkThresholdLightning", (float) d11);
        intent.putExtra("brightThresholdLightning", (float) d12);
        intent.addFlags(268435456);
        FaceVerificationActivity.f30985C0.b(new d(callback));
        this.f31064a.startActivity(intent);
    }
```

With some searching around, I could see that there are functions decorated as `@ReactMethod` in `ImageCaptureModule` that called into these, like `checkMatching`

```
    @ReactMethod
    public void checkFacMatching(ReadableArray readableArray, String str, Promise promise) {
        com.poshantracker.facerecognitionlibrary.b bVar = new com.poshantracker.facerecognitionlibrary.b(this.reactContext);
        int size = readableArray.size();
        String[] strArr = new String[size];
        for (int i10 = 0; i10 < size; i10++) {
            strArr[i10] = readableArray.getString(i10);
        }
        bVar.b(new b(promise), Arrays.asList(strArr), str, 0.4d, 2000, 90.0d, 200.0d, true, true, false, false, false);
    }
```

**Notice** the number 0.4d. That's the verification threshold being passed into the face matching module.

The `FaceVerificationActivity` calls into chaquopy and calls a function called `create_embedding_and_match_faces`

```
        PyObject module = python.getModule("script");
        kotlin.jvm.internal.j.e(module, "getModule(...)");
        this.f31019x0 = module;
        if (module == null) {
            kotlin.jvm.internal.j.t("module");
            module = null;
        }
        Object obj = module.get((Object) "create_embedding_and_match_faces");
        kotlin.jvm.internal.j.c(obj);
        this.f31020y0 = (PyObject) obj;
```

So, we can see that this is all glue code. But we also see some important configuration parameters.

### React Native

The react native code is bundled in assets/index.android.bundle and is in the following format:

```bash
$ file assets/index.android.bundle 
assets/index.android.bundle: Hermes JavaScript bytecode, version 96
```

By decompiling this with [hermes-dec](https://github.com/P1sec/hermes-dec) one is able to see that `checkFacMatching` is indeed called.

One can also see several API endpoints, error/success messages, and other descriptive text in this part of the code.

### Decompiling script.pyc

So, the one part which might hold answers to a lot of our questions is the python script. Unfortunately the decompilers like [decompile3](https://github.com/rocky/python-decompile3), uncompyle6, and [pycdc](https://github.com/zrax/pycdc) were erring out. And I started watching a [talk by Rocky Bernstein](https://www.youtube.com/watch?v=H-7ZNrpsV50) who's been a decompiler maintainer and in the beginning of the talk RB says AI is not upto the mark. And then I thought, let me try AI on this, and put it through Gemini Pro. [Conversation](https://gemini.google.com/share/2f9c222c5a72). Here's its output:

```python
import os
import logging
from PIL import Image
import numpy as np
import json
import dlib
import io

logging.basicConfig(level=logging.DEBUG, format='PyTest: %(message)s')

def get_absolute_path(relative_path):
    return os.path.join(os.path.dirname(os.path.realpath(__file__)), relative_path)

def load_models():
    try:
        logging.debug('PyTest : Getting absolute path of models')
        path1 = get_absolute_path('face_matching_models/shape_predictor_68_face_landmarks.dat')
        path2 = get_absolute_path('face_matching_models/dlib_face_recognition_resnet_model_v1.dat')
        pose_predictor_68_point = dlib.shape_predictor(path1)
        logging.debug('PyTest : Loaded 68 point model')
        face_encoder = dlib.face_recognition_model_v1(path2)
        logging.debug('PyTest : Loaded face encoder')
        face_detector = dlib.get_frontal_face_detector()
        logging.debug('PyTest : Loaded face detector')
        return face_detector, pose_predictor_68_point, face_encoder
    except Exception as e:
        logging.error(f'PyTest : An error occurred in load_models function: {e}')
        return None

def face_encodings(face_image, num_jitters=1, number_of_times_to_upsample=1):
    logging.debug('PyTest : Starting face_encodings function')
    face_detector, pose_predictor_68_point, face_encoder = load_models()
    face_locations = face_detector(face_image, number_of_times_to_upsample)
    logging.debug(f'PyTest : Detected {len(face_locations)} face(s)')
    
    if len(face_locations) == 0:
        logging.debug('Returning None')
        return None
        
    try:
        face_location = face_locations[0]
        raw_landmarks = pose_predictor_68_point(face_image, face_location)
        logging.debug('PyTest : Computed raw landmarks')
        if raw_landmarks is None:
            logging.debug('PyTest: Raw_landmarks are None')
            return None
    except Exception as e:
        logging.error(f'PyTest : Error occured in Face Encoding Function: {e}')
        return None

    encoding = np.array(face_encoder.compute_face_descriptor(face_image, raw_landmarks, num_jitters))
    logging.debug('PyTest : Computed encodings for face')
    return json.dumps(encoding.tolist())

def face_distance(face_encodings, face_to_compare):
    try:
        logging.debug('PyTest : calculating distance ')
        return np.linalg.norm(face_encodings - face_to_compare, axis=1)
    except Exception as e:
        logging.error(f'PyTest : An error occurred in face_distance function: {e}')
        return None

def create_embedding_and_match_faces(image, encoding1, threshold=0.6):
    try:
        if isinstance(encoding1, str):
            encoding1 = np.array(json.loads(encoding1))
        logging.debug(f'PyTest : encoding one {type(encoding1)}')
        logging.debug(f'PyTest : encoding two {encoding1}')
        
        encoding2 = create_embedding(image)
        logging.debug(f'PyTest : encoding two {type(encoding2)}')
        logging.debug(f'PyTest : encoding two {encoding2}')
        
        if encoding2 is None:
            logging.debug('PyTest : Return None due to empty')
            return None
            
        distance = face_distance([encoding1], encoding2)[0]
        logging.debug(f'PyTest : distance is {distance}')
        
        if distance <= threshold:
            return True, distance
        return False, distance
    except Exception as e:
        logging.error(f'PyTest : An error occurred in create_embedding_and_match_faces function: {e}')
        return None

def create_embedding(image):
    try:
        logging.debug('PyTest : Starting create_embedding function')
        image_obj = Image.open(io.BytesIO(image))
        logging.debug('PyTest : Opened image')
        image_np = np.array(image_obj)
        logging.debug('PyTest : Converted image to numpy array')
        encoding = face_encodings(image_np)
        logging.debug('PyTest : Returning first encoding')
        logging.debug(f'PyTest : {encoding}')
        return encoding
    except Exception as e:
        logging.error(f'PyTest : An error occurred in create_embedding1 function: {e}')
        return None
```

While I do not know if this is accurate, I do know that the strings that show up in the file are similar/same.

So there is a great chance, that the developers of Poshan Tracker are using [dlib](https://dlib.net/) and the models `shape_predictor_68_face_landmarks` and `dlib_face_recognition_resnet_model_v1` for for doing the face matching/verification.

These are models created by Davis King, the main author of dlib, 10 years ago. The details of how they were created are present in [https://github.com/davisking/dlib-models](https://github.com/davisking/dlib-models) but suffice to say a lot of the data is coming from celebrity faces on the internet. The dlib_face_recognition_resnet_model_v1 was trained on the photos of 7485 individuals. And the shape_predictor_68_face_landmarks is trained on a 300 faces challenge handpicked after:

> The images were downloaded from google.com by making queries such as “party”, “conference”, “protests”, “football” and “celebrities”.

**References**

* https://malea.winkler.site/Publications/icip2014a.pdf
* https://www.robots.ox.ac.uk/~vgg/publications/2015/Parkhi15/parkhi15.pdf
* https://annas-archive.gd/scidb/10.1016/j.imavis.2016.01.002/


So, basically, the supplies that poor Indians should receive is gatekept by whether models trained on celebrity faces are able to find out match between a very old photo of them and their present face.

Remember the threshold of matching I talked about earlier. The default and the [highest "performance" of dlib is at 0.6](https://dlib.net/face_recognition.py.html). Here's what dlib says about distance:

> In general, if two face descriptor vectors have a Euclidean distance between them less than 0.6 then they are from the same person, otherwise they are from different people.

But our techbros behind Poshan Tracker **seems to have** increased it to 0.4. This means, only if the distance between two faces is less than 0.4 will they be matched. (I'm unsure in the maze of obfuscated code whether it is 0.4 or 0.6 that's actually used. If it is 0.6, that's better for the beneficiaries.)

## Contextualizing

There are [biases in facial recognition](https://ieeexplore.ieee.org/document/9534882), like the [other race effect](https://tsapps.nist.gov/publication/get_pdf.cfm?pub_id=906254). The age/physiology related face changes have already been spoken about in the Decode article.

These make the result of face matching algorithms probabilistic. That is, there is a non-zero chance that two photos of the same person will be declared as "not matching".

This is the #1 argument against technology like Aadhaar in welfare, and has been written about numerous times. In the Supreme Court case too, [it was clearly stated from the very beginning](https://www.scobserver.in/journal/aadhaar-analysis-of-first-13-days/) that Aadhaar is a probabilistic system.

When it comes to Poshan Tracker, it has reimplemented the probabilistic system and probably left it as a choice to a software engineer somewhere inside an AC office room to decide how much probabilistic. The difference of threshold between 0.4 and 0.6, for example, can change the result for thousands of individuals.

## Limitations

Again, these are only descriptions of what I saw. It does not mean that this is exactly how the app operates. A conclusive answer on how the app operates can be given by someone who can read bytecode magically or by the developers releasing the original source code.

## Supplements

You can find all the decompiled output in [https://github.com/asdofindia/poshan-tracker-25.2.5](https://github.com/asdofindia/poshan-tracker-25.2.5)
