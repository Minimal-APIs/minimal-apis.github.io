---
home: true
tagline: Build minimal APIs with C#
actionText: Quick Start →
actionLink: /quickstart/
features:
- title:  Minimalism First 🍃
  details: Rapidly move from idea to a functioning application. All the features of C# web applications without the ceremony.
- title: Grows With You 🌱
  details: As your web application grows, so do we! The C# ecosystem powers the most productive applications on the web.
- title: Incredibly Fast ⚡
  details: Proven to be one of the fastest web servers in the world, serving more than 4 million plaintext requests per second.


footer: Minimal APIs made for you with ❤️ from C# 
---
---

###  C# Ecosystem
Minimal APIs is built using C#. An open-source, modern, object-oriented, and type-safe programming language you'll love.Build an API in C# with just **four lines of code**.

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () => "Hello World!");

app.Run();
```
###  Minimal Routes
Minimal routes by design. Create meaningful low ceremony URLs that execute your code. 
```csharp
app.MapGet("/", () => "Hello World!");
```
###  Made for Microservices



::: tip
For official documentation on C# templates, please see the [Microsoft Docs](https://docs.microsoft.com/dotnet/core/tutorials/top-level-templates).
:::
