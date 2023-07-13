# School API IV

By the end of this assignment you will have a fully serviceable CRUD API with user authentication capabilities that will allow School staff to easily manage students and schollastic equipment.

## Student Model

In this assignment we will extend the application of the Student Models fields by creating a ManyToMany relationship to the Class Model and Grade.

| field              | required | type    | example data         | unique | default    | validator/s                          | related_name |
| ------------------ | -------- | ------- | -------------------- | ------ | ---------- | ------------------------------------ | ------------ |
| name               | True     | string  | John W. Watson       | False  | None       | custom regex format                  |              |
| student_email      | True     | string  | johnnyBoy@school.com | True   | None       | custom regex to end in '@school.com' |              |
| personal_email     | False    | string  | johnnyBoy@gmail.com  | True   | None       | None                                 |              |
| locker_number      | True     | int     | 137                  | True   | 110        | MinVal = 1 and MaxVal = 200          |              |
| locker_combination | True     | string  | 37-68-98             | False  | "12-12-12" | custom regex format                  |              |
| good_student       | True     | boolean | True                 | False  | True       | None                                 |              |
| classes            | True     | MtM     | [1,2,3]              | False  | None       | 0 > x < 8                            | students     |

- Validators
  - clean() method: should also ensure that a Student has more than 0 and less than 8 classes.

## Class Model

In this assignment we will implement the Class Model to allow Students to take classes.

| field     | required | type   | example data    | unique | default   | validator/s         |
| --------- | -------- | ------ | --------------- | ------ | --------- | ------------------- |
| subject   | True     | string | Intro to Python | True   | None      | custom regex format |
| professor | True     | string | Mr. Cahan       | False  | Mr. Cahan | custom regex format |
| students  | True     | MtM    | [1,2,3]         | False  | None      | 0 > x < 31          |

- Validators

  - validate_subject_format: Ensures only string in Title() format is accepted
  - validate_professor_name: Ensures only string in the following format "Professor John" is accepted
  - clean(): Will ensure every class has at least 1 and no more than 30 student

- Methods:
  - str\_\_ : returns "{subject} - {professor} - {students count}"
  - add_a_student: Takes in a Students pk||id and adds it to the students relationship
  - drop_a_student: Takes in a Students pk||id and drops it from the students relationship along with the students grade

## Grades Model

In this assignment we will implement the Grades Model to give each student taking a class and a Grade.

| field   | required | type    | example data | unique | default | validator/s                |
| ------- | -------- | ------- | ------------ | ------ | ------- | -------------------------- |
| grade   | True     | decimal | 100          | False  | 100     | MaxVal = 100 && MinVal = 1 |
| a_class | True     | FKR     | 1            | False  | None    | None                       |
| student | True     | FKR     | 1            | False  | None    | None                       |

## Creating New Apps

In this assignment we will create 2 new apps:

- class_app
- grade_app

```bash
  python manage.py start_app <name_of_app>
```

**Don't forget to add apps into the `INSTALLED_APPS` section in the projects settings.py**

## Running Tests

Delete all the test files inside of each individual application. Add the `tests` folder inside of this repository to your projects ROOT directory.

```bash
  python manage.py test tests
```

- `.` means a test passed
- `E` means an unhandled error populated on a test
- `F` means a test completely failed to run
