# Python OOP Abstraction & Encapsulation (Decorators, Static Methods vs Instance Methods, Getters and Setters)

## **[Lecture PowerPoint](https://docs.google.com/presentation/d/1-BcmDpQ32uS7J7dOLPRVNQei4rAhCI87bz4zJQtmlYs/edit?usp=drive_link)**

## Topics Covered / Goals

- **Intermediate Object Oriented Programming**
  - Much of the value of OOP comes from calling instance methods on an object, which can refer to that object's specific data using `self` or `this`. However, there are other aspects of OOP that can be useful as well, such as, class methods, getters and setters.
- **Decorators in Python**
  - Decorators are functions in Python that are used to modify how another function behaves. They aren't inherently related to OOP, but we'll start seeing them as we dive deeper into Python, so now is a good time to learn about them.
- **Instance Attributes -vs- Class Attributes**
  - Understanding the different types of variables to use with Classes is important for encapsulating your data, so that data is available only where it needs to be.
- **Instance Methods -vs- Class Methods -vs- Static Methods**
  - Understanding the different types of methods to use with Classes is important for encapsulating your data, so that data is available only where it needs to be.

## Lesson

### Instance Attributes -vs- Class Attributes

- Instance attributes are variables that are unique to each instance of a class that is created (e.g. name)
- Class attributes are variables that are shared between EVERY instance of a class that are created (e.g. dog species)

Let's add some class attributes to our previous Dog class example:

```python
class Dog:
  species = "Canis Lupus Familiaris" # all dogs have the same species type => *class attribute*
  legs = 4

  def __init__(self, name, breed, color, sound):
    self.name = name # each dog has a unique name => *instance attribute*
    self.breed = breed
    self.color = color
    self.sound = sound

fido = Dog("Fido", "Pointer", "white", "woof!")
print(fido.name)
print(fido.species)

lassie = Dog("Scooby", "Mutt", "Scooby-Dooby-Doo!")
print(lassie.name)
print(lassie.species)
```

### Instance Methods -vs- Class Methods -vs- Static Methods

> Just like attributes can belong to either an instance of a class or the class itself, methods can belong to either an instance (`instance methods`) or the class itself (`static methods`). In python, we also have access to `class methods`, which are very similar to `static methods`.
> In this example, we'll create a class for making Pizzas. Since all of our pizzas are circles, it would be useful if our class knew how to calculate the area of a circle. This knowledge is not specific to any one pizza, but is generic functionality that belongs to the class.

```python
import math

class Pizza:
    def __init__(self, radius, ingredients):
        self.radius = radius
        self.ingredients = ingredients

    def area(self):
        return self.circle_area(self.radius)

    @staticmethod
    def circle_area(r):
        return r ** 2 * math.pi
```

> Sometimes, it's useful to have access to the class itself in a static method. We can achieve this using class methods, which are mostly the same as static methods, except that they get the class passed in as an argument. This can be useful if you want to create methods that instantiate objects in specific ways. For example, let's say we noticed that when we create new pizzas, we tend to call the constructor with the same sets of arguments, because people like to order familiar pizzas. We can create class methods to construct specific types of pizzas.

```python
class Pizza:
    def __init__(self, ingredients):
        self.ingredients = ingredients

    @classmethod
    def margherita(cls):
        return cls(['mozzarella', 'tomatoes'])

    @classmethod
    def prosciutto(cls):
        return cls(['mozzarella', 'tomatoes', 'ham'])
```

## Assignments

Start with App Users II. Then do Contact List. **The Caesar Cipher is less important for today, and is more to practice algorithm-style programming problems. However implementing it as a class is a good opportunity to practice writing classes.**

- [App Users II](https://classroom.google.com/c/NjEyMzM5MTczMDQ4/a/NTIyNzMwNTY5MDIw/details) in Python
- **[Contact List](https://classroom.google.com/c/NjEyMzM5MTczMDQ4/a/NTIyNzMwNjI0MjU1/details) in Python**
- [Caesar Cipher](https://classroom.google.com/c/NjEyMzM5MTczMDQ4/a/NjEyNjQyNDY2NzI2/details) in JS/Python

> Stuck? Have a code error? Use the ["4 Before Me"](https://docs.google.com/document/d/1nseOs5oabYBKNHfwJZNAR7GlU0zkZxNagsw63AD7XV0/edit) debugging checklist to help you solve it!
