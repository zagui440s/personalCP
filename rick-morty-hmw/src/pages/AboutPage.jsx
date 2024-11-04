import React, { useEffect, useState } from "react";
import axios from "axios"

function AboutPage(){
    const [ info, setInfo ] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://rickandmortyapi.com/api");
                setInfo(response.data);
            } catch (error) {
                console.error("Error fetching show info:", error);
            }
        };

        fetchData();
    }, []);

    if (!info) {
        return <p>Loading information about the show...</p>;
    }

    return (
        <div>
            <h2>About Rick and Morty Show</h2>
            <p>{info.info || "Details soon to come"}</p>
            <p>
                Learn more about the show on its{" "}
                <a href="https://en.wikipedia.org/wiki/Rick_and_Morty" target="_blank" rel=" ">
                    Wikipedia page
                </a>.
            </p>
        </div>
    )
}

export default AboutPage