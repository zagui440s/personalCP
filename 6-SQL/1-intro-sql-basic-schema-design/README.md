# Intro to SQL, Relational Databases, and basic data schema design

## Lessons & Assignments

- Lesson: [Intro to Relational Databases](./intro-relational-databases.md)
  - Assignment: [Complete the offical Postgres Tutorial Chapter 2: The SQL Language](https://www.postgresql.org/docs/16/tutorial-sql.html)
    - You should be writing and executing the code in the tutorial as you go.
  - Assignment: Refactor our `customers` and `purchases` tables as follows:
    - Create a table named `items`:
      - `name`: Name of the item, varchar
      - `cost`: Cost of the item, integer
    - Insert data (look at the existing purchases) into our new `items` table.
    - Modify the `purchases` table:
      - Remove the `item` and `cost` columns from it
      - Add a foreign key column named `item_id` that references our new `items` table. 
- Lesson: Postgres Column Types, SQL Anatomy: CREATE, INSERT, SELECT, JOIN