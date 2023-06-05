import { useState, useEffect } from 'react'
import axios from "axios"
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(1)
  const [pokeData, setPokeData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')


  useEffect(() => {
    setLoading(true);
    axios.get(`https://pokeapi.co/api/v2/pokemon/${count}`)
      .then(response => {
        setError('')
        setPokeData(response.data)
      })
      .catch(error => {
        setError(error.message)
        setPokeData(null)
      })
      .finally(() => setLoading(false))
  }, [count]);

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <h2>Count is {count}</h2>
        <button onClick={() => setCount(count - 1)}>-</button>
        <button onClick={() => setCount(count + 1)}>+</button>
        {
          loading ? (
            <pre>Loading ...</pre>
          ) : error ? (
            <pre style={{ color: 'red' }}>Error: {error}</pre>
          ) : pokeData ? (
            <div>
              <h1>{pokeData.name}</h1>
              <img src={pokeData.sprites.front_default} />
            </div>
          ) : null
        }
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
