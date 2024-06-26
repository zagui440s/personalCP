# Divide-and-Conquer Algorithms & Recursion

## Topics Covered

- Divide and Conquer as as an algorithm design and problem-solving strategy
- Why recursion is a good fit for divide and conquer algorithms
- Binary Search
- Merge Sort

## What is Divide and Conquer?

Divide and conquer is a problem solving strategy. It solves a problem by:

1. Breaking the problem down into *subproblems* that are smaller instances of the **same type of problem.**

2. Recursively solving each subproblem.

3. Combining the answers to the smaller subproblems to get the answer to our big problem.

To reiterate:

1. **Divide** a problem down into subproblems that are instances of the same problem.
2. **Conquer** the subproblems by solving them recursively.
3. **Combine** the subproblem solutions to get the solution for the original problem.

## Binary Search

- Binary search is a classic example of a divide and conquer algorithm.
- Binary search can only be used when our data is **already sorted**.
- The runtime complexity of binary search is **logarithmic: O(log n)**.

Let's write a recursive binary search implementation to explore divide and conquer.

**Problem:** Your friend is thinking of a number between 1 and 100. They will tell you if your guess is "too high", or "too low", or "correct." How can we guess the number with as few guesses as possible?

Let's use a **binary search** guessing algorithm!

**Example A:** Let's say the number is 1 ...

1. I guess **50** -- *"Too high"*
2. I guess **25** -- *"Too high"*
3. I guess **12** -- *"Too high"*
4. I guess **6**  -- *"Too high"*
5. I guess **3**  -- *"Too high"*
6. I guess **1**  -- *"Correct!"*

We got the solution in 6 guesses!

**Example B:** Let's say the number is 1 ...
