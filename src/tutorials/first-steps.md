# Tutorial One: Minimal APIs 101

## Getting started

### Pre-requisites

Before you can start building a minimal API, please install the following:

- [.NET 6 SDK](https://dotnet.microsoft.com/download/dotnet/6.0)
- An editor of your choice, such as [VS Code](https://code.visualstudio.com/) or [Visual Studio](https://visualstudio.microsoft.com/)

### Create your app

Run the following command using the dotnet CLI.

`dotnet new web -o TodoApi`

That's it!

### Run your app

Now, that you have created your minimal API you can now run it. To run your application navigate to the `TodoApi` folder and type the command below

 `cd TodoApi`

 `TodoApi> dotnet run`

![dotnet-new-api](https://user-images.githubusercontent.com/2546640/125850290-968b36c6-db5c-4dec-982b-496bc6d63aa4.gif)

``` bash
info: Microsoft.Hosting.Lifetime[14]
      Now listening on: https://localhost:5001
info: Microsoft.Hosting.Lifetime[14]
      Now listening on: http://localhost:5000
info: Microsoft.Hosting.Lifetime[0]
      Application started. Press Ctrl+C to shut down.
info: Microsoft.Hosting.Lifetime[0]
      Hosting environment: Development
info: Microsoft.Hosting.Lifetime[0]
```

Click on the localhost link or navigate to the port in a browser. You'll see the text `Hello World!` as the browser makes a request to your app and displays the output.

> *Note: the localhost port depends on your machine. In this example the port is 5000, but yours could be something else.*

To shut down the application, go back to the terminal window and enter `ctrl + C` .

![dotnetwatchrun](https://user-images.githubusercontent.com/2546640/125180054-9f27f380-e1c3-11eb-8769-4ddfbe358668.gif)

### Add a new route

Import your `TodoApi` folder in an editor of your choice and open the `Program.cs` file.

Your `Program.cs` looks like this:

```cs
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () => "Hello World!");

app.Run();
```

In `Program.cs`, create a new route to our api that returns a list items under `/todo`. Call `MapGet` again after `app.MapGet("/", () => "Hello World!");`

```cs
app.MapGet("/todo", () => new { Item = "Water plants", Complete = "false" });
```

> C# Tip: `Item` and `Complete` are referred to as [anonymous types](https://docs.microsoft.com/dotnet/csharp/fundamentals/types/anonymous-types).

Save your changes and build your app again. This route will now return one Todo item when you navigate to
`https://localhost:[YOUR_PORT_HERE]/todo`.

You'll see the JSON response:

``` json
{
"item": "Water Plants",
"isComplete": false
}
```

> Please note the your port number may be different.

### Learning checklist one ✔️

- Created a new route `/todo`
- Used the `GET` HTTP Request method `MapGet`

## Add visual interactive documentation to your new API

### What is Swagger UI?

It is difficult to learn how to use an API just by parsing through the code and runtime logs. Swagger UI allows both you and users of your application to visualize and interact with the API's resources through an interface automatically generated from your OpenAPI (formerly Swagger) Specification.

Follow the steps below to add your first piece of Swagger Specification and work with your API's resources directly!

![swaggertodo](https://user-images.githubusercontent.com/2546640/125180523-0005fa80-e1c9-11eb-885c-46b7bbb9fef3.gif)

 **Install the Microsoft OpenAPI and Swagger packages.**

In a terminal window, type the following command:

```console
TodoApi> dotnet add package Swashbuckle.AspNetCore --version 6.1.4
```

To include Swagger UI in your application, add the following two code snippets:

**Snippet 1**

Under `var builder = WebApplication.CreateBuilder(args);`, add the following lines of code:

```cs
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Todo API", Description = "Keep track of your tasks", Version = "v1" });
});
```

The `AddSwaggerGen` method adds information such as title, description, and version to your API that can be read as documentation for your users.

**Snippet 2**

Above `app.MapGet("/", () => "Hello World!");`, add the following lines of code:

``` cs
app.UseSwagger();
app.UseSwaggerUI(c =>
{
   c.SwaggerEndpoint("/swagger/v1/swagger.json", "Todo API V1");
});
```

These lines of code do the following:

- `app.UseSwagger` enables middleware to serve the generated OpenAPI description as JSON content.
- `app.UseSwaggerUI` enables middleware to serve the Swagger UI elements.
- `SwaggerEndpoint` specifies the endpoint of the OpenAPI description.

Go back to your browser where your app is and navigate to this URL `https://localhost:[YOUR_PORT_HERE]/swagger`.

![swaggerUI](https://user-images.githubusercontent.com/2546640/125180553-49eee080-e1c9-11eb-99f5-0b093210f13a.png)

Now that Swagger UI is set up, you can visualize and interact with your API.

![swaggertodo](https://user-images.githubusercontent.com/2546640/125180523-0005fa80-e1c9-11eb-885c-46b7bbb9fef3.gif)

### Learning checklist ✔️

- Configured and implemented OpenAPI and Swagger UI to create visual and interactive documentation for your API.
- Introduced to middleware and dependency injection.

  - _Middleware_ is software that acts as a part of an app pipeline to handle requests and responses - essentially, additional functionality you add to your application. 
      
  - _Dependency injection_ is when an object that another object depends on, or a dependency, is provided instead of being constructed from scratch. For example, injecting the dependency of OpenAPI specifications.  