"use client"

import { SessionProvider } from 'next-auth/react'
import { FC } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

interface ProvidersProps {
  children: React.ReactNode
}

const Providers: FC<ProvidersProps> = ({children}) => {
    const queryClient = new QueryClient()


  return ( 
  
    <QueryClientProvider client={queryClient} >
      <SessionProvider>
        {children}
      </SessionProvider>
    </QueryClientProvider>
  
  )
}


export default Providers