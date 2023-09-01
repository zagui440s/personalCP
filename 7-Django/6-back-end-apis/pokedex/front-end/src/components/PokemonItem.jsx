import { useState, useEffect } from "react"
import axios from 'axios'

export const PokemonItem = ({pokemon}) => {
    const [nounProjectIcon, setNounProjectIcon] = useState(null)
    
    const getIcon = async() =>{
        let response = await axios
            .get(`http://127.0.0.1:8000/api/v1/noun/${pokemon.type}/`)
            .catch((err)=>{
                console.log(err)
                alert("Problems getting Icon")
            })
        console.log(response)
        setNounProjectIcon(response.data)
    }
    useEffect(()=>{
        getIcon()
    },[])

    return (
        <li
            style={{
              margin: "3vmin",
              display: "flex",
              flexDirection: "column",
            }}
          >
            Name: {pokemon.name} 
            <br /> Level: {pokemon.level}
            <ul>
            {nounProjectIcon ? <img style={{height:"5vmin", width:"5vmin"}} src={nounProjectIcon}/>: null}
              Moves
              {pokemon.moves.map((move, idx) => (
                <li key={`${pokemon.id}${idx}`}>{move}</li>
              ))}
            </ul>
          </li>
    )
}