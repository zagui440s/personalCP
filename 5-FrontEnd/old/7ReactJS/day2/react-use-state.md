# State in React

## Topics Covered

- What is State?
- Pure Functions
- React components as pure functions
- Components and hooks
- `useState` pattern
- Controlled Components
- `useState` with complex data
- rules of hooks
- different approaches to useState

## Lesson

The goal for today is to understand how to add **_state_** to our React apps. You likely noticed in yesterday's assigment that we were able to render existing data to the screen, but we had not yet developed a way to update data in the context of React. However, we want this ability ultimately, if a user clicks the button to check out a film, we should be able to update the page to reflect that change. We will learn how to do that today. But first, let's dive a little deeper into the concept of _state_ itself.

### What is State?

_State_ refers to the _context_ in which your function/program executes. This isn't a concept unique to React, it exists in all programming languages. For example, consider this function:

```js
function xPlusY(x, y) {
  return x + y;
}

const result = xPlusY(1, 2);

console.log(result); // 3

const result2 = xPlusY(1, 2);

console.log(result2); // 3
```

This function we just created `xPlusY` is what is known as a 'stateless' or 'pure' function. What makes a function _pure_?

Essentially a function is _pure_ if it follows the rule of _referential transparency_, which is a fancy math term that means that the output of a given function is entirely determined by it's inputs. If this is the case the function should return the same output given the same inputs no matter where/when it is run. In other words, a pure function works the same _independent of the context in which it is run_.

This is easiest to understand by counter example. We have established that `xPlusY` is a pure function. So what is an example of an _impure_ function?

```js
const myList = [];

function addToList(name) {
  myList.push(name);
  return myList;
}

const result = addToList("Nancy");

console.log(result); // ["Nancy"]

const result2 = addToList("Nancy");

console.log(result2); // ["Nancy","Nancy"]
```

The function `addToList` is _impure_ because it's output is not _entirely_ dependent on it's inputs. As we can see, calling `addToList("Nancy")` twice results in different outputs because the _gobal state_/_context_ in which the function runs has changed. If a function's output depends on more than it's inputs and the body of the function itself, it is _impure_, because this property breaks _referential transparency_.

### React components as pure functions

This idea of pure vs impure functions is central to how React works. A React component _is_ a pure function.

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

This takes no inputs, and it's output is always the same, so it is naturally pure. Input entirely determines output, and calling it multiple times in a row will always return the same resulting output (jsx), regardless of what happened between consecutive calls.

```jsx
export default function Profile(props) {
  const { name, imgUrl } = props;

  return (
    <>
      <h2>{name}</h2>
      <img src={imgUrl} />
    </>
  );
}
```

This is still pure, because our inputs (props) entirely determine the output. The same values passed in props will always result in same output.

This is a good quality to have because it means React only needs to render the component once, and only rerender it if a prop changes. Additionally, it is by default _memoized_, meaning that once a set of input parameters have been used to produce an output, it is forever remembered and rerunning the function is unnecessary. This is only possible because we have this guarantee of purity. We can call these 'pure' or 'dumb' components. Dumb is a positive quality here because a dumb component doesn't need to be aware of any context outside of itself!

### Components and hooks

React Components are by default pure functions, so their output is the same no matter how often they are rerendered, meaning they only need to be rendered once. But what if we want the component to be aware of some kind of state not provided as a prop? This is where React **_Hooks_** come into play. A **_hook_** in React is a way to 'upgrade' a functional component to get some functionality it wouldn't have by default. The hook we will look at today is `useState`, which gives a React hook the ability to maintain and update some internal state, and to rerender (ie _react_) to this change. Let's convert a component `Checkbox` to use the `useState` hook.

```jsx
export default function Checkbox(props) {
  const { label } = props;

  return (
    <>
      <label>{label}</label>
      <input type="checkbox" />
    </>
  );
}
```

```jsx
import { useState } from "react";

export default function Checkbox(props) {
  const { label } = props;

  const [checked, setChecked] = useState(false);

  const onChangeCallback = (event) => {
    setChecked(!checked);
  };

  return (
    <>
      <label>{label}</label>
      <input type="checkbox" checked={checked} onChange={onChangeCallback} />
      <pre>Checked status: {checked ? "checked" : "unchecked"}</pre>
    </>
  );
}
```

There's a fair amount to unpack here, but let's first establish this works as desired.

### `useState` pattern

The general pattern of working with `useState` is:

1. First import `useState` from the react core library.

```js
import { useState } from "react";
```

Notice that this isn't a default import, we have to destructure what the library `"react"` exports to get the right function.

2. Then invoke it _at the root level of our component_ like so:

```js
const [checked, setChecked] = useState(false);
```

How do we parse this? First look at the `useState` function itself - it takes a single argument representing the initial value to store, which will be accessible as the result `checked`.

However `useState` actually returns two values, wrapped in a list (because JS has no concept of 'tuple' like Python). We destructure this list immediately to give names to the two values it returns. The first, which I named `checked` represents the current value of that variable, which was set initially to `false`. The second `setChecked` is a function that, when called, can be passed an updated state for that variable.

If `setChecked` is called and provided the same value as it previoiusly had, no rerender will occur. However if the value changed, we do rerender.

That's the essence of useState, it's essentially a React-aware variable that will trigger rerenders when the value it's holding _changes_.

### Controlled Components

Sometimes, you don't want the component itself to hold the `useState`, because you want multiple components to share this info. In React, a parent component can pass info to a child, but not the other way around. This concept can be called a _controlled component_. This is very similar to the above example, but it keeps track of the state within the parent and only passed the necessary data down to the child.

First, we have a Checkbox like before, but it isn't referencing useState itself:

```js
export default function ControlledCheckbox(props) {
  const { label, checked, setChecked } = props;
  return (
    <>
      <label>{label}</label>
      <input
        type="checkbox"
        checked={checked}
        onChange={() => setChecked(!checked)}
      />
    </>
  );
}
```

Now, we create the `useState` in the parent, so multiple components at that level can reference or be passed the data.

```js
import { useState } from "react";
import ControlledCheckbox from "./components/ControlledCheckbox";

export default function App() {
  const [checked, setChecked] = useState(false);

  return (
    <>
      <div>
        <ControlledCheckbox
          label="controlled"
          checked={checked}
          setChecked={setChecked}
        />
        <pre>Checked status: {checked ? "checked" : "unchecked"}</pre>
      </div>
    </>
  );
}
```

We have the same result, but with this approach we can pass `checked` and `setChecked` to multiple components and they will all be referencing the same info.

### `useState` with complex data

You may be wondering at this point why we mentioned the idea of a pure vs impure components upfront. The reason was to explain how/why React works with complex data as regards `useState`.

In our Checkbox example we used the `setChecked` function to updated the variable `checked`, and to do that we passed it an entirely new value. We also mentioned that React also rerender if the value passed to `setChecked` is different than what `checked` currently holds. How does this translate to complex data, like lists?

You might be tempted to write something like this:

```js
import { useState } from "react";

export default function NameList() {
  const [names, setNames] = useState(["Ben", "Francisco"]);
  const [inputText, setInputText] = useState("");

  const addNameHandler = () => {
    // add the name to the list
    names.push(inputText);
    console.log(names);
    setNames(names);
  };

  return (
    <>
      <div>
        <input
          type="text"
          value={inputText}
          onChange={(event) => setInputText(event.target.value)}
        />
        <button onClick={addNameHandler}>Add Name</button>
      </div>
      <ul>
        {names.map((name, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>
    </>
  );
}
```

But this doesn't quite work as expected. Why not? When you call `names.push(...)` you are _mutating_ `names` - it holds different data but it's own value (which is a memory address) hasn't changed. As we can see with the `console.log` JS is aware fo the change, but React doesn't know to rerender because the value of `names` is the same as far as it is concerned.

That's why we need to do things in a slightly different way.

```js
import { useState } from "react";

export default function NameList() {
  const [names, setNames] = useState(["Ben", "Francisco"]);
  const [inputText, setInputText] = useState("");

  const addNameHandler = () => {
    // add the name to the list
    const updatedNames = [...names, inputText];
    console.log(updatedNames);
    setNames(updatedNames);
    // reset the input
    setInputText("");
  };

  return (
    <>
      <div>
        <input
          type="text"
          value={inputText}
          onChange={(event) => setInputText(event.target.value)}
        />
        <button onClick={addNameHandler}>Add Name</button>
      </div>
      <ul>
        {names.map((name, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>
    </>
  );
}
```

This approach works because `updatedNames` is actually a brand new list, unrelated to `names`. We use the spread operator to 'clone' the values in `names`, add a new value from `inputText`, and then use `setNames` to establish `updatedNames` as the new value for `names`, which does trigger a rerender.

> See the [ComplexState](./examples/example-vite-project/src/components/ComplexState.jsx) component for an example of how the same principle applies to working with objects.

### Rules of Hooks

[Rules of Hooks](https://legacy.reactjs.org/docs/hooks-rules.html)

There are some rules for using hooks that have to do with how they were implemented. The basic rule is:

**Only use hooks at the top level of a functional component**

**Pop level only** means not in a conditional or loop or function or anything other than top level of the component. So none of these approaches are valid:

```jsx
import { useState } from "react";

export default function MyComponent() {
  let value, setValue;

  if (flag) {
    [value, setValue] = useState(45);
  } else {
    [value, setValue] = useState("hello world");
  }
}
```

```jsx
import { useState } from "react";

export default function MyComponent() {
  let useStateArray = [];
  const names = ["A", "B", "C"];

  for (const name of names) {
    const [value, setValue] = useState(name);
    useStateArray.push([value, setValue]);
  }
}
```

```jsx
export default function MyComponent() {
  const [value, setValue] = myOwnFunction(45);

  function myOwnFunction(initialValue) {
    return useState(initialValue);
  }
}
```

**ONLY TOP LEVEL** otherwise the behavior is **_UNDEFINED_** - i.e. React is not responsible for you using it in a way that breaks the contract.

### `useContext`

There's another hook related to `useState` we will introduce today called `useContext`. Consider the problem of passing some state down many levels, for example:

```js
import { useState } from "react";
import PropDrilling from "./components/PropDrilling";

export default function App() {
  const [checked, setChecked] = useState(false);

  return (
    <PropDrilling label="drilled" checked={checked} setChecked={setChecked} />
  );
}
```

```js
import PropDrillingLevel1 from "./PropDrillingLevel1";

export default function PropDrilling(props) {
  const { label, checked, setChecked } = props;

  return (
    <PropDrillingLevel1
      label={label}
      checked={checked}
      setChecked={setChecked}
    />
  );
}
```

```js
import PropDrillingLevel2 from "./PropDrillingLevel2";

export default function PropDrillingLevel1(props) {
  const { label, checked, setChecked } = props;

  return (
    <PropDrillingLevel2
      label={label}
      checked={checked}
      setChecked={setChecked}
    />
  );
}
```

```js
export default function PropDrillingLevel2(props) {
  const { label, checked, setChecked } = props;

  return (
    <>
      <label>{label}</label>
      <input
        type="checkbox"
        checked={checked}
        onChange={() => setChecked(!checked)}
      />
      <pre>Checked status: {checked ? "checked" : "unchecked"}</pre>
    </>
  );
}
```

This is a contrived example, but this is what we call 'prop drilling'. Because the only way to pass something in React is from parent to child, we need to pass the information down to all intermediate levels. This can make your React code very verbose, but there is a better way - `useContext`!

`useContext` let's us defined a _context_ in which all subcomponents are aware of some state, and then only the level that requires that data can grab it with `useContext`. Let's see an example:

First, we create the context in it's own file:

```js
// in src/contexts/CheckboxContext.jsx

import { createContext } from "react";

const CheckboxContext = createContext(null);

export default CheckboxContext;
```

The context is given an initial value of null, as we set it seperately.

```js
import { useState } from "react";
import CheckboxContext from "./contexts/CheckboxContext";
import ContextAwareCheckbox from "./components/ContextAwareCheckbox";

export default function App() {
  const [checked, setChecked] = useState(false);

  return (
    <CheckboxContext.Provider
      value={{
        label: "from context",
        checked,
        setChecked,
      }}
    >
      <ContextAwareCheckbox />
    </CheckboxContext.Provider>
  );
}
```

`CheckboxContext.Provider` is a component that lets us give specific values to establish the context for all subcomponents. Note that we don't pass anything explicitly using props to `ContextAwareCheckbox`.

```js
import { useContext } from "react";
import CheckboxContext from "../contexts/CheckboxContext";

export default function ContextAwareCheckbox() {
  const { label, checked, setChecked } = useContext(CheckboxContext);

  return (
    <>
      <label>{label}</label>
      <input
        type="checkbox"
        checked={checked}
        onChange={() => setChecked(!checked)}
      />
      <pre>Checked status: {checked ? "checked" : "unchecked"}</pre>
    </>
  );
}
```

`ContextAwareCheckbox` uses the `useContext` hook to grab the details of that specific context (because there could be more than one). `ContextAwareCheckbox` was a direct child of `CheckboxContext.Provider` in this example, but it would work no matter how many levels deep, and would require the intermediate components to do anything special.

## Assignments

Integrate `useState` into the results from yesterday's assignment

[video-store-pt-2](https://classroom.github.com/a/8Fb4Tuc8)
