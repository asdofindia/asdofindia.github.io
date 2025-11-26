+++
date = '2025-11-26T15:29:50+05:30'
title = 'MediaWiki Extension: BlocklistEmailDomains'
type = 'post'
tags = ['project']
+++

##### I built an extension for mediawiki to prevent spam sign-ups. This is the story #####

I've been working on building a wiki for health (including its social determinants) in India. In that process I've been fighting spam by installing various extensions (including [StopForumSpam which I wrote about](https://asd.learnlearn.in/setting-up-stop-forum-spam-on-mediawiki/)).

There's a limit to how much extensions can do, and therefore I had made it such that only accounts with confirmed email address can edit the wiki. Even then I was getting spam sign-ups!

People were using temporary/disposable email addresses like dynainbox.com and mailmenot.io to sign-up and confirm their accounts. I did not like this. I did not want to disable sign-ups completely either. So I decided to look for an extension that would prevent sign-ups from known bad domains. Surprisingly, there wasn't one that fit my needs.

There was a [UnifiedExtensionForFemiWiki](https://www.mediawiki.org/wiki/Extension:UnifiedExtensionForFemiwiki) which had some [prior art](https://github.com/femiwiki/UnifiedExtensionForFemiwiki/blob/3a3ca2cab751ab1cdbb4737a91188403db44b74c/includes/HookHandlers/SpamEmail.php#L49) that I could rely on showing the use of isValidEmailAddr hook.

But I found a better "hook" in the [AntiSpam](https://www.mediawiki.org/wiki/Extension:Antispam) extension that used [PreAuthenticationProvider](https://github.com/CleanTalk/mediawiki-antispam/blob/8319ffe2eaf97619831382e1a9508b48f762c2c2/Antispam/Antispam.auth.php#L7) for directly hooking into the step before account creation.

Though documentation for this was very limited, I could look at the implementations of AntiSpam, ThrottlePreAuthenticationProvider, etc to get a sense of what had to be done. I just had to implement the provider interface with `testForAccountCreation` method. The method would receive the potential user as its first parameter, I can get the email from `$user->$mEmail`, and then check it with any list, and return a `Status::newGood()` or `Status::newFatal($message)` based on the result.

## Learning PHP

Since I have resolved not to use LLMs anymore for coding, I had to struggle with PHP syntax.

I couldn't find a nice learning resource for PHP online and had to eventually download a PHP book.

I had to learn the following:
* [composer](https://getcomposer.org/)
* [phpunit](https://phpunit.de/)
* Namespace and autoloading in PHP
* Class, instance variables, and the like in PHP
* Looping, array manipulation, string manipulation, and the like in PHP

I'm still not sure about how the type system operates, how to configure my IDE to work correctly with the linting/formatting suggested by MediaWiki extension [boilerplate](https://github.com/wikimedia/mediawiki-extensions-BoilerPlate/), etc.

## Struggling with file

I initially used [file](https://www.php.net/manual/en/function.file.php) function to read the file and struggled to get the domain matching identify bad domains.

Eventually I switched to [file_get_contents](https://www.php.net/manual/en/function.file-get-contents.php) and manually split the lines into an array.

As I'm writing this blog post I'm realizing that what happened was that file includes the newline at the end and therefore would have mangled my `in_array` check. I should have used `FILE_IGNORE_NEW_LINES` to get rid of the newlines. What threw me off was that in my unit test, I had written just one domain without newline and therefore it got correctly parsed.

I'll rewrite the function by the time this blog post is published.

## Blocklist

I considered the idea of distributing my own blocklist or fetching blocklist automatically from the internet. Then I realized this would encourage spammers to use domains that are not included in this "official" blocklist. So I let it for each admin to have a bit of obscurity into which blocklist they are using.

## Downloading

You can download the extension [here](https://github.com/asdofindia/BlocklistEmailDomains/) and find the documentation [here](https://learnlearn.in/blocklistemaildomains/).
