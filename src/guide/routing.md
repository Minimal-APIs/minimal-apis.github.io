# Routing 

**Level: Beginner** 🍃

## Basic routing 

The code is an example of a basic route.

```csharp
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () => "Hello World!");

app.Run();
```
## Route methods

## Route 