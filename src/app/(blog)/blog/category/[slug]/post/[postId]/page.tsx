import CommentsSection from "@/components/Comments/CommentsSection";
import EditorOutput from "@/components/EditorOutput";
import FeedHeader from "@/components/Feed/FeedHeader";
import { CardTransactions } from "@/components/Home/card-categories";
import CategoryHeader from "@/components/Categories/CategoryHeader";
import LayoutDefault from "@/components/layout/LayoutDefault";
import PostVoteServer from "@/components/Posts/post-vote/PostVoteServer";
import { db } from "@/lib/db";
import { redis } from "@/lib/redis";
import { formatTimeToNow } from "@/lib/utils";
import { CachedPost } from "@/types/redis";
import { Avatar } from "@nextui-org/react";
import { Post, PostTags, Tag, User, Vote } from "@prisma/client";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import PostHeader from "@/components/Posts/PostHeader";
import { getAuthSession } from "@/lib/auth";

interface CategoryPostPageProps {
  params: {
    postId: string;
    slug: string;
  };
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const CategoryPostPage = async ({ params }: CategoryPostPageProps) => {
  const session = getAuthSession();

  const cachedPost = (await redis.hgetall(
    `post:${params.postId}`
  )) as CachedPost;

  let post: (Post & { votes: Vote[]; author: User; tags: PostTags[] }) | null =
    null;

  if (!cachedPost) {
    post = await db.post.findFirst({
      where: {
        id: params.postId,
      },
      include: {
        votes: true,
        author: true,
        tags: true,
      },
    });
  }

  const tagsList = await db.postTags.findMany({
    where: {
      postId: post?.id,
    },
    include: {
      tag: true,
    },
  });

  if (!post && !cachedPost) return notFound();

  return (
    // left

    <div className="mt-6   gap-6 flex flex-col w-full px-4">
      <div className="flex flex-col gap-2 w-full">
        {/* {categoryName ? <CategoryHeader categoryName={categoryName}/> : null}
              <FeedHeader href={pathname === `/category/${categoryName}` ? `/category/${categoryName}` : null}/> */}
        <div className="sticky top-[4.5rem] flex justify-end w-full pr-2">
          <div className=" flex items-center z-[9999] bg-background rounded-full gap-2 pr-2">
            <PostVoteServer
              postId={post?.id ?? cachedPost.id}
              getData={async () => {
                return await db.post.findUnique({
                  where: {
                    id: params.postId,
                  },
                  include: {
                    votes: true,
                  },
                });
              }}
            />
          </div>
        </div>

        <PostHeader
          categoryName={params.slug}
          createdAt={post?.createdAt ?? cachedPost.createdAt}
          image={post?.author.image ? (post.author.image as string) : undefined}
          isPrivate={post?.isPrivate ? post?.isPrivate : undefined}
          role={post?.author.role}
          postId={post?.id}
        />
        <div className="grid grid-cols-1 gap-6 justify-center w-full">
          <div className="w-full">
            <h3 className="text-4xl font-semibold py-2 mb-4 leading-6 text-foreground break-words">
              {post?.title ?? cachedPost.title}
            </h3>
          </div>

          <EditorOutput content={post?.content ?? cachedPost.content} />

          <Suspense fallback={<PostVoteShell />}>
            <PostVoteServer
              postId={post?.id ?? cachedPost.id}
              getData={async () => {
                return await db.post.findUnique({
                  where: {
                    id: params.postId,
                  },
                  include: {
                    votes: true,
                  },
                });
              }}
            />
          </Suspense>
        </div>
        <div className="tags-list flex flex-row gap-2">
          {tagsList.map((item, i) => (
            <button
              key={i}
              className="px-2 py-1 bg-backgroundSecond rounded-lg"
            >
              {item.tag?.name}
            </button>
          ))}
        </div>
      </div>
      <CommentsSection postId={post?.id ?? cachedPost.id} />
    </div>
  );
};

function PostVoteShell() {
  return (
    <div className="flex items-center flex-col pr-6 w-20">
      {/* upvote */}
      <div>
        <AiOutlineArrowUp className="h-5 w-5 text-zinc-700" />
      </div>

      {/* score */}
      <div className="text-center py-2 font-medium text-sm text-zinc-900">
        <div>loading</div>
      </div>

      {/* downvote */}
      <div>
        <AiOutlineArrowDown className="h-5 w-5 text-zinc-700" />
      </div>
    </div>
  );
}

export default CategoryPostPage;
