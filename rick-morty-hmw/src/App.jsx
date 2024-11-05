import HomePage from "./pages/HomePage.jsx";
import './App.css';
import  { Outlet } from "react-router-dom"

function App() {

  return (
    <>

    <div>
      <h1>Welcome to the Rick and Morty Show</h1>
      <p>more random jfbndjnbdjn</p>
    </div>
   
   <Outlet />
    </>
  )
}

export default App
