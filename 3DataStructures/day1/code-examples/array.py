# find_by_index takes a list and a target value
# and returns the first index matching that value
# if it exists. Otherwise it returns -1.
def find_by_index(lst, target):
    for index in range(len(lst)):
        if lst[index] == target:
            return index
    else:
      return -1

# test it out
lst = [1, 4, 7, 99, 2, 42]
print(find_by_index(lst, 1)) # 0
print(find_by_index(lst, 42)) # 5
print(find_by_index(lst, 100)) # -1



