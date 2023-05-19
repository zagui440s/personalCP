# Async in JS + React

## Topics Covered
- Async in vanilla JS
    - Core understanding, callbacks as original method
    - upgrading from callback to Promises (making our own Promise)
    - Axios for making backend calls (promise based api)
    - How to correctly chain Promises (also Promise.all, Promise.allSettled)
    - upgrading from Promises to Async/Await (syntax sugar)
- Async in modern React
    - UseEffect for calling APIs from React
    - the specifics of useEffect's dependency list
    - rare but need to know: useEffect cleanup functions
- Video store features pt 3:
    - Use the [OMDb API](https://www.omdbapi.com/) (open source movie info api)
    - Use this API key: 7f539340 ([get own api key here](https://www.omdbapi.com/apikey.aspx))
    - Example query: GET http://www.omdbapi.com/?i=tt3896198&apikey=7f539340 => JSON
- Assignment
    - Build day 3 features

## Lesson

### Async in vanilla JS

For the first part of this class, we want to forget about React for a bit and just try out async in JS to get a sense of how it works.

Async is an idea that is baked in pretty deeply into JS (unlike Python) and so understanding it's behavior is key to understanding any future idea based on it, like Promises. We can use Node locall on our own computer to begin with in order to see how JS does async and see how built in libraries like `fs` use it. 

But first - **what is `async`?**

#### Async, core understanding

First, there are two types of code in JS: sync (or synchronous) and async (asynchronous).

Synchronous means the execution of the entire program *does not continue until the current statement is **completely finished***

Asynchronous means the execution of the entire program *continues as soon as the current statement has **begun execution***

This distinction is easier to see with an example:

> Unless the code requires a Node/browser specific library, you can use the visualizer here: https://www.jsv9000.app/ to see a visual representation of your code executing.

```js
function doSomething(x, y) {
    const result = x + y*2;
    console.log(`The result is ${result}`);
}

doSomething(1, 2);
doSomething(4, 5);
```

Purely synchronous, only uses the Call Stack. Our logic goes like so:

1) program is run, begins executing code line by line
2) encounter `doSomething` function definition and define it in memory, without executing it
3) encounter first call to `doSomething`, add it to the Call Stack.
4) `doSomething(1, 2)` executes until it is done, which includes printing to the console
5) return to program execution where left off, encoutner second call to `doSomething`
6) `doSomething(4, 5)` executes until it is done, which includes printing to the console
7) entire program execution is done and program terminates

Everything you have seen in JS up until now is synchronously executing code that follows the standard rules of top-to-bottom execution. 

JS has some special functions that behave differently however, such as `setTimeout`. `setTimeout` let's the programmer schedule some task to be executed *later*, based on a timer.

```js
function sayMyName(name) {
    console.log(`Name is: ${name}`);
}

setTimeout(() => sayMyName('A'), 2000);
```

What happens here? (Hint: use https://www.jsv9000.app/ to visualize)

1) program is run, begins executing code line by line
2) encounter `sayMyName` function definition and define it in memory, without executing it
3) Encounter call to `setTimeout`. `setTimeout` is special, it doesn't get added to the Call Stack, rather, it gets added to a seperate list called the Event Queue (or Task Queue) with a little timer set for 2000 ms
4) Entire program execution is done at this point, but program will not exit until the Event Queue is empty.
5) After 2000 ms the function provided as the first argument of setTimeout is called, so `sayMyName('A')` is dequeued from the Event Queue and added to the Call Stack, as if it were just called like normal (albeit its 2 seconds later now)
6) `sayMyName('A')` executes until it is done, and it is popped off the Call Stack
7) with both the call stack and event queue empty, the program finally exits

This is the essential difference between async/sync, whether the associated function gets executed right away (Call Stack) or is added to the Event Queue to get executed later (there can be other triggers besides a timer)

The reason we have been so pedantic about the steps so far though is because this can get tricky when both types of code are present, like so:

```js
function sayMyName(name) {
    console.log(`Name is: ${name}`);
}

sayMyName('A');

setTimeout(() => sayMyName('B'), 2000);

sayMyName('C');
```

The answer is below but as an ecersize let's try to guess the order of execution:

1)
2)
3) ...


> Answer
> 1) program is run, begins executing code line by line
> 2) encounter `sayMyName` function definition and define it in memory, without executing it
> 3) Encounter `sayMyName('A')`, added to Call Stack, executes immediately (sync)
> 4) Encounter call to `setTimeout`. `setTimeout` is async, so it's added to the Event Queue with a little timer set for 2000 ms
> 5) Encounter `sayMyName('C')`, added to Call Stack, executes immediately (sync)
> 6) Entire program execution is done at this point, but program will not exit until the Event Queue is empty.
> 7) After 2000 ms the function provided as the first argument of setTimeout is called, so `sayMyName('B')` is dequeued from the Event Queue and added to the Call Stack
> 8) `sayMyName('B')` executes until it is done, and it is popped off the Call Stack
> 9) with both the call stack and event queue empty, the program finally exits

Here is an important caveat however: the timer is not the significant bit, that is just to determine the order in which multiple functions on the Event Queue resolve. Sync always takes precendence, and Event Queue isn't considered until there is no more sync code to run.

```js
function sayMyName(name) {
    console.log(`Name is: ${name}`);
}

sayMyName('A');

setTimeout(() => sayMyName('B'), 2000);

setTimeout(() => sayMyName('C'), 0);

sayMyName('D');
```

What do we think the correct execution/output order is? We set `sayMyName('C')` to run after 0 ms, but does that mean immediately?

> Answer
> 'A' executes because sync
> 'B' is added to Event Queue, at 2000ms
> 'C' is added to Event Queue, at 0ms
> 'D' executes because sync
> Sync is done, start dequeuing from Event Queue
> 'C' is top of queue because it was ready first (according to timer), so 'C' executes
> 'D' will execute as soon as it's 2 seconds are up (which began once added to Event Queue) and it is next up (determined by order of execution + timers)

This entire process by which events can be registered to execute at a later point is known as **The Event Loop** in JS. It is more complex than Python in that Python is always synchronous, and it can be hard to reason about async code. But there is a strong benefit that makes it a perfect fit for front end web dev.

Imagine someone scrolls through the page, we would want this to execute immediately right? Otherwise there would be a visual lag.

Now imagine someone clicks on a button on the page, and this triggers a call to a backend, which takes 2 minutes to return. Now if that backend call was sync, assuming a single thread (JS is single threaded) could the user scroll through the page in the meantime? NO! Sync means we aren't done until we finished executing the most recent action. Without async websites would essentially freeze while waiting for some real time task to complete. That is a somewhat reasonable approach on one's own computer (and the reason why some 'expensive' tasks end up with a spinning wheel - wait this is taking awhile!) but for talking to other computers over the internet the time to wait becomes too long to be frozen for. So the solution is to set off that backend call, add some logic to the Event Loop to react when it resolves, and then immediately go back to executing whatever the next sync task is.

This is tricky stuff, it takes a while to learn how to predict execution order, but for now let's build up in our abstractions around how to work with async, and then we will eventually tie it into React.

### Callbacks

We have actually already encountered this with `setTimeout`. a `callback` is any function provided to an async function that will *eventually* get run. Why a `callback`? It's the simplest way to provide some code without executing it immediately. So in code this looks like:

```js
function sayMyName(name) {
    console.log(`Name is: ${name}`);
}

setTimeout(() => sayMyName('A'), 2000);
```

1) `() => sayMyName('A')` get added to the Event Queue with a timer of 2 seconds
2) After 2s we add this function to the Call Stack
3) We kick off this 'wrapped' function by calling it with an empty args list.

Callbacks are the original way we work with async, which Node uses heavily with its filesystem tasks to ensure they are non-blocking in the case of large files.

```js
const fs = require('fs');
// First I want to read the file
fs.readFile('./file.txt', (err, data) => {
    // node convention to inform callback fn of error, such as if `./file.txt` doesn't exist
    if (err) {
        throw err;
    }
    // Invoke the next step here however you like
    console.log(data);
});
console.log("hello world");
```

Because `fs.readFile` is async it will add the callback to the Event Queue, continue execution (logging 'hello world') and then when there are no sync tasks left and the file has finished loading into memory the callback executes, with the correct inputs provided for `err` and `data`.

This works fine for a bit, but doesn't scale well. The main reason for this is async code tends to chain poorly and become hard to read top-to-bottom like sync code can be read. This leads to an issue known as 'callback hell'. Imagine we wanted to do something complex like read a directory, grab all of it's files, update the contents of every file slightly, and then write the new content to a new filepath. With callbacks that would look like:

```js
fs.readdir(source, function (err, files) {
  if (err) {
    console.error(`failed to read dir: ${source}`);
    throw err;
  } else {
    files.forEach((filename, fileIndex) => {
      const filepath = `${source}/${filename}`;
      fs.readFile(filepath, function (err, contents) {
        if (err) {
            console.error(`failed to read file: ${filepath}`);
            throw err;
        } else {
            const newfilepath = `${source}/new_${filename}`;
          const newContent = contents + `\nadding a new last line to ${newfilepath}`;
          fs.writeFile(newfilepath, newContent, (err) => {
            console.error(`failed to write file: ${newfilepath}`);
            throw err;
          });
        }
      })
    })
  }
})
```

The telltale sign of callback hell is the 'sideways pyramid of doom' - basically we are nesting too much and in a way that isn't easy to parse with our eyes. The essential problems are:

1) chaining a callback in response to a callback requires another level of nesting
2) error handing is awkward and handled at each level of nesting
3) hard to follow what is sync vs async and what actual execution order is.

Callbacks are hard enough to work with that eventually a standardized approach was arrived at, using a new idea called a *Promise* object.

### Promises

`Promises` aim to solve all the issues with callbacks with a specific API. Usually you will not define your own Promises, but it's worth seeing how to do so to understand how they work.

This is a promise that will resolve or reject with a certain payload after 2 seconds

```js
const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        if (Math.random() <= 0.5) {
            resolve({ msg: "Success", data: "good job!" });
        } else {
            reject({ msg: "Error", error: "something went wrong :(" });
        }
    }, 2000);
});
```

Essentially, a Promise is a specific type of object that takes a single parameter, a function that itself takes two parameters, themselves also functions, called resolve and reject. The promise begins in the state 'pending' and irrevocably moves to either the 'resolved' or 'rejected' state based on which one of those functions is called, along with a 'payload' of some data or alternatively error info.

![promises](/page-resources/promises.webp)

While you arent usually making your own promises, the value is in the API that allows you to work with Promises, `.then` and `.catch` (as well as `.finally`):

```js
myPromise
    .then(data => {
        console.log(`Promises resolved with payload data ${data}`);
    })
    .catch(error => {
        console.error(`Promises rejected with error ${error}`);
    })
    .finally(() => {
        console.log("Either way .finally always run, regardless of resolved or rejected status");
    });
```

When we write this, it doesn't actually happen synchronously, these `.then` and `.catch` clauses inform the promise how to react when moving from pending to either resolved or rejected, but when that happens is determined by the logic of the Promise itself. So, moving back to our filesystem example:

```js
// Node's fs library now supports a promises version
const fs = require('fs').promises;


// read file now returns a Promise, no need for a callback
fs.readFile('./file.txt')
    // success case is handled in .then
    .then(data => console.log(data))
    // faliure case is handled in .catch
    .catch(err => throw err);
});
```

Much neater!

### Axios and Promises

`Axios` is a JS library for making backend calls that uses Promises. An example would be:

```js
const axios = require('axios');
// Make a request to a given url
axios.get('/user?ID=12345')
  // 200-level successful return case
  .then(response => {
    console.log(response.data.user); // depends on what is returned
  })
  // all other non-success cases
  .catch(error => {
    console.error(error);
  });
```

So the axios.get call returns a Promise, which is originally pending.
We then add the .then and .catch clauses to inform the promise how to react for either resolution state.
When a response is received axios internally calls resolve or reject to send it towards one or the other path.

Let's try this with a real world example using the API at https://www.omdbapi.com/ our video rental app will rely on for now.

```js
axios.get('https://www.omdbapi.com/?i=tt3896198&apikey=7f539340')
    .then(response => {
        const { Director, Title } = response.data;
        console.log(`${Title} was directed by ${Director}`);
    })
    .catch(error => console.error(error));
```

Cool, we are getting the hang of promises, but a lot of their improvement on Callbacks is due to how they chain effectively. Let's see that:

### Promise chaining and other Promise methods

Often when you make a backend call, it isn't one and done. Instead, you make a backend call, and then in response make another. I can't find a good example with omdb api so let's use https://pokeapi.co/

```js
const axios = require('axios');
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("name a pokemon: ", (searchTerm) => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`)
        .then(response => {
            const name = response.data.forms[0].name;
            const type = response.data.types[0].type;
            console.log(`The pokemon ${name} has a primary type of ${type.name}`);

            axios.get(type.url)
                .then(response => {
                    const otherPokemon = response.data.pokemon.slice(0, 10);
                    const otherPokemonByName = otherPokemon.map(entry => entry.pokemon.name);
                    console.log(`Other ${type.name} type pokemon include:`);
                    otherPokemonByName.forEach(name => console.log(name));
                })
                .catch(error => console.error(error));
        })
        .catch(error => console.error(error))
        .finally(() => rl.close());
});
```

This works, but isn't ideal. Like the Callback example, we have to catch errors at each level and every time we 'chain' a call (in response to the result of a promise kick off a different promise) we have to nest another level. The Promise API actually handles that elegantly like so:

```js
const axios = require('axios');
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("name a pokemon: ", (searchTerm) => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`)
        .then(response => {
            const name = response.data.forms[0].name;
            const type = response.data.types[0].type;
            console.log(`The pokemon ${name} has a primary type of ${type.name}`);

            // return the next Promise you want to kick off
            return axios.get(type.url);
        })
        // the next .then is now a response to that returned promise resolving
        .then(response => {
            const otherPokemon = response.data.pokemon.slice(0, 10);
            const otherPokemonByName = otherPokemon.map(entry => entry.pokemon.name);
            console.log(`Other ${response.data.name} type pokemon include:`);
            otherPokemonByName.forEach(name => console.log(name));
        })
        // .catch is collating, so a rejected state for either Promise ends up here
        .catch(error => console.error(error))
        .finally(() => rl.close());
});
```

Now we never need to nest again, and have an error handler that catches all errors our chain could produce.

### Promise.all, Promise.allSettled

There is one other aspect of the Promise api you should know about. Just like you can call new Promise to make your own Promise, the Promise class has some helper functions built-in.

`Promise.all` let's you kick off multiple Promises simultaneously which can return in any order

```js
const axios = require('axios');

const pikachu = axios.get(`https://pokeapi.co/api/v2/pokemon/pikachu`);
const squirtle = axios.get(`https://pokeapi.co/api/v2/pokemon/squirtle`);

const getNameAndMoves = (pokemon) => {
    const moves = pokemon.moves.slice(0, 10).map(elem => elem.move.name);
    return { name: pokemon.name, moves };
};

Promise.all([pikachu, squirtle])
    .then(responses => {
        const pikachuData = getNameAndMoves(responses[0].data);
        const squitleData = getNameAndMoves(responses[1].data);

        console.log(`${pikachuData.name} has moves: ${pikachuData.moves.join(', ')}`);
        console.log(`${squitleData.name} has moves: ${squitleData.moves.join(', ')}`);
    })
    .catch(err => console.error(err));
```

However `Promise.all` will **reject the entire Promise if any sub-Promise fails**.

Most of the time this isn't what you want, so there is `Promise.allSettled`

```js
const axios = require('axios');

const pikachu = axios.get(`https://pokeapi.co/api/v2/pokemon/pikachu`);
const squirtle = axios.get(`https://pokeapi.co/api/v2/pokemon/squirtle`);
const broken = axios.get(`https://sdadasdasdasd`); // not a real link, will definitely fail


const getNameAndMoves = (pokemon) => {
    const moves = pokemon.moves.slice(0, 10).map(elem => elem.move.name);
    return { name: pokemon.name, moves };
};

Promise.all([pikachu, squirtle, broken])
    .then(responses => {
        const pikachuData = getNameAndMoves(responses[0].data);
        const squitleData = getNameAndMoves(responses[1].data);

        console.log(`${pikachuData.name} has moves: ${pikachuData.moves.join(', ')}`);
        console.log(`${squitleData.name} has moves: ${squitleData.moves.join(', ')}`);
    })
    .catch(err => console.error(`Call to ${err.config.url} failed with error code ${err.code}`));

Promise.allSettled([pikachu, squirtle, broken])
    .then(responses => {
        for (const response of responses) {
            if (response.status === 'fulfilled') {
                const pokeData = getNameAndMoves(response.value.data);
                console.log(`${pokeData.name} has moves: ${pokeData.moves.join(', ')}`);
            } else if (response.status === 'rejected') {
                console.error(`Call to ${response.reason.config.url} failed with error code ${response.reason.code}`);
            }
        }
    });
```

With `Promises.all` the entire thing fails whereas with `Promise.allSettled` you can handle rejections on a cases by case basis within the body ofthe `.then`

### Async/Await

You have likely seen the async/await syntax by now. It is simply syntax sugar for Promises. It's important you understand Promises before becoming reliant on async/await because it is still Promises under the hood.

```js
const axios = require('axios');
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const getPokemonAndRelatedByType = async (searchTerm) => {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`);
    const name = response.data.forms[0].name;
    const type = response.data.types[0].type;
    console.log(`The pokemon ${name} has a primary type of ${type.name}`);

    const typeResponse = await axios.get(type.url);
    const otherPokemon = typeResponse.data.pokemon.slice(0, 10);
    const otherPokemonByName = otherPokemon.map(entry => entry.pokemon.name);
    console.log(`Other ${type.name} type pokemon include:`);
    otherPokemonByName.forEach(name => console.log(name));
}

rl.question("name a pokemon: ", (searchTerm) => {
    try {
        getPokemonAndRelatedByType(searchTerm);
    } catch (error) {
        console.error(error);
    } finally {
        rl.close();
    }
});
```

With `async/await` we get nothing new but it can be easier to read async code top to bottom as if it was sync.

The `await` keyword is used to 'pause' execution until the Promise settles, in a non-blocking way

The `async` keyword needs to be attached to any function that wants to use `await`

Chaining promises can look more natural with this approach

To the degree error handling or `.finally` is desired, it can be replaced with a try/catch block

### Async in React

Whew! That was a deep dive into async JS, but how does this relate to React. As a frontend framework, React expects you want to make backend calls, and you accomplish this in modern React with the `useEffect` hook.

```jsx
import { useState, useEffect } from "react";
import axios from "axios";

export default function PokeViewer({ name }) {
    // first create some placeholder state
    const [pokeImgUrls, setPokeImgUrls] = useState([]);

    // This will run *after* each render
    // first arg is callback function
    // second arg is dependency list
    // If empty means 'just once after first render'.
    // If left out means 'after every render' (usually not what you want, easy to become infinite loop)
    useEffect(() => {
        // do async logic here
        axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
            .then(response => {
                const sprites = response.data.sprites;
                const spriteUrls = Object.values(sprites).filter(sprite => typeof sprite === "string");
                setPokeImgUrls(spriteUrls);
            });
    }, []);

    return (
        <>
            <h2>{name}</h2>
            <div>
                {pokeImgUrls.length > 0 ? (
                    <div>
                        {pokeImgUrls.map((url, index) => (
                            <img key={index} src={url} />
                        ))}
                    </div>
                ) : (
                    <div>Loading...</div>
                )}
            </div>
        </>
    );
}
```

- `useEffect` will run *after* the a given render
- `useEffect` takes a *depenedency list*. Anytime anything in the dependency list changes, it triggers the callback to be re-run
- An empty dependency list means 'only run after the first render'
- An undefined dependency list means 'run after every render' (careful with this!)
- `useEffect` body will often call `set<Var>` from `useState` in order to trigger a rerender once data is received

### `useEffect` cleanup function

We won't see this ourselves likely but sometimes the callback to `useEffect` requires a 'cleanup function'. You can read more about that [here](https://react.dev/reference/react/useEffect#useeffect)

### Video Store pt 3

For video store today we will use the OMDB api to pull data in from an api instead of using a local .json file

## Assignments

As for all of the react lectures the assignment for today is to build out the video store using the OMDB api (starting point is yesterday or the canonical solution in demos-and-notes/w8d2) or alternatively to build out the website design of your choice using a public api of your choice.

> Note: when choosing an api just look for free one's that are simple to integrate with for the sake of learning. Most Google APIs for example require a fancy form of authentication that can take a week to get set up, so choose something like pokeAPI or OMDB or Github's api (there are many others)