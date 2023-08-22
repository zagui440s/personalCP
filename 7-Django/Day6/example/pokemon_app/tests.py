from django.test import TestCase
from django.core.exceptions import ValidationError
from .models import Pokemon  # import pokemon model
from django.urls import reverse
import json


# Create your tests here.
class pokemon_test(TestCase):
    def test_01_create_pokemon_instance(self):
        # Here we will create our pokemon instance
        new_studet = Pokemon(
            name="Pikachu",
            description="Only the best electric type pokemon in the show but NOT in the games",
        )
        try:
            # remember validators are not ran on our new instance until we run full_clean
            new_studet.full_clean()
            # here we will ensure our instance is actually created
            self.assertIsNotNone(new_studet)
        except ValidationError as e:
            # print(e.message_dict)
            # if it sends an error we want to ensure this test fails
            self.fail()

    def test_02_create_pokemon_with_incorrect_name_format(self):
        # we create an instance with an improper name
        new_studet = Pokemon(
            name="ch4r1z4 rd",
            description="Looks like a Dragon has wings, breathes fire.. but is not a dragon",
        )
        try:
            new_studet.full_clean()
            # if our instance runs through the full clean and doesn't throw an error, than we
            # know our validator is not working correctly and we should fail this test
            self.fail()

        except ValidationError as e:
            # print(e.message_dict)
            # we can ensure the correct message is inside our ValidationError
            self.assertTrue("Improper name format" in e.message_dict["name"])

    def test_003_update_pokemon_data(self):
        updated_pokemon = Pokemon(name="Eevee")
        updated_pokemon.save()
        # Theres a couple of differences in the way we send this request through our client.
        # 1. Notice that our client is specifically sending a PUT request to our URL
        # 2. We are no passing a data parameter holding a dictionary that will be passed to the request
        # 3. By default Django send "application/octet-stream" data in tests so we have to specify that
        #    we are sending "application/json" data in content_type
        response = self.client.put(
            reverse("a_pokemon", args=["eevee"]),
            data={
                "level_up": True,
                "captured": True,
                "description": "This is Pikachu and it is a surprizingly weak electric type that does not live up to it's name",
            },
            content_type="application/json",
        )
        # We don't have response content to assert so instead we will assert the HTTP status_code
        self.assertEquals(response.status_code, 204)

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
