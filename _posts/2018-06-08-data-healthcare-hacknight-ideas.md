---
layout: post
title: "Data in Healthcare Hacknight - Ideas"
tags: ["tech", "health", "ideas"]
---

##### What use can data be of in healthcare? #####

As a prequel to Fifth Elephant, HasGeek is organizing a [hacknight on data in healthcare](https://fifthelephant.in/2018-june-data-hacknight/) this weekend.

## Data in Healthcare ##

[Documentation](../why-document/) is extremely important in healthcare. This is because the stakes are high and errors/lapses can cost lives directly. Hospitals stress on documenting every detail of physician-patient interaction so if anything goes wrong, there is clear idea on what went wrong.

Documentation also helps in future visits in chronic disease like diabetes, wherein the physician can titrate doses of medications, watch for development of complications, etc.

Another use of good documentation is in doing retrospective document based studies on diseases, disease patterns.

Essentially, though, documentation in healthcare is a form of communication which is used in continuum of care and very raw unstructured, and often incomplete data. 

With electronic health records entering the scene, many patient parameters are systematically collected - like blood pressure, pulse rate, and blood investigations. But, still, a huge amount of information in healthcare is "encrypted" inside what is known as "doctor's notes" or "clinical notes".

For example, a fever is what many people come to a doctor with. This can be recorded as a temperature of say "40" degrees in an EMR. But just the value of temperature holds very little information. What is equally important in diagnosis fever is duration of fever, variations in the severity, associated features like muscle pain, headache, etc.

It is these additional information that a doctor elicits that helps them form a diagnosis and  appropriately manage the illness. When intelligent systems take over, they need to be able to capture these as well.

## Intelligent Interfaces ##

Google Calendar's event entry interface is intelligent. It understands what you are typing and responds with intelligent suggestions. On one side, you can enter information in a straight line without much clicking. And on the other side, Google gets structured data.

This is what we need in medical record software too. Intelligent interfaces that can suggest things to the doctor (or even patient?) when they start entering details. Say "F" and "Fever" pops up. The moment you choose fever multiple suggestions as to what associated features it has "Cold", "Cough", "Bodyache", and so on.

With intelligent interfaces, the question of collecting structured data becomes easier.

## Knowledge Representation ##

To develop such a software, knowledge about various diseases need to be available for the computer in a structured form. Not all symptoms have the same property. "Fever" does not have location, while "pain" has. A wound is something acute whereas a deformity is something chronic. How can a computer understand these concepts?

Is it necessary that computer understands these concepts?

Maybe computer can just use repetitions and patterns in data to "understand" data and make predictions on them?

This is what Google flu trends used to do. It fit patterns in search trends to actual flu trends and tried to predict flu thus becoming the posterchild of big data in healthcare. But what happened later is that [it failed spectacularly](https://www.forbes.com/sites/teradata/2016/03/04/the-real-reason-why-google-flu-trends-got-big-data-analytics-so-wrong/). 

What we possibly need is a middle ground where traditional knowledge is valued (especially when it comes to using the knowledge about pathophysiology of a disease in trying to predict/diagnose) and yet big data is used to come up with correlations that would otherwise have been impossible to come up with.

## Physician Assistant ##

A software designed like this can be a very strong assistant to physicians. In a busy out-patient clinic, with hundreds of distractions and barriers, doctors sometimes misdiagnose illnesses because some crucial questions are sometimes missed. But when there is an intelligent assistant who ensures that such crucial questions are not missed, then chances of misdiagnosis come down.

It can also assist the physician choose the right set of medications at the right dosage.

It can even communicate with counterparts in different clinics of the same geography and figure out if an epidemic is on the loose.

## Miscellaneous Ideas ##

### Scan Lab Reports ###

Often, laboratories have devices that do not communicate with hospital management systems. Therefore, there is a lab technician who manually enters data from the screen of a device into the standard hospital software.

Maybe it is possible to capture these through a mobile app or some sort of a camera scanner and integrate with the regular hospital management system.

**Application**: Reduces errors.

### Diabetes monitoring ###

Diabetes is a chronic disease with lots of opportunities to build solutions on (and lot of them already built).

It might be possible to build software that keeps track of sugars of many people on the same drugs; also collect other variables like what they eat, what work they do, etc. and compare and figure out why some of those patients have good control with lower doses while others do not.

**Application**: Research; Control of sugars.

### Rare Disease Diagnosis/Research ###

When large amount of systematically collected data is available, and when a few patients included in these get diagnosed with a rare disease, it gives a lot of hope in being able to find patterns that help in easier diagnosis of that disease in the next patient.

What enables this kind of research, in my opinion, is smart data collection as I envisioned above. But it might be possible to do the same with [existing datasets](https://github.com/hasgeek/public-lists/blob/master/list-of-public-datasets-related-to-healthcare.md) as well.