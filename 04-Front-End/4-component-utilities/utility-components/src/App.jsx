import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Pokemon from "./components/Pokemon.jsx";

function App() {
  const [usrInput, getUsrInput] = useState(" ");
  const [response, setResponse] = useState(null);
  const [pokemonImage, setPokemonImage] = useState(null);

  const handleUsrInput = (event) => {
    getUsrInput(event.target.value);
  };

  const fetchData = async (event) => {
    event.preventDefault();
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${usrInput}`
    );

    setPokemonImage(response.data.sprites.front_shiny);
    setResponse(response);
    console.log(response.data.stats)
  };
  useEffect(() => {
    console.log(usrInput);
  }, [usrInput]);
console.log(pokemonImage)
  return (
    <>
      <h1>header h1 in app.jsx</h1>

      <div>
        <form onSubmit={(e) => fetchData(e)}>
          <input
            type="text"
            placeholder="pokemon name"
            onChange={(e) => getUsrInput(e.target.value)}
          />
          <button> submit </button>
        </form>
        <Pokemon pokemonImage={pokemonImage}/>
      </div>
    </>
  );
}

export default App;
