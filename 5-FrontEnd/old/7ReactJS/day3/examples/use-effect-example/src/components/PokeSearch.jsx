import { useEffect, useState } from "react";
import axios from "axios";

export default function PokeSearch() {
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
    // necessary otherwise would trigger initially
    if (pokeSearchName.length > 0) {
      // set loading state on start
      setLoading(true);
      // make the call and handle success/failure
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/${pokeSearchName}`)
        .then((response) => {
          setPokeImg(response.data.sprites.front_default);
        })
        .catch((error) => {
          setErrorMsg(error.message);
        })
        // don't forget to reset loading state either way
        .finally(() => setLoading(false));
    }
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
