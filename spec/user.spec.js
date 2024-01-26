//TODO: use mock functions instead so that the tests do not rely on the db at all. 

import supertest  from "supertest";
import { app } from "../src/server";

/* eslint-disable no-undef */
describe("/user", () => { 
  describe("/register", () => {
      const endpoint = "/user/register"
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
      const result = await supertest(app).post(endpoint).send(user1)
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
      const result = await supertest(app).post(endpoint).send(user2)
			expect(result.status).toEqual(409);
      expect(result.body.error).toEqual(message)
    });
    test("a 400 error is thrown due to empty input fields", async () => {
      const message = "missing input"
      const result = await supertest(app).post(endpoint).send(user3)
			expect(result.status).toEqual(400);
      expect(result.body.error).toEqual(message)
    });
    test("a 400 error is thrown due to missing input fields", async () => {
      const message = "missing input"
      const result = await supertest(app).post(endpoint).send(user4)
			expect(result.status).toEqual(400);
      expect(result.body.error).toEqual(message)
    });
  });
  describe("/login", () => {
    const endpoint = "/user/login"
    const user1 = {
      username: "Geralt",
      password: "Roach",
    };
    const user2 = {
      username: "Geralt",
      password: "Roche",
    };
    const user3 = {
      username: "Vernon",
      password: "Roach",
    };
    const user4 = {
      username: "",
      password: "Roach",
    };
    const user5 = {
      username: "Geralt",
    };
    test("the user is logged in", async() => {
      const result = await supertest(app).post(endpoint).send(user1)
      expect(result.status).toEqual(201)
      expect(result.body.response.token).not.toBeUndefined()
      expect(typeof result.body.response.token).toEqual("string")
      expect(result.body.response.message).toEqual("login successful")
    })
    test("a 401 error is thrown if the password is incorrect", async() => {
      const result = await supertest(app).post(endpoint).send(user2)
      expect(result.status).toEqual(401)
      expect(result.body.error).toEqual("incorrect username/password")
    })
    test("a 401 error is thrown as the username is incorrect", async() => {
      const result = await supertest(app).post(endpoint).send(user3)
      expect(result.status).toEqual(401)
      expect(result.body.error).toEqual("incorrect username/password")
    })
    test("a 400 error is thrown due to empty input fields", async () => {
      const message = "missing input"
      const result = await supertest(app).post(endpoint).send(user4)
			expect(result.status).toEqual(400);
      expect(result.body.error).toEqual(message)
    });
    test("a 400 error is thrown due to missing input fields", async () => {
      const message = "missing input"
      const result = await supertest(app).post(endpoint).send(user5)
			expect(result.status).toEqual(400);
      expect(result.body.error).toEqual(message)
    });

  })
});
