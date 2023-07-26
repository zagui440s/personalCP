# React Router

## Topics Covered / Goals

- What Are We Building Towards?
- Server-side Routing vs Client-side Routing
  - Server Side Routing (Traditional Routing)
  - Motivation for Moving to Client Side Routing
- `react-router` Setup and Scaffolding
- Making Our Routes Client-Side
- 404 and `"errorElement"`
- Parameterized Routes and `useParams`
- Programmatic Redirects and `useNavigate`
- Passing Data to `<Outlet />` with `useOutletContext`
- Client Side vs Server Side Routing Revisited
- Bonus: loaders

- Assignment
  - Building Day 4 features

## Lesson

### What Are We Building Towards?

First, let's look at what traditional (server side) routing looks like with this simple example: [traditional-server-side-routing](./examples/traditional-server-side-routing). Serve it with Live Server.

Note that:

- we have 3 separate pages with nearly identical content
- every time we click a link the browser refreshes
- the Network tab will show that each time we move to a new page we are re-fetching and re-evaluating the same css and js assets

Now, let's look at an example of what we are building towards with `react-router` (client side) routing:

[client-side-routing](./examples/client-side-routing)

Note that:

- we could render the common parts of the page only once, and represent each unique 'page' as a component representing only what changed on that route
- clicking links (no longer `<a>`, now `<Link>`) does not refresh the page and navigates to the 'new page' instantly
- the Network tab will show that each time we move to a 'new page' we aren't refetching or reevaluating anything. All the assets we need were fetched and evaluated on the initial request.

### Server-side Routing vs Client-side Routing

[From Server-side to Client-side routing](https://docs.google.com/presentation/d/13D2ZFBXaW-sh_02M6B4qCtm8hA7ULDJVaAsbVacPleo/edit?usp=sharing)

**Summary:**

#### Server Side Routing (Traditional Routing)

In traditional websites, the browser requests a document from a web server, receives a response, downloads and evaluates CSS and JavaScript assets, then renders the page to the browser.

However, when a user clicks a link (`<a href="/about">About</a>`), this starts the process all over again for a new page (back to the server). This is because either typing a URL into a browser and hitting enter or using a traditional `<a>` type link will always trigger a new request to the server.

#### Motivation for Moving to Client Side Routing

React Router is a React compatible library that enables **client side routing**. This means firstly that your React app is aware of and can adapt to the current URL. It is more than this however.

If we click a link on the page served up from `/` with traditional server-side routing, any link we click on, whether it is absolute (`http://www.google.com`) or relative to our own backend (`/about`) we will need to make a full roundtrip back to the server just to get the same React app. This is a lot of waste for the same resource!

**Client side routing** aims to fix this issue by allowing our React app to pay attention to the URL and simply render the right Component in response, without having to make any new backend requests. It's less noticable when developing locally, but this means your app can _immediately_ render some new UI without waiting on a request. This enables faster user experiences because the browser doesn't need to request an entirely new document and re-evaluate the same CSS and JavaScript assets as the page it was just on.

This is all very abstract right now so let's see it implemented.

### `react-router` Setup and Scaffolding

First let's create a new project and install dependencies (or you can follow along with the example app at `./examples/react-router-example-project`)

```sh
npm create vite react-router-example-project # select React, JavaScript
cd react-router-example-project
npm install # install regular dependencies
npm install --save react-router-dom axios # install react-router, axios
npm run dev
```

Next, let's make some initial changes to our project:

1. Replace `<App />` with the contents below:

```js
export default function App() {
  return (
    <>
      <h1>A very simple site to demonstrate client side routing</h1>
      <nav>
        <ul>
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/contact-us">Contact us</a>
        </ul>
      </nav>
    </>
  );
}
```

2. Create a new folder `components` and three file: `HomePage.jsx` `AboutPage.jsx` and `ContactUsPage.jsx`. We will make the contents extremely basic just as a proof of concept our routing works.

```js
export default function HomePage() {
  return <h2>This is the Home page</h2>;
}
```

```js
export default function AboutPage() {
  return <h2>This is the About page</h2>;
}
```

```js
export default function ContactUsPage() {
  return <h2>This is the Contact Us page</h2>;
}
```

These are self explanatory, simple components, which we will use to demonstrate client side routing.

3. Create a new `/src` level component (at the same level as `App.jsx` and `main.jsx`) called `router.jsx`:

```js
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./components/HomePage";
import AboutPage from "./components/AboutPage";
import ContactUsPage from "./components/ContactUsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "contact-us",
        element: <ContactUsPage />,
      },
    ],
  },
]);

export default router;
```

This creates a BrowserRouter object. Notice how we can define a path/component match at the top-level and also provide nested routes in the form of the children array. This can be read as:

a. on path "/" (really "/\*", match "/" and anything else that follows) render the component `<App>`

b. on path "/" followed by nothing else (`index: true`), render the 'child' element `<HomePage />`

c. on path "/about", render the 'child' element `<AboutPage />`

d. on path "/contact-us", render the 'child' element `<ContactUsPage />`

`router.jsx` is where we define our desired routing as an object

4. Update `main.jsx` to use the RouterProvider component and pass it our created router object from `router.jsx`

```js
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
```

5. If you want the same css as I have update `index.css` to have the contents:

```css
ul {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}
```

The Provider component is now the top level component and makes it so all the components below it are Router aware and can use react-router specific hooks. Note that we don't render `<App />` as our top-level component anymore, instead that is defined within `router.jsx`.

#### Making Our Routes Client-Side

1. Make `<App />` aware of it's sub-routes

You make have noticed that while we set up the necessary scaffolding, things aren't quite right yet. First, no matter which page we go to, we only see the `<App />` part, not the part unique to the `<HomePage />` or `<AboutPage />`. Let's fix that first.

Update `<App />` to use the `react-router` component `<Outlet />` like so:

```js
import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <>
      <h1>A very simple site to demonstrate client side routing</h1>
      <nav>
        <ul>
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/contact-us">Contact us</a>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}
```

OK, now this works as expected!

Based on how we defined `router.jsx`, `<App />` will render for all pages matching `/*` (i.e. every page) and we use this to define the JSX common to all pages, including a `<nav>` element.

`<Outlet />` is a component provided to us by `react-router` that acts as a placeholder for whatever matches the rest of the route as defined in `router.jsx` as one the `children`.

2. Update `<a>` elements to `<Link>` components

That solves one problem, but not the other. Every time we click one of these links, we are doing a full page refresh. That's because we are still defining our links as `<a>` elements, and by default a browser will interpret clicking such a link as a standard server side link and make a full request to the server.

That's why `react-router` provides it's own replacement component for `<a>` called `<Link>`. Let's update our definition of `<App />` once again:

```js
import { Outlet, Link } from "react-router-dom";

export default function App() {
  return (
    <>
      <h1>A very simple site to demonstrate client side routing</h1>
      <nav>
        <ul>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact-us">Contact us</Link>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}
```

What changed?

First, we imported another component from `react-router`: `<Link>`. Then we changed our `<a>` elements to `<Link>` components. We also changed the `href` attribute to a prop called `to`, because that's the expected API for `<Link>`.

`<Link />` is used to link between pages, just like a traditional `<a>` link. The difference is that `react-router` is aware of `<Link />` and can therefore do the routing client side (an `<a>` would not trigger react-router, so it would just trigger a server side request like normal).

All of this together is the essential scaffolding for doing front end routing with `react-router`. As a result, when we go to `/` we see the full `<App />` with the `<HomePage />` component rendered in place of `<Outlet />`. If we then click the `<Link to="/about">` we will see the `<AboutPage />` render in the same spot `<HomePage />` just was. Paying attention to the dev console's network tab we can see there is no backend request being made.

At this point we now have client-side routing, which is a very powerful new tool at very little additional cost. The rest of this lecture will focus on different scenarios we might encounter when routing and how `react-router` provides solutions for them.

### 404 and `"errorElement"`

Normally with server-side routing if you got to a url that doesn't have a matching url on the server, say `www.mysite.com/doesnt-exist`, you will get back a generic browser-produced 404 page. How does this work with our client-side approach?

`react-router` is actually smart enough to catch this and generate it's own built-in 404 page, but you can customize this behavior with the router object key `"errorElement"` like below:

```js
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./components/HomePage";
import AboutPage from "./components/AboutPage";
import ContactUsPage from "./components/ContactUsPage";
import Error404Page from "./components/Error404Page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "contact-us",
        element: <ContactUsPage />,
      },
    ],
    errorElement: <Error404Page />,
  },
]);

export default router;
```

```js
export default function Error404Page() {
  return <pre>Custom 404 Page</pre>;
}
```

Note how `"errorElement"` is defined at the same level as the main route and doesn't include the contents of `<App />` when it renders. That's because it is the 'catch' statement for there being no path within `"children"` that matches, so it isn't a child itself, it's the case where nothing in `"children"` matched.

### Parameterized Routes and `useParams`

Something we have in backend routing that we have yet to see on the frontend is parameterized routes, i.e. urls that look like `/users/44`. Luckily we can use this pattern with `react-router` as well! Let's make a new route and component.

1. First, the new route:

```js
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./components/HomePage";
import AboutPage from "./components/AboutPage";
import ContactUsPage from "./components/ContactUsPage";
import UserPage from "./components/UserPage";
import Error404Page from "./components/Error404Page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "contact-us",
        element: <ContactUsPage />,
      },
      {
        path: "users/:userId",
        element: <UserPage />,
      },
    ],
    errorElement: <Error404Page />,
  },
]);

export default router;
```

2. Make the corresponding Component:

```js
import { useParams } from "react-router-dom";

export default function UserPage() {
  const { userId } = useParams();

  return <h2>User Page for user with id: {userId}</h2>;
}
```

`react-router` provides some of it's _own_ hooks, one of them being `useParams`. `useParams` allows us to grab any named params defined in `router.jsx` from the url, and the rest is standard React.

3. Update `<App />` to include an example route:

```js
import { Outlet, Link } from "react-router-dom";

export default function App() {
  return (
    <>
      <h1>A very simple site to demonstrate client side routing</h1>
      <nav>
        <ul>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact-us">Contact us</Link>
          <Link to="/users/44">User 44</Link>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}
```

### Programmatic Redirects and `useNavigate`

What about the situation where you want to move to a new route, but not because a user clicked a `<Link>` on the page, but in response to some event. `react-router` supports that as well, with a different hook called `useNavigate`.

Suppose we wanted to set up an arbitrary rule that if the param associated with the `userId` was greater than 99, we would print an error to the console and redirect back to the Home Page.

Let's modify the `<UserPage />` to see this in action:

1. Update `<App />` to include an example 'bad' User Page link:

```js
import { Outlet, Link } from "react-router-dom";

export default function App() {
  return (
    <>
      <h1>A very simple site to demonstrate client side routing</h1>
      <nav>
        <ul>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact-us">Contact us</Link>
          <Link to="/users/44">User 44</Link>
          <Link to="/users/101">User 101</Link>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}
```

2. Update `<UserPage />` to use `useNavigate`

```js
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function UserPage() {
  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (parseInt(userId, 10) > 99) {
      console.error("There are no users with id > 99!");
      navigate(`/`);
    }
  }, [userId]);

  return <h2>User Page for user with id: {userId}</h2>;
}
```

First we are requiring another hook from `react-router` called `useNavigate`, which when called gives us a function called we named `navigate` that will navigate using client side routing to whatever path is provided as it's only argument. However notice that we needed to call it from within a `useEffect`. `useEffect` is not only for APIs, it's for anything that counts as a 'side effect', i.e. it changes something at the browser level that needs to be reacted to. If you try to call `navigate` from outside of a `useEffect` it likely won't work as React is not aware anything has changed. Note the dependency list includes the `userId`, as we want to rerun this useEffect if that changes, which it might if we visit the page multiple times with different id parameters.

### Passing Data to `<Outlet />` with `useOutletContext`

You probably noticed that all of our examples so far do not take any `props`. `<Outlet />` actually doesn't play well with `props`, so if we want to do pass data to whatever replaced `<Outlet />` we need to find another way. That way is `useOutletContext`, which is another `react-router` provided custom hook, which works much like `useContext` does, but specifically for working with `<Outlet />`.

Let's see this in action by modifying the Contact Us page to receive some arbitrary data:

1. First, we need to update `<App />` to provide the context data, like so:

```js
import { useState } from "react";
import { Outlet, Link } from "react-router-dom";

export default function App() {
  const [feedback, setFeedback] = useState("");

  return (
    <>
      <h1>A very simple site to demonstrate client side routing</h1>
      <nav>
        <ul>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact-us">Contact us</Link>
        </ul>
      </nav>
      <Outlet context={{ feedback, setFeedback }} />
    </>
  );
}
```

All children of `/` that could replace `<Outlet />` (as defined in `router.jsx`) now will have access to these variables.

2. Update `<ContactUsPage />` to grab these values using `useOutletContext`:

```js
import { useOutletContext } from "react-router-dom";

export default function ContactUsPage() {
  const { feedback, setFeedback } = useOutletContext();

  return (
    <>
      <h2>This is the Contact Us page</h2>
      <h3>What's your complaint?</h3>
      <textarea
        rows={20}
        cols={50}
        value={feedback}
        onChange={(event) => setFeedback(event.target.value)}
      />
    </>
  );
}
```

3. Just to see this feedback is being shared between components, let's update `<HomePage />` as well:

```js
import { useOutletContext } from "react-router-dom";

export default function HomePage() {
  const { feedback } = useOutletContext();

  return (
    <>
      <h2>This is the Home page</h2>
      {feedback.length > 0 && (
        <>
          <h3>Looks like we got some feedback:</h3>
          <pre>{feedback}</pre>
        </>
      )}
    </>
  );
}
```

Some things to note:

- all the possible components that could match with `<Outlet />` have access to this context data, accessible with `useOutletContext`
- If we click `<Link />` components we will see that that data is persisted throughout our React app
- If we reload the page however (or manually navigate to a different route using our browser's url bar) this data is lost. Client-side does not persist data and we will need to work up to backend integration before we can accomplish this.

### Client Side vs Server Side Routing Revisited

The difference between client side vs server side routing is often a major sticking point for students so we want to address this confusion as directly as we can.

The first and most significant distinction between client side and server side routing is: **if you type a new url into the browser and manually hit enter, that will _always_ send a new request to the server**. This is natural and normal because when someone first goes to your site they actually do need to make a server side request to get the initial HTML/CSS/JS resources that represent the page.

By the same standard, **if you click an `<a>` tag with a relative path for the href (`/about`) that will _always_ send a new request to the server**. This is also natural and normal because `<a>` tags can link anywhere, including to non-relative paths like `<a href="https://www.google.com">Go to Google</a>`, so `<a>` assumes you need to contact the associated server to request the relevant resources.

Client-side routing only comes into play if you are using a specific frontend library like `react-router` and the 'link' you click is really a `<Link>` component under the hood. In this case, no new request is made to the server, because `react-router` intercepts this click and instead follows it's own logic and updates the url bar accordingly.

This can get confusing at times, when a page is being requested from the server vs when it is just being handled client-side. If I put `www.mysite.com/about` in my browser's url bar and hit enter, that will need a server side route to catch that and serve up my React project (which is probably the same React project served up at `www.mysite.com/`). However if I then navigate from the received page to `www.mysite.com/contact-us` and the link in question is really a `<Link>` component, that will be handled client-side. To a degree the confusion between the two is unavoidable as both come into play depending on how the page is navigated to. The important point is **they are not exclusive approaches, and you need to account for both scenarios**.

### Bonus: loaders

React Router provides an approach to working with backend calls that is relatively advanced (but is also very useful) called `loaders`. A loader is a function that returns a Promise and, when defined for a given route, React router will first fetch the data and only navigate to the new route when the associated data has been received. This can make the UX better as you don't immediately navigate to a blank page and wait for the data to load, you only move to the new page once everything is ready.

Let's modify our `<UserPage />` to see how it's done:

1. First, let's update `<UserPage />` to define such a loader function:

```js
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export async function userImageLoader({ params }) {
  const response = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/${params.userId}`
  );
  return response.data.sprites.front_default;
}

export default function UserPage() {
  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (parseInt(userId, 10) > 99) {
      console.error("There are no users with id > 99!");
      navigate(`/`);
    }
  }, [userId]);

  return <h2>User Page for user with id: {userId}</h2>;
}
```

Note that `userImageLoader` is exported (but not `export default`) and is outside the body of the Component, as it's just a standalone function. Also note that it can be made parameter aware.

2. Now let's update `router.js` to hook up the loader functionality

```js
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./components/HomePage";
import AboutPage from "./components/AboutPage";
import ContactUsPage from "./components/ContactUsPage";
import UserPage, { userImageLoader } from "./components/UserPage";
import Error404Page from "./components/Error404Page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "contact-us",
        element: <ContactUsPage />,
      },
      {
        path: "users/:userId",
        element: <UserPage />,
        loader: userImageLoader,
      },
    ],
    errorElement: <Error404Page />,
  },
]);

export default router;
```

Simple enough, we just provide said function as part of the route object associated with `<UserPage />`.

3. Let's update `<UserPage />` once again to take advantage of this pre-loaded data using the `useLoaderData` hook:

```js
import { useEffect } from "react";
import { useParams, useNavigate, useLoaderData } from "react-router-dom";
import axios from "axios";

export async function userImageLoader({ params }) {
  const response = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/${params.userId}`
  );
  return response.data.sprites.front_default;
}

export default function UserPage() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const userImageUrl = useLoaderData();

  useEffect(() => {
    if (parseInt(userId, 10) > 99) {
      console.error("There are no users with id > 99!");
      navigate(`/`);
    }
  }, [userId]);

  return (
    <>
      <h2>User Page for user with id: {userId}</h2>
      <img src={userImageUrl} />
    </>
  );
}
```

This not only makes the UX better but it ends up being a bit more concise because we don't need to manually use the useState or useEffect hooks, we just have a loader function handle it all for us;

### Resources

- [react-router tutorial](https://reactrouter.com/en/main/start/tutorial)

## Assignments
