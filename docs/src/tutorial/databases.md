# Databases

## Working with Databases

We just learned how to build a basic [CRUD](CRUD.md) application with an in-memory database. Now, we are going to step it up notch and work with a persistent database. Meaning your data will be saved even after you shut down your application.

 For this tutorial we will be using [SQLite database](https://www.sqlite.org/index.html) but, you may use on that works better for you. 

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

In order to enable database creation they are couple of steps we need to complete:
1.  Set the database connection string.
2.  Migrate your data model *(see below)* to a SQLite database.
**Create a data model** 
```cs
class TodoItem
{
    public int Id { get; set; }
    public string? Item { get; set; }
    public bool IsComplete { get; set; }

}
```
3. Create your database and schema 


## Set connection string 

In `Program.cs` below your app builder `var builder = WebApplication.CreateBuilder(args);` add a connection string.

```cs 
var connectionString = builder.Configuration.GetConnectionString("todos") ?? "Data Source=todos.db";
```

## Add your context to your services

In the CRUD portion of this tutorial, we used an in-memory database. Now we are going to replace the in-memory database with a persistent database. 

Replace your current in-memory database implementation `builder.Services.AddDbContext<TodoDb>(options => options.UseInMemoryDatabase("items"));` in your build services with the SQLite one below: 

```cs 
builder.Services.AddSqlite<TodoDb>(connectionString);
```
## Migrate data model

With EF Core migration tool, you can now start your first migration `InitialCreate`.  In a terminal window, run the `migrations` command below:

```console 
TodoApi> dotnet ef migrations add InitialCreate
```

EF Core will create a folder called Migrations in your project directory containing two files *(see image below)*

![image](https://user-images.githubusercontent.com/2546640/128618497-8de76c16-cd38-48a8-9704-599c15d115f0.png)

## Create your database and schema
Now that you have completed the migration, you can use it to create your database and schema. In a terminal window, run the `database update` command below to apply migrations to a database:

```console 
TodoApi> dotnet ef database update
```
You should see a newly created `todos.db` file in your project directory *(see image below)*

![image](https://user-images.githubusercontent.com/2546640/128619644-e35bce93-0a87-4367-8790-0d09e837ba97.png)

Your persistent database is set up! Happy coding  😺 

