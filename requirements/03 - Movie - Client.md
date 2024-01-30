# Create a movie - Frontend

Work inside the `handleCreateMovie` function in [src/client/App.jsx](../src/client/App.jsx).

The `title`, `description` and `runtimeMins` parameters of the function are already hooked up to the form so you can focus on the function logic.

1. Send a request to the `/movie` route to create a new movie using the parameters provided in the function.
   1. You must add an appropriate auth header to the request
   2. The value of the header must be the token obtained during login, which should be available in local storage
2. Update the `movies` state to include the newly created movie. The list of movies must re-render without requiring a page refresh.
