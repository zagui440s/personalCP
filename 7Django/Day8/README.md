# Lesson: Axios Requests and DRF APIViews

## Introduction

In modern web development, building interactive web applications often requires seamless communication between the frontend and backend. In this lesson, we'll explore how information is exchanged between Axios requests in the frontend and Django Rest Framework (DRF) APIViews in the backend. Additionally, we'll cover the full-stack life cycle of a web application, demonstrating how these technologies work together to provide a dynamic user experience.

## Prerequisites

- Basic knowledge of HTML, CSS, and JavaScript.
- Familiarity with Django and Django Rest Framework (DRF) would be beneficial but not required.

## Objectives

By the end of this lesson, you should be able to:

1. Understand how Axios requests are used to communicate with the backend API.
2. Describe the role of DRF APIViews in handling incoming requests and generating responses.
3. Explain the full-stack life cycle of a web application, from user interaction to data processing and UI updates.

## Concepts of Information Exchange: Axios and DRF APIViews

### Frontend: Axios Requests

#### What is Axios?

Axios is a popular JavaScript library that simplifies making HTTP requests from the frontend to APIs. It provides an easy-to-use interface for handling asynchronous communication and managing the response data.

#### Sending Axios Requests

When using Axios in the frontend:

- You typically specify the HTTP method (GET, POST, PUT, DELETE, etc.) to determine the type of request you want to send to the API.
- You also provide the API endpoint URL to specify the target resource on the backend.

```javascript
// Example of a GET request using Axios
const getAllLists = () => {
  axios
    .get(`http://127.0.0.1:8000/api/lists/`)
    .then((resp) => {
      // Handle the successful response
      console.log(resp.data);
    })
    .catch((err) => {
      // Handle errors
      console.error(err);
      alert("Something went wrong getting all lists");
    });
};
```

#### Data Passing in Axios Requests

Axios allows you to send data along with the request. This data can be in the form of:

- Request parameters: These are added to the URL as query parameters, allowing you to pass additional information to the API.
- Headers: You can include custom headers, such as authorization tokens or content types, to provide metadata to the server.
- Request body: For methods like POST and PUT, you can send data in the request body, often in JSON format, to create or update resources on the server.

```javascript
// Example of a POST request with data in the request body
const createAList = () => {
  axios
    .post(`http://127.0.0.1:8000/api/lists/`, {
      list_name: document.getElementById("listName").value,
    })
    .then((resp) => {
      // Handle the successful response
      console.log(resp);
    })
    .catch((err) => {
      // Handle errors
      console.error(err);
      alert("Something went wrong creating a list");
    });
};
```

### Backend: Django Rest Framework APIViews

#### What are DRF APIViews?

Django Rest Framework (DRF) is a powerful toolkit for building Web APIs in Django applications. It provides a variety of views, including APIViews, to handle incoming requests and return HTTP responses.

#### Creating DRF APIViews

DRF APIViews are Python classes that inherit from DRF's built-in view classes. Each APIView corresponds to a specific API endpoint (URL) and handles requests for a particular HTTP method (GET, POST, PUT, DELETE, etc.).

```python
# Example of a DRF APIView to handle a GET request for items
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import List
from .serializers import ListSerializer

class  All_lists(APIView):
  def get(self, request):
    lists = ListSerializer(List.objects.order_by('id'), many = True)
    return Response(lists.data)
```

#### Data Processing in APIViews

Within an APIView, you can access request data, such as request parameters, headers, and request body, to perform various operations based on the client's request.

```python
# Example of a DRF APIView to handle a POST request to create a new item
class  All_lists(APIView):
  def post(self, request):
    new_list = List(**request.data)
    new_list.save()
    a_list = ListSerializer(new_list)
    return Response(a_list.data, status=HTTP_201_CREATED)
```

#### Database Interaction and Serializer

If data retrieval or modification is required, APIViews can interact with the database to fetch or update data. After obtaining data from the database or performing any necessary manipulations, the APIView may use a DRF serializer to convert the data into the appropriate format (e.g., JSON) for the API response.

```python
# Example of a Django Model Serializer
class ListSerializer(ModelSerializer):
    tasks = TaskOnlySerializer(many= True)
    class Meta:
        model = List
        fields = ['id', 'list_name', 'tasks']

# Example of a DRF APIView with database interaction and serializer
    def get(self, request, id):
        a_list = ListSerializer(get_object_or_404(List, id = id))
        return Response(a_list.data)
```

## Full-Stack Life Cycle of a Web Application

1. User Interaction
   The life cycle begins when a user interacts with the frontend application. This can include actions like clicking buttons, submitting forms, or any other user-triggered events.

2. Frontend Axios Request
   When the user performs an action, Axios is utilized in the frontend to send an HTTP request to a specific API endpoint on the backend. The request includes the desired HTTP method and any required data.

3. Backend Django View (APIView)
   The Django backend receives the request and routes it to the appropriate DRF APIView based on the URL pattern and HTTP method. The APIView contains the logic to handle the request and perform necessary business operations.

4. Database Interaction and Serializer
   If data retrieval or modification is needed, the APIView can interact with the database to fetch or update the required data. This interaction depends on the request's purpose and the application's design. After obtaining data from the database or performing any necessary manipulations, the APIView may use a DRF serializer to convert the data into the suitable format for the API response.

5. Backend API Response
   The APIView generates an HTTP response with the processed data or any relevant error messages. The response is then sent back to the frontend as the result of the Axios request.

6. Frontend Axios Response Handling
   In the frontend, Axios receives the API response. If the response is successful, Axios extracts the data and triggers the appropriate actions to update the user interface. In case of errors, Axios handles the errors and provides appropriate feedback to the user.

7. UI Update
   Based on the API response, the frontend updates the user interface to reflect changes, display data, or show error messages. This step ensures that the user gets an updated and interactive experience.

8. User Interaction (Cycle Continues)
   The updated user interface is presented to the user, and the cycle of user interaction, Axios

## Conclusion

In this lesson, we explored the concepts of how information is exchanged between Axios requests and DRF APIViews, along with the full-stack life cycle of a web application. Understanding these concepts is crucial for building dynamic and interactive web applications that provide a seamless user experience. By utilizing Axios and DRF APIViews, developers can create powerful web applications that effectively communicate between the frontend and backend components.

Remember to practice and experiment with these technologies to reinforce your understanding and enhance your web development skills. Happy coding!

## Assignment

- [Library Manager](https://classroom.github.com/a/YOn4OCNS)
