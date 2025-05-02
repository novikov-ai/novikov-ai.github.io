---
title: Are Your Tools Good Enough?  
slug: are-your-tools-good-enough                 
date: 2025-04-30T15:18:43+03:00
draft: false                                  
params:
  author: Alexander Novikov                  
  ShowCodeCopyButtons: true
  ShowPostNavLinks: true
  tags: [db, nosql, redis, lua, tools]                
weight: 10
layout: custom-layout
---

If you’re a true professional, your mastery should be reflected in your toolkit.

First, it directly affects your efficiency, which in turn impacts the **quality** of your work.

Second, it’s basic comfort—an ease that indirectly influences your entire life.

Of course, you can’t help but admire the rock-star engineer who’s written code in Vim their whole life, controls their Tesla from it, and does countless other things that, judging by endless forum debates about tool convenience, “IDE lovers couldn’t even dream of.”

But still: when a pro uses pro-grade tools, they only get stronger.

## Dependency on Your Tools

When I first started writing code, JetBrains Rider was a lifesaver. It felt like magic—you could write any code, even if you didn’t fully know how.

Professional tools—be it an IDE or a high-end DSLR for a photographer—flatten the learning curve and help you deliver solid results fast.

> “How do you manage to take such impressive shots?
> — I just press that big button…”

The key is not to fall into the trap of thinking the tool does it all for you. You become very dependent on it, and too many dependencies are bad :)

At some point I realized I wanted a deeper understanding of how the IDE worked, more flexibility and freedom. So I left the JetBrains ecosystem—farewelling Rider and GoLand.

I shared my migration experience in this [series of posts](https://t.me/time2code/252).

Now I write all my code in VS Code, and it’s **extremely comfortable**. Of course, there are some quirks, but until recently I’ve never once thought about going back to a heavyweight IDE like GoLand…

…until I started doing heavy database work (Postgres, Redis, etc.).

Yes, VS Code has plenty of plugins, but each time I added another plugin I’d catch myself thinking:

1. “This plugin is terrible and clumsy to use.”
2. “My VS Code is turning into the very IDE I left—worsening my experience with a simple text editor.”

## Lua Script to Safely Delete Redis Keys by Pattern

The turning point in realizing you can’t lock yourself into a single tool came when I needed to delete hundreds of thousands of Redis keys matching a pattern in a test environment.

Usually you’d write a simple script (often in Python), but I was determined to do it via the Redis CLI…

Needless to say, it took some time. There’s no one-line command to delete everything safely—you must iterate carefully to avoid high load and double-check your work.

Enter [Lua](https://www.lua.org/).

Lua script to safely delete entries with the key prefix `example-key`:

```lua
EVAL "local cursor='0' local deleted=0 repeat local r=redis.call('SCAN',cursor,'MATCH','example-key:*','COUNT',5000) cursor=r[1] if #r[2]>0 then deleted=deleted+redis.call('DEL',unpack(r[2])) end until cursor=='0' return deleted" 0
```

The job got done, but it wasn’t comfortable.

## One Tool, One Responsibility

It’s nice to write code and manipulate data in the same app, but think of it like SRP: code belongs in the editor; data belongs in a dedicated database client.

When data volumes grow, the cost of a mistake skyrockets. You need maximal convenience to stay fully focused on your work.

After wrestling with Lua scripts in the Redis CLI, I realized it was time to switch to purpose-built database tools.

I’d avoided them before for various reasons, but now it was time to give them a try.

The takeaway: don’t lock yourself into one tool (as I did when I switched to VS Code).

## Analyze Your Setup

1. Where do you write code?
2. What do you use for database work?
3. How do you test your API?
4. What do you use for request proxying?

If you feel the standard feature set is lacking or you encounter friction, it’s time to explore alternative solutions to make your life easier and boost your efficiency.

Every month new tools emerge that might solve your exact problem.

## My Development Setup

1. **Editor**: VS Code, but eyeing Vim/Neovim (I feel I can still speed up my workflow)
2. **DB Work**: CLI + VS Code plugins for now, but planning to move to a dedicated client (DataGrip, DBeaver)
3. **API Testing**: Switched from Postman to Bruno for security reasons
4. **Proxying**: Proxyman

**Remember**: comfort is everything.

If you’re a rock-star engineer who can tackle any challenge with a single tool, that’s awesome—but for most of us, it’s far more effective to pick **the right tool for the task** rather than trying to solve every problem with the one tool you learned years ago.

*Read more posts and join the discussion in Telegram: [@time2code](https://t.me/time2code)*