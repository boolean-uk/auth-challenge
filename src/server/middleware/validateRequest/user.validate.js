import { z } from "zod";

const registerUserSchema = z
  .object({
    username: z.string(),
    password: z.string(),
  })
  .strict();

export { registerUserSchema };
