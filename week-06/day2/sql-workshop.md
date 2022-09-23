# Hashrocket SQL Workshop

## Topics Covered / Goals
- Understand the need for persistent data
- Explain the structure of a relational database
- Query a database using SQL commands

## Lesson
- [Slides](https://docs.google.com/a/natedelage.com/presentation/d/1834tfN6g9gvl2t0JDQY2RPMCIAnvN08Wrd-bO-usruQ/edit?usp=sharing)

**Persistence**

How else might we make use of a relational database? Consider a firm that makes software for agriculture. Their clients want an application that keeps track of which employee is tending to which field, and how much they harvest. What tables would we need? What rows make sense for each table?

**employees** |
---|
id |
first_name |
last_name |
salary |

**fields** |
---|
id |
latitude |
longitude |
crop_type |
current_status |

**harvests** |
---|
id |
employee_id |
field_id |
total_yield |

In this case, the `harvests` table acts as a join table between employees and fields. You can use it to find out which fields an employee is harvesting with a simple query:

```sql
SELECT * FROM fields LEFT JOIN harvests ON fields.id = field_id WHERE employee_id = 12;
```

Harvests also has data in its own right, so we can retrieve every harvest whose total yield is less than 10:
```sql
SELECT * FROM harvests WHERE total_yield < 10;
```

We could even get the sum total of an employee's harvests:
```SQL
SELECT SUM(total_yield) FROM harvests WHERE employee_id = 3;
```

## Assignments
- [SQL Zoo](http://sqlzoo.net/) 



