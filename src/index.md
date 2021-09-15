---
home: true
tagline: Build minimal APIs with C#
actionText:  Hello Minimal APIs →
actionLink: /hello-minimal/

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

Minimal APIs is built using C#. An open-source, modern, object-oriented, and type-safe programming language you'll love. Build an API in C# with just **3 lines of code**.

```csharp
var app = WebApplication.Create(args);

app.MapGet("/", () => "Hello World!");

app.Run();
```

### Routing

Minimal routes by design. Create meaningful low ceremony URLs that execute your code.

```csharp
app.MapGet("/", () => "Hello World!");
```
### Feels familiar

Minimal code patterns have been popular in JavaScript and Python web frameworks for a while. Whether you are familiar with Express or Flask, we think you can easily do things you enjoy about those frameworks with minimal APIs as well. 

**For example**

Routes in Express 
```JS
// GET method route
app.get('/', function (req, res) {
  res.send('GET request to the homepage')
})

// POST method route
app.post('/', function (req, res) {
  res.send('POST request to the homepage')
})
```
Routes in minimal APIs 
```csharp
app.MapGet("/", () => "GET request to the homepage");
app.MapPost("/", () => "POST request to the homepage");
```

