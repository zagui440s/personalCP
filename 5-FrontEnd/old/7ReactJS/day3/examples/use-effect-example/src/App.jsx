import PokeViewer from "./components/PokeViewer";
import UseEffectBasic from "./components/UseEffectBasic";
import PokeSearch from "./components/PokeSearch";
import PokeSearchAsyncAwait from "./components/PokeSearchAsyncAwait";

export default function App() {
  return (
    <>
      <h1>Poke image viewer</h1>
      {/* <UseEffectBasic /> */}
      {/* <PokeViewer name="pikachu" />
      <PokeViewer name="squirtle" />
      <PokeViewer name="bulbasaur" />
      <PokeViewer name="charizard" /> */}
      <PokeSearch />
      {/* <PokeSearchAsyncAwait /> */}
    </>
  );
}
