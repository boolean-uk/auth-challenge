/* eslint-disable no-undef */
import supertest from "supertest";
import { app } from "../src/server/index.js";
describe("/movie", () => {
  const endpoint = "/movie";

  describe("POST", () => {
    const token1 = "eyJhbGciOiJIUzI1NiJ9.R2VyYWx0.ma-8K_6d9R-WZ30yWxlgH0OeQLZ_wW90Q6EztwpeiOk";
    const token2 = "";
    const token3 = "this is not the token you are looking for";
  
    const movie1 = {
      title: "The King's Speech",
      description:
        "Britain's Prince Albert must ascend the throne as King George VI, but he has a speech impediment. Knowing that...",
      runtimeMins: 119,
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
    test("creates a movie", async () => {
      const result = await supertest(app).post(endpoint).set('Authorization', token1).send(movie1);
      expect(result.status).toEqual(201);
      expect(result.body.movie.id).not.toBeUndefined();
      expect(result.body.movie).toMatchObject(movie1)
    });
    test("throws a 409 if the movie already exists", async () => {
      const result = await supertest(app).post(endpoint).set('Authorization', token1).send(movie1);
      expect(result.status).toEqual(409);
      expect(result.body.error).toEqual("title already in use");
    });
    test("throws a 400 if missing input fields", async () => {
      const result = await supertest(app).post(endpoint).set('Authorization', token1).send(movie2);
      expect(result.status).toEqual(400);
      expect(result.body.error).toEqual("missing input");
    });
    test("throws a 400 if empty input fields", async () => {
      const result = await supertest(app).post(endpoint).set('Authorization', token1).send(movie3);
      expect(result.status).toEqual(400);
      expect(result.body.error).toEqual("missing input");
    });
    test("throws a 403 if the user is not allowed to create a movie", async () => {
      const result = await supertest(app).post(endpoint).set('Authorization', token3).send(movie1);
      expect(result.status).toEqual(403);
      expect(result.body.error).toEqual("unauthorised");
    });
    test("throws a 401 if no token is found/ the user is not signed in", async () => {
      const result = await supertest(app).post(endpoint).set('Authorization', token2).send(movie1);
      expect(result.status).toEqual(401);
      expect(result.body.error).toEqual("missing authentication");
    });
  });

  describe("GET", () => {
    test("gets a list of movies", async () => {
      const result = await supertest(app).get(endpoint)
      expect(result.status).toEqual(200)
      expect(result.body.movies.length).toEqual(1)
    })
    
  })
})