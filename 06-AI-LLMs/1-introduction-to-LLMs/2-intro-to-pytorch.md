# Gradient Tracking with Pytorch

## Introduction

Welcome to the world of PyTorch! In this lecture, we'll dive into the basics of PyTorch, a powerful deep learning framework loved by researchers and practitioners alike. We'll PyTorch methods such as autograd, and dynamic computational graphs through coding examples.

## Lesson Content

### Gradient Tracking

#### What is a Gradient?

In the context of deep learning and automatic differentiation, a gradient refers to the vector of partial derivatives of a scalar-valued function with respect to its input variables. In the context of neural networks, the scalar-valued function typically represents a loss function, and the input variables represent the parameters of the network (e.g., weights and biases).

Here's a breakdown of what a gradient represents:

1. **Partial Derivatives**: A gradient consists of partial derivatives, each of which represents the rate of change of the loss function with respect to a particular parameter of the neural network. For example, if a neural network has two parameters (weights), the gradient would consist of two partial derivatives—one for each parameter—indicating how the loss function changes as each parameter is varied while holding others constant.

2. **Direction of Steepest Ascent**: The gradient points in the direction of the steepest ascent of the loss function. In other words, if you were to adjust the parameters of the neural network in the direction of the gradient, the loss function would increase the most. Conversely, moving in the opposite direction of the gradient would lead to a decrease in the loss function.

3. **Parameter Updates**: Gradients are used to update the parameters of the neural network during the optimization process. By following the direction of the negative gradient (opposite to the direction of steepest ascent), we can iteratively adjust the parameters to minimize the loss function. This process is known as gradient descent.

4. **Magnitude and Significance**: The magnitude of the gradient indicates the steepness of the loss function's slope in a particular direction. A larger magnitude suggests a steeper slope and a more significant change in the loss function with respect to the corresponding parameter. By considering both the magnitude and direction of the gradient, we can determine how much to adjust each parameter to minimize the loss function effectively.

A gradient in the context of deep learning represents the direction and magnitude of the rate of change of a loss function with respect to the parameters of a neural network. It guides the optimization process by indicating how to adjust the parameters to minimize the loss function and improve the performance of the network.

#### What is Gradient Tracking?

Gradient tracking is a fundamental concept in automatic differentiation, a technique used to compute gradients efficiently. Gradient tracking refers to the process of keeping track of the operations applied to tensors and their dependencies during forward computation, enabling the computation of gradients during backward propagation.

Here's how gradient tracking works:

1. **Forward Computation**: During the forward pass of training or inference, tensors with the `requires_grad=True` attribute are involved in various mathematical operations, such as addition, multiplication, and activation functions. These operations create a computational graph, where nodes represent tensors and edges represent the operations applied to them.

2. **Recording Operations**: As tensors undergo operations, the framework (e.g., PyTorch) records the operations and their inputs, building a computational graph dynamically. This graph captures the sequence of operations applied to the tensors, forming a directed acyclic graph (DAG) that represents the computation performed during the forward pass.

3. **Dependency Tracking**: The framework tracks dependencies between tensors and operations in the computational graph. It records which tensors depend on which other tensors and how they are related through operations. This information is crucial for computing gradients during backward propagation.

4. **Backward Computation (Gradient Computation)**: After the forward pass completes and a loss function is computed, the framework initiates the backward pass, also known as backpropagation. During backpropagation, the framework traverses the computational graph in reverse order, starting from the output tensors (e.g., the loss) and working backward toward the input tensors.

5. **Gradient Calculation**: As the framework traverses the computational graph backward, it applies the chain rule of calculus to compute gradients of the loss with respect to each tensor that has `requires_grad=True`. These gradients represent the sensitivity of the loss to small changes in each input tensor. The gradients are accumulated in the `.grad` attribute of the tensors.

6. **Parameter Updates**: Once gradients are computed for all tensors with `requires_grad=True`, the framework uses these gradients to update the parameters (e.g., weights and biases) of the neural network using optimization algorithms like stochastic gradient descent (SGD) or its variants.

Gradient tracking is the process by which deep learning frameworks dynamically build and traverse computational graphs to compute gradients efficiently during training. It enables automatic differentiation, allowing neural networks to learn from data by adjusting their parameters to minimize a predefined loss function.

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

Let's break down the code step by step to understand what's happening and how gradients are computed:

1. **Creating Tensors with `requires_grad=True`**:
   - We create two tensors `a` and `b` with the `requires_grad=True` attribute. This attribute tells PyTorch to track operations involving these tensors and compute gradients during backpropagation.

2. **Performing Operations**:
   - We perform an element-wise multiplication between tensors `a` and `b` and store the result in tensor `c`.
   - We then calculate the sum of all elements in tensor `c` and store the result in tensor `d` using the `.sum()` method.

3. **Computing Gradients**:
   - After performing the forward pass (i.e., computing the output tensor `d`), we initiate the backward pass to compute gradients.
   - We call the `backward()` method on the scalar output tensor `d`. This method triggers the computation of gradients for all tensors that are involved in the computation of `d`, which includes tensors `a` and `b`.
   - PyTorch automatically computes the gradients of the output tensor (`d`) with respect to all tensors that have `requires_grad=True`. It uses the chain rule of calculus to propagate gradients backward through the computational graph.

4. **Accessing Gradients**:
   - The gradients are computed and stored in the `.grad` attribute of the input tensors (`a` and `b`). Each tensor's `.grad` attribute holds the gradient of the output tensor with respect to that particular tensor.
   - In this example, `a.grad` will contain the gradients of the output tensor `d` with respect to tensor `a`, and `b.grad` will contain the gradients with respect to tensor `b`.

> Gradients are accumulated as operations are performed during the forward pass. Each operation adds to the gradient of the output tensor with respect to its inputs. The `.grad` attribute of each input tensor accumulates gradients from all operations involving that tensor during the backward pass. So, it doesn't only hold onto the gradients from the last operation.

The code demonstrates how PyTorch's autograd mechanism automatically computes gradients for tensor operations by tracking computations involving tensors with `requires_grad=True` and propagating gradients backward through the computational graph during the backward pass.

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
