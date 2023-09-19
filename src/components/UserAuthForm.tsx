'use client'

import { cn } from '@/lib/utils'
import { signIn } from 'next-auth/react'
import * as React from 'react'
import { FC } from 'react'
import toast, { Toaster } from 'react-hot-toast';



interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const UserAuthForm: FC<UserAuthFormProps> = ({ className, ...props }) => {
  
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const loginWithGoogle = async () => {
    setIsLoading(true)

    try {
      await signIn('google')
    } catch (error) {
        toast.error("This didn't work.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn('flex justify-center', className)} {...props}>
        
      <button
        type='button'
        className='w-full'
        onClick={loginWithGoogle}
        disabled={isLoading}>
        {!isLoading ? null : 'loading' }
        Google
      </button>
      <Toaster  />
    </div>
    
  )
}

export default UserAuthForm