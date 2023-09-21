import { Post, Subreddit } from "@prisma/client";

export type ExtendedPost = Post & {
    subreddit: Subreddit
    votes: Vote[]
    author: User
    comments: Comments[], 
}