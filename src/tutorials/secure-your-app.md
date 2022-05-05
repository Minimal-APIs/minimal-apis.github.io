# Tutorial Four: Secure your application by adding authentication & authorization

What if you wanted to restrict access to one of the routes in your application? For example, you might want to have all users be able to READ information but only a select few that can UPDATE. In this case, you will want to secure your application by adding authentication and authorization.

- _Authentication_ is the process of determining a user's identity, or if someone is who they say they are. 
- _Authorization_ is the process of deciding whether a user has access to a resource, or if someone - based on their authenticated identity - can do or see something protected.

## Pre-requisites

- Completed [Tutorial Two: My First CRUD App](crud.md)

## Overview

You may associate security with login pages and passwords. In the world of APIs, however, we authenticate and authorize our users without visual interfaces

### Why authenticate using JWT?

JWT (JSON Web Tokens) is a way of sending information as a JSON token that is digitally signed using a secret. The signature certifies that only the party with the private key was the signer, allowing for authentication.

In this case, no identity or user information will be managed by the app directly. Instead, the app will receive a JWT token that contains all needed resources for authentication. 

### What does JWT look like in ASP.NET Core?

1. The Client (the user) authenticates itself to the Server (your application)
2. If authentication is successful, Server creates a JWT token and sends it to the Client
3. Client signs the token and sends it to the Server whenever it needs authorization to access protected resources
4. Server authorizes the Client by getting and validating the token. Client gets access to the secured data. 

### Configuring JWT Bearer Authentication

Before we start implementing the logic of JWT authentication, however, we need to configure our app to use it. We will use the package `Microsoft.AspNetCore.Authentication.JwtBearer`, which adds middleware that allows an application to get a Bearer Token in the Request Pipeline. 

Install the packages `Microsoft.AspNetCore.Authentication.JwtBearer`and `Microsoft.AspNetCore.Authorization`. 

`dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer`

`dotnet add package Microsoft.AspNetCore.Authorization`

Then, import the namespaces into your application by including these lines of code at the top of your `Program.cs` file:

``` 
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization; 
```

Under `builder.Services.AddSwaggerGen`, where you added the Swagger service, include the authentication and authorization services for the desired authentication scheme.

```
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(jwtConfig =>
    {
        jwtConfig.Authority = "https://example.com";
        jwtConfig.TokenValidationParameters = new()
        {
            ValidAudience = "MyAudience",
            ValidIssuer = "https://example.com"
        };
    });
builder.Services.AddAuthorization();
```
> The authentication scheme is added and configured using an _options configuration delegate_ which passes along information about the audience and issuer.

Under where you built your app using `var app = builder.Build();`, add the middleware for authentication authorization:

```
// Add the authentication and authorization middleware
app.UseAuthentication();
app.UseAuthorization();
```

> These lines of code must be included in the right order i.e. the authentication middleware must be included before the authorization middleware in order for the API to be successfully protected.

Finally, you will want to add authorization configuration to the API. On the route you want to secure, add the following code: 

```
app.MapGet("secured-route", () => "Hello, you are authorized to see this!")
    .RequireAuthorization();
```
### Create and verify JWT tokens

A JSON Web Token (JWT) is a way of transferring information as a JSON object. Before you add authentication and authorization to your application, you will want to have a way to create the token that the user will pass to the server to authenticate its identity, and a way for your server to authorize the user based on the contents of that token.

A detailed tutorial on setting up your own discrete server for issuing and verifying JWT tokens is in progress. In the meantime, look at 


### Securing our app with JWT Bearer Authentication


In [Tutorial 2](crud.md), we allow users to CREATE, READ, UPDATE, and DELETE using our app. Let's say we want to stil let all users READ, but restrict access to the CREATE endpoint to only authorized requests. In other words, only users who are authenticated can make new todos. Add the attribute to the `/todos` endpoint, as in the code below.

```

//post method
app.MapPost("/todos", [Authorize] async (TodoDb db, TodoItem todo) =>
{
    await db.Todos.AddAsync(todo);
    await db.SaveChangesAsync();
    return Results.Created($"/todo/{todo.Id}", todo);
});

```

Let's go ahead and start our API. Call this endpoint without providing a valid `access_token` in the `Authorization` header, like:

```
curl -X 'POST' \
  'http://localhost:[YOUR_PORT_NAME]/todos' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  --header 'Authorization: Bearer [INVALID_TOKEN]' \
  -d '{
  "id": 1,
  "item": "Buy groceries",
  "isComplete": true
}'
```

We will fail with the following error: 

```
{
  "error": "invalid_token",
  "error_description": "This request requires a valid JWT access token to be provided"
}
```

Now try that same request with a valid token in the `Authorization` header. You should have been able to POST the item successfully and received a `Response body` which includes the item you just added.

```
[
  {
    "id": 1,
    "item": "Buy groceries",
    "isComplete": true
  }
]
```

