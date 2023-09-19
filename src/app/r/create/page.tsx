'use client'


import { CreateSubredditPayload } from '@/lib/validators/subreddit'

import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useMutation } from 'react-query'

const Page = () => {
  const router = useRouter()
  const [input, setInput] = useState<string>('')


  const { mutate: createCommunity, isLoading } = useMutation({
    mutationFn: async () => {
      const payload: CreateSubredditPayload = {
        name: input,
      }

      const { data } = await axios.post('/api/subreddit', payload)
      return data as string
    },
    onError: (err) => {
      if (err instanceof AxiosError) {

        if (err.response?.status === 409) {
          toast.error("Subreddit already exists.")
        }

        if (err.response?.status === 422) {
          toast.error("Invalid subreddit name.")
        }

        if (err.response?.status === 401) {
          toast.error("Unauthorized")
        }
      }

      toast.error("There was an error")
    },
    onSuccess: (data) => {
      router.push(`/r/${data}`)
    },
  })

  return (
    <div className='container flex items-center h-full max-w-3xl mx-auto'>
      <Toaster/>
      <div className='relative bg-white w-full h-fit p-4 rounded-lg space-y-6'>
        <div className='flex justify-between items-center'>
          <h1 className='text-xl font-semibold'>Create a Community</h1>
        </div>

        <hr className='bg-red-500 h-px' />

        <div>
          <p className='text-lg font-medium'>Name</p>
          <p className='text-xs pb-2'>
            Community names including capitalization cannot be changed.
          </p>
          <div className='relative'>
            <p className='absolute text-sm left-0 w-8 inset-y-0 grid place-items-center text-zinc-400'>
              r/
            </p>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className='pl-6'
            />
          </div>
        </div>

        <div className='flex justify-end gap-4'>
          
          <button
            
            disabled={input.length === 0}
            onClick={() => createCommunity()}>
            Create Community
          </button>
        </div>
      </div>
    </div>
  )
}

export default Page