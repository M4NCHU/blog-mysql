import { Tag, Vote } from "@prisma/client";

export type CachedPost = {
  id: string;
  title: string;
  authorUsername: string;
  content: string;
  tags: PostTags[];
  currentVote: Vote["type"] | null;
  createdAt: Date;
};
