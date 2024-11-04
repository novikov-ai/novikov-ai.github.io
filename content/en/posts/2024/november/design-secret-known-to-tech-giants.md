---
title: Design Secret Known to Tech Giants  
slug: design-secret-known-to-tech-giants                 
date: 2024-11-03T16:15:57+03:00
draft: false                                  
params:
  author: Alexander Novikov                  
  ShowCodeCopyButtons: true
  ShowPostNavLinks: true
  tags: [bigtech, design, review]
weight: 10
layout: custom-layout
---

*The process will be described as it's practiced at Avito. Other companies may differ, as they shape internal processes based on their own experiences. Read the full TDR process description in the [company playbook](https://github.com/avito-tech/playbook/blob/master/tech_design_review.md).*

### Maturity Model of Project Solutions

Let’s look at a simplified model of “maturity” in project solutions, broken down into 5 levels:

**Level 1**
- We write code

**Level 2**
- We write code -> Get approval

**Level 3**
- Get approval -> Write code

**Level 4**
- Get approval -> Write code -> Document the solution

**Level 5**
- Document the solution -> Get approval -> Write code

The first level, where the code and a working prototype are all that matters, is typical for startups or student projects. No approvals are needed, and documentation is even less likely—everything changes so fast that there’s just no time for it.

From the second level onward, approvals are usually needed from service owners, product managers, team leads, designers, legal, and so on. It’s generally wise to do this before coding, though sometimes things are “overlooked,” “forgotten,” or “not considered,” which inevitably slows the process down, as any approval becomes a release blocker.

The value of up-to-date documentation is hard to overstate. So, if developers are operating at the fourth level, it’s a very good sign.

In pursuit of shorter TTM, reaching the fifth level is often challenging, as it requires additional resources, and skilled developers must balance between levels 3 and 4, depending on sprint capacity.

### Design Review

“Documenting solutions” and “Getting approval” together form a process called “Design Review,” a standard in Big Tech for developing any solutions.

No one questions this process’s effectiveness; the current goal is to make it as efficient as possible without sacrificing decision quality. [Read here](https://storage.googleapis.com/gweb-research2023-media/pubtools/7298.pdf) about how Google enhances this process.

Avito also continuously optimizes its processes. As a result, the costly architecture committees have been replaced by Tech Design Review, or TDR.

It’s easiest to think of this process like a pull request (or merge request) in a service. Imagine creating one after completing your task, but instead of code with a new feature or bug fix, you have a **document** outlining a solution to a technical issue that affects multiple domains and potentially impacts the entire product and other teams. Reviewers inspect the “code” and leave comments...

### Stages of Tech Design Review

In TDR, the mechanics are quite similar, and the process includes the following stages:

#### 1. Define the Problem

TDR doesn’t come out of nowhere; there’s a problem that needs solving. We define it. This stage is essential to help future document reviewers understand the necessity of your solution.

#### 2. Find the Solution

Once the problem is defined, we start solving it. This is where the main research happens: drawing up a high-level architecture with dependencies, estimating the service load, resource consumption, and so on. The details vary by task, but you should end up with a solution accompanied by artifacts to give reviewers full context.

#### 3. Compile Everything

It’s time to bring it all together. Having a tool that provides a template with core sections is convenient. If there’s no such tool, simply organize what you’ve prepared into sections:

- Problem
- Solution description
- Dependency diagram
- Trade-offs
- Alternatives
- Load calculations
- Resources
- Database structure
- Metrics
- Implementation timeline
- FAQ (questions that arose along the way and answers to them)

This structure works well for creating a new service. Different templates may suit other types of solutions.

The basic formula is:
problem -> solution -> justification

#### 4. Submit for Review

At this stage, we have a fully drafted document (v1.0). We select experts in the domain where the new development will take place. To identify these experts, consider two questions:
- “Who owns the service that will be affected?”
- “Whose work might be eased or complicated by our solution?”

With the experts chosen, we send the document for approval and wait.

#### 5. Review

Feedback from the experts is collected, and the document author answers questions. At this stage, the experts assign their assessment (flag):

🟢 - no questions

🟡 - non-blocking questions; development can start

🔴 - this solution cannot be released to production

Possible outcomes include: document approved, document returned for revisions (we return to Step 3, work through the feedback, and repeat), or document canceled as unfeasible with the current solution or justification.

#### 6. Finalization

Depending on the outcome in the previous step, next steps vary, but if all is well, we can start planning the development phase and move forward with implementation.

### Asynchronous Format

It’s worth noting that TDR approval is entirely asynchronous. This makes it quick and convenient for everyone. If needed, you can arrange a meeting to resolve contentious points, but this is usually the exception. Microsoft also supports this format; check out their [playbook](https://microsoft.github.io/code-with-engineering-playbook/design/design-reviews/recipes/async-design-reviews/) for more details.

If you delve into this topic, you may come across the [ADR](https://github.com/joelparkerhenderson/architecture-decision-record) (Architecture Decision Record). This is another important document, but it’s a separate, more localized process for individual solutions.

*Read the original post and join the discussion on Telegram: [@time2code](https://t.me/time2code/279)*