import AboutPage from "./pages/AboutPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import NavBar from "./components/NavBar.jsx";
import { useState, useEffect } from "react";

import "./App.css";
import { Outlet, Link } from "react-router-dom";

function App() {
  // only render homepage if I'm currently in localhost:5173/
  return (
    <>
      <h1>Hello Yankee</h1>
      <nav>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='about/'>About</Link>
          </li>
          <li>
            <Link to="contact/">Contact</Link>
          </li>
        </ul>
      </nav>
      <Outlet /> 
      {/* needs OUTLET to render, connect app.jsx to browser, outlet connects the children elements */}
    </>
  );
}

export default App;
