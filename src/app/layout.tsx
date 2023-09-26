

import { cn } from '@/lib/utils'
import '../styles/globals.css'
import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Providers from '@/components/Providers'
import { SessionProvider } from "next-auth/react"
import type { AppProps } from "next/app"
import { Layout } from '@/components/layout/Layout'
import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'


export const metadata: Metadata = {
  title: 'Blog',
  description: 'Blog',
}

interface RootLayoutProps {
  children: React.ReactNode
  authModal: React.ReactNode
}

export default async function  RootLayout({
  children,
  authModal,
  
}: RootLayoutProps) {
  const session = await getAuthSession()
  
  const subreddit = await db.subreddit.findMany()

  return (
    <html lang="en">
      
        <body className="text-foreground bg-background  min-h-screen  antialiased my-custom-style">
        <Providers>
            <Layout session={session} subreddit={subreddit}>
              {children}
            </Layout>
      </Providers>
        </body>

    </html>
       
  )
}
