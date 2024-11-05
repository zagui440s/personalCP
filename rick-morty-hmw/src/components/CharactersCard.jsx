import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { FavoritesContext } from '../App'; // Import context

export default function CharacterCard({ character }) {
  const navigate = useNavigate();
  const { addFavorite } = useContext(FavoritesContext); // Use the context

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={character.image} />
      <Card.Body>
        <Card.Title>{character.name}</Card.Title>
        <Button variant="primary" onClick={() => navigate(`/characters/${character.id}`)}>
          View Details
        </Button>
        <Button variant="success" onClick={() => addFavorite(character)} className="mt-2">
          Add to Favorites
        </Button>
      </Card.Body>
    </Card>
  );
}
