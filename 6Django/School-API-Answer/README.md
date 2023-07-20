# School API VII

By the end of this assignment you will have a fully serviceable CRUD API with user authentication capabilities that will allow School staff to easily manage students and schollastic equipment.

## Integrade the Noun Project

In this exercise you will utilize the noun project to get Icons from class subjects. The following endpoint `http://127.0.0.1:8000/api/v1/icons/python/` should only allow the argument to be an existing subject and should return a 404 response if the object does not exist or the preview_url:

```json
    "https://static.thenounproject.com/png/1375869-200.png"
```

## Running Tests

Delete all the test files inside of each individual application. Add the `tests` folder inside of this repository to your projects ROOT directory.

```bash
  python manage.py test tests
```

- `.` means a test passed
- `E` means an unhandled error populated on a test
- `F` means a test completely failed to run
