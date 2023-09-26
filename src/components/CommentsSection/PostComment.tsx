"use client"

import { Comment, CommentVote, User } from '@prisma/client'
import { FC, useRef, useState } from 'react'
import { UserAvatar } from '../UserAvatar'
import { formatTimeToNow } from '@/lib/utils'
import CreateComment from './CreateComment'

import CommentVotes from './CommentVotes'
import { Button, Textarea } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useMutation } from 'react-query'
import { CommentRequest } from '@/lib/validators/comment'
import axios, { AxiosError } from 'axios'
import toast from 'react-hot-toast'

type ExtendedComment = Comment & {
    votes: CommentVote[]
    author: User
}

interface PostCommentProps {
  comment: ExtendedComment
  currentVote: CommentVote | undefined
  votesAmt: number
  postId: string
}

const PostComment: FC<PostCommentProps> = ({ comment, votesAmt, currentVote, postId }) => {
    const commentRef = useRef<HTMLDivElement>(null)
    const router = useRouter()
    const {data: session} = useSession()
    const [isReplaying, setIsReplying] = useState<boolean>(false)
    const [input, setInput] = useState<string>("")

    const {mutate: replyToComment, isLoading} = useMutation({
      mutationFn: async({postId, text, replyToId}:CommentRequest) => {
        const payload: CommentRequest = {
          postId,
          text,
          replyToId
        }

        const {data} = await axios.patch("/api/subreddit/post/comment", payload)
        return data
      },
      onError: (error) => {
          if (error instanceof AxiosError) {
              if (error.response?.status === 401) {
                  toast.error('Unauthorized')
              }
          }
          toast.error("There was an error")
      },
      onSuccess: () => {
          router.refresh()
          setInput('')
      }
    })
  return (
   <div className='flex flex-col w-full' ref={commentRef}>
    
    <div className='flex items-center'>
        {/* <UserAvatar user{{
            name: comment.author.name || null,
            image: comment.author.image || null
        }} */}
        <div className=''>
          {comment.author.username}
        </div>
        <p className=''>
          {formatTimeToNow(new Date(comment.createdAt))}
        </p>
    </div>
    <p>
      {comment.text}
    </p>

    <div className='flex flex-row flex-wrap w-full'>
        <CommentVotes commentId={comment.id} initialVotesAmt={votesAmt} initialVote={currentVote}/>
        <Button size='sm' onClick={()=>{
          if (!session) return router.push('/sign-in')
          setIsReplying(true)
        }}>
          reply
        </Button>
        {isReplaying ? (
          <div>
            <p>reply</p>
            <div className='w-full'>
        <Textarea
            label="Description"
            labelPlacement="outside"
            placeholder="Enter your comment"
            className="w-full"
            id='comment'
            value={input}
            onChange={(e)=>setInput(e.target.value)}
        />

          <div className=''>
              <Button onClick={()=>{
                if (!input) return
                replyToComment({
                  postId,
                  text: input,
                  replyToId: comment.replyToId ?? comment.id
                })
              }}>
                  reply
              </Button>
              </div>
          </div>
          </div>
        ) : null}
    </div>    
   </div>
  )
}

export default PostComment