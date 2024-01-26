import supertest from "supertest";
import app from "../../../../src/server/server.js";
import { createUser } from "../../../../src/server/domains/user.domain";

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

      const responseMissingAll = await supertest(app)
        .post("/user/register")
        .send(requestMissingAll);
      const responseMissingPassword = await supertest(app)
        .post("/user/register")
        .send(requestMissingPassword);
      const responseMissingUsername = await supertest(app)
        .post("/user/register")
        .send(requestMissingUsername);

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

      expect(responseMissingAll.status).toEqual(400);
      expect(responseMissingPassword.status).toEqual(400);
      expect(responseMissingUsername.status).toEqual(400);
      expect(responseMissingAll.body).toEqual(expectedMissingAll);
      expect(responseMissingPassword.body).toEqual(expectedMissingPassword);
      expect(responseMissingUsername.body).toEqual(expectedMissingUsername);
    });
  });
});
