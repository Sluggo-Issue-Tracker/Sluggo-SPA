# How to Make API Requests

## General Information
Once your server is up and running, you should be able to make requests.
All requests require authentication (besides the auth endpoints) so you will 
need to have a valid login token set. You can do this from the Auth page.

Once the server is started, the list of available endpoints with descriptions
is available at:

http://127.0.0.1:8000/api/schema/swagger-ui/ 

Use this to reference what is available, and use these as URLs in your axios
calls (see the existing API wrappers for details).

API requests use REST API standards, so endpoints should behave as you expect.
Namely:

* GET -> requests a resource which will be returned
* POST -> place a new resource at an endpoint
* PUT -> Replace an existing record at an endpoint
* PATCH -> partially update an existing record at an endpoint
* DELETE -> Delete a record at an endpoint

*Note: HTTP request methods OPTIONS, TRACE, CONNECT, HEAD are not used.*

You should define wrappers to each of these calls to the URLs that work as
plain TypeScript, such that they can be called from the store or components,
but do not rely on these components directly in order to operate. Additionally,
when defining such API wrapper endpoints, be sure to include appropriate and 
accurate typing, such that the codebase may be statically type checked (e.g.
avoid exporting 'any' types, with exception of failures where this cannot be 
avoided).

Store wrappers in /api, and import methods as needed into other components.
Also feel free to include methods/interfaces from one part of /api to another
(but leave this section of the code relatively self contained)

When interacting with the store, use the bindings provided by vuex-direct to
avoid needing to fetch properties from the store via string. This will also
add proper type checking to your interactions with the store.

## Making Requests
All requests will expect to be passed an axios method, and most will also expect
a team record. These should be obtained/generated from the store. This does 
*not* require routing API calls as actions to the store, but rather that some
result should be obtained/validated from the store before making an API request.

Ideally, you should validate that a token and team record exist before
attempting an API request. This should be required due to the storage of such
items as optionals within the central Vuex store, but this is listed as a 
guideline in case this is not the case.

Use async/await in order to do asynchronous code. Where possible, avoid Promise
style syntax, as this can be verbose and hard to read, along with quite nested.

### Component-Level Requests
If the result of an API request does not make modifications to the central
store, it is appropriate to call the API directly from the component.

Use the *generateAxiosInstance* getter on the store to get an Axios instance.
Also, extract the TeamRecord from the central store for any requests which 
involve team-related requests.

In general, the flow should look like this:
* A token and team are retrieved from the central store into the component
* The component calls to the API layer using this retrieved information, and
awaits a result
* The API request is made and returns
* The component reacts to the awaited result.

### Store-Level Requests
If the result of an API request makes modifications to the central store, it is
appropriate to create this as an Action within the Vuex store. As reminder:

* *Actions* are asynchronous methods which are executed within the Vuex store,
and do not directly modify the store's state property.
* *Mutations* are synchronous methods which directly mutate the state property
of the store.

In general, the flow for requests which will have an impact on the store should
do the following:

* Dispatch from the component to the store with any relevant parameters
* The store should recieve this dispatch, and make a request to the API layer,
using the token and team state held within the store.
* The API will make its request, and return
* The store will capture this result, and apply any relevant mutations
* The UX should react to the data changes automatically, or have a callback
method provided to perform some action upon store mutation completion.

Be sure to separate actions and mutations accordingly, so only mutations affect
the state, and actions only dispatch to mutations.

## Error Handling
Currently, we are not worrying about error handling. In the code to generate
the axios instance, there are interceptors in place which will perform some 
actions on the Promise:

* Print out relevant details from the promise
* Continue to throw the Promise up the call stack.

In general, this should be OK, since Promises erroring does not cause execution
of the app to stop. 

Down the line, this will be extended to provide alerts to the user when things
go wrong, and the centralization of error capture should avoid duplicated
error handling code across the app. This is not being considered for MVP
though, where we will only demo happy path cases.

## Documentation Links
Axios (repo): https://github.com/axios/axios
Vuex (docs/site): https://vuex.vuejs.org 
Vuex-direct (repo): https://github.com/paroi-tech/direct-vuex
