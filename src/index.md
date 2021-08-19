---
home: true
tagline: The journey to build minimal APIs with C#
actionText: Quickstart →
actionLink: /quickstart/
features:
- title:  Minimalism First 🍃
  details: Rapidly move from idea to a functioning application. All the features of C# web applications without the ceremony.
- title: Grows With You 🌱
  details: As your web application grows, so do we! The C# ecosystem powers the most productive applications on the web.
- title: Incredibly Fast ⚡
  details: Proven to be one of the fastest web servers in the world, serving more than 4 million requests per second.
footer: Minimal APIs made for you with 💜 from C#
---
---

### Great for Microservices

Minimal APIs are great for building microservices for your applications fast.

### C# Ecosystem

Minimal APIs is built using C#. An open-source, modern, object-oriented, and type-safe programming language you'll love.Build an API in C# with just **four lines of code**.

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () => "Hello World!");

app.Run();
```

### Routing

Minimal routes by design. Create meaningful low ceremony URLs that execute your code.

```csharp
app.MapGet("/", () => "Hello World!");
```
