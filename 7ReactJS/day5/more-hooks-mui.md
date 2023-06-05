# Real World React

## Topics Covered / Goals

- Other hooks
    - useContext
    - useRef
    - useMemo/useCallback

- Utilizing Component Libraries - MUI
    - Button

- Video store pt 5: 
    - use MUI to create a more engaging UI (Image Carousel, Modals)
- Assignment
    - Building Day 5 features

## Lesson

### Review

So far we have learnt how to use React to make highly-interactive websites and define our UIs within JavaScript itself. Part of this was learning about 'hooks' which allow us to *hook* into some lifecycle event of a React component to give us new features we wouldn't otherwise have as part of pure functional components. The two hooks we have learned about so far are:

1) **useState** - `useState` allows us to create state that persists between component re-renders and to trigger a fresh re-render whenever the value the state holds is updated.

```js
import { useState } from "react";

export default function App() {
    const [count, setCount] = useState(0);

    return (
        <div>
            <h1>Count is {count}</h1>
            <button onClick={() => setCount(count-1)}>-</button>
            <button onClick={() => setCount(count+1)}>+</button>
        </div>
    );
}
```

2) **useEffect** - `useEffect` allows us to work with external resources and trigger an effect based on a dependency list. `useEffect` always triggers *after* a component re-render.

```js
import { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
    const [pokeData, setPokeData] = useState(null);

    useEffect(() => {
        axios.get('https://pokeapi.co/api/v2/pokemon/ditto')
             .then(response => setPokeData(response.data))
    }, []);

    return (
        <div>
            {
                pokeData && (
                    <div>
                        <h1>{pokeData.name}</h1>
                        <img src={pokeData.sprites.front_default} />
                    </div>
                )
            }
        </div>
    );
}
```

With these two hooks we can set state and talk to APIs, which is really the bread and butter of any modern website.

> See [./examples/0-review-usestate-useeffect](./examples/0-review-usestate-usecontext/) for a more thorough example

### Other hooks

There are other hooks however, a few of them, and they all have specific use cases. We won't cover all of them, but we will cover some of the most commonly seen/used and their common use-case.

#### `useContext`

`useContext` is a hook that allows a component to receive information from distant parents without having to pass this data as props. To illustrate it's use-case, first let's explore the issue it is attempting to resolve - *prop drilling*. Imagine we had some state at a top level, say a username, and we had to pass it a few levels deep to a component (or multiple) that use this data. That might look like so:

```js
export default function App() {
    const username = "kaizerroll34";

    return (
        <div>
            <Navbar username={username} />
        </div>
    );
}
```

```js
export default function Navbar(props) {
    const { username } = props;

    return (
        <div>
            {/* other components */}
            <UserNameDisplay username={username} />
        </div>
    );
}
```

```js
export default function UserNameDisplay(props) {
    const { username } = props;

    return (
        <div>
            <h2>{ username }</h2>
        </div>
    );
}
```

So in this example we are only passing a single piece of data down 2 levels, but this is the only way we currently know how to do it - *prop drilling*, i.e. we use *props* to *drill* down from the component that defines the data down to the component that uses the data. This works perfectly fine but doesn't scale well - if you had to pass down 6 props down 8 levels all the components between where the data is defined and where it is used will need to pass those props down explicitly, and this makes your code a lot less readable. 

> See [./examples/1-prop-drilling-example](./examples/1-prop-drilling-example/) for a more thorough example

Ideally there should be a way to pass this data down all of these levels without having to be so explicit about it with props. Luckily there is - `useContext`! Here's how it works:

1) First, use the function `createContext` to create some data useContext will be able to work with:

```js
import { createContext } from 'react';

const UsernameContext = React.createContext({
  username: ''
});

export default UsernameContext;
```

2) Then, use that created Context to *provide* some data to the entire component tree.

```js
import UsernameContext from "./UsernameContext";

export default function App() {
    return (
        <UsernameContext.Provider value={{ username: "kaizerroll34" }}>
        <div>
            <Navbar />
        </div>
        </UsernameContext.Provider>
    );
}
```

3) Finally at the level you want to use it (you don't need to worry about intermediate levels) you can use `useContext` to grab the data where you need it.

```js
import { useContext } from 'react';
import UsernameContext from "./UsernameContext";

export default function UserNameDisplay() {
    const { username } = useContext(UsernameContext);

    return (
        <div>
            <h2>{ username }</h2>
        </div>
    );
}
```

> See [./examples/2-usecontext-example](./examples/2-usecontext-example/) for a more thorough example

#### `useRef`

`useRef` is a hook that is useful for working directly with an underlying DOM node. Normally, React does not allow you such direct access, you usually use a prop that wraps some DOM element functionality, like using `className` instead of `class`. Sometimes it is desirable to have direct access to the DOM node, and this is the main use-case for `useRef`.

```js
import { useRef } from 'react';

export default function App() {
  const divRef = useRef(null);

  const handleClick = () => {
    divRef.current.style.backgroundColor = 'red';
  };

  return (
    <div>
      <button onClick={handleClick}>Change Color</button>
      <div ref={divRef}>This is a div element</div>
    </div>
  );
}
```

Using the `useRef` hook we create a new variable and it initially hold `null`. Then, within our JSX we use thebuilt-in prop `ref` to associate this DOM element with the output of the call to `useRef`. From then on, divRef holds a copy of that element just as if we accessed it directly with something like `document.findElementById(...)`. Now, in any other place with access to that ref we can access it's current value and manipulate the underlying DOM node directly. This does *not* trigger a re-render, it is a way of breaking the 'seal' React puts around the DOM and to access/change elements within the DOM directly, so you will see the change, but React will not rerender any components in response.

The use-case for `useRef` isn't always obvious, but it can be useful when using older libraries that are not specifically compatible with React, so keep it in mind as a backdoor that allows you to work with the DOM directly within React, just as you would with vanilla JS or a library like jQuery.

> See [./examples/3-useref-example](./examples/3-useref-example/) for a more thorough example

### `useMemo`/`useCallback`

`useMemo` and `useCallback` are considered 'performance hooks' - they are a way to avoid re-computing an expensive operation everytime a rerender happens. Imagine a component like below, not using `useMemo`:

```js
import { useState } from "react";

export default function App() {
    const [count, setCount] = useState(0);

    // an arbitrary 'expensive' (long running) function
    const expensiveCalculation = () => {
        let num = 0;

        for (let i = 0; i < 1000000000; i++) {
            num += 1;
        }

        return num;
    };

    const result = expensiveCalculation(); 

    return (
        <div>
            <h1>Count is {count}</h1>
            <h2>Result of expensiveCalculation is {result}</h2>
            <button onClick={() => setCount(count-1)}>-</button>
            <button onClick={() => setCount(count+1)}>+</button>
        </div>
    );
}
```

The problem is that every time we rerender (when `setCount` is called) we need to compute `expensiveCalculation()` again, even though nothing about it's input has changed. The way around doing unnecessary work on a rerender is `useMemo`.

```js
import { useState, useMemo } from "react";

export default function App() {
    const [count, setCount] = useState(0);

    // an arbitrary 'expensive' (long running) function
    const expensiveCalculation = () => {
        let num = 0;

        for (let i = 0; i < 1000000000; i++) {
            num += 1;
        }

        return num;
    };

    const result = useMemo(() => expensiveCalculation(), []); 

    return (
        <div>
            <h1>Count is {count}</h1>
            <h2>Result of expensiveCalculation is {result}</h2>
            <button onClick={() => setCount(count-1)}>-</button>
            <button onClick={() => setCount(count+1)}>+</button>
        </div>
    );
}
```

Because we used `useMemo` the result of `expensiveCalculation` is stored the first time it is ran, and never ran again. If we do want to trigger a re-run, we can modify the dependency list, so for example we could have something like:

```js
import { useState, useMemo } from "react";

export default function App() {
    const [count, setCount] = useState(0);
    const [seed, setSeed] = useState(0);

    // an arbitrary 'expensive' (long running) function
    const expensiveCalculation = (num) => {
        for (let i = 0; i < 1000000000; i++) {
            num += 1;
        }

        return num;
    };

    const result = useMemo(() => expensiveCalculation(seed), [seed]); 

    return (
        <div>
            <h1>Count is {count}</h1>
            <h2>Result of expensiveCalculation is {result}</h2>
            <button onClick={() => setCount(count-1)}>-</button>
            <button onClick={() => setCount(count+1)}>+</button>
            <input 
                type="number" 
                onChange={(event) => setSeed(event.target.value)} 
            />
        </div>
    );
}
```

Now, if the `count` changes, we don't re-run the expensive operation, but if `seed` changes, we do, as it is part of the dependency list.

`useCallback` is similar to `useMemo` but it's a way to avoid re-defining a function as opposed to recalculating a value. Both are used for performance optimization so it's generally not something to worry too much about but is good to know exists, and it is often used to either prevent or force a re-render for a component that is otherwise not working as desired.

> See [./examples/4-usememo-example](./examples/4-usememo-example/) for a more thorough example

### Component Libraries

A large part of what makes React (or any library) useful is taking advantage of the work of other developers and the compatible libraries they have produced and shared as open-source software. For React, one of the great forms of open-source software you can take advantage of are *component libraries*. A component library is what it sounds like, a library you can import full of pre-built React components. This means you can use pre-built components that can be customized through props without having to reinvent the wheel. One great component library is [**MUI**](https://mui.com/material-ui/getting-started/overview/), which stands for Material UI, which is Google's official design system it uses for Android and it's own websites.

MUI has a *ton* of components, so we cannot teach it all, but it is a good exercise in learning to work with an API by reading it's docs.

First, let's [integrate MUI into our app](https://mui.com/material-ui/getting-started/installation/)

> the purpose of the MUI section of this lecture is to get you comfortable with exploring a library through it's docs. This can be daunting, but it is the general way to learn how a new library works and even though Stack Overflow and ChatGPT can be useful as guide, the official documentation will always be the ultimate source of truth on how the library works. Remember: **you are not supposed to understand all of this, this is about maximally leveraging the work of others without needing to understand all the details of how it works**

### Resources

- [Hooks docs](https://react.dev/reference/react#context-hooks)
- [MUI Docs](https://mui.com/material-ui/getting-started/overview/)

### Assignment

Today's assignment is to use MUI to make your app unique - whether it is the video store or your own equivalent project you should leverage MUI to make something interesting!

Assuming you forked + cloned the repo as of day 1 (refer to day 1's instructions if not) you should have a local copy of video-store on your computer.

If you want to continue from your own `main` branch, continue to work from it, though you may want to first take a look at the official starting point (`pt-5-start`) or canonical solution branch (`pt-5-end`). The nature of our 'dummy data' (`src/data`) may have evolved, so take a look at that.

If you want to start over from the official `pt-5-start` starting point and are willing to lose your work from day 1 (you can always save it in a new branch) then use the following commands:

```sh
git reset --hard origin/pt-5-start
```
















