# Python OOP Inheritance

## Topics Covered / Goals

- Understand when and why to use inheritance in your code
- Understand the relationship between child classes and parent classes
- Understand the use of `super` in OOP and when to use it
- Understand different types of multiple inheritance:
  - one parent with multiple children
  - one child with multiple parents
- Composition vs Inheritance
  - Examples

## Lesson

### Review of Classes

Let's review what we know sofar. First, let's restate the _why_ behind classes, in code:

```python
# before classes
def eat(catName, food):
    print(f"{catName} eats a {food}.")


def meow():
    print("meow meow!")


cat1 = {"name": 'Whiskers', "eat": eat, "meow": meow}
cat2 = {"name": 'Katy Purry', "eat": eat, "meow": meow}

print(cat1["name"])
cat1["meow"]()
cat1["eat"](cat1["name"], "mouse")

# after classes


class Cat:
    def __init__(self, name):
        self.name = name

    def eat(self, food):
        print(f"{self.name} eats a {food}.")

    def meow(self):
        print("meow meow!")


cat3 = Cat("Garfield")

print(cat3.name)
cat3.meow()
cat3.eat("mouse")
```

So what did introducing classes buy us? The code is definitely a bit cleaner, but why? When we rely on basic dicts, there are fewer 'guarantees' about the object in question, so we can't simply 'know' a random dict has a key called 'name', and while our dict can hold functions, we have to be explicit about all the arguments we pass it. With the introduction of the class `Cat` we simplify a lot of that, a class is _guaranteed_ to have a field called 'name' and functions that work with this class (methods) have direct access to the object in question in the form of the `self` keyword, so everything ends up much more concise and less repetitive.

Now let's eplore this idea further by creating two classes, `Cat` and `Dog`:

```python
class Cat:
    def __init__(self, name):
        self.name = name

    def eat(self, food):
        print(f"{self.name} eats a {food}.")

    def meow(self):
        print("meow meow!")


class Dog:
    def __init__(self, name):
        self.name = name

    def eat(self, food):
        print(f"{self.name} eats a {food}.")

    def bark(self):
        print("BARK BARK!")


garfield = Cat('Garfield')
garfield.eat('tuna')
garfield.meow()

spot = Dog('Spot')
spot.eat('steak')
spot.bark()
```

Based on our definition every instance of `Cat` has an attribute called `name` and also has the methods `eat()` and `meow()`. Similarly every instance of `Dog` has an attribute called `name` and also has the methods `eat()` and `bark()`. Our `Cat` and `Dog` classes look awfully similar!

### Motivation Behind Object Inheritance

Our `Cat` and `Dog` classes _are_ awfully similar. This isn't suprising when you think about what they are meant to represent - both are examples of a common idea called 'animal'! Objects are usually not completely seperate and isolated, they can often be thought of as defined by a hierarchy of concepts - so Whiskers is a (specific) Cat, which is a type of Feline, which is a type of Animal, which is a type of LivingThing and on and on ...

Going up a level higher in abstraction, we could see how `Cat` and `Dog` aren't totally unique as classes, we could generalize the idea to `Animal`. Just like `Cat` only captures the generalized nature of a specific cat, an `Animal` class could capture just the elements both `Cat` and `Dog` have in common.

In Python, we could capture this idea of a generalized class with 'inheritance', the syntax of which is below:

```python
# read as 'Cat is an Animal', or more specifically 'Cat inherits from Animal'
class Cat(Animal):
    ...
```

With 'inheritance', we can create a common 'parent class' (`Animal`) for both of our 'child classes' (`Cat` and `Dog`) to inherit from, so the common overlap is captured by the parent.

```python
class Animal:
    def __init__(self, name):
        self.name = name

    def eat(self, food):
        print(f"{self.name} eats a {food}.")

    def speak(self):
        print("I'm an animal!")

class Dog(Animal):
    # bark() is unique to Dog, it doesn't appear on a generic Animal
    def bark(self):
        print("bark bark!")

    # speak() was defined on Animal but here we (explicitly) override what was inhertited
    def speak(self):
        self.bark()


class Cat(Animal):
    def meow(self):
        print("meow meow!")

    def speak(self):
        self.meow()


# note we didn't define __init__() on Cat or Dog, they were (implicitly) inherited
lucky = Cat('lucky')
fido = Dog('fido')
# they both (implciitly) inherit eat as well
lucky.eat('mouse')
fido.eat('chicken nugget')
# they both inherit speak, but it's effect is different for each subclass because it was (explicitly) overridden
lucky.speak()
fido.speak()
# they have their own methods (naturally)
lucky.meow()
fido.bark()

# but not those of their 'siblings' (naturally)
try:
    lucky.bark()
except Exception as error:
    print(f"{type(error).__name__}: {error}")

try:
    fido.meow()
except Exception as error:
    print(f"{type(error).__name__}: {error}")
```

So `class Cat(Animal):` indicates that `Cat` is a newly defined class that inherits from `Animal` (we would read this out loud as 'Cat _is_ an Animal'). As such, `Cat` and `Dog` have access to all of the methods from `Animal`, even `__init__`.

> It might seem a little unintuitive but note that the child class is always 'bigger' than the parent. This is where the parent/child metaphor breaks down. Rather, think of the parent as a generalized blueprint and the child as a more specific blueprint. All `Cats` are `Animals`, but not all `Animals` are `Cats`, which explains why a `Cat` can do anything an `Animal` can do (because a `Cat` _is_ an `Animal`) but there are things specific to a `Cat` (`Cats` can meow, but `Animals` can't, because many `Animals` don't support that 'feature')

### **super()**

Sometimes, we'll want to define a child class that doesn't use the exact same methods as its parent, but we don't want to override it entirely, like we just did with `speak`. We can use the `super()` method to access an instance of the parent class, call any of its methods from the child class, and then add more custom logic afterwards. super() returns an internal representation of the superclass that allows you to call that superclass’s methods. This is commonly used to repeat the `__init__` method from the parent class, and then add an extra property at the end.

For example, a difference between dogs and cats is that a dog can be a registered service animal, whereas a cat cannot, so let's represent this in code:

```python
class Animal:
    def __init__(self, name):
        self.name = name

    def eat(self, food):
        print(f"{self.name} eats a {food}.")

    def speak(self):
        print("I'm an animal!")


class Dog(Animal):
    def __init__(self, name, is_service_animal):
        # use the logic from the parent Animal class without duplicating code
        super().__init__(name)
        # add some Dog-specific __init__() logic
        self.is_service_animal = is_service_animal

    def speak(self):
        # notice how both 'is_service_animal' (Dog instance variable) and 'name' (Animal instance variable) are directly accessible through self
        if self.is_service_animal:
            print(f"{self.name} at your service")
        else:
            print("BARK BARK!")


fido = Dog('Fido', False)
sparky = Dog('Sparky', True)

fido.speak()
sparky.speak()
```

#### 'Internal Representation'

This can be an odd point to grasp about inheritance, but it helps to understand what inheritance and `super()` are doing, exactly. Whenever a subclass inherits from a parent class, we can think of it as having an 'internal representation' of that parent, essentially an instance variable that refers to everything the parent class can do. So instead of ever using `super()` we could write something like:

```python
class Animal:
    def __init__(self, name):
        self.name = name

    def eat(self, food):
        print(f"{self.name} eats a {food}.")

    def speak(self):
        print("I'm an animal!")


class Dog():
    def __init__(self, name, is_service_animal):
        self.internal_repr_animal = Animal(name)
        self.is_service_animal = is_service_animal

    def speak(self):
        if self.is_service_animal:
            print(f"{self.internal_repr_animal.name} at your service")
        else:
            print("BARK BARK!")


fido = Dog('Fido', False)
sparky = Dog('Sparky', True)

fido.speak()
sparky.speak()
```

Note that we didn't specify that `Dog` inherited from `Animal`, instead we simply had our `Dog` class hold onto an instance variable called 'internal_repr_animal' of type `Animal`. This is exactly what inheritance is doing under the hood, and calls to `super()` are equivalent to referencing this 'internal_repr_animal' instance variable. The main problem with this approach is that we need to remember what belongs to the 'parent' vs the actual class, so we can't simply write `self.name` but have to write the more awkward `self.internal_repr_animal.name`. With inheritance and `super()` we clean this up ever so slightly so the distinction between what was uniquely defined on the class and what it inherited from a 'parent' is purposefully blurred.

### Multiple Inheritance

The examples above demontrate the most common use of inheritance, where you have multiple child classes that all inherit from a common parent class. All programming languages that support OOP have this feature, but Python actually goes a step further and allows a child class to inherit from _multiple_ parents.

```python
import math


class Person:
    def __init__(self, name, job):
        self.name = name
        self.job = job

    def work(self):
        print(f"{self.name} is working hard as a {self.job}.")


ben = Person("Ben", "teacher")
ben.work()

# just to break up the output a little
print()


class Computer:
    def __init__(self, number_of_cores):
        self.number_of_cores = number_of_cores

    def compute(self):
        pi = round(math.pi, self.number_of_cores)
        print(f"Computing pi to {self.number_of_cores} decimal places: {pi}")


toaster = Computer(1)
toaster.compute()

chappy = Computer(4)
chappy.compute()

print()


class Cyborg(Person, Computer):
    # note the meaning of 'super()' is ambiguous when inheriting from multiple parents
    # so this is how you reference the specific (internal) parent object instead
    def __init__(self, name, job, number_of_cores):
        Person.__init__(self, name, job)
        Computer.__init__(self, number_of_cores)

    def work(self):
        print(f"{self.name} has the strength of {self.number_of_cores} men! Watch:")
        for n in range(self.number_of_cores):
            Person.work(self)
        print("And he is still a fully functioning computer!")
        Computer.compute(self)


terminator = Cyborg('Arnold', 'terminator', 8)
terminator.work()
```

#### Why Most Languages Don't Support Multiple Inheritance

When we do OOP in JavaScript you will notice multiple inheritance is not a feature it supports, it's actually a somewhat controversial feature because it is easy to shoot yourself in the foot with it. Here's why:

```python
class Mother:
    def __init__(self):
        self.first_name = "Sandra"
        self.last_name = "Wilensky"


class Father:
    def __init__(self):
        self.first_name = "Harris"
        self.last_name = "Cohen"


class Child(Mother, Father):
    def __init__(self):
        # try swapping the order of these initalization statements
        Father.__init__(self)
        Mother.__init__(self)

        self.first_name = "Benjamin"

    def print_full_name(self):
        print(f"{self.first_name} {self.last_name}")


ben = Child()
ben.print_full_name()
```

This is a contrived example but it demonstrates a tricky aspect of multiple inheritance. As a rule, we want to call `__init__()` on the parent class before specifying anything unique to the child, that way any naming conflict between the two result in the specified child version. But what about when we have multiple parents classes? If the parents share a naming conflict that isn't explicitly overwritten in the child's `__init__()` then the order in which the parents are initialized is going to decide what the final state of `self` looks like. This isn't an endgame scenario, but it means a class might need to know a fair amount about all the classes it inherits from and where they overlap and it can get finicky fast. This brings us to the 'composition vs inheritance' debate where we will learn the alternative to inheriting from multiple parents (or inheriting at all).

### Composition vs Inheritance

Inheritance is a useful tool for abstraction and eliminating code duplication, but like most programming concepts misuse of it can be disastrous. When OOP took off in the 90's programmers were gung-ho about it and used objects everywhere, and for everything, and inheritance seemed like a great idea to cut down on code repetition. The problem however is that inheritance really is designed for a specific sort of relationship: `A *is a* B`. This works really well for some forms of class relationship, so for example:

- a 2007 Lexus ES350 _is a_ FourDoorSedan
- a FourDoorSedan _is a_ Car
- a Car _is a_ Vehicle

You could see how this would be a meaningful hierarchy to build for a company like Carvana that deals with many types of vehicles and might want to capture the generalized properties of each level of the hierarchy to avoid too much code duplication.

However what about the above multiple inheritance example, was that a good use of inheritance? Ask yourself, do you like this sentence: "Child _is a_ Father and Mother"? Were not quite capturing the relationship, are we? This is where the idea of object 'composition' comes in: object composition simply means 'objects that contain other objects'. So we would render this in plain English as something closer to `A *has a* B`. This tends to be a more natural fit for many types of relationships. So a Child isn't a Mother or a Father, but it _has_ a Father and a Mother. Updating the example above to prefer a compositional approach we might see something like:

```python
class Mother:
    def __init__(self):
        self.first_name = "Sandra"
        self.last_name = "Wilensky"


class Father:
    def __init__(self):
        self.first_name = "Harris"
        self.last_name = "Cohen"


class Child():
    def __init__(self):
        self.first_name = "Benjamin"
        self.father = Father()
        self.mother = Mother()

    def print_full_name(self):
        print(f"{self.first_name} {self.father.last_name}")


ben = Child()
ben.print_full_name()
```

It's a small change but it eliminates unnecessary ambiguity, because we are now properly modeling the nature of the relationship. A Child _has a_ Mother and Father, and can keep track of who the specific instance of that Mother and Father is, but there is no inheritance type relationship, and therefore no concern over naming conflicts or overriding behavior. You will generally get less code-reuse out of composition vs inheritance but it's paramount that the nature of the relationship is modelled apporpriately, especially as a project scales up.

#### When to Use Inheritance

The modern wisdom is to **'prefer composition over inheritance'**. Composition allows more flexibility when updating how a class works, in that it is easier to add or remove a given 'has a' relationship without seriously altering how other related classes work. This is because with composition you are always keeping a distict reference to the thing your class 'has a' realtionship with, which is also it's downside, so as opposed to simply referencing `self.last_name` you will need to keep track of an instance variable called `father` and reference `self.father.last_name`.

This doesn't mean inheritance isn't useful or important as a tool, but rather that inheritance should be reserved only for cases where some object really is a more specific version of some generalized parent class.

#### Examples

Let's consider some examples of composition and inheritance in a given domain you might be trying to model. Imagine you worked for a gardening business that kept a detailed representation of it's client's gardens. That might look like:

```python
class Client():
    def __init__(self):
        # a single client could have multiple Gardens, held in an array
        self.gardens = []
        self.payment_info = ...

class Garden():
    def __init__(self, garden_items):
        #  representation of where this garden is located
        self.address = ...
        # an array holding GardenItems within the garden
        self.garden_items = garden_items

# a generic superclass that all GardenItems have in common
class GardenItem():
    ...

class Grass(GardenItem):
    ...

class Schrub(GardenItem):

# a generic superclass that all Trees have in common
class Tree(GardenItem):
    ...

class Maple(Tree):
    ...

class Oak(Tree):
    ...

benjamin = Client(...)
# maybe the GardenItem initilaizer takes an id representing the type of that GardenItem
benjamins_garden = Garden(Grass(1), Schrub(4), Schrub(12), Maple(), Oak())
benjamin.append_garden(benjamins_garden)
```

Alternatively let's consider a banking scenario:

```python
class Customer():
    def __init__(self):
        self.monthly_statement = None
        self.accounts = []

    def add_account(self, new_account):
        self.accounts.append(new_account)

    def generate_monthly_statement():
        self.monthly_statment = ...
        return self.monthly_statment.__str__();

class MonthlyStatement():
    ...

class Account():
    ...

class CheckingAccount(Account):
    ...

class SavingsAccount(Account):
    ...

class CreditAccount(Account):
    ...

benjamin = Customer(...)
savings = SavingsAccount(...)
checking = CheckingAccount(...)

benjamin.add_account(savings)
benjamin.add_account(checking)

print(benjamin.generate_monthly_statement())
```

## External Resources

- [Python super() method](https://realpython.com/python-super/)
- [Method Resolution Order(MRO)](https://www.educative.io/edpresso/what-is-mro-in-python)

## Assignments

Please Start with School Interface I. Then follow with the Boggle exercise, and lastly App Users III

> **Note:** Today in particular has several larger assignments! It is OK if you don't finish them all today.

- [School Interface I](https://classroom.google.com/c/NjEyMzM5MTczMDQ4?cjc=vunqfsg)
- [Boggle I](https://classroom.google.com/c/NjEyMzM5MTczMDQ4?cjc=vunqfsg)
- [App Users III](https://classroom.google.com/c/NjEyMzM5MTczMDQ4?cjc=vunqfsg) in Python
- [Boggle II](https://classroom.google.com/c/NjEyMzM5MTczMDQ4?cjc=vunqfsg)
