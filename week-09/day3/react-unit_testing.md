# Unit Testing with React + Vitest

In this lesson we will cover how to write unit tests for React.js functions and components with the Vitest testing framework. Before we start the lesson lets talk about what exactly are unit tests. There is three types of tests End-to-End tests which typically utilize puppeteer to open a browser and actively interact with your project as if it was an actual user. Secondly we have Integration tests which test one specific function but only touches both the Front-End and Back-End logic of said function. Lastly we have Unit tests which are our fastest form of test because it only tests one specific function and tests wither it's Front-End or Back-End logic but not both. By the end of this class you'll be able to build Front-End Unit Tests for your React Projects Components, Pages, and Utilities.

## Installing Vitest

Before we go into the meet of testing our React applicaiton we will need to install both `vitest` and `TestRenderer`. To do so run the following commands:

```bash
    npm install vitest
    npm install react-test-renderer
```

Now that we have installed our testing frameworks we can cover some common testing functions, what they do, and how to best utilize them.

- Vitest functions
  - `describe` is a method utilized to write a quick reference as to what is being tested (function, component, page, etc.)
  - `it` is a method to specify the specific element within the function or component is being testes.
  - `expect` is a method utilized to run assertions within our `it` blocks
  - `vi` is a method that gives us access to mock different modules or components within our test.

## Writing our First Test

Lets create a cuntion that will add two numbers together within a `utilities.jsx` file and then write a test for it.

```js
export const addTwoNums = (numOne, numTwo) => {
  try {
    return numOne + numTwo;
  } catch {
    return 0;
  }
};
```

Inside the projects `src` directory create a new directory named `__test__` to store our testing files. Vitest will not recognize any test suites inside of your project unless they follow the naming convention of `{nameOfFile}.test.jsx`. Inside of your `__test__` directory create a file named `firstAttempt.test.jsx`.

```bash
    <root>
        |
        <src>
            |
            <__test__>
                    |
                    <firstAttempt.test.jsx>
```

Open the file and create our first test.

```js
import { describe, it, expect } from "vitest";
import { addTwoNums } from "../utilities.jsx";

// describe what we are testing
describe("addTwoNums()", () => {
  // what are we testing specifically
  it("will return 10 if 4 and 6 are passed as parameters", () => {
    // assign functions return value to a variable
    const resolved = addTwoNums(6, 4);
    // run assertion of expected behavior
    expect(resolved).toBe(10);
  });
});
```

Now that we know how to write test for functions we can move into utilizing TestRenderer to test our components.

## Testing Components or Pages with MemoryRouter

Lets say we have a HomePage.jsx as our index page for our app utilizing BrowserRouter and useLoaderData from 'react-router-dom' and we want to test that the very first child of our parent div is an h1 element labeled 'HOME'.

```js
import { useLoaderData } from "react-router-dom";

export const HomePage = () => {
  const addedNumber = useLoaderData();

  return (
    <div>
      <h1>HOME</h1>
      <p>
        This is my home page and these is my result for my added number
        {addedNumber}
      </p>
    </div>
  );
};
```

Now that we have our HomePage.jsx lets go and write a test for it.

```js
import { describe, it, expect, vi } from "vitest";
import { HomePage } from "../Pages/HomePage";
import { MemoryRouter, useLoaderData } from "react-router-dom";

// describe what we are testing
describe("HomePage.jsx", () => {
  // what are we testing specifically
  it("will have an h1 element with the text of 'HOME' as the first child", () => {
    // There is no dom when we run our tests so we have to mock our useLoaderData function to return a fake value
    // specify what we'd like to mock
    vi.mock("react-router-dom", async () => {
      // we only want to mock a specific part of our router so we can specify here to still utilize the react-router-dom library but fake one element within it.
      const actual = await vi.importActual("react-router-dom");
      return {
        ...actual,
        // you can utilize this function to mock any number of 'react-router-dom' hooks
        useLoaderData: vi.fn(),
      };
    });

    // Now that we are done specifying which portion of 'react-router-dom' we are mocking we can specify it's fake value to run our test.
    useLoaderData.mockReturnValue(10);

    // Finally we can begin rendering our HomePage and turning it into JSON to run our assertions
    const homePage = TestRenderer.create(
      // Again there's no DOM when running tests so 'react-router-dom' gives us a MemoryRouter to utilize for testing purposes. If necessary you can specify what route MemoryRouter should pretend to currently reside at in the initialEntries argument.
      <MemoryRouter initialEntries={["/"]}>
        // If theres a context provider ensure it goes here as a parent of the
        commponent/page
        <HomePage />
      </MemoryRouter>
    ).toJSON();

    // run assertion of expected behavior
    expect(homePage.children[0].children[0]).toBe("HOME");
  });
});
```

## Testing functions expecting promises

The last thing we will cover today is handling unit tests with functions that attemped to utilize `axios`. Lets say we are using the pokeAPI in our program and we create the following function.

```js
import axios from "axios";

const getPokemonData = async () => {
  let response = await axios.get("https://pokeapi.co/api/v2/pokemon/ditto");
  return response.data;
};
```

Simple function that we want to test to ensure it's working properly in our program, but we don't want to actually send the axios request.

```js
import { describe, it, expect, vi } from "vitest";
import { getPokemonData } from "../utilities.jsx";

// describe what we are testing
describe("getPokemonData()", () => {
  // what are we testing specifically
  it("returns an obj with a name, sprites, moves, and type keys", async () => {
    // we don't want to actually send the request so lets mock axios
    vi.mock("axios");
    // specify the mocked value for the specific method
    const data = { name: "squirtle", type: "water", moves: [], sprites: [] };
    axios.get.mockResolvedValue(data);
    const pokemonData = await getPokemonData();

    // run assertion of expected behavior
    expect(pokemonData).toBe(data);
  });
});
```

## Topics Covered

- Types of Testing
- Installing Vitest
- Vitest methods
- Testing utilities in React.js with Vitest
- Testing Pages or Compoents
- Testing utilities handling promises
- Mocking
