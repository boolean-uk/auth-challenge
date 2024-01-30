import supertest from "supertest";
import app from "../../../../src/server/server.js";
import { createUser } from "../../../../src/server/domains/user.domain";
import { hashString } from "../../../../src/server/utils/hash.js";

describe("User Endpoint", () => {
  describe("POST /user/register", () => {
    it("will return new customer", async () => {
      const request = {
        username: "bob",
        password: "builder",
      };

      const response = await supertest(app)
        .post("/user/register")
        .send(request);

      const expected = {
        user: {
          id: expect.any(Number),
          username: "bob",
        },
      };

      expect(response.status).toEqual(201);
      expect(response.body).toEqual(expected);
    });

    it("will return code 409 when username already exists", async () => {
      await createUser("bob", "builder");
      const request = {
        username: "bob",
        password: "builder",
      };

      const response = await supertest(app)
        .post("/user/register")
        .send(request);

      const expected = {
        error: {
          formErrors: [],
          fieldErrors: {
            username: ["Entry already exists"],
          },
          code: 409,
        },
      };

      expect(response.status).toEqual(409);
      expect(response.body).toEqual(expected);
    });

    it("will return code 400 when request is malformed", async () => {
      const requestMissingAll = {};
      const requestMissingPassword = {
        username: "bob",
      };
      const requestMissingUsername = {
        password: "builder",
      };
      const addedField = {
        username: "bob",
        password: "builder",
        title: "builder",
      };
      const incorrectTypes = {
        username: 123,
        password: 456,
      };

      const responseMissingAll = await supertest(app)
        .post("/user/register")
        .send(requestMissingAll);
      const responseMissingPassword = await supertest(app)
        .post("/user/register")
        .send(requestMissingPassword);
      const responseMissingUsername = await supertest(app)
        .post("/user/register")
        .send(requestMissingUsername);
      const responseAddedField = await supertest(app)
        .post("/user/register")
        .send(addedField);
      const responseIncorrectTypes = await supertest(app)
        .post("/user/register")
        .send(incorrectTypes);

      const expectedMissingAll = {
        error: {
          code: 400,
          formErrors: [],
          fieldErrors: {
            username: ["Required"],
            password: ["Required"],
          },
        },
      };
      const expectedMissingPassword = {
        error: {
          code: 400,
          formErrors: [],
          fieldErrors: {
            password: ["Required"],
          },
        },
      };
      const expectedMissingUsername = {
        error: {
          code: 400,
          formErrors: [],
          fieldErrors: {
            username: ["Required"],
          },
        },
      };
      const expectedAddedField = {
        error: {
          code: 400,
          formErrors: ["Unrecognized key(s) in object: 'title'"],
          fieldErrors: {},
        },
      };
      const expectedIncorrectTypes = {
        error: {
          formErrors: [],
          fieldErrors: {
            username: ["Expected string, received number"],
            password: ["Expected string, received number"],
          },
          code: 400,
        },
      };

      expect(responseMissingAll.status).toEqual(400);
      expect(responseMissingPassword.status).toEqual(400);
      expect(responseMissingUsername.status).toEqual(400);
      expect(responseAddedField.status).toEqual(400);
      expect(responseIncorrectTypes.status).toEqual(400);
      expect(responseMissingAll.body).toEqual(expectedMissingAll);
      expect(responseMissingPassword.body).toEqual(expectedMissingPassword);
      expect(responseMissingUsername.body).toEqual(expectedMissingUsername);
      expect(responseAddedField.body).toEqual(expectedAddedField);
      expect(responseIncorrectTypes.body).toEqual(expectedIncorrectTypes);
    });
  });

  describe("POST /user/login", () => {
    it("will return jwt", async () => {
      await createUser("bob", await hashString("builder"));
      const request = {
        username: "bob",
        password: "builder",
      };

      const response = await supertest(app).post("/user/login").send(request);

      const expectedToken = {
        header: { alg: "HS256", typ: "JWT" },
        payload: {
          sub: "login",
          username: "bob",
          iat: expect.any(Number),
          exp: expect.any(Number),
        },
      };

      const [receivedTokenHeader, receivedTokenPayload] = response.body.token
        .split(".")
        .map((part) => {
          try {
            return JSON.parse(atob(part));
          } catch {
            return part;
          }
        });

      expect(response.status).toEqual(201);
      expect(receivedTokenHeader).toEqual(expectedToken.header);
      expect(receivedTokenPayload).toEqual(expectedToken.payload);
    });

    it("will return 401 when incorrect login details are provided", async () => {
      await createUser("bob", await hashString("builder"));
      const requestWrongPassword = {
        username: "bob",
        password: "plumber",
      };

      const requestFakeUser = {
        username: "sean",
        password: "builder",
      };

      const responseWrongPassword = await supertest(app)
        .post("/user/login")
        .send(requestWrongPassword);
      const responseFakeUser = await supertest(app)
        .post("/user/login")
        .send(requestFakeUser);

      const expected = {
        error: {
          formErrors: ["Unrecognized username and password combination"],
          fieldErrors: {},
          code: 401,
        },
      };

      expect(responseWrongPassword.status).toEqual(401);
      expect(responseWrongPassword.body).toEqual(expected);
      expect(responseFakeUser.status).toEqual(401);
      expect(responseFakeUser.body).toEqual(expected);
    });

    it("will return 400 when request is malformed", async () => {
      const requestMissingAll = {};
      const requestMissingPassword = {
        username: "bob",
      };
      const requestMissingUsername = {
        password: "builder",
      };
      const addedField = {
        username: "bob",
        password: "builder",
        title: "builder",
      };
      const incorrectTypes = {
        username: 123,
        password: 456,
      };

      const responseMissingAll = await supertest(app)
        .post("/user/login")
        .send(requestMissingAll);
      const responseMissingPassword = await supertest(app)
        .post("/user/login")
        .send(requestMissingPassword);
      const responseMissingUsername = await supertest(app)
        .post("/user/login")
        .send(requestMissingUsername);
      const responseAddedField = await supertest(app)
        .post("/user/login")
        .send(addedField);
      const responseIncorrectTypes = await supertest(app)
        .post("/user/login")
        .send(incorrectTypes);

      const expectedMissingAll = {
        error: {
          code: 400,
          formErrors: [],
          fieldErrors: {
            username: ["Required"],
            password: ["Required"],
          },
        },
      };
      const expectedMissingPassword = {
        error: {
          code: 400,
          formErrors: [],
          fieldErrors: {
            password: ["Required"],
          },
        },
      };
      const expectedMissingUsername = {
        error: {
          code: 400,
          formErrors: [],
          fieldErrors: {
            username: ["Required"],
          },
        },
      };
      const expectedAddedField = {
        error: {
          code: 400,
          formErrors: ["Unrecognized key(s) in object: 'title'"],
          fieldErrors: {},
        },
      };
      const expectedIncorrectTypes = {
        error: {
          formErrors: [],
          fieldErrors: {
            username: ["Expected string, received number"],
            password: ["Expected string, received number"],
          },
          code: 400,
        },
      };

      expect(responseMissingAll.status).toEqual(400);
      expect(responseMissingPassword.status).toEqual(400);
      expect(responseMissingUsername.status).toEqual(400);
      expect(responseAddedField.status).toEqual(400);
      expect(responseIncorrectTypes.status).toEqual(400);
      expect(responseMissingAll.body).toEqual(expectedMissingAll);
      expect(responseMissingPassword.body).toEqual(expectedMissingPassword);
      expect(responseMissingUsername.body).toEqual(expectedMissingUsername);
      expect(responseAddedField.body).toEqual(expectedAddedField);
      expect(responseIncorrectTypes.body).toEqual(expectedIncorrectTypes);
    });
  });
});
