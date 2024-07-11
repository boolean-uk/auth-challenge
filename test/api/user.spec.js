import supertest from "supertest";
import app from "../../src/server/server.js";
import { createUser, deleteUser } from "../helpers/createData.js";
import { getUser } from "../../src/server/domains/user.js";

describe("Register endpoint", () => {
    describe("POST /user/register", () => {
        it("should allow users to register", async () => {
            const body = { username: "Jonson", password: 'shmassword'}

            const response = await supertest(app).post('/user/register').send(body)
            
            expect(response.body.user).not.toBe(undefined)
            expect(response.body.user.passwordHash).not.toBe(undefined)
            expect(response.body.user.username).toEqual('Jonson')
        })
    })
})


describe("Login endpoint", () => {
    describe("POST /user/login", () => {
        it("should allow users to log in", async () => {
            await createUser('Test', 'password123')

            const response = await supertest(app).post('/user/login').send({ username: 'Test', password: 'password123'})
            
            expect(response.body.token).not.toBe(undefined)
            expect(response.status).toEqual(200)
        })


        it("should throw a username not found error", async () => {
            await createUser('Test', 'password123')

            const response = await supertest(app).post('/user/login').send({ username: 'Testee', password: 'password123'})

            expect(response.body.error).toEqual('No user found with that username')
            expect(response.status).toEqual(404)
        })

        it("should throw a password incorrect error", async () => {
            await createUser('Test', 'password123')

            const response = await supertest(app).post('/user/login').send({ username: 'Test', password: 'password1234'})

            expect(response.body.error).toEqual('Incorrect password')
            expect(response.status).toEqual(403)
        })
    })
})