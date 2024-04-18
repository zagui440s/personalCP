# Introduction to PyTorch

## Introduction

Welcome to the world of PyTorch! In this lecture, we'll dive into the basics of PyTorch, a powerful deep learning framework loved by researchers and practitioners alike. We'll cover how to install PyTorch and explore fundamental concepts such as tensors, autograd, and dynamic computational graphs through coding examples.

## Lesson Content

### Installing PyTorch

Let's start by installing PyTorch. You can install it via pip if you have Python installed, or you can use conda if you prefer.

```bash
# Install PyTorch via pip
pip install torch torchvision
```

Make sure to replace `<your_cuda_version>` with your CUDA version if you're using GPU acceleration.

### Basic Concepts

#### Tensors

Tensors are multi-dimensional arrays, similar to NumPy arrays, but they can be used on GPUs to accelerate computing. Let's create a simple tensor and perform some operations:

```python
import torch

# Create a tensor
x = torch.tensor([[1, 2], [3, 4]])
print("Tensor x:")
print(x)

# Perform some operations
y = torch.tensor([[5, 6], [7, 8]])
z = x + y
print("Sum of tensors x and y:")
print(z)
```

#### Autograd

Autograd is PyTorch's automatic differentiation engine, which automatically computes gradients for tensor operations. Let's see how it works:

```python
# Create a tensor with requires_grad=True to track computation
a = torch.tensor([[2.0, 3.0]], requires_grad=True)
b = torch.tensor([[1.0, 2.0]], requires_grad=True)

# Perform some operations
c = a * b
d = c.sum()

# Compute gradients
d.backward()

# Gradients are computed and stored in .grad attribute
print("Gradient of a:")
print(a.grad)
print("Gradient of b:")
print(b.grad)
```

#### Dynamic Computational Graphs

PyTorch uses dynamic computational graphs, which means the graph is built on-the-fly as operations are executed. This allows for more flexibility and ease of debugging. Let's see an example:

```python
# Create tensors and perform operations
x = torch.tensor(2.0, requires_grad=True)
y = torch.tensor(3.0, requires_grad=True)

z = x * y

# Print the gradient function of z
print("Gradient function of z:")
print(z.grad_fn)
```

## Conclusion

In this lecture, we've introduced PyTorch and covered the basics of installation. We've also explored fundamental concepts such as tensors, autograd, and dynamic computational graphs through coding examples. Understanding these concepts is crucial as we delve deeper into building and training neural networks with PyTorch. In the next lesson, we'll explore more advanced topics and start building our first neural network using PyTorch.
