# CRUD: Create & Delete

## Lesson

So far our application has `READ` and `UPDATE` capabilities for both Moves and Pokemon. Lets go into the last two methods and complete our CRUD capabilities in our API.

## TLO's (Testable Learning Objectives)

- Create a CREATE/POST method in a CBV
- Create a DELETE/DELETE method in a CBV

## ELO's (Elective Learning Objectives)

- Test API endpoints
- Test API endpoints HTTP responses

## Create

> When we create something we are technically POSTING something new onto our database and therefore built this relationship that CREATE = POST and POST = CREATE. Always correlate POST to CREATE with the exception of handling user Authentication. The question then comes where do we want this `post` method to live. Lets say I want to create a new Pokemon, since I'm creating a new entry onto the list of Pokemon I would want this method to exist at the `All_pokemon` CBV.

```python
# pokemon_app/views.py

class All_pokemon(APIview):
 # specify the request method that should trigger this behavior
    def post(self, request):
        # We could create a pokemon by specifying each individual field but that's obviously not optimal
        new_pokemon = Pokemon(name = request.data['name'], level = request.data['level'], description = request.data['description'])
        # instead we can use the kwargs method and pass in request.data (a dict) into the create argument
        new_pokemon = Pokemon(**request.data)
        new_pokemon.full_clean()
        new_pokemon.save()
        new_pokemon = PokemonSerializer(new_pokemon)
        return Response(new_pokemon.data, status=HTTP_201_CREATED)
```

> Now that we have a flexible and well constructed API view to create a Pokemon, we can test it with Postman by sending a POST request to `http://127.0.0.1:8000/api/v1/pokemon/` with all of the following data.

```json
{
    "name":"Geodude",
    "level": 37,
    "captured" : false,
    "description": "This is Geodude and I would probably struggle fighting poison types without it"
}
```

> If our APIView is working correctly we will see the following response with a `Status` of 201 Created:

```JSON
{
    "id": 5,
    "name": "Geodude",
    "level": 37,
    "moves": []
}
```

## Delete

> Deleting an item from a database is surprisingly simple. We could utilize the already established `A_pokemon` CBV to get a pokemon instance and then call the .delete() method to delete an item from our database.

```python
# pokemon_app/views.py
class A_pokemon(APIView):

    def delete(self, request, id_or_name):
        # get a pokemon from our database
        pokemon = self.get_a_pokemon(id_or_name)
        # delete instance and database entry
        pokemon.delete()
        # return the name of the pokemon deleted
        return Response(status=HTTP_204_NO_CONTENT)
```

> Finally we can test it by sending a DELETE request to `http://127.0.0.1:8000/api/v1/pokemon/geodude/` and our API should return an empty response with a status code of `204 No Content`.

## Testing API Endpoints

> We have successfully created our MVC's and given them CRUD capabilities to allow users to interact with our data. Although this works on our local machine we need to create tests for this functionality to help us identify bugs or issues that we can raise in the development cycle.

```python
# tests/test_views.py
    def test_007_create_a_pokemon(self):
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

    def test_008_deleting_a_pokemon(self):
        # after every test the Database resets back to only having fixture data
        # we can call test_007 where the test creates Geodude and then 
        # delete it
        self.test_007_create_a_pokemon()
        response = self.client.delete(reverse('a_pokemon', args=['geodude']))
        self.assertEquals(response.status_code, 204)
```

## Assignments

- Replicate the same CRUD capabilities with the move_app MVC's
- [DJANGO CRUD](https://classroom.github.com/a/BtgFtqfz)
