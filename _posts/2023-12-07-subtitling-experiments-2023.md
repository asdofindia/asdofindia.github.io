---
layout: post
title: "Subtitling Experiments 2023"
tags:
  - languages
  - foss
  - ai
---

##### Is it the best time to be alive as a subtitle-r? #####

This year I've been dealing with subtitles in many ways. Yes, I mean, that text which appears under videos writing down what is spoken.

It helps in many ways:
- Those who can't hear well permanently or temporarily can read it and follow along
- Those who aren't good with the language can understand what's spoken
- It allows you to go through videos faster as you can probably read faster than you listen
- (On interfaces that support it, like YouTube) It is possible to seek to specific point by searching for the words

### Automatic subtitles

At SOCHARA's School of Public Health Equity and Action, there is a very big challenge in creating learning materials for learners in all languages. We have been hoping to get the new generation AI tools to help us in some ways. And it's slowly becoming a reality.

First we thought we will generate proper English subtitles (our videos are often created primarily in English) through manual editing of potentially machine generated subtitles. And then using this we could summarize the topic (using LLM tools like ChatGPT) and then translate those summaries to various languages (using tools like Google Translate). 

Towards this, [Hrishikesh Barman](https://github.com/geekodour) who's part of the GLAMWW workgroup of SOCHARA built a tool called [wscribe](https://github.com/geekodour/wscribe) to generate subtitles using [faster-whisper](https://github.com/SYSTRAN/faster-whisper) and a [frontend to edit this manually](https://wscribe-editor.geekodour.org/).

We also figured out that we can run this online completely free using Google colab using a [notebook like this](https://colab.research.google.com/github/lewangdev/whisper-youtube/blob/main/faster_whisper_youtube.ipynb). This was a huge boon for me because [my LC230](../liberated-computer/) takes hours to run anything related to AI.

Interestingly, that notebook can also be used to generate English subtitles for Indian language videos. This was useful for me in another project that I was consulting for.

### Manual subtitling

But for the best quality, I'm still stuck with manual subtitling. I use [aegisub](https://aegisub.org/) for this. The workflow look roughly like this:

* Open video
* Mouse click left and right can be used to control the length of the selection (of the line that's being subtitled). Left click chooses beginning, right click chooses end.
* Use space (or tab and space if you're focused in the editor area) to play the selected segment
* Click in the editor and type the subtitle
* Press enter to commit and add next segment and line
* Space to play
* Right click to choose end point. (You can also use v to extend the selection by a bit at the end)
* Type
* Continue...

By default Aegisub uses ass format, but you can export to other formats.

### Etching subtitles into videos

Here are some links that help in this:

* https://stackoverflow.com/questions/21363334/how-to-add-font-size-in-subtitles-in-ffmpeg-video-filter/21369850#21369850
* https://superuser.com/questions/1010102/how-to-select-font-for-burning-subtitles-with-ffmpeg
* https://stackoverflow.com/questions/25870169/how-to-set-background-to-subtitle-in-ffmpeg
* https://www.baeldung.com/linux/subtitles-ffmpeg

There are mainly two ways of adding subtitles:

* `ffmpeg -i video1.mp4 -vf ass=video1.ass video1-hard.mp4`
* `ffmpeg -i video1.mp4 -i video1.ass -c copy -c:s mov_text -metadata:s:s:0 language=eng video1-soft.mp4`


The former passes the subtitle as a video filter thereby hard etching it. Meaning you can't turn off the subtitle, it becomes pixels of the video.

The latter adds it as metadata and makes it part of the video (so you don't need a separate file), but in a way that it can be turned off and styled differently.


I had 6 videos to do this for, so I came up with a bash script to do this. I kept the videos named as `video1.mp4`, `video2.mp4`, etc in the folder `inputs`. Then I put the names of the video in the array names.

I also had a `small` flag that would create scaled down previews for initial drafts to be shared.

```bash
#!/bin/bash
set -x

names=(
 "Name of video 1"
 "Name of video 2"
 "Name of video 3"
 "Name of video 4"
 "Name of video 5"
 "Name of video 6"
)

convert() {
    local index=$1
    local small=$2
    local video="video$((index + 1))"
    local name="${names[index]}"
    local vf_option
    if [ "$small" = true ]; then
        vf_option="scale=320:-1, ass=inputs/${video}.ass"
    else
        vf_option="ass=inputs/${video}.ass"
    fi
    yes n | ffmpeg -i "inputs/${video}.mp4" -vf "$vf_option" "outputs/${name}.mp4"
    cp "inputs/${video}.ass" "outputs/${name}.ass"
}

v=0
while [ "$v" -lt 6 ]; do
    convert "$v" false
    ((v++))
done
```

As you can see, I've done the hard etching here.


### YouTube's auto-translation of auto-generated subtitles

I've recently discovered that YouTube allows to automatically translate subtitle, and since YouTube can also automatically generate subtitle, this means it can effectively solve our original problem at SOPHEA.

It is also conveniently possible to download these subtitles using `yt-dlp` like this:

```bash
yt-dlp --write-auto-sub --skip-download --sub-lang kn "https://www.youtube.com/watch?v=XXXXXXXX"
```

This downloads the Kannada (kn) subtitle for a video, without downloading the actual video.