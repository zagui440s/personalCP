# async and `useEffect` Cheatsheet

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
