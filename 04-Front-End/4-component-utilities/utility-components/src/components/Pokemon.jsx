import { useEffect, useState } from "react";
import axios from "axios"


const displayPokemon = ({pokemonImage}) => {
    console.log("this is our pokemon display")

    return (
       <>

        <img src={pokemonImage} alt="image of poke" />
  
       </>
        
    )
}

export default displayPokemon