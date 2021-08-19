# Introduction

## Meet minimal APIs

Minimal APIs are a low ceremony way to build small microservices and HTTP APIs in ASP.NET Core. Minimal APIs hook into ASP.NET Core’s hosting and routing capabilities and allow you to create fully functioning APIs with just a few lines of code.

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () => "Hello World!");

app.Run();
```
We have created a series of quickstarts to get you familiar with minimal APIs.


