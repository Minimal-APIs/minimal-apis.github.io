# What are minimal APIs?

Minimal APIs are a clean and straightforward way to build small microservices and HTTP APIs in ASP.NET Core. No complicated scaffolding, no unnecessary dependencies. Minimal APIs hook into ASP.NET Core’s hosting and routing capabilities and allow you to create fully functioning APIs with just a few lines of code.

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

We have built a collection of tutorials and project ideas. Look through [the full list ](/tutorial), or you can start by [building a CRUD application ](/tutorial/crud) that serves as the backend for a productivity to-do app. 