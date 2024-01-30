import supertest from "supertest";
import app from "../../../../src/server/server.js";
import { createToken } from "../../../../src/server/utils/webToken.js";
import { createMovie } from "../../../../src/server/domains/movie.domain.js";

describe("Movie Endpoint", () => {
  describe("POST /movie", () => {
    it("will return created movie", async () => {
      const userToken = createToken("bob");

      const request = {
        title: "Bob the Builder: The movie",
        description: "Bob's in trouble for not declaring his business expenses",
        runtimeMins: 303,
      };

      const response = await supertest(app)
        .post("/movie")
        .send(request)
        .auth(userToken, { type: "bearer" });

      const expected = {
        movie: {
          title: "Bob the Builder: The movie",
          description:
            "Bob's in trouble for not declaring his business expenses",
          runtimeMins: 303,
          id: expect.any(Number),
        },
      };

      expect(response.status).toEqual(201);
      expect(response.body).toEqual(expected);
    });

    it("will return 401 when jwt missing / malformed", async () => {
      const request = {
        title: "Bob the Builder: The movie",
        description: "Bob's in trouble for not declaring his business expenses",
        runtimeMins: 303,
      };

      const invalidToken = createToken("bob") + "bork";

      const responseNoToken = await supertest(app).post("/movie").send(request);
      const responseInvalidToken = await supertest(app)
        .post("/movie")
        .send(request)
        .auth(invalidToken, { type: "bearer" });

      const expectedNoToken = {
        error: {
          formErrors: ["Bearer token required"],
          fieldErrors: {},
          code: 401,
        },
      };
      const expectedInvalidToken = {
        error: {
          formErrors: ["invalid signature"],
          fieldErrors: {},
          code: 401,
        },
      };

      expect(responseNoToken.status).toEqual(401);
      expect(responseInvalidToken.status).toEqual(401);
      expect(responseNoToken.body).toEqual(expectedNoToken);
      expect(responseInvalidToken.body).toEqual(expectedInvalidToken);
    });

    it("will return 400 when request is malformed", async () => {
      const userToken = createToken("bob");

      const requestMissingAll = {};
      const requestIncorrectTypes = {
        title: 123,
        description: 456,
        runtimeMins: "14 minutes",
      };
      const requestExtraField = {
        title: "Bob the Builder: The movie",
        description: "Bob's in trouble for not declaring his business expenses",
        runtimeMins: 303,
        extra: "field",
      };

      const responseMissingAll = await supertest(app)
        .post("/movie")
        .auth(userToken, { type: "bearer" })
        .send(requestMissingAll);
      const responseIncorrectTypes = await supertest(app)
        .post("/movie")
        .auth(userToken, { type: "bearer" })
        .send(requestIncorrectTypes);
      const responseExtraField = await supertest(app)
        .post("/movie")
        .auth(userToken, { type: "bearer" })
        .send(requestExtraField);

      const expectedMissingAll = {
        error: {
          code: 400,
          formErrors: [],
          fieldErrors: {
            title: ["Required"],
            description: ["Required"],
            runtimeMins: ["Required"],
          },
        },
      };
      const expectedIncorrectTypes = {
        error: {
          formErrors: [],
          fieldErrors: {
            title: ["Expected string, received number"],
            description: ["Expected string, received number"],
            runtimeMins: ["Expected number, received string"],
          },
          code: 400,
        },
      };
      const expectedExtraField = {
        error: {
          code: 400,
          formErrors: ["Unrecognized key(s) in object: 'extra'"],
          fieldErrors: {},
        },
      };

      expect(responseMissingAll.status).toEqual(400);
      expect(responseIncorrectTypes.status).toEqual(400);
      expect(responseExtraField.status).toEqual(400);
      expect(responseMissingAll.body).toEqual(expectedMissingAll);
      expect(responseIncorrectTypes.body).toEqual(expectedIncorrectTypes);
      expect(responseExtraField.body).toEqual(expectedExtraField);
    });
    it("will return 409 when movie title already exists", async () => {
      const request = {
        title: "Bob the Builder: The movie",
        description: "Bob's in trouble for not declaring his business expenses",
        runtimeMins: 303,
      };

      await createMovie(
        request.title,
        request.description,
        request.runtimeMins,
      );

      const userToken = createToken("bob");

      const response = await supertest(app)
        .post("/movie")
        .auth(userToken, { type: "bearer" })
        .send(request);

      const expected = {
        error: {
          formErrors: [],
          fieldErrors: {
            title: ["Entry already exists"],
          },
          code: 409,
        },
      };

      expect(response.status).toEqual(409);
      expect(response.body).toEqual(expected);
    });
  });
});
