import { useState, useEffect } from 'react';
import axios from 'axios';

import HomePage from './components/HomePage';
import './App.css';
import originalInventory from './data/inventory.json';

export default function App() {
  // defining all of our state at top level and then passing down where appropriate
  const [inventory, setInventory] = useState(originalInventory);
  const [selectedFilm, setSelectedFilm] = useState(null);

  // define helper methods where available
  const setSelectedFilmById = id => {
    // if id of null (or falsey), reset to none
    if (id) {
      setSelectedFilm(inventory.find(film => film.id === id))
    } else {
      setSelectedFilm(null);

    }
  };

  const checkoutOrReturnFilmById = (id, type) => {
    // create brand new copy of array, so react will know to rerender
    const newInventory = [...inventory];
    // can now mutate, as it's a new array anyways
    const filmToReturn = newInventory.find(film => film.id === id);
    if (type === "checkout") {
      filmToReturn.copiesAvailable.current--;
    } else if (type === "return") {
      filmToReturn.copiesAvailable.current++;
    } else {
      console.error(`Unknown checkoutOrReturnFilmById type = ${type}`)
    }
    // finally set it to new array
    setInventory(newInventory);
  }

  const updateInventoryById = (id, updateObj) => {
    // create brand new copy of array, so react will know to rerender
    const newInventory = [...inventory];
    // can now mutate, as it's a new array anyways
    const filmToUpdate = newInventory.find(film => film.id === id);
    // a way to add combine all the key/val pairs from one obj into an existing obj
    Object.assign(filmToUpdate, updateObj);
    // finally set it to new array
    setInventory(newInventory);
  }

  useEffect(() => {
    const apiKey = "7f539340"; //usually hidden in some way if secret

    for (const entry of inventory) {
      const url = `https://www.omdbapi.com/?i=${entry.id}&apikey=${apiKey}`;
      axios.get(url)
        .then(response => {
          updateInventoryById(entry.id, response.data);
        })
        .catch(err => console.error(err));
    }


  }, []);

  return (
    <div id="app_root">
      <header>
        <h1>Video Store</h1>
      </header>
      <main>
        <HomePage
          inventory={inventory}
          selectedFilm={selectedFilm}
          setSelectedFilmById={setSelectedFilmById}
          checkoutOrReturnFilmById={checkoutOrReturnFilmById}
        />
      </main>
      <footer>© 2023 Video Store</footer>
    </div>
  );
}