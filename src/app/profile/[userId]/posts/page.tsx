import BlogRightWrapper from "@/components/BlogRight/BlogRightWrapper";
import CardWrapper from "@/components/BlogRight/CardWrapper";
import CategoryCard from "@/components/BlogRight/CategoryCard";
import PostFeed from "@/components/Feed/PostFeed";
import PostsSkeleton from "@/components/Skeleton/PostsSkeleton";
import TagList from "@/components/Tags/TagList";
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from "@/config";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { FC, Suspense } from "react";
import toast from "react-hot-toast";

interface pageProps {
  params: {
    slug: string;
  };
}

const page: FC<pageProps> = async ({ params }) => {
  const session = await getAuthSession();

  const userPosts = await db.post.findMany({
    where: {
      authorId: session?.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      votes: true,
      author: true,
      comments: true,
      category: true,
      tags: true,
    },
    take: INFINITE_SCROLLING_PAGINATION_RESULTS,
  });

  const tags = await db.tag.findMany({
    take: 8,
  });

  return (
    <>
      <div className="grow">
        <Suspense fallback={<PostsSkeleton />}>
          <PostFeed initialPosts={userPosts} />
        </Suspense>
      </div>
    </>
  );
};

export default page;
