+++
date = '2025-09-09T11:14:11+05:30'
title = 'Building an Online Twenty Eight Game -- Part 1'
type = 'post'
tags = ['programming']
+++

##### This is a documentation of me building an online card game #####

[Twenty-Eight](https://en.wikipedia.org/wiki/Twenty-eight_(card_game)) is an important card game in my home back in Kerala. It is played usually in weekends, holidays, weddings, and other occasions. If there are 4 players and there is time, we play it.

28 is played in teams of two who sit alternatively around a table (like carroms). Only the cards 7, 8, 9, 10, J, Q, K, A are used to play. The game runs in two phases. In the first phase, a bet is made as to how many points the betting team will get. In the second phase, that team tries to get that many points. If they get as many (or more than the) points they said they'll get, then they win. If they don't they lose. Since the maximum points that can ever be won is 28, the game's name is also 28.

I am not writing all the rules here as you can find it on Wikipedia, etc. But one important feature of the game is that the betting team decides a suit as *thuruppu* (trump). And the this suit is of higher power than other suits. Of any suit, the J (*gulan*) is of the highest power. And accordingly the name "[Thuruppu Gulan](https://en.wikipedia.org/wiki/Thuruppugulan)".

Since I live in Bangalore and go home very rarely, I have not been able to play the game regularly in the last few years. So when I started my 30 days of software project, I wanted one of the software to be a 28 card game that I could use for multiplayer game. I would have loved to live-code the whole project, but between loud background noise, interruptions, and my own distractions, I wasn't able to. So, I decided to do the next best thing and write about the process.

## Stack

In the 30 days of software project I had set myself the goal for learning flutter and building desktop apps. When doing that I came across this fantastic library for building card games called [card_game](https://pub.dev/packages/card_game). There were a few games [built with it online](https://github.com/JLogical-Apps/cards). It was this library that made me think that I should build the card game.

I originally wanted to use that library and build the card game in flutter. But then I got fascinated with the idea of animations in javascript. I wanted to see how much I could achieve with javascript. And so I decided to build on a javascript/browser based stack.

For connections, I decided to use [socket.io](https://socket.io/). And on the backend I would use nodejs.

## Prototype v1

I did some rapid prototyping on the browser front and on the socket.io front.

Making a card show up with javascript is just a matter of drawing a div with a specific height, background-color, and border.

For the card face, in the prototype I just used the unicode symbols ♠, ♥, ♦, ♣ and the numbers. It also turns out that there are [specific unicode code points for each card](https://en.wikipedia.org/wiki/Playing_Cards_(Unicode_block))!

🂻, for example is Jack of Hearts!

I might write a library to convert between plain language and this unicode character.

I tried some libraries like DraggableJS, NeoDrag, etc for fancy gameplay. But I soon realized I probably don't need drag and drop functionality as I only wanted to let people click on a card and play it.

As for socket.io, I had never used it for a project and I came to realize how it would require a lot of state management, for there can be re-connects, multiple tabs (with multiple socket ids), and so on.

A more important constraint is that I wanted to hide the information about cards from other players. If player A gets 4 cards in their hand, only player A should know which cards those are. Only when player A plays a card should others come to know about the fact that player A had that card. If I shared all state with all players, it would be a vulnerability that can be exploited by more tech-savvy players.

To make this possible, I would again have to keep track of each player, their socket IDs, and their role in each game. This probably would have to be persisted to a database later too.

## Architecture

With the information I gained in the prototyping, I started thinking about an architecture that would let me keep things simple. I came up with the following.

Firstly, the **transport/connection layer** (socket.io) should be simple and unaware of the game. It would be abstracted out such that all it would do is auth and communication. I might even not rely on the "rooms" feature of socket.io.

The **game logic** would also be abstracted out into its own library that can be tested independently.

So, most of the state management, wiring up, and functionality should be in the **game platform**. The game platform would have a server component and client component. The server component would of course be more powerful, having knowledge about all the state of all the games, players, etc ensuring valid gameplay and so on. The client component of the game platform makes it easier to talk to the server component using the transport/connection layer. Whether game logic can run within the client component is something I have to verify as I build.

With this architecture I set out to build the second prototype.

Till this point I was building things with plain javascript and nodejs. I was sure I would need typescript soon. Although we could [run typescript natively in nodejs these days](https://nodejs.org/en/learn/typescript/run-natively) I would also need it in the browser. So I checkout out [vite](https://vite.dev/) for the possibility of using that. And therein came the question of whether I also wanted to use a frontend framework. I didn't want React as I've been using it in a lot of places recently. I toyed with the idea of using SvelteKit. But eventually I realized that I am probably better off with a monorepo that has separate packages for backend, frontend, and shared code.

I spent some time reading about various tools available on [monorepo.tools](https://monorepo.tools/) and almost finalized nx. Then I realized, I probably just need to use a bash script at this stage. So I just started using [npm workspaces](https://docs.npmjs.com/cli/using-npm/workspaces).

To be continued...