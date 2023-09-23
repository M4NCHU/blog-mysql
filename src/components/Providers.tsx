"use client"

import { SessionProvider } from 'next-auth/react'
import { FC } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import {NextUIProvider} from "@nextui-org/react";

interface ProvidersProps {
  children: React.ReactNode
}

const Providers: FC<ProvidersProps> = ({children}) => {
    const queryClient = new QueryClient()


  return ( 
  
    <QueryClientProvider client={queryClient} >
      <SessionProvider>
        <NextUIProvider>
          {children}
        </NextUIProvider>
      </SessionProvider>
      
    </QueryClientProvider>
  
  )
}


export default Providers