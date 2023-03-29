# State in React

## Topics Covered
- The Tao of React
    - What is state (generally)
    - what is a pure function (functional programming concepts)
    - React components as pure functions
    - React's rerender policy (props change, rerender)
- Class components and state (old way)
- Functional (pure) components and useState (hooks)
    - basics of how to use useState
    - why is it like that? (no mutation, brand new object, FP)
    - rules of hooks
    - different approaches to useState
- Video Store features pt 2:
    - When user clicks on a video, display video details (on same screen, no modal, + dismissable)
    - Simple checkout/return buttons for videos (update root state)


## Lesson

### The Tao of React

Tao = 'the way' i.e. why is React like this? 

The answer: functional programming.

Functional programming at it's heart boils down to the recognition that the majority of bugs are a result of a concept known as *state*.

#### What is State

In it's most abstract form, *state* refers to the *context* in which your function/program executes. This isn't a concept unique to React, it exists in all programming languages. For example, consider this function:

```js
function xPlusY_Pure(x, y) {
    return x + y;
}

const result = xPlusY_Pure(1, 2);
const result2 = xPlusY_Pure(1, 2);

result === result2
```

This function we just created `xPlusY` is what is known as a 'stateless' or 'pure' function. What makes a function pure?

### What is a pure function

**A pure function's output is entirely dependent on it's input**

Given the arguments `(1, 2)` our function `xPlusY` return an output *entirely dependant* on the input. The function does not reference (or change) anything outside of it's own scope (parameters and body), so we say it is *pure*.

What's the alternative?

```js
let x = 0;

function xPlusY_Stateful(y) {
    x++;
    return x + y;
}

const result = xPlusY_Stateful(2);
const result2 = xPlusY_Stateful(2);

result !== result2;


```

Now our function `xPlusY` references some state outside of itself, and the value of this state changes over time. This means our function is no longer pure. In academic jargon the quality we have lost is known as *referential transparency*. What does this mean?

Notice in our first example `xPlusY(1, 2)` was called twice, and both times it had the same output (`3`). However, in our second example `xPlusY(2)` was called twice, but had a different output each time! This is the core problem with impure functions, with state itself.

In example one, we have the quality of *referential transparency*, which means that the same inputs applied to the same function *always* produces the same output. It makes sense we would have this property if the only state our function references is in the parameters, as those are provided fresh each time the function is called.

However in example two we lose this quality. That's because we are referring to external state, which our own function might change, or even another function entirely! This is the core problem with global state and the source of most bugs. The core problem with impurity in a function is that it becomes *context sensitive*. In our original version of `xPlusY` it doesn't matter what was run before that function, all that matters is the function itself, as the output is entirely dependent ont he input. In the second example however the result of `xPlusY(2)` is only partially based on the input, whereas part of the output is determined by how many times the function has previously been called. The more a series of functions rely on external state, the harder it will be to debug that program, as the specific set of instructions that came before it can effect the outcome, so one needs to know not just the body of the function in question but everything that potentially happened before it is ran.

#### Some more impure examples

Just so you get a sense of what counts as 'impure':

1) Not just manipulating external state, but relying on it at all can cause you to lose referential transparency 

```js
let x = 0;

function incrementX() {
    x++;
}

function xPlusY(y) {
    return x + y;
}

xPlusY(2); // 2
incrementX();
xPlusY(2); // 3
```

2) 'side effects' - anything you change/rely on 'outside' of your function results in impurity

```js
const fs = require('fs');

function readFileAndPrintToConsole(fileName) {
    const data = fs.readFileSync('./input.txt', {encoding:'utf8', flag:'r'});
    console.log(data);
}

readFileAndPrintToConsole("./example.csv");
```

Why is this impure? Technically, if I give the same input (`"./example.csv"`) I should get the same result. However, there are points of faliure that have nothing to do with our function, such as:
1) "Does `"./input.txt"` exist, or is that a non-existent file?
2) is `console.log()` actually connected to anything? Perhaps there is no console to log to.

This function could fail because of it references state outside of itself, which includes 'state' in the real world - does that thing you are reading from or writing to even exist? Relying on (or manipulating) anything you don't directly control is known as a a *side effect* and this too makes a function impure.

It's important to note: **there is nothing wrong with impure functions**. Without impure functions, your computer could never read input or write anything to a screen, and interacting with something like a database is inherently impure - what if there is no DB connection, or the table in question was dropped, or simply the data you want to return can be changed by other means so multiple identical queries to the DB could result in different output if the DB contents have been altered since last queried.

FP is not about eliminating impure functions outright, but in recognizing the value of referential transaparency and attempting to make purity the default, and only introduce impurity when actually necessary and in a way that is predictable for debugging purposes.

### React components as pure functions

We only bring up this idea of purity to show you that React's functional components are by default pure.

```jsx
export default function Profile() {
  return (
    <>
      <h2>User Name</h2>
      <img src="https://via.placeholder.com/600x400" />
    </>
  );
}
```

This takes no inputs, and it's output is always the same, so it is naturally pure. Input entirely determines output, and calling it multiple times in a row will always return the same result, regardless of what happened between consecutive calls.

```jsx
export default function Profile({ name, imgUrl }) {
  return (
    <>
      <h2>{name}</h2>
      <img src={imgUrl} />
    </>
  );
}
```

This is still pure, because our input (props) entirely determine the output. Same props will always result in same output.

This is a good quality to have because it means React only needs to render the component once, and only rerender it if a prop changes. Additionally, it is by default *memoized*, meaning that once a set of input parameters have been used to produce an output, it is forever remembered and rerunning the function is unnecessary. This is only possible because we have this guarantee of purity. We can these 'pure' or 'dumb' components - dumb because they don't need to be aware of any context outside of themselves.

### React's re-render policy

React's guarantee is that: if the props change, the component rerenders. So imagine you had a Checkbox component like so:

```js
export default function Checkbox({ label, isChecked }) {
    return (
        <>
            <label>{label}</label>
            <input type="checkbox" checked={isChecked} />
        </>
    )
}
```

This component should automatically rerender anytime the prop `isChecked` changes value. However, pure React components don't directly give a means of updating props in a way that React is generally aware of. So for example:

```js
import Checkbox from './components/Checkbox';

let isChecked = false;

export default function App() {
  const onClickHandler = () => {
    console.log(`isChecked equals ${isChecked}`);
    isChecked = !isChecked;
    console.log(`isChecked now equals ${isChecked}`);
  }

  return (
    <>
      <h1>hello world</h1>
      <button onClick={onClickHandler}>Click me</button>
      <div>
        <Checkbox label={"I am a transformer"} isChecked={isChecked} />
      </div>
    </>
  )
}
```

This seems like it should work, but it doesn't, as `App` itself does not know to rerender (none of *it's* props changed).

To demonstrate this is true however, install the [React chrome dev tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) and then go into your running app and select the 'Components' tab in the general devtool. From there, you should have a toggle to change the value of `isChecked` on the `Checkbox` component and the component's look should update in real time.

### Class component's and State

Our problem right now is we have no way to inform a component that something has changed and we want to trigger a rerender. One way to accomplish this in React is to use `state`. This no exists as a concept with functional components as well, but we will first introduce it with the old apporach, class components. Class components are simply another way of writing a React component, but as a JS class, not a function.

```jsx
import { Component } from "react";

export default class Checkbox extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <label>{this.props.label}</label>
                <input type="checkbox" checked={this.props.isChecked} readOnly />
            </>
        )
    }
}
```

The above is equivalent to the functional component we previously created of the same name. The main difference is we are now working with a class, need to create a constructor and inherit from the superclass of `Component` and we access `props` through the `this` keyword. To introduce state to a class Component, we do this:

```jsx
import { Component } from "react";
import Checkbox from './components/Checkbox';

export default class App extends Component {
  state = { isChecked: true };

  constructor(props) {
    super(props);

    this.onClickHandler = this.onClickHandler.bind(this);
  }

  onClickHandler() {
    this.setState({ isChecked: !this.state.isChecked });
  }

  render() {
    return (
      <>
        <h1>hello world</h1>
        <button onClick={this.onClickHandler}>Click me</button>
        <div>
          <Checkbox label={"I am a transformer"} isChecked={this.state.isChecked} />
        </div>
      </>
    );
  }
}
```

This will now work! But you probably noticed some weirdness. Most notably, in the constructor we have the line:

```js
this.onClickHandler = this.onClickHandler.bind(this);
```

This is necessary because of the weirdness of the JS `this` keyword. However explaining why is relatively complex and requires a deep dive into the weirdness of the JS `this` keyword. The React team recognized this pain point and as a result told developers ot prefer functional components whenever possible, as that approach completely sidesteps `this`. However class components were the only way to access a feature like `state` initially. That is, until **React Hooks** were introduced.

### Functional components and hooks

**Hooks** are designed to 'upgrade' a functional component in a certain way. Hooks allow a functional component to remain mostly pure but to have a specific means by which is access an impure feature, and because this is the only means of invoking that functionality, it's relatively predictable. React calls this concept a *hook* and the most used hook by far is `useState`. So converting both of our components back to functional components, we can get the stateful functionality like so:

```jsx
export default function Checkbox({ label, isChecked }) {
    return (
        <>
            <label>{label}</label>
            <input type="checkbox" checked={isChecked} />
        </>
    )
}
```

```jsx
import { useState } from "react";
import Checkbox from './components/Checkbox';

export default function App() {
  const [isChecked, setIsChecked] = useState(false);

  const onClickHandler = () => setIsChecked(!isChecked);

  return (
    <>
      <h1>hello world</h1>
      <button onClick={onClickHandler}>Click me</button>
      <div>
        <Checkbox label={"I am a transformer"} isChecked={isChecked} />
      </div>
    </>
  );
}
```

This now works and is a lot cleaner. We don't have to use the `this` keyword and our app rerenders anytime the state changes. Let's dive a little deeper into this `useState` api.

### `useState`

First we import `useState` from the react core library. Then, we invoke it *at the root level of our component* like so:

```js
const [isChecked, setIsChecked] = useState(false);
```

What is this? so `useState` takes a single argument, an initial value to store as a variable. Then it returns a list of exactly two elements, the closest we can get to a tuple in JS. We destructure that tuple to access it's two elements. The first, which we named `isChecked` represents the current value of that state variable. The second `setIsChecked` (`set<varName>` is the common pattern) is a function that, when called, can be passed a new state for that variable. If the newly passed state is *not equal* to the previous state, the new value is set to `isChecked` and the entire component rerenders.

That's the essence of useState, it's essentially a React-aware variable that will trigger rerenders when the value it's holding *changes* (not just mutates if its an object or array).

### Real world example

A lot of how React works can seem odd if you aren't used to the functional programming approach. To demonstrate what I am talking about, let's look at a `useState` example where the state is a non-primitive type, like an array or object.

```jsx
import { useState } from "react";

export default function ComplexState() {
    const [newNameInput, setNewNameInput] = useState("");
    const [newTitleInput, setNewTitleInput] = useState("");

    const [names, setNames] = useState(["A", "B", "C"]);
    const [rental, setRental] = useState({
        id: 1,
        title: "The Big Lebowski",
        year: "1991",
        rating: "R"
    });

    const addName = () => {
        // guard 1
        if (newNameInput.length === 0) {
            console.error("can't add empty string");
        }
        // guard 2
        else if (names.findIndex(name => name === newNameInput) !== -1) {
            console.error("can't add existing name to name list");
        }
        // valid case
        else {
            setNames([...names, newNameInput]);
        }

        // always reset input
        setNewNameInput("");
    }

    const changeTitle = () => {
        if (newTitleInput.length === 0) {
            console.error("can't add empty string");
            return;
        }

        setRental({
            ...rental,
            title: newTitleInput
        })

        setNewTitleInput("");
    }


    return (
        <>
            <h2>names:</h2>
            <ul>
                {names.map((name, index) => <li key={index}>{name}</li>)}
            </ul>
            <h3>Add name:</h3>
            <input type="text" onChange={(event) => setNewNameInput(event.target.value)} />
            <button onClick={addName} value={newNameInput}>Add name</button>
            <h2>Rental</h2>
            <div style={{ border: "3px solid black", width: "fit-content", padding: "18px" }}>
                <p>{rental.title}</p>
                <pre>{rental.year}</pre>
                <pre>rated {rental.rating}</pre>
            </div>
            <h3>Change title:</h3>
            <input type="text" onChange={(event) => setNewTitleInput(event.target.value)} value={newNameInput} />
            <button onClick={changeTitle}>Change title</button>

        </>
    );
}
```

A couple of things to note here:

1) it's a good idea to use a unique useState variable for every input to keep track of changes to the input as they happen. This could also be accessed through an onChange's event.target.value usually but useState let's us seperate concerns so we always have an up to date reflection of the input. This is done with a combo of useState and the `<input>` component's props `onClick` and `value`

```js
import { useState } from "react";

export default function StandardInputPattern() {
    const [inputValue, setInputValue] = useState("");

    return <input type="text" value={inputValue} onChange={event => setInputValue(event.target.value)}/>
}
```

2) `style` is a good built-in prop to know about, do css on the fly with an object and strings

```js
<div style={{ border: "3px solid black", width: "fit-content", padding: "18px" }}>
```

3) `useState` with non-primitive types

```jsx
// append to an array by spreading the current array contents and adding to the end
setNames([...names, newNameInput]);
// update an object by spreading the current key/val pairs and then adding/overwriting additional key/value pairs
setRental({ ...rental, title: newTitleInput })
```

### Why it is done this way

This seems like an odd approach, why not just write:
```js
names.append(newNameInput);
setNames(names);
// or
rental.title = newTitleInput;
setRental(rental);
```

This actually won't work! The reason is because React knows to rerender only if the state changes. With primitives we compare by value, but with objects/array we compare by memory address, which doesn't change when the underlying object is mutated. For that reason we always provide a brand new object, based on the original.

There is a second reason for this approach, which is the general FP concept of *immutability*. Essentially, by employing such an approach, we never actually overwrite any data, only produce new data. This means it would be simple to add a redo/undo feature into a React `useState` component.

```jsx
import { useState } from "react";

export default function UndoComponent() {

    const [value, setValue] = useState(0);
    const [inputValue, setInputValue] = useState(0);
    const [allValues, setAllValues] = useState([value]);

    const updateValue = () => {
        setValue(inputValue);
        setAllValues([...allValues, inputValue]);
    }

    const undo = () => {
        // need to create a new list, not modify old one
        const allButLast = allValues.slice(0, allValues.length - 1);
        setAllValues(allButLast);

        const newLast = allButLast[allButLast.length - 1];
        setValue(newLast);
    }

    return (
        <div>
            <h3>Value: {value}</h3>
            <div>
                <label>New value</label>
                <input type="number" value={inputValue} onChange={event => setInputValue(event.target.value)} />
                <button onClick={updateValue}>Update Value</button>
            </div>
            <pre>
                <h3>history</h3>
                <ol>
                    {allValues.map((prevValue, index) => <li key={index}>{prevValue}</li>)}
                </ol>
                <button onClick={undo} disabled={allValues.length === 1}>Undo</button>
            </pre>
        </div>
    );
}
```

### Rules of Hooks

[Rules of Hooks](https://legacy.reactjs.org/docs/hooks-rules.html)

There are some rules for using hooks that have to do with how they were implemented. The basic rule is:

**Only use hooks at the top level of a functional component**

First, hooks do not work correctly in a class component - in general you have no need for a class component anymore, just good to know about

More importantly, **top level only** means not in a conditional or loop or function or anything other than top level of the component. So you can do this:

```jsx
export default function MyComponent({ flag }) {

  let value, setValue;

  if (flag) {
    [value, setValue] = useState(45);
  } else {
    [value, setValue] = useState("hello world");
  }
}
```

or this:

```jsx
export default function MyComponent({ flag }) {

  let useStateArray = [];
  const names = ['A', 'B', 'C'];

  for (const name of names) {
    const [value, setValue] = useState(name);
    useStateArray.push([value, setValue]);
  }
}
```

or this:

```jsx
export default function MyComponent({ flag }) {

  const [value, setValue] = myOwnFunction(45);

  function myOwnFunction(initial) {
    return useState(initial);
  }

}
```

or this (`useEffect` is another hook we will introduce this week)

```jsx
export default function MyComponent({ flag }) {

  useEffect(() => {
    const [value, setValue] = useState(45);

    ...
  })
}
```

**ONLY TOP LEVEL** otherwise the behavior is ***UNDEFINED*** - i.e. React is not responsible for you using it in a way that breaks the contract.

### More `useState`

Like other hooks, `useState` can often take input in a few forms that change it's behavior. Because JS is dynamically typed it can actually be pretty sophiticated with altering the behavior based on the type of the parameter. With `useState` this takes the form of `setValue` being able to take a function as well as a value.

```js
export default function Component() {
  const [name, setName] = useState("Nick");
  const [age, setAge] = useState(88);

  // set to brand new value
  setName("Bem");
  // update the age based on the current age
  setAge(age + 1);
  // setX can also take a function whose input is always the previous value
  setAge(current => current + 1);
}
```

> Video Store pt 2 features
> - When user clicks on a video, display video details (on same screen, no modal, + dismissable)
> - Simple checkout/return buttons for videos (update root state)


## Additional Resources

lorem

## Assignments

Building Day 2 features and add statefulness (not persisted) to your app where valid