"use client";

import { INFINITE_SCROLLING_PAGINATION_RESULTS } from "@/config";
import { ExtendedPost } from "@/types/db";
import { useIntersection } from "@mantine/hooks";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { FC, useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "react-query";
import Post from "../Posts/Post";

import { Category } from "@prisma/client";
import { usePathname } from "next/navigation";
import CategoryHeader from "../Categories/CategoryHeader";
import FeedHeader from "./FeedHeader";

interface PostFeedProps {
  initialPosts: ExtendedPost[];
  categoryName?: string;
  category?: Category;
  isSubscribed?: boolean;
  memberCount?: number;
  categoryNames?: string[];
}

const PostFeed: FC<PostFeedProps> = ({
  initialPosts,
  categoryName,
  category,
  isSubscribed,
  memberCount,
  categoryNames,
}) => {
  const lastPostRef = useRef<HTMLElement>(null);
  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });
  const { data: session } = useSession();
  const pathname = usePathname();

  const [selectedOption, setSelectedOption] = useState(new Set(["merge"]));

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ["infinite-query"],
    async ({ pageParam = 1 }) => {
      const query =
        `/api/posts?limit=${INFINITE_SCROLLING_PAGINATION_RESULTS}&page=${pageParam}` +
        (!!categoryName ? `&categoryName=${categoryName}` : "");

      const { data } = await axios.get(query);
      return data as ExtendedPost[];
    },

    {
      getNextPageParam: (_, pages) => {
        return pages.length + 1;
      },
      initialData: { pages: [initialPosts], pageParams: [1] },
    }
  );

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage(); // Load more posts when the last post comes into view
    }
  }, [entry, fetchNextPage]);

  const posts = data?.pages.flatMap((page) => page) ?? initialPosts;

  return (
    <div className="mt-6 md:p-2 gap-6 pt-6 flex  flex-row min-w-1 flex-grow">
      {/* Card Section Top */}
      <div className="flex flex-col gap-2 w-full px-4 md:px-4 lg:px-8">
        {categoryName ? <CategoryHeader categoryName={categoryName} /> : null}
        <FeedHeader
          subCategoriesNames={categoryNames ? categoryNames : null}
          href={
            pathname === `/blog/category/${categoryName}`
              ? `/blog/category/${categoryName}/submit`
              : ``
          }
        />

        <div className="grid grid-cols-1 gap-6 justify-center w-full">
          {posts.map((post, index) => {
            const votesAmt = post.votes.reduce((acc, vote) => {
              if (vote.type === "UP") return acc + 1;
              if (vote.type === "DOWN") return acc - 1;
              return acc;
            }, 0);

            const currentVote = post.votes.find(
              (vote) => vote.userId === session?.user.id
            );

            if (index === posts.length - 1) {
              return (
                <Link
                  key={post.id}
                  href={`/blog/category/${categoryName}/post/${post.id}`}
                  className="text-foreground"
                >
                  <div ref={ref} className="">
                    <Post
                      post={post}
                      commentAmt={post.comments.length}
                      categoryName={post.category.name}
                      votesAmt={votesAmt}
                      currentVote={currentVote}
                    />
                  </div>
                </Link>
              );
            } else {
              return (
                <Link
                  key={post.id}
                  href={`/blog/category/${categoryName}/post/${post.id}`}
                  className="text-foreground"
                >
                  <Post
                    post={post}
                    commentAmt={post.comments.length}
                    categoryName={post.category.name}
                    votesAmt={votesAmt}
                    currentVote={currentVote}
                  />
                </Link>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default PostFeed;
