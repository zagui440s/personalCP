const axios = require('axios');
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const getPokemonAndRelatedByType = async (searchTerm) => {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`);
    const name = response.data.forms[0].name;
    const type = response.data.types[0].type;
    console.log(`The pokemon ${name} has a primary type of ${type.name}`);

    const typeResponse = await axios.get(type.url);
    const otherPokemon = typeResponse.data.pokemon.slice(0, 10);
    const otherPokemonByName = otherPokemon.map(entry => entry.pokemon.name);
    console.log(`Other ${type.name} type pokemon include:`);
    otherPokemonByName.forEach(name => console.log(name));
}

rl.question("name a pokemon: ", (searchTerm) => {
    try {
        getPokemonAndRelatedByType(searchTerm);
    } catch (error) {
        console.error(error);
    } finally {
        rl.close();
    }
});