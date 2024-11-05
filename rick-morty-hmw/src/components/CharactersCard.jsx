import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";

export default function CharacterCard({ character }) {
  const navigate = useNavigate();

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={character.image} />
      <Card.Body>
        <Card.Title>{character.name}</Card.Title>
        <Button variant="primary" onClick={() => navigate(`/characters/${character.id}`)}>
          View Details
        </Button>
      </Card.Body>
    </Card>
  );
}
