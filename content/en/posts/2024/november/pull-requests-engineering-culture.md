---
title: Pull Requests as a Reflection of Engineering Culture  
slug: pull-requests-engineering-culture                 
date: 2024-11-25T23:44:02+03:00
draft: false                                  
params:
  author: Alexander Novikov                  
  ShowCodeCopyButtons: true
  ShowPostNavLinks: true
  tags: [dev, culture]
weight: 10
layout: custom-layout
---

**How do you kill any desire to review your pull request?** 

Here's a great example from the open-source project [PocketBase](https://github.com/pocketbase): [the pull request in question](https://github.com/pocketbase/pocketbase/pull/4158).  

This is, of course, hyperbole—but extremes make it easier to illustrate a point.

Here’s what we’re dealing with:  
**147** files changed, **1 commit**.

The project author’s response is hardly surprising:  
*"Thank you for spending your time on this, but this type of changes are not really welcomed as I don't really see much point of reviewing 140+ files."*

End of story...

I’ve often talked about [the importance of small steps](https://t.me/time2code/301): how they help achieve goals and overcome procrastination.

But today, let’s focus on the changes we deploy to production in a single batch.

At the beginning of the year, I reflected a bit on [commit atomicity](https://github.com/novikov-ai/tdd-based-app/tree/main/docs/step_by_step#%D0%B2%D1%8B%D0%B2%D0%BE%D0%B4%D1%8B). Let me reiterate: commit often, commit clearly—it makes life easier for both you and your colleagues.

Sure, it’s tempting to bundle all changes into a single commit labeled "refactor" and push it to the remote repository, but that’s a slippery slope you don’t want to go down.

If the importance of clear commits is obvious, pull requests (PRs) get more interesting. Here, the options vary.

Would the situation change if those 147 file changes were split across ten commits within one PR? 
 
I doubt it.

When it comes to code reviews, a well-structured pull request is a reflection of your engineering culture. It shows not only your attention to detail but also your respect for those reviewing it.

Imagine you're the owner of a horizontal service. You’ve got plenty of tasks to juggle and a responsibility to keep your service stable. On top of that, vertical teams rely on you to enable fast, independent releases so the business can grow and time-to-market (TTM) for new features remains short.

Then, you get a notification: three new pull requests are waiting for review.

### PR 1:
- "Adding new validation rules, modifying storage logic, and doing some light refactoring."  
- 16 commits (atomic, clear)  
- 5 files changed, 2 new files added (1 for validation rule tests)  

### PR 2:
- "Implementing a client for metrics and starting to write technical metrics for the Map Display feature."
- 5 commits (atomic, clear)  
- 3 files changed, 1 new file added (tests included)  

### PR 3:
- "Adding new logic as per task VRT-2231."  
- 3 commits (non-atomic)  
- 2 files changed, 1 new file added (no tests)  

Which one would you review first? My order would be:  
**2 → 1 → 3**

Here’s why:

1. **Description matters.** If it’s clear and to the point, that’s a big win. But if the first line sends you to Jira for additional context, that’s a red flag—it’s likely to drag out the review.  
2. **Incremental changes are a priority.** PR 2, with its focus on metrics, is a clear candidate for quick review. It’s straightforward, allowing for fast deployment and progress.  
3. **Complexity drives the order.** Between PRs 1 and 3, I’d start with PR 1. It’s more likely to require feedback, and I’d want to address that as quickly as possible. After all, proposing so many changes in one PR (without splitting into smaller ones) needs serious justification.  
4. PR 3 is last. Its lack of clarity and missing tests suggest it’ll take significantly more effort to review, so I’d leave it for when I have the most resources to dive into the context.

### A Note on Reality

Of course, things aren’t always perfect in practice. Waiting for code reviews can become a bottleneck.  

I’ll admit, I’ve had to submit large pull requests myself—especially when there’s no time during a sprint for multiple rounds of review (e.g., when working on a large feature and reviews take ages). But I always make an effort to explain what I did and why in detail.  

We have the power to demonstrate engineering culture and respect for our colleagues by organizing pull requests to be as atomic and clear as possible, making life easier for reviewers.


*Read the original post and join the discussion on Telegram: [@time2code](https://t.me/time2code/322)*