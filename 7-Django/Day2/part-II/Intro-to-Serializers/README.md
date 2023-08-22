# Django Serializers

## Lesson

> Django serializers are a powerful tool provided by the Django web framework to convert complex data types, such as Django model instances, into JSON, XML, or other content types. They also allow deserialization, converting the received data back into complex types after first validating the incoming data.

> Serializers play a crucial role in Django's REST framework, where they are used to handle requests and responses. In this guide, we'll explore the fundamentals of Django serializers and how to use them effectively.

## Testable Learning Objectives (TLO's)

- Construct Django Model Serializers

## Elective Learning Objectives (ELO's)

- Understand Django Rest Frameworks

## Django Rest Frameworks (DRF)

> Django Rest Framework (DRF) is a versatile toolkit that enhances Django's capabilities for building Web APIs. It achieves this by providing a comprehensive set of features and utilities. DRF simplifies API development by offering tools for defining endpoints, handling requests, and formatting responses. It accomplishes serialization through a robust framework that facilitates the conversion of complex data types into various content types. DRF handles requests by offering view classes and function-based views that map URLs to specific actions. It ensures secure API access through authentication schemes and a flexible permission system. DRF includes built-in pagination classes to handle large data sets effectively. It enforces data validation rules for incoming requests through a comprehensive validation framework. Additionally, DRF enhances the developer experience by providing a browsable API feature for easy exploration and debugging. Finally, DRF includes testing utilities and helpers to simplify the testing of API views, serializers, and authentication. Overall, Django Rest Framework empowers Django developers to build powerful and scalable APIs with ease and efficiency.

> click [here](../../../Resources/Why_DRF.md) to learn more about DRF

## Why Use Serializers?

- **Serialization**: Serializers help convert complex data types (e.g., models, querysets) into easily renderable formats like JSON or XML.
- **Deserialization**: Serializers allow the parsed data to be converted back into complex types after validating the incoming data.
- **Validation**: Serializers automatically validate the data against the model's fields and raise appropriate validation errors if necessary.
- **Support for Relationships**: Serializers handle relationships between models, allowing nested data representation and manipulation.

## Serializing Data

### Model Serializers

> Model serializers are a shortcut in Django for automatically determining the serializer fields based on the model definition. They provide a simple way to serialize and deserialize model instances.

> To create a model serializer, you need to define a class that inherits from `serializers.ModelSerializer`. The serializer class's `Meta` inner class specifies the model and fields to include in the serialization process.

> Lets create a `serializers.py` and create a serializer for our `Pokemon Model`:

```python
# pokemon_app/serializers.py
from rest_framework import serializers # import serializers from DRF
from .models import Pokemon # import Pokemon model from models.py

class PokemonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pokemon # specify what model this serializer is for
        fields = ['id', 'name', 'level'] # specify the fields you would like this serializer to return
```

> Lets open up the Django Python Shell and take a look at how our serializer works

```python
>>> from pokemon_app.models import Pokemon #import Pokemon model
>>> from pokemon_app.serializers import PokemonSerializer #import Pokemon Serializer
>>> pikachu = Pokemon.objects.get(id = 1) # Grab Pikachu from db
>>> pikachu
<Pokemon: Pikachu has been captured> # This is what Pikachu looks like when printed from a query set
>>> pikachu_serializer = PokemonSerializer(pikachu)
>>> pikachu_serializer # Here is the same Pikachu with the specified fields we provided
PokemonSerializer(<Pokemon: Pikachu has been captured>):
    id = IntegerField(label='ID', read_only=True)
    name = CharField(max_length=200, validators=[<function validate_name>])
    level = IntegerField(max_value=100, min_value=1, required=False)
>>> pikachu.name #We can utilize dot notation because pikachu is still a class instance
'Pikachu'
>>> pikachu_serializer.name #Notice this throws an error because our data is now in json format meaning we are now interacting with a dictionary and not a class
Traceback (most recent call last):
  File "<console>", line 1, in <module>
AttributeError: 'PokemonSerializer' object has no attribute 'name'
>>> pikachu_serializer['name'] # We call the key of name and get Pikachu's name returned
<BoundField value=Pikachu errors=None>
>>> exit()
```

### Serializing QuerySets

> Serializers can also handle querysets, allowing you to serialize multiple objects at once. To achieve this, you can pass a queryset instance to the serializer's `many=True` argument.

```python
all_pokemon = Pokemon.objects.all()
serializer = PokemonSerializer(all_pokemon, many=True)
```

### Creating an Object

> To create a new object from deserialized data, you can call the serializer's `save()` method.

```python
>>> from pokemon_app.serializers import PokemonSerializer # import PokemonSerializer from pokemon_app/serializers.py
>>> eevee = {"name":"Eevee", "level": 25} # we can make a dictionary with the required information we would like
>>> ser_eevee = PokemonSerializer(data = eevee) # by passing the dictionary into the serializer we allow the is_valid() check if the dictionary data fits our validators
>>> ser_eevee.is_valid()
True
>>> ser_eevee.save() # .save() still creates a new db entry and class instance even though it's from the PokemonSerializer class
<Pokemon: Eevee is yet to be caught>
```

> It's important to note that serializers automatically validate the incoming data against the model's fields.

## Conclusion

Django serializers are a powerful tool that simplifies the process of serializing and deserializing complex data types in Django applications. They provide an easy way to convert model instances, querysets, and other data structures into formats like JSON or XML. By understanding and utilizing serializers effectively, you can enhance your Django development workflow and create robust REST APIs.
