import { z } from "zod";
import { PostTagValidator } from "./tags";

export const PostValidator = z.object({
  title: z
    .string()
    .min(3, {
      message: "Title must be at least 3 characters long",
    })
    .max(128, {
      message: "Title must be max 128 characters long",
    }),
  categoryId: z.string(),
  content: z.any(),
  tags: z.array(PostTagValidator),
  isPrivate: z.boolean(),
});

export type PostCreationRequest = z.infer<typeof PostValidator>;
