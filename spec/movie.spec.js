/* eslint-disable no-undef */
import supertest from "supertest";
import { app } from "../src/server/index.js";

describe("/movie", () => {
  const endpoint = "/movie";
  
  describe("POST", () => {   
    const movie1 = {
      title: "Rogue One",
      description:
      "Lorem ipsum dolor sit amet. Vel deserunt repellat vel sint quia rem earum beatae est culpa dolor ab amet sint. In Quis voluptatum ut internos quidem...",
      runtimeMins: 123,
    };
    const movie2 = {
      runtimeMins: 119,
    };
    const movie3 = {
      title: "",
      description:
      "Britain's Prince Albert must ascend the throne as King George VI, but he has a speech impediment. Knowing that...",
      runtimeMins: undefined,
    };
    const token3 = "";
    const token4 = "this is not the token you are looking for";

    const user1 = {
          username: "Geralt",
          password: "Roach",
      };
    const user2 = {
        username: "Ciri",
        password: "Gwent",
    };

    test("creates a movie", async () => { 
      await supertest(app).post("/user/register").send(user1)
      const response = await supertest(app).post("/user/login").send(user1)
      const token1 = response.body.response.token
    
      const result = await supertest(app).post(endpoint).set('Authorization', token1).send(movie1);
      expect(result.status).toEqual(201);
      expect(result.body.movie.id).not.toBeUndefined();
      expect(result.body.movie).toMatchObject(movie1)
      expect(result.body.movie.users.length).toEqual(1);
    });

    test("connects a pre-existing movie to a user", async () => {
      await supertest(app).post("/user/register").send(user2)
      const response = await supertest(app).post("/user/login").send(user2)
      const token2 = response.body.response.token

      const result = await supertest(app).post(endpoint).set('Authorization', token2).send(movie1);
      expect(result.status).toEqual(201);
      expect(result.body.movie.users.length).toEqual(2);
    });

    test("throws a 400 if missing input fields", async () => {
      const response = await supertest(app).post("/user/login").send(user1)
      const token1 = response.body.response.token

      const result = await supertest(app).post(endpoint).set('Authorization', token1).send(movie2);
      expect(result.status).toEqual(400);
      expect(result.body.error).toEqual("missing input");
    });

    test("throws a 400 if empty input fields", async () => {
      const response = await supertest(app).post("/user/login").send(user1)
      const token1 = response.body.response.token

      const result = await supertest(app).post(endpoint).set('Authorization', token1).send(movie3);
      expect(result.status).toEqual(400);
      expect(result.body.error).toEqual("missing input");
    });

    test("throws a 403 if the user is not allowed to create a movie", async () => {
      const result = await supertest(app).post(endpoint).set('Authorization', token4).send(movie1);
      expect(result.status).toEqual(403);
      expect(result.body.error).toEqual("unauthorised");
    });

    test("throws a 401 if no token is found/ the user is not signed in", async () => {
      const result = await supertest(app).post(endpoint).set('Authorization', token3).send(movie1);
      expect(result.status).toEqual(401);
      expect(result.body.error).toEqual("missing authentication");
    });
  })

  describe("GET", () => {
    test("gets a list of movies", async () => {
      const result = await supertest(app).get(endpoint)
      expect(result.status).toEqual(200)
      expect(result.body.movies.length).toEqual(1)
    })
    
  })
})