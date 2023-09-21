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

                take: INFINITE_SCROLLING_PAGINATION_RESULTS
            },
        },
    })

    if (!subreddit) return notFound()
    
    return (
        <div>
            <MiniCreatePost session={session!}/>
            <PostFeed initialPosts={subreddit.posts} subredditName={subreddit.name} />
        </div>
    )
}

export default page