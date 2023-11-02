# Modeling a domain with Entity-Relationship Diagrams & Schema design

*We will be using [ERDPlus](https://erdplus.com/) to create our entity relationship diagrams.*

## Modeling a domain

We will learn how design a database to help us solve real-world problems. We will learn some concepts and techniques used to *model* a *domain*, and then turn our model into a *schema* (tables, columns, relationships, etc) with SQL in Postgres.

Higher-level problem-solving skills like this are a huge part of software engineering and, along with the hard technical skills that let us turn our visions into working software, the kind of skills that employers are looking for.

You will find these skills help you be more efficient and productive, and, you will also be able to borrow from them when designing and building things other than databases.

![sample entity relationship diagram of a company](./page-resources/entity-relationship-diagram-company-database.webp)

### What is a domain?

A *domain*, is the term we use to describe the stuff in the real world we need to represent in our program or system.  To quote Wikipedia:

> A domain ... represents the target subject of a specific programming project, whether narrowly or broadly defined. For example, for a particular programming project that has as a goal the creation of a program for a particular hospital, that hospital would be the domain. Or, the project can be expanded in scope to include all hospitals as its domain

### What is modeling a domain?

Much of what we do as software engineers is *model* or *simulate* the real world.

To quote Wikipedia again:

> A domain model is a system of abstractions that describes selected aspects of a sphere of knowledge, influence or activity (a domain). The model can then be used to solve problems related to that domain. The domain model is a representation of meaningful real-world concepts pertinent to the domain that need to be modeled in software.

### Conceptual / Logical / Physical Data Models

A *data model* captures how we organize information about the things we care about in our domain. 

#### It is easier to begin designing a data model at a higher level of abstraction

Before worrying about if `customer.email` should be `VARCHAR(100)` or `VARCHAR(255)`, or even about foreign and primary keys, it is faster and easier to design our data model at the **conceptual level**.

There are **three traditional levels of data modeling.** Not every team will necessarily follow all three strictly. Often, all three – conceptual, logical, and physical data models – are compressed into one modeling exercise.

However, breaking the process down into these three levels can be valuable. Each step lays down a foundation for the next:

- **Conceptual:** The “what” model - **identifies business concepts**
  - *Example:* An Entity-Relationship diagram
- **Logical:** The “how” of the details - **defines data structure**
  - *Example:* The SQL defining our data schema (tables, etc) in Postgres
- **Physical:** The “how” of the implementation - **DB implementation details**
  - *Example:* Lower-level Postgres things like btrees and indices that we don't need to worry about, or even the details of how the data is stored on a hard drive.

![conceptual logical physical data model](./page-resources/conceptual-logical-physical-data-model.png)
*Image from [this article](https://bigdataanalyticsnews.com/difference-between-conceptual-logical-data-models/)*

Each level can vary depending on the situation. Later when we use Django ORM, we could consider Django Models the Logical level, and the actual SQL schema the physical level, as Django ORM actually generates our SQL for us.

### The importance of planning/modeling first

It is critical that you develop the habit of doing some *designing* or *planning* before *implementing* (writing code). Particularly with SQL and databases:

- It takes longer to make a change; up-front planning reduces the number of changes you make.
- **Once a bunch of code is written that depends on a database schema, changing that schema is hard.**
- Identifying bugs is not always straightforward.
- A flaw in a design may not be apparent until you've already written a lot of code.

Numerous studies of software engineer productivity show that catching bugs as early as possible saves companies (and devs!) time and money. Designing and planning up-front is the fastest and cheapest way to catch bugs.

Finally, your software projects are becoming larger, and take not hours, but days and eventually weeks. Project management and some designing/planning is essential.


## Design principles 
### Stories?
### Single responsibility principle, etc

## Entity Relationship Diagrams
### Entity
#### Weak entity?
### Attributes
### Relationships
#### One to one
#### One to many
#### Many to many

## ERD Diagram: 32 Flavors: Modeling an ice cream store
### Store: A Single location
### Inventory: Ice cream, cones
### Buckets of ice cream
### Boxes of cones
### Sales: Ice cream cones
### Ice cream cones
### Purchase
### Payroll: Employees, timesheets 
### Employees
### Timesheets

## Using an ERD Diagram to build a schema
### Figure out your tables
### Figure out your relationships
### Create some fake data
### Write the SQL to create the tables
### Insert your fake data
### Figure out some useful queries to run

ASSIGNMENTS:
Turn the existing 32 Flavors ERD into a data schema (tables, etc)
Write some queries to find the following:
TBD??
Build your own 32 Flavors ERD and update it to:
Have multiple store locations
Employees can work at multiple store locations
Note: we’ll learn how to handle many to many relationships in SQL tomorrow


## References & Resources

- [Excellent article on Conceptual/Logical/Physical Data Models](https://www.couchbase.com/blog/conceptual-physical-logical-data-models/)

  - [Same article saved in the Internet Archive (loads slower)](https://web.archive.org/web/20231102181134/https://www.couchbase.com/blog/conceptual-physical-logical-data-models/)

- [A good article on Entity Relationship Models](https://www.geeksforgeeks.org/introduction-of-er-model/)

- [Crows Foot Notation & How to Read ERD Diagrams](https://www.freecodecamp.org/news/crows-foot-notation-relationship-symbols-and-how-to-read-diagrams/)

- [Wikipedia article on Domain Model](https://en.wikipedia.org/wiki/Domain_model)

- [Wikipedia article on Domain](https://en.wikipedia.org/wiki/Domain_(software_engineering))