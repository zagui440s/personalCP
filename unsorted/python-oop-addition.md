- If we save this and run the file, we don't get any errors. That being said, we also aren't doing anything with this class. Let's give it some class variables:
```python
class Dog:
    eyes = 2
    legs = 4

    def display_info(self):
        print(f"Dogs have {self.eyes} eyes and {self.legs} legs")

fido = Dog()
fido.display_info()
```
- The `self` keyword is extremely important in Python. Without `self`, the program does not know what class to look in to call methods or variables. 

- We created **class variables** earlier. Those variables can be used across all instances of a class. Take a look at the code we have below:
```python
class Dog:
    eyes = 2
    legs = 4

    def display_info(self):
        print(f"Dogs have {self.eyes} eyes and {self.legs} legs")

bibo = Dog()
bibo.display_info()

fifo = Dog()
fifo.display_info()
```
- both dogs both get to share that class variable. That being said, each dog is unique and has things that are unique. If we had to create a dog factory, we want to make sure they all come out with 2 eyes and 4 legs (class variables), but there are things that make each dog unique, called `instance attributes`:
```python
class Dog:
    eyes = 2
    legs = 4

    def __init__(self, name, breed, color):
        self.name = name
        self.color = color
        self.breed = breed
    
    def display_info(self):
        # Below is a multi-line string that is going to print out. Note the specific indentation when you print it out
        print(f"""
{self.name} is a {self.color} {self.breed}.
It has {self.eyes} eyes and {self.legs} legs
        """)

# There are two ways of instantiating a Dog
bibo = Dog(name='Lucky', breed='Golden Retriever', color='gold') 
fifo = Dog('Lassie', 'Border Collie', 'black and white')

bibo.display_info()
fifo.display_info()
```
- The `self` in front of the variables in the `__init__` method makes it an `instance` attribute, meaning that it is available everywhere within that instance of the class. Don't confuse this with a `local` variable. A local variable is only local to the method it's defined in. Instance variables can go across methods


## Class Variables
- Let's take a closer look at class variables. They definitely have their place in certain cases, like the example we have below:
```python
class Employee:
    number_of_employees = 0
    raise_amount = 1.04

    def __init__(self, first_name, last_name, pay):
        self.first_name = first_name
        self.last_name = last_name
        self.pay = pay
        self.email = f"{first_name}.{last_name}@email.com".lower()
    
        Employee.number_of_employees += 1 # This line will increase the class variable "number_of_employees" across all instances of the Employee class
    
    def apply_raise(self):
        self.pay = int(self.pay * self.raise_amount)

employee_1 = Employee('Alice', 'Kay', 50000)
Employee.number_of_employees
employee_2 = Employee('Gordo', 'Pat', 51000)
Employee.number_of_employees
```

That being said, there are times where you don't want to have class variables. Take a look at this example:
```python
class Dog:
    tricks = []             # mistaken use of a class variable

    def __init__(self, name):
        self.name = name

    def add_trick(self, trick):
        self.tricks.append(trick)

d = Dog('Fido')
e = Dog('Buddy')
d.add_trick('roll over')
e.add_trick('play dead')
d.tricks                # unexpectedly shared by all dogs
# => ['roll over', 'play dead']
```

Instead, we want to focus mostly on using local and instance variables. We can rewrite the above as:
```python
class Dog:

    def __init__(self, name):
        self.name = name
        self.tricks = []    # creates a new empty list for each dog

    def add_trick(self, trick):
        self.tricks.append(trick)

d = Dog('Fido')
e = Dog('Buddy')
d.add_trick('roll over')
e.add_trick('play dead')
d.tricks
# => ['roll over']
e.tricks
# => ['play dead']
```
