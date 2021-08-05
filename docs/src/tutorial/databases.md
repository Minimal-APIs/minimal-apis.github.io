# Databases

## Working with Databases

We just learned how to build a basic [CRUD](CRUD.md) application with an in-memory database. Now, we are going to step it up notch work with a persistent database. For this tutorial we will be using [SQLite database](https://www.sqlite.org/index.html) but, you may use on that works better for you. 

### Learn checklist Three ✔️
- Setup SQLite database
- Create a SQLite database
- Perform SQLite CRUD operation from our todo api

## Setup SQLite database
**Setup SQLite Database using Entity Framework Core(EF Core)***

**Install the following tools and packages**

Using .NET CLI / Visual Studio package manager UI, install the following packages:

**[SQLite EF Core Database Provider](https://www.nuget.org/packages/Microsoft.EntityFrameworkCore.Sqlite/6.0.0-preview.5.21301.9)** : can access many different databases through plug-in libraries called [database providers](https://docs.microsoft.com/en-us/ef/core/providers/?tabs=dotnet-core-cli). The package below is the SQLite database provider for EF Core.

```console
TodoApi>dotnet add package Microsoft.EntityFrameworkCore.Sqlite --version 6.0.0-preview.6.21352.1
```

**[Entity Framework Core tools ](https://docs.microsoft.com/en-us/ef/core/cli/dotnet)**: tools for Entity Framework Core perform design-time development tasks. For example, they create migrations, apply migrations, and generate code for a model based on an existing database.

```console
TodoApi>dotnet tool install --global dotnet-ef
```

**[`Microsoft.EntityFrameworkCore.Design`](https://www.nuget.org/packages/Microsoft.EntityFrameworkCore.Design/6.0.0-preview.5.21301.9)** : contains all the design-time logic for EF core to create your database.

```console
TodoApi>dotnet add package Microsoft.EntityFrameworkCore.Design --version 6.0.0-preview.6.21352.1
```

## Enable database creation

We need to create a `Todo.db` with SQLite.

Notes 
- Set connection string 
```cs 
var connectionString = builder.Configuration.GetConnectionString("todos") ?? "Data Source=todos.db";
```
- Add this code to build services
```cs 
builder.Services.AddSqlite<TodoDb>(connectionString);
```

Delete the in memory database reference 

```cs
builder.Services.AddDbContext<TodoDb>( options => options.UseInMemoryDatabase("items"));
```

### Setup EF Install the following tool

- Install the following tools 

`dotnet tool install --global dotnet-ef`

`dotnet add package Microsoft.EntityFrameworkCore.Design --version 6.0.0-preview.5.21301.9`

- Setup EF migration: explain what migration 
