import { useState, useEffect } from "react";
import "./App.css";

// const changeGreeting = () => {
//   let h2 = document.getElementById('greeting')
//   if (h2.innerText === 'Hello'){
//     h2.innerText = 'Goodbye'
//   }
//   else{
//     h2.innerText = 'Hello'
//   }
// }
import jsonTasks from "./tasks.json"
import axios from "axios";

function App() {

  //     variable, function    [variable, funcToUpdateVariable]
  const [greeting, setGreeting] = useState("Hello"); // requires init val
  const [tasks, setTasks] = useState(jsonTasks) //[{},{}]
  // unordered list
  // iterate through tasks
    // for each task object render a li
  const handleClick = () => {
    if (greeting === 'Hello'){
      setGreeting('Goodbye')
    }
    else{
      setGreeting('Hello')
    }
  }
  // 2 params 1 = func, 2 = dep array
  useEffect(()=>{
    console.log(greeting)
  },[greeting])

  const [characterImg, setCharacterImg] = useState("https://rickandmortyapi.com/api/character/avatar/1.jpeg")
  const [characterId, setCharacterId] = useState(1)

  const getCharacterImg = async() => {
    let { data } = await axios.get(`https://rickandmortyapi.com/api/character/${characterId}`)
    setCharacterImg(data.image)
  }

  useEffect(()=> {
    const getImg = async() =>{
      await getCharacterImg()
    }
    getImg()
  }, [characterId])

  return (
    <>
      <h1>Select a character</h1>
      <img src={characterImg} />
      
      <button onClick={()=>setCharacterId(1)}>1</button>
      <button onClick={()=>setCharacterId(2)}>2</button>
      <button onClick={()=>setCharacterId(3)}>3</button>
      {/* <h1>{greeting} Yankee</h1>
      <button onClick={handleClick}>update</button> */}
      {/* <ul>
      {
        tasks.map((lstObj)=>(
          <li>{lstObj.task} <input type="checkbox" checked={lstObj.completed}/></li>
        ))
      }
      </ul> */}
      {/* <h2 id='greeting'>Hello</h2> */}
      {/* <h2>{greeting}</h2>
      <button onClick={()=>setGreeting(greeting === 'Hello' ? 'Goodbye': 'Hello')}>
        Change goodbye
      </button> */}
      {/* <button onClick={()=>setGreeting('Hello')}>
        Change hello
      </button> */}
    </>
  );
}

export default App;
//useeEffect TRACKS all changes in the console.log and DOM? use two parameters.