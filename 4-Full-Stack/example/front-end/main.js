// Sends get requests to flask student API
const getStudents = async() => {
    let response = await fetch("http://127.0.0.1:5000/students")
    let data = await response.json()
    let ul = document.getElementById("student-list")
    for (student of data){
        let li = document.createElement("li")
        li.innerText = `Student Name: ${student.first_name}`
        ul.appendChild(li) 
    }
}

// Sends get requests to PokeAPI
const getPokemon = async() => {
    let response = await fetch("https://pokeapi.co/api/v2/pokemon/charizard")
    let data = await response.json()
    let pokemonPhoto = data.sprites.front_default
    let img = document.createElement("img")
    img.src = pokemonPhoto
    img.id = 'pokemonImg'
    document.body.appendChild(img)
}

getStudents()
getPokemon()