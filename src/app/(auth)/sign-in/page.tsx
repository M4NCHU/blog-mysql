import SignIn from '@/components/SignIn'
import Link from 'next/link'
import { FC } from 'react'

interface pageProps {
  
}

const page: FC = () => {
  return (
<div>
    <div className='inset-0'>
        <Link href="/">
            Home
        </Link>
    </div>

    <SignIn/>
</div>
  
  )
}

export default page