# JS6 Extended

In this lecture, we will embark on a journey to create a JavaScript-based To-Do List project. This project will not only help you learn the basics of building a web application but also exercise various JavaScript capabilities.

## Writing Our To-Do List Logic

### Importing Data

To keep our code organized, we'll use ES6 module syntax for import and export statements. In `index.js`, import the `task.json` file to access our To-Do tasks:

#### Require Statements (NOT JS6)

Before we see how ES6 works with import statements on a modular level, we can see how to import information through the `require` function.

```js
//index.js

// This will grab the JSON information from tasks.json and set it to a variable named tasks.
const tasks = require("./tasks.json")
console.log(tasks);
```

#### Import Statements (ES6)

```javascript
//index.js
// This will grab the JSON information from tasks.json and set it to a variable named tasks.
import tasks from './tasks.json' assert {type:"json"};
console.log(tasks);;
```

When you run `npm start` you'll receive an error stating that index.js is not within an npm module.... but we have an npm project with `package.json` so what's missing? Well we need to tell our `package.json` to work as a module for this project by adding `"type":"module` to `package.json`

```json
{
  "type": "module",
  "name": "to-do-list",
  "version": "1.0.0",
  "description": "This is an app that will allow you to create tasks and delete tasks",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "test": "jest"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "jest": "^29.7.0"
  }
}
```

#### Why import > require

Opting for ES6 import statements over CommonJS (require) statements in Node.js projects is a wise choice for several reasons. ES6 imports bring consistency across the JavaScript ecosystem, ensuring that your code aligns with modern JavaScript practices used both in Node.js and browsers. They offer benefits such as static analysis, making it easier to catch errors early in development, and supporting tree shaking for more optimized bundles. ES6 imports also improve code readability, allow for selective import of specific items, and provide a consolidated syntax for both default and named exports. Furthermore, they offer better future compatibility as Node.js continues to align with ECMAScript standards. These advantages collectively contribute to more efficient and maintainable code in your Node.js projects.

### Mapping

We currently have an Array of task objects with the keys of `id, task, and completed` within our `index.js` file. As we interact with API's and work with React.js we will notice this is a very common scenario. With that said it's important we understand how to iterate through this information without using `for i, in, of` loops and instead utilize the `.map()` method.

Lets take a look at each task individually first:

```js
//index.js
import tasks from './tasks.json' assert {type:"json"};
// list of tasks from tasks.json
//||       A variable to reference each item within the array
//||        ||
//\/        \/
tasks.map((task)=>{
    console.log(task) // Specify the behavior to conduct to each item within the array
})
```

We are entering each object within the Array of tasks, meaning we could enter each individual object key through dot or bracket notation within our mapping function.

```js
//index.js
import tasks from './tasks.json' assert {type:"json"};

tasks.map((item)=>{
    console.log(item.id, item.completed, item.task)
})
```

> Note that our mapping function only works from left to right and does not allow us to add an argument for reversing the order nor for how many steps to take within each item on the list. This is a very simple function that will iterate from left to right through every item on the array. This means that any changes we need to make to the array must happen prior to triggering the mapping function

### Object Destructuring

Object destructuring allows us to extract values from objects and create variables. We can use object destructuring to access properties of our tasks easily:

```javascript
//index.js
import tasks from './tasks.json' assert {type:"json"};

const { id, task, completed } = tasks[0];
console.log(`Task ${id}: ${task}, Completed: ${completed}`);

tasks.map(({id, task, completed} = item)=>{
  console.log(id, task, completed)
})
```

### Filtering

Filtering is another fundamental array operation in JavaScript, and it's used to create a new array containing a subset of elements from the original array. Unlike `map`, which transforms each element, `filter` selectively includes or excludes items based on a condition you provide. This is especially useful when you want to extract specific items from a larger dataset or filter out unwanted elements.

Let's dive into how the `filter` method works:

```javascript
// index.js
import tasks from './tasks.json' assert { type: 'json' };

// Let's say we want to filter out completed tasks.
const completedTasks = tasks.filter((task) => {
  return task.completed === true; // Only include tasks where 'completed' is true.
  //return task.completed (this is already a bool)
});

const incompleteTasks = tasks.filter((task) => {
  // return task.completed === false
  return !task.completed;
});

console.log(tasks)
console.log(completedTasks);
console.log(incompleteTasks);
```

In this example, we use the `filter` method to create a new array called `completedTasks`. The `filter` function takes a callback as its argument, which is executed for each element in the original `tasks` array. It checks whether the `completed` property of each task is `true`. If it is, the task is included in the `completedTasks` array; otherwise, it's excluded.

The resulting `completedTasks` array contains only the tasks marked as completed. You can adjust the filtering condition to suit your specific needs. For example, you could filter tasks based on their priority, category, or any other criteria.

> Remember that the `filter` method doesn't modify the original array; it creates a new array with the filtered elements. This means you can work with both the original and the filtered arrays separately. The power of `filter` lies in its ability to efficiently extract data that meets certain conditions from a larger dataset, simplifying data processing tasks.

## Axios and the PokeAPI

In this lecture, we'll explore the Axios library and its application with the PokeAPI. We'll delve into what Axios is, why it's often preferred over the native Fetch API, and understand the code that demonstrates how to use Axios to interact with the PokeAPI.

### What is Axios?

**Axios** is a popular JavaScript library for making HTTP requests from the browser or Node.js. It provides a simple and consistent API for sending and handling HTTP requests. Axios is promise-based and allows developers to perform tasks like making GET, POST, PUT, DELETE requests, and more, with ease. It simplifies the process of sending and receiving data from web services and APIs.

### Why Axios > Fetch?

Axios offers several advantages over the native Fetch API:

1. **Promises by Default**: Axios uses Promises for handling asynchronous operations, making it easier to work with asynchronous code. In contrast, Fetch uses a callback-based approach that requires additional work for error handling.

2. **Request and Response Interceptors**: Axios supports request and response interceptors, allowing you to transform data or headers before sending a request or after receiving a response. Fetch doesn't provide this functionality natively.

3. **Browser and Node.js Compatibility**: Axios is designed to work seamlessly in both the browser and Node.js environments. Fetch, originally intended for browsers, requires extra work to use in Node.js.

4. **Error Handling**: Axios provides detailed error information by default, making it easier to identify issues during requests. Fetch requires additional error handling logic to provide similar information.

### Code Example

Now, let's break down a code example that demonstrates how to use Axios to interact with the PokeAPI. This code fetches information about the Pokémon "Ditto" and logs its front default sprite URL.

```javascript
import axios from "axios";

const getPokemon = async () => {
  try {
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon/ditto");
    console.log(response.data.sprites.front_default);
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

getPokemon();
```

- First, we import Axios to access its functionality.

- We define an `async` function named `getPokemon`.

- Inside the function, we use a `try...catch` block to handle potential errors gracefully.

- We use `await` with `axios.get()` to make an HTTP GET request to the specified URL (PokeAPI's "Ditto" endpoint).

- Upon successful retrieval, the response data is logged, specifically the URL of the front default sprite for Pokémon "Ditto."

- In case of an error (e.g., network issues or invalid URL), the `catch` block logs an error message.

This code showcases how Axios simplifies the process of making HTTP requests, handling responses, and dealing with potential errors, making it a valuable tool for interacting with web services and APIs like the PokeAPI.

## Conclusion

In this lecture, we've explored the process of creating a JavaScript To-Do List project that exercises several essential JavaScript capabilities. We've used object destructuring, mapping, and filtering to work with our tasks, as well as import statements to keep our code modular.
