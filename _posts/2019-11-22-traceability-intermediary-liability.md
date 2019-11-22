---
layout: post
title: "Traceability as a Mandatory Requirement (Intermediary Liability)"
tags:
  - tech-policy
---

##### The government of India is going to make [traceability](https://timesofindia.indiatimes.com/business/india-business/new-it-rules-to-make-traceability-of-content-must-government/articleshow/72176395.cms) mandatory in social media in order to combat the various harms various social media bring on in real world. Is it really the right way? #####

Today without any plan to do so I attended a roundtable under the topic "Intermediary Liability - Way Forward" with [MediaNama](https://www.medianama.com/) people steering the discussion. I found it very discomforting that in a roundtable that was supposed to be about the way forward in intermediary liability there was very little discussion about the bigger picture and lopsided focus on just two elements - the current hype-words - 'traceability' and 'proactive takedown' of content. It maybe that MediaNama has had previous discussions on intermediary liability in which they covered the broader topic or it could be that they simply didn't know there are other ways to discuss this. I am not sure which is the answer.

## Traceability ##

Traceability refers to the ability to find out who really uploaded/created/composed a particular piece of content on various social media (for example, whatsapp). There is a huge number of people who say that traceability is impossible/difficult and/or traceability breaks encryption/privacy. Most of them are wrong and I'll explain why.

Traceability is something most social media already do. I have [a history with WhatsApp](https://blog.learnlearn.in/2015/08/response-to-whatsapp-cease-and-desist-threat.html) and know for a fact that WhatsApp has an ID for each video that is uploaded to the platform and then forwarded around. This ID has the phone number of the original uploader within it. Yes. That is traceability already existing in the platform. When WhatsApp says they can't figure out who the originator of a message is, they are simply plainly lying.

Now, I will qualify that statement. There is end-to-end encryption on whatsapp. What does end-to-end encryption mean? That the content of the message is encrypted and cannot be eavesdropped. But, even when the content of the message is encrypted, WhatsApp **has** to authenticate that the sender is who they claim is and also **has** to know who the recipient is to be able to reliably send messages across. This means that they effectively have the metadata of who the sender and recipient are for every message on the platform. **But, they can't match which message was exchanged between which users based on just the text content of the message**

Here is where things get a bit technical. When a message is being composed on the platform, there is nothing that prevents whatsapp from attaching the sender information with the message.

When a message gets forwarded, this original sender information can also get forwarded along with it. (This is exactly how the video ID works as I explained above. When you send the same video to 100 people on WhatsApp, WhatsApp doesn't upload your video 100 times. It just uploads the video, gives it an ID, and forwards that ID to 100 people.)

Now, here is where the problem comes - if you copy paste a message, instead of hitting the forward button, none of this sender ID attachment can work. But if you really think about it, when someone copy pastes a message, don't they have some liability over that message's content? Why should the **original** composer of the message be held liable for all the copy-pasting that can happen? What if the message is copy-pasted from WhatsApp to Twitter/Facebook. What then?

Actually, why should the **original** composer be the only person who is responsible? Why should not each person in the chain be responsible for propagating fake news/child porn/whatever it is?

These are some orthogonal thoughts. Essentially my point is two things:

1. Platforms can easily implement traceability. In fact, people who make software like Tor browser struggle every day to keep their users' traffic non-traceable.
2. But, traceability should not be mandatory at all. It doesn't solve any problem and only creates problems like oppression of free speech.

## Proactive content takedown ##

This is an absolutely rubbish thing to be made into policy. Even the most sophisticated AI can correctly understand content. Forget AI, even humans cannot sometimes understand what people mean when they write things one way or the other. To proactively or automatically take illegal content down without also censoring a lot of legal content would be impossible. I don't know why people even waste their time taking these arguments seriously and talk about NLP and stuff like that.

## The real way forward ##

Although I tried to make this point in the roundtable, the moderator wasn't really helpful. The way forward in intermediary liability would be to stop considering internet as a special place where nobody is accountable to anything, and start holding [intermediaries liable](https://asd.learnlearn.in/intermediary-liability/) to a certain extent. I've written about UK's whitepaper with the "duty of care" approach in my [previous blog post](https://asd.learnlearn.in/intermediary-liability/) on this topic. That may not be the only way to do it, but any conversation which ignore's the liability of platforms and their willfull ignorance of the harms they bring on in real world are pointless and extremely short sighted in my opinion.

Traceability and content takedown and stuff like that are just really bad examples of regulation of intermediaries. Good policies would set up commissions (like the competition commission) to look into practices of companies and keep them accountable to the services they are providing. If a Facebook claims to be a social network that values privacy, there needs to be a mechanism to keep them accountable to that promise. If Twitter talks about free speech and ignores hate speech as a concern, there should be a regulatory body which can legally request them that they kindly take care of hate speech issues on their platform or get whacked.

### What about free speech, then? ###

Well, what about free speech now?

If your government does not protect free speech, no platform on earth can protect your free speech. I don't hear no WhatsApp or Facebook talking about free speech in China. Platforms will use the free speech argument to their convenience. If you let them runaway with that argument they will take the world to the mess that it is now.

You can't have a Facebook "fighting for free speech" and also [censoring content](https://learnlearn.in/facebook/#censorship). It is ideal for everyone to leave such regulations to governments all over the world.

### But my government sucks ###

Let's face it. Governments all over the world are power hungry. But if you think platforms are going to save you from your oppressive governments, you will be grossly mistaken. The platforms need you only for them to make money. They have no accountability to you. The government, at least in theory, are accountable to you. You are better off regulating platforms through government and fixing governments than letting platforms free (and these platforms fixing government the way they want).

Any argument that depends on the assumption that goes like "government is anti-people and therefore governance should not be done" is going to lead you to a lawless society. If you are not worried about the harms of such a society, you should watch the movie Joker.
