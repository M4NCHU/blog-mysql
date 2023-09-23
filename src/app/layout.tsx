import { cn } from '@/lib/utils'
import '../styles/globals.css'
import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Providers from '@/components/Providers'
import { SessionProvider } from "next-auth/react"
import type { AppProps } from "next/app"


export const metadata: Metadata = {
  title: 'Blog',
  description: 'Blog',
}

interface RootLayoutProps {
  children: React.ReactNode
  authModal: React.ReactNode
}

export default function RootLayout({
  children,
  authModal,
  
}: RootLayoutProps) {
  
  return (
    <html lang="en">
      
      <body className="dark text-foreground bg-background  min-h-screen  antialiased">
        
        <Providers>
          <Navbar/>
          
          {/* {authModal} */}
          

          <div className='container max-w-7xl mx-auto h-full pt-12 '>
            {children}
          </div>  
        </Providers>
        
      </body>
      
      
    </html>
  )
}
