
"use client"
import React, { Children, FC } from 'react'
import Header from './Header/Header'
import { getAuthSession } from '@/lib/auth'
import { Session } from 'next-auth'

interface MainWrapperProps {
    children: React.ReactNode
    session: Session | null
}


const MainWrapper: FC<MainWrapperProps> = ({children, session}) => {
    

  return (
   <>
    <Header session={session} />
    {children}
   </>
  )
}

export default MainWrapper