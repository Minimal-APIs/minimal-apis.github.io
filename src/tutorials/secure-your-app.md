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
app.UseAuthoriziation();
```

> These lines of code must be included in the right order i.e. the authentication middleware must be included before the authorization middleware in order for the API to be successfully protected.

Finally, you will want to add authorization configuration to the API. On the route you want to secure, add the following code: 

```
app.MapGet("secured-route", () => "Hello, you are authorized to see this!")
    .RequireAuthorization();
```

### Securing our app with JWT Bearer Authentication


