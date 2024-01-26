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
      const request1 = {};
      const request2 = {
        username: "bob",
      };
      const request3 = {
        password: "builder",
      };

      const response1 = await supertest(app)
        .post("/user/register")
        .send(request1);
      const response2 = await supertest(app)
        .post("/user/register")
        .send(request2);
      const response3 = await supertest(app)
        .post("/user/register")
        .send(request3);

      const expected1 = {
        error: {
          code: 400,
          formErrors: [],
          fieldErrors: {
            username: ["Required"],
            password: ["Required"],
          },
        },
      };
      const expected2 = {
        error: {
          code: 400,
          formErrors: [],
          fieldErrors: {
            password: ["Required"],
          },
        },
      };
      const expected3 = {
        error: {
          code: 400,
          formErrors: [],
          fieldErrors: {
            username: ["Required"],
          },
        },
      };

      expect(response1.status).toEqual(400);
      expect(response2.status).toEqual(400);
      expect(response3.status).toEqual(400);
      expect(response1.body).toEqual(expected1);
      expect(response2.body).toEqual(expected2);
      expect(response3.body).toEqual(expected3);
    });
  });
});
