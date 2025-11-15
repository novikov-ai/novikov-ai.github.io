---
title: Top 10 Tips for Database Optimization
slug: database-tips                 
date: 2025-11-15T13:46:03+03:00
draft: false                                  
params:
  author: Alexander Novikov                  
  ShowCodeCopyButtons: true
  ShowPostNavLinks: true
  tags: [db, optimization, tips]             
weight: 10
layout: custom-layout
---

In November, I attended the Highload++ conference, which I covered in detail in a [telegram post](https://t.me/time2code/387).

There were many great insights on working with databases, and one of the talks presented a top-10 list. Below is an expanded breakdown of each recommendation: what the speaker actually meant and how to apply it in real-world production work.

## 1️⃣ **Connections are a limited resource**

**Idea:**

A database connection is not just a TCP socket. It’s memory, cache, transaction context, and sometimes worker threads inside the DBMS. Unbounded connection creation easily leads to `too many connections`.

**In practice:**

A Kubernetes service without pool limits: during a peak, each pod opened 100 connections → PostgreSQL hit its limit and started returning errors.

**How to fix:**

* In Go: `db.SetMaxOpenConns`, `db.SetMaxIdleConns`, `db.SetConnMaxLifetime`.
* Use proxy poolers (PgBouncer) in transaction-pooling mode for systems with many short-lived connections.
* Monitor active/idle connections (Prometheus driver metrics or `pg_stat_activity`).

**Go template:**

```go
db.SetMaxOpenConns(50)
db.SetMaxIdleConns(25)
db.SetConnMaxLifetime(30 * time.Minute)
```

---

## 2️⃣ **1 connection = 1 transaction at a time**

**Idea:**

A transaction “binds” its state to a connection. If you start a `BEGIN` and wait — that connection is occupied. Under load, those blocked connections quickly lead to pool starvation.

**In practice:**

Transactions were opened early to later run additional SELECTs — under load, 90% of the pool was stuck in `idle in transaction`.

**How to fix:**

* Keep transactions minimal: `BEGIN` → DML → `COMMIT/ROLLBACK`.
* Never perform external I/O (HTTP, heavy CPU work) inside a transaction.
* If you need to coordinate external calls — consider the **outbox pattern**.

**Outbox flow (simplified):**

1. In a transaction, write your business data + an entry into the `outbox` table.
2. Commit.
3. A separate worker reads the outbox and sends HTTP/messages.

## 3️⃣ **A connection should constantly be doing work**

**Idea:**

Idle transactions and pointless waiting are dangerous: they hold locks, block VACUUM, and clog the pool.

**In practice:**

An ORM automatically opened a transaction for the entire HTTP request. When the logic made several external calls, the transaction stayed open for dozens of milliseconds. Under peak load this accumulated into serious latency issues.

**How to fix:**

* Avoid auto-transactions around the whole request.
* Use explicit short transactions.
* Enable `idle_in_transaction_session_timeout` in Postgres to catch timeouts.

## 4️⃣ **Never perform HTTP calls inside a transactional context**

**Idea:**

External calls are unreliable and slow. If a transaction waits for an external response — it holds DB resources.

**In practice:**

A service made a billing API call inside a transaction. When billing started responding in 3s instead of 200ms — the database began to degrade.

**How to fix:**

* Outbox (see above).
* Post-commit events (eventual consistency).
* Compensating transactions if synchronous semantics are required.

**Outbox template (SQL):**

```sql
BEGIN;
UPDATE orders SET status='paid' WHERE id=?;
INSERT INTO outbox (...) VALUES (...);
COMMIT;
-- after commit, a worker calls billing
```

---

## 5️⃣ **Slow queries block fast ones**

**Idea:**

One “heavy” query (full table scan, complex sorts, aggregations) consumes CPU/IO/memory and can push out fast queries. This is especially critical on replicas or shared-resource systems.

**In practice:**

An analytical query over 40M rows created temp files on disk and consumed 60% CPU. Regular API queries started to show increased latency.

**How to fix:**

* Use `EXPLAIN (ANALYZE, BUFFERS)`.
* Set `statement_timeout` per user/role in Postgres.
* Move analytical queries to a replica or analytical DB (ClickHouse, DWH).
* Use materialized views, pre-aggregations, batch jobs.

## 6️⃣ **You need to add indexes**

**Idea:**

Indexes are powerful, but come with trade-offs: they speed up reads, slow down writes, and take space.

**In practice:**

Everyone has faced slow queries due to missing or suboptimal indexes. I wrote about a case where a composite index massively improved performance in another [article](https://novikov-ai.github.io/posts/postgresql-query-optimization-composite-index/).

**How to fix:**

* Create indexes based on real `WHERE` / `JOIN` / `ORDER BY` patterns.
* Prefer composite indexes if a query uses multiple columns.
* Ensure the column order in the composite matches your `WHERE` and `ORDER BY`.
* Remove unused indexes (check via `pg_stat_user_indexes`).

**SQL template:**

Bad:

```sql
WHERE user_id = ? AND created_at > ?
-- separate indexes may not be used together
```

Optimal:

```sql
CREATE INDEX idx_user_created ON events (user_id, created_at DESC);
```

## 7️⃣ **Some queries can simply be rewritten — OR/IS NULL and others**

**Idea:**

Operators like `OR`, `IS NULL`, `NOT IN`, etc. often break index usage. Sometimes simple query algebra gives huge performance gains.

**Typical patterns:**

* `OR` on indexed fields → full scan. Rewrite as `UNION ALL` or use `COALESCE`.
* `NOT IN` → prefer `NOT EXISTS`.
* `LEFT JOIN` → becomes `INNER JOIN` if a match is guaranteed.

**SQL template:**

Bad:

```sql
WHERE user_id = 10 OR user_id IS NULL
```

Better:

```sql
WHERE COALESCE(user_id, 10) = 10
-- or
WHERE user_id = 10
UNION ALL
SELECT ... WHERE user_id IS NULL AND ...
```

## 8️⃣ **Design your API for keyset pagination early**

**Idea:**

Offset pagination degrades as offset grows: the DB must walk and discard `OFFSET N` rows.

**In practice:**

A service stored ~90M events, API returned 50 elements via `/events?page=N`,
page 1000 = offset 50,000.

Execution time grows linearly.

**How to fix:**

Keyset (seek) pagination is stable and fast. It paginates not by offset, but by a field value that already exists in an index.

Useful for feeds, logs, and large tables.

**SQL template**

```sql
WHERE (created_at, id) < (last_created_at, last_id)
ORDER BY created_at DESC, id DESC
LIMIT 50;
```

## 9️⃣ **When designing the DB, pay extra attention to JSON**

**Idea:**

JSON provides flexibility but hides schema. Common mistake: store active fields in JSON and then expect fast filtering on them.

**How to fix:**

* JSONB is good for data that is rarely filtered/queried.
* If you need to filter by JSON fields often — move them into columns (normalize).
* Use GIN indexes for JSONB search:
  `CREATE INDEX ON table USING GIN (data jsonb_path_ops)`
* Watch out for size and bloat; often, explicit columns are better.

**Example:**

If `user.preferences->'emails'` is constantly used in WHERE filters — move `pref_emails` into a dedicated column and index it.

## 🔟 **Don’t make typical mistakes — make atypical ones**

**Idea:**

Following templates is good, but production systems require adaptation to load and data models. Sometimes a non-standard solution wins.

**Examples of “atypical” approaches:**

* User-based sharding to reduce contention.
* CQRS: separate models for reads and writes.
* Materialized views + background refresh instead of heavy aggregations.

**But:** don’t invent complexity without reason. Profile and measure first.

---

## Remember

1. Limit the connection pool; use PgBouncer if needed.
2. A transaction = one connection; keep transactions short.
3. Don’t keep a connection idle and don’t do external calls inside transactions.
4. Move HTTP calls to outbox/after commit.
5. Heavy/analytical queries → replicas or DWH.
6. Indexes: think before creating; composite > a set of single-column indexes.
7. Rewrite OR/NOT/IS NULL into index-friendly equivalents.
8. Plan keyset pagination ahead of time.
9. JSON is convenient, but not for frequently-filtered fields.
10. Profile, measure, then apply “atypical” architectural optimizations.

*Read more Big Tech posts and join the discussion in Telegram: [@time2code](https://t.me/time2code)*