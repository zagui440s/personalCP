# Introduction to Unit Testing with Jest and Pytest

In this class we will cover the basics of Unit Testing utilizing Jest for JavaScript testing and Pytest for Python testing.

## Learning Objectives

- Testable Learning Objectives
  - Learn how to read test suites in both Jest and Pytest frameworks

- Elective Learning Objectives
  - Learn how and why tests are written
  - Learn how to write unit tests

## Intro to Unit Testing

Unit testing is a critical part of software development. It helps ensure that individual units of code are functioning as expected, catches bugs early in the development process, and improves the overall quality of the code. Unit tests are usually written by developers and are typically the first line of defense against bugs and regressions.

### Basic principles of unit testing

- Tests should be automated and repeatable
- Tests should be isolated from other units of code (You'll find yourself writing code repeatedly and that's ok when it comes to tests)
- Tests should be independent of external dependencies
- Tests should be easy to understand and maintain

### Benefits of unit testing

- Improving code quality and maintainability
- Catching errors early in development
- Reducing cost of fixing bugs
- Providing documentation and examples of how the code works
- Allows developers to comfortably refactor code without breaking the app
- Helps enable continuous delivery, so you can ship code more frequently
*Some dev shops with less than ideal tests rely on manual testing to have confidence that a new app version is stable*

## Writing Tests

Now that we understand the basics of testing we can begin building our own funcitons and test suites to practice reading and writing tests.

> Lets open vs code and create a couple of files inside of a folder

```bash
ROOT
|
| - basics_of_tests.py
| - basicsOfTests.js
| - javascript.test.js
| - test_python.py
```

> Lets create a very basic addition function in both JS and Python and place the functions in their respective files.

```js
//  function takes in two number parameters
const addTwoNums = (num1, num2) => {
  //  returns the value of the addition of the two numbers
  return num1 + num2;
};
// ensure to export your function to make it accessible to other files
module.exports = { addTwoNums };
```

```python
# this function takes in two int parameters
def add_two_nums(num1, num2):
    #  will return the value of the addition of the two parameters
    return num1 + num2
```

> This functions are completed but I have no idea if they're truely following the behavior I expect. So lets set up our testing environments by importing our testing frameworks.

```bash
npm install --save-dev jest

pip install pytest
```

> You'll see a `node_modules, package-lock.json, and package.json` populate in your folder structure. We will need to open up the `package.json` and ensure it looks like the following example which will allow us to utilize the `npm test` to run jest against any .test.js files that exist in our folder.

```json
{
  "devDependencies": {
    "jest": "^29.5.0"
  },
  "scripts": {
    "test": "jest"
  }
}
```

> Finally lets create our tests and place them in their respective files:

```javascript
// import functions from the file exporting said function
const {addTwoNums} = require('./basicsOfTests')

// describe should hold either a function, page, or component not the description of what the test is doing
describe('addTwoNums()', () => {
    // it should hold a short and sweet description of what behavior it is testing for
    it("will return the added value of two num parameters", ()=> {
        // assign the return value of our function to a constant variable
        const addition = addTwoNums(3,5)
        // expect will run the "test" itself it will take 'addition' and ensure it's value is 8
        expect(addition).toBe(8)
        // basically addition == 8
    })
})
```

```python
# import the function we want to test
from basics_of_tests import add_two_nums

# tests should began with the word test and provide a
# brief description of what the test is doing.
def test_add_two_nums_returns_added_value():
    # create a variable for the functions return value
    added_value = add_two_nums(3,5)
    # assert will cause the test to pass or fail depending if the 
    # conditions inside are true or false
    assert(added_value == 8)
```

> Run the test suite and watch your tests either pass or fail.

```bash
npm test

pytest
```

## Overview

Today we covered why and how to write tests in both JavaScript and Python utilizing Jest and Pytest as our standard testing frameworks. We covered how to read and run tests to ensure our code is behaving correctly and we covered how to interact with failing tests.
