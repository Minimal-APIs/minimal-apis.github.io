# Minimal server apps in C#

To follow along with the steps in this quickstart you'll need to install the following:

- [.NET 6 SDK](https://dotnet.microsoft.com/download/dotnet)
- An integrated developer environment (IDE) such as, [VS Code](https://code.visualstudio.com/) or [Visual Studio](https://visualstudio.microsoft.com/)

Open a terminal such as *PowerShell*, *Command Prompt*, or *bash*. Run the following command to create your first app:

```bash
dotnet new web --output MinimalApp
```

This will create a new directory with a few files to get you started:

1. _Program.cs_: This is your first code file we will be editing for most of this guide.
1. _MinimalApp.csproj_: This is a project file that helps the `dotnet` command know how to run your code. We will ignore it for this guide as it has everything it needs already.
1. _appsettings.json_: This is a JSON configuration file with some initial settings for your app, we also will not be using these in this guide but you can use them to add your own settings like, for example, a connection string to get data from a database.

## Your app

The _Program.cs_ file looks like this:

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () => "Hello World!");

app.Run();
```

The preceding C# code:

- Creates an app builder, which is used to configure the app. In this default example you aren't doing any configuration yet, so just build an `app` object. You use the builder to create an app and then you run the app, this is known as the **builder pattern**.
- Builds the `app` object from the `builder`. The `app` object is what we will use to route URLs to code.
- Calls `MapGet`, to map the `"/"` route (or URL) to the code &mdash; which returns `"Hello World!"`.
- Finally, calls `app.Run` to execute the app you configured in the previous lines. It's not until you call `Run` that your app will start and you can browse to URLs.

## Running the app

To run the app, use the `dotnet run` command in your terminal from the same directory as the _Program.cs_ file.

```bash
cd MinimalApp && dotnet run
```

You will see log output similar to the following:

```bash
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

If you navigate to `https://localhost:5001` in a browser you will see the text `Hello World!` rendered as plaintext. The request exercises the `"/"` route which is mapped to the `"Hello World!"` code.

::: details Click here if you see something different

If you haven't changed any code in the _Program.cs_ and your app still fails to run then it is likely a problem with the installation of `dotnet`. But there are a couple of common things you might see:

- If you see an error saying `Couldn't find a project to run` then you are probably in the wrong directory, make sure your terminal is in the right place.
- If you see an error saying `Failed to bind to address https://127.0.0.1:5001: address already in use` then you probably have another `dotnet run` command running on another terminal window. You can stop that app by pressing `CTRL + C`. You can only have one app listening on a given address on a computer. We will talk about how to change the URL your app is listening on a bit later.

:::

## Routes

When building a web application you create meaningful URLs that execute your code. For example, going to the `/hello` route returns a "Hello World!" string and going to the `/todos` route returns all the *Todo* items. In our ASP.NET Core app we use the `Map{Verb}` &mdash; where the `{Verb}` is the HTTP verb for the endpoint being mapped to the code:

```csharp
app.MapGet("/hello", () => "Hello World!");
app.MapGet("/todos", () => new Todo("Learn about routing"));
```

::: tip
If you run the app with the `/todos` route and view it in a browser, you'll see it's automatically converted the `Todo` item to JavaScript Object Notation (JSON).
:::

### Route Variables

To use route variables, curly braces like `{id}` are used:

```csharp
app.MapGet("/hello/{name}", (string name) => $"Hello {name}");
```

This endpoint will match URLs like `/hello/David` and would return `Hello David`. If you add this method to the ones shown earlier, navigating to `/hello` would return `Hello World!` as the two endpoints have different routes and match differently.

::: tip NOTE
If you have two routes the same then your application will still run, but when you try to navigate to those routes you will get an error like similar to the following

![image](https://user-images.githubusercontent.com/234688/128390787-b3ab9769-a0c4-4a67-9d16-716bc52b4416.png)

In this image I have to `hello` routes and the framework can't tell which code you want it to run, so it throws an error. Remember that `hello/` and `hello` are the same as far as ASP.NET Core is concerned, the end slash doesn't make them different.
:::

### Constraints

You can specify the type of a route variable by adding a constraint in the placeholder declaration such as: `/hello/{name:int}`. This changes the meaning of the route and navigating to `/hello/David` would not match, however; if you navigate to `/hello/1` that would match. This is because our `name` variable is constrained to be an `int`. There are many built-in types allowed, and even the ability to specific custom constraints. For more information, see [Route Constraints](https://docs.microsoft.com/aspnet/core/fundamentals/routing?view=aspnetcore-5.0#route-constraint-reference).

## HTTP Methods

So far we've shown `MapGet` which allows you to specify an HTTP `GET` action, which is what a browser sends when you go to a URL. But there are other HTTP methods you are likely use, and other `Map` methods for those; such as `MapPost` and `MapPut`. The other `Map` methods work the same as `MapGet` that we've already explored, but respond to an HTTP `POST` or HTTP `PUT` respectively. When you want to send data to the app use `POST` and when you want to get data use `Get`. For more information, see [HTTP request methods here](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods).

```csharp
app.MapGet("/hello", () => "Hello World!");
app.MapGet("/todos", () => new Todo("Learn about routing"));
app.MapPost("/todos", () => Result.Ok());
```

You will notice that `MapPost` and `MapGet` in this example are using the same URL. That is because the different verbs can all use the same URL and ASP.NET Core will invoke the right code for you. What this allows is for you to create a URL for your todos and use `GET` to get todos and `POST` to add a todo.

## Error Handling

If you have an unexpected error in your code, ASP.NET Core automatically tries to show what went wrong &mdash; considering the following route:

```csharp
app.MapGet("/oops", () => int.Parse("this is not an integer"));
```

If you visit the `/oops` route in a browser you'll see this:

![FormatException page](/quickstart-1/formatexception.png)

Additionally, the following will appear in the terminal that called `dotnet run`:

```bash{13-23}
$ dotnet run
Building...
info: Microsoft.Hosting.Lifetime[14]
      Now listening on: https://localhost:5001
info: Microsoft.Hosting.Lifetime[14]
      Now listening on: http://localhost:5000
info: Microsoft.Hosting.Lifetime[0]
      Application started. Press Ctrl+C to shut down.
info: Microsoft.Hosting.Lifetime[0]
      Hosting environment: Development
info: Microsoft.Hosting.Lifetime[0]
      Content root path: ..\source\repos\MinimalApp
fail: Microsoft.AspNetCore.Diagnostics.DeveloperExceptionPageMiddleware[1]
      An unhandled exception has occurred while executing the request.
      System.FormatException: Input string was not in a correct format.
         at System.Number.ThrowOverflowOrFormatException(ParsingStatus status, TypeCode type) in System.Private.CoreLib.dll:token 0x600155a+0x0
         at System.Int32.Parse(String s) in System.Private.CoreLib.dll:token 0x6001284+0x0
         at <Program>$.<>c.<<Main>$>b__0_3() in ..\source\repos\MinimalApp\Program.cs:line 12
         at lambda_method4(Closure , Object , HttpContext )
         at Microsoft.AspNetCore.Http.RequestDelegateFactory.<>c__DisplayClass29_0.<Create>b__0(HttpContext httpContext) in Microsoft.AspNetCore.Http.Extensions.dll:token 0x6000163+0x0
         at Microsoft.AspNetCore.Routing.EndpointMiddleware.Invoke(HttpContext httpContext) in Microsoft.AspNetCore.Routing.dll:token 0x60000a8+0x7b
      --- End of stack trace from previous location ---
         at Microsoft.AspNetCore.Diagnostics.DeveloperExceptionPageMiddleware.Invoke(HttpContext context) in Microsoft.AspNetCore.Diagnostics.dll:token 0x60000aa+0x82
```

Both of these give you an idea of what's wrong, in this case that a string which isn't a number cannot be parsed as an `int`.

## Environments

In the screenshot above you can see the terminal output saying `Hosting environment: Development`. This is controlled by the environment variable `ASPNETCORE_ENVIRONMENT`. If the `ASPNETCORE_ENVIRONMENT` is not set then ASP.NET Core assumes the value is `Production`, when using `dotnet run` or editors like *VS Code* or *Visual Studio* they will set the value to `Development`.

The error handling page we showed above only appears when the environment is `Development`. You can check the environment value yourself like this:

```csharp
if (app.Environment.IsDevelopment())
{
    app.MapGet("/devenv",
        () => "This can only be accessed when the app is running in development.");
}
```

You can set the environment variable to whatever value you want and add whatever logic you like to your app based on the environment.

```csharp
if (app.Environment.EnvironmentName == "Testing")
{
    app.MapGet("/testingenv", () => "Testing");
}
```

The pre-defined values for environment are `Development`, `Staging`, and `Production`. `Development` is set by development time tooling like `dotnet run` and we assume that the environment is `Production` if it isn't set to anything. ASP.NET Core will add the error handling page to your app if the environment is `Development`.

<!-- TODO: Will this be covered in another quickstart?
## Accessing Data

OK, so if you use `MapPost` to send data to the code how does that work?
-->

### Model Binding

The most common way of accessing data in ASP.NET Core is to create classes and let ASP.NET Core fill them in for you:

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/hello", () => "Hello World!");
app.MapGet("/todos", () => new Todo("Learn about routing"));

app.MapPost("/todos", (Todo todo) => todo.Item);

app.Run();

record Todo(string Item, bool IsComplete = false);
```

The `POST` code will send the name part of the given `todo` back to the caller. To see this in action, the following is a screen capture from [Thunder Client](https://www.thunderclient.io) in VS Code:

![Example Thunder Client HTTP POST to the '/todos' route](/quickstart-1/thunder-client-example.png)

ASP.NET Core will deserialize the JSON in the `body` of a request to a `Todo` object. It will also automatically convert any objects you return to JSON, like in the `GET` `/todos` route.

### HTTP Context

Another way of accessing request information is from the `HttpContext` object. ASP.NET Core creates an `HttpContext` for each request, and you can access it in your code like this:

```csharp
app.MapGet("/hello/{name}",
    (HttpContext ctx) => $"Hello {ctx.Request.RouteValues["name"]}");
```

In this code we are accepting an `HttpContext` and using it to manually access the route value rather than letting ASP.NET Core automatically match it. In addition to the route values, the `HttpContext` has access to all request information, like the body and cookies. You can read from the request property of `HttpContext` and write to the `Response` property, which ASP.NET Core does for you in all of the examples before this one.

## Returning HTML

If you want to return HTML rather than JSON, you can use Razor syntax. ASP.NET Core uses a language called [Razor](https://docs.microsoft.com/aspnet/core/razor-pages) which is a mix of C# and HTML to make authoring UI easier. To add Razor Pages support:

```csharp
var builder = WebApplication.CreateBuilder(args)
builder.Services.AddRazorPages();
var app = builder.Build();

app.MapGet("/todos", () => new Todo("Learn about routing"));
app.MapPost("/todos", (Todo todo) => todo.Item);

app.MapRazorPages();

app.Run();

record Todo(string Item, bool IsComplete = false);
```

Then you can create a directory called *Pages* and a file named *Index.razor* with this content:

```html
@page "/page/route"

<html>
    <body>
        <p>Hi, from your friends on the .NET team!</p>
    </body>
</html>
```

Then if you run your application and navigate to `/page/route` you will see your content:

![image](https://user-images.githubusercontent.com/234688/129422595-ad395a02-662f-46a3-beed-5f87cff6c774.png)

This is because `Index` is the name of the default URL that a browser will try to load. If you called your `.razor` file `SomethingElse.razor` then you would navigate to `/SomethingElse` to see the content.
