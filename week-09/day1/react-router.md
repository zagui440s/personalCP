# React Router

> Remember to use the Slido poll

## Topics Covered / Goals

- Server-side routing (as we know it)
- Client Side Routing
- Setup, Scaffolding and Simple Routes
- Frontend vs backend routing
- The `<Link />` component
- Frontend vs backend routing pt 2
- Parameterized routes

- Video store features: 
    - Add frontend routes so we now have pages for our existing app (what are our other pages?)
- Assignment
    - Building Day 4 features (need to specify what 'other pages' consists of)

## Lesson

### Server-side routing (as we know it)

In traditional websites, the browser requests a document from a web server, downloads and evaluates CSS and JavaScript assets, and renders the HTML sent from the server.

[Traditional back end routing (Slides 1-6)](https://docs.google.com/presentation/d/13D2ZFBXaW-sh_02M6B4qCtm8hA7ULDJVaAsbVacPleo/edit?usp=sharing)

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

But React bundles everything together in a Single Page App represented by a single HTML page, so this doesn't quite work. This is one reason why we might want to create some kind of **client side routing** system. What does this mean?

### Client Side Routing

React Router is a React compatible library that enables **client side routing**. This means firstly that your React app is aware of and can adapt to the current URL. It is more than this however.

If we click a link on the page served up from `/` with traditional server-side routing, any link we click on, whether it is absolute (http://www.google.com) or relative to our own backend (`/about`) we will need to make a full roundtrip back to the server just to get the same React app. **Client side routing** aims to fix this issue by allowing our React app to pay attention to the URL and simple render the right Component in response, without having to make a new backend request at all. It's less noticable when developing locally, but this means your app can immediately render some new UI without making any new requests. This enables faster user experiences because the browser doesn't need to request an entirely new document or re-evaluate CSS and JavaScript assets for the next page.

This is all veyr abstract right now so let's implement it.

### Setup, Scaffolding and Simple Routes

First let's create a new project and install dependencies

```sh
npm create vite@latest react-router-example # select React, JavaScript
cd react-router-example
npm install # install regular dependencies
npm install --save axios react-router-dom # install new dependencies
npm run dev
```

> You can delete `App.jsx` and any other files within `src` besides for `main.jsx` as we won't be using them.

Next, let's create a `<RouterProvider />` component and pass it a Router object. We want to do this in two seperate files like so:

1) Update `main.jsx` to replace `<App />` as the top level component with `<RouterProvider />`

```js
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from "react-router-dom";
import router from './router';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
```

2. Create a file called `router.jsx` at the same level as `main.jsx`

```js
import { createBrowserRouter } from "react-router-dom";
import HomePage from "./components/HomePage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
    },
]);

export default router;
```

3) Create a new folder `components` and a file called `HomePage.jsx` defining our (basic) `<HomePage />` component

```js
export default function HomePage() {
    return <h1>Home Page</h1>
}
```

So what we have done is make `<RouteProvider />` the root component of our app, and then within `router.jsx` we define the object that defined our front end routing logic, using a `react-router-dom` library function called `createBrowserRouter`;

`createBrowserRouter` takes an array of Routes, the full API of which can be found [here](https://reactrouter.com/en/main/route/route). At it's most basic though, a Route is defined by:

1) An `element` (read: React Component) that we want to render in asscoiation with ...
2) a `path` i.e. the URL we want to to associate with the Component

All of this together is our scaffolding for doing front end routing with `react-router`. As a result, when we go to `/` (relative to the full url, so if developing locally something like `http://localhost:5176/`) we see the HomePage.

We already had that functionality though right? So let's add a new component (`components/About.jsx`) and another route to `router.js`.

```js
export default function About() {
    return <h1>About Page</h1>
}
```

```js
import { createBrowserRouter } from "react-router-dom";
import HomePage from "./components/HomePage";
import AboutPage from "./components/AboutPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
    },
    {
        path: "/about",
        element: <AboutPage />,
    },
]);

export default router;
```

Now navigate your browser to `/about`, you should see the About Page.

### Frontend vs backend routing

Ok so we defined some routes on the frontend and when we put the url in the browser and hit enter it went to the right page. So what actually happened?

[What just happened? (Slides 1-6)](https://docs.google.com/presentation/d/13D2ZFBXaW-sh_02M6B4qCtm8hA7ULDJVaAsbVacPleo/edit?usp=sharing)

Ok so even if we type `/about` into the URL bar of our browser it will still make a full trip to the backend, grab the exact same HTML/CSS/JS, render the app as if it has never seen it before, and then react-router will recognize the url, match it in the Router, and render the correct page.

This isn't quite what we wanted though, front-end routing was supposed to save us the trouble of refetching all that identical data.

This brings us to the first and most significant distinction between frontend and backend routing, which is: **if you type a url into the browser manually and hit enter, that will always send a request to the backend**. **Always**. This is unavoidable when someone first goes to your site, and it means that whatever routes you want to serve up your frontend in response too need to *also* have a corresponding route, serving up the exact same app.

So then how do we get the sort of front-end routing where we don't make this long unnecessary trip to the backend?

### The `<Link />` component

We do this with another type of Component provided for us by `react-router`: `<Link />`. To demonstrate how to use `<Link />` first let's naively try to do this with the sort of links we already know about, `<a href="/about">About Page</a>`.

Let's modify our HomePage component to contain a link to the AboutPage:

```js
export default function HomePage() {
    return (
        <>
            <h1>Home Page</h1>
            <nav>
                <ul>
                    <li><a href="/about">About</a></li>
                </ul>
            </nav>
        </>
    );
}
```

Now if we click this link what happens? Becuase we are developing locally it happens almost instantaneously, but open the dev console and select Network and you will see - we are still going all the way back to the backend and retrieving the same app again! This doesn't work either!

This is where the `<Link />` component comes in. Update our HomePage once again with the code below:

```js
import { Link } from "react-router-dom";

export default function HomePage() {
    return (
        <>
            <h1>Home Page</h1>
            <nav>
                <ul>
                    <li><Link to="/about">About</Link></li>
                </ul>
            </nav>
        </>
    );
}
```

All we added was the import to `<Link />` and changed the href attribute to a prop called `to`. Otherwise, it looks identical. However if you run this code and click the link (with eyes on the Network tab of the dev console) you will see that we aren't backing a backend call anymore! This approach is truly instantaneous, even in a real world situation. That's because instead of making an unnecessary call to the backend, `react-router` is informed of the url change and simply renders the right component in response.

### Frontend vs backend routing pt 2

The difference between frontend (client side) vs backend (server side) routing is often a major sticking point for students so we want to address this as direcrtly as we can.

The important point is **they are not exclusive, you can and will use both**. As a result understanding when each comes into play is essential.

First, backend. If you type something into a URL bar and hit enter (the first step of visiting a new site) this will always go to the backend, and naturally the backend needs to serve up something in response. So on the backend, we want all of our routes to serve up the same React app, so in Django that would look like:

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
def react_app(request):
        return render(request, 'index.html', {})
```

We might even want to set it up so that we serve up the react app in all cases but an `/api/*` url

```py
from django.urls import path
from . import views

urlpatterns = [  
    path(r'^api/', include('api.urls')),     # /api/*   api urls
    url(r'^', views.react_app),              # /*       serve the React app 
]
```

This means that if someone types `/` or `/about` (or even a invalid route like `/doesnt-exist`) we will serve up the React app, because all of these route are valid URLs someone could put in a browser.

Once that HTML page is received, our front-end routing will kick in, and if the url matches a Component as defined in `router.jsx` we will see the right page. 

At that point, given that the app is currently being rendered on the client side, any future changes ot the URL that happen through the `<Link />` component will not have to fetch the backend but will just be able to render it locally by switching to a different component.

The important point to remember is that both your backend and frontend need to account for all the URLs in which you want to serve up the React app, and then frontend routing will determine which Component is rendered as a result.

### Parameterized routes

Something we have in backend routing that we have yet to see on the frontend is parameterized routes, ie urls that look like `/users/44/posts/20`. We get this feature with `react-router` as well though. Let's make a new route and component. First, the new route:

```js
import { createBrowserRouter } from "react-router-dom";
import HomePage from "./components/HomePage";
import AboutPage from "./components/AboutPage";
import PokeViewer from "./components/PokeViewer";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
    },
    {
        path: "/about",
        element: <AboutPage />,
    },
        {
        path: "/pokemon/:pokeId",
        element: <PokeViewer />,
    },
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

`react-router` provided it's own hook called `useParams` that allows us to grad the params off the route!












