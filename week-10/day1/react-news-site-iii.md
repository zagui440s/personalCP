# News Site III

## Topics Covered / Goals
- Continue to build upon News Site project
- Component Lifecycle
  - Each React component has a lifecycle and understanding the component lifecycle will help you understand the data flow in your app.
  - Lifecycle methods determine what is executed at what time in the component's lifecycle.
  - React hooks (useEffect) are the new way to implement lifecycle methods into functional components.



## Lesson

Today, we're going to be learning the React Component Lifecycle, and to understand this better, we'll first be using class-based components (and then later moving back to functional components) 

**Component Lifecycle**
Let's talk through a concept called the "Component Lifecycle" for React. Below we are start with a component in its natural state:

`App.js`
```javascript
import './App.css';
import { Component } from "react"

class App extends Component {
  // render
  render() {
    return (
      <div className="App">
        <h2>Lifecyle App</h2>
      </div>
    );
  }
}

export default App;
```

Let's add some functionality, and add in a `Something` component that will be created/updated/destroyed inside of our application:

### Component Creation (componenetDidMount())

`App.jsx`
```javascript
import './App.css';
import { Component } from "react"
import Something from './components/Something';

class App extends Component {

  // render
  render() {
    return (
      <div className="App">
        <h2>Lifecycle App</h2>
        <hr />
        <Something />
      </div>
    );
  }
}

export default App;
```

`components/Something.jsx`
```javascript
import { Component } from "react"

class Something extends Component {
  
  // effects
  componentDidMount() {
    console.log("componentDidMount: I AM ALIVE NOW!")
  }

  // render
  render() {
    return (
      <div>
        This is something
      </div>
    )
  }
}

export default Something;
```

> If we check our console in the browser we might notice that the our app logs twice. Our component will only mount once but the `<React.StrictMode />` component in `main.jsx` causes this behavior. `StrictMode` puts additional checks on our application while developing to detect unexpected side effects 
[StrictMode docs](https://reactjs.org/docs/strict-mode.html#detecting-unexpected-side-effects)


### Component Destruction (componentWillUnmount())


`components/Something.jsx`
```javascript
class Something extends Component {
  
  // effects
  componentDidMount() {
    console.log("componentDidMount: I AM ALIVE NOW!")
  }

  componentWillUnmount() {
    console.log("componentWillUnount: I AM DYING NOW!")
  }

  // render
  render() {
    return (
      <div>
        This is something
      </div>
    )
  }
}
```


`App.jsx`
```javascript
class App extends Component {

  state= {
    exists:false,

  }

  // render
  render() {
    return (
      <div className="App">
        <h2>Lifecycle App</h2>
        <hr />
        <button onClick={() => this.setState({exists: true})}>Create</button>
        <button onClick={() => this.setState({exists: false})}>Delete</button>
        
        
        <Something />
      </div>
    );
  }
}

export default App;
```


### Component Update (componentDidUpdate())

`App.js`
```javascript
import './App.css';
import { Component } from "react"
import Something from './components/Something';

class App extends Component {
  // states
  state = {
    exists: false,
    someValue: 0
  }

  // render
  render() {
    return (
      <div className="App">
        <h2>Lifecycle App</h2>
        <hr />
        <button onClick={() => this.setState({exists: true})}>Create</button>
        <button onClick={() => this.setState({exists: false})}>Delete</button>
        <button onClick={() => this.setState({someValue: Math.random() * 100})}>Update</button>

        <hr />
        { this.state.exists && <Something value={this.state.someValue} /> }
      </div>
    );
  }
}

export default App;
```

`components/Something.js`
```javascript
import { Component } from "react"

class Something extends Component {
  
  // effects
  componentDidMount() {
    console.log("componentDidMount: I AM ALIVE NOW!")
  }

  componentWillUnmount() {
    console.log("componentWillUnount: I AM DYING NOW!")
  }

   componentDidUpdate(prevProps, prevState) {
    if (prevProps.value !== this.props.value)
      console.log("componentDidUpdate: I AM UPDATING NOW!")
  }

  // render
  render() {
    return (
      <div>
        The value is { this.props.value }
      </div>
    )
  }
}

export default Something;
```

We've added in a few common [lifecycle methods](https://reactjs.org/docs/react-component.html#the-component-lifecycle) that comes built into React Components. These lifecycle methods basically allow you to hook into a component at that specific point in their "life" to achieve various things. Keep in mind that these methods are only available for class-based components!

Here's a visual diagram of many of the lifecycles methods that can exist in a class-based component:
<img src="../../page-resources/react_lifecycle.png" width=640>

[Lifecycle method diagram](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/).

The three main lifecycle methods to focus on are:
- `componentDidMount` ...which is called right after a component has been initially rendered to the screen. This method is most commonly used when you want to make an initial call out to your API. 
- `componentDidUpdate` ...which is called right after the component re-renders due to a state or prop value being updated. 
- `componentWillUnmount` ...which is called right before the component is being taken off the screen.

These methods allow us to access the component at various points in its lifecycle. But our focus going forward is going to be functional components, which don't have these lifecycle methods... so how do we accomplish the same capabilities in functional components? The answer: [`useEffect()`](https://reactjs.org/docs/hooks-effect.html). You can think of the `useEffect` Hook as `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount` all combined into one function! Let's take a look at how our previous example would look converted to a functional component:

`components/Something.js`
```javascript
import { useEffect, useRef } from "react"

function Something(props) {
  // refs
  let firstRender = useRef(true)

  // effects
  useEffect(() => { // the ordering of the useEffect matters here, because firstRender.current is set to false in the second useEffect
    if (!firstRender.current) {
      // componentDidUpdate()
      console.log("componentDidUpdate: I AM UPDATING NOW!")
    }
  }, [props.value])
  
  useEffect(() => {
    // componentDidMount
    console.log("componentDidMount: I AM ALIVE NOW!")
    firstRender.current = false
    
    // componentWillUnmount
    return () => console.log("componentWillUnmount: I AM DYING NOW!")
  }, [])

    
  // render
  return (
    <div>
      The value is { props.value }
    </div>
  )
}

export default Something;
```

Another example of `useEffect`:

```javascript
import React, {useState, useEffect} from 'react';
import './App.css';

function App() {
  const [titles, setTitles] = useState(null)
  const [makeAPI, setMakeAPI] = useState(false)

// useEffect is called when the functional component has mounted and when certain state data is updated
  useEffect(() => {
    if (makeAPI) { // the makeAPI state variable is initially FALSE
      getPhotosAPI()
    }
  }, [makeAPI]) // useEffect will only execute again if the makeAPI variable changes

  // getTitles functions sets the makeAPI state variable to TRUE
  const getTitles = () => {
    setMakeAPI(true)
  }

  // Makes a Fetch request to the API and then sets the returned data to state 'titles'
  const getPhotosAPI = async () => {
    let response = await fetch('https://jsonplaceholder.typicode.com/photos')
    let data = await response.json()
    setTitles(data)
  }

  // showTitle function accepts the titles state as an argument and maps through
  const showTitles = (titles) => {
    console.log(titles)
    let articleTitles = []
    titles.map((title, index) => {
      return articleTitles.push(
        <div key={index}>
        <img src={title.thumbnailUrl} alt={`color-${index}`}/>
        <p >{title.title}</p>
        </div>
        )
    })
    return articleTitles
  }

  return (
    <div className="App">
      <h1>Using the useEffect Hook</h1>
      {
        titles
        ?
        <h2>Finished Loading</h2>
        :
        <div>No Titles</div>
      }
      {
        titles && <div>{showTitles(titles)}</div>
      }
      <div>
        <button onClick={getTitles}>Get Titles</button>
      </div>
    </div>
  );
}

export default App;
```

---

# News Site III

## Change NavBar

`AppNav`
```js
import { useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import sections from '../../data/sections.json'
import "./appNav.css"

function AppNav(props) {
  const [navItems, setNavItems] = useState(sections)

  return (
    <Navbar className="bar">
      <Navbar.Brand>
        <img src="https://www.codeplatoon.org/wp-content/uploads/2018/10/CP-logo-2018-abbrev-1.png" width="60" />
        Code Platoon News
      </Navbar.Brand>
      <Nav>
      {
        navItems.map((navItem, index) => {
          return (
            <Nav.Link key={index} onClick={() => console.log(navItem.value)}>
                { navItem.label }
            </Nav.Link>
          )
        })
      }
      </Nav>
    </Navbar>
  )
}

export default AppNav;
```
> from news site III exercise
## The Section Page
The Section Page will be used to display articles that belong to a specific section (specifically, "World", "Science",  or "Books").  The Section Page should be loaded when a user clicks on one of these options in the top navigation.

The route that should display a section page should be `/sections/:sectionName`, where the `:sectionName` parameter would be one of the supported sections (listed above). For example, Clicking on the "World" link in the top navigation would redirect to http://localhost:5173/sections/world - this page would only display articles whose "section" property is set to "world".

To accomplish this, you will need to:

1. Create `SectionPage.js` inside of `src/pages`
2. Create a new route (`/sections/:sectionName`) in App.js which points to the `SectionPage` component
3. Obtain the `sectionName` from the url using `useParams()`
4. Within `SectionPage.js`, utilize the `filter()` function to retrieve articles by a specific section, and store them in a state value (`articles`). Remember, we'll be using `useEffect` here, just like we did for our HomePage component. 
5. Pass `articles` into the `<ArticleList>` component, thereby rendering the `ArticleList` with articles for the desired section. 

Attempt to navigate to **http://localhost:5173/#/sections/world**, and confirm that this is showing you the appropriate content. We should only see news articles that have a section value of "world".

## Section Links in `AppNav.js`
Now we need to update our AppNav component to use the new route that we added. We'll be using the Link component from the React Router, just like before, to facilitate internal navigation within our application. 

Attempt to navigate from the home page to a section page, using the AppNav links. Verify that we are taken to the correct page and showing the appropriate content.

Attempt to navigate from one section page to another section page, using the AppNav links. Uh-oh, there seems to be some issue here! While our url changes to the correct location, our content remained the same! Why would this be?? 

As we've mentioned before, React smartly only update the page contents when it knows something has changed. In this case, we're going from one section page to another, so the SectionPage component doesn't need to be removed from the view, and thus React keeps the previous one that was in use. However, React doesn't know anything need to change, because the render is only relying on the internal state values (in this case, `articles`). 

We need to get a new set of articles for the new section. How can we do this? This is where the component lifecycle concepts come into play. Our component need to react to an update, in this case, from the url. We will need to use `useParams` to figure out the new section value, and use that to get a new collection of articles. 



## Article Search

Let's add the ability to search for articles on the Home Page.  In order to accomplish this, the high-level things we need to build are:

1. Add a new function that accepts a search term, and returns a list of articles with that term in their title.
2. Add an input box to the `src/pages/HomePage` component that calls the function above, and updates state.
3. Add a new state value to track the search text. 


**HomePage.js**

As mentioned above, you will want to add a text input to the `HomePage`.  Why not use React Bootstraps's nicely styled text input? (Remember that you'll need to import all of these new libraries from `react-bootstrap` at the top of your file!) Go ahead and put this above your `<ArticleList>` component:

```javascript
<InputGroup>
  <InputGroup.Text>Search</InputGroup.Text>
  <FormControl placeholder="by Title" onChange={handleSearch} />
</InputGroup>
```

Note that we've provided the method that should be called from the `onChange` event - it's a class method called `handleSearch()`. 
Create the `handleSearch()` class method on the `HomePage.js` component. Within this event handler, you should:
1. Extract the value of the text input and set it to a new state value (`searchTitle`)
2. Update our useEffect() dependency array to include `searchTitle`

If these steps are completed successfully, the list of articles displayed on the home page should change as you interact with the text box.




## External Resources
- [State & Lifecycle](https://reactjs.org/docs/state-and-lifecycle.html)
- [Conditional Rendering](https://reactjs.org/docs/conditional-rendering.html)

## Assignments
- [News Site III](https://github.com/romeoplatoon/react-news-site-iii)
- [Temperature Conversion](https://github.com/romeoplatoon/react-temperature-conversion)


