# Login a user - API

A `POST` API route has already been set up for `http://localhost:4000/user/login`. You can see it in [src/server/routers/user.js](../src/server/routers/user.js).

Do the work for this requirement in the `login` function in [src/server/controllers/user.js](../src/server/controllers/user.js).

1. Using the `username` provided in the request body, find that user in the database and assign it to the `foundUser` variable.
2. Compare the `password` provided in the request body to the hashed password on the `foundUser`. Store the result in the `passwordsMatch` variable.
3. Create a JWT containing the `username` and store it in the `token` variable.
