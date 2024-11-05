import React, { useContext } from 'react';
import { FavoritesContext } from '../App'; // Import the context
import CharactersCard from '../components/CharactersCard'; // Import the card component


const FavoriteCharactersPage = () => {
    const { favorites } = useContext(FavoritesContext);

    return (
        <div className="container">
          <h1>Your Favorite Characters</h1>
          {favorites.length === 0 ? (
            <p>No favorite characters yet. Add some!</p>
          ) : (
            <div className="row">
              {favorites.map((character) => (
                <div className="col-md-4" key={character.id}>
                  <CharactersCard character={character} />
                </div>
              ))}
            </div>
          )}
        </div>
      );
}

export default FavoriteCharactersPage;