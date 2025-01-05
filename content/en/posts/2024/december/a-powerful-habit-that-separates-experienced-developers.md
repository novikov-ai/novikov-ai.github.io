---
title: A Powerful Habit That Separates Experienced Developers  
slug: a-powerful-habit-that-separates-experienced-developers                 
date: 2024-12-24T14:43:41+03:00
draft: false                                  
params:
  author: Alexander Novikov                  
  ShowCodeCopyButtons: true
  ShowPostNavLinks: true
  tags: [senior, culture, grow]                
weight: 10
layout: custom-layout
---

The most valuable piece of advice I received early in my programming career: **write unit tests**.

For many inexperienced developers, the requirement to write them causes procrastination or boredom.

I still get lazy sometimes, but I still do it. And here I am not talking about the fact that in Avito for a backend developer, writing units for your logic is considered in most cases a necessary requirement for your pull request to be approved, but more about the fact that I really understand the value of this.

### ✍️ Why is it important to write unit tests:

1. In fact, this is a guarantee that the main cases for which you wrote units work, and your QA, relying on them, will be able to narrow the scope of testing and pay more attention to complex edge cases.

2. There is a 90% chance that after writing the tests you will somehow make a fix to your business logic: somewhere you missed a check for a null pointer, somewhere you forgot to handle an error, somewhere you went beyond the array limit with a random set of data, or maybe you simply did not take something into account or after the tests you realized that it would be better to add another layer of abstraction.

3. This will greatly help in supporting a large code base. For example, when many teams are working on a project, there is nothing easier than accidentally touching someone's undocumented behavior. If unit tests are written, you will immediately notice this during the next linter run (it must be configured and run on CI/CD each time).

4. This also helps with refactoring. For example, it will be very difficult for me to decide to sit down and refactor any logic if there are no units (we start from the fact that the tests are well written).

During code review, I always pay attention to the presence of unit tests. If there are none, then I don’t understand whether the author has tested their code.

Ask to cover new logic with tests or discuss why this cannot be done at the moment, paying attention to the overall complexity of testing functions (perhaps the problem is in the code, that it cannot be easily tested, which already indicates its smell).

Item #2 appeared for a reason - it is actually a reflection of my practice.

### A story from experience

Literally on the last task, when I had the PR ready and approved by the service owner, I noticed that I had not written unit tests for a certain part of the logic intended for one platform.

As a result, I spent an extra hour on tests, during which I noticed a bug affecting the functionality under certain conditions on the desktop. This was a corner case that would have been incredibly difficult to catch during manual testing (the QA was clearly pleased).

This is how a simple habit of writing tests and worrying about their absence helped our team avoid an unpleasant bug in the future, the troubleshooting of which would have clearly taken more time than an hour spent on tests + final edits.

I don't just call it a habit, because the skill of writing tests for your code should become just that. Over time, it will become part of your culture, which you will begin to transmit to younger engineers and you will not notice how your codebase has significantly increased in quality.

### 💪 How can you develop this habit?

You can configure code coverage in the IDE. But it can be annoying.

I often had situations when I could not pass the linter in the service, receiving a warning:

Low code coverage: 90.0 < 90.0

Perhaps the threshold of 90% test coverage is excessive, but 70% is an adequate minimum that should be.

Essentially, the same rules apply here as with other useful habits. Specifically, I didn’t instill it in anyone or keep a tracker with 21 days... I just forced myself to do it regularly, starting from the first days in the profession. 

Believe me, when you find a few embarrassing errors a couple of times while writing unit tests, you will be so happy that they didn’t make it to production or even review that it will automatically turn into a habit. 

*Read the original post and join the discussion in Telegram: [@time2code](https://t.me/time2code/328)*