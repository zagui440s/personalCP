class BinaryTree:
    def __init__(self, value, left, right):
        self.value = value
        self.left = left
        self.right = right

    def __str__(self):
        return f"[{self.value}, {self.left}, {self.right}]"


myTree = BinaryTree(56,
                    BinaryTree(22,
                               BinaryTree(10, None, None),
                               BinaryTree(30,
                                          None,
                                          BinaryTree(44, None, None))),
                    BinaryTree(81,
                               BinaryTree(77, None, None),
                               BinaryTree(92, None, None)))

# Represented as a tree:
#
#                     56
#                  /      \
#                22        81
#              /   \     /    \
#            10    30   77    92
#                    \
#                    44

# looks for a value in the tree, assuming BST structure. Returns the subtree if found, otherwise None if cit's not in the tree.


def binarySearch(tree, value):
    # if we call BinarySearch on an empty tree (which we will do in recursive cases) return None
    if tree == None:
        return None

    if value == tree.value:
        return tree
    elif value < tree.value:
        return binarySearch(tree.left, value)
    else:
        return binarySearch(tree.right, value)


print(binarySearch(myTree, 1))
