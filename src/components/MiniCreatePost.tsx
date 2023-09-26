"use client"

import { Session } from 'next-auth'
import { usePathname, useRouter } from 'next/navigation'
import { FC } from 'react'

interface MiniCreatePostProps {
  session: Session
}

const MiniCreatePost: FC<MiniCreatePostProps> = ({session}) => {

    const router = useRouter()
    const pathname = usePathname()
    
  return (
    <div className=''>
        <input readOnly onClick={()=>router.push(pathname + "/submit")} placeholder='Create post' />
        <button onClick={()=>router.push(pathname + "/submit")}>zdjęcie</button>
        <button onClick={()=>router.push(pathname + "/submit")}>załącznik</button>
    </div>
  )
}

export default MiniCreatePost