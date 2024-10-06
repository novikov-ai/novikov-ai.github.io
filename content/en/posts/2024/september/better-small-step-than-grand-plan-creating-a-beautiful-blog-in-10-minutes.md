---
title: From Procrastination to Launch. How I Built My Blog in Less than an Hour  
slug: better-small-step-than-grand-plan-creating-a-beautiful-blog-in-10-minutes                 
date: 2024-09-18T16:28:49+03:00
draft: false                                  
params:
  author: Alexander Novikov                  
  ShowCodeCopyButtons: true
  ShowPostNavLinks: true                
weight: 10                                   
---

Throughout my career, I can't recall a single moment when I didn’t think about creating my own website or blog. Even when I was a junior engineer, I envisioned having a personal portfolio page where I could showcase the projects I had worked on. This year, one of my goals was to set up my own blog on a separate domain.

Time passed, but nothing progressed because I realized that it required resources: time and money for infrastructure. While the financial aspects (domain purchase and VPS) didn't scare me, the thought of writing frontend code when I’m a backend developer slowed me down and led to procrastination.

I even had a plan for creating my blog:

1. Become a full-stack developer by taking several courses to learn frontend architecture and JavaScript.
2. Migrate to a stable VPS server.
3. Purchase a domain (the one I liked cost $10,000 per year).
4. Develop the blog.

As the year neared its end, the only thing I had from this plan was the VPS server, which had become more stable on its own as the provider moved to a more reliable location. Item 2 was automatically fulfilled without my involvement (and that’s the kind of automation we appreciate).

Then, on a procrastinating Tuesday (yesterday), I decided that I could no longer delay. 

I noticed that many professional developers use “powered by...” tags on their sites or blogs, indicating they are leveraging some external solution for their website or blog. I thought, why not me?

Initially, I planned to use [Bear Blog](https://bearblog.dev/) because I liked its style. However, either due to evening fatigue or some other reason, I decided against it after realizing that I would need to register on the platform.

[Hugo](https://gohugo.io/) was my second option, as I had seen it used by other authors frequently. It’s a cool project written in Go, open source, and completely free. This means we can contribute to it if desired or create a fork to move independently if necessary.

I decided to give it a try, especially since the project has excellent [documentation](https://gohugo.io/getting-started/quick-start/). After figuring out how to set up my site locally and learning how to choose a theme, I realized it was perfect for my needs.

Then came the most interesting part—my least favorite but highly respected area: DevOps, specifically deployment and hosting of the site. 

Initially, I thought I could deploy it on my VPS server, but I soon realized that doing it quickly and easily wasn’t feasible. GitHub Pages came to the rescue, where I already had a [CV page](https://t.me/time2code/268). Hugo even provides a straightforward guide for deploying there.

After setting up GitHub Actions to automatically deploy the project on push to the master branch and uploading the first version, I was pleasantly surprised that everything worked on the first try!

Honestly, I was thrilled to have finally taken a significant step towards creating my blog. 

Of course, Hugo comes with a decent amount of functionality, and it will take some time to learn how to use the framework effectively. However, the most important thing is that the foundation is laid, and it will be easier from here on out.

You can check out the result [here](https://novikov-ai.github.io) (currently, it only includes an intro from GitHub).

My plans include migrating my professional blog with selected posts from Telegram and actively developing it with posts on LinkedIn.

Certainly, there are [criticisms](https://t.me/pmdaily/1209) of such site generators, but I believe it's important to focus on your goals. Adhere to the principle of “necessary and sufficient.”

At the moment, Hugo seems to be a perfect fit, but I’m open to moving to a standalone solution if I encounter limitations over the next year.

In essence, I created my new site in less than 10 minutes plus 30-60 minutes spent reading the documentation.

I recommend always taking small steps. If you set an ambitious goal, start small to get something done. This way, you’ll get moving, shed the guilt of procrastination, and gain the motivation to continue.

*Read the original post and join the discussion on Telegram: [@time2code](https://t.me/time2code/301)*