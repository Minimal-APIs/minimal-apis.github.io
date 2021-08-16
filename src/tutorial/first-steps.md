# Getting started

Before you can start building a minimal API, please install the following:
- [.NET 6 SDK](https://dotnet.microsoft.com/download/dotnet)
- An editor of your choice for example [VS Code](https://code.visualstudio.com/) or [Visual Studio](https://visualstudio.microsoft.com/)

## Create 

**dotnet cli**


`dotnet new web -o TodoApi`

![dotnet-new-api](https://user-images.githubusercontent.com/2546640/125850290-968b36c6-db5c-4dec-982b-496bc6d63aa4.gif)


**Visual Studio**

Select the empty web template 

![image](https://user-images.githubusercontent.com/2546640/122812055-3245cb80-d29f-11eb-84f7-0279f3e54bd2.png)


### Run 

CLI - `dotnet watch run`
![dotnetwatchrun](https://user-images.githubusercontent.com/2546640/125180054-9f27f380-e1c3-11eb-8769-4ddfbe358668.gif)

Visual Studio - `ctrl + F5`
![vs-start-minimal](https://user-images.githubusercontent.com/2546640/122818066-bcddf900-d2a6-11eb-8228-c49a2bbf9b39.gif)

Your `Program.cs` looks like this 

```cs
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () => "Hello World!");

app.Run();
```

### Check 
**Add a new route**

In `Program.cs` create new todo route to our api that returns a list items. Add  a new `MapGet` after `app.MapGet("/", () => "Hello World!");`

```cs 
app.MapGet("/todo", () => new { Item = "Water plants", Complete = "false" });
```
C# Tip: `Item` and `Complete` are referred to as [anonymous types](https://docs.microsoft.com/en-us/dotnet/csharp/fundamentals/types/anonymous-types). 

This route will return one Todo item when you navigate to 
`https://localhost:5001/todo` 

You will see the JSON response 
``` json
{
"item": "Water Plants",
"isComplete": false
}
```

### Learn checklist one ✔️ 

- Created a new route `/todo`
- Used the `GET` HTTP Request method `MapGet`

## Interactive API docs 

### Option 1: Add Swagger UI to your application 

 **Install the Microsoft Open API and Swagger packages.** 

**Using .NET CLI**

In a terminal window 

```console 
TodoApi> dotnet add package Swashbuckle.AspNetCore --version 6.1.4`
```
 
**In Visual Studio**

In Visual Studio you can use the Package Manager Console or Manage Nuget Package GUI.

```console
PM> Install-Package Swashbuckle.AspNetCore -Version 6.1.4
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
- `app.UseSwagger` enables middleware to serve generated Swagger as JSON endpoint. 
- `app.UseSwaggerUI` enables middle to serve the UI elements.
- `SwaggerEndpoint` specifies the swagger endpoint.

Go back to your browser where your app is and navigate to this URL `https://localhost:5001/swagger`


![swaggerUI](https://user-images.githubusercontent.com/2546640/125180553-49eee080-e1c9-11eb-99f5-0b093210f13a.png)

Now, Swagger UI is   setup you can visualize and interact with your API.


![swaggertodo](https://user-images.githubusercontent.com/2546640/125180523-0005fa80-e1c9-11eb-885c-46b7bbb9fef3.gif)

### Learn checklist option 2✔️ 
- Configured and implementing Swagger 
- Introduced to middleware and dependency injection.

### Option 2: Swagger Built into the template

🧪 **Alternative path:  Swagger turned on my default**

Go back to your browser where your app is and navivate to this URL `https://localhost:5001/docs/`. Now, you can visualize and interact with your API.

![docs-swagger](https://user-images.githubusercontent.com/2546640/123326622-75a27300-d507-11eb-9e77-1b9bc9bedebc.gif)

### Learn checklist option 2✔️
- Use interacive documentation




