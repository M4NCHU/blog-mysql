"use client"

import { cn } from '@/lib/utils';
import { PostVoteRequest } from '@/lib/validators/vote';
import { usePrevious } from '@mantine/hooks'
import { VoteType } from '@prisma/client'
import axios, { AxiosError } from 'axios';
import { FC, useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai';
import { useMutation } from 'react-query';

interface PostVoteClientProps {
    postId: string
    initialVotesAmt: number
    initialVote?: VoteType | null
  }
  
  const PostVoteClient = ({
    postId,
    initialVotesAmt,
    initialVote,
  }: PostVoteClientProps) => {
    const [votesAmt, setVotesAmt] = useState<number>(initialVotesAmt)
    const [currentVote, setCurrentVote] = useState(initialVote)
    const prevVote = usePrevious(currentVote)
  
    // ensure sync with server
    useEffect(() => {
      setCurrentVote(initialVote)
    }, [initialVote])
  
    const { mutate: vote } = useMutation({
      mutationFn: async (type: VoteType) => {
        const payload: PostVoteRequest = {
          voteType: type,
          postId: postId,
        }
  
        await axios.post('/api/subreddit/post/vote', payload)
      },
      onError: (err, voteType) => {
        if (voteType === 'UP') setVotesAmt((prev) => prev - 1)
        else setVotesAmt((prev) => prev + 1)
  
        // reset current vote
        setCurrentVote(prevVote)
  
        if (err instanceof AxiosError) {
          if (err.response?.status === 401) {
            toast.error("You must be logged in.")
          }
        }
        toast.error("Something went wrong.")
        
      },
      onMutate: (type: VoteType) => {
        if (currentVote === type) {
          // User is voting the same way again, so remove their vote
          setCurrentVote(undefined)
          if (type === 'UP') setVotesAmt((prev) => prev - 1)
          else if (type === 'DOWN') setVotesAmt((prev) => prev + 1)
        } else {
          // User is voting in the opposite direction, so subtract 2
          setCurrentVote(type)
          if (type === 'UP') setVotesAmt((prev) => prev + (currentVote ? 2 : 1))
          else if (type === 'DOWN')
            setVotesAmt((prev) => prev - (currentVote ? 2 : 1))
        }
      },
    })
  

  return (
    <div className='flex flex-col gap-4 sm:gap-0 pr-6 sm:w-20 pb-4 sm:pb-0'>
        <Toaster/>
      {/* upvote */}
      <button
        onClick={() => vote('UP')}
        aria-label='upvote'>
        <AiOutlineArrowUp
          className={cn('h-5 w-5 text-zinc-700', {
            'text-emerald-500 fill-emerald-500': currentVote === 'UP',
          })}
        />
      </button>

      {/* score */}
      <p className='text-center py-2 font-medium text-sm text-zinc-900'>
        {votesAmt}
      </p>

      {/* downvote */}
      <button
        onClick={() => vote('DOWN')}
        className={cn({
          'text-emerald-500': currentVote === 'DOWN',
        })}
        
        aria-label='downvote'>
        <AiOutlineArrowDown
          className={cn('h-5 w-5 text-zinc-700', {
            'text-red-500 fill-red-500': currentVote === 'DOWN',
          })}
        />
      </button>
    </div>
  )
}

export default PostVoteClient