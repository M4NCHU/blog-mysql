import { Category, Post, PostTags, Tag, User } from "@prisma/client";

export type ExtendedPost = Post & {
  category: Category;
  votes: Vote[];
  author: User;
  comments: Comments[];
  tags: PostTags[];
};

export type PostWithUser = Post & {
  author: User;
};
