"use client";

import { INFINITE_SCROLLING_PAGINATION_RESULTS } from "@/config";
import { ExtendedPost } from "@/types/db";
import { useIntersection } from "@mantine/hooks";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
// import { QueryClient } from "@tanstack/react-query";
import Post from "../Posts/Post";

import { Category } from "@prisma/client";
import { usePathname, useRouter } from "next/navigation";
import CategoryHeader from "../Categories/CategoryHeader";
import FeedHeader from "./FeedHeader";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Select,
  SelectItem,
  Spinner,
} from "@nextui-org/react";

interface PostFeedProps {
  initialPosts: ExtendedPost[];
  categoryName?: string;
  category?: Category;
  isSubscribed?: boolean;
  memberCount?: number;
  categoryNames?: string[];
  tagId?: string;
  filter?: "desc" | "asc";
}

const PostFeed: FC<PostFeedProps> = ({
  initialPosts,
  categoryName,
  category,
  isSubscribed,
  memberCount,
  categoryNames,
  tagId,
  filter,
}) => {
  const queryClient = useQueryClient();

  const lastPostRef = useRef<HTMLElement>(null);
  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });
  const { data: session } = useSession();
  const pathname = usePathname();
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">(
    filter ? filter : "desc"
  );
  const [selectedKeys, setSelectedKeys] = useState(new Set(["Newest"]));
  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  const router = useRouter();
  // console.log(filter);

  const [selectedOption, setSelectedOption] = useState(new Set(["merge"]));
  const queryKey = ["infinite-query"];
  const { data, fetchNextPage, isFetchingNextPage, refetch, isRefetching } =
    useInfiniteQuery(
      queryKey,
      async ({ pageParam = 1 }) => {
        const query =
          `/api/posts?limit=${INFINITE_SCROLLING_PAGINATION_RESULTS}&page=${pageParam}` +
          (!!categoryName ? `&categoryName=${categoryName}` : "") +
          (!!tagId ? `&tag=${tagId}` : "") +
          (!!sortOrder ? `&filter=${sortOrder}` : "");

        console.log(query);

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

  const handleRefetch = async () => {
    await queryClient.refetchQueries({ queryKey: queryKey });
  };

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage(); // Load more posts when the last post comes into view
    }
  }, [entry, fetchNextPage]);

  const posts = data?.pages.flatMap((page) => page) ?? initialPosts;

  // Wywoływana po kliknięciu przycisków sortowania
  const handleSort = (order: "desc" | "asc") => {
    setSortOrder(order);
    console.log(sortOrder);
    refetch();
  };

  return (
    <div className="mt-6 md:p-2 gap-6 pt-8 flex  flex-row min-w-1 flex-grow">
      {/* Card Section Top */}
      <div className="flex flex-col gap-2 w-full px-4 md:px-4 lg:px-8">
        {session?.user.role === "ADMIN" && (
          <FeedHeader
            subCategoriesNames={categoryNames ? categoryNames : null}
            href={
              pathname === `/blog/category/${categoryName}`
                ? `/blog/category/${categoryName}/submit`
                : ``
            }
          />
        )}

        <div className="flex justify-between">
          <div>
            {categoryName ? (
              <CategoryHeader categoryName={categoryName} />
            ) : (
              <CategoryHeader categoryName="Feed" />
            )}
          </div>

          <Dropdown>
            <DropdownTrigger className="bg-transparent border-2 border-default-200">
              <Button>{selectedValue}</Button>
            </DropdownTrigger>

            <DropdownMenu
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={selectedKeys}
              onSelectionChange={(keys: any) => setSelectedKeys(keys)}
            >
              <DropdownItem key="Newest" onClick={() => handleSort("desc")}>
                Newest
              </DropdownItem>
              <DropdownItem key="Oldest" onClick={() => handleSort("asc")}>
                Oldest
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>

        {isRefetching && (
          <>
            <Spinner color="default" />
          </>
        )}

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
                      role={session?.user.role}
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
                    role={session?.user.role}
                  />
                </Link>
              );
            }
          })}
          {isFetchingNextPage && (
            <div className="flex justify-center">
              <Spinner color="default" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostFeed;
