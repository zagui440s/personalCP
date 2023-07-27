import { useEffect } from "react";
import axios from "axios";

export default function UseEffectBasic() {
  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/pikachu`).then((response) => {
      console.log(response.data);
    });
  }, []);

  return <div>Use Effect Basic Component</div>;
}
