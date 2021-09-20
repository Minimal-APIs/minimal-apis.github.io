# OpenAPI

## A brief introduction to OpenAPI
Available in either JSON or YAML format, [OpenAPI](https://swagger.io/specification/) descriptions enable RESTful APIs to be described in a programming language-agnostic way so that humans and computers can discover the operations those APIs offer without needing to understand how the APIs work internally. 

In minimal APIs, OpenAPI descriptions are generated using an open-source package known as [Swashbuckle.AspNetCore](https://www.nuget.org/packages/Swashbuckle.AspNetCore/). 

## Enabling OpenAPI

In this guide you are going to learn how to add OpenAPI to a minimal API. 

>Looking how to create a new minimal API?  Checkout the tutorial or just type >`dotnet new web` in a terminal.  

First thing you will need to do is add the latest version of the `Swashbuckle.AspNetCore` NuGet package. In a terminal add `Swashbuckle.AspNetCore` package to your application.

``` bash
dotnet add package swashbuckle.aspnetcore
```

Open the `Program.cs` file and add the code below `var builder = WebApplication.CreateBuilder(args);`. The snippet below will generate the code you'll need to generate OpenAPI descriptions for your API. 

```csharp
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
```

To enable Swagger UI test page to test your API during development, add this code after the call to `builder.Build()`, which is left in below for reference purposes only. 

```csharp
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
```

## Test with Swagger UI

Once you've added this code to either an existing minimal API project or you've opted to create a new one, use the `dotnet watch run` command to start the app, and the app should open in your browser. 

```
dotnet watch run
```

Using the default configuration, the Swagger UI test page is now available at `https://localhost:5001/swagger`. 

![Swagger UI](https://github.com/bradygaster/minimal-apis.github.io/blob/bradyg/openapi-doc/src/.vuepress/public/openapi/swagger-ui.png?raw=true)

## Customizing OpenAPI

Numerous extension methods exist to enable customization of the generated OpenAPI description. Endpoints defined via minimal APIs can be annotated with metadata for use in OpenAPI libraries with a series of extension methods.

You can set the EndpointName or `EndpointGroupName` of an endpoint using the `WithName` and `WithGroupName` extension methods as follows.

```csharp
string SomeMessage() => "Hello World.";
app.MapGet("/hello", SomeMessage).WithName("WelcomeMessage").WithGroupName("Greetings");
```

> Note: If you have multiple `WithName` statements on the same endpoint, the last endpoint will be favored.

On the topic of endpoint names, by default, endpoints that use a method group or named lambda will have their endpoint name set to the method name. For example, in the code snippet below, the endpoint will have a default endpoint name of `SomeMessage`.

```csharp
string SomeMessage() => "Hello World.";
app.MapGet("/hello", SomeMessage);
```

This default endpoint name can be overloaded by using the `WithName` extension method as referenced above.

```csharp
string SomeMessage() => "Hello World.";
app.MapGet("/hello", SomeMessage).WithName("MyOwnSpecialName");
```

To omit an endpoint from being displayed in API metadata, you can use the ExcludeFromDescription extension method on the endpoint.

```csharp
string SomeMessage() => "Hello World.";
app.MapGet("/hello", SomeMessage).ExcludeFromDescription();
```

Let's say that you did want an endpoint to be annotated. In addition to endpoint names, you can also use the various `ProducesX` endpoints to indicate the response types of a method. The available extension methods are:

```csharp
Produces<TResponse>(int statusCode = 200, 
    string? contentType = "application/json", 
    params string[] additionalContentTypes)

Produces(int statusCode = 200, 
    System.Type? responseType = null, 
    string? contentType = "application/json", 
    params string[] additionalContentTypes)

ProducesProblem(int statusCode, 
    string? contentType = "application/problem+json")

ProducesValidationProblem(int statusCode = 400, 
    string? contentType = "application/validationproblem+json")
```

In general, the `Produces` extension methods give you the flexibility to set a `ProblemDetails` response type for your endpoint or define what response it returns on happy-path scenarios. You can do this with the generic-typed implementation `Produces<TResponse>` or with the `Produces` attribute. So, for example, to define the response metadata for a POST method that returns a `Todo` or a `ProblemDetails` response you can annotate it using the following extension methods.

```csharp
app.MapPost("/todos", (Todo todo) => { ... })
   .ProducesProblem(401)
   .Produces<Todo>(201);
``
