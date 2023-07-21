# Intro To React

## Topics Covered

- Review
  - What is the problem we are trying to solve?
  - Our current solution
  - Limitations to HTML + CSS + JS
  - Why React?
- Vite
  - Bootstrapping a React site using Vite
  - Our first component - `App.jsx`
  - Rendering `<App />` in `main.jsx`
- React Essentials
  - What is a Component?
  - Components as containers
  - Rules around returning JSX and React.Fragment
  - Props and interpolation
- Common patterns in React
  - props.children
  - class -> className
  - onclick -> onClick
  - Conditional rendering with `&&` and the ternary operator
  - Interpolating a list with map

## Lesson

### Review

#### What is the problem we are trying to solve?

We want to create great user interfaces that respond to user-initiated events (clicking, scrolling, typing) and _react_ appropriately. Our ultimate goal is to create a Single Page Application (SPA) - a website that gives the user an interactive experience that is as enjoyable/seamless to use as a native application running on their own computer.

Let's take a moment to visit a site like [Hacker News](https://news.ycombinator.com/) and consider how we might create a site like this using only HTML/CSS/JS.

Now take a moment to visit a site like [Google Docs](https://docs.google.com/) and consider how much more complex it might be to create such a highly-interactive site using only HTML/CSS/JS.

#### Our current solution

Let's refresh what we know about making UIs with HTML, CSS and JS using a basic example:

> [1-html-css-js-mvc](./examples/1-html-css-js/)
>
> NOTE: use the VSCode extension [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) to serve up this simple website.

What are the components of this site?

1. `index.html`: `index.html` forms the 'skeleton' of our site. It references the other files it wants to pull in (`style.css` and `main.js`) and provides the basic starting structure of the page.

2. `style.css`: the 'style' of our app, it let's the developer associate HTML elements with specific visual properties using the language of selectors (`h1`, `#my-id`, `.my-class`).

3. The _DOM_: The DOM is not an explicit file, but it is what the browser creates upon parsing the HTML/CSS/JS files. The DOM is a representation of the entire page as a JS object and is accessible from JS using the built-in variable `document`.

4. `main.js`: a script written in JS that can reference the DOM and modify it. JS is used as the event-driven glue of our site: in our HTML we can reference a JS function using the `onclick` attribute and it will respond to this event but referencing and altering the DOM (`document`). When the DOM is updated the page rerenders, so the user sees an updated view.

#### Limitations to HTML + CSS + JS

> Q: What are some limitations or pain points of doing front end this way? Can you imagine any alternatives?

The core building blocks of HTML, CSS and JS are enough to create anything we could want on the frontend. However it ends up being a cumbersome approach that doesn't scale well. HTML is our source of truth for what the page looks like, but only initially, as our JS works by modifying the DOM in reaction to events.

Additionally the HTML and JS are _decoupled_. This means:

1.  we need to reference the JS from within the HTML using the `<script>` tag and using the element attribute `onclick`.

2.  we need to reference the HTML from within the JS using the `document` object and looking up elements using selectors defined in the CSS but bound to the element from within the HTML.

This ends up being unnecessarily confusing - we care about 3 types of files, and they all need to reference one another, but they don't implicitly know about each other.

Why is it like this?

![better way](./page-resources/better-way.gif)

**There's got to be a better way!**

#### Why React?

React's main innovation is to solve this decoupling problem of by **_moving HTML into JS_**. In React, we can write and manipulate HTML directly within our JS as if HTML was a primitive type directly built into the language. React ends up offering a lot more than this, but that is the first selling point.

### Vite

#### Bootstrapping a React site using Vite

Our goal now is to get a 'hello world' React app and get it up and running. Because React is more advanced than the basic HTML/CSS/JS approach, setting up a dev environment for it can be somewhat complex. Therefore, we will utilize the front-end scaffolding tool [`vite`](https://vitejs.dev/) to help us in generating the necessary boilerplate.

In your terminal, wherever you want to create the new project, type:

```sh
npm create vite
```

This will prompt you with a wizard. Say yes to proceed, choose a project name (it will create a new folder with such a name) and select React as the framework and JavaScript as the language. This is necessary because Vite works with many different frontend tools and so we need to specify what we plan to use.

Once done you should have a new folder, I named mine `2-example-vite-project`. Now:

```sh
cd 2-example-vite-project
npm install
npm run dev
```

This will install any dependencies (Vite assumes some already for React) and then runs a script to serve the site.

`vite`'s starting output is a bit more complex than we need right now, so I created a simplified example of a default vite project in [./examples/2-example-vite-project/](./examples/2-example-vite-project/). Let's explore that file to understand the basics of how React is bootstrapped.

#### Our first component - `App.jsx`

React environment setup ends up being relatively complicated because of a feature it uses called `jsx`.

`jsx` is a file extension/format, like `js`, but with the additional ability to write HTML directly within your JS. Let's take a look at `src/App.jsx` in the example project:

```jsx
function App() {
  const myJsx = <h1>Hello World</h1>;

  return myJsx;
}

export default App;
```

To be explicit I saved the jsx part in it's own variable called `myJsx`. Note how we were able to write an HTML element directly in our code and it's considered valid. We call such a file a `jsx` file and the file extension is therefore `.jsx`. However, sometimes the term `jsx` is used to refer specifically to the part of the code that is HTML-like, not the entire file.

The rest of the file consists of a single function, `App`, which takes no input, and returns some `jsx` as the output. We call a function that returns `jsx` a _Component_.

At the very end we export the function, in this case a default export, which means it's the 'main' thing this file exports.

> Note: I wrote it this way to be explicit about what's happening at each step, but a more concise (but equivalent) implementation could be written as:
>
> ```jsx
> export default function App() {
>   return <h1>Hello World</h1>;
> }
> ```

Now let's see how we render this component to the page.

#### Rendering `<App />` with `index.html` and `main.jsx`

First, let's look at `index.html`. When `vite` serves up our site, the only file it serves is `index.html`. Just like with the traditional HTML/CSS/JS approach, this is the entry point to our site. Let's look at the body:

```html
<div id="root"></div>
<script type="module" src="/src/main.jsx"></script>
```

The only thing this html file does is create an empty div with id `root` and invoke a js file at `src/main.jsx`, so let's look there next. The contents of `main.jsx` are as follows:

```js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const rootElement = document.getElementById("root");

const reactRoot = ReactDOM.createRoot(rootElement);

reactRoot.render(<App />);
```

> This can more concisely be defined like:
>
> ```js
> ReactDOM.createRoot(document.getElementById("root")).render(<App />);
> ```

What is this doing?

1. First, we grab that `#root` element like we normally would
2. ReactDOM is used to create a _root_ for our React app, and associate it with the element we just grabbed
3. we call `render` on that root to render our `<App />` component.

This is the basic way that a React component (representing the entrypoint to your React app) is linked up to your actual HTML, and once this setup is done you generally won't need to modify it again.

The most important thing to notice here is that we can reference the exported function `App` from `src/App.jsx` as an HTML-like element `<App />` (or `<App>...</App>` if it wasn't self closing). This is why we call it a component, because that function is equivalent to an HTML-like element now.

The other important point to note is that CSS files can now be directly included in our project directly from JS. This actually isn't a feature of React but of `vite`.

> Other things to note:
>
> 1. React uses a sister library called `ReactDOM` to bootstrap itself. This is basically the only time you will use this library, but it creates a meaningful seperation between React itself and rendering to a webpage. This is done because React can actually be used to render to other platforms like a mobile app screen, using another sister library called [React Native](https://reactnative.dev/)
>
> 2. I removed it in my example, but by default `vite` will generate a `src/main.jsx` file that doesn't simply render the component `<App />` but renders it as the child of another component, `<React.StrictMode>`. This is simply a wrapper Component React provides to provide better warnings, but it can sometimes make your work more confusing as it renders everything twice to check for bugs, so I often remove it.

### React Essentials

#### What is a Component?

Components are the core idea of React, letting us create fully customizable HTML-like elements of our own that we can then use as building blocks to create a user interface. We used to be limited to HTML itself, but now we can effectively make our _own_ HTML elements!

So what is a Component? A Component is React's answer to an HTML element. Normally, HTML is a limited set of pre-existing elements, and vanilla JS is used to manipulate those elements over time. With React, we pull _everything_ into the world of JS, so our first task is creating a means of working with HTML in JS, hence the Component.

We implement a component like so:

`src/components/MyComponent.jsx` (I created a new folder within `src` to house my components)

```jsx
export default function MyComponent() {
  return <h1>Any HTML will work</h1>;
}
```

and reference it like so (in a different component):

`src/App.jsx`

```jsx
import MyComponent from "./components/MyComponent";

export default function App() {
  return (
    <div>
      <h1>Hello world</h1>
      <MyComponent />
    </div>
  );
}
```

`<MyComponent />` is effectively replaced with the jsx it returns.

> Note: the space before the return is like any JS function, so we can write logic or define functions or variables here

#### Components as containers

As seem in the last example, a React component can return more than one line of jsx, which makes it a useful, reusable container for a specific visual 'unit'.

`src/components/Profile.jsx`

```jsx
export default function Profile() {
  return (
    <div>
      <h2>User Name</h2>
      <img src="https://via.placeholder.com/600x400" />
    </div>
  );
}
```

`src/App.jsx`

```js
import Profile from "./components/Profile";

export default function App() {
  return (
    <div>
      <h1>Profiles</h1>
      <Profile />
      <Profile />
      <Profile />
    </div>
  );
}
```

> Note: we write the element representation for Profile as `<Profile />`. If your component has no body, it is the equivalent of a self closing element in HTML, like `<img>`. However React is more strict than HTML and will not accept `<Profile>` but will require `<Profile />` with the explicit self-closing tag.

#### Rules around returning JSX and React.Fragment

Note above that when we created a component that contains multiple other elements we returned it all within a single `<div>`

```jsx
return <div>...</div>;
```

What if you don't want to return a `<div>` but something like this?

```jsx
export default function App() {
  return (
    <h1>Profiles</h1>
    <Profile />
    <Profile />
    <Profile />
  );
}
```

This will cause React to error out with a message that says **"Adjacent JSX elements must be wrapped in an enclosing tag"**. This means all React components must return _exactly one_ element. So what do you do if you don't want to litter your jsx with unnecessary `<div>` elements? The solution - `React.Fragment`.

```jsx
export default function App() {
  return (
    <>
      <h1>Profiles</h1>
      <Profile />
      <Profile />
      <Profile />
    </>
  );
}
```

`<>...</>` is what React calls a `Fragment`. It technically wraps multiple components to return a single one, but if you examine the HTML output in the chrome dev console you will see there is no additional wrapper element created, it's as if you returned the adjacent elements without a wrapper.

#### Props and interpolation

In React, Props (short for "properties") are a mechanism for passing data from one component to another. When a React component is called, it can receive `props` as an argument. This is the equivalent to an attirubte in HTML, and let's us customize the output of a component. Let's update our current working example.

```js
export default function App() {
  return (
    <>
      <h1>Profiles</h1>
      <Profile name="Benjamin Cohen" width={600} height={400} />
      <Profile name="Tiny Tim" width={300} height={200} />
      <Profile name="King Kong" width={1200} height={400 + 400} />
    </>
  );
}
```

Just like HTML attributes, we are defining `props` for our Component, `name`, `width`, and `height`. React is a bit smarter than regular HTML though, so we aren't limited just to strings. If we want to interpret some JS value in React, we do so with the interpolation syntax `{ ... }`. This syntax is only valid within your jsx, but it allows you to interpet some line of JS and produce an output that React can work with, so thats why `{ 400 + 400 }` is valid.

Now let's see this referenced in out `<Profile />` component:

```jsx
export default function Profile(props) {
  return (
    <div>
      <h2>{props.name}</h2>
      <img src={} />
    </div>
  );
}
```

To use the values of Props in your component, you can access them with object notation:

```jsx
export default function Profile(props) {
  console.log(props);

  const imgUrl = `https://via.placeholder.com/${props.width}x${props.height}`;

  return (
    <>
      <h2>{props.name}</h2>
      <img src={imgUrl} />
    </>
  );
}
```

`props` is the single input to any Component function. It is an object containing all the named props provided to that component from the parent component in which it was referenced.

Note the different between using JS string interpolation syntax (`${}`) and React interpolation syntax (`{}`), which is only valid in the jsx portion of the code.

Props can also be destructured, which can be useful for code clarity:

```jsx
export default function Profile(props) {
  const { name, width, height } = props;

  return (
    <>
      <h2>{name}</h2>
      <img src={`https://via.placeholder.com/${width}x${height}`} />
    </>
  );
}
```

You can even do the destructuring directly in the function definition:

```jsx
export default function Profile({ name, width, height }) {
  return (
    <div>
      <h2>{name}</h2>
      <img src={`https://via.placeholder.com/${width}x${height}`} />
    </div>
  );
}
```

Components and Props together define the essential structure that make React components a way to make customizable, reusable HTML-like elements of your own!

### Common patterns in React

In addition to what we have seen so far, there are certain common patterns in React we should take a look at to see how we might work with different kinds of data and in different situations.

#### props.children

With props we have almost a full replacement for HTML in the form of components. But there is still one missing piece: `props.children`.

An HTML element can contain other HTML elements:

```html
<div>
  <p>Hello, world!</p>
</div>
```

How can we make a React component aware of elements it is wrapping? Let's consider an alternative definition of `<Profile />`:

```jsx
export default function App() {
  return (
    <Profile name="Benjamin Cohen">
      <img src="https://via.placeholder.com/600x400" />
      <h3>Hobbies</h3>
      <ul>
        <li>Pottery</li>
        <li>Yoga</li>
        <li>Dancing with the devil in the pale moonlight</li>
      </ul>
    </Profile>
  );
}
```

How could we render the _body_ of the `<Profile />` component? With `props.children`!

```js
function Profile(props) {
  return (
    <>
      <h2>{props.name}</h2>
      {props.children}
    </>
  );
}
```

`children` is a built-in prop that allows you to reference something passed within the body of a component.

#### class -> className

Normally any valid HTML is valid jsx, as are there attributes. However for some attributes, react replaces the original with a 'wrapper' prop that works better with React. An example is the built-in prop `className`:

```js
export default function Profile(props) {
  return (
    <div className="profile">
      <h2>{props.name}</h2>
      {props.children}
    </div>
  );
}
```

It's the equivalent of writing `class` in HTML to reference a css class, but for complex reasons `className` is preferred.

#### onclick -> onClick

Similarly, we don't use HTML's `onclick` but a React wrapper called `onClick`, which can take a function as input in a more intuitive way.

```js
export default function Profile(props) {
  const onClickHandler = (event) => {
    // we don't use the event, but we could
    console.log(event);

    alert("You clicked me!");
  };

  return (
    <div className="profile">
      <h2>{props.name}</h2>
      {props.children}
      <button onClick={onClickHandler}>Click me!</button>
    </div>
  );
}
```

#### Conditional rendering with `&&` and the ternary operator

Sometimes you want to render something only when a certain condition is met, or render two different things depending on the condition. You might want to reach for an `if ... else` statement, but JSX always expects something returned, so it prefers expressions over statements.

Imagine first we wanted our `<Profile />` component to only render if a non-empty name was provided:

```jsx
export default function App() {
  return (
    <>
      <h1>Profiles</h1>
      <Profile />
      <Profile name="" />
      <Profile name="Benjamin Cohen" />
    </>
  );
}
```

then we could define `<Profile />` like so:

```js
export default function Profile(props) {
  const { name } = props;

  return (
    <>
      {name && (
        <div className="profile">
          <h2>{name}</h2>
        </div>
      )}
    </>
  );
}
```

First, we wrapped everything in a Fragment so that what was inside would be seen as jsx. Then, we interpolated to execute some JS: `name && (...)`. If name is falsey (ie if it is undefined or the empty string) nothing is rendered. If name is truthy (any non-empty string), the following component is rendered. `(...)` is used just like in the return for when the jsx takes up multiple lines.

Also note that we can nest React interpolation syntax, so first `{ name && (...) }` is interpreted as JS, producing some jsx (inside the `(...)`) and within there we could once again interpolate on `{name}`.

The same logic applies if we want to do something on the fail case, we just use a ternary operator:

```js
export default function Profile(props) {
  const { name } = props;

  return (
    <div className="profile">
      {name ? <h2>{name}</h2> : <pre>Valar Morghulis</pre>}
    </div>
  );
}
```

#### Interpolating a list

The final common pattern is list interpolation. Just like with conditional rendering, we don't want to use a `for ... of` loop but a map, as that will return an expression.

```jsx
export default function App() {
  const names = ["Benjamin Cohen", "Tiny Tim", "King Kong"];

  return (
    <>
      <h1>Profiles</h1>
      {names.map((name, index) => (
        <Profile key={index} name={name} />
      ))}
    </>
  );
}
```

We use `.map()` to return a list of components and fill in each with the appropriate name. Note the addition of the second map parameter, index. We use this to pass another prop to `<Profile />` called `key`. This is used by React to efficiently work with lists, and you will get a warning if you don't include it. The only requirment is that the key represents a unique value, so index works, but so would some unique id.

### Additional Resources

- https://react.dev/learn is currently the best resource available for learning React. Look through it thoroughly as it was recently redesigned form the ground up and should be able to answer lots of essential questions about how to accomplish things in React.

- [React Dev Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en) is a Chrome extension that can make exploring your React app from the dev console more natural.

### Assignment

We are going to be building a sample App over the next few days creating the dashboard for a theoretical Blockbuster-like store.

To start we will create a Home Page with a basic display of all the videos and their current status (in stock, checked out, # available).

We will eventually connect this to a real live API, but for now we will just mock some data on the frontend.

Video store repo is located here: https://github.com/Code-Platoon-Assignments/video-store
