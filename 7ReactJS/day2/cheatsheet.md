# `useState` and `useContext` Cheatsheet

## `useState`

### use `useState` to create React-aware variables

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

### use `useState` to create a 'controlled' component

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

### `useContext`

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
