---
title: How to Learn System Design? And Who Needs It?
slug: how-to-learn-system-design-and-who-needs-it                 
date: 2024-11-13T23:44:26+03:00
draft: false                                  
params:
  author: Alexander Novikov                  
  ShowCodeCopyButtons: true
  ShowPostNavLinks: true
  tags: [design, interview, grow]  
weight: 10
layout: custom-layout
---

First, ask yourself: should you dive into this field right now, given your current experience? And if so, what’s your goal?

If we consider an engineer in a company with well-established processes and a clear division of responsibilities, system design skills are usually expected from more senior developers, generally at or near the senior level.

Interviews for such positions often include the classic system design interview, where you might be asked to design Twitter, YouTube, or another popular system.

Of course, there are plenty of startups and government agencies where juniors are tasked with designing complex systems. However, this isn’t a healthy practice, and we won’t discuss it here.

It’s crucial to understand: learning solid design thinking is one thing, but passing an interview is another.

Ideally, the first would naturally lead to the second. But if your sole goal is to pass the system design interview section, then mock interview drills will help you succeed there, though they won’t instill a robust skill set. There's already plenty of content about interview prep, so we won’t delve into that.

### The Need for System Design Skills at Different Stages

1. Imagine someone with limited experience (up to 2 years), currently in a junior or mid-level developer role. In this case (in my opinion), diving deeply into system design can even be counterproductive, as it's easy to get lost in the sea of materials, lose motivation, and shift focus away from the main work.

2. If you’ve transitioned to web development from another field (like I once did), then learning the high-level structure of things can help you build a general picture. There’s no better [book](https://www.amazon.com/System-Design-Interview-insiders-Second/dp/B08CMF2CQF) for this purpose as far as I know.

3. Now, let’s say you’ve been in development for a solid 2-3 years, have clearly set a goal (advancing to a senior level), and want to reach it as quickly as possible. In this case, it’s important to build a solid system design skill, not just get through an interview.

Since the first two points are fairly straightforward, let’s take a closer look at #3, which is where we’ll focus.

### My Resources

In my bookmarks, I’ve long kept:
- [System Design Primer](https://github.com/donnemartin/system-design-primer)
- [System Design Roadmap](https://roadmap.sh/system-design)

Along with a bunch of other excellent resources that I try to read through every now and then.

If you have solid discipline and a clear understanding of how to structure your study plan, self-study through resources can work well.

But this summer, I decided to take a more holistic approach, as I noticed a need and grew a bit tired of navigating endless materials.

During the summer, I was focusing on two projects:
- A Systems Analysis course
- An Object-Oriented Analysis and Design (OOAD) course

The second course is more hands-on and object-oriented, during which I [wrote](https://github.com/novikov-ai/match-three-game) a console game. This one is more of a pet project since there’s no feedback component.

The first course, however, focused on requirements gathering, business analysis, and choosing suitable architectures. Early in the course, a major discovery for me was learning about the [Event Storming](https://ibm-cloud-architecture.github.io/refarch-eda/methodology/event-storming/) workshop. I set a goal to conduct one with my team. It’s truly an exciting approach to design, and I’ll cover it in more detail separately.

### So, How Do You Actually Learn System Design if You’ve Decided to Dive In?

The most straightforward answer is through **practice**. Ideally, if you can use trial and error in a work setting, that’s great. However, this luxury isn’t always available, and sometimes it can even be risky, as the business may lose money while you make mistakes.

So, practice should ideally be under the guidance of more experienced colleagues/mentors/instructors—they’ll help keep you on track. Remember: during learning, feedback is everything. Without it, it’s very easy to get stuck. A good option can be working through [architectural katas](https://nealford.com/katas/list.html) with a mentor.

Start designing. Gather feedback on your designs. Then design again, improving the initial solution.

In the end, you’ll make a noticeable leap in your development.

*Read the original post and join the discussion in Telegram: [@time2code](https://t.me/time2code/278)*