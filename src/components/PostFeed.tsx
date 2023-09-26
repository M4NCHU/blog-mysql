"use client"

import { ExtendedPost } from '@/types/db'
import { FC, useEffect, useRef, useState } from 'react'
import { useIntersection } from "@mantine/hooks"  
import { useInfiniteQuery } from 'react-query'
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from '@/config'
import axios from 'axios'
import { useSession } from "next-auth/react"
import Post from './Post'
import Link from 'next/link'
import { CardAgents } from './Home/card-agents'
import { CardTransactions } from './Home/card-categories'
import {Button, ButtonGroup, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Select, SelectItem, PopoverContent} from "@nextui-org/react";
import FeedHeader from './FeedHeader'
import { usePathname } from 'next/navigation'
import SubredditHeader from './Subreddit/SubredditHeader'
import CategoryDetails from './Subreddit/CategoryDetails'
import { Subreddit } from '@prisma/client'


interface PostFeedProps {
    initialPosts: ExtendedPost[]
    subredditName?: string
    subreddit?: Subreddit
    isSubscribed?: boolean
    memberCount?: number
    subredditNames?: string[]
}

const PostFeed: FC<PostFeedProps> = ({initialPosts, subredditName, subreddit, isSubscribed, memberCount, subredditNames}) => {
  const lastPostRef = useRef<HTMLElement>(null)
  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  })
  const { data: session } = useSession()
  const pathname = usePathname()

  const [selectedOption, setSelectedOption] = useState(new Set(["merge"]));

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ['infinite-query'],
    async ({ pageParam = 1 }) => {
      const query =
        `/api/posts?limit=${INFINITE_SCROLLING_PAGINATION_RESULTS}&page=${pageParam}` +
        (!!subredditName ? `&subredditName=${subredditName}` : '')

      const { data } = await axios.get(query)
      return data as ExtendedPost[]
    },

    {
      getNextPageParam: (_, pages) => {
        return pages.length + 1
      },
      initialData: { pages: [initialPosts], pageParams: [1] },
    }
  )

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage() // Load more posts when the last post comes into view
    }
  }, [entry, fetchNextPage])

  const posts = data?.pages.flatMap((page) => page) ?? initialPosts

  console.log("subredditNames", subredditNames)
  
  
  return (

    
    <div className=" h-full">
      <div className="flex justify-center gap-4 xl:gap-12 pt-3 px-4 lg:px-0  flex-wrap xl:flex-nowrap sm:pt-10 max-w-[90rem] mx-auto w-full">
        <div className="mt-6 md:p-2  gap-6 flex flex-col w-full">
              {/* Card Section Top */}
            <div className="flex flex-col gap-2 w-full">
              {subredditName ? <SubredditHeader subredditName={subredditName}/> : null}
              <FeedHeader subCategoriesNames={subredditNames ? subredditNames : null} href={pathname === `/r/${subredditName}` ? `/r/${subredditName}/submit` : ``}/>
              
              <div className="grid grid-cols-1 gap-6  justify-center w-full">

                
                  {posts.map((post, index) => {
                    const votesAmt = post.votes.reduce((acc, vote) => {
                      if (vote.type === 'UP') return acc + 1
                      if (vote.type === 'DOWN') return acc - 1
                      return acc
                    }, 0)
            
                    const currentVote = post.votes.find(
                      (vote) => vote.userId === session?.user.id
                    )
            

                    if (index === posts.length - 1) {
                      return (
                        <div key={post.id} ref={ref}>
                          <Post
                            post={post}
                            commentAmt={post.comments.length}
                            subredditName={post.subreddit.name}
                            votesAmt={votesAmt}
                            currentVote={currentVote}
                          />
                        </div>
                      )
                    } else {
                      return (
                        <Post
                          key={post.id}
                          post={post}
                          commentAmt={post.comments.length}
                          subredditName={post.subreddit.name}
                          votesAmt={votesAmt}
                          currentVote={currentVote}
                        />
                      )
                    }
                  }
                  )}
                  
              </div>
            </div>
            <div className="h-full flex flex-col gap-2">
              <h3 className="text-xl font-semibold">Statistics</h3>
              <div className="w-full bg-default-50 shadow-lg rounded-2xl p-6 ">
                    {/* <Chart /> */}
              </div>
            </div>
          </div>

          <div className="mt-4 gap-2 flex flex-col xl:max-w-md w-full">
            <h3 className="text-xl font-semibold">Section</h3>
            <div className="flex flex-col justify-center gap-4 flex-wrap md:flex-nowrap md:flex-col sticky top-0">
              {subreddit ? <CategoryDetails subreddit={subreddit} isSubscribed={isSubscribed} session={session} memberCount={memberCount ? memberCount : 0} /> : null} 
              <CardTransactions />
          </div>
        </div>
      </div>
    </div>
          // </div>
        
          
     
      
  )
}



export default PostFeed