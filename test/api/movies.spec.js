import supertest from "supertest";
const request = require('supertest')
import app from "../../src/server/server";
import { createMovie, createUser } from "../helpers/createData.js";

describe("MOVIES endpoint", () => {
  describe("GET /movies", () => {
    it("should return a list of all movies", async () => {
      const user = await createUser("Jeff", "cheesepass");

      await createMovie("Ace Ventura", "A classic", 120, user.id);
      await createMovie(
        "Ace Ventura 2",
        "Another Classic",
        180,
        user.id
      );

      const response = await supertest(app).get("/movies").send();
      expect(response.body.movies.length).toEqual(2);
    });
  });


  describe("GET /movies", () => {
    it("should allow logged in users to create movies", async () => {
      const user = await createUser("Jeff", "cheesepass")
      const response = await request(app)
      .post('/user/login')
      .send({
          username: user.username,
          password: "cheesepass"
      });

      const { token } = response.body
      
      const movieResponse = await request(app).post('/movies').send({
        title: "The Hunt for Red October",
        description:"Sequel to The Hunt for Red September",
        runtimeMins: 90
      }).set('Authorization', `Bearer ${token}`)

      expect(movieResponse.status).toEqual(201)
      expect(movieResponse.body.movie.title).toEqual("The Hunt for Red October")
    });
  });
});
