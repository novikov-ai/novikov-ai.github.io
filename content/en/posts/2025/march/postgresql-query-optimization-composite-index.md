---
title: A 50% Performance Boost for Database Explained How
slug: postgresql-query-optimization-composite-index               
date: 2025-03-10T22:29:35+03:00
draft: false                                  
params:
  author: Alexander Novikov                  
  ShowCodeCopyButtons: true
  ShowPostNavLinks: true
  tags: [db, postgres, sql, optimization]                
weight: 10
layout: custom-layout
---

When working with PostgreSQL, query optimization is a crucial skill for maintaining performance in high-load systems. 

In this post, I’ll show how I optimized a slow query by 50% using a **composite index**—leveraging PostgreSQL’s `EXPLAIN` and `EXPLAIN ANALYZE` commands to diagnose performance bottlenecks and improve efficiency.

## **Why EXPLAIN Matters**

[PostgreSQL](https://www.postgresql.org/docs/current/sql-explain.html) provides the `EXPLAIN` command to analyze query execution plans **before execution**. It helps developers understand:

✅ How PostgreSQL **plans** to execute the query  
✅ Which **indexes** and **scan types** (Seq Scan, Index Scan, Bitmap Scan) will be used  
✅ Whether a query is **optimized** or needs improvement

Using `EXPLAIN ANALYZE`, you can take this further by actually **executing the query** and measuring the real execution time. However, keep in mind that this **command does run the query**, which brings us to some important cautionary points.

---

## Optimizing a Slow Query

### **The Problem**

I encountered a performance issue with the following query:

```sql
SELECT *
FROM backlog bl
JOIN backlog_element elem ON elem.backlog_id = bl.id
WHERE elem.backlog_id = 1168201980 AND elem.deleted_at IS NULL;
```

### **Step 1: Running EXPLAIN**

```sql
EXPLAIN ANALYZE
SELECT *
FROM backlog bl
JOIN backlog_element elem ON elem.backlog_id = bl.id
WHERE elem.backlog_id = 1168201980 AND elem.deleted_at IS NULL;
```

Also you can use formatting: `FORMAT { TEXT | XML | JSON | YAML }`. 

E.g.: `EXPLAIN (ANALYZE, FORMAT TEXT)`.

**Simplified Execution Plan Output:**

```
Nested Loop  (cost=0.10..32.99 rows=4 width=85) (actual time=0.056..123.456 rows=3 loops=1)
  ->  Index Scan using uidx_elem_backlog_id on backlog bl  (cost=0.05..2.65 rows=1 width=8) (actual time=0.034..0.035 rows=1 loops=1)
        Index Cond: (backlog_id = '1168201980'::bigint)
  ->  Index Scan using idx_backlog_element_backlog_id on backlog_element elem  (cost=0.05..30.32 rows=13 width=93) (actual time=0.019..123.421 rows=3 loops=1)
        Index Cond: (backlog_id = bl.id)
        Filter: (deleted_at IS NULL)
        Rows Removed by Filter: 2
Planning time: 0.309 ms
Execution time: 123.456 ms
```

### 📔 How to read the output

1. **Top Level Node: Nested Loop**
   - **Cost**: `(cost=0.10..32.99 rows=4 width=85)`
     - `cost=0.10..32.99`: Estimated cost of the operation (measured in cost units that are arbitrary, but conventionally mean disk page fetches).
     - `rows=4`: Estimated number of rows returned.
     - `width=85`: Estimated width (in bytes) of each row.
   - **Actual Time**: `(actual time=0.056..123.456 rows=3 loops=1)`
     - `actual time=0.056..123.456`: Actual time taken to start and complete the operation.
     - `rows=3`: Actual number of rows returned.
     - `loops=1`: Number of times this operation was executed.

2. **First Child Node: Index Scan on `backlog`**
   - **Cost**: `(cost=0.05..2.65 rows=1 width=8)`
     - `cost=0.05..2.65`: Estimated cost.
     - `rows=1`: Estimated number of rows.
     - `width=8`: Estimated width of each row.
   - **Actual Time**: `(actual time=0.034..0.035 rows=1 loops=1)`
     - `actual time=0.034..0.035`: Actual time taken.
     - `rows=1`: Actual number of rows.
     - `loops=1`: Number of executions.
   - **Index Cond**: `(backlog_id = '1168201980'::bigint)`
     - Condition used to filter the rows.

3. **Second Child Node: Index Scan on `backlog_element`**
   - **Cost**: `(cost=0.05..30.32 rows=13 width=93)`
     - `cost=0.05..30.32`: Estimated cost.
     - `rows=13`: Estimated number of rows.
     - `width=93`: Estimated width of each row.
   - **Actual Time**: `(actual time=0.019..123.421 rows=3 loops=1)`
     - `actual time=0.019..123.421`: Actual time taken.
     - `rows=3`: Actual number of rows.
     - `loops=1`: Number of executions.
   - **Index Cond**: `(backlog_id = bl.id)`
     - Condition used to filter the rows.
   - **Filter**: `(deleted_at IS NULL)`
     - Additional condition to filter out rows.
   - **Rows Removed by Filter**: `2`
     - Number of rows removed by the filter condition.

4. **Planning Time and Execution Time**
   - **Planning time**: `0.309 ms`
     - Time taken to create the query plan.
   - **Execution time**: `123.456 ms`
     - Total time taken to execute the query.

### **Key Takeaways from the Execution Plan:**

1. Nested Loop Join: The query uses a nested loop join to combine rows from the `backlog` and `backlog_element` tables.
2. Efficient Index Usage: 
   - The `backlog` table is scanned using the index `uidx_elem_backlog_id` to find the specific `backlog_id`.
   - The `backlog_element` table is scanned using the index `idx_backlog_element_backlog_id` to find rows matching the `backlog_id` from the `backlog` table.
3. Filtering Overhead:
   - Rows in the `backlog_element` table are filtered to exclude those with non-null `deleted_at` values.
   - Out of 5 rows initially fetched, 2 were removed due to the filter condition, leading to 3 rows being returned.

---

## **Step 2: Creating a Composite Index**

A **composite index** on `(backlog_id, deleted_at)` helps because:

- It allows PostgreSQL to **quickly find rows** matching `backlog_id = 1168201980`.
- Since `deleted_at` is included, it can efficiently **filter by date** and **sort the results**.

```sql
CREATE INDEX idx_backlog_element_deleted ON backlog_element (backlog_id, deleted_at DESC);
```

---

## **Step 3: Verifying the Optimization with EXPLAIN ANALYZE**

```sql
EXPLAIN ANALYZE
SELECT *
FROM backlog bl
JOIN backlog_element elem ON elem.backlog_id = bl.id
WHERE elem.backlog_id = 1168201980 AND elem.deleted_at IS NULL;
```

🔍 **Updated Execution Plan Output:**

```
Nested Loop  (cost=0.30..16.35 rows=1 width=113) (actual time=0.042..61.728 rows=1 loops=1)
  ->  Index Scan using uidx_elem_backlog_id on backlog bl  (cost=0.15..8.17 rows=1 width=8) (actual time=0.029..0.030 rows=1 loops=1)
        Index Cond: (backlog_id = 1)
  ->  Index Scan using idx_backlog_element_active on backlog_element elem  (cost=0.15..8.17 rows=1 width=121) (actual time=0.012..61.696 rows=1 loops=1)
        Index Cond: ((backlog_id = bl.id) AND (deleted_at IS NULL))  -- No Filter step!
Planning time: 0.309 ms
Execution time: 61.728 ms
```

### **Performance Boost** 🚀

✅ **50% Faster Execution**: Query time dropped from **124ms → 62ms**  
✅ **Index Scan Used**: PostgreSQL now scans only the **relevant subset** of data  
✅ **Efficient Sorting**: No additional sorting operation is required

---

## ⚠️ **Caution When Using EXPLAIN ANALYZE**

While `EXPLAIN ANALYZE` is a powerful tool, it comes with some important caveats:

- **Side Effects**:  
  `EXPLAIN ANALYZE` runs the query, which means if your query is not read-only (e.g., it contains INSERT, UPDATE, or DELETE operations), it could **modify** your **data**. Always ensure that you are running it on a safe testing environment or on read-only queries.

💡 Use `EXPLAIN ANALYZE` within Transaction if modifying data:
~~~sql
BEGIN;
EXPLAIN ANALYZE ...;
ROLLBACK;
~~~

- **Resource Consumption**:  
  Running complex queries with `EXPLAIN ANALYZE` on production systems may lead to unexpected load, as it executes the full query. Use it carefully during peak times.

- **Locking Issues**:  
  In some cases, the query might acquire locks that can interfere with other transactions. Consider the potential impact on your application and, if possible, run analysis during low-traffic periods.

- **Accurate Timing**:  
  The execution time reported includes the planning phase and might not reflect the time for repeated executions. For more consistent benchmarking, consider running multiple tests and averaging the results.

---

## **Best Practices for Using EXPLAIN in Real Work**

1️⃣ **Start with `EXPLAIN` before running heavy queries**: If a query runs slow, check its execution plan first.

2️⃣ **Use `EXPLAIN ANALYZE` for real execution stats**: It measures actual time taken but **executes the query**. Exercise caution on production.

3️⃣ **Look for `Seq Scan` on large tables**: If you see a Sequential Scan on a big table, **consider indexing**.

4️⃣ **Check if PostgreSQL uses your indexes**: Sometimes, indexes exist but aren’t used due to query structure.

5️⃣ **Use Composite Indexes Wisely**: Indexes on `(A, B)` are most beneficial when filtering by **A first, then B**.

6️⃣ **Avoid Over-Indexing**: While indexes speed up reads, they can slow down inserts/updates. Index only when necessary.

---

## **Conclusion**

Optimizing PostgreSQL queries with `EXPLAIN` is a powerful skill for backend developers. In this case, by adding a **composite index**, I reduced the query execution time by **50%**, making the system more efficient.

*Read more posts and join the discussion in Telegram: [@time2code](https://t.me/time2code)*