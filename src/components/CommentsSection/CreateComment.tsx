"use client"

import { CommentRequest } from '@/lib/validators/comment'
import { Button, Textarea } from '@nextui-org/react'
import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { FC, useState } from 'react'
import toast from 'react-hot-toast'
import { useMutation } from 'react-query'

interface CreateCommentProps {
  postId: string
  replyToId?: string
}

const CreateComment: FC<CreateCommentProps> = ({postId, replyToId}) => {
    const [input, setInput] = useState<string>("")
    const router = useRouter()

    const {mutate: createComment, isLoading} = useMutation({
        mutationFn: async ({postId, text, replyToId}: CommentRequest) => {
            const payload: CommentRequest = {
                postId,
                text,
                replyToId,
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
   <div className='w-full'>
        <Textarea
            label="Description"
            labelPlacement="outside"
            placeholder="Enter your comment"
            className=""
            id='comment'
            value={input}
            onChange={(e)=>setInput(e.target.value)}
        />

        <div className=''>
            <Button onClick={()=>createComment({postId, text:input, replyToId})}>
                Post
            </Button>
        </div>
    </div>
  )
}

export default CreateComment