import React, { useState, useEffect } from "react";
import axios from "axios";

function CharactersPage() {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                const response = await axios.get("https://rickandmortyapi.com/api/character");
                setCharacters(response.data.results);
            } catch (error) {
                console.error("Error fetching characters", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCharacters();
    }, []);

    if (loading) return <p>Characters page loading...</p>;

    return (
        <div>
            <h1>Characters</h1>
            <div className="character-list">
                {characters.map((character) => (
                    <div key={character.id} className="character-card">
                        <img src={character.image} alt={character.name} />
                        <h2>{character.name}</h2>
                        <p>Species: {character.species}</p>
                        <p>Status: {character.status}</p>
                        {/* Placeholder for link to character details */}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CharactersPage;
