(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{437:function(e,t,a){"use strict";a.r(t);var s=a(34),r=Object(s.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"parameter-binding"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#parameter-binding"}},[e._v("#")]),e._v(" Parameter Binding")]),e._v(" "),a("p",[a("strong",[e._v("Level: Intermediate")]),e._v(" 🍃🍃")]),e._v(" "),a("p",[e._v("Starting in .NET 6, route handlers (the Delegate parameters in "),a("a",{attrs:{href:"https://docs.microsoft.com/dotnet/api/microsoft.aspnetcore.builder.endpointroutebuilderextensions",target:"_blank",rel:"noopener noreferrer"}},[e._v("EndpointRouteBuilderExtensions"),a("OutboundLink")],1),e._v(" methods) can accept more than just an "),a("code",[e._v("HttpContext")]),e._v(" as a parameter. Route handlers can now accept any number of parameters with various types bound from different sources. This guide describes the conventions that determine how each parameter is populated.")]),e._v(" "),a("h2",{attrs:{id:"conventions"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#conventions"}},[e._v("#")]),e._v(" Conventions")]),e._v(" "),a("div",{staticClass:"language-cs line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-cs"}},[a("code",[e._v("app"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[e._v("MapPut")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[e._v('"/todos/{id}"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("async")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("(")]),a("span",{pre:!0,attrs:{class:"token class-name"}},[e._v("TodoDb")]),e._v(" db"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[e._v("TodoItem")]),e._v(" updateTodo"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[a("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("int")])]),e._v(" id"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=>")]),e._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// ...")]),e._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(";")]),e._v("\n")])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br"),a("span",{staticClass:"line-number"},[e._v("3")]),a("br"),a("span",{staticClass:"line-number"},[e._v("4")]),a("br")])]),a("p",[e._v("The route handler above accepts three parameters:")]),e._v(" "),a("ol",[a("li",[a("code",[e._v("TodoDb db")]),e._v(" which comes from the service provider.")]),e._v(" "),a("li",[a("code",[e._v("TodoItem updateTodo")]),e._v(" which is read as JSON from the request body.")]),e._v(" "),a("li",[a("code",[e._v("int id")]),e._v(" which is read from the "),a("code",[e._v("{id}")]),e._v(" segment of the route.")])]),e._v(" "),a("p",[e._v("These were all determined by convention but could be specified explicitly with attributes as follows:")]),e._v(" "),a("div",{staticClass:"language-cs line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-cs"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("using")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token namespace"}},[e._v("Microsoft"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(".")]),e._v("AspNetCore"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(".")]),e._v("Mvc")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(";")]),e._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// ...")]),e._v("\n\napp"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[e._v("MapPut")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[e._v('"/todos/{id}"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("async")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("(")]),e._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("[")]),a("span",{pre:!0,attrs:{class:"token attribute"}},[a("span",{pre:!0,attrs:{class:"token class-name"}},[e._v("FromService")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("]")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[e._v("TodoDb")]),e._v(" db"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("[")]),a("span",{pre:!0,attrs:{class:"token attribute"}},[a("span",{pre:!0,attrs:{class:"token class-name"}},[e._v("FromBody")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("]")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[e._v("TodoItem")]),e._v(" updateTodo"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("[")]),a("span",{pre:!0,attrs:{class:"token attribute"}},[a("span",{pre:!0,attrs:{class:"token class-name"}},[e._v("FromRoute")]),a("span",{pre:!0,attrs:{class:"token attribute-arguments"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("(")]),e._v("Name "),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[e._v('"id"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")])])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("]")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[a("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("int")])]),e._v(" nameDoesNotMatter"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=>")]),e._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// ...")]),e._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(";")]),e._v("\n")])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br"),a("span",{staticClass:"line-number"},[e._v("3")]),a("br"),a("span",{staticClass:"line-number"},[e._v("4")]),a("br"),a("span",{staticClass:"line-number"},[e._v("5")]),a("br"),a("span",{staticClass:"line-number"},[e._v("6")]),a("br"),a("span",{staticClass:"line-number"},[e._v("7")]),a("br"),a("span",{staticClass:"line-number"},[e._v("8")]),a("br"),a("span",{staticClass:"line-number"},[e._v("9")]),a("br"),a("span",{staticClass:"line-number"},[e._v("10")]),a("br"),a("span",{staticClass:"line-number"},[e._v("11")]),a("br")])]),a("p",[e._v("Parameters sources are determined using the following rules applied in order:")]),e._v(" "),a("ol",[a("li",[a("a",{attrs:{href:"#attributes"}},[e._v("Parameter attributes")]),e._v(" take precedence over conventions if they are present.")]),e._v(" "),a("li",[e._v("Any "),a("a",{attrs:{href:"#well-known-types"}},[e._v("well-known types")]),e._v(" are bound from the "),a("a",{attrs:{href:"https://docs.microsoft.com/dotnet/api/microsoft.aspnetcore.http.httpcontext",target:"_blank",rel:"noopener noreferrer"}},[e._v("HttpContext"),a("OutboundLink")],1),e._v(" or one of its properties.")]),e._v(" "),a("li",[a("code",[e._v("string")]),e._v(" parameters are bound from "),a("code",[e._v("HttpContext.RouteValues[{ParameterName}]")]),e._v(" when "),a("code",[e._v("{ParameterName}")]),e._v(" is part of the route pattern or "),a("code",[e._v("HttpContext.Query[{ParameterName}]")]),e._v(" otherwise.")]),e._v(" "),a("li",[e._v("Types with public static "),a("a",{attrs:{href:"#bindasync"}},[e._v("BindAsync")]),e._v(" methods are bound using "),a("code",[e._v("BindAsync")]),e._v(".")]),e._v(" "),a("li",[e._v("Types with public static "),a("a",{attrs:{href:"#tryparse"}},[e._v("TryParse")]),e._v(" methods are bound by calling "),a("code",[e._v("TryParse")]),e._v(" with "),a("code",[e._v("HttpContext.RouteValues[{ParameterName}]")]),e._v(" or "),a("code",[e._v("HttpContext.Query[{ParameterName}]")]),e._v(" depending on whether "),a("code",[e._v("{ParameterName}")]),e._v(" is part of the route pattern. This includes most built-in numeric types, enums, "),a("code",[e._v("DateTime")]),e._v(", "),a("code",[e._v("TimeSpan")]),e._v(" and more.")]),e._v(" "),a("li",[e._v("Types registered as a service are bound from request services.")]),e._v(" "),a("li",[e._v("Any remaining types are bound from the request body as JSON.")])]),e._v(" "),a("h2",{attrs:{id:"attributes"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#attributes"}},[e._v("#")]),e._v(" Attributes")]),e._v(" "),a("h3",{attrs:{id:"fromroute"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#fromroute"}},[e._v("#")]),e._v(" "),a("code",[e._v("[FromRoute]")])]),e._v(" "),a("p",[a("a",{attrs:{href:"https://docs.microsoft.com/dotnet/api/microsoft.aspnetcore.mvc.fromrouteattribute",target:"_blank",rel:"noopener noreferrer"}},[e._v("FromRouteAttribute"),a("OutboundLink")],1),e._v(" implements "),a("code",[e._v("Microsoft.AspNetCore.Http.Metadata.IFromRouteMetadata")]),e._v(". Any attribute implementing this interface is equivalent. This will bind the parameter from "),a("code",[e._v("HttpRequest.RouteValues[{ParameterName}]")]),e._v(". If the parameter is not a string, the parameter type's "),a("a",{attrs:{href:"#tryparse"}},[e._v("TryParse")]),e._v(" method will be called to convert the string to the parameter type.")]),e._v(" "),a("p",[e._v("If the "),a("code",[e._v("Name")]),e._v(" property is provided (e.g. "),a("code",[e._v('[FromRoute(Name = "id")]')]),e._v("), the name specified using the property is used instead of the parameter name.")]),e._v(" "),a("h3",{attrs:{id:"fromquery"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#fromquery"}},[e._v("#")]),e._v(" "),a("code",[e._v("[FromQuery]")])]),e._v(" "),a("p",[a("a",{attrs:{href:"https://docs.microsoft.com/dotnet/api/microsoft.aspnetcore.mvc.fromqueryattribute",target:"_blank",rel:"noopener noreferrer"}},[e._v("FromQueryAttribute"),a("OutboundLink")],1),e._v(" implements "),a("code",[e._v("Microsoft.AspNetCore.Http.Metadata.IFromQueryMetadata")]),e._v(". Any attribute implementing this interface is equivalent. This will bind the parameter from "),a("code",[e._v("HttpRequest.Query[{ParameterName}]")]),e._v(". If the parameter is not a string, the parameter type's "),a("a",{attrs:{href:"#tryparse"}},[e._v("TryParse")]),e._v(" method will be called to convert the string to the parameter type.")]),e._v(" "),a("p",[e._v("If the "),a("code",[e._v("Name")]),e._v(" property is provided (e.g. "),a("code",[e._v('[FromQuery(Name = "page")]')]),e._v("), the name specified using the property is used instead of the parameter name.")]),e._v(" "),a("h3",{attrs:{id:"fromheader"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#fromheader"}},[e._v("#")]),e._v(" "),a("code",[e._v("[FromHeader]")])]),e._v(" "),a("p",[a("a",{attrs:{href:"https://docs.microsoft.com/dotnet/api/microsoft.aspnetcore.mvc.fromheaderattribute",target:"_blank",rel:"noopener noreferrer"}},[e._v("FromHeaderAttribute"),a("OutboundLink")],1),e._v(" implements "),a("code",[e._v("Microsoft.AspNetCore.Http.Metadata.IFromHeaderMetadata")]),e._v(". Any attribute implementing this interface is equivalent. This will bind the parameter from "),a("code",[e._v("HttpRequest.Headers[{ParameterName}]")]),e._v(". If the parameter is not a string, the parameter type's "),a("a",{attrs:{href:"#tryparse"}},[e._v("TryParse")]),e._v(" method will be called to convert the string to the parameter type.")]),e._v(" "),a("p",[e._v("If the "),a("code",[e._v("Name")]),e._v(" property is provided (e.g. "),a("code",[e._v('[FromHeader(Name = "X-My-Custom-Header")]')]),e._v("), the name specified using the property is used instead of the parameter name.")]),e._v(" "),a("h3",{attrs:{id:"fromservices"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#fromservices"}},[e._v("#")]),e._v(" "),a("code",[e._v("[FromServices]")])]),e._v(" "),a("p",[a("a",{attrs:{href:"https://docs.microsoft.com/dotnet/api/microsoft.aspnetcore.mvc.fromservicesattribute",target:"_blank",rel:"noopener noreferrer"}},[e._v("FromServicesAttribute"),a("OutboundLink")],1),e._v(" implements "),a("code",[e._v("Microsoft.AspNetCore.Http.Metadata.IFromServiceMetadata")]),e._v(". Any attribute implementing this interface is equivalent. This will bind the parameter from request services as described in the "),a("a",{attrs:{href:"#services"}},[e._v("Services section")]),e._v(" of this doc.")]),e._v(" "),a("h3",{attrs:{id:"frombody"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#frombody"}},[e._v("#")]),e._v(" "),a("code",[e._v("[FromBody]")])]),e._v(" "),a("p",[a("a",{attrs:{href:"https://docs.microsoft.com/dotnet/api/microsoft.aspnetcore.mvc.frombodyattribute",target:"_blank",rel:"noopener noreferrer"}},[e._v("FromBodyAttribute"),a("OutboundLink")],1),e._v(" implements "),a("code",[e._v("Microsoft.AspNetCore.Http.Metadata.IFromBodyMetadata")]),e._v(". Any attribute implementing this interface is equivalent. This will bind the parameter from the request body as JSON as described in the "),a("a",{attrs:{href:"#json-request-body"}},[e._v("JSON Request Body section")]),e._v(" of this doc.")]),e._v(" "),a("p",[e._v("If the "),a("code",[e._v("EmptyBodyBehavior")]),e._v(" property is set to "),a("code",[e._v("EmptyBodyBehavior.Allow")]),e._v(" (e.g. "),a("code",[e._v("[FromBody(EmptyBodyBehavior = EmptyBodyBehavior.Allow)]")]),e._v("), the parameter will be set to "),a("code",[e._v("null")]),e._v(" or its "),a("code",[e._v("default")]),e._v(" value if the request body is empty. This corresponds to the "),a("code",[e._v("IFromBodyMetadata.AllowEmpty")]),e._v(" being true.")]),e._v(" "),a("h2",{attrs:{id:"well-known-types"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#well-known-types"}},[e._v("#")]),e._v(" Well-Known Types")]),e._v(" "),a("p",[e._v("If the delegate parameters are any of the following types, they will be populated from the "),a("a",{attrs:{href:"https://docs.microsoft.com/dotnet/api/microsoft.aspnetcore.http.httpcontext",target:"_blank",rel:"noopener noreferrer"}},[e._v("HttpContext"),a("OutboundLink")],1),e._v(".")]),e._v(" "),a("ul",[a("li",[e._v("HttpContext")]),e._v(" "),a("li",[e._v("HttpRequest ("),a("code",[e._v("HttpContext.Request")]),e._v(")")]),e._v(" "),a("li",[e._v("HttpResponse ("),a("code",[e._v("HttpContext.Response")]),e._v(")")]),e._v(" "),a("li",[e._v("ClaimsPrincipal ("),a("code",[e._v("HttpContext.User")]),e._v(")")]),e._v(" "),a("li",[e._v("CancellationToken ("),a("code",[e._v("HttpContext.RequestAborted")]),e._v(")")])]),e._v(" "),a("h2",{attrs:{id:"bindasync"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#bindasync"}},[e._v("#")]),e._v(" BindAsync")]),e._v(" "),a("p",[e._v("If the parameter type, one of its parent/ancestor types or any of its implemented interfaces define a public static "),a("code",[e._v("BindAsync")]),e._v(" method with one of the following signatures, the parameter will be bound using "),a("code",[e._v("BindAsync")]),e._v(" assuming no parameter attribute specified another source.")]),e._v(" "),a("div",{staticClass:"language-cs line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-cs"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("public")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("static")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token return-type class-name"}},[e._v("ValueTask"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("<")]),e._v("{ParameterType}"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(">")])]),e._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[e._v("BindAsync")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("(")]),a("span",{pre:!0,attrs:{class:"token class-name"}},[e._v("HttpContext")]),e._v(" context"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[e._v("ParameterInfo")]),e._v(" parameter"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")]),e._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// ...")]),e._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// Or")]),e._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("public")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("static")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token return-type class-name"}},[e._v("ValueTask"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("<")]),e._v("{ParameterType}"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(">")])]),e._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[e._v("BindAsync")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("(")]),a("span",{pre:!0,attrs:{class:"token class-name"}},[e._v("HttpContext")]),e._v(" context"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")]),e._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// ...")]),e._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v("\n")])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br"),a("span",{staticClass:"line-number"},[e._v("3")]),a("br"),a("span",{staticClass:"line-number"},[e._v("4")]),a("br"),a("span",{staticClass:"line-number"},[e._v("5")]),a("br"),a("span",{staticClass:"line-number"},[e._v("6")]),a("br"),a("span",{staticClass:"line-number"},[e._v("7")]),a("br"),a("span",{staticClass:"line-number"},[e._v("8")]),a("br"),a("span",{staticClass:"line-number"},[e._v("9")]),a("br"),a("span",{staticClass:"line-number"},[e._v("10")]),a("br"),a("span",{staticClass:"line-number"},[e._v("11")]),a("br")])]),a("p",[e._v("The return value can be either "),a("code",[e._v("ValueTask<{ParameterType}>")]),e._v(" or "),a("code",[e._v("ValueTask<{ParameterType}?>")]),e._v(". Whether or not returning a "),a("code",[e._v("null")]),e._v(" value results in an error is determined by the nullability of the parameter type. If the parameter type is non-nullable, the route handler will not be called and a bad request will be logged. If the parameter type is nullable, the route handler will be supplied a null value for the given parameter.")]),e._v(" "),a("p",[e._v("In the case where both overloads are defined anywhere in the parameter type's hierarchy, the "),a("code",[e._v("BindAsync")]),e._v(" method with the "),a("code",[e._v("ParameterInfo")]),e._v(" argument will be called.")]),e._v(" "),a("p",[e._v("If there is more than one "),a("code",[e._v("BindAsync")]),e._v(" method with the same signature, the method from the most derived type will be called. "),a("code",[e._v("BindAsync")]),e._v(" methods on interfaces are chosen last. A parameter type implementing more than one interface defining matching "),a("code",[e._v("BindAsync")]),e._v(" methods is an error.")]),e._v(" "),a("h2",{attrs:{id:"tryparse"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#tryparse"}},[e._v("#")]),e._v(" TryParse")]),e._v(" "),a("p",[e._v("If the parameter type, one of its parent/ancestor types or any of its implemented interfaces define a public static "),a("code",[e._v("TryParse")]),e._v(" method with one of the following signatures, the parameter will be bound using "),a("code",[e._v("TryParse")]),e._v(" using the "),a("code",[e._v("string")]),e._v(" from the source specified in the "),a("a",{attrs:{href:"#conventions"}},[e._v("Conventions section")]),e._v(" of this document.")]),e._v(" "),a("div",{staticClass:"language-cs line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-cs"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("public")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("static")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token return-type class-name"}},[a("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("bool")])]),e._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[e._v("TryParse")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("(")]),a("span",{pre:!0,attrs:{class:"token class-name"}},[a("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("string")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("?")])]),e._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("value")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[e._v("IFormatProvider")]),e._v(" formatProvider"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("out")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("ParameterType"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v(" result"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")]),e._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// ...")]),e._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// Or")]),e._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("public")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("static")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token return-type class-name"}},[a("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("bool")])]),e._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[e._v("TryParse")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("(")]),a("span",{pre:!0,attrs:{class:"token class-name"}},[a("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("string")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("?")])]),e._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("value")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("out")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("ParameterType"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v(" result"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")]),e._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// ...")]),e._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v("\n")])]),e._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[e._v("1")]),a("br"),a("span",{staticClass:"line-number"},[e._v("2")]),a("br"),a("span",{staticClass:"line-number"},[e._v("3")]),a("br"),a("span",{staticClass:"line-number"},[e._v("4")]),a("br"),a("span",{staticClass:"line-number"},[e._v("5")]),a("br"),a("span",{staticClass:"line-number"},[e._v("6")]),a("br"),a("span",{staticClass:"line-number"},[e._v("7")]),a("br"),a("span",{staticClass:"line-number"},[e._v("8")]),a("br"),a("span",{staticClass:"line-number"},[e._v("9")]),a("br"),a("span",{staticClass:"line-number"},[e._v("10")]),a("br"),a("span",{staticClass:"line-number"},[e._v("11")]),a("br")])]),a("p",[e._v("Whether or not returning false is an error is determined by the nullability of parameter type. If the parameter type is non-nullable, the route handler will not be called and a bad request will be logged. If the parameter type is nullable, the route handler will be supplied a null value for the given parameter.")]),e._v(" "),a("p",[e._v("In the case where both overloads are defined anywhere in the parameter type's hierarchy, the "),a("code",[e._v("TryParse")]),e._v(" method with the "),a("code",[e._v("IFormatProvider")]),e._v(" parameter will be called.")]),e._v(" "),a("p",[e._v("If there is more than one "),a("code",[e._v("TryParse")]),e._v(" method with the same signature, the method from the most derived type will be called. "),a("code",[e._v("TryParse")]),e._v(" methods on interfaces are chosen last. A parameter type implementing more than one interface defining matching "),a("code",[e._v("TryParse")]),e._v(" methods is an error.")]),e._v(" "),a("h2",{attrs:{id:"services"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#services"}},[e._v("#")]),e._v(" Services")]),e._v(" "),a("p",[e._v("Service parameters are resolved from "),a("code",[e._v("HttpContext.RequestServices.GetService(typeof({ParameterType}))")]),e._v(".")]),e._v(" "),a("p",[e._v("Whether or not a given parameter type is a service is determined using "),a("code",[e._v("IServiceProviderIsService")]),e._v(" unless the parameter is explicitly attributed with "),a("code",[e._v("[FromServices]")]),e._v(". Given the "),a("code",[e._v("[FromServices]")]),e._v(" attribute, the parameter type is assumed to exist in the service provider.")]),e._v(" "),a("p",[e._v("For non-nullable parameters, the parameter type must be resolvable as a service for the route handler to be called. If the service does not exist, an exception will be thrown when the endpoint is hit. For nullable parameters, the route handler will be supplied a null value for the given parameter.")]),e._v(" "),a("p",[a("a",{attrs:{href:"https://docs.microsoft.com/dotnet/api/microsoft.extensions.dependencyinjection.iserviceproviderisservice.isservice",target:"_blank",rel:"noopener noreferrer"}},[e._v("IServiceProviderIsService"),a("OutboundLink")],1),e._v(" is a new interface introduced in .NET 6 that is implemented by the default service provider and some third-party containers. If "),a("code",[e._v("IServiceProviderIsService")]),e._v(" itself is not available as a service, the "),a("code",[e._v("[FromServices]")]),e._v(" attribute must be used to resolve parameters from services.")]),e._v(" "),a("h2",{attrs:{id:"json-request-body"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#json-request-body"}},[e._v("#")]),e._v(" JSON Request Body")]),e._v(" "),a("p",[e._v("JSON request bodies are read using the "),a("a",{attrs:{href:"https://docs.microsoft.com/dotnet/api/system.net.http.json.httpcontentjsonextensions.readfromjsonasync#System_Net_Http_Json_HttpContentJsonExtensions_ReadFromJsonAsync__1_System_Net_Http_HttpContent_System_Text_Json_JsonSerializerOptions_System_Threading_CancellationToken_",target:"_blank",rel:"noopener noreferrer"}},[e._v("ReadFromJsonAsync"),a("OutboundLink")],1),e._v(" extension method. This can be configured like all other calls to "),a("code",[e._v("ReadFromJsonAsync")]),e._v(" using the "),a("a",{attrs:{href:"https://docs.microsoft.com/aspnet/core/fundamentals/configuration/#configure-options-with-a-delegate-1",target:"_blank",rel:"noopener noreferrer"}},[e._v("options pattern"),a("OutboundLink")],1),e._v(" to configure "),a("a",{attrs:{href:"https://docs.microsoft.com/dotnet/api/microsoft.aspnetcore.http.json.jsonoptions",target:"_blank",rel:"noopener noreferrer"}},[e._v("JsonOptions"),a("OutboundLink")],1),e._v(".")]),e._v(" "),a("p",[e._v("For non-nullable parameters, empty request bodies are disallowed by default. If a request matching the route pattern has an empty body, the route handler will not be called and a bad request will be logged.")]),e._v(" "),a("p",[e._v("Empty request bodies are always allowed when the parameter is nullable even if "),a("code",[e._v("EmptyBodyBehavior.Disallow")]),e._v(" is set via the "),a("code",[e._v("[FromBody]")]),e._v(" attribute.")])])}),[],!1,null,null,null);t.default=r.exports}}]);