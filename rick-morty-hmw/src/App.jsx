import { useState, createContext } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import { Outlet } from 'react-router-dom';

export const FavoritesContext = createContext();

function App() {
  const [favorites, setFavorites] = useState([]);

  const addFavorite = (character) => {
    const isInFavorites = favorites.find(fav => fav.id === character.id);

    if (!isInFavorites && favorites.length < 4) {
      setFavorites([...favorites, character]);
    }
  };

  const removeFavorite = (character) => {
    setFavorites(favorites.filter(fav => fav.id !== character.id));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      <header>
        <NavBar />
      </header>

      <main>

        <Outlet />
      </main>


      <footer>
        <p>This is the footer</p>
      </footer>
    </FavoritesContext.Provider>
  );
}

export default App;
