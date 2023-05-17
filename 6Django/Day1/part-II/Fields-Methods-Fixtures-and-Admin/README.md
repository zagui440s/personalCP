# More Django-ORM

## Lesson

Earlier we created a `Pokemon` model, but we only touched the tip of the iceberg when it comes to model fields. Lets take it a step further and take a look at some useful fields and features.

- [SLIDES](https://docs.google.com/presentation/d/1w1wZ5864w-Y2XaSOvSl38m-BAFH9DIQUY3MzdaBH7OQ/edit?usp=share_link)

## TLO's (Testable Learning Objectives)

- Run Django Server

## ELO's (Elective Learning Objectives)

- Learn about models.fields
- Create Model methods
- Utilize Fixtures to back-up data
- Create a Django Super User
- Interact with Django's admin site

## Useful Model Fields

```python
# utilize timezone for any Django Date/DateTime/TZ fields since it already provides
# the correct format

# DateField will accept a date in the following format "YYYY-MM-DD"
date_of_birth = models.DateField()

#DateTimeField will accept a data, time, and timezone in the following format "YYYY-MM-DD HH:MM[:ss[.uuuuuu]][TZ] format."
last_time_at_school = models.DateTimeField()

# DecimalField will take in decimal numbers and you can specify how many decimal places
# are allowed and/or how many overall digits are allowed.
daily_allowance = models.DecimalField(decimal_places = 2)

# IntegerField will take in whole numbers only but does not care if integer holds a positive or negatice value if you want only positive integers utilize PositiveIntegerField
year_of_schooling = models.IntegerField()


# TextField, unlike CharField TextField does not have any maximum character count.
description = models.TextField()

# BooleanField will take in boolean values only
good_pokmon = models.BooleanField()

```

> When defining a model field, you have the ability to set the null=True and the blank=True options. By default, they are False. Knowing when to use these options is a common source of confusion for developers.

| Field Type                                                                                        | Setting null=True                                                                                                                                                                         | Setting blank=True                                                                                                                                                                                                              |
| ------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CharField,<br>TextField,<br>SlugField,<br>EmailField,<br>CommaSeparatedIntegerField,<br>UUIDField | Okay if you also have set both unique=True and blank=True. In this situation, null=True is required to avoid unique constraint violations when saving multiple objects with blank values. | Okay if you want the corresponding form widget to accept empty values. If you set this, empty values are stored as NULL in the database if null=True and unique=True are also set. Otherwise, they get stored as empty strings. |
| FileField,<br>ImageField                                                                          | Don’t do this.<br>Django stores the path from MEDIA_ROOT to the file or to the image in a CharField, so the same pattern applies to FileFields.                                           | Okay.<br>The same pattern for CharField applies here.                                                                                                                                                                           |
| BooleanField                                                                                      | Okay.                                                                                                                                                                                     | Default is blank=True.                                                                                                                                                                                                          |
| IntegerField,<br>FloatField,<br>DecimalField,<br>DurationField, etc.                              | Okay if you want to be able to set the value to NULL in the database.                                                                                                                     | Okay if you want the corresponding form widget to accept empty values. If so, you will also want to set null=True.                                                                                                              |
| DateTimeField,<br>DateField,<br>TimeField, etc.                                                   | Okay if you want to be able to set the value to NULL in the database.                                                                                                                     | Okay if you want the corresponding form widget to accept empty values, or if you are using auto_now or auto_now_add. If it’s the former, you will also want to set null=True.                                                   |
| ForeignKey,<br>OneToOneField                                                                      | Okay if you want to be able to set the value to NULL in the database.                                                                                                                     | Okay if you want the corresponding form widget (e.g. the select box) to accept empty values. If so, you will also want to set null=True.                                                                                        |
| ManyToManyField                                                                                   | Null has no effect                                                                                                                                                                        | Okay if you want the corresponding form widget (e.g. the select box) to accept empty values.                                                                                                                                    |
| GenericIPAddressField                                                                             | Okay if you want to be able to set the value to NULL in the database.                                                                                                                     | Okay if you want to make the corresponding field widget accept empty values. If so, you will also want to set null=True.                                                                                                        |
| JSONField                                                                                         | Okay.                                                                                                                                                                                     | Okay.                                                                                                                                                                                                                           |

## Improving our Pokemon Model

Lets apply some of these fields to our pokmon model with some default values.

```python
from django.db import models
from django.utils import timezone

# Create your models here.
# models.Model tell Django this is a Model that should be reflected on our database
class Pokemon(models.Model):
    # CharField is a character field and has a default max length of 255 characters
    name = models.CharField(max_length=200, unique=True, blank=False, null=False)
    # IntegerField will allow only solid numerical values as input
    level = models.IntegerField(default=1)
    # We are providing a default to someone born Jan 1st 2008
    date_encountered = models.DateField(default="2008-01-01")
    # If a value is not provided we are stating the last time this pokmon was at school was upon creation of the classes instance.
    date_captured = models.DateTimeField(default=timezone.now())
    # If no value is provided the Pokemon description will be "Unkown"
    description = models.TextField(default="Unkown")
    # We must catch them all.
    captured = models.BooleanField(default = False)
```

> We may be tempted to make migrations and enter our Django Python Shell to create a couple of new instances to ensure everythin worked properly, but it's important to backup any existing data before running any kind of migrations onto our database. Our updated Pokemon could cause some unexpected behavior with already existing data and we would have to manually fix it ourselves if we don't properly backup our data. This is where fixtures comes in handy.

### **Fixtures**

> Create a `fixtures` directory inside of our 'Pokemon_app' and a `pokemon_data.json` inside of `fixtures`

```bash
    mkdir pokemon_app/fixtures
    python manage.py dumpdata pokemon_app.Pokemon --indent 2 > pokemon_app/fixtures/pokemon_data.json
```

- You'll see that dumpdata created a new json file inside the fixtures directory

```json
    # Will display each Pokemon Instance in json format
[
    {
        "model": "pokemon_app.pokemon",
        "pk": 1,
        "fields": {
            "name": "Pikachu",
            "level": 12
        }
    }
]
```

> Load Data: will create an instance of a Model corresponding to the JSON object.

```bash
    python manage.py loaddata pokemon_data.json
    Installed 3 object(s) from 1 fixture(s)
```

> Now that our existing data has been backed up, we can move forward and apply the new fields we've added to our model.

```bash
    # Migrate our updated Pokemon Model
    python manage.py makemigrations
    python manage.py migrate

    # Enter Django Python Shell and Create new Pokemon
    python manage.py shell
    >>> from pokemon_app.models import Pokemon
    >>> charizard = Pokemon(name = 'Charizard', level = 25, date_encountered = "2007-04-07", captured = True)
    >>> charizard.save()

    # If I print john now I'll see see a useless Pokemon object
    >>> print(charizard)
    Pokemon object (2)
    >>> exit()
```

## Adding class methods to our Models

We just saw that printing an instance returns a `Pokemon object (#)`, but we want to be able to actually see our Pokemon details. lets add a couple of methods to our Pokemon Model to increase it's usefullness.

```python
    # DUNDER METHOD
    def __str__(self):
        return f"{self.name} {'has been captured' if self.captured else 'is yet to be caught'}"

    # RAISES POKEMON'S LEVEL
    def level_up(self, new_level):
        self.level = new_level
        self.save()

    # Switches Pokemon's captured status from True to False and vise versa
    def change_caught_status(self, status):
        self.captured = status
        self.save()
```

We do not need to `makemigrations` for class methods, so lets go back into our Django Python Shell and test out these methods.

```python
    >>> from pokemon_app.models import Pokemon
    >>> pokemon = Pokemon.objects.all()
    >>> print(pokemon)
    # Now we see John Avalos dunder method
    <QuerySet [<Pokemon: Pikachu is yet to be caught>, <Pokemon: Charizard has been captured>]>
    # lets update his good pokmon status and watch his dunder method change.
    >>> pokemon[0].change_caught_status(True)
    >>> print(pokemon)
    # You can see the Dunder method has changed
    <QuerySet [<Pokemon: Charizard has been captured>, <Pokemon: Pikachu has been captured>]>
    # Lets add another Pokemon instance and move onto fixtures
    >>> blastoise = Pokemon(name = 'Blastoise', level = 37)
    >>> blastoise.save()
```

## Django Admin Site

> When people ask, “What are the benefits of Django over other web frameworks?” the admin is what usually comes to mind.
> Imagine if every gallon of ice cream came with an admin interface. You’d be able to not just see the list of ingredients, but also add/edit/delete ingredients. If someone was messing around with your ice cream in a way that you didn’t like, you could limit or revoke their access.
> So far we've utilized the Django Shell to interact with our models, and although it works, it could definitely be more useful to have a more interactive site. That's where Django admin site comes in.

First lets register our `Pokemon Model` onto Django Admins Site.

```python
    # Pokemon_app/admin.py
    from django.contrib import admin
    # Explecit import of Pokemon Model
    from .models import Pokemon

    # Register your models here.
    admin.site.register([Pokemon])
```

Now before entering our Admin Site with Django we must create a super user to log into our admin site and manipulate our models.

```bash
    python manage.py createsuperuser
    # You'll be prompted to provide a username, email, and password
```

Finally we are ready to enter our Admin Site and interact with our `Pokemon Model`.

```bash
    python manage.py runserver
```

> Once your server is running, open up your browser and go to [http:localhost:8000/admin](http:localhost:8000/admin), log in and you'll have a well constructed user interface to interact with your models. Press `ctrl + C` to kill your server and free your terminal.
