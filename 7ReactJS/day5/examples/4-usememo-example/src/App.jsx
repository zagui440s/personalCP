import { useState, useMemo } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [seed, setSeed] = useState(0);

  // an arbitrary 'expensive' (long running) function
  const expensiveCalculation = (num) => {
    // skip for first render
    if (seed === 0) {
      return 0;
    }

    console.log("Running expensive operation ...")
    const tik = Date.now()
    for (let i = 0; i < 10000000000; i++) {
      num += 1;
    }
    const tok = Date.now()
    const delta = tok - tik;
    const secondsElapsed = Math.floor(delta / 1000)
    console.log(`... done! Took ${secondsElapsed}s`)
    return num;
  };

  const result = useMemo(() => expensiveCalculation(seed), [seed]);

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
        <p>Update count and no re-computing of expensiveCalculation happens</p>
        <button onClick={() => setCount(count + 1)}>
          count is {count}
        </button>
        <p>Update seed and no expensiveCalculation is re-ran</p>
        <button onClick={() => setSeed(seed + 1)}>
          seed is {seed}
        </button>
        <pre>Result: {result}</pre>
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
