---
title: Balancing Performance. Can You Live Without an ORM? 
slug: balancing-performance-can-you-live-without-orm                 
date: 2024-10-13T11:05:37+03:00
draft: false                                  
params:
  author: Alexander Novikov                  
  ShowCodeCopyButtons: true
  ShowPostNavLinks: true
  tags: [go, sql, dev]                
weight: 10
layout: custom-layout     
---

Many developers, when transitioning to Go, start looking for an easy and convenient way to work with databases. It’s normal – developers get used to tools that make their lives easier.

When I was writing in C#, I used [Entity Framework Core](https://github.com/dotnet/efcore) – the ORM for the .NET platform. Since it was my first language, I thought this was the natural way to work, and I never really considered alternatives (maybe there weren’t any on .NET at the time, and I’m not sure if there are now).

In Go, there’s the standard database/sql library, which provides a common interface for working with SQL-like databases. If you need maximum performance, this is your go-to choice.

However, in large, serious projects, maintaining a big codebase becomes more important, and that means ease of use and maintainability come first.

### SQLX

When the standard library starts feeling limiting, [sqlx](https://github.com/jmoiron/sqlx) comes to the rescue, extending the possibilities while keeping performance intact.

Last month, our team faced the challenge of finding a more convenient way to work with the database, after struggling a bit with raw sqlx in the past. We decided to seriously consider using an ORM, and Go certainly has its fair share of options.

When I first started learning Go, one of the early lessons I picked up was that using an ORM is considered bad practice. I held onto that belief until ease of use became a bigger priority than performance.

After some team discussions that led to no solid consensus, I reached out to the internal Go community for advice. Colleagues unanimously tore apart ORMs, and we discussed alternatives 🤓

One library that caught my eye was Squirrel, which helps generate SQL queries. I decided to give it a spin in a real-world scenario.

Surprisingly, the perfect task came up almost immediately. I needed to batch-save multiple items into a table, since performing multiple inserts would be a luxury we couldn’t afford in a high-load project.

The task seemed straightforward, but there was a catch. The number of items to save could vary widely, meaning I needed a “hack” to construct a rather bulky query.

### Composing sql-queries

That’s where [Squirrel](https://github.com/Masterminds/squirrel) came in handy. Using its various builders, I could construct complex queries.

We initialize a builder and populate it with data.

**Important!** Don’t forget to choose the correct placeholder format depending on the database driver! For Postgres, it’s the dollar sign.

~~~go
builder := squirrel.Insert("element").Columns("title", "price")

for _, element := range elements {
  builder = builder.Values(
    element.Title, element.Price)
}

query, args, err := builder.PlaceholderFormat(squirrel.Dollar).ToSql()
if err != nil {
  return fmt.Errorf("failed to build query: %w", err)
}

_, err = tx.Exec(query, args...)
if err != nil {
  return fmt.Errorf("failed to execute query: %w", err)
}
~~~

In the end, we get the query we need:

~~~sql
INSERT INTO element (title, price) VALUES ($1, $2), ($3, $4)
~~~

Of course, it would be interesting to look at various performance tests with and without this library (I might do some benchmarks in the future), but for now, it seems like a great tool when you’ve outgrown sqlx but aren’t ready to dive into a full ORM just yet.

*Read the original post and join the discussion on Telegram: [@time2code](https://t.me/time2code/307)*