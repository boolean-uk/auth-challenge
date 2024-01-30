import { z } from "zod";

const submitMovieSchema = z
  .object({
    title: z.string(),
    description: z.string(),
    runtimeMins: z.number(),
  })
  .strict();

export { submitMovieSchema };
