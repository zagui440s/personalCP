# Exact Change

As a team write a computer program for an electronic vending machine to give you the `exact change` for an item's cost. Write a function called `exact_change` that takes in two arguments: item_cost, amount_paid, and currency as an optional argument with a default value of USD. The function should return a string describing the exact change which follows the following convention:

```python
print(exact_change(62.13, 100))
> "The exact change for an item that costs $62.13 with an amount paid of $100 is 1 $20 bill, 1 $10 bill, 1 $5 bill, 2 $1 bills, 3 quarters, 1 dime, and 2 pennies."

print(exact_change(31.51, 50))
> "The exact change for an item that costs $31.51 with an amount paid of $50 is 1 $10 bill, 1 $5 bill, 3 $1 bills, 1 quarter, 2 dimes, and 4 pennies."
```

Team Instructions:

- Inside of your `exact_change` function create helper functions that will account for different currencies of `amount_paid` but will keep `item_cost` as USD.
  - Japanese Yen
  - Euros
  - Mexican Pesos
  - Russian Ruble

Some helpful notes:

- Your algorithm should compute the optimal change. Obviously, you can give the change in pennies, but we're looking for the most optimal (least amount of) change possible.
- You should only consider common monetary denominations (i.e. ignore any denomination larger than $100-bill, ignore $2-bills, half-dollars, etc...)
- You should fully understand the data types of your input and output
- You need to account for proper plural denominations (i.e., quarters, dimes, pennies, bills) and proper punctuation (i.e., commas, using "and", and the period at the end of a sentence).
- You need to account for for edge cases and special cases! We haven't specified what to return for special cases, so decide what you think is most sensible.
- You should not worry too much about floating point rounding errors (but see if you can handle it if you know how to).
