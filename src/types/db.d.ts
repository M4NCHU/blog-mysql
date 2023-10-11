import { Category, Post, Tag } from "@prisma/client";

export type ExtendedPost = Post & {
  category: Category;
  votes: Vote[];
  author: User;
  comments: Comments[];
  tags: Tag[];
};
