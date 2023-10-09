import { INFINITE_SCROLLING_PAGINATION_RESULTS } from "@/config";
import { db } from "@/lib/db";
import { FC, Suspense } from "react";
import PostsSkeleton from "../Skeleton/PostsSkeleton";
import PostFeed from "./PostFeed";

interface GeneralFeedProps {}

const GeneralFeed: FC<GeneralFeedProps> = async ({}) => {
  const posts = await db.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      votes: true,
      author: true,
      comments: true,
      category: true,
    },
    take: INFINITE_SCROLLING_PAGINATION_RESULTS,
  });

  const categoryNames = await db.category.findMany();
  const names = categoryNames.map((category) => category.name);

  return (
    <Suspense fallback={<PostsSkeleton />}>
      <PostFeed initialPosts={posts} categoryNames={names} />;
    </Suspense>
  );
};

export default GeneralFeed;
