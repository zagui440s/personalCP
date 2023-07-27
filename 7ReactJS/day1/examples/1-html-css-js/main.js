const resultsContainer = document.getElementById('pokemon-list');

const pokemon = ['Pikachu', 'Squirtle', 'Charmander', 'Bulbasaur'];

function getRandomElement(arr) {
    const randIndex = Math.floor(Math.random() * arr.length);
    return arr[randIndex];
}

function addPokemon() {
    const name = getRandomElement(pokemon);
    const newListItem = document.createElement('li');
    newListItem.innerText = name;
    newListItem.className = name;
    resultsContainer.append(newListItem);
}