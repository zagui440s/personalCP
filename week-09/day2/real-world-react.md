We have been building up to this but now let's try to build Video Rental (or any site) out a bit further and see what other things might be useful.

react-router is actually quite powerful on its own but we still haven't talked about:

1) serving it up from our own backend

This is the best way to avoid CORS issues, the app is actually served from the same server as the api requests it makes


2) app now integrates with our own api, including POST, PUT, and DELETE

Ultimately the source of truth of any app is on the backend, in the database. We want to see how to doing a full CRUD (Create Read Update Destroy) app with some data and see how we can keep our client side copy of that data in sync.


3) more hooks like 
- useContext to solve the prop-drilling problem
- useMemo for eliminating unnecessary reevaluation on rerender
- useRef for direcrtly manipulating an underlying DOM element
- useReducer if you love a predictable functional style for updating state

4) introduce a component library like MUI 
 
With a component library we can utilize pre-existing, well thought-out generic components (Button, Dropdown, Modal, DataTable, etc). A big part of this is learning to read an API and explore what's possible.

5) propTypes

propTypes are a simple way to get basic typechecking on your Component's props

6) TypeScript

React plays well with TypeScript and it's an even more powerful way to ensure your React code is written correctly. There is incredible value in use a static type system because it nearly guarantees a certain class of bugs will not be a problem (expected an int but got a string for example)