# React Router

> Remember to use the Slido poll

## Topics Covered / Goals

- Server-side routing (as we know it)
- Client Side Routing
- Setup, Scaffolding and Simple Routes
- Frontend vs backend routing
- Not Found Component and errorElement
- Parameterized routes
- loaders
- Video store pt 4: 
    - Add frontend routing so we now have a seperate page for viewing movie details
    - from the details page we should be able to return to the main page
- Assignment
    - Building Day 4 features

## Lesson

### Server-side routing (as we know it)

In traditional websites, the browser requests a document from a web server, downloads and evaluates CSS and JavaScript assets, and renders the HTML sent from the server.

[Traditional back end routing (Slides 1-11)](https://docs.google.com/presentation/d/13D2ZFBXaW-sh_02M6B4qCtm8hA7ULDJVaAsbVacPleo/edit?usp=sharing)

Note however that when the user clicks a link, this starts the process all over again for a new page (back to the server). This is because either typing a URL into a browser and hitting enter or using a traditional `<a href="/about">About</a>` type link will always trigger a request to the server.

Perhaps this worked okay when using seperate HTML pages (or Django templates) where we might see a `urls.py` like so:

```py
  from django.urls import path
  from . import views

  urlpatterns = [  
      path('', views.index),           # /        app home page
      path('about', views.about),      # /about   app about page
      path('api', include('api.urls')) # /api/*   api urls
  ]  
```

But React bundles everything together in a Single Page App represented by a single HTML page (demonstrate this witg `npm run build`), so this doesn't quite work. This is one reason why we might want to create some kind of **client side routing** system. What does this mean?

### Client Side Routing

React Router is a React compatible library that enables **client side routing**. This means firstly that your React app is aware of and can adapt to the current URL. It is more than this however.

If we click a link on the page served up from `/` with traditional server-side routing, any link we click on, whether it is absolute (http://www.google.com) or relative to our own backend (`/about`) we will need to make a full roundtrip back to the server just to get the same React app. **Client side routing** aims to fix this issue by allowing our React app to pay attention to the URL and simply render the right Component in response, without having to make a new backend request at all. It's less noticable when developing locally, but this means your app can immediately render some new UI without making any new requests. This enables faster user experiences because the browser doesn't need to request an entirely new document or re-evaluate CSS and JavaScript assets for the next page.

[Client side routing (Slides 12-17)](https://docs.google.com/presentation/d/13D2ZFBXaW-sh_02M6B4qCtm8hA7ULDJVaAsbVacPleo/edit?usp=sharing)

This is all very abstract right now so let's implement it.

### Setup, Scaffolding and Simple Routes

First let's create a new project and install dependencies

```sh
npm create vite@latest react-router-example # select React, JavaScript
cd react-router-example
npm install # install regular dependencies
npm install --save axios react-router-dom # install extra dependencies
npm run dev
```

Next, let's create our own `<RootRouter />` component and define our Routes. We want to do this in a few seperate files like so:

1) Create a new folder `components` and two files called `HomePage.jsx` and `AboutPage.jsx` defining two (basic) pages.

```js
export default function HomePage() {
    return <h1>Home Page</h1>
}
```

```js
export default function AboutPage() {
    return <h1>About Page</h1>
}
```

These are self explanatory, simple components, which we will use to demonstrate client side routing.

2) Create a new `/src` level component (at the same level as `App.jsx` and `main.jsx`) called `router.jsx`

```js
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./components/HomePage";
import AboutPage from "./components/AboutPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: < App />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: "about",
                element: <AboutPage />,
            }
        ],
    },
]);

export default router;
```

This creates a BrowserRouter object. Notice how we can define a path/component match at the top-level and also provide nested routes in the form of the children array.

3) Update `main.jsx` to use the RouterProvider component and pass it our created router object

```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './router';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
```

The Provider component is now the top level component and makes it so all the components below it are Router aware and can use react-router specific hooks.

4) Update `<App />` to use this component like so:

```js
import { Link, Outlet } from 'react-router-dom';

export default function App() {
    return (
        <div>
            <header>
                <h1>This section is common to all pages</h1>
                <nav>
                    <h2>Navbar</h2>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/doesnt-exist">Example invalid route</Link></li>
                    </ul>
                </nav>
            </header>
            <section className="sub-page-container">
                <Outlet />
            </section>
        </div>
    );
}
```

`<App />` will render for all pages matching `/*` (i.e. all pages) and we use this to define the JSX common to all pages, including a `<nav>` element.

`<Link />` is used to link between pages, this is no more complex than a traditional `<a>` link, react-router is simply aware of `<Link />` and can therefore do the routing client side (an `<a>` would not trigger react-router, so it would trigger a backend request like normal).

`<Outlet />` is another component provided to us by react-router and it will be replaced with whatever the matching sub-Route is in the RootRouter.

All of this together is the scaffolding for doing front end routing with `react-router`. As a result, when we go to `/` we see the full App with the HomePage component rendering in the place of `<Outlet />`, and if we click the `/about` Link we will see the AboutPage render in the same spot. Paying attention to the dev console's network tab we can see there is no backend request being made.

### Frontend vs backend routing

The difference between frontend (client side) vs backend (server side) routing is often a major sticking point for students so we want to address this as direcrtly as we can.

This brings us to the first and most significant distinction between frontend and backend routing, which is: **if you type a new url into the browser and manually hit enter, that will always send a request to the backend**. This is natural and normal because when someone first goes to your site they actually do need to make a backend request to get the HTML/CSS/JS resources.

 Similarly, **if you click an `<a>` tag with a relative path for the href (`/about`) that will always send a request to the backend**. This is also natural and normal because `<a>` tags can link anywhere, including to non-relative paths like `<a href="https://www.google.com">Go to Google</a>`, so `<a>` assumes you need to contact the associated server to request the relevant resources.

The important point is **they are not exclusive, you need to account for both**. As a result understanding when each comes into play is essential.

First, backend. If you type something into a URL bar and hit enter (the first step of visiting a new site) this will always go to the backend, and naturally the backend needs to serve up something in response. So on the backend, we want all of our routes to serve up the same React app, so in Django that would look something like:

```py
  from django.urls import path
  from . import views

  urlpatterns = [  
      path('', views.react_app),           # /        app home page
      path('about', views.react_app),      # /about   app about page
      path('api', include('api.urls'))     # /api/*   api urls
  ]
```

and

```py
# index.html would be the output of calling `npm run build` on our vite project
def react_app(request):
        return render(request, 'index.html') 
```

We might even want to set up our `urlpatterns` so that we serve up the react app in all cases but an `/api/*` url

```py
from django.urls import path
from . import views

urlpatterns = [  
    path(r'^api/', include('api.urls')),     # matches /api/*   api urls
    url(r'^', views.react_app),              # matches /*       for anything else, serve the React app 
]
```

This means that if someone types `/` or `/about` (or even a invalid route like `/doesnt-exist`) we will serve up the React app, because all of these route are valid URLs someone could put in a browser.

Once that HTML page is received by the client, our front-end routing will kick in, and if the url matches a Component as defined in `router.jsx` we will see the right page. 

At that point, given that the app is currently being rendered on the client side, any future changes to the URL that happen through the `<Link />` component will not have to fetch the backend but will just be able to render it locally by switching to a different component.

The important point to remember is that both your backend and frontend need to account for all the URLs in which you want to serve up the React app, and then frontend routing will determine which Component is rendered as a result.

### Not Found Component and errorElement

In the above Django pseudo-code we used a regular expression to match any non-api route to serve up our React app. However only two of those routes will actually render a specific component client-side. If we entered a url of `/doesnt-exist` into the browser we would serve up the react app, but the app would break as there's no matching route. react-router provides two possible solutions to this. First, we can use a wildcard like so:

```js
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./components/HomePage";
import AboutPage from "./components/AboutPage";
import ErrorPage from "./components/ErrorPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: < App />,
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
                path: "*",
                element: <ErrorPage />,
            }
        ],
    },
]);

export default router;
```

```js
export default function ErrorPage() {
    return <h1>404 Not Found</h1>
}
```

Now when you enter (or link to) a non-existent route like `/doesnt-exist` we see a specific component render in the place of Outlet.

There's another approach that will not render in the place of outlet but outright replace the component in question with another if any error is thrown when trying to render it. That looks like so:

```js
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./components/HomePage";
import AboutPage from "./components/AboutPage";
import ErrorPage from "./components/ErrorPage";
import PokeViewer from "./components/PokeViewer";

const router = createBrowserRouter([
    {
        path: "/",
        element: < App />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: "about",
                element: <AboutPage />
            },
            {
                path: "pokemon/:pokeId",
                element: <PokeViewer />
            }
        ]
    }
]);

export default router;
```

Now if you navigate to an invalid link it doesn't just replace Outlet's content but the entire page's content.

### Parameterized routes

Something we have in backend routing that we have yet to see on the frontend is parameterized routes, ie urls that look like `/users/44/posts/20`. We can use this pattern with `react-router` as well though. Let's make a new route and component. First, the new route:

```js
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./components/HomePage";
import AboutPage from "./components/AboutPage";
import ErrorPage from "./components/ErrorPage";
import PokeViewer from "./components/PokeViewer";

const router = createBrowserRouter([
    {
        path: "/",
        element: < App />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: "about",
                element: <AboutPage />
            },
            {
                path: "pokemon/:pokeId",
                element: <PokeViewer />
            }
        ]
    }
]);

export default router;
```

and make the corresponding Component (modified from w8d3's examples):

```js
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';


export default function PokeViewer() {
    const [pokeData, setPokeData] = useState(null);
    const { pokeId } = useParams();

    const pokeImgs = pokeData ?
        Object.values(pokeData.sprites)
            .filter(sprite => typeof sprite === "string") : null;

    console.log(pokeData)
    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeId}`)
            .then(response => setPokeData(response.data));
    }, []);

    return (
        <div>
            {pokeData && (
                <>
                    <h2>{pokeData.name}</h2>
                    <div>
                        <div>
                            {pokeImgs.map((url, index) => (
                                <img key={index} src={url} />
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
```

`react-router` provided it's own hook called `useParams` that allows us to grab the params off the route, and the rest is standard React.

### loaders

React Router provides another means of working with async that can be very useful, called `loaders`. A loader is a function that returns a Promise and, when defined for a given route, React router will first fetch the data and only render the new route when the associated data has arrived. This can make the UX better as there's no waiting for a blank page to load some data, we only move to the page once its ready. This is done like so:

```js
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./components/HomePage";
import AboutPage from "./components/AboutPage";
import ErrorPage from "./components/ErrorPage";
import PokeViewer, { pokeLoader } from "./components/PokeViewer";

const router = createBrowserRouter([
    {
        path: "/",
        element: < App />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: "about",
                element: <AboutPage />
            },
            {
                path: "pokemon/:pokeId",
                element: <PokeViewer />,
                loader: pokeLoader
            }
        ]
    }
]);

export default router;
```

```js
import axios from "axios";
import { useLoaderData } from 'react-router-dom';

export async function pokeLoader({ params }) {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${params.pokeId}`)
    return response.data;
}

export default function PokeViewer() {
    const pokeData = useLoaderData();

    const pokeImgs = pokeData ?
        Object.values(pokeData.sprites)
            .filter(sprite => typeof sprite === "string") : null;

    return (
        <div>
            {pokeData && (
                <>
                    <h2>{pokeData.name}</h2>
                    <div>
                        <div>
                            {pokeImgs.map((url, index) => (
                                <img key={index} src={url} />
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
```

This ends up being more concise because we don't need to manually use the useState or useEffect hooks, we just have a loader function and a new react-router hook called `useLoaderData`;

### Resources

- [react-router docs](https://reactrouter.com/en/main)

### Assignment
Starting with w8d3's ending point (video-store-pt-3) we want to add the following features:
    - Add frontend routing so we now have a seperate page for viewing movie details
    - from the details page we should be able to return to the main page

Alternatively you can adapt this to your own app, just add routing in some meaningful way.













