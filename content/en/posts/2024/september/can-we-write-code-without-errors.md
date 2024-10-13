---
title: Can We Write Code Without Errors?  
slug: can-we-write-code-without-errors                 
date: 2024-09-24T16:30:28+03:00
draft: false                                  
params:
  author: Alexander Novikov                  
  ShowCodeCopyButtons: true
  ShowPostNavLinks: true
  tags: [dev]                
weight: 10                                   
---

My answer: no.

And it’s not about the mistakes we make accidentally due to carelessness or lack of knowledge, but rather about more complex matters.

For the past month, I’ve been working on a feature that’s crucial for our team. During this time, we focused solely on the backend, while the frontend lagged behind.

To close my tasks without waiting for the frontend and move on to others, I thoroughly tested everything: I wrote unit tests for the new logic, checked the correctness of the responses using Postman, merged my changes into master, and deployed the service to production.

But something interesting still happened. At the end of the last sprint, we finally began integration testing for the feature.

We found three bugs on the backend:

1. The color was received in a strange encoding.
2. An empty array was not returned in the response.
3. The limit on the number of elements in the response was applied to the wrong field.

What do they all have in common? They were all made intentionally:

1. For the first time, I was directly working with color. Therefore, I had no idea what encoding the frontend expected. During our discussions about the task, we didn’t pay attention to this, and I, in turn, used an internal mechanism for this and simply transferred the encoding from one model to another.
   
2. In this case, we missed the acceptance criteria and incorrectly described the task. The task stated to drop empty responses—so we did, but the frontend expected something different.
   
3. The most interesting of the described bugs. Let’s call it cognitive because, when reading the task and its context, I concluded that it should be done this way and not otherwise.

Each bug has its own backstory, context, and type.

Since many specialists with different perceptions of reality are involved in development, it’s easy to make a mistake in practice, which should be regarded as a result of our collaborative efforts in software development rather than the error of an individual.

The task of every engineer is to create clear and precise specifications that are difficult to deviate from to avoid mistakes. Unfortunately, this is a utopia.

In a world of agile methodologies, we often sacrifice numerous formal and strict elements, relying on assumptions or limited context, in order to deliver new features to users faster, with an acceptably low error rate.

The most important thing is to draw the right conclusions, discuss all problems in retrospectives, and form agreements within the team to maintain a consistently high quality of the product in the future.

*Read the original post and join the discussion on Telegram: [@time2code](https://t.me/time2code/302)*