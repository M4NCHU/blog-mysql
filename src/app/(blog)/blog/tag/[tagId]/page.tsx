import BlogRightWrapper from "@/components/BlogRight/BlogRightWrapper";
import CardWrapper from "@/components/BlogRight/CardWrapper";
import CategoryCard from "@/components/BlogRight/CategoryCard";
import PostFeed from "@/components/Feed/PostFeed";
import PostsSkeleton from "@/components/Skeleton/PostsSkeleton";
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from "@/config";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { FC, Suspense } from "react";
import toast from "react-hot-toast";

interface pageProps {
  params: {
    tagId: string;
  };
}

const page: FC<pageProps> = async ({ params }) => {
  const { tagId } = params;
  const encodedSlug = encodeURIComponent(tagId);
  console.log(encodedSlug);

  const session = await getAuthSession();

  const postsWithTag = await db.post.findMany({
    where: {
      tags: {
        some: {
          tag: {
            id: tagId,
          },
        },
      },
    },
    take: INFINITE_SCROLLING_PAGINATION_RESULTS,
    include: {
      tags: {
        where: {
          id: tagId,
        },
      },
      votes: true,
      author: true,
      comments: true,
      category: true,
    },
  });

  const tag = await db.post.findFirst({
    where: { id: tagId },
  });

  console.log(postsWithTag);
  const categoryNames = await db.category.findMany();
  const names = categoryNames.map((category) => category.name);

  if (!postsWithTag) {
    toast.error("tags cannot be found");
    return notFound();
  }

  return (
    <>
      <div className="grow">
        <Suspense fallback={<PostsSkeleton />}>
          <PostFeed
            initialPosts={postsWithTag}
            categoryNames={names}
            tagId={tagId}
          />
        </Suspense>
      </div>
      <BlogRightWrapper>
        <CardWrapper>test</CardWrapper>
      </BlogRightWrapper>
    </>
  );
};

export default page;
