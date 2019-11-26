---
layout: post
title: "Why Will Devices Accept ARP Broadcast Messages when the destination MAC doesn't match theirs?"
tags:
  - networking
---

##### In ARP, broadcast messages are sent to the destination mac of FF:FF......FF, why will devices accept that packet then? #####

I was at [inGenius hackathon](http://www.ingeniushack.com/) as a mentor from mozilla community and Keshav asked a question that I didn't have answer to immediately. The question went something like this:

> In ARP, devices broadcast their presence with frames that have a destination address as FF:FF:FF:FF:FF:FF. The switches will forward this to all the devices present in the network, but why will these devices accept these frames given that their MAC doesn't match the destination address.

I made a guess that the broacast packets would be considered special by the protocol and that all devices will accept them, but Keshav was rightly unconvinced. So I promised I will find an answer and this post is what I think is the answer.

There is [an article that explains](https://www.laneye.com/network/how-network-works/network-switches-and-broadcast-packets.htm) the context we are talking about. But it doesn't clearly answer the question.

The wikipedia article on [Address Resolution Protocol](https://en.wikipedia.org/wiki/Address_Resolution_Protocol) has a paragraph that goes like this:

> If the cache did not produce a result for 192.168.0.55, Computer 1 has to send a broadcast ARP request message (destination FF:FF:FF:FF:FF:FF MAC address), which is accepted by all computers on the local network, requesting an answer for 192.168.0.55.

This one also does not really answer the question.

So I decided to [read the source RFC of the protocol](https://tools.ietf.org/html/rfc826). This is what it says about packet reception:

> When an address resolution packet is received, the receiving Ethernet module gives the packet to the Address Resolution module which goes through an algorithm similar to the following. Negative conditionals indicate an end of processing and a discarding of the packet.

```
?Do I have the hardware type in ar$hrd?
Yes: (almost definitely)
  [optionally check the hardware length ar$hln]
  ?Do I speak the protocol in ar$pro?
  Yes:
    [optionally check the protocol length ar$pln]
    Merge_flag := false
    If the pair <protocol type, sender protocol address> is
        already in my translation table, update the sender
        hardware address field of the entry with the new
        information in the packet and set Merge_flag to true.
    ?Am I the target protocol address?
    Yes:
      If Merge_flag is false, add the triplet <protocol type,
          sender protocol address, sender hardware address> to
          the translation table.
      ?Is the opcode ares_op$REQUEST?  (NOW look at the opcode!!)
      Yes:
        Swap hardware and protocol fields, putting the local
            hardware and protocol addresses in the sender fields.
        Set the ar$op field to ares_op$REPLY
        Send the packet to the (new) target hardware address on
            the same hardware on which the request was received.
```

That is how packets are received. But it isn't quite clear if this answers the question.

Finally, in a desperate attempt to resolve the issue, I read the book "Computer networking : a top-down approach" and that said

> the frame containing the ARP query is received by all the other adapters on the subnet, and (because of the broadcast address) each adapter passes the ARP packet within the frame up to its ARP module

I guess my hunch was indeed right. The broadcast address is a special address. I spent a few days trying to find some source code that shows this implemented, but couldn't find anything (or rather, couldn't understand most of the C code I saw). It would be nice if any of the readers can [point me to such code](../comments/)

