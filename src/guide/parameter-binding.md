# Parameter Binding

**Level: Intermediate** 🍃🍃

Starting in .NET 6, route handlers (the Delegate parameters in [EndpointRouteBuilderExtensions](https://docs.microsoft.com/dotnet/api/microsoft.aspnetcore.builder.endpointroutebuilderextensions) methods) can accept more than just an `HttpContext` as a parameter. Route handlers can now accept any number of parameters with various types bound from different sources. This guide describes the conventions that determine how each parameter is populated.

## Conventions

```cs
app.MapPut("/todos/{id}", async (TodoDb db, TodoItem updateTodo, int id) =>
{
    // ...
});
```

The route handler above accepts three parameters:

1. `TodoDb db` which comes from the service provider.
2. `TodoItem updateTodo` which is read as JSON from the request body.
3. `int id` which is read from the `{id}` segment of the route.

These were all determined by convention but could be specified explicitly with attributes as follows:

```cs
using Microsoft.AspNetCore.Mvc;

// ...

app.MapPut("/todos/{id}", async (
    [FromService] TodoDb db,
    [FromBody] TodoItem updateTodo,
    [FromRoute(Name = "id")] int nameDoesNotMatter) =>
{
    // ...
});
```

Parameters sources are determined using the following rules applied in order:

1. [Parameter attributes](#attributes) take precedence over conventions if they are present.
2. Any [well-known types](#well-known-types) are bound from the [HttpContext](https://docs.microsoft.com/dotnet/api/microsoft.aspnetcore.http.httpcontext) or one of its properties.
3. `string` parameters are bound from `HttpContext.RouteValues[{ParameterName}]` when `{ParameterName}` is part of the route pattern or `HttpContext.Query[{ParameterName}]` otherwise.
4. Types with public static [BindAsync](#bindasync) methods are bound using `BindAsync`.
5. Types with public static [TryParse](#tryparse) methods are bound by calling `TryParse` with `HttpContext.RouteValues[{ParameterName}]` or `HttpContext.Query[{ParameterName}]` depending on whether `{ParameterName}` is part of the route pattern. This includes most built-in numeric types, enums, `DateTime`, `TimeSpan` and more.
6. Types registered as a service are bound from request services.
7. Any remaining types are bound from the request body as JSON.

## Attributes

### `[FromRoute]`

[FromRouteAttribute](https://docs.microsoft.com/dotnet/api/microsoft.aspnetcore.mvc.fromrouteattribute) implements `Microsoft.AspNetCore.Http.Metadata.IFromRouteMetadata`. Any attribute implementing this interface is equivalent. This will bind the parameter from `HttpRequest.RouteValues[{ParameterName}]`. If the parameter is not a string, the parameter type's [TryParse](#tryparse) method will be called to convert the string to the parameter type.

If the `Name` property is provided (e.g. `[FromRoute(Name = "id")]`), the name specified using the property is used instead of the parameter name.

### `[FromQuery]`

[FromQueryAttribute](https://docs.microsoft.com/dotnet/api/microsoft.aspnetcore.mvc.fromqueryattribute) implements `Microsoft.AspNetCore.Http.Metadata.IFromQueryMetadata`. Any attribute implementing this interface is equivalent. This will bind the parameter from `HttpRequest.Query[{ParameterName}]`. If the parameter is not a string, the parameter type's [TryParse](#tryparse) method will be called to convert the string to the parameter type.

If the `Name` property is provided (e.g. `[FromQuery(Name = "page")]`), the name specified using the property is used instead of the parameter name.

### `[FromHeader]`

[FromHeaderAttribute](https://docs.microsoft.com/dotnet/api/microsoft.aspnetcore.mvc.fromheaderattribute) implements `Microsoft.AspNetCore.Http.Metadata.IFromHeaderMetadata`. Any attribute implementing this interface is equivalent. This will bind the parameter from `HttpRequest.Headers[{ParameterName}]`. If the parameter is not a string, the parameter type's [TryParse](#tryparse) method will be called to convert the string to the parameter type.

If the `Name` property is provided (e.g. `[FromHeader(Name = "X-My-Custom-Header")]`), the name specified using the property is used instead of the parameter name.

### `[FromServices]`

[FromServicesAttribute](https://docs.microsoft.com/dotnet/api/microsoft.aspnetcore.mvc.fromservicesattribute) implements `Microsoft.AspNetCore.Http.Metadata.IFromServiceMetadata`. Any attribute implementing this interface is equivalent. This will bind the parameter from request services as described in the [Services section](#services) of this doc.

### `[FromBody]`

[FromBodyAttribute](https://docs.microsoft.com/dotnet/api/microsoft.aspnetcore.mvc.frombodyattribute) implements `Microsoft.AspNetCore.Http.Metadata.IFromBodyMetadata`. Any attribute implementing this interface is equivalent. This will bind the parameter from the request body as JSON as described in the [JSON Request Body section](#json-request-body) of this doc.

If the `EmptyBodyBehavior` property is set to `EmptyBodyBehavior.Allow` (e.g. `[FromBody(EmptyBodyBehavior = EmptyBodyBehavior.Allow)]`), the parameter will be set to `null` or its `default` value if the request body is empty. This corresponds to the `IFromBodyMetadata.AllowEmpty` being true.

## Well-Known Types
If the delegate parameters are any of the following types, they will be populated from the [HttpContext](https://docs.microsoft.com/dotnet/api/microsoft.aspnetcore.http.httpcontext).
- HttpContext
- HttpRequest (`HttpContext.Request`)
- HttpResponse (`HttpContext.Response`)
- ClaimsPrincipal (`HttpContext.User`)
- CancellationToken (`HttpContext.RequestAborted`)

## BindAsync

If the parameter type, one of its parent/ancestor types or any of its implemented interfaces define a public static `BindAsync` method with one of the following signatures, the parameter will be bound using `BindAsync` assuming no parameter attribute specified another source.

```cs
public static ValueTask<{ParameterType}> BindAsync(HttpContext context, ParameterInfo parameter)
{
    // ...
}

// Or

public static ValueTask<{ParameterType}> BindAsync(HttpContext context)
{
    // ...
}
```

The return value can be either `ValueTask<{ParameterType}>` or `ValueTask<{ParameterType}?>`. Whether or not returning a `null` value results in an error is determined by the nullability of the parameter type. If the parameter type is non-nullable, the route handler will not be called and a bad request will be logged. If the parameter type is nullable, the route handler will be supplied a null value for the given parameter.

In the case where both overloads are defined anywhere in the parameter type's hierarchy, the `BindAsync` method with the `ParameterInfo` argument will be called.

If there is more than one `BindAsync` method with the same signature, the method from the most derived type will be called. `BindAsync` methods on interfaces are chosen last. A parameter type implementing more than one interface defining matching `BindAsync` methods is an error.

## TryParse

If the parameter type, one of its parent/ancestor types or any of its implemented interfaces define a public static `TryParse` method with one of the following signatures, the parameter will be bound using `TryParse` using the `string` from the source specified in the [Conventions section](#conventions) of this document.

```cs
public static bool TryParse(string? value, IFormatProvider formatProvider, out {ParameterType} result)
{
    // ...
}

// Or

public static bool TryParse(string? value, out {ParameterType} result)
{
    // ...
}
```

Whether or not returning false is an error is determined by the nullability of parameter type. If the parameter type is non-nullable, the route handler will not be called and a bad request will be logged. If the parameter type is nullable, the route handler will be supplied a null value for the given parameter.

In the case where both overloads are defined anywhere in the parameter type's hierarchy, the `TryParse` method with the `IFormatProvider` parameter will be called.

If there is more than one `TryParse` method with the same signature, the method from the most derived type will be called. `TryParse` methods on interfaces are chosen last. A parameter type implementing more than one interface defining matching `TryParse` methods is an error.

## Services

Service parameters are resolved from `HttpContext.RequestServices.GetService(typeof({ParameterType}))`.

Whether or not a given parameter type is a service is determined using `IServiceProviderIsService` unless the parameter is explicitly attributed with `[FromServices]`. Given the `[FromServices]` attribute, the parameter type is assumed to exist in the service provider.

For non-nullable parameters, the parameter type must be resolvable as a service for the route handler to be called. If the service does not exist, an exception will be thrown when the endpoint is hit. For nullable parameters, the route handler will be supplied a null value for the given parameter.

[IServiceProviderIsService](https://docs.microsoft.com/dotnet/api/microsoft.extensions.dependencyinjection.iserviceproviderisservice.isservice) is a new interface introduced in .NET 6 that is implemented by the default service provider and some third-party containers. If `IServiceProviderIsService` itself is not available as a service, the `[FromServices]` attribute must be used to resolve parameters from services.

## JSON Request Body

JSON request bodies are read using the [ReadFromJsonAsync](https://docs.microsoft.com/dotnet/api/system.net.http.json.httpcontentjsonextensions.readfromjsonasync#System_Net_Http_Json_HttpContentJsonExtensions_ReadFromJsonAsync__1_System_Net_Http_HttpContent_System_Text_Json_JsonSerializerOptions_System_Threading_CancellationToken_) extension method. This can be configured like all other calls to `ReadFromJsonAsync` using the [options pattern](https://docs.microsoft.com/aspnet/core/fundamentals/configuration/#configure-options-with-a-delegate-1) to configure [JsonOptions](https://docs.microsoft.com/dotnet/api/microsoft.aspnetcore.http.json.jsonoptions).

For non-nullable parameters, empty request bodies are disallowed by default. If a request matching the route pattern has an empty body, the route handler will not be called and a bad request will be logged.

Empty request bodies are always allowed when the parameter is nullable even if `EmptyBodyBehavior.Disallow` is set via the `[FromBody]` attribute.
