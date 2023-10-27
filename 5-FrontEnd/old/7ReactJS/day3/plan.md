# Plan for today

1. demo what we are building towards with PokeSearch

2. using React to utilize a 3rd party API `https://pokeapi.co/api/v2/pokemon/pikachu`. Same thing if you wrote the API yourself, because that's a (RESTful) API, an internet-hosted service that makes data operations (Create-Read-Update-Destroy) accessible by url.

3. `useEffect` as a hook. useEffect to trigger a callback function _after_ render

4. `useEffect` + `useState`. Using `useState` to trigger a rerender, triggering a re-run of the `useEffect`.

5. Dependency List as second argument to `useEffect`. Dependency List let's you control when a `useEffect` triggers.

   - No second arg means _every_ rerender
   - `[]` = only after first rerender
   - `[state]` = anytime `state` variable (from `useState`) is updated (new value)
   - `[state1, state2]` = anytime _any_ of the dependency variables in the list are updated

6. `useEffect` to trigger an API call with `axios`

7. `axios` returns a _`Promise`_ - working with Promises

8. Promises API

   - `.then`
   - `.catch`
   - `.finally`
   - triggering a second Promise from within a `.then`

9. `async/await` syntax for Promises
