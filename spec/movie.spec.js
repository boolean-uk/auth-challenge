/* eslint-disable no-undef */
import supertest from "supertest";
import { app } from "../src/server/index.js";

describe("POST/movie", () => {
  const endpoint = "/movie";
  const token1 = "eyJhbGciOiJIUzI1NiJ9.R2VyYWx0.ma-8K_6d9R-WZ30yWxlgH0OeQLZ_wW90Q6EztwpeiOk";
//   const token2 = "";
//   const token3 = undefined;
//   const token4 = "this is not the token you are looking for";

  const movie = {
    title: "The King's Speech",
    description:
      "Britain's Prince Albert must ascend the throne as King George VI, but he has a speech impediment. Knowing that...",
    runtimeMins: 119,
  };
  test("creates a movie", async () => {
    const result = await supertest(app).post(endpoint).set('Authorization', token1).send(movie);
    expect(result.status).toEqual(201);
    expect(result.body.movie.id).not.toBeUndefined();
    expect(result.body.movie.toMatchObject).toEqual();
  });
});
