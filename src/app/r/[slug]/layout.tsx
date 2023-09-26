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

    

  return (
    <div className=''>
        
        <div>{children}</div>
    </div>
    
  
  )
}

export default layout