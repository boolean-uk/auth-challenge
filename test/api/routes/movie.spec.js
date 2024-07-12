import supertest from "supertest"
import app from "../../../src/server/index.js"
import createUser from "../../helpers/createUser.js"
import createMovie from "../../helpers/createMovie.js"
import jwt from 'jsonwebtoken'


describe("Movie Endpoint", () => {
    describe("GET /movie", () => {
        it("will retrieve a list of movies", async () => {
            // const user = await createUser('johny', 'mypassword')

            // const token = jwt.sign({ sub: user.username }, process.env.JWT_SECRET)

            // const movie = await supertest(app).post("/movie").auth(token, {type: 'bearer'}).send('Dodgeball', 'weird movie', 120, user)
            // // await createMovie('Scream', 'scared me to death', 113, user)
            // const response = await supertest(app).get('/movie').auth(token, {type: 'bearer'}).send()

            // expect(response.status).toEqual(200)
            // expect(response.body.data).not.toEqual(undefined)
            // expect(response.body.data.length).toEqual(2)

            // const [movie1, movie2] = response.body.data
            // expect(movie1.title).toEqual('Dodgeball')
            // expect(movie1.description).toEqual('weird movie')
            // expect(movie1.runtimeMins).toEqual(120)

            // expect(movie2.title).toEqual('Scream')
            // expect(movie2.description).toEqual('scared me to death')
            // expect(movie2.runtimeMins).toEqual(113)
        })
    })

    // describe("POST /movie", () => {
    //     it("will create a movie", async () => {
    //         await supertest(app).post('/user/register').send({username: 'johny', password: 'mypassword'})

    //         const data = await supertest(app).post('/user/login').send({username: 'johny', password: 'mypassword'})

    //         const token = data.body.token

    //         console.log(token)

    //         const request = {
    //             title: "Top Gun",
    //             description: 'some movie',
    //             runtimeMins: 110,
    //         }

    //         const response = await supertest(app)
    //             .post('/movie')
    //             .set('Authorization', `Bearer ${token}`)
    //             .send(request)

    //         expect(response.status).toEqual(201)
    //         expect(response.body.data).not.toEqual(undefined)
    //         expect(response.body.data.title).toEqual('Top Gun')
    //         expect(response.body.data.runtimeMins).toEqual(110)
    //     })
    // })
})