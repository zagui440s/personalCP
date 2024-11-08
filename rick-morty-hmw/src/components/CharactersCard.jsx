import React, { useContext } from 'react';
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { FavoritesContext } from '../App';

export default function CharacterCard({ character, isFavoritePage }) {
  const navigate = useNavigate();
  const { addFavorite, removeFavorite, favorites } = useContext(FavoritesContext); // Access addFavorite, removeFavorite, and favorites from context

  const isInFavorites = favorites.some(fav => fav.id === character.id);

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={character.image} />
      <Card.Body>
        <Card.Title>{character.name}</Card.Title>

        {/* View details button */}
        <Button variant="primary" onClick={() => navigate(`/characters/${character.id}`)}>
          View Details
        </Button>

        {/* Conditional rendering for Add/Remove button */}
        {isFavoritePage ? (
          // If it's on the FavoriteCharactersPage, show the Remove button
          <Button 
            data-testid="remove-from-favorites" 
            variant="danger" 
            onClick={() => removeFavorite(character)}
          >
            Remove from Favorites
          </Button>
        ) : isInFavorites ? (
          // If it's on the CharactersPage and the character is in favorites, show the "Added to Favorites" button
          <Button variant="success" disabled style={{ opacity: 0.6 }}>
            Added to Favorites
          </Button>
        ) : (
        
          <Button 
            data-testid="add-to-favorites" 
            variant="success" 
            onClick={() => addFavorite(character)}
          >
            Add to Favorites
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}
