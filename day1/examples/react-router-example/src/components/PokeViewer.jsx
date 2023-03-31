import axios from "axios";
import { useLoaderData } from 'react-router-dom';

export async function pokeLoader({ params }) {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${params.pokeId}`)
    return response.data;
}

export default function PokeViewer() {
    const pokeData = useLoaderData();

    const pokeImgs = pokeData ?
        Object.values(pokeData.sprites)
            .filter(sprite => typeof sprite === "string") : null;

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