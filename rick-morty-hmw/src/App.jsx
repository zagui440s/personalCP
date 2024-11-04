import HomePage from "./pages/HomePage.jsx";
import './App.css';
import  { Outlet } from "react-router-dom"

function App() {

  return (
    <>

    <div>
      <h1>Welcome to the Rick and Morty Show</h1>
      <p>This is your go-to site for all things Rick and Morty!</p>
    </div>
   
   <Outlet />
    </>
  )
}

export default App
