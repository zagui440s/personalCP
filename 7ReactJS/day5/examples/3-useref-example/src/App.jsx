import { useRef, useEffect } from 'react'
import $ from 'jquery'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const inputRef = useRef(null)

  // we use useEffect to set up the jquery event listener, as this is 'external' to React
  useEffect(() => {
    // guard against initial null value
    if (inputRef) {
      $(inputRef.current).on('blur', () => {
        const textContent = $(inputRef.current).val();
        alert(`Triggers on blur: ${textContent}`)
      })
    }
  }, [inputRef])

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
        <input type="text" ref={inputRef} />
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
