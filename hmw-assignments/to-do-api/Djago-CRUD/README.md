# To - Do List

![Alt Text](./sources/to-do-list.png)
In this assignment you will practice your Django ORM and CRUD capabilities through Django Rest Frameworks by creating a To - Do List api

## Assignment

Create a Restful API where users can CRUD(Create, Read, Update, Delete) Lists, list tasks, and list task subtasks. Construct your API to meet the following requirements.

### Lists

- `GET /api/lists/<int:id>/`  status 200 success | 404 none-exit

> Returns a specific List with all of it's tasks listed under it

- `PUT /api/lists/<int:id>/` status 204 success | 404 none-exist | 400 bad-req

> Updates a list name

- `DELETE /api/lists/<int:id>/` status 204 success | 404 none-exist

> Deletes a list and all of its task and subtasks

- `GET /api/lists/` status 200 success

> Returns all existing lists

- `POST /api/lists/` status 201 success | 400 bad-req

> Creates a new list and returns the newly created list in the response

### Tasks

- `GET /api/lists/<int:id>/tasks/<int:task_id>/`  status 200 success | 404 none-exit

> Returns a specific task with all of it's sub-tasks listed under it

- `DELETE /api/lists/<int:id>/tasks/<int:task_id>/` status 204 success | 404 none-exist | 400 bad-req

> Updates a task name and a tasks completed status

- `DELETE /api/lists/<int:id>/tasks/<int:task_id>/` status 204 success | 404 none-exist

> Deletes task and all of its subtasks

- `GET /api/lists/<int:id>/tasks/` status 200 success

> Returns all existing tasks corresponding to this list

- `POST /api/lists/<int:id/tasks/` status 201 success | 400 bad-req

> Creates a new task corresponding to this list and returns the newly created task in the response

### Sub-Tasks

- `GET /api/lists/<int:id>/tasks/<int:task_id>/subtasks/<int:subtask_id>/`  status 200 success | 404 none-exit

> Returns a specific sub-task

- `DELETE /api/lists/<int:id>/tasks/<int:task_id>/subtasks/<int:subtask_id>/` status 204 success | 404 none-exist | 400 bad-req

> Updates a sub-task name and a sub-tasks completed status

- `DELETE /api/lists/<int:id>/tasks/<int:task_id>/subtasks/<int:subtask_id>/` status 204 success | 404 none-exist

> Deletes a sub-task

- `GET /api/lists/<int:id>/tasks/<int:task_id>/subtasks/` status 200 success

> Returns all existing sub-tasks corresponding to this list

- `POST /api/lists/<int:id/tasks/<int:task_id>/subtasks/` status 201 success | 400 bad-req

> Creates a new sub-task corresponding to this task and returns the newly created sub-task in the response

### Behavior

- List deleted

> if a list is deleted all of its tasks and subtasks will be deleted as well

- Task deleted

> if a task is deleted all of its subtasks will be deleted

- Task marked completed

> if a task is marked as completed all of it's subtask should be updated to completed as well

- Sub Task maked completed

> if all sub-tasks of a task are marked as completed the parent task itself should be marked as completed

- Creating Subtask

- if a task is marked as completed but the user creates a subtask for said task the tasks completed value should be updated to incomplete

**`MAKE SURE YOU ARE WRITING TEST AND VALIDATORS FOR YOUR PROGRAM`**
