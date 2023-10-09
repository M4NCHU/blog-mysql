import { Category, Post } from "@prisma/client";

export type ExtendedPost = Post & {
  category: Category;
  votes: Vote[];
  author: User;
  comments: Comments[];
};
