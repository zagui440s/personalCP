# React Essentials Cheatsheet

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
> or alternatively (if you are a glutton for frustration):
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

Can also install more than one package at a time this way, for example:

```sh
npm install --save react react-dom react-router-dom
```

Anything installed this way will be kept track of within `package.json` under the section `"dependencies"`.

3. Add a new development environment only dependency and save to `package.json`

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

## React

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

If you only want to render something if a succesful condition met:

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
