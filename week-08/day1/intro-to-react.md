# Intro To React

## Topics Covered

- What is React?
- What we have seen so far
- React Hello World
  - why does React need such heavy duty tooling to make a basic project?
  - creating a React dev env using Vite
  - exploring Vite's scaffolding
  - rendering your root component (how React is 'bootstrapped')
  - our first Component
- Intro to React
  - What is a component
    - components as containers
    - rules around returning JSX and React.Fragment
  - What are props
    - Component with props as full replacement for HTML
    - interpolating variables into React
    - built in props like: children, className, onClick
  - Common patterns in React
    - conditional rendering (naive)
    - conditional rendering (ternary operator)
    - interpolating a list (using map)
    - Discussion: why does React do things this way?
- Video Store features pt 1:
  - Homepage (assume basic page, a mockup would help otherwise minimal styling)
  - Display list of videos (list of videos starts as dummy data)

## Lesson

### What is React?

According to React's own flagship site: **React is a library for web and native user interfaces**

Let's break this down:

1) React is a *library*: Unlike Django (a *framework*) React doesn't make strong choices in the form of either convention or configuration and then do the heavy lifting for you. Instead, it is a standard *library*, providing specific functions you can use to make a React project. Don't worry about this distinction between library and framework if it is confusing, it's not an essential point.

2) React is designed for creating *user interfaces*: React's whole job is to solve the 'view layer' of web development. It ends up being more feature rich, but the original intention of React was simply to solve the problem of displaying things effectively on screen. We used HTML, CSS and vanilla JS in tandem to do this in the past. React still uses all of that tech under the hood but it's approach is very different and we will see this soon enough.

3) For web and *native*: React's original purpose was to help you build websites, for a browser, but it's approach can generalize to other platforms, like iOS or Android. [React Native](https://reactnative.dev/) is a related project to React that allows the same general technique to be applied to doing frontend development for mobile platforms, and most of the knowledge transfers over, making React a very versatile, in-demand skill.

### What we have seen so far

So far, we have already solved the 'view layer' to some degree.

1) Django Templates: This allowed us to combine some data accessible on the backend with HTML templates to produce a unique HTML page based on the data. This works, but you probably noticed the approach is limited, it's an attempt to make a programming language (conditionals, loops, parameters) out of HTML, but it feels limited, and is not what HTML was really designed for.

2) Vanilla JS and HTML: once served up, HTML and JS can act in concert to respond to events and alter the page in real time, even communicate with a backend. This is done like so:

(see [1-html-vanilla-js](https://github.com/tangoplatoon/demos-and-notes/tree/main/w7d3-intro-to-react/html-vanilla-js/) and use VSCode Live Server to serve)

Both of these techniques are enough to create anything we could want to do in the frontend, but it ends up being a cumbersome apporach that doesn't scale well. HTML is our source of truth for what the page looks like, but only initially, as our vanilla JS works by modifying the DOM in reaction to events. This means HTML + vanilla JS works well enough for situations of basic interactivity, but for a large project this approach doesn't scale well, and it can be very hard to keep track of where a change originated, or what the state of the page was immediately prior to some error occurring. 

React aims to solve this issue by creating a UI library for creating Single Page Applications - i.e. websites that gives a seamless interactive experience as if they were running natively on one's own computer and not on a browser and made up of HTML. React does things very differently from what you have seen so far though, so let's start by setting up a local env so we can see it in action.

### React Hello World

Our goal now is to get a 'hello world' (very basic proof of concept) React site up. Don't worry if this all is new, we will cover all the new concepts in class, we just want to see it and have a working environment to play around in first. 

#### Why does React need such heavy duty tooling to make a basic project?

React environment setup ends up being relatively complicated because of a feature it uses called `jsx`

`jsx` is a file extension/format, like `js`, but with the additional caveat that you can now write HTML within your JS as if it was natively supported in the language, like so:

```jsx
function MyFirstReactComponent() {
  return <h1>JSX means you can just write html directly in JS!</h1>
}
```
To accomplish this however `.jsx` code needs to be 'transpiled' to become normal JS that can run on a browser. Instead of trying to set up all of this scaffolding from scratch, we will use a env setup/build tool called [`Vite`](https://vitejs.dev/). Let's do that now.


#### Creating a React dev environment using Vite

In your terminal, wherever you want to create the new project, type:

```sh
npm create vite@latest
```

This will prompt you with a wizard. Say yes to proceed, choose a project name (it will create a new folder with such a name) and select React as the framework and JavaScript as the variant. This is necessary because Vite works with many different frontend tools and so we need to specify what we plan to use.

Once done you should have a new folder, I named mine `example-vite-project`. Now:

```sh
cd example-vite-project
npm install
npm run dev
```

This will install any dependencies (Vite assumes some already for React) and then runs a script to serve the site.

If you see something like below, it worked!

![vite-basic](/page-resources/vite-working.png)

#### Exploring Vite's scaffolding

Vite set up a fair amount for us to start, not all of which we currently understand.

First, notice the root-level file `index.html`. Just like in a normal project, this represents your main page. This is what it looks like:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

Some things to note:

1) in the `<link>` element we refer to a resource as `/vite.svg`. This aligns with the `public` folder and is where you can store resources that would normally be served up by your backend (Vite acts as a basic backend so we can work in React).

2) There's very little content in the body, just two things, a `<div>` with `id="root"` and a js script pointing `/src/main.jsx`. Let's look there next.

#### Rendering your root component (how React is 'bootstrapped')

This is the source of `/src/main.jsx`

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

Some things to note:

1) css can be directly imported in JS now, no need for `<link>` elements in your HTML

2) React uses a sibling library called `ReactDOM` to bootstrap itself. Essentially we use vanilla JS to grab the element we care about by ID (`"root"`) and then *render* our top-level React component, `<App>` (ignore the `<React.StrictMode>`, it's simply a wrapper to give you good warnings). 

#### Our First Component

So what is `<App>`? App is our 'root component' that represents our React app, it's source is located at `/src/App.jsx`. As it is the example is too complicated, so let's rewrite the contents of `App.jsx` like so:

```jsx
function App() {
  return <h1>Hello World</h1>
}

export default App
```

Now if you refresh the page you should see 'Hello World' in big letters.

This function `App()` is what we call a component, or a 'functional component', the most basic building block in React. It is simply a function (currently taking 0 arguments) that returns some HTML (which we can do because we are writing `jsx`). We then (default) export this function.

In `main.jsx` we import this function, but importantly, we don't call it as if it was a function, we use it in a syntax similar to HTML: `<App />`

This is the core idea of React, creating fully customizable HTML-like Components that can be used to create a user interface. There's a lot more to it, which we will now explore, but you can already see the most basic upgrade: we used to be limited to HTML itself, but now we can effectively make our *own* HTML elements (ie React Components).

> At this point I recommend you remove any extranneous files/references from the React project for simplicity. So delete any `.css` file and any reference to it, and the assets folder. When done your `src` file should just contain `main.jsx` and `App.jsx`.

> Good time for break 1 of the day

### Intro to React

Now that we have our basic environment set up, it's time to start exploring the basic functionality of React components.

#### What is a component?

We have already touched on this a little, but what is a component? A Component is React's answer to an HTML element. Normally, HTML is a limited set of pre-existing elements, and vanilla JS is used to manipulate those elements over time. With React, we pull *everything* into the world of JS, so our first task is creating a means of working with HTML in JS, hence the component.

We implement a component like so:

`./MyComponent.jsx`
```jsx
export default function MyComponent() {
  return <marquee>Any HTML will work</marquee>
}
```

and reference it like so (in a different component):

`./App.jsx`
```jsx
import MyComponent from './MyComponent'

export default function App() {
  return (
    <div>
      <h1>Hello world</h1>
      <MyComponent />
    </div>
  );
}
```

`<MyComponent />` is effectively replaced with the HTML it returns.

Practice: Create your own component and reference it in `App.jsx`


#### Components as containers

As seem in the last example, a React component can return more than one line of HTML (/components), which makes it a useful container for a specific visual 'unit'.

`./Profile.jsx`
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

`./App.jsx`
```js
import Profile from "./Profile";

export default function App() {
  return (
    <div>
      <h1>Hello World</h1>
      <Profile />
    </div>
  );
}
```

Note that when we create a component that doesn't fit on a single line (most won't) we return it like so:

```jsx
return (
  <div>
  ...
  </div>
);
```

Also, note how we write the element representation for Profile as `<Profile />`. If your component has no body (they can, we will get to this) it is the equivalent of a self closing element in HTML, like `<img>`. However React is more strict than HTML and will not accept `<Profile>` but will require `<Profile />` with the explicit self-closing tag.

#### Rules around returning JSX and React.Fragment

What if you don't want to return a `<div>` but something like this?

```jsx
export default function Profile() {
  return (
    <h2>User Name</h2>
    <img src="https://via.placeholder.com/600x400" />
  );
}
```

This will cause React to error out with a message that says **"Adjacent JSX elements must be wrapped in an enclosing tag"**. This means all React components must return *exactly one* element. So what do you do if you don't want to litter your HTML/JSX with unnecessary `<div>` elements? The solution: React.Fragment.

```jsx
import { Fragment } from 'react';

export default function Profile() {
  return (
    <Fragment>
      <h2>User Name</h2>
      <img src="https://via.placeholder.com/600x400" />
    </Fragment>
  );
}
```

If you examine this in the chrome dev console you will see there is no additional wrapper element, it's as if you returned the two adjacent elements without a wrapper.

There's also a shorthand version of this that doesn't require you to import anything additional, that looks like so:

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

`<>...</>` is shorthand for Fragment.

#### What are props?

Remember, the first goal of React is to recreate an HTML-like language within JS. So far we have the ability to create new elements, so:

```js
`<Profile />` => (
    <>
      <h2>User Name</h2>
      <img src="https://via.placeholder.com/600x400" />
    </>
)
```

Notice how the contained `<h2>` element has an inner body, and `<img>` has an attribute `src`. React solves that with an idea call 'props' that allow us to customize a Component in the same way an attribute customizes an HTML element

#### HTML vs React element component attributes props

We access a components props like so:

```jsx
export default function Profile(props) {
  console.log(props);

  return (
    <div>
      <h2>User Name</h2>
      <img src="https://via.placeholder.com/600x400" />
    </div>
  );
}
```

That's it! `props` is just a single argument your function takes, and we 'pass' props to a component like so:

import Profile from "./Profile";

```js
export default function App() {
  return (
    <div>
      <h1>Hello World</h1>
      <Profile name="Benjamin Cohen" imgUrl="https://via.placeholder.com/600x400" />
    </div>
  );
}
```

If you run this, you will see the 'props' object printed, with contents:

```js
{ name: 'Benjamin Cohen', imgUrl: 'https://via.placeholder.com/600x400' }
```

Cool! We can pass data to a component using props! But how do we *use* that data?

### Interpolating variables into React

So why pass in an 'argument' in the form of props? The answer is obviously to use it!

```jsx
export default function Profile(props) {

  return (
    <div>
      <h2>{props.name}</h2>
      <img src={props.imgUrl} />
    </div>
  );
}
```

`{...}` is React's interpolation/'escape' syntax. This means, within some JSX (everything in the return) if we want to evaluate some JS code we can. This JS code could be arbitrary, so I could write `{ 1 + 1 }` and it would evaluate to `2`, but it's most common use case is replacing some aspect of the JSX with data passed in as props.

Practice: Create your own component that utilizes props and pass some data into it and interpolate with `{...}`

#### Built-in props

So with props, we almost have a full replacement for HTML in the form of components. What's missing?

- `props.children`

An HTML element can contain other HTML elements, like so:

```html
<form>
  <label>Name</label>
  <input type="text" />
</form>
```

How can we make a React Component aware of it's own body? Like so:

```js
export default function App() {
  return (
    <div>
      <h1>Hello World</h1>
      <Profile name="Benjamin Cohen" imgUrl="https://via.placeholder.com/600x400">
        <marquee>I'm inside the body of Profile</marquee>
      </Profile>
    </div>
  );
}

export default function Profile(props) {

  return (
    <div>
      <h2>{props.name}</h2>
      <img src={props.imgUrl} />
      {props.children}
    </div>
  );
}
```

We were able to grab the body of Profile (if any) using the built in prop `props.children`.

Also worth mentioning is that props, like any JS object, can be destructured, which can be useful, so we could replace the above defintion of Profile with:

```js
export default function Profile({ name, imgUrl, children }) {

  return (
    <div>
      <h2>{name}</h2>
      <img src={imgUrl} />
      {children}
    </div>
  );
}
```

This now completes the full feature set of HTML! That said, we should note some common built-in props. Often, React will have it's own built-in prop which acts as a wrapper for some standard HTML attribute, often with a slightly different name. So for example:

- `className` - replacement for HTML attribute `class` (reference css)

```js
export default function Profile({ name, imgUrl, children }) {

  return (
    <div className="profile">
      <h2>{name}</h2>
      <img src={imgUrl} />
      {children}
    </div>
  );
}
```

- `onClick` - replacement for HTML attribute `onclick`

```js
export default function Profile({ name, imgUrl, children }) {

  const onClickHandler = (event) => {
    alert("You clicked it!");
  }

  return (
    <div className="profile">
      <h2>{name}</h2>
      <img src={imgUrl} />
      {children}
      <button onClick={onClickHandler}>Click me!</button>
    </div>
  );
}
```

Note two things here:

1) the space before the return is like any JS function, feel free to write logic or define functions or variables here and

2) you can escape a function to provide it's value to a prop that takes a function. Note that unlike with `onclick` we don't write the function as a string and explicitly executed like `onclick="onClickHandler()"` but rather we interpolate the entire function and *don't* execute it, so it's `onClick={onClickHandler}`

Everything built-in is listed [here](https://react.dev/reference/react-dom/components/common#common-props)

> good time for break #2

### Common patterns in React

What we covered so far is the basic functionality of React that allows us to essentially create our own customized HTML elements.

However, there are certain patterns in React that are worth pointing out explcitly, which basically cover how to manipulate JSX in response to conditional or loop-like logic.

#### Conditional rendering (naive)

React components are simply functions, so we can render something conditionally just using if/else statements, like so:

```jsx
export default function Profile({ name, imgUrl }) {
  // handles render logic for image
  const renderImageIfImgUrl = () => {
    // if imgUrl was provided and is non-empty, return relevant jsx
    if (imgUrl && imgUrl.length === 0) {
      return <img src={imgUrl} />
    } else {
      return null;
    }
  }

  return (
    <div className="profile">
      <h2>{name}</h2>
      { renderImageIfImgUrl() }
    </div>
  );
}
```

So this is one approach, using a function, interpolate/execute that function to handle the conditional logic. Note that React accepts `null` as a valid component, and if provided, it renders nothing.

This approach ends up scaling poorly, ideally we want that single return statement to cover all of the render logic, and not have it broken up (unless as a fully seperate component). How might we accomplish this?

#### conditional rendering (ternary operator)

The preferred approach to handling conditional rendering is the ternary operator, used like so:

```js
export default function Profile({ name, imgUrl }) {
  return (
    <div className="profile">
      <h2>{name}</h2>
      { (imgUrl && imgUrl.length === 0) ? <img src={imgUrl} /> : null }
    </div>
  );
}
```

Two things to notice:

1) this fit's in far fewer lines and makes the single return statement the one place to look to understand what our component renders and

2) React 'escape' expressions can be nested: 
  - the first escape executes the ternary
  - if true, it is replaced with the jsx `<img src={imgUrl} />`
  - this itself is evaluated and replaced with `<img src="https://via.placeholder.com/600x400" />`

#### Interpolating a list

What about working with lists? Let's try a naive way to start:

```js
import ProfileContainer from './ProfileContainer';

export default function App() {
  const profiles = [
    { name: 'Benjamin Cohen', imgUrl: "https://via.placeholder.com/600x400" },
    { name: 'Adam Cahan', imgUrl: "https://via.placeholder.com/600x400" },
    { name: 'Slavoj Zizek', imgUrl: "https://via.placeholder.com/600x400" }
  ]

  return <ProfileContainer profiles={profiles} />;
}
```

```js
import Profile from './Profile';

export default function ProfileContainer({ profiles }) {
  const profilesAsComponents = [];

  for (const {name, imgUrl} of profiles) {
    profilesAsComponents.push(<Profile name={name} imgUrl={imgUrl} />)
  }

  return (
    <div>
      <h1>Profiles</h1>
      <div id="profiles_container">
        { profilesAsComponents }
      </div>
    </div>
  )
}
```

```js
// same definition as before
export default function Profile({ name, imgUrl }) {
  return (
    <div className="profile">
      <h2>{name}</h2>
      { (imgUrl && imgUrl.length === 0) ? <img src={imgUrl} /> : null }
    </div>
  );
}
```

So this approach works, but it's the same issue as before, we broke up our rendering logic to account for the list. Note that React did accept a list of components and understood it's meaning as 'adjacent components'. Can we do better? Yes, with `map`!

```js
import Profile from './Profile';

export default function ProfileContainer({ profiles }) {
  return (
    <div>
      <h1>Profiles</h1>
      <div id="profiles_container">
        { profiles.map({name, imgUrl} => <Profile name={name} imgUrl={imgUrl} />) }
      </div>
    </div>
  )
}
```

Much neater!

If you ran this in chrome you probably saw a warning that each child should have a unique 'key' property. This is simply so React can quickly look up an individual component in a list of components by key, ie by a unique identifier. You can do that like so:

```js
import Profile from './Profile';

export default function ProfileContainer({ profiles }) {
  return (
    <div>
      <h1>Profiles</h1>
      <div id="profiles_container">
        { profiles.map(({name, imgUrl}, index) => (
            <Profile key={index} name={name} imgUrl={imgUrl} />
          )) 
        }
      </div>
    </div>
  )
}
```

Note that it was fine to introduce more whitespace in our escaped react by using parantheses.

We now have everything we need to build basic sites in React. React likely appears strange however, and it would be good to talk about that for a second to try and understand why it takes the approach it does.

### Discussion: why does React do things this way?

I wanted to leave some open time to discuss the 'weirdness' of React. There are answers for why it does things the way it does, and why it prefers ternary to if statements for example, but the discussion is a bit too broad to teach, and amounts to the question of preferring a functional to an imperative style of programming. This section is to field questions on 'why?'


### Video Store

We are going to be building a sample App over the next few days creating the dashboard for a theoretical Blockbuster-like store.

To start we will create a homepage with a basic display of all the videos and their current status (in stock, checked out, # available).

We will eventually connect this to a backend, but for now we will just mock some data on the frontend.

That project can be found [here](./examples/video-store-pt-1)

Steps to recreate:

1) use Vite to scaffold project
2) install dependencies and run to see it working
3) remove anything extranneous
4) use `App.jsx` to reference a new component `HomePage` and pass it data with props

## Additional Resources

- https://react.dev/learn is currently the best resource available for learning React. Look through it thoroughly as it was recently redesigned form the ground up and should be able to answer lots of essential questions about how to accomplish things in React.

- [React Dev Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en) is a Chrome extension that can make exploring your React app from the dev console more natural.

## Assignments

We want you to rebuild the steps we did with Video Store and add to it if desired. We will continue to build upon this project over the next few days and will provide checkpoints along the way.
