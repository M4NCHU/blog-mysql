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
    slug: string;
    newslug: [];
  };
}

const page: FC<pageProps> = async ({ params }) => {
  const { slug, newslug } = params;
  const encodedSlug = encodeURIComponent(slug);
  console.log("newslug", newslug);

  let filter = "";

  newslug.forEach((word) => {
    console.log("word", word);
    if (word === "asc") {
      filter = "asc";
    } else if (word === "desc") {
      filter = "desc";
    }
  });

  const session = await getAuthSession();
  const category = await db.category.findFirst({
    where: { name: encodedSlug },
    include: {
      posts: {
        include: {
          author: true,
          votes: true,
          comments: true,
          category: true,
          tags: true,
        },
        orderBy: {
          createdAt: "desc",
        },

        take: INFINITE_SCROLLING_PAGINATION_RESULTS,
      },
    },
  });

  const categoryNames = await db.category.findMany();
  const names = categoryNames.map((category) => category.name);

  const subscription = !session?.user
    ? undefined
    : await db.subscription.findFirst({
        where: {
          category: {
            name: encodedSlug,
          },
          user: {
            id: session.user.id,
          },
        },
      });

  const isSubscribed = !!subscription;

  if (!category) return notFound();

  const memberCount = await db.subscription.count({
    where: {
      category: {
        name: encodedSlug,
      },
    },
  });

  const postCount = await db.post.count({
    where: {
      categoryId: category.id,
    },
  });

  if (!category) {
    toast.error("Category cannot be found");
    return notFound();
  }

  console.log("filter", filter);
  return (
    <>
      <div className="grow">
        <Suspense fallback={<PostsSkeleton />}>
          <PostFeed
            initialPosts={category.posts}
            categoryName={category.name}
            category={category}
            categoryNames={names}
            isSubscribed={isSubscribed}
            memberCount={memberCount}
            filter={filter === "asc" ? filter : "desc"}
          />
        </Suspense>
      </div>
      <BlogRightWrapper>
        <CardWrapper>
          <CategoryCard
            category={category}
            isSubscribed={isSubscribed}
            memberCount={memberCount}
            postCount={postCount}
            sessionId={session?.user.id}
          />
        </CardWrapper>
      </BlogRightWrapper>
    </>
  );
};

export default page;
