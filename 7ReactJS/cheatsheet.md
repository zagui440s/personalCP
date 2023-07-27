# React Cheatsheet

## Vite

### Create a new project

1. Create a new vite project with the wizard

```sh
npm create vite
```

2. Create a new vite project without selecting any options

```sh
npm create vite <my-react-app> -- --template react
```

> Read `<my-react-app>` as a placeholder, so it could be replaced with your own choice like:
>
> ```sh
> npm create vite my-project-name
> ```
>
> or alternatively if you need whitespace:
>
> ```sh
> npm create vite "My Project Name"
> ```

### `npm` commands

1. Install exisiting dependencies from `package.json`

```sh
npm install
```

Shorthand form is:

```sh
npm i
```

2. Add a new dependency and save to `package.json`

```sh
npm install --save <package-name>
```

Can also install more than one package at a time:

```sh
npm install --save <package-1> <package-2> <package-3>
```

Anything installed this way will be kept track of within `package.json` under the section `"dependencies"`.

3. Add a new development-environment-only dependency and save to `package.json`

```sh
npm install --save-dev <package-name>
```

Anything installed this way will be kept track of within `package.json` under the section `"devDependencies"`.

> The difference between dependencies and devDependencies is not super relevant in the learning stage, but the difference is:
>
> **dependencies**: packages needed for the actual app to run that will be bundled up with your own source code when it is 'built' (`npm run build`). Example: `react`
>
> **devDependencies**: packages only needed for the development environment but not bundled with your source code when built. Example: `vite`

4. Run an arbitrary script with `npm`

```sh
npm run <script-name>
```

`<script-name>` will accord to a named command within `package.json` in the `scripts` section.

5. Running the development server for a `vite` project

```sh
npm run dev
```

This will serve your source code on a specific port, default: `http://localhost:5173/`

6. Building a `vite` project for production

```sh
npm run build
```

This will bundle up your app and minify the output into a folder called `dist`.

7. Previewing the built `vite` project

```sh
npm run preview
```

This will serve the code in `dist` on a specific port, default: `http://localhost:4173/`

## Essential React

1. Bootstrapping React

   - `index.html` is the entry to the app

   - `src/main.jsx` is where React is linked to the `index.html` through the `#root` element

   - `src/App.jsx` is the root of your React project

2. Defining and exporting a component

```js
// src/components/MyComponent.jsx

export default function MyComponent() {
  return <h1>I am jsx</h1>;
}
```

3. Importing and refererncing a component

```js
// src/App.jsx

import MyComponent from "./components/MyComponent";

export default function App() {
  return <MyComponent />;
}
```

4. Returning multiple components at the same level using Fragments (`<>`)

```js
export default function MyComponent() {
  return (
    <>
      <h1>I am a header1</h1>
      <h2>I am a header2</h2>
      <h3>I am a header3</h3>
    </>
  );
}
```

5. Passing in and using `props`

```js
import ChildComponent from "./ChildComponent";

export default function ParentComponent() {
  return (
    <>
      <ChildComponent name="Ben" age={35} />
      <ChildComponent name="Francisco" age={Infinity} />
    </>
  );
}
```

```js
export default function ChildComponent(props) {
  const { name, age } = props;

  return (
    <h1>
      My name is {name} and I am <pre>{age}</pre> years young
    </h1>
  );
}
```

6. Using `props.children`

```js
import ChildComponent from "./ChildComponent";

export default function ParentComponent() {
  return (
    <ChildComponent name="Ben">
      <h2>body of component</h2>
    </ChildComponent>
  );
}
```

```js
export default function ChildComponent(props) {
  return (
    <>
      <h1>My name is {props.name}</h1>
      {props.children}
    </>
  );
}
```

7. Reference a css class (or multiple) with `className`

```css
/* index.css */

.my-header {
  background-color: red;
}

.my-section {
  background-color: blue;
}

.another-class {
  color: magenta;
}
```

```js
import "./index.css";

export default function MyComponent() {
  return (
    <>
        <h1 className="my-header">
        <section className="my-section another-class">
            <h2>content</h2>
        </section>
    </>
  );
}
```

8. Reference an event-based (callback) function with `onClick`

```js
export default function MyComponent() {
  const onClickHandler = (event) => {
    console.log(event.target.value);
    event.target.value = "";
  };

  return (
    <div>
      <input type="text" />
      <button onClick={onClickHandler}>Click me!</button>
    </div>
  );
}
```

9. Conditional rendering with `&&` or ternary operator

If you only want to render something if a succesful condition is met:

```js
export default function UserProfile(props) {
  const isAdult = props.age >= 18;

  return (
    <>
      {isAdult && (
        <div>
          <h1>If this renders you must be at least 18!</h1>
        </div>
      )}
    </>
  );
}
```

If you want to render something different on condition met or failed:

```js
export default function UserProfile(props) {
  const isAdult = props.age >= 18;

  return (
    <div>
      {isAdult ? (
        <h1>If this renders you must be at least 18!</h1>
      ) : (
        <h1>You can't even vote!</h1>
      )}
    </div>
  );
}
```

10. Interpolating a list in React

```js
export default function MyList() {
  const names = ["David", "Hilary", "Pikachu"];

  return (
    <div>
      <ul>
        {names.map((name, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>
    </div>
  );
}
```

## `useState`

### `useState` to create React-aware variables

```js
import { useState } from "react";

export default function Checkbox() {
  const [checked, setChecked] = useState(false);

  const onChangeCallback = (event) => {
    setChecked(!checked);
  };

  return (
    <>
      <input type="checkbox" checked={checked} onChange={onChangeCallback} />
      <pre>Checked status: {checked ? "checked" : "unchecked"}</pre>
    </>
  );
}
```

### `useState` to create a 'controlled' component

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

### `useState` with arrays

```js
import { useState } from "react";

export default function NameList() {
  const [names, setNames] = useState(["Ben", "Francisco"]);
  const [inputText, setInputText] = useState("");

  const addNameHandler = () => {
    // add the name to the list
    const updatedNames = [...names, inputText];
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

### `useState` with objects

```js
import { useState } from "react";

export default function UpdateObject() {
  const [video, setVideo] = useState({
    title: "The Big Lebowski",
    rating: "PG-13",
  });
  const [inputText, setInputText] = useState("");

  const updateTitleHandler = () => {
    // create a new video object by spreading the original
    const updatedVideo = {
      ...video,
      // and overwriting any key/value pairs you want to update
      title: inputText,
    };

    setVideo(updatedVideo);
    // reset the input
    setInputText("");
  };

  return (
    <>
      <div>
        <h1>Title {video.title}</h1>
        <h2>Rating {video.rating}</h2>
      </div>
      <div>
        <input
          type="text"
          value={inputText}
          onChange={(event) => setInputText(event.target.value)}
        />
        <button onClick={updateTitleHandler}>Update Title</button>
      </div>
    </>
  );
}
```

## `useContext`

1. Create the context in it's own file:

```js
// in src/contexts/CheckboxContext.jsx

import { createContext } from "react";

const CheckboxContext = createContext(null);

export default CheckboxContext;
```

2. Set the values of the context with `<MyContext>.Provider`

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

3. use `useContext` and reference the desired Context on any component that wants to use that data

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

## Promises

### Create a request with `axios`

```js
axios.get("https://pokeapi.co/api/v2/pokemon/pikachu");
```

### Handle the response with `.then`

```js
axios.get("https://pokeapi.co/api/v2/pokemon/pikachu").then((response) => {
  console.log(response.data);
});
```

### Handle an error with `.catch`

```js
axios
  .get("https://pokeapi.co/api/v2/pokemon/doesntexist")
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error(error);
  });
```

### a full Promise example with chaining and `.finally`

```js
axios
  .get("https://pokeapi.co/api/v2/pokemon/pikachu")
  .then((response) => {
    const firstMove = response.data.moves[0];

    return axios.get(firstMove.move.url);
  })
  .then((response) => {
    console.log(
      `Pikachu's move ${response.data.name} has an accuracy of ${response.data.accuracy}`
    );
  })
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    console.log("this happens even if there was an error");
  });
```

## `useEffect`

### `useEffect` that triggers only once after the first render

```js
useEffect(() => {
    ...
  }
}, []);
```

### `useEffect` that triggers after every render (you probably don't want this)

```js
useEffect(() => {
    ...
  }
}); // note there is no second argument
```

### `useEffect` that triggers whenever a variable changes

```js
const [name, setName] = useState("");

useEffect(() => {
    // guard statement to avoid first render
    if (name.length > 0) {
      ...
    }
  }
}, [name]);

// will trigger another call to useEffect whenever name changes
setName("Pikachu");
setName("Squirtle");
```

### `useEffect` and loading example

```js
import { useState, useEffect } from "react";
import axios from "axios";

export default function MyComponent() {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://pokeapi.co/api/v2/pokemon/pikachu")
      .then((response) => {
        setName(response.data.name);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return <>{loading ? <pre>Loading...</pre> : <h2>{name}</h2>}</>;
}
```

### `async/await` and `useEffect`

```js
useEffect(() => {
  // define async function in the body
  async function makeRequest() {
    // use try/catch if you want error/finally handling
    try {
      // await will 'pause' execution and then it can be saved
      // into a variable and worked with
      const response = await axios.get(
        "https://pokeapi.co/api/v2/pokemon/pikachu"
      );
      console.log(response.data);
    } catch (error) {
      console.error(error.message);
    } finally {
      console.log("this happens even if there was an error");
    }
  }

  // call async function at the bottom
  makeRequest();
}, []);
```

## `react-router`

### Install as a dependency

```sh
npm install --save react-router-dom
```

### Define a BrowserRouter object and export it (`router.jsx`)

```js
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./components/HomePage";
import AboutPage from "./components/AboutPage";
import ContactUsPage from "./components/ContactUsPage";

const router = createBrowserRouter([
  {
    // matches "/*"
    path: "/",
    element: <App />,
    children: [
      {
        // matches "/" exactly
        index: true,
        element: <HomePage />,
      },
      {
        // matches "/about" exactly
        path: "about",
        element: <AboutPage />,
      },
      {
        // matches "/contact-us" exactly
        path: "contact-us",
        element: <ContactUsPage />,
      },
    ],
  },
]);

export default router;
```

### Provide BrowserRouter object to entire project using `<RouterProvider>` at top level (`main.jsx`)

```js
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
```

### Creating `react-router`-aware links using `<Link />`

```js
import { Link } from "react-router-dom";

export default function App() {
  return (
    <nav>
      <ul>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact-us">Contact us</Link>
      </ul>
    </nav>
  );
}
```

### Referncing sub-routes (`"children"`) with `<Outlet />`

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

`<Outlet />` will be replaced with whatever the associated subroute is in `router.jsx`

### Handling 404s client side with `"errorElement"`

```js
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./components/HomePage";
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
    ],
    errorElement: <Error404Page />,
  },
]);

export default router;
```

### Parameterized Routes adn `useParams`

```js
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import UserPage from "./components/UserPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "users/:userId",
        element: <UserPage />,
      },
    ],
  },
]);

export default router;
```

```js
import { useParams } from "react-router-dom";

export default function UserPage() {
  const { userId } = useParams();

  return <h2>User Page for user with id: {userId}</h2>;
}
```

### Programmatic Redirects and `useNavigate`

```js
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function MyComponent() {
  const navigate = useNavigate();

  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (clicked) {
      navigate("/home");
    }
  }, [clicked]);

  return <button onClick={() => setClicked(true)}>Click me!</button>;
}
```

Note that `useNavigate` is a hook so it must be called at the top level of the component. When called it returns a callback function `navigate` which must be executed within the body of a `useEffect`.

### Passing Data to `<Outlet />` with `useOutletContext`

```js
import { useState } from "react";
import { Outlet } from "react-router-dom";

export default function App() {
  const [data, setData] = useState("");

  return <Outlet context={{ data, setData }} />;
}
```

```js
import { useOutletContext } from "react-router-dom";

export default function MyPage() {
  const { data, setData } = useOutletContext();

  return (
    <>
      <p>{data}</p>
      <input value={data} onChange={(event) => setData(event.target.value)} />
    </>
  );
}
```

### `react-router` loaders

```js
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import UserPage, { userLoader } from "./components/UserPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "users/:userId",
        element: <UserPage />,
        loader: userLoader,
      },
    ],
  },
]);

export default router;
```

```js
import { useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import axios from "axios";

export async function userLoader({ params }) {
  const response = await axios.get(
    `https://my-website.com/api/users/${params.userId}`
  );
  return response.data;

  // assume this returns JSON like
  // {
  //    name: "Ben",
  //    hobbies: [
  //      "Pottery",
  //      "Fall Guys",
  //      "Hiking"
  //    ]
  // }
}

export default function UserPage() {
  const userData = useLoaderData();

  return (
    <>
      <h1>{userData.name}</h1>
      <h2>Hobbies:</h2>
      <ol>
        {userData.hobbies.map((hobby, index) => (
          <li key={index}>{hobby}</li>
        )}
      </ol>
    </>
  );
}
```
