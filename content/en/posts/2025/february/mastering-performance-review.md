---
title: Mastering the Performance Review  
slug: mastering-performance-review                 
date: 2025-02-T10:44:23+03:00
draft: false           
params:
  author: Alexander Novikov                  
  ShowCodeCopyButtons: true
  ShowPostNavLinks: true
  tags: [perf-review, bigtech, grow]               
weight: 10
layout: custom-layout
---

At my current company, this past review cycle was my fifth. The hardest ones were the first two—when you’re still unfamiliar with the process and unsure about what’s expected of you.  

What helps me now, and why have I already started preparing for the next one?  

I've structured my experience into different periods, each of which can be approached separately at various stages of the review cycle.  

## 💪 Preparation  

**Period:** End of the last performance review → Start of the next performance review  

1. **Leave a digital trail.** This can be anything: a follow-up post with agreements after a meeting, a discussion thread with active participation, or a Jira comment summarizing research findings. When it’s time to write your next review, you’ll be grateful to your past self.  

2. **Save links to artifacts.** Create a single entry point, like a notes file. Ideally, organize them by projects or initiatives rather than dumping everything into one pile. That way, you'll have a nearly ready-made template for your future review—just enrich it with context and add metrics.  

I use Obsidian, but anything works. Even a simple list with brief comments is better than nothing.  

It’s tempting to think you’ll be able to find everything later using search, but in reality:  
- After six months, it’s easy to forget what you even worked on.  
- You’ll save yourself a ton of time.  

3. **Regularly check your development plan.** Ask yourself:  
  - Am I moving in the right direction?  
  - Do my daily tasks bring me closer to my goal?  
  - Can I step beyond my current responsibilities, and will it provide value to others?  

  If you feel stuck in routine work, discuss your concerns with your manager. Together, you can find a solution—but ideally, come up with a suggestion yourself first and refine it with their input.  

## ✍️ Writing  
**Period:** Start of the performance review → End of the peer feedback phase  

1. **If you’ve kept structured notes, all you need to do is match your team’s goals for the past quarters with your artifacts.** (Assuming your manager and product owner ensured that your tasks aligned with the roadmap and delivered business value.)  

  In a product team, you need hard data on OKR completion and, for example, experiment analysis results. In an infrastructure team, your metrics will be different, but the principle remains the same.  

  **Formula:**  
  ~~~
  <goal/OKR/initiative/project> + <your contribution: service/feature/documentation> = <resulting metrics>
~~~

2. **Use task tracking system search.** In Jira, for example, you can filter your tasks over the past period using [JQL](https://support.atlassian.com/jira-service-management-cloud/docs/use-advanced-search-with-jira-query-language-jql/)  

Ready to go filter on JQL, which I use:

~~~sql
(created >= startOfDay(-180) OR resolution changed after startOfDay(-180) OR status changed after startOfDay(-180)) AND (reporter = currentUser() OR assignee was currentUser()) ORDER BY resolved ASC, updated ASC
~~~

3. **If you're writing your review in a corporate tool, make local backups often.** There’s nothing worse than losing a well-crafted document.  

4. **Proofread your final review!** It’s a must.  

## 🤔 Analyzing  
**Period:** End of peer feedback phase → End of the performance review  

- **Pay attention to feedback from your manager and colleagues.** What went well? What can be improved? Focus on these areas in the next cycle.  

- **The most important question:** _"Where do I want to be in six months?"_ Your answer directly impacts your future work.  

  To move to the next level, you need to shift your focus—just delivering “good” results isn’t enough. Define your goal and work toward it.  

  If you're aiming for a promotion, discuss it with your team lead in advance and start working on it now.  

---

This is what works for me. If your company has a similar process and performance reviews feel stressful, try this approach and share your feedback. You’ll likely adapt it to fit your needs—there’s no universal solution.  

P.S.: This is from an engineer’s perspective. For managers, things are even more “interesting.”  

May your results exceed all managerial expectations!  

*Read the original post and join the discussion in Telegram: [@time2code](https://t.me/time2code/284)*