import { cn } from '@/lib/utils'
import '../styles/globals.css'
import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Providers from '@/components/Providers'


export const metadata: Metadata = {
  title: 'Blog',
  description: 'Blog',
}

export default function RootLayout({
  children,
  authModal,
}: {
  children: React.ReactNode
  authModal: React.ReactNode
}) {
  return (
    <html lang="en" className={cn('bg-white ')}>
      <body className="min-h-screen bg-slate-50 antialiased">
        <Providers>
          <Navbar/>
          
          {/* {authModal} */}
          

          <div className='container max-w-7xl mx-auto h-full pt-12'>
            {children}
          </div>  
        </Providers>
        
      </body>
    </html>
  )
}
