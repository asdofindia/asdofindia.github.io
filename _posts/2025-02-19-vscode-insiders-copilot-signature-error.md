---
layout: post
title: Solving 'UnknownError' with GitHub Copilot on VS Code Insiders in Arch Linux
date: 2025-02-19 10:32 +0530
---

If you are using Visual Studio Code Insiders on Arch Linux and encounter the error message `signature verification failed with 'UnknownError' error` when trying to start using GitHub Copilot, here is a solution to resolve it.

## Error Description

When attempting to use GitHub Copilot, you might see the following error message:

```
signature verification failed with 'UnknownError' error
```

This error occurs due to the extension signature verification process in VS Code Insiders.

## Solution

To fix this issue, you need to change the VS Code setting to disable extension signature verification. Follow these steps:

1. Open VS Code Insiders.
2. Go to `Settings` (you can open it by pressing `Ctrl + ,` or navigating through the menu `File > Preferences > Settings`).
3. In the search bar, type `extensions.verifySignature`.
4. Uncheck the option `Extensions: Verify Signature`.

After making this change, try setting up GitHub Copilot again. The error should be resolved.

## Conclusion

Disabling the extension signature verification in VS Code Insiders can help you bypass the `UnknownError` and get GitHub Copilot working on Arch Linux. Remember to re-enable this setting if you encounter any security concerns in the future.
