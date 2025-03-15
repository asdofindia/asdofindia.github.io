---
layout: post
title: "Bulk Accept Pending Messages in Google Group"
tags:
- automation
---

##### Google groups makes you accept 5 emails at a time. How can you do this in bulk? #####

In Google Groups when you have scores of pending messages, you are able to approve only 5 at a time. How to do this for all?

Just open developer console on the pending messages page, and run the following:


```js
let sleep = (ms) => new Promise((resolve, reject) => setTimeout(resolve, ms));
async function clear() {
    document.querySelector('div[title="Select all"]').click();
    await sleep(500);
    document.querySelector('div[aria-label="Approve selected messages."]').click();
    await sleep(2000);
    var xpath = "//span[text()='OK']";var matchingElement = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;matchingElement.click();
    await sleep(5000);
};

(async function() {
    for (let i = 0; i <20; i++) {
        await clear()
    }
})();

```
