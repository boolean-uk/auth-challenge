import supertest  from "supertest";
import { app } from "../src/server";

/* eslint-disable no-undef */
describe("/users", () => {
  const user1 = {
    username: "Geralt",
    password: "Roach",
  };
	const output1 = {
    message: "Welcome, Geralt!"
  };

  describe("/register", () => {
    test("a new user is registered", async () => {
      const result = await supertest(app).post("/user/register").send(user1)
			expect(result.status).toEqual(201);
      expect(result.body.message).toEqual(output1.message)
    });
  });
});
