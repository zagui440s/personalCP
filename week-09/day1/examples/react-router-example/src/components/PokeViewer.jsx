import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';


export default function PokeViewer() {
    const [pokeData, setPokeData] = useState(null);
    const { pokeId } = useParams();

    const pokeImgs = pokeData ?
        Object.values(pokeData.sprites)
            .filter(sprite => typeof sprite === "string") : null;

    console.log(pokeData)
    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeId}`)
            .then(response => setPokeData(response.data));
    }, []);

    return (
        <div>
            {pokeData && (
                <>
                    <h2>{pokeData.name}</h2>
                    <div>
                        <div>
                            {pokeImgs.map((url, index) => (
                                <img key={index} src={url} />
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}