import PokeViewer from './components/PokeViewer';

export default function App() {

  return (
    <>
      <h1>Poke image viewer</h1>
      <PokeViewer name="pikachu" />
      <PokeViewer name="squirtle" />
      <PokeViewer name="bulbasaur" />
      <PokeViewer name="charizard" />
    </>
  );
}