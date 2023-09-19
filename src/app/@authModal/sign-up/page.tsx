"use client"

import SignUp from '@/components/SignUp'
import { useRouter } from 'next/navigation'
import { FC } from 'react'

interface pageProps {
  
}

const page: FC<pageProps> = ({}) => {
  // const router = useRouter()

  return (
    <div className='fixed inset-0 bg-zinc-900/20 z-10'>
    <div className='container flex items-center h-full max-w-lg mx-auto'>
      <div className='relative bg-white w-full h-fit py-20 px-2 rounded-lg'>
        <div className='absolute top-4 right-4'>
          {/* <span onClick={() => router.back()}>Close modal</span> */}
        </div>

        <SignUp />
      </div>
    </div>
  </div>
  )
}

export default page