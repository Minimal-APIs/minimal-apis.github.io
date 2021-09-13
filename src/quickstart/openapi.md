# OpenAPI

Available in either JSON or YAML format, [OpenAPI](https://swagger.io/specification/) descriptions enable RESTful APIs to be described in a programming language-agnostic way so that humans and computers can discover the operations those APIs offer without needing to understand how the APIs work internally. In the case of minimal APIs with .NET, OpenAPI descriptions are generated using an open-source package known as [Swashbuckle.AspNetCore](https://www.nuget.org/packages/Swashbuckle.AspNetCore/). 

As shown in the [first steps](/tutorial/first-steps.html#interactive-api-docs) tutorial, one fantastic use-case for enabling a minimal API project with OpenAPI output is for documentation and testing purposes. The Swagger UI test and documentation page give developers a quick-and-easy way to debug their APIs quickly. 

## Enabling OpenAPI

We'll explore two ways you can enable OpenAPI descriptions for your minimal APIs - either when you create your API project, or by adding OpenAPI output to an existing API project.

### Create a minimal API with OpenAPI

The easiest way to get started building a minimal API that's enabled with automatic OpenAPI description generation is to execute the `dotnet new webapi` command to create a new HTTP API project:

```
dotnet new webapi -o MinimalOpenApi
```

This bootstraps your `Program.cs` file with all the code required to enable OpenAPI generation, and adds all the project dependencies so you don't have to think about it. The resulting code will include code that enables OpenAPI generation:

```csharp
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new() { Title = "OpenMinimalApi", Version = "v1" });
});
```

Whilst developing your API you'll have the Swagger UI test page available for testing each API endpoint. 

```csharp
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "OpenMinimalApi v1"));
}
```

You may not want your API's test page to be available in production, so the test page generation is wrapped within the `IsDevelopment()` check. This not only enables you easy debugging capability when you're coding, but makes sure you don't accidentally allow someone to call your API once you deploy your app. 

### Add OpenAPI to an existing minimal project

If you have an existing minimal API or web project and need to add OpenAPI description generation, first add a reference to the latest version of the `Swashbuckle.AspNetCore` NuGet package using the command:

```
dotnet add package swashbuckle.aspnetcore
```

Open up the `Program.cs` file and add this code to it. Note, this is the absolute bare minimum amount of code you'll need to generate OpenAPI descriptions based on the endpoints in your minimal app.

```csharp
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
```

To enable the convenient Swagger UI test page to help you test your API during development, add this code after the call to `builder.Build()`, which is left in below for reference purposes only. 

```csharp
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
```

## Test with Swagger UI

Once you've added this code to either an existing minimal API project or you've opted to create a new one, use the `dotnet watch` command to start the app, and the app should open up in your browser. 

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
```