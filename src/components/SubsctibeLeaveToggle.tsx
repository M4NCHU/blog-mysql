"use client"

import { SubscribeToSubredditPayload } from '@/lib/validators/subreddit'
import { Button } from '@nextui-org/react'
import axios, { Axios, AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { FC, startTransition } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useMutation } from 'react-query'

interface SubscribeLeaveToggleProps {
  subredditId: string
  isSubscribed: boolean | null
  subredditName: string
}

const SubscribeLeaveToggle: FC<SubscribeLeaveToggleProps> =  ({subredditId, isSubscribed, subredditName}) => {
    
    const router = useRouter()

    const {mutate: subscribeToSubreddit, isLoading: isSubLoading} = useMutation({
        mutationFn: async () => {
            const payload: SubscribeToSubredditPayload = {
                subredditId,
            }

            const {data} = await axios.post('/api/subreddit/subscribe', payload)
            return data as string 
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
            startTransition(()=>{
                router.refresh()
            })

            toast.success(`You've just subscribed to subreddit: ${subredditName}`)
        }
    })

    const {mutate: unsubscribeToSubreddit, isLoading: isUnsubLoading} = useMutation({
        mutationFn: async () => {
            const payload: SubscribeToSubredditPayload = {
                subredditId,
            }

            const {data} = await axios.post('/api/subreddit/unsubscribe', payload)
            return data as string 
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
            startTransition(()=>{
                router.refresh()
            })

            toast.success(`You've just unsubscribed from subreddit: ${subredditName}`)
        }
    })


  return (
    <div>
        
        <div >
        {isSubscribed ? (
            <Button className='w-full' variant='flat' color='danger' onClick={()=>unsubscribeToSubreddit()}>
                Leave
            </Button>
            
        ) : (
            <Button className='w-full' variant='flat' color='success' onClick={()=>subscribeToSubreddit()}>
                Join
            </Button>
            
        )}
        </div>

    </div>
   
  )
}

export default SubscribeLeaveToggle