import supertest from "supertest"
import app from "../../../src/server/index.js"
import createUser from "../../helpers/createUser.js"

describe("User Endpoint", () => {
    describe("POST /user/register", () => {
        it("will create a new user", async () => {
            const request = {
                username: "john",
                password: "mypassword"
            }

            const response = await supertest(app).post("/user/register").send(request)

            expect(response.status).toEqual(201)
            expect(response.body.user).not.toEqual(undefined)
            expect(response.body.user.id).not.toEqual(undefined)
            expect(response.body.user.username).toEqual(request.username)
        })

        it("will return 400 if one of the required fields is missing", async () => {
            const response = await supertest(app).post("/user/register").send({})

            expect(response.status).toEqual(400)
            expect(response.body).toHaveProperty('error')
        })

        it("will return 409 when attemping to register a user with an in-use username", async () => {
            const request = {
                username: "john",
                password: "mypassword"
            }

            await createUser(request.username, request.password)

            const response = await supertest(app).post("/user/register").send(request)

            expect(response.status).toEqual(409)
            expect(response.body).toHaveProperty('error')
        })
    })
})