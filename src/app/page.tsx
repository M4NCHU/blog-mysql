import CustomFeed from '@/components/CustomFeed'
import GeneralFeed from '@/components/GeneralFeed'
import { getAuthSession } from '@/lib/auth'
import Image from 'next/image'
import Link from 'next/link'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Layout } from '@/components/layout/Layout'

export default async function Home() {

  const session = await getAuthSession()



  return (
    <>
      {session ? <CustomFeed/> : <GeneralFeed/>}
    </>
    
    
  )
}
