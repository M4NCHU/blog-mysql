import Link from 'next/link'
import { FC } from 'react'

interface SubredditHeaderProps {
  subredditName: string
}

const SubredditHeader: FC<SubredditHeaderProps> = ({subredditName}) => {
  return (
    <>
    <div className='mb-4'>
    <h1 className='text-2xl'>
        {subredditName}
    </h1>

    </div>
    
    </>
    
  )
}

export default SubredditHeader