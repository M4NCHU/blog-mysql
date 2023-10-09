import { INFINITE_SCROLLING_PAGINATION_RESULTS } from "@/config";
import { db } from "@/lib/db";
import { FC, Suspense } from "react";
import PostFeed from "./PostFeed";
import { getAuthSession } from "@/lib/auth";
import PostsSkeleton from "../Skeleton/PostsSkeleton";

interface CustomFeedProps {}

const CustomFeed: FC<CustomFeedProps> = async ({}) => {
  const session = await getAuthSession();

  const followedCommunities = await db.subscription.findMany({
    where: {
      userId: session?.user.id,
    },
    include: {
      category: true,
    },
  });

  const posts = await db.post.findMany({
    where: {
      category: {
        name: {
          in: followedCommunities.map(({ category }) => category.id),
        },
      },
    },
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
  // await new Promise((resolve) => setTimeout(resolve, 200000));
  return (
    <Suspense fallback={<PostsSkeleton />}>
      <PostFeed initialPosts={posts} categoryNames={names} />
    </Suspense>
  );
};

export default CustomFeed;
