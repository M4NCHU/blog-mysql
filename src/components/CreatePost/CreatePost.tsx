"use client"

import { FC } from 'react'
import LayoutDefault from '../layout/LayoutDefault'
import CreatePostHeader from '../CreatePostHeader'
import Editor from '@/components/Editor'
import { Button } from '@nextui-org/react'
import { CardTransactions } from '../Home/card-categories'

interface CreatePostProps {
  slug: string
  subredditId: string
  names: string[]
}

const CreatePost: FC<CreatePostProps> = ({slug, subredditId, names}) => {
  return (
    <LayoutDefault>
    <div className="mt-6 md:p-2  gap-6 flex flex-col w-full">
          <div className="flex flex-col gap-2 w-full"></div>
  
        
         <CreatePostHeader slug={slug} names={names}/>
      

    {/* form */}
    <Editor subredditId={subredditId} />

    <div className='w-full flex justify-end'>
    <Button type="submit" form='subreddit-post-form' color="secondary" variant="flat" className='w-full'>
      Post
    </Button>  
      
    </div>
  </div>  
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

export default CreatePost