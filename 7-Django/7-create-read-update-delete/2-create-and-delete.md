# CRUD: Create & Delete

## Intro

So far our application has `READ` and `UPDATE` capabilities for both Moves and Pokemon. Lets go into the last two methods and complete our CRUD capabilities in our API by adding a `CREATE` and `DELETE` capability to our API.

## Create

> When we create something we are technically POSTING something new onto our database and therefore built a relationship where CREATE = POST and POST = CREATE. Always correlate POST to CREATE with the exception of handling user Authentication. The question then comes where do we want this `POST` method to live. Lets say I want to create a new Pokemon, since I'm creating a new entry onto the list of Pokemon I would want this method to exist at the `All_pokemon` CBV.

```python
# pokemon_app/views.py

class All_pokemon(APIview):
 # specify the request method that should trigger this behavior
    def post(self, request):
        # We could create a pokemon by specifying each individual field but that's obviously not optimal
        # new_pokemon = Pokemon(name = request.data['name'], level = request.data['level'], description = request.data['description'])
        # instead we can use the PokemonSerializers kwargs method and pass in request.data (a dict) into the create argument
        new_pokemon = PokemonSerializer(data=request.data)
        if new_pokemon.is_valid():
            new_pokemon.save()
            return Response(new_pokemon.data, status=HTTP_201_CREATED)
        else:
            return Response(new_pokemon.errors, status=HTTP_400_BAD_REQUEST)
```

> Now that we have a flexible and well constructed API view to create a Pokemon, we can test it with `axios` by sending a `POST` request to `http://127.0.0.1:8000/api/v1/pokemon/` with all of the following data.

```javascript
// front-end/src/pages/Pokemon.jsx
import Row from "react-bootstrap/esm/Row";
import { useEffect, useState } from "react";
import axios from "axios";
import { PokemonItem } from "../components/PokemonItem";

export const Pokemon = () => {
  const [pokemon, setPokemon] = useState([]);
  const [name, setName] = useState("");
  const [level, setLevel] = useState(0);
  const [captured, setCaptured] = useState(false);
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");

  {...}

  const createAPokemon = async(e) => {
    e.preventDefault()
    let data = {
      "name":name,
      "level":level,
      "description":description,
      "captured":captured,
      "type":type
    }
    // console.log(data)
    let response = await axios
      .post("http://127.0.0.1:8000/api/v1/pokemon/", data)
      .catch((err)=>{
        alert("could not create Pokemon")
        console.error(err)
      })
    if (response.status === 201){
      window.location.reload()
    }
  }

  return (
    <Row style={{ padding: "0 10vmin" }}>
      <form onSubmit={(e)=>createAPokemon(e)}>
        <h2>Create a Pokemon</h2>
        <input
          type="text"
          placeholder="Pokemon Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Pokemon Type"
          onChange={(e) => setType(e.target.value)}
        />
        <input
          type="number"
          placeholder="Pokemon Level"
          onChange={(e) => setLevel(e.target.value)}
        />
        <textarea
          placeholder="description"
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <label>
          Captured
          <input
            type="checkbox"
            onChange={(e) => setCaptured(e.target.checked)}
          />
        </label>
        <input type="submit" value="create" />
      </form>
      {....}
    </Row>
  );
};
```

> Our API is working correctly and it is able to validate data and create a new entry onto our database utilizing the `POST` method.

## Delete

> Deleting an item from a database is surprisingly simple. We could utilize the already established `A_pokemon` CBV to get a pokemon instance and then call the .delete() method to delete an item from our database.

```python
# pokemon_app/views.py
class A_pokemon(APIView):

    def delete(self, request, id):
        # get a pokemon from our database
        pokemon = self.get_a_pokemon(id)
        # delete instance and database entry
        pokemon.delete()
        # return the name of the pokemon deleted
        return Response(status=HTTP_204_NO_CONTENT)
```

> Finally we can test it by sending a DELETE request to `http://127.0.0.1:8000/api/v1/pokemon/geodude/`. This will cause Geodude to be deleted from out database and this should reflect on our user interface.

```javascript
// front-end/src/components/PokemonItem.jsx
export const PokemonItem = ({ pokemon }) => {

  {...}

  const deleteAPokemon = async() => {
    let response = await axios
        .delete(`http://127.0.0.1:8000/api/v1/pokemon/${pokemon.id}/`)
        .catch((err)=>{
        alert("could not delete a pokemon")
        console.error(err)
        })
    if (response.status === 204){
        window.location.reload()
    }
  }

  return (
    <li>
    Name: {pokemon.name}
    <button onClick={deleteAPokemon}>Delete</button>
    {...}
    </li>
  )
}
```

## Testing API Endpoints

> We have successfully created our MVC's and given them CRUD capabilities to allow users to interact with our data. Although this works on our local machine we need to create tests for this functionality to help us identify bugs or issues that we can raise in the development cycle.

```python
# tests/test_views.py
    def test_004_create_a_pokemon(self):
        # First lets send a post request with the corresponding data
        response = self.client.post(reverse('all_pokemon'), data={
            "name":"Geodude",
            "level": 22,
            "description": "Geodude is a rock type pokemon that will eventually evolve into graveler",
            "captured": True
        }, content_type="application/json")
        with self.subTest():
            # The date encountered is default to .now() so
            # we can't create an answer for this code instead
            # we can ensure the request was successful
            self.assertEquals(response.status_code, 201)
        # We know the request was successful so now lets grab the pokemon
        # we created and ensure it exists within the database
        response = self.client.get(reverse('a_pokemon', args=['geodude']))
        self.assertTrue('Geodude' == response.data['name'])

    def test_005_deleting_a_pokemon(self):
        # after every test the Database resets back to only having fixture data
        # we can call test_007 where the test creates Geodude and then
        # delete it
        self.test_004_create_a_pokemon()
        response = self.client.delete(reverse('a_pokemon', args=['geodude']))
        self.assertEquals(response.status_code, 204)
```
