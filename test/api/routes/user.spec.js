import supertest from "supertest"
import app from "../../../src/server/index.js"

describe("User Endpoint", () => {
    describe("POST /user/register", () => {
        it("will create a new customer", async () => {
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
    })
})