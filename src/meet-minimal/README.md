# Minimal APIs

## WebApplication

### Creating an application

```csharp
var app = WebApplication.Create(args);

app.MapGet("/", () => "Hello World");

app.Run();
```

This listens to port http://localhost:5000 and https://localhost:5001 by default.

### Changing the port

```csharp
var app = WebApplication.Create(args);

app.MapGet("/", () => "Hello World");

app.Run("http://localhost:3000");
```

### Multiple ports

```csharp
var app = WebApplication.Create(args);

app.Urls.Add("http://localhost:3000");
app.Urls.Add("http://localhost:4000");

app.MapGet("/", () => "Hello World");

app.Run();
```

### Reading the port from environment

```csharp
var app = WebApplication.Create(args);

var port = Environment.GetEnvironmentVariable("PORT") ?? "3000";

app.MapGet("/", () => "Hello World");

app.Run($"http://localhost:{port}");
```

### HTTPS with development certificate

```csharp
var app = WebApplication.Create(args);

app.Urls.Add("https://localhost:3000");

app.MapGet("/", () => "Hello World");

app.Run();
```

### HTTPS with custom certificate

```csharp
var builder = WebApplication.CreateBuilder(args);

// Configure the cert and the key
builder.Configuration["Kestrel:Certificates:Default:Path"] = "site.crt";
builder.Configuration["Kestrel:Certificates:Default:KeyPath"] = "site.key";

var app = builder.Build();

app.Urls.Add("https://localhost:3000");

app.MapGet("/", () => "Hello World");

app.Run();
```

### Reading the environment

```csharp
var app = WebApplication.Create(args);

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/oops");
}

app.MapGet("/", () => "Hello World");
app.MapGet("/oops", () => "Oops! An error happened.");

app.Run();
```

### Reading configuration

```csharp
var app = WebApplication.Create(args);

Console.WriteLine($"The configuration value is {app.Configuration["key"]}");

app.Run();
```

### Logging

```csharp
var app = WebApplication.Create(args);

app.Logger.LogInformation("The application started");

app.Run();
```

## WebApplicationBuilder

### Changing the content root, application name and environment

```csharp
var builder = WebApplication.CreateBuilder(new WebApplicationOptions
{
    ApplicationName = typeof(Program).Assembly.FullName,
    ContentRootPath = Directory.GetCurrentDirectory(),
    EnvironmentName = Environments.Staging
});

Console.WriteLine($"Application Name: {builder.Environment.ApplicationName}");
Console.WriteLine($"Environment Name: {builder.Environment.EnvironmentName}");
Console.WriteLine($"ContentRoot Path: {builder.Environment.ContentRootPath}");

var app = builder.Build();
```

### Changing the content root, application name and environment

These may also be specified via the following environment variables:

- `ASPNETCORE_ENVIRONMENT`
- `ASPNETCORE_CONTENTROOT`
- `ASPNETCORE_APPLICATIONNAME`

OR via command line arguments:

- `--applicationName`
- `--environment`
- `--contentRoot`

### Adding configuration providers

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Configuration.AddIniFile("appsettings.ini");

var app = builder.Build();
```

### Reading configuration

By default the `WebApplicationBuilder` reads configuration from:
- `appSettings.json`
- `appSettings.{environment}.json`
- environment variables
- The command line

```csharp
var builder = WebApplication.CreateBuilder(args);

// Reads the ConnectionStrings section of configuration and looks for a sub key called Todos
var connectionString = builder.Configuration.GetConnectionString("Todos");

Console.WriteLine($"My connection string is {connectionString}");

var app = builder.Build();
```

### Reading the environment

```csharp
var builder = WebApplication.CreateBuilder(args);

if (builder.Environment.IsDevelopment())
{
    Console.WriteLine($"Running in development");
}

var app = builder.Build();
```

### Adding logging providers

```csharp
var builder = WebApplication.CreateBuilder(args);

// Configure JSON logging to the console
builder.Logging.AddJsonConsole();

var app = builder.Build();
```

### Adding services

```csharp
var builder = WebApplication.CreateBuilder(args);

// Add the memory cache services
builder.Services.AddMemoryCache();

// Add a custom scoped service
builder.Services.AddScoped<ITodoRepository, TodoRepository>();

var app = builder.Build();
```

### Customizing the IHostBuilder

Existing extension methods on `IHostBuilder` can be accessed using the `Host` property.

```csharp
var builder = WebApplication.CreateBuilder(args);

// Wait 30 seconds for graceful shutdown
builder.Host.ConfigureHostOptions(o => o.ShutdownTimeout = TimeSpan.FromSeconds(30));

var app = builder.Build();
```

### Customizing the IWebHostBuilder

Existing extension methods on `IWebHostBuilder` can be accessed using the `WebHost` property.

```csharp
var builder = WebApplication.CreateBuilder(args);

// Change the HTTP server implemenation to be HTTP.sys based
builder.WebHost.UseHttpSys();

var app = builder.Build();
```

### Changing the web root

By default, the web root is relative to the content root in the `wwwroot` folder. This is where the static files
middleware expects to find static files. You can change this by using the `UseWebRoot` method on the `WebHost` property:

```csharp
var builder = WebApplication.CreateBuilder(args);

// Look for static files in webroot
builder.WebHost.UseWebRoot("webroot");

var app = builder.Build();
```

### Custom dependency injection container

This example uses [Autofac](https://autofac.readthedocs.io/en/latest/integration/aspnetcore.html)

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Host.UseServiceProviderFactory(new AutofacServiceProviderFactory());

// Register your own things directly with Autofac here. Don't
// call builder.Populate(), that happens in AutofacServiceProviderFactory
// for you.
builder.Host.ConfigureContainer<ContainerBuilder>(builder => builder.RegisterModule(new MyApplicationModule()));

var app = builder.Build();
```

### Adding Middleware

Any existing ASP.NET Core middleware can be configured on the WebApplication:

```csharp
var app = WebApplication.Create(args);

// Setup the file server to serve static files
app.UseFileServer();

app.Run();
```

### Developer Exception Page

The WebApplication has a the developer exception enabled by default when the environment is development:

```csharp
var app = WebApplication.Create(args);

app.MapGet("/", () => { throw new InvalidOperationException(); });

app.Run();
```

Navigating to `/` will render a friendly page that shows the exception.

### ASP.NET Core Middleware

|Middleware	|Description|API|
|--|--|--|
|Authentication|Provides authentication support. | `app.UseAuthentication()`
|Authorization|Provides authorization support. | `app.UseAuthorization()`
|CORS|Configures Cross-Origin Resource Sharing. | `app.UseCors()`
|Exception Handler| Globally handles exceptions thrown by the middleware pipeline. | `app.UseExceptionHandler()`
|Forwarded Headers| Forwards proxied headers onto the current request.	 | `app.UseForwardedHeaders()`
|HTTPS Redirection|Redirect all HTTP requests to HTTPS. | `app.UseHttpsRedirection()`
|HTTP Strict Transport Security (HSTS)|Security enhancement middleware that adds a special response header. | `app.UseHsts()`
|Request Logging|Provides support for logging HTTP requests and responses. | `app.UseHttpLogging()`
|W3C Request Logging|Provides support for logging HTTP requests and responses in the [W3C format](https://www.w3.org/TR/WD-logfile.html). | `app.UseW3CLogging()`
|Response Caching|Provides support for caching responses. | `app.UseResponseCaching()`
|Response Compression|Provides support for compressing responses. | `app.UseResponseCompression()`
|Session|Provides support for managing user sessions. | `app.UseSession()`
|Static Files|Provides support for serving static files and directory browsing. | `app.UseStaticFiles()`, `app.UseFileServer()`
|WebSockets|Enables the WebSockets protocol. | `app.UseWebSockets()`

## Routing

You can route to handlers using the various Map* methods on `WebApplication`. There's a `Map{HTTPMethod}` method to allow handling different HTTP methods:

```csharp
app.MapGet("/", () => "This is a GET");
app.MapPost("/", () => "This is a POST");
app.MapPut("/", () => "This is a PUT");
app.MapDelete("/", () => "This is a DELETE");
```

Other HTTP methods:

```csharp
app.MapMethods("/options-or-head", new [] { "OPTIONS", "HEAD" }, () => "This is an options or head request ");
```

### Route Handlers

Route handlers are methods that execute when the a route matches. Route handlers can be a function or any shape (including synchronous or asynchronous). It can be a lambda expression, a local function,
an instance method or a static method.

**Lambda expression**

```csharp
app.MapGet("/", () => "This is an inline lambda");

var handler = () => "This is a lambda variable";

app.MapGet("/", handler);
```

**Local function**

```csharp
string LocalFunction() => "This is local function"

app.MapGet("/", LocalFunction);
```

**Instance method**

```csharp
var handler = new HelloHandler();

app.MapGet("/", handler.Hello);

class HelloHandler
{
    public string Hello() 
    {
        return "Hello World";
    }
}
```

**Static method**

```csharp
app.MapGet("/", HelloHandler.Hello);

class HelloHandler
{
    public static string Hello() 
    {
        return "Hello World";
    }
}
```

This provides the appropriate flexiblity when deciding how to organize your route handlers.

### Naming routes and link generation

Routes can be given names in order to generate URLs to them. This avoids having to hard code paths in your application.

```csharp
app.MapGet("/hello", () => "Hello there")
   .WithName("hi");

app.MapGet("/", (LinkGenerator linker) => $"The link to the hello route is {linker.GetPathByName("hi", values: null)}");
```

Route names are inferred from method names if specified:

```csharp
string Hi() => "Hello there";

app.MapGet("/hello", Hi);

app.MapGet("/", (LinkGenerator linker) => $"The link to the hello route is {linker.GetPathByName("Hi", values: null)}");
```

**NOTE: Route names are case sensitive!**

These names must be globally unique and are also used as the OpenAPI operation id when OpenAPI support is enabled (see the OpenAPI/Swagger section for more details).

### Route Parameters

You can capture route parameters as part of the route pattern definition:

```csharp
app.MapGet("/users/{userId}/books/{bookId}", (int userId, int bookId) => $"The user id is {userId} and book id is {bookId}");
```

The route handler can declare the parameters that it wants to capture, and when a request is made to this route, the parameters will be parsed and passed to the handler. This makes it easy to capture the values in a type safe way (above, you can be sure that the `userId` and `bookId` are both `int`).

If the route values are not valid `int`s then an exception will be thrown. The following request will result in the exception below:

```
GET /users/hello/books/3
```

```
Microsoft.AspNetCore.Http.BadHttpRequestException: Failed to bind parameter "int userId" from "hello".
    at Microsoft.AspNetCore.Http.RequestDelegateFactory.Log.ParameterBindingFailed(HttpContext httpContext, String parameterTypeName, String parameterName, String sourceValue, Boolean shouldThrow)
    at lambda_method1(Closure , Object , HttpContext )
    at Microsoft.AspNetCore.Http.RequestDelegateFactory.<>c__DisplayClass37_0.<Create>b__0(HttpContext httpContext)
```

### Wildcards/Catch all routes

```csharp
app.MapGet("/posts/{rest*}", (string rest) => $"Routing to {rest}");
```

### Route constraints

Route constraints are influence the matching behavior of a route.

```csharp
app.MapGet("/todos/{id:int}", (int id) => db.Todos.Find(id));
app.MapGet("/todos/{text}", (string text) => db.Todos.Where(t => t.Text.Contains(text));
app.MapGet("/posts/{slug:regex(^[a-z0-9_-]+$)}", (string slug) => $"Post {slug}");
```

|Path|Match|
|--|--|
|`/todos/1`|`/todos/{id:int}`|
|`/todos/something`|`/todos/{text}`|
|`/posts/mypost`| `/posts/{slug:regex(^[a-z0-9_-]+$)}` |
|`/posts/%`| No match |

### Built in contraints

| constraint | Example | Example Matches | Notes |
| ---------- | ------- | --------------- | ----- |
| `int` | `{id:int}` | `123456789`, `-123456789` | Matches any integer |
| `bool` | `{active:bool}` | `true`, `FALSE` | Matches `true` or `false`. Case-insensitive |
| `datetime` | `{dob:datetime}` | `2016-12-31`, `2016-12-31 7:32pm` | Matches a valid `DateTime` value in the invariant culture. See preceding warning. |
| `decimal` | `{price:decimal}` | `49.99`, `-1,000.01` | Matches a valid `decimal` value in the invariant culture. See preceding warning.|
| `double` | `{weight:double}` | `1.234`, `-1,001.01e8` | Matches a valid `double` value in the invariant culture. See preceding warning.|
| `float` | `{weight:float}` | `1.234`, `-1,001.01e8` | Matches a valid `float` value in the invariant culture. See preceding warning.|
| `guid` | `{id:guid}` | `CD2C1638-1638-72D5-1638-DEADBEEF1638` | Matches a valid `Guid` value |
| `long` | `{ticks:long}` | `123456789`, `-123456789` | Matches a valid `long` value |
| `minlength(value)` | `{username:minlength(4)}` | `Rick` | String must be at least 4 characters |
| `maxlength(value)` | `{filename:maxlength(8)}` | `MyFile` | String must be no more than 8 characters |
| `length(length)` | `{filename:length(12)}` | `somefile.txt` | String must be exactly 12 characters long |
| `length(min,max)` | `{filename:length(8,16)}` | `somefile.txt` | String must be at least 8 and no more than 16 characters long |
| `min(value)` | `{age:min(18)}` | `19` | Integer value must be at least 18 |
| `max(value)` | `{age:max(120)}` | `91` | Integer value must be no more than 120 |
| `range(min,max)` | `{age:range(18,120)}` | `91` | Integer value must be at least 18 but no more than 120 |
| `alpha` | `{name:alpha}` | `Rick` | String must consist of one or more alphabetical characters, `a`-`z` and case-insensitive. |
| `regex(expression)` | `{ssn:regex(^\\d{{3}}-\\d{{2}}-\\d{{4}}$)}` | `123-45-6789` | String must match the regular expression. See tips about defining a regular expression. |
| `required` | `{name:required}` | `Rick` | Used to enforce that a non-parameter value is present during URL generation |

## Parameter Binding

Parameter binding is the process of turning request data into strongly typed parameters that are expressed by route handlers. A binding source determines where parameters are bound from. Binding sources can be explict or inferred based HTTP method and parameter type.

Supported binding sources:
- Route values
- Query string
- Header
- Body (as JSON)
- Services provided by dependency injection
- Custom

### GET, HEAD, OPTIONS, DELETE

The HTTP methods GET, HEAD, OPTIONS, DELETE will never bind from body. All other binding sources are supported.

**NOTE: If you need to support the case where you have a GET with a body, you can directly read it from the HttpRequest.**

```csharp
var builder = WebApplication.CreateBuilder(args);

// Added as service
builder.AddSingleton<Service>();

var app = builder.Build();

app.MapGet("/{id}", (int id, int page, Service service) => { });

class Service { }
```
|Parameter| Binding Source|
|--|--|
|id|route value|
|page|query string|
|service|provided by dependency injection|

### Other verbs (POST, PUT, PATCH, etc)

```csharp
var builder = WebApplication.CreateBuilder(args);

// Added as service
builder.AddSingleton<Service>();

app.MapPost("/", (Person person, Service service) => { });

class Service { }

record Person(string Name, int Age);
```

|Parameter| Binding Source|
|--|--|
|person|body (as JSON)|
|service|provided by dependency injection|

### Explicit Parameter Binding

Attributes can be used to explicitly declare where parameters should be bound from.

```csharp
using Microsoft.AspNetCore.Mvc;

app.MapGet("/{id}", ([FromRoute]int id, 
                     [FromQuery(Name = "p")]int page, 
                     [FromServices]Service service, 
                     [FromHeader(Name = "Content-Type")]string contentType) => { });
```

|Parameter| Binding Source|
|--|--|
|id|route value with the name id|
|page|query string with the name `"p"`|
|service|provided by dependency injection|
|contentType|header with the name `"Content-Type"`|

Binding from form values is not supported at this time.

### Optional parameters

Parameters declared in route handlers will be treated as required. This means if a request matches the route, the route handler will only execute if all required paramters are provided in the request. Failure to do so will result in an error.

```csharp
app.MapGet("/products", (int pageNumber) => $"Requesting page {pageNumber}");
```

Since the `pageNumber` paramter is required, this route handler won't execute if the query string `pageNumber` isn't provided. To make it optional define the type as nullable.

```csharp
app.MapGet("/products", (int? pageNumber) => $"Requesting page {pageNumber ?? 1}");
```

This also works with methods that have a default value:

```csharp
string ListProducts(int pageNumber = 1) => $"Requesting page {pageNumber}";

app.MapGet("/products", ListProducts);
```

The above will default to 1 if the pageNumber isn't specified in the query string.

This logic applies to all sources.

```csharp
app.MapPost("/products", (Product? product) => () => { });
```

The above will call the method with a null product if no request body was sent.

**NOTE: If invalid data is provided and the parameter is nullable, the route handler will not be executed.**

```csharp
app.MapGet("/products", (int? pageNumber) => $"Requesting page {pageNumber ?? 1}");
```

The following request will result in a 400 (see the **Binding Failures** section below for more details)

```
GET /products?pageNumber=two
```

### Special types

There are some special types that the framework supports binding without any explicit attributes:

- `HttpContext` - The context which holds all the information about the current http request/response.
- `HttpRequest` - The http request
- `HttpResponse` - The http reponse
- `CancellationToken` - The cancellation token associated with the current http request.
- `ClaimsPrincipal` - The user associated with the request (`HttpContext.User`).

### Custom Binding

There are 2 ways to customize parameter binding:

1. For route, query, and header binding sources, you may bind custom types by adding a static `TryParse` method to your type.
2. You can completely take over the binding process by implementing a `BindAsync` method on your type.

**TryParse**

The TryParse method must be of the form(s):

```csharp
public static bool TryParse(string value, T out result);
public static bool TryParse(string value, IFormatProvider provider, T out result);
```

**Example**

```csharp
app.MapGet("/map/{point}", (Point point) => $"Point: {point.X}, {point.Y}");

public class Point
{
    public double X { get; set; }
    public double Y { get; set; }

    public static bool TryParse(string? value, IFormatProvider? provider, out Point? point)
    {
        // Format is "(12.3,10.1)"
        var trimmedValue = value?.TrimStart('(').TrimEnd(')');
        var segments = trimmedValue?.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);
        if (segments?.Length == 2
            && double.TryParse(segments[0], out var x)
            && double.TryParse(segments[1], out var y))
        {
            point = new Point { X = x, Y = y };
            return true;
        }

        point = null;
        return false;
    }
}
```

A request to `/point?point=(12.3,10.1)` returns:

```
Point: 12.3,10.1
```

**BindAsync**

The `BindAsync` method must be of the form:

```csharp
public static ValueTask<T?> BindAsync(HttpContext context, ParameterInfo parameter);
```

**Example**

```csharp
app.MapGet("/products", (PagingData pageData) => $"SortBy:{pageData.SortBy}, SortDirection:{pageData.SortDirection}, CurrentPage:{pageData.CurrentPage}");

public class PagingData
{
    public string? SortBy { get; init; }
    public SortDirection SortDirection { get; init; }
    public int CurrentPage { get; init; } = 1;

    public static ValueTask<PagingData?> BindAsync(HttpContext context, ParameterInfo parameter)
    {
        const string sortByKey = "sortBy";
        const string sortDirectionKey = "sortDir";
        const string currentPageKey = "page";

        Enum.TryParse<SortDirection>(context.Request.Query[sortDirectionKey], ignoreCase: true, out var sortDirection);
        int.TryParse(context.Request.Query[currentPageKey], out var page);
        page = page == 0 ? 1 : page;

        var result = new PagingData
        {
            SortBy = context.Request.Query[sortByKey],
            SortDirection = sortDirection,
            CurrentPage = page
        };

        return ValueTask.FromResult<PagingData?>(result);
    }
}

public enum SortDirection
{
    Default,
    Asc,
    Desc
}
```

### Binding failures

When binding fails, the framework will log a debug message and it will return various status codes to the client
depending on the failure mode.

|Failure mode|Nullable Parameter Type|Binding Source|Status code|
|--|--|--|--|
|`{ParameterType}.TryParse` returns false |yes|route/query/header|400|
|`{ParameterType}.BindAsync` returns null |yes|custom|400|
|`{ParameterType}.BindAsync` throws |does not matter|custom|500|
| Failure to read JSON body |does not matter|body|400|
| Wrong content type (not application/json) |does not matter|body|415|

### Binding Precedence

The rules for determining a binding source from a parameter are as follows:

1. Explicit attribute defined on parameter (From* attributes) in the following order:
    1. Route values (`FromRoute`)
    1. Query string (`FromQuery`)
    1. Header (`FromHeader`)
    1. Body (`FromBody`)
    1. Service (`FromServices`)
1. Special types
    1. `HttpContext`
    1. `HttpRequest`
    1. `HttpResponse`
    1. `ClaimsPrincipal`
    1. `CancellationToken`
1. Parameter type has a valid `BindAsync` method.
1. Parameter type is a string or has a valid `TryParse` method.
   1. If the parameter name exists in the route template e.g. `app.Map("/todo/{id}", (int id) => {});`, then it will be bound from the route.
   1. It will be bound from the query string.
1. If the parameter type is a service provided by dependency injection, it will use that as the source.
1. The parameter is from the body.

### Customizing JSON binding

The body binding source uses System.Text.Json for de-serialization. It is *NOT* possible to change this default but you can customize
the binding using other techniques described in above sections. To customize JSON serializer options, you can use
the following:

```csharp
using Microsoft.AspNetCore.Http.Json;

var builder = WebApplication.CreateBuilder(args);

// Configure JSON options
builder.Services.Configure<JsonOptions>(options =>
{
    options.SerializerOptions.IncludeFields = true;
});

var app = builder.Build();

app.MapPost("/products", (Product product) => product);

app.Run();

class Product
{
    // These are public fields instead of properties
    public int Id;
    public string Name;
}
```

This configures both the input and output default JSON options.

## Responses

Route handlers support 2 types of return values:

1. `IResult` based - This includes `Task<IResult>` and `ValueTask<IResult>`
1. `string` - This includes `Task<string>` and `ValueTask<string>`
1. `T` (Any other type) - This includes `Task<T>` and `ValueTask<T>`

|Return value|Behavior|Content-Type|
|--|--|--|
|`IResult` | The framework calls `IResult.ExecuteAsync`| Decided by the `IResult` implementation
|`string` | The framework writes the string directly to the response | `text/plain`
| `T` (Any other type) | The framework will JSON serialize the response| `application/json`

**Example: string return values**

```csharp
app.MapGet("/hello", () => "Hello World");
```

**Example: JSON return values**

```csharp
app.MapGet("/hello", () => new { Message = "Hello World" });
```

**Example: IResult return values**

```csharp
app.MapGet("/hello", () => Results.Ok(new { Message = "Hello World" }));
```

The following example uses the built-in result types to customize the response:

```csharp
app.MapGet("/todos/{id}", (int id, TodoDb db) => 
    db.Todos.Find(id) is Todo todo 
        ? Results.Ok(todo)
        : Results.NotFound()
);
```

### JSON

```csharp
app.MapGet("/hello", () => Results.Json(new { Message = "Hello World" }));
```

### Custom Status Code

```csharp
app.MapGet("/405", () => Results.StatusCode(405));
```

### Text

```csharp
app.MapGet("/text", () => Results.Text("This is some text"));
```

### Stream

```csharp
var proxyClient = new HttpClient();
app.MapGet("/pokemon", async () => 
{
    var stream = await proxyClient.GetStreamAsync("http://myurl/pokedex.json")
    // Proxy the response as JSON
    return Results.Stream(stream, "application/json");
});
```

### Redirect

```csharp
app.MapGet("/old-path", () => Results.Redirect("/new-path"));
```

### File

```csharp
app.MapGet("/download", () => Results.File("foo.text"));
```

### Built-in results

Common result helpers exist on the `Microsoft.AspNetCore.Http.Results` static class.

|Description|Response type|Status Code|API|
|--|--|--|--|
Write a JSON response with advanced options |application/json |200|`Results.Json`|
|Write a JSON response |application/json |200|`Results.Ok`|
|Write a text response |text/plain (default), configurable |200|`Results.Text`|
|Write the response as bytes |application/octet-stream (default), configurable |200|`Results.Bytes`|
|Write a stream of bytes to the response |application/octet-stream (default), configurable |200|`Results.Stream`|
|Stream a file to the response for download with the content-disposition header |application/octet-stream (default), configurable |200|`Results.File`|
|Set the status code to 404, with an optional JSON response | N/A |404|`Results.NotFound`|
|Set the status code to 204 | N/A |204|`Results.NoContent`|
|Set the status code to 422, with an optional JSON response | N/A |422|`Results.UnprocessableEntity`|
|Set the status code to 400, with an optional JSON response | N/A |400|`Results.BadRequest`|
|Set the status code to 409, with an optional JSON response | N/A |409|`Results.Conflict`|
|Write a problem details JSON object to the response | N/A |500 (default), configurable|`Results.Problem`|
|Write a problem details JSON object to the response with validation errors | N/A | N/A, configurable|`Results.ValidationProblem`|

### Customizing results

Users can take control of responses by implementing a custom `IResult` type. Here's an example of an HTML result type:

```csharp
namespace Microsoft.AspNetCore.Http;

static class ResultsExtensions
{
    public static IResult Html(this IResultExtensions resultExtensions, string html)
    {
        ArgumentNullException.ThrowIfNull(resultExtensions, nameof(resultExtensions));

        return new HtmlResult(html);
    }
}

class HtmlResult : IResult
{
    private readonly string _html;

    public HtmlResult(string html)
    {
        _html = html;
    }

    public Task ExecuteAsync(HttpContext httpContext)
    {
        httpContext.Response.ContentType = MediaTypeNames.Text.Html;
        httpContext.Response.ContentLength = Encoding.UTF8.GetByteCount(_html);
        return httpContext.Response.WriteAsync(_html);
    }
}
```

We recommend adding an extension method to `Microsoft.AspNetCore.Http.IResultExtensions` to make these custom results more discoverable.

```csharp
app.MapGet("/html", () => Results.Extensions.Html(@$"<!doctype html>
<html>
    <head><title>miniHTML</title></head>
    <body>
        <h1>Hello World</h1>
        <p>The time on the server is {DateTime.Now:O}</p>
    </body>
</html>"));
```

## Authorization

Routes can be protected using authorization policies. These can be declared via the authorize attribute or by using the `RequireAuthorization` method call.

```csharp
app.MapGet("/auth", [Authorize] () => "This endpoint requires authorization");
```

OR

```csharp
app.MapGet("/auth", () => "This endpoint requires authorization")
   .RequireAuthorization();
```

Authorization policies can be configured as well:

```csharp
app.MapGet("/admin", [Authorize("AdminsOnly")] () => "This endpoint is for admins only");
```

OR

```csharp
app.MapGet("/admin", () => "This endpoint is for admins only")
   .RequireAuthorization("AdminsOnly");
```

## Open API/Swagger

It's possible to describe the OpenAPI specification for route handlers using [Swashbuckle](https://www.nuget.org/packages/Swashbuckle.AspNetCore/). 

Below is an example of a typical ASP.NET Core application with OpenAPI suppport:

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new() { Title = builder.Environment.ApplicationName, Version = "v1" });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", $"{builder.Environment.ApplicationName} v1"));
}
```

### Describing response types

```csharp
app.MapGet("/api/products", (int id, ProductDb db) => db.Products.Find(id) is Product product ? Results.Ok(product) : Results.NotFound())
   .Produces<Product>(200)
   .Produces(404);
```

### Exclude Open API description

```csharp
app.MapGet("/skipme", () => { })
   .ExcludeFromDescription();
```

### Add operation ids to Open API

```csharp
app.MapGet("/api/products", (ProductDb db) => db.Products.ToListAsync())
   .WithName("GetProducts");
```

### Add tags to the Open API description (used for grouping)

```csharp
app.MapGet("/api/products", (ProductDb db) => db.Products.ToListAsync())
   .WithTags("ProductsGroup");
```

### Describe request body

```csharp
app.MapGet("/upload", async (HttpRequest req) =>
{
    if (!req.HasFormContentType)
    {
        return Results.BadRequest();
    }

    var form = await req.ReadFormAsync();
    var file = form.Files["file"];

    if (file is null)
    {
        return Results.BadRequest();
    }

    var uploads = Path.Combine(uploadsPath, file.FileName);
    await using var fileStream = File.OpenWrite(uploads);
    await using var uploadStream = file.OpenReadStream();
    await uploadStream.CopyToAsync(fileStream);

    return Results.NoContent();
})
.Accepts<IFormFile>("multipart/form-data");
```

