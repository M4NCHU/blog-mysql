import { INFINITE_SCROLLING_PAGINATION_RESULTS } from '@/config'
import { db } from '@/lib/db'
import { FC } from 'react'
import PostFeed from './PostFeed'

interface GeneralFeedProps {
  
}

const GeneralFeed: FC<GeneralFeedProps> = async ({}) => {

    const posts = await db.post.findMany({
        
        orderBy: {
            createdAt: 'desc',
        },
        include: {
            votes: true,
            author: true,
            comments: true,
            subreddit: true,
        },
        take: INFINITE_SCROLLING_PAGINATION_RESULTS,

    })

    const subredditNames = await db.subreddit.findMany()
    const names = subredditNames.map(subreddit => subreddit.name);
    
  return (
    <PostFeed initialPosts={posts} subredditNames={names}/>
  )
}

export default GeneralFeed