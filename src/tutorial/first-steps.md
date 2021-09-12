# Tutorial One

## Getting started

Before you can start building a minimal API, please install the following:
- [.NET 6 SDK](https://dotnet.microsoft.com/download/dotnet)
- An editor of your choice for example [VS Code](https://code.visualstudio.com/) or [Visual Studio](https://visualstudio.microsoft.com/)

## Create 

**dotnet cli**


`dotnet new web -o TodoApi`

### Run 

Now, that you have created your minimal API you can now run it. To run your application navigate to the `TodoApi` folder and type the command below 

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
If you navigate or click on the localhost link provided to `http://localhost:5000` in a browser you will see the text Hello World! as the browser makes a request to your app and displays the output.

> *Note: the localhost port is generated at random. For example mine is 5000 but yours coud be something else.*

To shutdown the application go back to the terminal window and hint `ctrl + C` .

![dotnetwatchrun](https://user-images.githubusercontent.com/2546640/125180054-9f27f380-e1c3-11eb-8769-4ddfbe358668.gif)

### Add a new route
Open your `TodoApi` app in an editor of your choice and open the `Program.cs` file.

Your `Program.cs` looks like this 

```cs
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () => "Hello World!");

app.Run();
```

In `Program.cs` create new todo route to our api that returns a list items. Add  a new `MapGet` after `app.MapGet("/", () => "Hello World!");`

```cs 
app.MapGet("/todo", () => new { Item = "Water plants", Complete = "false" });
```
> C# Tip: `Item` and `Complete` are referred to as [anonymous types](https://docs.microsoft.com/en-us/dotnet/csharp/fundamentals/types/anonymous-types). 

This route will return one Todo item when you navigate to 
`https://localhost:5001/todo`. 

You will see the JSON response 
``` json
{
"item": "Water Plants",
"isComplete": false
}
```

> Please note the your port number will be different. Port number us created at 

### Learn checklist one ✔️ 

- Created a new route `/todo`
- Used the `GET` HTTP Request method `MapGet`

## Interactive API docs 

### Add Swagger UI to your application 

 **Install the Microsoft OpenAPI and Swagger packages.** 

**Using .NET CLI**

In a terminal window 

```console 
TodoApi> dotnet add package Swashbuckle.AspNetCore --version 6.1.4
```
 

 To setup Swagger UI you are going to need add the following 2 code snippets. 
 
**Snippet 1**: Below `var builder = WebApplication.CreateBuilder(args);` please add the following lines of code 

```cs 
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Todo API", Description = "Keep track of your tasks", Version = "v1" });
});
```
`AddSwaggerGen` method adds information such as the title, description, and version to your api.

**Snippet 2**: Above `app.MapGet("/", () => "Hello World!");` please add the following lines of code 

``` cs
app.UseSwagger();
app.UseSwaggerUI(c =>
{
   c.SwaggerEndpoint("/swagger/v1/swagger.json", "Todo API V1");
});
```
The code snippet above does the following
- `app.UseSwagger` enables middleware to serve the generated OpenAPI description as JSON content. 
- `app.UseSwaggerUI` enables middle to serve the Swagger UI elements.
- `SwaggerEndpoint` specifies the OpenAPI description's endpoint.

Go back to your browser where your app is and navigate to this URL `https://localhost:5001/swagger`


![swaggerUI](https://user-images.githubusercontent.com/2546640/125180553-49eee080-e1c9-11eb-99f5-0b093210f13a.png)

Now, Swagger UI is   setup you can visualize and interact with your API.


![swaggertodo](https://user-images.githubusercontent.com/2546640/125180523-0005fa80-e1c9-11eb-885c-46b7bbb9fef3.gif)

### Learn checklist two ✔️ 
- Configured and implementing OpenAPI and Swagger UI 
- Introduced to middleware and dependency injection.






