import { useState, useEffect } from 'react'
import NavBar from './components/NavBar';
import { Outlet, useNavigate, useLoaderData } from 'react-router-dom';
import './App.css'

function App() {
  const [user, setUser] = useState(useLoaderData())

  const navigate = useNavigate()

  useEffect(()=>{
    if (!user){
      navigate('/')
    }
  }, [user])


  return(
    <>
      <NavBar user = {user} setUser={setUser}/>
      <Outlet context={{user,setUser}}/>
    </>
  )
}

export default App
