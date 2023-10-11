import { z } from "zod";

export const EmailValidator = z.object({
  name: z.string(),
  surname: z.string(),
  email: z.string(),
  phone: z.string(),
  message: z.string(),
});

export type EmailRequest = z.infer<typeof EmailValidator>;
