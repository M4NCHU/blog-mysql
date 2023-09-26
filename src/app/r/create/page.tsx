'use client'


import { CardTransactions } from '@/components/Home/card-categories'
import LayoutDefault from '@/components/layout/LayoutDefault'
import { CreateSubredditPayload } from '@/lib/validators/subreddit'
import { Button, Input } from '@nextui-org/react'

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
    <LayoutDefault>
      <div className="mt-6 md:p-2  gap-6 flex flex-col w-full">
      <h3 className='ml-2 mt-2 font-semibold leading-6 text-5xl text-foreground'>
      Create category
      </h3>
      <p className='ml-2 mt-1 truncate text-base text-default-400'>
          
      </p>

      <div className='w-full flex flex-col gap-4 justify-end'>
      <Input
        isClearable
        type="text"
        label="Category name"
        variant="bordered"
        placeholder="Enter name of category"
        onClear={() => console.log("input cleared")}
        onChange={(e) => setInput(e.target.value)}
        value={input}
        
      />
        <Button type="submit" form='subreddit-post-form' color="secondary" variant="flat" className='w-full' disabled={input.length === 0}
             onClick={() => createCommunity()}>
          create
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
    
    //         <input
    //           value={input}
    //           onChange={(e) => setInput(e.target.value)}
    //           className='pl-6'
    //         />
    //       </div>
    //     </div>

    //     <div className='flex justify-end gap-4'>
          
    //       <button
            
    //         disabled={input.length === 0}
    //         onClick={() => createCommunity()}>
    //         Create Community
    //       </button>
    //     </div>
    //   </div>
    // </div>
  )
}

export default Page