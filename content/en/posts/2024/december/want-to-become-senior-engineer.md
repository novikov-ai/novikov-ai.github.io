---
title: Want to Become a Senior Engineer? Start with Mindset
slug: want-to-become-senior-engineer                 
date: 2024-12-19T23:32:28+03:00
draft: false                                  
params:
  author: Alexander Novikov                  
  ShowCodeCopyButtons: true
  ShowPostNavLinks: true
  tags: [grow, culture]                
weight: 10
layout: custom-layout
---

I’ve given this topic a lot of thought.

In the past, I used to believe that a Senior specialist writes "otherworldly" code and does it quickly. They could solve any complex task and had answers to every question in their field.  

Of course, this was an exaggeration, but that’s the direction my thoughts leaned toward.

Over time, as I interacted more with engineers at this level (and even higher), I realized they often write code as slowly as juniors. And they obviously don’t have an answer to every question.

And that’s perfectly fine.

First, productivity in IT cannot be measured solely by speed—like the number of lines of code written per unit of time.  

Second, given the rapid pace of the industry, where new knowledge grows exponentially, having absolute knowledge is impossible.

❓ **So what actually sets them apart?**

A Senior developer operates with a much broader context.

Here’s an example:  
Let’s say we need to add a dependency for a new feature—a simple additional `if`, nothing more, nothing less.

### Non-Senior Thinking:
- Where to write the code  
- Check functionality  
- Write a unit test for the new logic (at best)  
- Update documentation (ideally)  

### 💪 Senior Thinking:
- What is the purpose of the new `if`? What product metrics are we targeting?  
- How critical is this functionality? Should we account for graceful degradation in edge cases?  
- Is it appropriate to implement this at the service level under consideration?  
- Have the owners of the affected service or domain been notified about the changes? (If not, align first.)  
- Will this increase the load on the service or related systems? (If yes, align first.)  
- What are the limitations for mobile clients? (e.g., dependencies on app versions, etc.)  
- What technical metrics should monitor the new code?  
- What logs need to be collected?  
- Is analytics required?  
- (...and more…)  
- Only then: where to write the code, check functionality, etc.

In practice, the actual solution might end up being identical (and the code could even be worse in some places).  

But at a high level, we see that the first approach focuses purely on solving the immediate problem without much thought about how the new code will behave post-deployment. The second approach, however, takes a strategic perspective, planning ahead, mitigating risks for yourself and neighboring teams, and ensuring a smoother future by anticipating potential pitfalls.

The difference in skill levels can be summed up as:  
A regular developer decomposes tasks, while a Senior **decomposes problems**.

This isn’t about technical skills alone—it’s about the level of abstraction at which an engineer evaluates a task, and the connections and dependencies they consider for every change.

Of course, you can’t shift your mindset in 15 seconds—even if you re-read this post. It’s a long journey of self-improvement that comes with experience.

*Read the original post and join the discussion on Telegram: [@time2code](https://t.me/time2code/326)*