import { useState, useEffect } from "react";
import "./App.css";
// import { getAuth } from "./components/ListItem";

// const changeGreeting = () => {
//   let h2 = document.getElementById('greeting')
//   if (h2.innerText === 'Hello'){
//     h2.innerText = 'Goodbye'
//   }
//   else{
//     h2.innerText = 'Hello'
//   }
// }
// const handleClick = () => {
//   if (greeting === 'Hello'){
//     setGreeting('Goodbye')
//   }
//   else{
//     setGreeting('Hello')
//   }
// }
// 2 params 1 = func, 2 = dep array
// useEffect(()=>{
//   console.log(greeting)
// },[greeting])
// const [characterImg, setCharacterImg] = useState("https://rickandmortyapi.com/api/character/avatar/1.jpeg")
// const [characterId, setCharacterId] = useState(1)

// const getCharacterImg = async() => {
//   let { data } = await axios.get(`https://rickandmortyapi.com/api/character/${characterId}`)
//   setCharacterImg(data.image)
// }

// useEffect(()=> {
//   const getImg = async() =>{
//     await getCharacterImg()
//   }
//   getImg()
// }, [characterId])
// const [greeting, setGreeting] = useZState("Hello"); // requires init val
// import axios from "axios";

import jsonTasks from "./tasks.json";
import ListItem from "./components/ListItem";

function App() {
  //     variable, function    [variable, funcToUpdateVariable]
  // unordered list
  // iterate through tasks
  // for each task object render a li
  const [tasks, setTasks] = useState(jsonTasks); //[{},{}]
  

  return (
    <>
      <h1>TO DO LIST</h1>
      <ul>
        {/* <ListItem/> */}
        {tasks.map((lstObj) => (
          <ListItem key={lstObj.id} task={lstObj}/>
          // <li key={lstObj.id}>
          //   {lstObj.task}{" "}
          //   <input
          //     type="checkbox"
          //     checked={isCompleted}
          //     onChange={(e) => setIsCompleted(e.target.checked)}
          //   />
          // </li>
        ))}
      </ul>
      {/* <img src={characterImg} />
      
      <button onClick={()=>setCharacterId(1)}>1</button>
      <button onClick={()=>setCharacterId(2)}>2</button>
      <button onClick={()=>setCharacterId(3)}>3</button> */}
      {/* <h1>{greeting} Yankee</h1>
      <button onClick={handleClick}>update</button> */}
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