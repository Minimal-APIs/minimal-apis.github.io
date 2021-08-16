
#Minimal server apps in c#

This page is designed to get you a good introduction to doing common tasks with a little C#.

If you want to follow along with the steps here then you first need to install the [.NET SDK](https://dotnet.microsoft.com/download/dotnet).

Once you have done that, open a terminal such as PowerShell, Command Prompt, or bash. Run the following command to create your first app:
```bash
dotnet new web --output minimalapp
```

This will create a new directory with a few files to get you started:

1. _Program.cs_: This is your first code file we will be editing for most of this guide.
1. _MinimalApp.csproj_: This is a project file that helps the `dotnet` command know how to run your code. We will ignore it for this guide as it has everything it needs already.
1. _appsettings.json_: This is a JSON configuration file with some initial settings for your app, we also will not be using these in this guide but you can use them to add your own settings like, for example, a connection string to get data from a database.

## Your app

The app in your _Program.cs_ looks like this:

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () => "Hello World!");

app.Run();
```

In a few lines of C#:

1. You create an app builder, which is used to configure the app. In this default example you aren't doing any configuration yet, so just build an `app` object. You use the builder to create an app and then you run the app, this is known as the builder pattern.
1. Build the `app` object, the `app` object is what we will use to route URLs to code.
1. You call `MapGet`, which is how you route URLs to code.
1. Finally, `app.Run` executes the app you configured in the previous lines. It's not until you call `Run` that your app will start and you can browse to URLs.

## Running your app

To run your app, use the `dotnet run` command on your terminal in the same directory as the _Program.cs_ file.

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

If you haven't changed any code in the _Program.cs_ and your app still fails to run then it is likely a problem with the installation of `dotnet`. But there are a couple of common things you might see:
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

## HTTP Methods

So far we've shown `MapGet` which allows you to specify a HTTP Get action, which is what a browser sends when you go to a URL. But there are other HTTP methods you are likely to want and you can use other Map methods to get those, for example `MapPost` or `MapPut`. The other Map methods work the same as `MapGet` that we've already seen but responds to a post or put respectively. You can learn more about [HTTP verbs here](). For now, think of using `Post` when sending data to the app and `Get` when getting data from the app.

```csharp
app.MapGet("/hello", () => "Hello World!");
app.MapGet("/todos", () => new { TodoItem = "Learn about routing", Complete = false });
app.MapPost("/todos", () => Result.Ok());
```

You will notice that `MapPost` and `MapGet` in this example are using the same URL. That is because the different verbs can all use the same URL and ASP.NET Core will invoke the right code for you. What this allows is for you to create a URL for your todos and use GET to get todos and POST to add a todo.


## Error Handling
If you have an unexpected error in your code then ASP.NET Core automatically tries to show you what went wrong:

```csharp
app.MapGet("/dobad", () => int.Parse("this is not an int"));
```

If I visit the `dobad` URL in a browser I will see this:

![image](https://user-images.githubusercontent.com/234688/129421056-51d1b7aa-ed3c-4cc3-8bc8-f3d2b0715f06.png)

and the following will appear in the terminal that I run `dotnet run` in:

![image](https://user-images.githubusercontent.com/234688/129421155-fb148b66-30ee-4156-ad5c-52c84f31ccac.png)

Both of these give you an idea of what's wrong, in this case that I tried to turn a string that isn't a number into an `int`.

## Environments
In the screenshot above you can see the terminal output saying `Hosting environment: Development`. This is controlled by the environment variable `ASPNETCORE_ENVIRONMENT`. If the `ASPNETCORE_ENVIRONMENT` is not set then ASP.NET Core assumes the value is `Production`, when ising `dotnet run` or editors like VS Code or Visual Studio they will set the value to `Development`.

The error handling page we showed above only appears when the environment is `Development`. You can check the environment value yourself like this:

```csharp
if(app.Environment.IsDevelopment())
{
    app.MapGet("/OnlyInDev", () => "This can only be accessed when the app is running in development.");
}
```

You can set the environment variable to whatever value you want and add whatever logic you like to your app based on the environmnent.

```csharp
if(app.Environment.EnvironmentName == "TestEnvironment")
{
    app.MapGet("/OnlyInTestEnvironment", () => "TestEnvironment");
}
```

The pre-defined values for environment are `Development`, `Staging`, and `Production`. `Development` is set by development time tooling like `dotnet run` and we assume that the environment is `Production` if it isn't set to anything. ASP.NET Core will add the error handling page to your app if the environment is `Development`.

## Accessing Data
OK, so if you use `MapPost` to send data to the code how does that work?

### Model Binding
The most common way of accessing data in ASP.NET Core is to create classes and let ASP.NET Core fill them in for you:

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/hello", () => "Hello World!");
app.MapGet("/todos", () => new { TodoItem = "Learn about routing", Complete = false });

app.MapPost("/todos", (Todo todo) => todo.Name);

app.Run();

class Todo
{
    public string Name {get;set;}
    public bool IsComplete {get;set;}
}
```

This code will send the name part of aIf I then use [Thunder Client]() in VS Code to send a request to the `todos` URL then it would look like this:

![image](https://user-images.githubusercontent.com/234688/129420178-3bbeefd0-1f62-4b24-9163-ec8e3c6a3cba.png)

ASP.NET will try to create an instance of the class you say you need from any JSON in the `body` of a request. It will also automatically convert any objects you return to JSON, like in our `GET` todos URL above.

### HttpContext
Another more basic way of accessing information, and data, from a request is using the `HttpContext` object. ASP.NET Core creates a `HttpContext` for each request, and you can access it in your code like this:

```csharp
app.MapGet("/hello/{name}", (HttpContext ctx) => $"Hello {ctx.Request.RouteValues["name"]}");
```

In this code we are accepting an `HttpContext` and using it to manually access the route value rather than letting ASP.NET Core automatically match it like we did in our exaxmple above. As well as all route values the `HttpContext` has access to all request information, like the body and cookies. You can read from the request property of HttpContext and write to the Response property, which ASP.NET Core does for you in all of the examples before this one.

## Returning HTML
If you want to return some HTML rather than processing JSON like we have been so far. ASP.NET Core uses a language called [Razor]() which is a mix of C# and HTML to make authoring UI easier. So we will add Razor to our app:

```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddRazorPages();
var app = builder.Build();

app.MapGet("/todos", () => new { TodoItem = "Learn about routing", Complete = false });
app.MapPost("/todos", (Todo todo) => todo.Name);

app.MapRazorPages();

app.Run();

class Todo
{
    public string Name {get;set;}
    public bool IsComplete {get;set;}
}
```

Then you can create a folder called `Pages` and a file in that folder called `Index.razor` with this content:

```razor
@page
<html>
    <body>
        <div>
            This is some content.
        </div>
    </body>
</html>
```

Then if you run your application and navigatge to `/` you will see your content:

![image](https://user-images.githubusercontent.com/234688/129422595-ad395a02-662f-46a3-beed-5f87cff6c774.png)

This is because `Index` is the name of the default URL that a browser will try to load. If you called your `cshtml` file `SomethingElse.cshtml` then you would navigate to `/SomethingElse` to see the content.
