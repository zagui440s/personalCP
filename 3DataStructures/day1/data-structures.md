# Data Structures


## Topics Covered / Goals
- Know what a data structure is and understand their purposes
- Learn the different types of data structures and the main operations/methods associated with each
    - Stacks and Queues 
    - Linked lists
    - Hash Tables
    - Binary Search Trees


## Lesson
A data structure is a data organization, management, and storage format that enable efficient access and modification of data. In other words, a data structure is a collection of data values, the relationships between them, and the functions or operations that can be performed on them. 

So far, we've come across a few data structures like arrays (lists) and dictionaries (objects). There are many more data structures and today we'll look at some of the most common ones. 

### Why does this matter? Why is there more than one data structure?

Different data structures have different characteristics and can perform different operations at different speeds. Depending on which operations you need to perform most often, you might choose a data structure that prioritizes those operations over others. 

And learning how to choose the appropriate data structure for a problem is a big part of solving that problem efficiently.


For example adding an element to an unsorted array would be pretty fast if we just append to the end. However, trying to search that array would probably take longer since we don't know where 

```py
data = ['a', 'x', 'y', 'g', 'n','b']

data.append('L') # adds 'L' to the end of the array - O(1)

data.insert(0, 'q') # adds 'q' to the start of the array - O(n) since it has to shift all elements over

location_of_g = data.index('g') # searching for a value in an array - O(n)
```
vs. a sorted array, where searching is faster but adding an element would take longer since we have to keep the array sorted

```py
# a sorted array of letters
data = ['a', 'c', 'l', 'm', 'r', 't', 'x']
data.addButKeepSorted('n') #  O(n)

# searching a sorted list is O(log n), because we can use binary search
```

> "Bad programmers worry about the code. Good programmers worry about the data structures and their relationships" - Linus Torvalds


## Arrays
> Javascript has a data structure called array. that's not exactly what we're talking about today.  

An array is a collection of similar data elements that are stored at contiguous memory locations.

Having all the data for your array in adjacent slots in memory makes searching and retrieving items faster. If you try to push to an array that is full, your computer needs to create a new, larger array, copy the old array to the new one, and delete the old one. 


## Stacks
A stack is a data structure that only allows adding to the top of the stack (`push()`) and to remove from the top of the stack (`pop()`)

> a stack is like a list in python, if we could only modify it with `push()` and `pop()`. 

Stacks process items in LIFO order (last in, first out) and typically have (at minimum) the following API:

- push - add an item to the top
- pop - remove an item from the top and return that item
- size - return the number of elements in it
    
Sometimes you will also see

- peek - return the value of the item currently on the top


## Queues
A queue is similar to a stack in that 
> a queue is a like a list, if we could only modify the first item with `enqueue()`, and remove the last item `dequeue()`. 
A customer service help line would be a good example of a queue


## Linked lists
A linked list is a non-contiguous data structure, meaning the elements of a linked list are not necessarily next to each other in memory.

Each element in a linked list is called a node and this node holds a `value` (the data value that we are holding) and `next` which contains a reference to the next element

The first node in the linked list is called the `head` and it's used as the starting point for iteration through the list

- a singly linked list - each node has a reference to the next node
- a doubly linked list - each node has a reference to the next node and also the previous node

In linked lists, you will typically see some form of `add`, `remove`, and `get` methods that will allow interaction with the list itself.


## Hash tables
Hash tables allow you to create a list of key-value pairs. After creating a pair, you can retrieve a value using the key for that value.

### hashing
- a hashing function takes some value as input, and returns a hash, an integer in this case. 
- hashing is a one-way operation. while it's generally fast to hash a value, there is no straightforward way to reverse a hash
- hashing the same input always produces the same output (no randomness)
- it is possible, but unlikely, that multiple values will have the same hash (hash collision) 

```py

class HashTable :
    def __init__(self) :
        
        self.table = [[] for i in range(64)]   # creates a list of 64 lists


    # given a key, this function should return a numerical index, which we can use to access the table above
    def _hash(self, key):
        hash = 0
        for char in key:
            hash += ord(char)  # returns an integer representing a unicode character

        return hash % len(self.table)


    def set(self, key, value):
        index = self._hash(key)
        self.table[index].append([key,value])
    

    def get(self, key):
        index = self._hash(key)

        for data in self.table[index]:
            if data[0] == key  :
                return data[1]
            


myHash = HashTable()

myHash.set('name', 'alice')
myHash.set('age', 34)
myHash.set('mane', 'luxurious') # this key will cause a hash collision with 'name', because they are anagrams

print(myHash.table)
print(myHash.get('name'))
print(myHash.get('age'))
print(myHash.get('mane'))

```
## Trees
A tree is a data structure with a root node, which can have many child nodes, which each can have many child nodes.

There are many types of trees each having their own way for organizing and retrieving data but most common

### Binary trees
A binary tree is a tree where each node has at most two children. 

Typically each node contains a`value`, `left` which is a reference to the left child node, and `right` which is a reference to the right child node.

A `binary search tree` is a binary tree in which each left node is smaller than each right node. This structure can be searched efficiently using binary search. 

When traversing a tree you typically there are different ways to traverse a tree

** Note: a B-Tree is NOT a binary tree. It's similar, but can have more than 2 children per node, depending on the order of the tree (a 4th order tree has at most 4 children per node). These are commonly used in popular databases. 


## Other data structures you might hear of
- AVL-trees - a binary tree that has balanced sub-tree heights

- Graphs - a data structure that represents a graph with vertices and edges connecting those vertices. 
[Read more about graphs and how they're represented in code](https://www.geeksforgeeks.org/graph-and-its-representations/)

## Resources
- [Data structure visualization](https://cmps-people.ok.ubc.ca/ylucet/DS/Algorithms.html)
- [Data structures in the indunstry](https://blog.pragmaticengineer.com/data-structures-and-algorithms-i-actually-used-day-to-day/amp/)


## Assignments
- [Data Structures](https://github.com/tangoplatoon/algo-data-structures)

If you are done and want more data structures practice let us know!

If you are done and want some more oop practice:
- [Bank Accounts](https://github.com/tangoplatoon/oop-bank-accounts)


