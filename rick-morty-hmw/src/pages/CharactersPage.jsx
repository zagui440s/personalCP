import React, { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import CharactersCard from "../components/CharactersCard"; // Import CharactersCard

const CharactersPage = () => {
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                const response = await axios.get("https://rickandmortyapi.com/api/character");
                setCharacters(response.data.results);
            } catch (error) {
                console.error("Error fetching characters:", error);
            }
        };
        fetchCharacters();
    }, []);

    return (
        <div className="container">
            <h1>Rick and Morty Characters</h1>
            <Row xs={1} md={2} lg={3} className="g-4">
                {characters.map((character) => (
                    <Col key={character.id}>
                        <CharactersCard character={character} /> {/* Use CharactersCard */}
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default CharactersPage;

