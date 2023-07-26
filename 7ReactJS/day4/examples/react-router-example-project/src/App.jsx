import { useState } from "react";
import { Outlet, Link } from "react-router-dom";

export default function App() {
  const [feedback, setFeedback] = useState("");

  return (
    <>
      <h1>A very simple site to demonstrate client side routing</h1>
      <nav>
        <ul>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact-us">Contact us</Link>
          <Link to="/users/44">User 44</Link>
          <Link to="/users/101">User 101</Link>
        </ul>
      </nav>
      <Outlet context={{ feedback, setFeedback }} />
    </>
  );
}
