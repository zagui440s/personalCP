import { useState, useEffect } from "react";
import axios from "axios";

export default function PokeViewer({ name }) {
    // first create some placeholder state
    const [pokeImgUrls, setPokeImgUrls] = useState([]);

    // This will run *after* each render
    // first arg is callback function
    // second arg is dependency list
    // If empty means 'just once after first render'.
    // If left out means 'after every render' (usually not what you want, easy to become infinite loop)
    useEffect(() => {
        // do async logic here
        axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
            .then(response => {
                const sprites = response.data.sprites;
                const spriteUrls = Object.values(sprites).filter(sprite => typeof sprite === "string");
                setPokeImgUrls(spriteUrls);
            });
    }, []);

    return (
        <>
            <h2>{name}</h2>
            <div>
                {pokeImgUrls.length > 0 ? (
                    <div>
                        {pokeImgUrls.map((url, index) => (
                            <img key={index} src={url} />
                        ))}
                    </div>
                ) : (
                    <div>Loading...</div>
                )}
            </div>
        </>
    );
}