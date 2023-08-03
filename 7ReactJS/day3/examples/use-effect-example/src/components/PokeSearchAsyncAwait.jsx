// nothing is changed in this example besides
// the body of the useEffect

import { useEffect, useState } from "react";
import axios from "axios";

export default function PokeSearchAsyncAwait() {
  const [inputValue, setInputValue] = useState("");
  const [pokeSearchName, setPokeSearchName] = useState("");
  const [pokeImg, setPokeImg] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const onClickHandler = () => {
    setPokeSearchName(inputValue);
    // blank out other data when triggering new call
    setInputValue("");
    setPokeImg(null);
    setErrorMsg("");
  };

  useEffect(() => {
    async function searchPokeApi() {
      if (pokeSearchName.length > 0) {
        setLoading(true);

        try {
          const response = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${pokeSearchName}`
          );
          setPokeImg(response.data.sprites.front_default);
        } catch (error) {
          setErrorMsg(error.message);
        } finally {
          setLoading(false);
        }
      }
    }

    searchPokeApi();
  }, [pokeSearchName]);

  return (
    <>
      <input
        type="text"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      />
      <button onClick={onClickHandler}>Search</button>
      <div>
        {loading && <div>Loading ...</div>}
        {pokeImg && <img src={pokeImg} />}
        {errorMsg && <pre>{errorMsg}</pre>}
      </div>
    </>
  );
}
