import supertest from "supertest";
import app from "../../src/server/server";
import { createMovie, createUser } from "../helpers/createData.js";

describe("MOVIES endpoint", () => {
  describe("GET /movies", () => {
    it("should return a list of all movies", async () => {
      const user = await createUser("Jeff", "cheesepass");

      console.log(user.id)

      const movie = await createMovie("Ace Ventura", "A classic", 120, user.id);
      const movie2 = await createMovie(
        "Ace Ventura 2",
        "Another Classic",
        180,
        user.id
      );

      const response = await supertest(app).get("/movies").send();
      expect(response.body.movies.length).toEqual(2);
    });
  });
});
