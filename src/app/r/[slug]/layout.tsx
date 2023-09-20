import MiniCreatePost from '@/components/MiniCreatePost'
import SubscribeLeaveToggle from '@/components/SubsctibeLeaveToggle'
import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import { FC } from 'react'
import Link from 'next/link'

interface layoutProps {
  children: React.ReactNode
  params: {slug: string}
}

const layout: FC<layoutProps> = async ({children, params: {slug}}) => {

    const session = await getAuthSession()
    console.log(slug)
    const subreddit= await db.subreddit.findFirst({
        where: {name: slug},
        include: {
            posts: {
                include: {
                    author: true,
                    votes: true,
                },
            },
        },
    })

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

  return (
    <div>
    <h1>{subreddit.name}</h1>
            
    <div className='flex flex-row w-full justify-center'>
         <div>{children}</div>
         <div>
            <time dateTime={subreddit.createdAt.toDateString()}>
                {format(subreddit.createdAt, "MMMM d, yyyy")}
            </time>
        
            {subreddit.creatorId === session?.user.id ? "You created this community" : subreddit.creatorId}
            <h1>members: {memberCount}</h1>

            {/* {subreddit.creatorId !== session?.user.id ? ( */}
                <div>
                    <SubscribeLeaveToggle subredditId={subreddit.id} isSubscribed={isSubscribed} subredditName={subreddit.name}/>
                </div>
            {/* ) : null } */}
                <Link
                    
                    href={`${slug}/submit`}>
                    Create Post
                </Link>
        </div>
        
        </div>
    </div>
  
  )
}

export default layout