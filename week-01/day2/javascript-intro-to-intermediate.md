# Intro to Javascript

## Topics Covered / Goals

- Internet History
- JavaScript History
- Overview of Intro JavaScript
- Intermediate JavaScript

## Lesson

### Internet History

We are going to start this lesson with a little history to hopefully contextualizes why JavaScript is an often strange (but necessary) language as compared to one like Python.

A lot of concepts that have to do with web development only make sense when you consider how things started and how they evolved over time.

Importantly, a goal when first creating the internet (or specifically the 'world wide web', the protocol by which 'websites' could be distributed and linked to one another) was to make it forever backwards compatible. That means a [website built in 1996](https://www.spacejam.com/1996/) should have no trouble running in 2023.

In order for this to be possible, the technologies that make up the internet are generally never modified in such a way as to create breaking changes (like Python2 vs Python3), so new features can be added, but older ones are never removed. This caveat will become important when we start talking about the history of JavaScript.

But first ...

#### How does a website work?

![Frontend vs Backend](../../page-resources/frontend-vs-backend.png)

A website consists of two concepts the 'backend' and the 'frontend'. The most important part to note is that dotted line running between 'web server'. Everything to the right of the line (including the web server itself) is the 'backend' - this means you, the programmer, can create any sort of application you want, and write it in any language you want, because you own those computers and have full (root) access. The 'web server' is still part of the backend, but it's the part that allows other users (clients) to communicate with your backend service for the sake of requesting something, either a webpage or some form of 'data'. The web server then sends a response across the internet to the client. Here's the crucial point though: you the person who created the backend do not have any direct control over the hardware/software the client is running. That means you can't neccesarily send them some Python code to execute, because they might not have a program that runs Python at their end! So what is the solution?

#### HTML/CSS

The original solution was to send information in a format known as HTML, representing the content of the page, with the latter addition of a format called CSS, which representing the styling of the page. Every client that wanted to interact with webpages needed an app called a 'web browser' which knew how to read and display such pages. Problem solved!

This worked for some time, but eventually people wanted their websites to do more, to be more than inert pages, but one's that could be interacted with in a meaningful way, that would respond to what the user did (consider something like GMail). This is where JavaScript comes in.

### JavaScript History

One of the early browsers when the internet was still a minor phenomena was Netscape, made by the company we now know as Mozilla. Netscape wanted to address this lack of interactivity issue and gave the job to a man named Brendan Eich. He was working alone. As legend has it, he had only 10 days to accomplish this task. He came up with a language he called Mocha, but the marketing people said that was a dumb name, and Java was a hot technology at the time, so they called it 'JavaScript' despite it having no meaningful relationship to the language Java.

#### Why does JavaScript matter?

JavaScript was an instant hit because it suddenly allowed websites to do much more than they previously could. To catch up to Netscape's advantage, other companies came up with their own JavaScript-like languages. Pretty soon every browser had this feature but there was terrible cross-browser compatibility. Also, JavaScript was a somewhat oddly designed language, and certain decisions it made were outright obtuse, categorically strange and hard to understand ideas like 'dynamic scope' and 'prototypical inheritance' were baked into the language and would haunt programmers for years to come. Except at this point JavaScript was already the de facto language of the web, too many resources had already been poured into making JavaScript an efficient language, so nobody wanted to start over from scratch.

#### The solution - ECMAScript

ECMA stands for 'European Computer Manufacturers Association' - it's a standard body that decided to define explicitly what JavaScript looks like, henceforth to be known as ECMAScript, though nobody wanted to start calling it by a new name so JavaScript stuck. The goal was to improve cross browser compatibility and, over time, to improve the core language. But importantly, as mentioned above, old, odd features could never be removed for the sake of compatibility, only new ones added and the recommendation to use the new ones over the old ones. This led to a couple of conferences where companies with a stake in 'web browser technologies' (Microsoft, Google, Mozilla, Apple) argued over how they wanted the language to evolve. This ultimately culminated in what's reffered to as ES5, or ECMAScript 5, the new standard that added some very essential features, followed by ES6, followed by a new update every year or two they don't even actively number, it's just ES2020 or whatever the latest is.

The end result is JavaScript is a very useful language at this point. The downside is all the [old stuff](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/with) is still there, and sometimes you have to understand it, including the very odd behavior of the `this` keyword (which we will not cover today) and certain odd things like variable declarations going from a keyword named `var` to one named `let/const` that seems on the surface identical but differs in certain special situations.

#### Node

JavaScript was initially intended to simply be the language that allowed web browsers to be interactive, but there's nothing stopping anyone from implementing it as a general purpose language, and thats exactly what someone named Ryan Dahl did with the creation of [Node.js](https://nodejs.org/en/). Node was an implementation of JavaScript for the same of writing backends in it as well, and because of one of the core (odd) design decisions of JavaScript (the [Event Loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop)) it actually is a good fit for writing efficient web servers that can handle many requests simultaneously. That's beyond the scope of this course (we use Python and Django for our backend purposes) but it's important to know this exists simply so that we understand how it is we are executing JavaScript code outside of a web browser.

```bash
$ node # open Node in REPL (Read-Evaluate-Print-Loop) mode
```

```bash
$ node example.js # execute a specific JavaScript file
```

### Overview of Intro JavaScript

A lot of what we are about to run through was covered in the pre-work, but we want to do a quick overview if there is any confusion. Please do call it out and ask questions on a topic you feel weak on, as these are your core 'tools' in the language and you want to make sure you understand them well before moving on to more advanced parts of the language.

> This is a good lecture to try stuff out as we are going. I like to make a file called `playground.js` and just test out code snippets to see what they do. It's important to actually test stuff out because even MDN's website is not the final arbiter of correctness, it's the actual program that runs your code (in this case a specific version of `node`) and the only way to know for sure what a given line of code does is to run it.

#### Data Types

- Two kinds of data: primitive data types, and complex data types.

- Primitive data types evaluate to themselves, and are immutable (unchangable once created). Examples are: Strings, Numbers, Booleans, `undefined`, `null`

- Complex data types 'contain' other data types and are mutable (you are really dealing with a memory address and not a 'thing' so you just change what's at that memory address). More on this in the complex data types section.

#### Primitive Data Types

- Strings

  - Anything enclosed in single, double quotes, or back ticks

  ```js
  "I am a string";
  "Me too, and I make doing 'this' look easy";
  `Back ticks give you string interpolation: ${4 + 44}`;
  ```

  - Interpolation is when you substitute a variable/expression into a string.

  ```js
  const firstName = "Tom";
  console.log(`My first name is ${firstName}`);
  ```

  - Like in Python, string are immutable, so you cannot change a string once created.

  ```js
  const name = "benjamin";
  name[0] = "B";
  console.log(name); // "benjamin"
  ```

  - Even though they are immutable, you can still use the value of one string to create a brand new string. String are ultimately objects in JavaScript (most things are) so they support a lot of useful methods, documented on [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) to aid in this process.

  ```js
  const name = "benjamin";
  const properName = name[0].toUpperCase() + name.slice(1);
  ```

- Numbers

  - We aren't going to discuss numbers in depth, you know how numbers work, but it's an important point that in JavaScript there is not 'int' vs 'float' distinction, they are all numbers. You can confirm a values type with:

  ```js
  typeof 5; // 'number'
  typeof -5.231e10; // 'number'
  ```

- Booleans

  - Booleans are `true` or `false` and all the boolean operators work as expected

  ```js
  true || false; // true
  ```

  - **Short-circuiting**. This is likely a new idea. When JavaScript evaluates a boolean expression, it will only evaluate as much as it needs to to know the result. So for the example above, after looking at `true` and seeing the comparsion is an `||`, it knows that statement must be `true` (because `true || <anything>` === `true`) so the `false` value is never read. Why is this important? First another idea:

  - **truthiness**. Because JavaScript is dynamically typed, values are 'implicitly coerced' from one type to another when it makes sense. For example:

  ```js
  1 || false; // 1
  ```

  This not only doesn't break, it treats the 1 as 'truth-y' and, instead of returning true, it returns the original value, `1`.

  These two ideas are commonly used together, so for example, if you are writing a function and are unsure if a value really exists or not and you want to give it a default in the case it doesn't you could write:

  ```js
  function areTheyCool(name) {
    name = name || "Jason";
    console.log(`${name} is cool!`);
  }

  areTheyCool(); // Jason is cool!
  areTheyCool(""); // Jason is cool!
  areTheyCool("Sarah"); // Sarah is cool!
  ```

  This may seem pointless and obtsue but when we get to React you will see that `||` and `&&` are often used in this way to display a component only if some precondition was met.

- `undefined`

  - A way to represent something with no meaningful value yet. This is what unassigned variables hold by default.

  ```js
  let babyName;
  console.log(babyName); // undefined
  ```

- `null`

  - Almost identical in purpose and meaning to `undefined` but specifically use to represent a non-existing object (as opposed to an uninitiated variable)

#### Complex Data Types

- Arrays

  - Holds an ordered list of values. These values can be anything: strings, numbers, objects, even other arrays!

  - You can access the values in the array by reference to its 'index', which is 0-based.

  ```js
  const daysOfTheWeek = ["mon", "tues", "wed"];
  daysOfTheWeek[0] = "sun";
  console.log(daysOfTheWeek); // ["sun", "tues", "wed"]
  ```

  - Like strings, arrays have many great methods to help you with manipulating them effectively. Reference [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)

  ```js
  const daysOfTheWeek = ["mon", "tues", "wed"];
  daysOfTheWeek.push("thurs");
  console.log(daysOfTheWeek); // ["mon", "tues", "wed", "thurs"];
  ```

- Objects

  - It's a collection of key/value pairs. You can't access it by `index` like with arrays because objects do not have an order, but you can access it by `key`

  - Useful for holding many details about a single entity, accessed through a unique key (like an id number)

  ```js
  // objects can be nested
  const database = {
    457: {
      name: "Tom",
      age: 34,
    },
    57782: {
      name: "Sally",
      age: 42,
    },
  };

  // an objects value can be referenced by key using [] syntax
  const tomEntry = database[457];

  // if the key is a string, you can also use . syntax
  console.log(tomEntry.name); // "Tom"

  // You can re-assign a key's value (mutable)
  tomEntry.age = tomEntry.age + 1;

  // this update changes the value at any reference (mutable)
  console.log(database); // { ... 457: { ..., age: 35 } }
  ```

#### Functions and primitive vs complex data types

The most important reason to distinguish between classes of data types is in how a function will consider them when passed as a variable.

```js
// primitive
let myNumber = 42;

// 'num' is 'copy by value', changes to it won't effect what was passed in
function incrementNumber(num) {
  num = num + 1;
}

incrementNumber(myNumber);

console.log(myNumber); // 42
```

if we wanted this function to actually update the variable we would need to do something like:

```js
let myNumber = 42;

function incrementNumber(num) {
  return num + 1;
}

myNumber = incrementNumber(myNumber);

console.log(myNumber); // 43
```

The opposite is true for a complex data type like an array or object:

```js
// complex
let myObject = { name: "Tom", age: 34 };

// obj is 'copy by reference', changes to it will effect what was passed in
function incrementObjectAge(obj) {
  obj.age = obj.age + 1;
}

incrementObjectAge(myObject);

console.log(myObject); // { name: "Tom", age: 35 };
```

Alternatively, if we didn't want this behavior, we would have to make a local copy in the function, like so:

```js
let myObject = { name: "Tom", age: 34 };

function incrementObjectAgeImmutable(obj) {
  const objCopy = Object.assign({}, obj); // helper function to create a new object, copy everything over
  objCopy.age = objCopy.age + 1;
  return objCopy;
}

const newObject = incrementObjectAgeImmutable(myObject);

// updated object
console.log(newObject); // { name: "Tom", age: 35 };

// preserved original
console.log(myObject); // { name: "Tom", age: 34 };
```

### Intermediate JavaScript

Just about everything we are going to discuss from this point on is what is referred to as 'syntactic sugar'. The ideas presented above are the core of the language, it defines everything it can do, and to use an academic term, it is already 'Turing complete' - ie it is provably as powerful as any other 'full power' programming language. Syntactic sugar on the other hand just provides a way for a programmer to more neatly and concisely express an idea that was already possible without it, but perhaps unecessary verbose or otherwise inconvenient.

- Variables

  Variables are named labels/identifiers for storing values. There are three ways to declare/create a variable in Javascript:

  ```js
  // const can not be reassigned
  const num = 1;
  num = 42; // Uncaught TypeError: Assignment to constant variable

  // Note that complex types don't honor this 'constant' guarantee, only the variable itself
  const obj = { num: 1 };
  obj.num = 42; // kosher
  obj = 42; // Uncaught TypeError: Assignment to constant variable
  ```

  ```js
  // let can be reassigned
  let num = 1;
  num = 42; // kosher
  ```

  Prefer `const` to `let` initially and then make it a `let` if it truly needs to be varaible.

  So what about `var`? `var` is the original keyword that preceded `let` or `const`. It has certain tricky behavior that is unexpected and the reason `let`/`const` are the new normal. You will never need to use `var` again, but in case yousee it in the future, or are curious why it's weird, here goes:

  ```js
  console.log(name); // ReferenceError: Cannot access 'name' before initialization

  const name = 42;
  ```

  ```js
  console.log(name); // undefined

  var name = 42;
  ```

  This is because `var` is 'hoisted', meaning, as far as node is concerned, this code is indetical to:

  ```js
  var name;

  console.log(name); // undefined

  name = 42;
  ```

  Terrible, what were they thinking?! The other (terrible) behavior: `var` obeys 'function scope' where `let`/`const` obey 'block scope'. So for example:

  ```js
  function sumWithVar(n) {
    var sum = 0;

    for (var i = 0; i < n; i++) {
      sum += i;
    }

    console.log(
      `Hey can I still access ${i}? Yup it exists for the entire life of the function!`
    );

    return sum;
  }

  function sumWithLet(n) {
    let sum = 0;

    for (let i = 0; i < n; i++) {
      sum += i;
    }

    console.log(
      `Hey can I still access ${i}? No of course not, why would that be useful behavior?`
    );

    return sum;
  }

  sumWithVar(5); // 15
  sumWithLet(5); // ReferenceError: i is not defined
  ```

- Functions

  You should be familiar with ordinary JS functions by now

  ```js
  makeFullName("Benjamin", "Cohen"); // "Benjamin Cohen"

  function makeFullName(firstName, lastName) {
    return `${firstName} ${lastName}`;
  }
  ```

  Note that you were able to call the function (seemingly) before it was declared. This is because of a feature in JS called 'hoisting'.

- 'Arrow' functions

  Functions are not only syntactic structures in JS but also 'first class' values, meaning they can be assigned to a variable and passed around. This is very useful and modern JS makes this simple to do with what are called 'arrow functions'.

  ```js
  const makeFullName = (firstName, lastName) => `${firstName} ${lastName}`;

  makeFullName("Benjamin", "Cohen"); // "Benjamin Cohen"
  ```

  This seems about identical but note that:

  1. it is a normal variable, so had to be defined before referencing/calling it.
  2. The function itself is anonymous - it has no name. To name it, you need to store it in a variable.
  3. the return statement was implicit, perfect for one-liners. (arrow functions can also have full bodies but this is the default behavior)

  This is incredibly useful when using a 'higher order function', ie a function that takes another function as a paremeter. The classic example is `map`, and Array method that allows you to create a new array based on the original with the help of a 'mapper' function. Like so:

  ```js
  const nums = [1, 2, 3];

  const doubles = nums.map((x) => x * 2);

  console.log(doubles); // [2, 4, 6]
  ```

  Consider how much more convenient and concise that is than the below example:

  ```js
  const nums = [1, 2, 3];

  const doubles = nums.map(doubler);

  console.log(doubles); // [2, 4, 6]

  function doubler(x) {
    return x * 2;
  }
  ```

  It's not night and day but it's a useful feature for writing short functions that doesn't litter your codebase with one off named functions.

- Ternary operator

  You may or may not have encountered this before. This is a way to nest an if/else statement inline that _returns a value_ (if else normally doesn't). This is very useful for conditionally setting a variable. So instead of writing something like:

  ```js
  const age = 24;
  let canDrink;

  if (age < 21) {
    canDrink = "nope!";
  } else {
    canDrink = "yup!";
  }
  ```

  You could condense it to:

  ```js
  const age = 24;
  const canDrink = age < 21 ? "nope!" : "yup!";
  ```

  Not only was this more condensed, but this way that canDrink variable could be set as const if that's what was desired.

- Iteration (Loops)

  Loops are an essential tool when working with complex data structures. The original `for` loop accomplishes this well enough:

  ```js
  let myNumbers = [1, 44, 72];
  for (let i = 0; i < myNumbers.length; i++) {
    console.log(myNumbers[i]);
  }
  ```

  That works but it would be nice if it just understood this was an array and we wanted to see each value once. This is where `for ... of` syntax comes in:

  ```js
  let myNumbers = [1, 44, 72];
  for (let num of myNumbers.length) {
    console.log(num);
  }
  ```

  Ok that's useful enough. But the idea is actually even more sophisticated, so Objects can be iterated through as well with the Object class static method `Object.entries()`:

  ```js
  const database = {
    457: {
      name: "Tom",
      age: 34,
    },
    57782: {
      name: "Sally",
      age: 42,
    },
  };

  for (let entry of database) {
    console.log(entry); // [ '457', { name: 'Tom', age: 34 } ]
  }
  ```

  The main thing to note when iterating through an object is there is no guarantee of order. You will see all of them, but not necessarily in the order you added them or in the order that they will print when logged (objects are fundamentally unordered as compared to arrays).

- Destructuring

  Destructuring is a modern syntax tool that allows the programmer to 'pick off' useful values from an array or object. Consider these two approaches to creating varaibles from a complex data type:

  ```js
  const myArray = ["x", "y", "z"];
  const x = myArray[0];
  const y = myArray[1];
  const z = myArray[2];

  const myObject = { a: 45, b: "hello", c: true };
  const a = myObject.a;
  const b = myObject.b;
  const c = myObject.c;
  ```

  As compared to:

  ```js
  const [x, y, z] = ["x", "y", "z"];

  const { a, b, c } = { a: 45, b: "hello", c: true };
  ```

  A lot of these ideas work well with each other, so considering the previous iteration example, how much better does this read:

  ```js
  const database = {
    457: {
      name: "Tom",
      age: 34,
    },
    57782: {
      name: "Sally",
      age: 42,
    },
  };

  for (let [key, value] of database) {
    console.log(key); // '457'
    console.log(value); // { name: 'Tom', age: 34 }
  }
  ```

- The 'spread' operator (`...`)

  Often you will want to copy an array or object into another, and this isn't so easy to accomplish by default. Without modern JS we would still be able to do this with:

  ```js
  const arr = [1, 2, 3];
  const obj = { x: 1, y: 2, z: 3 };

  const arrCopy = arr.slice(0);
  const objCopy = Object.assign({}, obj);

  arrCopy[0] = 42;
  objCopy.x = 42;

  console.log(arr);
  console.log(arrCopy);
  console.log(obj);
  console.log(objCopy);
  ```

  This works and the originals are preserved as expected. But a cleaner modern approach to this is:

  ```js
  const arr = [1, 2, 3];
  const obj = { x: 1, y: 2, z: 3 };

  const arrCopy = [...arr];
  const objCopy = { ...obj };

  arrCopy[0] = 42;
  objCopy.x = 42;

  console.log(arr);
  console.log(arrCopy);
  console.log(obj);
  console.log(objCopy);
  ```

  For objects this can even be combined with destructuring nicely, as long as you remember that an object can only have one of each key and the latest one takes precedence. So to copy and update an object in one go we could write:

  ```js
  const obj = { x: 1, y: 2, z: 3 };

  const objCopy = { ...obj, x: 42 };

  console.log(obj);
  console.log(objCopy);
  ```

  We end up using the spread operator all the time when doing React so it's good to be familiar with it.

### What Else?

We could honestly keep doing this for a long time, and it's unclear if I wrote way too much already. In the case we get this far and still have time we can discuss the intricacies of the language or any particular modern feature you may have heard about but want to go into more detail.

## Assignments

> Some of you may be wondering what `exports` is on the Javascript files. The Javascript folders will sometimes have prewritten spec (test) files and in order for the spec file to read the contents of the corresponding Javascript files where your code is written, it must be attached to the `export` Javascript object. To ensure that you are writing correct code, run `node WHATEVER_CHALLENGE_NAME_Spec.js` in the `js` folder. Don't run `node WHATEVER_CHALLENGE_NAME.js` as it will blow up.

- [Roman Numerals](https://github.com/tangoplatoon/algo-roman-numerals) in JS
- [Git Practice](http://learngitbranching.js.org/)

- [Factorial](https://github.com/tangoplatoon/algo-factorial) in JS
- [Fibonacci](https://github.com/tangoplatoon/algo-fibonacci) in JS
- [Linear Search](https://github.com/tangoplatoon/algo-linear-search) in JS

```

```
