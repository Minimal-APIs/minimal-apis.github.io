# What are minimal APIs?

Minimal APIs are a simplified approach for building fast HTTP APIs with ASP.NET Core. You can create fully functioning REST endpoints with minimal code and configuration.

```csharp
var app = WebApplication.Create(args);

app.MapGet("/", () => "Hello World!");

app.Run();
```

### Want to learn more? 

To your left, you will find a series of quickstarts that we have created to get you familiar with minimal APIs. Part documentation, part tutorial, [we guide you through common tasks ](/quickstart) and how to get your app off the ground. 

### Want to see some code examples? 

Here is [a list of common scenarios ](/hello-minimal) in minimal APIs.

### Want to jump straight into your first project?  

We have built a collection of tutorials and project ideas. Look through [the full list ](/tutorials), or you can start by [building a CRUD application ](/tutorials/crud) that serves as the backend for a productivity to-do app. 