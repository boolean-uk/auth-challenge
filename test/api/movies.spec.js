import supertest from "supertest";
import app from "../../src/server/server";
import { createUser } from "../helpers/createData.js";

describe("MOVIES endpoint", () => {

  describe("GET /movies", () => {
    it("should allow logged in users to create movies", async () => {
      const user = await createUser("Jeff", "cheesepass")
      const response = await supertest(app)
      .post('/user/login')
      .send({
          username: user.username,
          password: "cheesepass"
      });

      const { token } = response.body
      
      const movieResponse = await supertest(app).post('/movies').send({
        title: "The Hunt for Red October",
        description:"Sequel to The Hunt for Red September",
        runtimeMins: 90
      }).set('Authorization', `Bearer ${token}`)

      expect(movieResponse.status).toEqual(201)
      expect(movieResponse.body.movie.title).toEqual("The Hunt for Red October")
    });
  });
});
