import { z } from "zod";

export const PostTagValidator = z.object({
  title: z
    .string()
    .min(2, {
      message: "Tag name must be at least 2 characters long",
    })
    .max(32, {
      message: "Tag name must be max 32 characters long",
    }),
});

export type PostTagRequest = z.infer<typeof PostTagValidator>;
