import supertest from "supertest";
import app from "../../src/server/server.js";
import { createMovie, createUser } from "../helpers/createData.js";

describe("Register endpoint", () => {
    describe("/post", () => {
        it("should allow users to register", async () => {
            const body = { username: "Jonson", password: 'shmassword'}

            const response = await supertest(app).post('/register').send(body)
        })
    })
})