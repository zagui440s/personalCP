# Data Structures


## Topics Covered / Goals
- Learn what a data structure is and why it matters

- Learn some different data structures and the main operations/methods associated with each
    - Arrays
    - Linked Lists
    - Stacks and Queues 
    - Hash Tables
    - Binary Search Trees


## Lesson

### Data Structures

In computer science, a data structure is a way of organizing and storing data in a computer's memory. It provides a means for efficiently accessing and manipulating the data. As you will see, you have been working with data structures all along, so some are already familiar to you, like strings, arrays, and JS objects/Python dictionaries. However there is an important distinction between the data types a specific programming language provides and the 'official' version of the related data structure. So for example, arrays in JavaScript are more powerful then the official concept of an Array in terms of data structures, and the reason for this is because JS is a high-level language and can hide a lot of the complexity under the hood. We will explain these differences when appropriate, but it is good to think of data structures in a language-agnostic way to begin with.

### Why does this matter? Why is there more than one data structure?

Different data structures have different characteristics, advantages, and use cases. The choice of a data structure depends on the type of operations to be performed, the efficiency required, and the constraints of the problem at hand. Selecting an appropriate data structure is crucial for designing efficient algorithms and optimizing performance in computer programs.

This idea of measuring performance in the abstract is known as 'complexity analysis', sometimes colloqially known as 'Big O anlysis', which we will eventually go into more depth about later this week.

Before we can dive into any specific data structure however, we need to explain how computer memory works.

### Memory

Memory in a computer can be thought of as a contiguous block of identically sized 'slots', like so:

![memory](./page-resources/memory.png)

Think of memory like a single long street, with plots of land of identical size, one after the other.

Like a street, we can think of each spot in memory as having an 'address', and in this case the address is relative to the beginning of the street, and the size of a plot of land.

![memory addresses](./page-resources/memory-adresses.png)

What I have described here is an example of a 32-bit architecture - i.e. the standard size of a 'thing' in this memory structure is 32 bits, or 4 bytes. In reality memory addresses are usually described in terms of hexadecimal, so you will often see a memory address look like '0x1047cc0f0'. Even though we don't usually consider memory locations in a high-level language like Python, we can see this concept with the built in `id()` function.

```py
x = 1 # create a variable called x and store a 1 in it
id(x) # the memory location of x, as a decimal (4370252016)
hex(id(x)) # the memory location of x, as hexadecimal (0x1047cc0f0)
```

For the purposes of this lesson we will assume that all primitive values we represent in memory (integers, floats, characters, booleans) can fit within this amount of space. Bigger things could obviously be store in multiple of these locations one next to the other, but this point will be important once we start talking about arrays.

So for example, if 32-bits represents a single slot in memory, and an individual character can be stored in a single slot, a string might look like this in memory:

![hello memory](./page-resources/hello-memory.png)

Now that we understand the basic structure of computer memory, we can move on to the most essential data structure - Arrays!

### Arrays

Javascript has a data type called array and Python has a data type called a list, and both of these types roughly approximate the concept of an Array, but are ultimately more powerful that the base idea in data structure speak. For now, let's consider the concept of an array in the abstract.

An **Array** is a collection of elements of the same data type that are stored at contiguous memory locations. An example:

```py
nums = [1, 4, 12, 7, 2]
```

![num array](./page-resources/num-array.png)

`nums` is a variable that *refers* to the array. In DS-speak we call this a *pointer*. A pointer refers to a specific address in memory, so in this example the pointer `nums` holds the memory address `0`.

So why is it important that in an Array the values are contiguous blocks of memory all of the same size? Well, let's consider what is actually happening when you index an array.

```py
nums[0] # 1
nums[2] # 12
nums[4] # 2
```

Indexing is actually just a quick mathematical operation. To get the value of `nums[4]` we take the memory location of `nums` (0) and add 4 * sizeof(int). Because we established that an int is 32 bits, that means the memory address of `nums[4]` is: 0 + 4 * 32 = 128. And indeed it is!

This property of the memory being in order and holding same-sized objects is necessary because it's what allows us to 'jump' to the 4-th index without having to actively look through the previous elements.

### Analysis

This is a good time to explain the basics of complexity analysis. Imagine for a moment we didn't have this property of contiguous + same sized slots. If that were the case we would need to walk from the beginning of the list and count the # of elements one at a time until we got to the fourth. This would be an example of a 'linear time' operation, or in Big-O terms: `O(n)`. This means that, if the array was size n (for any n), the worst case scenario to find a specific index is n operations. So if our array was of size 1000, we might need to look at 1000 elements before we got to the one we want.

Luckily this isn't the case though, because of those two properties, it's a simple math formula to reach the correct index in one operation. So for an array of size 1000, to get the 1000th element all we need to do is compute: `startAddress + index * sizeof(int)` and we can immediately jump to that element. This is called 'constant time', or O(1). This is the best guarantee possible - it means no matter how big the size of the data, the time it takes to do the operation remains the same.

So in this case we would say the Array has a lookup complexity of O(1).

> An important note: in traditional Arrays, the full size of the Array must be known when defining it. That isn't the case with JS or Python arrays, which you can add to indefinitely. How this actually works under the hood is that, when you try to add an element to an already full array in JS, behind the scenes it will double it's size in memory, copy over all the existing elements, and then add the next one. This is significant because in reality adding an element to an array, even to the end, is not necessarily `O(1)`

## Linked lists

After Arrays, Linked Lists are the most common, basic data structure. You often won't see these explciitly in a language, but they are definitely used everywhere under the hood. Once again, let's think of this in the abstract first.

A **Linked List** is a *non-contiguous* data structure, meaning the elements of a linked list are not necessarily next to each other in memory.

Each element in a linked list is called a node and this node holds a `value` (the data value that we are holding) and a pointer `next` which contains a reference to the next element.

![LL](./page-resources/linked-list.png)

A LL is like an array in that it holds ordered data, but it is not contiguous in memory. How is this an advantage? The basic reason for the existence of a LL is that some data is too large to store contiguously. Imagine you wanted to download a 90GB game to your gaming PC, and all that memory needed to be contiguous? Maybe you have a total of 90GB of free space on your hard drive, but all in order? Probably not. A LL is a data structure that takes advantage of free memory being randomly distrbuted throughout your hard drive, which happens as things are created and deleted.

So what does a LL look like in code? In Python you could model such a DS like so:

```py
class Node:
    def __init__(self, value):
        self.value = value
        self.next = None

nums_0 = Node(1)
nums_1 = Node(4)
nums_2 = Node(12)
nums_3 = Node(2)
nums_4 = Node(7)

nums_0.next = nums_1
nums_1.next = nums_2
nums_2.next = nums_3
nums_3.next = nums_4
nums_4.next = None

nums = nums_0
```

The above was meant to be explicit, so you could see how the connections are made, but we can define that much more concisely like so:

```py
class Node:
    def __init__(self, value, next=None):
        self.value = value
        self.next = next

nums = Node(1, Node(4, Node(12, Node(2, Node(7)))))
```

### Analysis

OK, we defined a LL, but what is it good for? Well, let's compare it to an Array. What about lookup? Because the memory is non-contiguous, we cant just do a little math to find the 17-th element, for example, we need to walk through the LL, from the beginning, one element at a time, using `next` to traverse.

```py
class Node:
    def __init__(self, value, next=None):
        self.value = value
        self.next = next

class LL:
    def __init__(self, head):
        self.head = head

    def get_by_index(self, index):
        current = self.head
        current_index = 0

        while(current_index < index):
            assert current.next != None, "Out of bounds!"
            current = current.next
            current_index += 1
        
        return current.value


nums = Node(1, Node(4, Node(12, Node(2, Node(7)))))
ll = LL(nums)

ll.get_by_index(4) # 7
```

This is not constant time like with an Array, it is linear time, O(n)!

However consider adding an element to the end of the LL? Unlike an Array, we could do this forever without ever having to change the size of the array, as the memory can be non-contiguous. And we can hold a pointer to the last element, making this constant time:

```py
class Node:
    def __init__(self, value, next=None):
        self.value = value
        self.next = next

class LL:
    def __init__(self, head):
        self.head = head
        self.last_index = head

    def append(self, value):
        new_node = Node(value)
        self.last_index.next = new_node
        self.last_index = new_node


ll = LL(Node(1))
ll.append(4)
ll.append(12)
ll.append(2)
ll.append(7)
```

This is constant time! This is the basic trade off for an Array vs a LL:

Array: get/set: O(1), add/remove: O(n)
LL: get/set: O(n), add/remove: O(1)

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

- [Data Structures](https://classroom.google.com/c/NjEyMzM5MTczMDQ4?cjc=vunqfsg)

If you are done and want more data structures practice let us know!

If you are done and want some more oop practice:

- [Bank Accounts](https://classroom.google.com/c/NjEyMzM5MTczMDQ4?cjc=vunqfsg)
