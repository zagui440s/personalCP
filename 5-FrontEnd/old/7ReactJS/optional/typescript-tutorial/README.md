# TypeScript Tutorial

## What is TypeScript?

TypeScript is, first and foremost, a programming language. TypeScript is not an entirely new language though, not really. Instead it is a _typed superset_ of JavaScript. That means TypeScript starts with _all_ of the language features of JavaScript as a base and really only adds one thing - a _type system_. This means TypeScript allows us to add _type annotations_ to JavaScript code for the sake of being explicit about what type a variable is intended to hold. So for example, in JS we might write:

```js
const text = "Hello World";
```

whereas in TS we can add a type annotation and write:

```ts
const text: string = "Hello World";
```

There ends up being a lot more to it, but this is the core idea - being explicit about types and adding _static typing_ to JavaScript, which is normally _dynamically typed_.

### Dynamic vs static typing

What's the difference between a language being _dynamically typed_ vs _statically typed_?

JS is dynamically typed, meaning that types exist, but only in a shallow way - any variable can hold any type and there's no real enforcement of type expectations as a result. This means in JS, if there is a type-based bug, it will only show up at _run-time_.

```js
const a = 1;
const b = "2";

function addition(x, y) {
  return x + y;
}

console.log(addition(a, b)); // '12'
```

Maybe you intended for that `b` variable to hold a number, not a string, but you mistakenly defined it as a string (or more likely you read it from an input stream of some kind and forget to convert string -> number). Either way, when you attempt to add a number and string in JS, it silently fails, i.e. it gives you a bogus result but sends no warning. This probably wasn't the intended behavior, but because of JS's dynamic type system, you will only discover the bug at run-time when it causes some failure down the line.

Now let's consider the same code in TS, adding some type annotations:

```ts
// TS will implicitly determine the type if no annotations are given
const a = 1; // a: number
const b = "2"; // b: string

// a function's parameters and return type can be annotated as well
function addition(x: number, y: number): number {
  return x + y;
}

// ERROR - Argument ('b') of type 'string' is not assignable to parameter ('y') of type 'number'
console.log(addition(a, b));
```

This is the great benefit of _static typing_ - this code doesn't fail at run-time, it fails at _compile-time_. Before you can run TS code, it _compiles_ the code from TS to JS, but in doing so it checks to make sure all the types line up as expected. And if not - it won't compile - you simply won't get a runnable program as output if such errors exist! This is actually good news, because if you program in TS and your code does succesfully compile, it means you are (almost) guaranteed you have eliminated an entire class of bugs - type bugs! Even better, that compilation step usually doesn't need to be explicit, because if you are writing the code in a modern editor like VSCode you should see the errors right in your editor along with helpful intellisense pointing to the problem.

![inline type error](./page-resources/inline-type-error.png)

> Note: The eagle-eyed student may have noticed the error message above implies the type of `b` isn't `string` but literally `"2"`. This is actually correct! Because I defined the varaible with a const (not a let) TS 'zooms in' to make the type that much more specific - `b` isn't of type `string` because by the nature of const assignemnt it is always going to hold the very specific string `"2"`, so it's type literally is `"2"`!

## Compiling / Running TS code

### The official TypeScript compiler - `tsc`

There are a few different ways to work with TypeScript, but let's start with the official tool so we can understand how it really works under the hood before moving on to more convenient solutions.

Let's download the official typescript compiler and do so globally, so we can access it anywhere (and not just in a specific project)

```sh
npm install -g typescript
```

> Note: on my system I had to add `sudo` to the beginning of the command to install the program globally

You should now have a command line program available on your system called `tsc` (typescript compiler). In order to test it out, let's create a simple TypeScript file (`greeter.ts`), but only put basic JavaScript code in there - no type annotations!

```ts
function greeter(person) {
  return "Hello, " + person;
}

const user = "Jane User";

console.log(greeter(user));
```

Now compile it from TS -> JS with `tsc`:

```sh
tsc greeter.ts
```

In a moment you should see a sister-file appear next to `greeter.ts` called `greeter.js` - take a look inside!

You will see it is more or less the same code! The main difference should be that the `const` declaration has been replaced with a `var`. There are two important points to note here:

1. vanilla JS _is_ valid TS - TS is a superset of JS so vanilla JS is perfectly valid as TS code, making the type system fully opt-in

2. `tsc` not only converts type-annotated TS to vanilla JS, it also makes it very backwards compatible JS. This is more obvious when you look at the output of a big, complicated TS file, but the JS output of `tsc` is compatible with very old versions of JS, so it's a great way to guarantee your code will run even on very old platforms.

Now let's add the type annotations and try again. In `greeter.ts`:

```ts
function greeter(person: string): string {
  return "Hello, " + person;
}

// try changing this to 'const user = 1' to see the typechecker in action
const user = "Jane User";

console.log(greeter(user));
```

Now run `tsc greeter.ts` again and look at the output. It's the same file! Type annotations are only a TS idea, but once compiled, your JS is identical with our without them.

> To see what a more complicated `tsc` output looks like, use `tsc` to compile the provided file `zfighter.ts`. This will look a lot more complex because we are using `tsc` to compile a later JS idea like class-based objects down to backwards-compatible JS which didn't yet have this idea as a high level keyword.

### An easier way to run TS code - `ts-node`

`tsc` is how we go from TS -> JS code, and then we can run the JS code or use it in a project, as JS is what browsers actually understand and run. But for the sake of convenience it's useful to have a tool that let's us write and execute TS without worrying about the details - enter `ts-node`. Let's download it, again, globally:

```sh
npm install -g ts-node
```

Now you can use `ts-node` to directly execute a TS program, just like `node` does for JS. This is my preferred method of working with TS.

```sh
ts-node zfighter.ts
```

This will execute the code as expected and show any output, but will not create a `zfighter.js` file in the process. It is still using `tsc` below the hood, but it's a more convenient option for executing TS code or exploring some behavior in the REPL environment.

### Configuring the behavior of `tsc` with `tsconfig.json`

TypeScript has certain default rules around compilation to JS that are designed to make it as seamless to integrate as possible with an existing JS project. That's why existing JS counts as perfectly good TS. Sometimes it is desired to have more specific rules to enforce the kind of things you want TS to allow, and what you want it treat as an error instead. The way we can do this is with a project specific file called `tsconfig.json`. In the same folder in which you are writing your TS files, create a new file called `tsconfig.json` and leave it blank for now.

Make the contents of the `greeter.ts` like so:

```ts
function greeter(person) {
  return "Hello, " + person;
}

let user = "Jane User";

console.log(greeter(user));
```

Using `tsc` or `ts-node` this code should run perfectly fine. Now let's update `tsconfig.json` with more specific rules:

```json
{
  "compilerOptions": {
    "noImplicitAny": true
  }
}
```

There are an incredible number of rules one can use to modify the behavior of the TypeScript compiler found [here](https://www.staging-typescript.org/en/tsconfig) but I just wanted to show one - `"noImplicitAny"`. With this rule now in effect, let's try compiling our code from TS -> JS, or just look at `greeter.js` is VSCode to see the new errors.

With this rule in effect, the previously allowed TS code now violates a specifically flipped on rule - noImplcityAny!

![no implicit any](./page-resources/implicit-any-error.png)

TS now no longer accepts that the function `greeter` has a parameter `person` which is untyped. By default that type is `any` (you can see this with intellisense in VSCode by hovering), which means it will accept any type as a valid input. But the rule we added says that's not okay anymore - no implicit anys! We can fix this by adding a type annotation:

```ts
function greeter(person: string) {
  return "Hello, " + person;
}

let user = "Jane User";

console.log(greeter(user));
```

Easy enough! `tsconfig.json` is how a professional team will modify the behavior of TS to fit their own needs and it can be made to produce or supress type errors in whatever way you believe improves the overall developer experience and quality of code.

## TypeScript Syntax

TypeScript doesn't change the core syntax of JS, but it does add some new keywords in order to work with the type system. Like all things programming, there's a lot of depth to explore if one wants to understand the entire space but a few basic ideas will cover 95% of usecases. Given that you already know JS, the best place to start would be [here](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html) and TypeScript's entire website is the canonical resource for learning the details of whatever it is you are trying to accomplish within TS. The rest of this guide will cover the same territory as the link above.

### Type Inference

It's important to note that TS can infer the type for most things upon varaible declaration.

```ts
let text = "Hello World";
```

This will be implicitly typed as a string. Hover over the variable in VSCode to see.

Now try the following:

```ts
let text = "Hello World";

text = 1;
```

TS will have a problem with this because `text` was originally typed as a string, so it doesn't want to be reassigned to a number. If this was something you desired, you could be explicit about the desired type, and we will show how to be more precise with this idea later, but for now, we can explicitly type text as `any`:

```ts
let text: any = "Hello World";

text = 1;
```

TS won't have a problem with this because we said upfront `text` can hold `any` type. Because this is our first official type annotation, we should be explicit in explaining it. We read: `text: any` out loud as `text of type any` so wherever you see the symbol `:` in this context, we thing of that as the previous variable/parameter has 'type of' the type that follows it.

### Explicit Types

Explciitly typing various built-in JavaScript types can be very helpful for being explicit what a certain variable is supposed to hold.

### Typing functions

First, let's consider functions, just so we know how to read them:

```ts
function greeter(name: string): string {
  return `Hello ${name}`;
}
```

We see here that we were explicit that the `greeter` parameter `name` has type `string`. But what about the `: string` at the end? That's the type annotation for the return type - greeter must return a string! If it returned a number, we would get an error. What about a function that returns nothing? We could just leave off the return type, but if we want to be explicit we could write:

```ts
function greeter(name: string): void {
  console.log(`Hello ${name}`);
}
```

`void` is a special type for function returns that means we don't return anything.

Also, before moving on, what about arrow functions? It's not too different, but let's see an actual example:

```ts
const greeter = (name: string): void => {
  console.log(`Hello ${name}`);
};
```

It can be confusing where the `:` should go in an arrow function but this is the correct syntax.

### Typing Arrays

When typing an array, one can be explict about the details of the array and what it is intended to hold.

If we wanted to explicitly type a standard JS array, we would do it like so:

```ts
const arr: any[] = [1, "a", true];
```

It's usually better to force an array to contain only one type, which we would do like so:

```ts
const arr: number[] = [1, 2, 3];
```

This becomes especially important when instantiating an empty array we plan to add to later:

```ts
const arr = []; // implicitly of type any[]

for (let i = 0; i < 10; i++) {
  arr.push(i);
}

arr.push("hello");
```

```ts
const arr: number[] = []; // explicit about contents

for (let i = 0; i < 10; i++) {
  arr.push(i);
}

// now we get an error when adding a string
arr.push("hello");
```

We can also use TS to type an array of an explicit size, mostly useful for when an array is used in JS in place of a tuple in Python, as JS does not have an explicit tuple type:

```ts
const personTuple: [string, number, boolean] = ["Ben", 35, true];

const [firstName, age, likesPotatoes] = personTuple;
```

This works well with destructuring and also makes it explicit what the size of the array is and what each element of the array holds.

### Objects

Typing objects is also very useful as we can be explicit about an objects desired 'shape':

```ts
const point: { x: number; y: number } = { x: 1, y: 40 };

// Error: z does not exist on type { x: number; y: number }
point.z = 45;
```

What if we had a property of an object that might be there or might not? We have the concept of 'optional types' in this case:

```ts
const point: { x: number; y: number; z?: number } = { x: 1, y: 40 };

point.z = 45;
```

This works now. When we initally declare it, no problem that there isn't a `z`, because the `?` following it makes it optional. When we do add it, it works, but it still needs to fit the right type, we couldn't do `point.z = 'hello'` for instance without violating the rule.

### Classes

Classes are really just blueprints for objects in TS, but unlike plain objects an instance of the class has a type identical to the actual name of the class.

```ts
class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return `Point {${this.x},${this.y}}`;
  }
}

const p = new Point(1, 2);

console.log(p);
```

If you hover over `p` you will see that it _is_ a `Point` in the type world.

### Creating our own types

Working with the basic types TS provides you can be cumbersome, so it's often useful to produce your own types. One way to do this is with _type unions_. Let's say we wanted an array that could hold strings _or_ numbers, but nothing else:

```ts
// any isn't specific enough
const arr: any[] = [1, "hello", true];

// type union will say 'this or that' but nothing else
const arr2: (number | string)[] = [1, "hello", true];
```

That can get kind of cumbersome though, which is why TS also allows us to name our own types with the `type` keyword:

```ts
type NumOrString = number | string;

const arr: NumOrString[] = [1, "hello", 3];
```

Union types are also a great way to create an 'enum' - i.e. a type that only matches certain specific values. For example:

```ts
type StreetLight = "red" | "green" | "yellow";

function trafficHandler(light: StreetLight): string {
  if (light === "red") {
    return "Stop";
  } else if (light === "green") {
    return "Go";
  } else {
    return "Slow down";
  }
}

trafficHandler("blue");
```

using type unions we could make a type that only accepted a few values, so when we pass in a string that doesn't match one of the few accepted strings, it doesn't work. Without this, our `trafficHandler` function would need to be explicit about the yellow case and also handle all not valid cases, when we really just don't want to allow code that ever passed an invalid argument.

Or you could image a function that takes more than one argument type and responds accordingly:

```ts
// wraps a string in an array if not already
function wrapStringinArray(input: string | [string]) {
  if (typeof input === "string") {
    return [input];
  } else {
    return input;
  }
}

// works
wrapStringinArray("hello");
wrapStringinArray(["hello"]);

// error
wrapStringinArray([]);
wrapStringinArray(["a", "b"]);
wrapStringinArray([1, 2, 3]);
```

Union types allow us to find a middle ground between `any` and a specific type like `number` to fit use cases where we only want to match a subset of allowed types.
