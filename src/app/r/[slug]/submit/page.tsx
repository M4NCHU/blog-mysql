import CreatePost from '@/components/CreatePost/CreatePost'
import CreatePostHeader from '@/components/CreatePostHeader'
import Editor from '@/components/Editor'
import { CardTransactions } from '@/components/Home/card-categories'
import LayoutDefault from '@/components/layout/LayoutDefault'
import { db } from '@/lib/db'
import { Button, Select, SelectItem } from '@nextui-org/react'
import { notFound } from 'next/navigation'
import { FC } from 'react'

interface pageProps {
    params: {
        slug: string
    }
}

const page: FC<pageProps> = async ({params}) => {

    const subreddit = await db.subreddit.findFirst({
        where: {
            name: params.slug,
        },
    })

    const subredditNames = await db.subreddit.findMany()
    const names = subredditNames.map(subreddit => subreddit.name);

    if (!subreddit) {
        return notFound()
    }

  return (
    <CreatePost slug={params.slug} subredditId={subreddit.id} names={names}/>
    
  )
}

export default page