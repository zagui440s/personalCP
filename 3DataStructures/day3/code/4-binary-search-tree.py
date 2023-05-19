# Notice the substructure
class BinaryTree:
    def __init__(self, value, left, right):
        self.value = value
        self.left = left
        self.right = right

# a Binary Search Tree (BST) is any Tree with the property that
# every node's left value is smaller than the node's own value
# every node's right value is greater than the node's own value


myTree = BinaryTree(
    56,
    BinaryTree(
        22,
        BinaryTree(
            10,
            None,
            None
        ),
        BinaryTree(
            30,
            None,
            BinaryTree(
                44,
                None,
                None
            )
        )
    ),
    BinaryTree(
        81,
        BinaryTree(
            77,
            None,
            None
        ),
        BinaryTree(
            92,
            None,
            None
        )
    ),
)

# Represented as a tree:
#
#                     56
#                  /      \
#                22        81
#              /   \     /    \
#            10    30   77    92
#                    \
#                    44
