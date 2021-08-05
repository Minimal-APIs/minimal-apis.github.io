# Let's build 
## Create Read Update Delete

In checklist one, you built simple API where you hard coded the results to HTTP method. 

For example:  `app.MapGet("/todo", () => new { Item = "Water plants", Complete = "false" });`  has been hard coded to return the JSON results below.

```json
{
"item": "Water plants",
"complete": "false"
}
```

In checklist 2 we are going to step it up a notch and create something dynamic. Instead of returning a static item that is hardcoded to our route, we are going to be creating to-do list we can update, create new items, mark an item as complete and delete an item. 

### Learn checklist Two ✔️
Our to-do APIs is going to:
- Create a new item.➕
- Return a specific item on a list.  :leftwards_arrow_with_hook:
- Update an existing item. :arrows_counterclockwise:
- Delete an item. ➖


Create a class that models the data we want to collect aka Data model. The code for your `TodoItem` will go after `app.Run();`

**Create a data model** 
```cs
class TodoItem
{
    public int Id { get; set; }
    public string? Item { get; set; }
    public bool IsComplete { get; set; }

}
```
Now, that we have defined that data we want to collect we need to save it. 

**Store an item** 

To store the items in the to do list we are going need to install  the Entity Frameworkcore InMemomry package below.

*What is Entity Framework?*  is a code library that enables the transfer of data stored in relational database tables(E.g. SQLite and MySQL, SQL server etc) into objects that are more commonly used in application code. 


**Using .NET CLI**

In your terminal window
```console
TodoApi>dotnet add package Microsoft.EntityFrameworkCore.InMemory --version 5.0.7
```
 
**In Visual Studio**

In Visual Studio you can use the Package Manager Console or Manager Nuget Package GUI.

```console
PM>Install-Package Microsoft.EntityFrameworkCore.InMemory -Version 5.0.7
```

Add `using Microsoft.EntityFrameworkCore;` to the top of your `Program.cs` file.

Now, that we have EntityFramework we can now wire up our code to the data we want save and query. To do this we are going to create a `TodoDb` class. This class is going to do the following:

- To exposed our `Todos` property from our list of `TodoItem` in the database.
- `UseInMemoryDatabase` wires the in memory database storage.This will store data as long the app is running.

To setup your in memory database add the following code snippets to our code.

**Snippet 1** : Below the `TodoItem` create a `TodoDb` class 

```cs 
class TodoDb : DbContext
{
    public TodoDb(DbContextOptions options) : base(options) { }
    public DbSet<TodoItem> Todos { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseInMemoryDatabase("Todos");
    }
}
```
`DbContext` represents a connection/session which is used to query and save instances of entities in a database.

**Snippet 2** : Before `AddSwaggerGen` services we configured in the [first tutorial](https://github.com/LadyNaggaga/minimal-apis-blog/blob/b5e97d3168b0948d8926afbd6dbc883cb32ba21a/Tutorials/Firststeps.md#interactive-api-docs) add the code snippet below.

``` cs
builder.Services.AddDbContext<TodoDb>(options => options.UseInMemoryDatabase("items"));
```
**Return a list of items** 

To read from a list of items in the todo list replace  the "/todo" route with the "/todos" route below. 

 ``` cs
 app.MapGet("/todos", async (TodoDb db) => await db.Todos.ToListAsync());
 ```

Go back your browser and navigate to `https://localhost:5001/swagger` click on the **GET**`/todos` button and you will see the list is empty under `Response body`.

![swagger-get-todos](https://user-images.githubusercontent.com/2546640/125181126-af45d000-e1cf-11eb-82a8-4691bdb9deb9.gif)

## Create new items 
 
 Let's `POST` new tasks to the todos list. Below `app.MapGet` you create earlier.

```cs 
app.MapPost("/todos", async (TodoDb db, TodoItem todo) =>
{
    await db.Todos.AddAsync(todo);
    await db.SaveChangesAsync();
    return Results.Created($"/todo/{todo.Id}", todo);
});
```
Go back to `Swagger` and now you should see  **`POST`**`/todos`. To add new items to the todo list 

- Click on **`POST`** `/todos` 
- Click on `Try it out`
- Update `id`, `item`, and `isComplete`
- Click `Execute`

![swagger-post-todos](https://user-images.githubusercontent.com/2546640/125181715-b079fb80-e1d5-11eb-96e1-befc11ae8a0a.gif)

**Read the items in the list** 

To read the items in the list 
- click on **`GET`**`/todos`
- Click on `Try it out`
- Click `Execute

The `Response body` will include the items just added.

```json
[
  {
    "id": 1,
    "item": "Buy groceries",
    "isComplete": true
  },
  {
    "id": 2,
    "item": "Water plants",
    "isComplete": false
  }
]
```
To `GET` an item by `id` add the code below `app.MapPost` route created earlier 

```cs
app.MapGet("/todos/{id}", async (TodoDb db, int id) => await db.Todos.FindAsync(id));

```
To check this out you can either go to `https://localhost:5001/todos/1` or use the swagger UI.
 ![swagger-get-todos-item](https://user-images.githubusercontent.com/2546640/125182403-bd99e900-e1db-11eb-83bb-72eb89b4386f.gif)

## Update an item 

To update an existing item add the code below `GET /todos/{id}` route we created above.

```cs 
app.MapPut("/todos/{id}", async ( TodoDb db, TodoItem updateTodo ,int id) =>
{
    var todo = await db.Todos.FindAsync(id);
    
    if (todo is null) return NotFound();
    
    todo.Item = updateTodo.Item;
    todo.IsComplete = updateTodo.IsComplete;

    await db.SaveChangesAsync();

    return Results.NoContent();
});
```
- click on **`PUT`**`/todos/{id}`
- Click on `Try it out`
- In the **`id`** text box enter 2
- Update `Request body` paste the JSON below and update `isComplete` to `true`.
``` json
 {
    "id": 2,
    "item": "Water plants",
    "isComplete": false
  }

```
- Click `Execute`

To test this out scroll back to **`GET`**`/todos/{id}` and now Water Plants is marked as complete.

![swagger-put-todos-item](https://user-images.githubusercontent.com/2546640/125183698-bdebb180-e1e6-11eb-80fd-c78c1ff01ea4.gif)

## Delete an item.

To delete an existing item add the code below **`PUT`**`/todos/{id}` we created above.

```cs
app.MapDelete("/todos/{id}", async (TodoDb db, int id) =>
{
    var todo = await db.Todos.FindAsync(id);
    if (todo is null)
    {
        return NotFound();
    }
    db.Todos.Remove(todo);
    await db.SaveChangesAsync();

    return Results.Ok();

});
```
Now, try deleting an item.
![swagger-delete-todos-item](https://user-images.githubusercontent.com/2546640/125184240-2daf6b80-e1ea-11eb-86db-6109bc04f700.gif)


 ### Learn checklist one ✔️   
  
 - Add model class and database context 
  - CRUD methods
      - `GET`:read an item.
      - `POST`: create an item.
      - `PUT`: update an item.
      - `DELETE`: delete an item.
 - Configured routing and returned values