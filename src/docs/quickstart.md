
# Quick Start with minimal server apps in c#

This page is designed to get you a good introduction to doing common tasks with a little C#.

If you want to follow along with the steps here then you first need to install the [.NET SDK](https://dotnet.microsoft.com/download/dotnet).

Once you have done that, open a terminal such as PowerShell, Command Prompt, or bash. Run the following command to create your first app:

```bash
dotnet new web --output minimalapp
```

This will create a new directory with a few files to get you started:

1. `Program.cs`: This is your first code file we will be editing for most of this guide.
1. `minimalapp.csproj`: This is a project file that helps the `dotnet` command know how to run your code. We will ignore it for this guide as it has everything it needs already.
1. `appsettings.json`: These are configuration files with some initial settings for your app, we also will not be using these in this guide but you can use them to add your own settings like, for example, a connection string to get data from a database.

## Your app

The app in your `Program.cs` looks like this:

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () => "Hello World!");

app.Run();
```

What does that do?

1. First we create our app builder. Which we use to configure our app. In this default example we aren't doing any configuring yet so we just build an app object. You use the builder to create an app and then you run the app, this is known as the builder pattern.
1. Build the app object, the app object is what we will use to route URLs to code.
1. The `MapGet` line is how we route URLs to code, we will talk about that more next.
1. Finally, `app.Run` executes the app you configured in the previous lines. It's not until you call `Run` that your app will start and you can browse to URLs.

## Running your app

To run your app, use the `dotnet run` command on your terminal in the same directory as the `Program.cs` file.

```
dotnet run
```

After running you will see log output like the following:

```
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

If you navigate to `http://localhost:5000` in a browser you will see the text `Hello World!` as the browser makes a request to your app and displays the output.

### What if I see something different?

If you haven't changed any code in the `Program.cs` and your app still fails to run then it is likely a problem with the installation of `dotnet`. But there are a couple of common things you might see:
 - If you see an error saying `Couldn't find a project to run` then you are probably in the wrong directory, make sure your terminal is in the right place.
 - If you see an error saying `Failed to bind to address https://127.0.0.1:5001: address already in use` then you probably have another `dotnet run` command running on another terminal window. You can stop that app by pressing `CTRL + C`. You can only have one app listening on a given address on a computer. We will talk about how to change the URL your app is listening on a bit later.

## Routes

When building a web applicaiton you typically want to try and create meaningful URLs that execute your code. For example, going to `/hello` returns a hello string and going to `/todos` or `/todolist` shows me all the todo items I have. It doesn't matter what URL you use as long as it makes sense to you and you think it will make sense to your users.

In our ASP.NET Core program we use the `Map` methods to create an endpoint that binds a URL to our code:

```csharp
app.MapGet("/hello", () => "Hello World!");
app.MapGet("/todos", () => new { TodoItem = "Learn about routing", Complete = false });
```

> If you run the app with the above `/todos` route and view it in a browser you will see that the framework has automatically converted the todo item to JSON.

### Route Variables

You can add variables to routes using curly braces like `{id}`:

```csharp
app.MapGet("/hello/{name}", (string name) => $"Hello {name}");
```

This endpoint will match URLs like `/hello/David` would return `Hello David`. If you add this method to the ones shown earlier then navigating to `/hello` would return `Hello World!` as the two endpoints have different routes and match differently.

> If you have two routes the same then your application will still run, but when you try to navigate to those routes you will get an error like:
![image](https://user-images.githubusercontent.com/234688/128390787-b3ab9769-a0c4-4a67-9d16-716bc52b4416.png)
In this image I have to `hello` routes and the framework can't tell which code you want it to run, so it throws an error. Remember that `hello/` and `hello` are the same as far as ASP.NET Core is concerned, the end slash doesn't make them different.

### Constraints

You can specify the type of a variable by doing `/hello/{name:int}` which would mean that the route would no longer match if you navigated to `/hello/David` but would match if you navigate to `/hello/1` because we said that our name variable should be an `int` in the route. These are called [Route Constraints](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/routing?view=aspnetcore-5.0#route-constraint-reference) and allow you to have fine control over what code gets run when users enter different types of URLs.

## Environments and Debugging

//Talk about error pages, ASPNETCORE_Environment, and maybe attaching in tools.

## HTTP Methods

//Map*

## Accessing Data

//Model Binding

## Error Handling

## Add Razor Pages and do some UI?

