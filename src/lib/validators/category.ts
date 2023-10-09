import { z } from "zod";

export const CategoryValidator = z.object({
  name: z.string().min(3).max(21),
});

export const CategorySubscriptionValidator = z.object({
  categoryId: z.string(),
});

export type CreateCategoryPayload = z.infer<typeof CategoryValidator>;
export type SubscribeToCategoryPayload = z.infer<
  typeof CategorySubscriptionValidator
>;
