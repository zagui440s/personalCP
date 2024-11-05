import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Card } from "react-bootstrap";

function CharacterDetailsPage(){

    const { characterId } = useParams();
    const navigate = useNavigate();
    const [ character, setCharacter ] = useState(null);

    useEffect(() => {
        const fetchCharacter = async () => {
            try {
                const response = await axios.get(`https://rickandmortyapi.com/api/character/${characterId}`);
                setCharacter(response.data);
            } catch (error) {
                console.error("Error fetching character details:", error);
            }
        };

        fetchCharacter();
    }, [characterId]);

    if (!character) return <p>Loading character details...</p>;

    return (
        <div className="text-center">
            <Button onClick={() => navigate(-1)} className="mb-3">Go Back</Button> {/* Button to go back */}
            <Card className="mx-auto" style={{ width: '18rem' }}>
                <Card.Img variant="top" src={character.image} alt={character.name} />
                <Card.Body>
                    <Card.Title>{character.name}</Card.Title>
                    <Card.Text>Species: {character.species}</Card.Text>
                    <Card.Text>Status: {character.status}</Card.Text>
                    <Card.Text>Gender: {character.gender}</Card.Text>
                    <Card.Text>Origin: {character.origin.name}</Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
}

export default CharacterDetailsPage;