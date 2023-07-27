import { Link, Outlet } from "react-router-dom";

export default function App() {
  return (
    <>
      <h1>A very simple site to demonstrate client side routing</h1>
      <nav>
        <ul>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact-us">Contact us</Link>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}
