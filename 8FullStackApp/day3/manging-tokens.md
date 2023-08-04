# Lesson: Tokens as HTTP Cookies

In this lesson, we will cover how to set tokens as HTTP cookies with a set lifespan when working within a deployed site with a Django API and a React frontend. We will walk through the provided code and explain why we are doing it and how it works.

## Why are we doing this?

When building web applications with Django as the backend and React as the frontend, it's common to use token-based authentication for securing API endpoints. Tokens provide a secure way to authenticate users without the need to store sensitive information like passwords on the client side.

To make token-based authentication more secure and prevent potential security vulnerabilities like Cross-Site Scripting (XSS), we are setting tokens as HTTP-only cookies. HTTP-only cookies can only be accessed by the server and are not accessible through JavaScript, making them less susceptible to XSS attacks.

Additionally, we are setting a limited lifespan for the tokens by specifying an expiration date for the cookie. This enhances security by automatically invalidating the token after a certain period, reducing the window of opportunity for potential attackers.

## How it works

### settings.py

```python
ALLOWED_HOSTS = ["https://tango-dep.com"]

CORS_ALLOWED_ORIGINS = ["https://tango-dep.com"]

CORS_ALLOW_CREDENTIALS = True

SESSION_COOKIE_SECURE = True

SESSION_COOKIE_HTTPONLY = True
```

In the `settings.py` file, we are setting the following configurations:

1. `ALLOWED_HOSTS`: It specifies which hostnames are allowed to access the Django site. In this case, we allow requests from the domain "https://tango-dep.com".

2. `CORS_ALLOW_ALL_ORIGINS`: This allows all origins (front-end domains) to make requests to the Django API. CORS (Cross-Origin Resource Sharing) is needed when the front-end and backend are on different domains.

3. `CORS_ALLOW_CREDENTIALS`: This enables sending and receiving cookies across different domains, essential for token-based authentication.

4. `SESSION_COOKIE_SECURE`: This ensures that the cookie is only sent over secure (HTTPS) connections.

5. `SESSION_COOKIE_HTTPONLY`: This sets the session cookie to be HTTP-only, making it inaccessible to JavaScript.

### utilities.py

```python
from rest_framework.authentication import TokenAuthentication
from rest_framework.exceptions import AuthenticationFailed

class HttpOnlyTokenAuthentication(TokenAuthentication):
    def get_auth_token_from_cookie(self, request):
        # Extract the token from the 'auth_token' HttpOnly cookie
        return request.COOKIES.get('token')

    def authenticate(self, request):
        # Get the token from the HttpOnly cookie
        auth_token = self.get_auth_token_from_cookie(request)

        if not auth_token:
            # If the token is not found, return None and let other authentication classes handle the authentication
            return None

        # The original TokenAuthentication class handles token validation and user retrieval
        return self.authenticate_credentials(auth_token)
```

In the `utilities.py` file, we are creating a custom authentication class `HttpOnlyTokenAuthentication`. This class extends Django Rest Framework's `TokenAuthentication` class and overrides the `authenticate` method to handle token authentication from HTTP-only cookies.

The `get_auth_token_from_cookie` method is used to extract the token from the `token` cookie in the request.

The `authenticate` method uses the extracted token to call the `authenticate_credentials` method of the base class, which handles token validation and user retrieval.

### views.py

```python
from .utilities import HttpOnlyTokenAuthentication
from datetime import datetime, timedelta

class Log_in(APIView):
    def post(self, request):
        request.data["username"] = request.data["email"]
        user = authenticate(**request.data)
        if user:
            token, created = Token.objects.get_or_create(user=user)
            life_time = datetime.now() + timedelta(days=7)
            format_time = life_time.strftime("%a, %d %b %Y %H:%M:%S GMT")
            response = Response({"user": {"email": user.email}})
            response.set_cookie(key="token", value=token.key, httponly=True, secure=True, samesite="Lax", expires=format_time)
            return response
        else:
            return Response("Something went wrong", status=HTTP_400_BAD_REQUEST)

class Info(APIView):
    authentication_classes = [HttpOnlyTokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({"email": request.user.email})

class Log_out(APIView):
    authentication_classes = [HttpOnlyTokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        request.user.auth_token.delete()
        response = Response(status=HTTP_204_NO_CONTENT)
        response.delete_cookie("token")
        return response
```

In the `views.py` file, we have three views:

1. `Log_in`: This view handles user login. When a user successfully logs in, a token is created for the user, and the token is set as an HTTP-only cookie in the response with a specified expiration time.

2. `Info`: This view provides user information. It requires authentication using the `HttpOnlyTokenAuthentication` class, which checks for the token in the request's cookie.

3. `Log_out`: This view handles user logout. It deletes the user's token from the database and removes the token cookie from the response.

### Log_in.jsx

```jsx
const logIn = async(e) => {
    e.preventDefault();
    let response = await api.post("users/login/", {
      email: userName,
      password: password,
    },{
        withCredentials:true,
    });
    console.log(response)
    let token = response.data.token
    let user = response.data.user
    setUser(user)
    navigate("/home")
  };
```

In the `Log_in.jsx` file (assuming it's a React component), the `logIn` function handles user login. It sends a POST request to the backend API endpoint for user authentication. The `withCredentials: true` option is set to ensure that cookies are sent with the request, including the HTTP-only token cookie.

Upon successful login, the API response contains the token and user data. The token is stored in the `token` variable and the user data is stored in the `user` variable.

Finally, the `setUser` function (not shown in the provided code) updates the React component's state with the logged-in user information, and the user is redirected to the "/home" page using the `navigate` function (assumed to be a routing function).

## Conclusion

In this lesson, we covered how to set tokens as HTTP cookies with a set lifespan when working with a Django API and a React frontend. We explained the purpose of using HTTP-only cookies and how it enhances security by preventing certain types of attacks. Additionally, we explored the provided code and the logic behind setting the token as a cookie in the API response, and how it can be used for subsequent authenticated requests from the React frontend.