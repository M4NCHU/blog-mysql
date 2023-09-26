import MiniCreatePost from '@/components/MiniCreatePost'
import PostFeed from '@/components/PostFeed'
import SubscribeLeaveToggle from '@/components/SubsctibeLeaveToggle'
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from '@/config'
import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { format } from 'date-fns'
import { notFound } from 'next/navigation'
import { FC } from 'react'

interface pageProps {
  params: {
    slug: string
  }
}

const page: FC<pageProps> = async ({params}) => {
    const {slug} = params

    const session = await getAuthSession()
    const subreddit = await db.subreddit.findFirst({
        where: {name: slug },
        include: {
            posts: {
                include: {
                    author: true,
                    votes: true,
                    comments: true,
                    subreddit: true,
                },
                orderBy: {
                    createdAt: 'desc',
                },

                take: INFINITE_SCROLLING_PAGINATION_RESULTS
            },
        },
    })

    const subredditNames = await db.subreddit.findMany()
    const names = subredditNames.map(subreddit => subreddit.name);
    

    const subscription = !session?.user ? undefined: await db.subscription.findFirst({
        where: {
            subreddit: {
                name: slug,
            },
            user: {
                id: session.user.id,
            },
        },
    })

    const isSubscribed = !!subscription

    if(!subreddit) return notFound()

    const memberCount = await db.subscription.count({
        where: {
            subreddit: {
                name: slug,
            },
        },
    })

    if (!subreddit) return notFound()
      
    return (

        <div className=''>
            {/* <div className='mt-8 p-2'>
                
                <MiniCreatePost session={session!}/>
            </div> */}
            <PostFeed initialPosts={subreddit.posts} subredditName={subreddit.name} subreddit={subreddit} subredditNames={names} isSubscribed={isSubscribed} memberCount={memberCount} />
        </div>
    )
}

export default page