import CommentsSection from '@/components/CommentsSection/CommentsSection'
import EditorOutput from '@/components/EditorOutput'
import FeedHeader from '@/components/FeedHeader'
import { CardTransactions } from '@/components/Home/card-categories'
import SubredditHeader from '@/components/Subreddit/SubredditHeader'
import LayoutDefault from '@/components/layout/LayoutDefault'
import PostVoteServer from '@/components/post-vote/PostVoteServer'
import { db } from '@/lib/db'
import { redis } from '@/lib/redis'
import { formatTimeToNow } from '@/lib/utils'
import { CachedPost } from '@/types/redis'
import { Avatar } from '@nextui-org/react'
import { Post, User, Vote } from '@prisma/client'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai'

interface SubRedditPostPageProps {
  params: {
    postId: string
  }
}

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

const SubRedditPostPage = async ({ params }: SubRedditPostPageProps) => {
  const cachedPost = (await redis.hgetall(
    `post:${params.postId}`
  )) as CachedPost

  let post: (Post & { votes: Vote[]; author: User }) | null = null

  if (!cachedPost) {
    post = await db.post.findFirst({
      where: {
        id: params.postId,
      },
      include: {
        votes: true,
        author: true,
      },
    })
  }

  if (!post && !cachedPost) return notFound()

  return (
    // left
    <LayoutDefault>
          <div className="mt-6 md:p-2  gap-6 flex flex-col w-full">
            <div className="flex flex-col gap-2 w-full">
              {/* {subredditName ? <SubredditHeader subredditName={subredditName}/> : null}
              <FeedHeader href={pathname === `/r/${subredditName}` ? `/r/${subredditName}` : null}/> */}
              
              <div className="grid grid-cols-1 gap-6  justify-center w-full">
                

                
                  <p className='max-h-40 mt-1 truncate text-xs text-default-400'>
                    {/* <Avatar isBordered src={post && post.author.image ? post.author.image : undefined} size='sm' /> */}
                    Posted by {post?.author.username ?? cachedPost.authorUsername}{' '}
                    {formatTimeToNow(new Date(post?.createdAt ?? cachedPost.createdAt))}
                  </p>
                  <h1 className='text-5xl font-semibold py-2 mb-4 leading-6 text-foreground'>
                    {post?.title ?? cachedPost.title}
                  </h1>

                  <EditorOutput content={post?.content ?? cachedPost.content} />
                  <Suspense
                    fallback={
                      <div>loading</div>
                    }>
                    
                    {/* <CommentsSection postId={post?.id ?? cachedPost.id} /> */}
                  </Suspense>
                  
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
                      })
                    }}
                  />
                </Suspense>
              </div>
              
          </div>
          <CommentsSection postId={post?.id ?? cachedPost.id}/>
          
          </div>
        {/* </div> */}
        <div className="mt-4 gap-2 flex flex-col xl:max-w-md w-full">
              <h3 className="text-xl font-semibold">Section</h3>
              <div className="flex flex-col justify-center gap-4 flex-wrap md:flex-nowrap md:flex-col sticky top-0">
                    {/* {subreddit ? <CategoryDetails subreddit={subreddit} isSubscribed={isSubscribed} session={session} memberCount={memberCount && memberCount} /> : null}  */}
                <CardTransactions />
              </div>
          </div>
    </LayoutDefault>
  )
}

function PostVoteShell() {
  return (
    <div className='flex items-center flex-col pr-6 w-20'>
      {/* upvote */}
      <div >
        <AiOutlineArrowUp className='h-5 w-5 text-zinc-700' />
      </div>

      {/* score */}
      <div className='text-center py-2 font-medium text-sm text-zinc-900'>
        <div>loading</div>
      </div>

      {/* downvote */}
      <div >
        <AiOutlineArrowDown className='h-5 w-5 text-zinc-700' />
      </div>
    </div>
  )
}

export default SubRedditPostPage