---
title: A Habit That Will Help You Thrive in Big Tech  
slug: habit-that-will-help-you-grow-in-big-tech                 
date: 2024-09-13T16:30:40+03:00
draft: false                                  
params:
  author: Alexander Novikov                  
  ShowCodeCopyButtons: true
  ShowPostNavLinks: true
  tags: [culture, grow]                
weight: 10
layout: custom-layout
---

One of the key competencies looked at during potential grade reviews is “engineering culture.”

At Avito, the signs of reaching level E5 (Senior) are [defined as](https://github.com/avito-tech/playbook/blob/master/developer-profile.md#e5):

- Improving the overall engineering tools of the company.
- Testing complex corner cases.
- Designing testable systems and fixing those that are hard to test.
- Identifying inefficiencies in code/architecture/test models and adding to the team’s technical backlog.
- Establishing and testing non-functional requirements or engaging experts for this purpose.
- Knowing and using safe approaches to implementing functionality.

When you aim for the next grade, it’s helpful to periodically check the expectations for that level to demonstrate your alignment with them.

What’s even more interesting is that over time, this starts to become a habit. You begin to fulfill many of these competencies not because you’re aiming for a higher level and formally want to show compliance during calibrations, but because you genuinely enjoy finding areas for improvement in systems.

Recently, I integrated a library for conducting A/B experiments into a new service. There was clear documentation with examples, along with some interesting nuances:

1.	The library could be used in several ways, one of which was to integrate it as [middleware](https://en.wikipedia.org/wiki/Middleware).

After following the documentation, nothing worked. I struggled for a long time to understand why, rereading the documentation and comments on the functions; everything seemed correct but still didn’t work.

While rereading the documentation yet again, my eye caught a comment surrounded by exclamation marks—it indicated a specific order for calling the middleware; I double-checked mine, and everything was correct.

After several hours of frustration, debugging, and testing, a strange thought crossed my mind: to do it the opposite of what the documentation said, as it seemed more logical.

As a result, everything worked.

In such moments, you can’t help but feel frustrated with those who wrote the documentation and with others who might have faced similar problems but never took the time to improve that part of it.

But, as they say, the result starts with you. So, I quickly created a pull request for the library, where I decided to document this issue clearly and remove the incorrect comment to make life easier for my colleagues and myself if I ever encounter it again.

2.	When using the library as middleware, I discovered that it couldn’t be adequately tested with unit tests.

I got the impression that I was one of the first to use this latest version of the library and to integrate it as middleware…

In short, I needed to test the handler that used the library, but it was challenging to do in unit tests because the library was accessed through a context that was enriched via the middleware.

In unit tests, we don’t work directly with the middleware, and direct context enrichment wasn’t provided.

After sharing my problem with colleagues and venting a bit, I received the suggestion to test using mocks (which, of course, was what I had initially tried to do).

Due to the complex structure, I would have had to nest the mocks like Russian dolls. So, I decided it was time to create another pull request for the main library to enable proper testing.

Once I was able to agree on all the changes and finally complete my original task, I realized that I unexpectedly improved the company’s overall engineering tool, which directly aligns with one of the expectations for engineers at the next level.

It’s nice that this situation arose spontaneously. I felt that the approach to solving tasks, focusing not only on completing my own but also striving to enhance the overall product, is becoming a habit.

This gives a pleasant sense of satisfaction and makes you a little happier and stronger as an engineer.

*Read the original post and join the discussion on Telegram: [@time2code](https://t.me/time2code/300)*