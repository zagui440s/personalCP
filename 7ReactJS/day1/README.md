# Intro To React

## Topics Covered

- What is the problem we are trying to solve?

- How have we 'solved' this problem up until now?

- Bootstrapping a React site using Vite

- Intro to React

  - JSX and Components
  - props and interpolation
  - Single JSX element rule + React.Fragment

- Common patterns in React
  - built-in props:
    - props.children (transclusion)
    - class -> className
    - onclick -> onClick
  - destructuring props
  - conditional rendering with the ternary operator
  - interpolating a list with map

## Lesson

### What is the problem we are trying to solve?

We want to create great user interfaces that respond to user-initiated events (clicking, scrolling, typing) and react appropriately. Our ultimate goal is to create a Single Page Application (SPA) - i.e. a website that gives the user an interactive experience that is as enjoyable/seamless to use as a native application running on their own computer (i.e. Microsoft Word). However, the tools we currently have are really suited for creating static sites with only basic interactivity.

#### The MVC (Model-View-Controller) Pattern

Before we dive into React or even review our current tools, let's discuss developing UIs from a purely conceptual vantage point.

![MVC](./page-resources/mvc-structure.png)

**MVC** (Model-View-Controller) is a software pattern for describing how a user interface works by splitting it into 3 components:

1. **Model**: the source of truth of an application. The Model describes the underlying data that represents the state of our page.

2. **View**: the visually rendered page. The View is what the user sees and interacts with, it is the visual representation of the Model.

3. **Controller**: the Controller 'handles' events that are triggered from the page (clicking, scrolling, typing) and updates the Model in response.

The MVC pattern forms a loop - the Model represents the page, the View displays the page, the Controller responds to page events and updates the Model in response.

> MVC isn't a specific implementation or library, it's merely a conceptual tool for talking about the basic concerns of a UI and how they relate to one another to form a feedback loop.

Let's explore this better with some tools we have already learnt:

### What we have seen so far

Let's refresh what we know about making UIs with HTML, CSS and JS:

- **HTML**: the 'skeleton' of any website, it provides the structure of the view, but uses default styling as determined by the browser. HTML is a _markup language_, meaning it can represent data, but isn't capable of representing computation.

- **CSS**: the 'style' of our app, it is another _markup language_ that let's the developer modify the visual properties of HTML elements on a webpage.

- **JS**: a _programming language_ that can respond to events and alter the underlying page (DOM).

To explore the idea of MVC, let's look at an example (see [1-html-css-js-mvc](./examples/1-html-css-js-mvc/)

> We will use the VSCode extension [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) to serve up this simple website.

Notice the 3 parts:

1. **Model**: the underlying data representing our page - this is the DOM, which we can see in the Chrome dev console under 'Elements'. It is represented in code with the built-in JS variable `document`.

2. **View**: the actual visual representation of the DOM as displayed in the browser. It's starting point is the HTML we served up, which is modified by the styling we provided in the CSS.

3. **Controller**: the JS allows us to respond to events (clicks) and use it to update the Model (`document`) which in turn re-renders the View (the visual page we see in the browser)

#### Limitations to HTML + CSS + JS

The core building blocks of HTML, CSS and JS are enough to create anything we could want on the frontend. However it ends up being a cumbersome approach that doesn't scale well. HTML is our source of truth for what the page looks like, but only initially, as our JS works by modifying the DOM in reaction to events. This works well enough for simple sites, but for a large project this approach doesn't scale well.

React aims to solve this scalability issue by creating a JS library that allows us to (essentially) work with HTML more directly in our JS.

### Bootstrapping a React site using Vite

Our goal now is to get a 'hello world' (very basic proof of concept) React site up. Don't worry if this all is new, we will cover all the new concepts in a moment, we just want to see it and have a working environment to play around in first.

#### Creating a React dev environment using Vite

In your terminal, wherever you want to create the new project, type:

```sh
npm create vite@latest
```

This will prompt you with a wizard. Say yes to proceed, choose a project name (it will create a new folder with such a name) and select React as the framework and JavaScript as the variant. This is necessary because Vite works with many different frontend tools and so we need to specify what we plan to use.

Once done you should have a new folder, I named mine `2-example-vite-project`. Now:

```sh
cd 2-example-vite-project
npm install
npm run dev
```

This will install any dependencies (Vite assumes some already for React) and then runs a script to serve the site.

#### Why does React need such heavy duty tooling to make a basic project?

React environment setup ends up being relatively complicated because of a feature it uses called `jsx`.

`jsx` is a file extension/format, like `js`, but with the additional caveat that you can now write HTML within your JS as if it was natively supported in the language, like so:

```jsx
function MyFirstReactComponent() {
  return <h1>JSX means you can just write html directly in JS!</h1>;
}
```

To accomplish this however `.jsx` code needs to be 'transpiled' to become normal JS that can run on a browser. Instead of trying to set up all of this scaffolding from scratch, we use the env setup/build tool [`Vite`](https://vitejs.dev/).

#### Exploring Vite's scaffolding

Vite set up a fair amount for us to start.

First, notice the root-level file `index.html`. Just like in a normal project, this represents your main page.

> See [2-example-vite-project/index.html](./examples/2-example-vite-project/index.html)

Note that there's very little content in the body, just two things, a `<div>` with `id="root"` and a js script pointing `/src/main.jsx`.

#### Rendering your root component (how React is 'bootstrapped')

`/src/main.jsx` is where React hooks in to the HTML. It does this by grabbing an existing HTML element (`#root`) and rendering a React Component as it's innerHTML.

> See [2-example-vite-project/src/main.jsx](./examples/2-example-vite-project/src/main.jsx)

Some things to note:

1. CSS can be directly imported into JS now, no need for `<link>` elements in your HTML

2. React uses a sibling library called `ReactDOM` to bootstrap itself. Essentially we use vanilla JS to grab the element we care about by ID (`"root"`) and then _render_ our top-level React component, `<App>` (ignore the `<React.StrictMode>`, it's simply a wrapper to give you good warnings).

### Intro to React

### Our First Component

So what is `<App>`? App is our 'root component' that represents our React app, it's source is located at `/src/App.jsx`. As it is the default Vite definition of App is too complicated, so let's replace the contents of `App.jsx` with:

```jsx
export default function App() {
  return <h1>Hello World</h1>;
}
```

Now if you refresh the page you should see 'Hello World' in big letters.

This function `App()` is what we call a **Component**, the most basic building block in React. It is simply a function (currently taking 0 arguments) that returns some HTML (which we can do because we are writing `jsx`). We then (default) export this function so it can be used in `main.jsx`.

In `main.jsx` we import this function, but importantly, we don't call it as if it was a function, we use it in a syntax similar to HTML: `<App />`

This is the core idea of React, creating fully customizable HTML-like Components that can be used to create a user interface. There's a lot more to it, which we will now explore, but you can already see the most basic upgrade: we used to be limited to HTML itself, but now we can effectively make our _own_ HTML elements within JS!

> At this point I recommend you remove any extranneous files/references from the React project for simplicity. So delete any `.css` file and any reference to it, and the assets folder. When done your `src` file should just contain `main.jsx` and `App.jsx`.

#### What is a Component?

So what is a Component? A Component is React's answer to an HTML element. Normally, HTML is a limited set of pre-existing elements, and vanilla JS is used to manipulate those elements over time. With React, we pull _everything_ into the world of JS, so our first task is creating a means of working with HTML in JS, hence the Component.

We implement a component like so:

`./components/MyComponent.jsx`

```jsx
export default function MyComponent() {
  return <h1>Any HTML will work</h1>;
}
```

and reference it like so (in a different component):

`./App.jsx`

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

`<MyComponent />` is effectively replaced with the HTML it returns.

> Note: the space before the return is like any JS function, feel free to write logic or define functions or variables here

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
return <div>...</div>;
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

This will cause React to error out with a message that says **"Adjacent JSX elements must be wrapped in an enclosing tag"**. This means all React components must return _exactly one_ element. So what do you do if you don't want to litter your HTML/JSX with unnecessary `<div>` elements? The solution: React.Fragment.

```jsx
import { Fragment } from "react";

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

There's also a shorthand version of this that doesn't require you to import anything additional, and it is what you will see most often:

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

## What are Props in React?

In React, Props (short for "properties") are a mechanism for passing data from one component to another. When a React component is called, it can receive Props as an argument, which are then stored in an object called "props".

## Using Props in React

There are different ways to use Props in a React component, but one common approach is to pass them as key-value pairs in JSX:

```jsx
<Profile
  name={"Benjamin Cohen"}
  imageUrl={"https://via.placeholder.com/600x400"}
/>
```

In the above example, we are passing two Props to a Profile component: `name` with a value of 'Benjamin Cohen', and `imageUrl` with a value of 'https://via.placeholder.com/600x400'.

To access the Props dictionary within the component, we simply need to reference `props`:

```jsx
export default function Profile(props) {
  console.log(props);
}
```

This will display an object with the keys `name` and `imageUrl` and their corresponding values.

To use the values of Props in your component, you can access them with object notation:

```jsx
export default function Profile(props) {
  return (
    <>
      <h2>{props.name}</h2>
      <img src={props.imageUrl} />
    </>
  );
}
```

Props can also be destructured, which can be useful for code clarity:

```jsx
export default function Profile(props) {
  const { name, imageUrl } = props;

  return (
    <div>
      <h2>{name}</h2>
      <img src={imageUrl} />
    </div>
  );
}
```

Alternatively, you can destructure Props directly in the function definition:

```jsx
export default function Profile({ name, imageUrl }) {
  return (
    <div>
      <h2>{name}</h2>
      <img src={imageUrl} />
    </div>
  );
}
```

> Note: any which way, React Components only take a _single_ parameter `props`.

### Interpolating variables into React

curly brackets are `{...}` React's interpolation/'escape' syntax. This is how we evaluate JS code inside the return statement. This JS code could be arbitrary, so I could write `{ 1 + 1 }` and it would evaluate to `2`, but it's most common use case is replacing some aspect of the JSX with data passed in as props.

Practice: Create your own component that utilizes props and pass some data into it and interpolate with `{...}`

## The Children Prop

So with props, we have almost a full replacement for HTML in the form of components. But there is still one missing piece: `props.children`.

An HTML element can contain other HTML elements:

```html
<div>
  <p>Hello, world!</p>
</div>
```

How can we make a React component aware of elements it is wrapping? For example:

```jsx
export default function App() {
  return (
    <Profile>
      <PersonalInfo
        name="John Doe"
        imageUrl="https://via.placeholder.com/150"
      />
      <Skills />
      <Contact />
    </Profile>
  );
}
```

In this example, we want the `Profile` component to be able to render the `PersonalInfo`, `Skills`, and `Contact` components, which are wrapped inside it.

We can achieve this using the `children` prop:

```jsx
import React from "react";

function Profile({ children }) {
  return (
    <div className="profile">
      <div className="profile-header">
        <h2>Profile</h2>
      </div>
      <div className="profile-content">{children}</div>
    </div>
  );
}
```

In the `Profile` component, we use the `children` prop to render the wrapped components. The `children` prop is a special prop that contains any JSX elements that are passed to the component between its opening and closing tags.

We can also add more components to the example:

```jsx
function Skills() {
  return (
    <div className="skills">
      <h3>Skills</h3>
      <ul>
        <li>JavaScript</li>
        <li>React</li>
        <li>HTML</li>
        <li>CSS</li>
      </ul>
    </div>
  );
}

function Contact() {
  return (
    <div className="contact">
      <h3>Contact</h3>
      <ul>
        <li>Email: example@example.com</li>
        <li>Phone: 555-555-5555</li>
        <li>Twitter: @example</li>
      </ul>
    </div>
  );
}

function PersonalInfo({ name, imageUrl }) {
  return (
    <div className="profile-card">
      <div className="profile-card-header">
        <img src={imageUrl} alt={name} />
      </div>
      <div className="profile-card-content">
        <h3>{name}</h3>
        <p>Some additional information about the user.</p>
      </div>
    </div>
  );
}
```

In this updated example, we have added a `PersonalInfo` component, a `Skills` component, and a `Contact` component, which can all be rendered inside the `Profile` component using the `children` prop.

We were able to grab the body of Profile (if any) using the built in prop `props.children`.

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
  };

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

2. you can escape a function to provide it's value to a prop that takes a function. Note that unlike with `onclick` we don't write the function as a string and explicitly executed like `onclick="onClickHandler()"` but rather we interpolate the entire function and _don't_ execute it, so it's `onClick={onClickHandler}`

Everything built-in is listed [here](https://react.dev/reference/react-dom/components/common#common-props)

> good time for break #2

### Common patterns in React

What we covered so far is the basic functionality of React that allows us to essentially create our own customized HTML elements.

However, there are certain patterns in React that are worth pointing out explcitly, which basically cover how to manipulate JSX in response to conditional or loop-like logic.

#### conditional rendering

The preferred approach to handling conditional rendering is the ternary operator, used like so:

```js
export default function Profile({ name, imgUrl }) {
  return (
    <div className="profile">
      <h2>{name}</h2>
      {imgUrl && imgUrl.length === 0 ? <img src={imgUrl} /> : null}
    </div>
  );
}
```

Two things to notice:

1. this fit's in far fewer lines and makes the single return statement the one place to look to understand what our component renders and

2. React 'escape' expressions can be nested:

- the first escape executes the ternary
- if true, it is replaced with the jsx `<img src={imgUrl} />`
- this itself is evaluated and replaced with `<img src="https://via.placeholder.com/600x400" />`

#### Interpolating a list

What about working with lists?

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
import Profile from "./Profile";

export default function ProfileContainer({ profiles }) {
  return (
    <div>
      <h1>Profiles</h1>
      <div id="profiles_container">
        {profiles.map(({ name, imgUrl }, index) => (
          <Profile key={index} name={name} imgUrl={imgUrl} />
        ))}
      </div>
    </div>
  );
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

1. use Vite to scaffold project
2. install dependencies and run to see it working
3. remove anything extranneous
4. use `App.jsx` to reference a new component `HomePage` and pass it data with props

## Additional Resources

- https://react.dev/learn is currently the best resource available for learning React. Look through it thoroughly as it was recently redesigned form the ground up and should be able to answer lots of essential questions about how to accomplish things in React.

- [React Dev Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en) is a Chrome extension that can make exploring your React app from the dev console more natural.

## Assignments

We want you to rebuild the steps we did with Video Store and add to it if desired. We will continue to build upon this project over the next few days and will provide checkpoints along the way.

Video store repo is located here: https://github.com/Code-Platoon-Assignments/video-store

Fork the repo then clone for a local copy, for example:

```sh
git clone https://github.com/AloofBuddha/video-store.git
```

You can merge the pt-1-starting point into main and make main your source of truth for the project with:

```sh
git pull --all              # pull all branches from origin, not just main
git checkout main
git merge pt-1-start
```

To see the desired end result for part 1:

```sh
git checkout pt-1-end
```

If you want to abandon your own work at any point and start over from a canonical starting point you can do so with:

```sh
git reset --hard origin/pt-2-start
```
