import supertest  from "supertest";
import { app } from "../src/server";

/* eslint-disable no-undef */
describe("/users", () => {
  
  describe("/register", () => {
      const user1 = {
        username: "Geralt",
        password: "Roach",
      };
      const user2 = {   
          username: "Geralt",
          password: "axii",
        };
      const user3 = {   
        username: "",
        password: "igni",
      };
      const user4 = {   
        password: "aard",
      };
      
    test("a new user is registered", async () => {
      const message = "Welcome, Geralt!"
      const result = await supertest(app).post("/user/register").send(user1)
			expect(result.status).toEqual(201);
      expect(result.body.message).toEqual(message)
    });
    test("a 409 error is thrown for any username already in use", async () => {
      // or "username already in use", which would be much more accurate 
      // but do we want to tell people which usernames do exist? 
      // Would it not make the whole "do not say whether the username or password was wrong when a log in fail"
      // somewhat redundant, seeing as the register page could serve to check that the username does exit
      // leaving only the password to figure out - or am I overthinking this entirely? 
      const message = "invalid username"
      const result = await supertest(app).post("/user/register").send(user2)
			expect(result.status).toEqual(409);
      expect(result.body.error).toEqual(message)
    });
    test("a 400 error is thrown due to empty input fields", async () => {
      const message = "missing input"
      const result = await supertest(app).post("/user/register").send(user3)
			expect(result.status).toEqual(400);
      expect(result.body.error).toEqual(message)
    });
    test("a 400 error is thrown due to missing input fields", async () => {
      const message = "missing input"
      const result = await supertest(app).post("/user/register").send(user4)
			expect(result.status).toEqual(400);
      expect(result.body.error).toEqual(message)
    });
  });
});
