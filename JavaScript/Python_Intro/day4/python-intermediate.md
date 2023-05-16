# Python List Methods and Modules

## Topics Covered / Goals

- Understand how to find an item in a list or dictionary
- Understand switch cases
- Understand lambda functions
- Understand list methods map(), filter(), sort(), reduce()
- Understand Try-Except error handling
- Understand files in python. (relative vs. absolute paths)

## Lesson

### Finding an item in a list

To find an item in a list you can simply use the `if` and `in` keywords

example:

```py
modes_of_transportation = ['car', 'bicycle', 'van', 'truck', 'motorcycle']

if 'car' in modes_of_transportation:
    print(True)
else:
    print(False)
```

### Finding an item in a dictionary

Similarly, you can find out if a key is in a certain dictionary by using the `in` keyword.

```py
foods = {
    "donuts": "icky!",
    "green beans": "yummy!",
}

if 'donuts' in foods:
    print(True)
else:
    print(False)

# or

if 'donuts' in foods.keys():
    print(True)
else:
    print(False)

```

You can also search the values by using the `.values()` function

```py
foods = {
    "donuts": "icky!",
    "green beans": "yummy!",
}

if 'scrumptious' in foods.values():
    print(True)
else:
    print(False)
```

### Switch Cases

- An alternative way to writing many `elif` statements if you wanted to execute multiple conditionals is using the `match` and `case` keywords

```py
lang = input("What's the programming language you want to learn? ")

match lang:
    case "JavaScript":
        print("You can become a web developer.")

    case "Python":
        print("You can become a Data Scientist")

    case "Java":
        print("You can become a mobile app developer")
    
    case "PHP":
        print("You can become a backend developer")
    
    case "Solidity":
        print("You can become a Blockchain developer")    
    
    case _:
        print("The language doesn't matter, what matters is solving problems.")
```

### Lambda functions

- temporary, unnamed ("anonymous") functions

```python
## typical function example
def add_one(x):
    return x + 1

print(add_one(7)) # output would be 8

## lambda function example
add_two = lambda x : x + 2

print(add_two(7)) # output would be 9
```

### List Methods

#### **map()**

- creates a new list, using a function that returns a new item

```python
my_list = [1,2,3,4,5,6,7,8,9,10]
new_list = map(lambda item : item + 2, my_list)
for x in new_list:
    print(x)

print(list(new_list)) # need to cast as a list
## [3,4,5,6,7,8,9,10,11,12]
```

#### **filter()**

- creates a new list, using a function that returns a bool (True => include item in new list)

```python
my_list = [1,2,3,4,5,6,7,8,9,10]
new_list = filter(lambda item : item % 3 == 0, my_list)
for x in new_list:
    print(x)

print(list(new_list)) # need to cast as a list
## [3,6,9]
```

#### **reduce()**

- creates a single value, using a function that aggregates values

```python
import functools
my_list = [1,2,3,4,5,6,7,8,9,10]
sum = functools.reduce(lambda agg, item : agg + item, my_list)
print(sum)
```

#### **sort()**

```python
people = [
    {
        'name': 'alice',
        'age': 44,
        'job': 'influencer',
    },
    {
        'name': 'bob',
        'age': 49,
        'job': 'dog walker',
    },
    {
        'name': 'carol',
        'age': 35,
        'job': 'life coach',
    },
]
# This sorts the original list
people.sort(key=lambda k : k['age'])

# key is a 1-argument function that describes how to sort the list.
# This returns a new list (original list is not modified)
people_sorted = sorted(people, key=lambda k : k['age'],reverse=True) 
```

### Dictionary - zip

#### **zip**

```py
numbers = [1, 2, 3]
letters = ['a', 'b', 'c']
zipped = zip(numbers, letters)
print(zipped)  # Holds an iterator object
#<zip object at 0x7fa4831153c8>
print(type(zipped))
#<class 'zip'>
print(list(zipped))
[(1, 'a'), (2, 'b'), (3, 'c')]
```

#### **Create dictionary from 2 lists**

```py
stocks = ['reliance', 'infosys', 'tcs']
prices = [2175, 1127, 2750]
dictionary = dict(zip(stocks, prices))
print(dictionary)
# output {'reliance': 2175, 'infosys': 1127, 'tcs': 2750}
```

### Try-Except

> When building an application, your code doesn't always run the way you expect it to, and sometimes it throws an error! We can use try/except to write code that we think might throw an error, and then prepare an alternate plan in case the code fails.

```python
try:
    a = 1
    b = 2
    c = "donuts"    
    d = a + b
    print(d)

    e = a + c # error
    print(e)
except:
    # handle exception
    print("BOO! there was an error")
else:
    # handle success
    print("YAY! there was no error")
finally:
    # always execute regardless of exception or success
    print("donuts are yummy!")
```

## Modules, Packages, Libraries, and Frameworks

- Modules, libraries, frameworks, and packages are just code that someone else wrote ahead of time to make your life as a developer easier. There is no magic here - it's just meant to make your life easier and for you to make more robust applications
- There are a number of package managers to manage the different libraries we will use. The most popular package manager for Python is Pip, and the most popular (and default) package manager for Javascript is npm.
- You can find some very useful libraries [here](https://pythontips.com/2013/07/30/20-python-libraries-you-cant-live-without/). We'll be using Django in the next few weeks. If you go the data science route, there are some data science heavy libraries like NumPy and Pandas

You can also write your own modules, which allows for you as the author to organize your code and group it together for ease of use. To put it very simply, a module is a file of Python code that you bring into other files. Let's take a look at an example:

### Python modules

- Modules are simply files with the “. py” extension containing Python code that can be imported inside another Python Program.

```python
## file1.py
def say_hello():
    print('Hey there')
def say_goodbye():
    print('Bye bye')
## file2.py
import file1
import file1 as anything
from file1 import say_goodbye
anything.say_hello()
say_goodbye()
```

We just created two files: `file1.py` and `file2.py`. `file1.py` has a `say_hello` and a `say_goodbye` function. `file2.py` has nothing in it, but imports that file in as the name of the file and we can use all the methods in that file. We can also rewrite it as `import file1 as anything` and call `anything.say_hello()`. You can `import` anything into your file by providing the correct relative path to the file. More on that can be found under external resources.

### File Paths

In some occasions, your python code will have to interact with files on your computer.

A file has two key properties, a `filename` and a `path`.

The `filename` is simply the name of the file and the part of the `filename` after the `.` is called the file's `extension` which tells you what type of file this is. For example a `.py` file is a python file, and a `.docx` is a word document.

The path specifies the the location of the file on your computer.

Example:
> UNIX: /Users/myname/Desktop
> Windows: C:\User\myname\Desktop

**Note the difference in slashes used.

In python, the `os` library helps us access some of the operating system's functions and gives us some methods that make it easier for us to access the path.

```py
import os
os.getcwd()    # get the current working directory
```

There are two types of file paths. `Absolute` and `Relative`.

`Absolute` paths always begin at the root folder of the computer

`Relative` paths are relative to the working directory of the python file that is being run

To find the `absolute` path to your python file you can use

```py
import os

os.path.abspath('.')
```

### Reading and writing files

Reading a file using the `relative` path:

```py
with open('./example.txt', 'r') as file:
    for line in file:
        print(line)

```

Reading a file using the `absolute` path:

```py
import os

abs_path = os.path.abspath('./example.txt')
print(abs_path)

with open(abs_path, 'r') as file:
    for line in file:
        print(line)
```

To write to a file, change the flag to `'w'` to write over the entire file or `'a'` to append to the end of the file.

## Resources

- [Python vs. JavaScript](https://realpython.com/python-vs-javascript/#javascript-vs-python)
- [Python Modules](https://www.tutorialspoint.com/python/python_modules.htm)
- [Python/JS import syntax comparison](https://www.saltycrane.com/blog/2015/12/modules-and-import-es6-python-developers/)

## Assignments

- [Armstrong Numbers](https://github.com/Code-Platoon-Assignments/algo-armstrong-numbers) in Python
- [Anagrams I](https://github.com/Code-Platoon-Assignments/algo-anagrams-i) in Python
- [Sum Pairs](https://github.com/Code-Platoon-Assignments/algo-sum-pairs) in Python
- [Credit Check](https://github.com/Code-Platoon-Assignments/algo-credit-check) in Python
- [Debug Deaf Grandma](https://github.com/Code-Platoon-Assignments/debug-deaf-grandma) in Python
