import { cn } from '@/lib/utils'
import '../styles/globals.css'
import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'


export const metadata: Metadata = {
  title: 'Blog',
  description: 'Blog',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={cn('bg-white ')}>
      <body className="min-h-screen bg-slate-50 antialiased">
        <Navbar/>

        <div className='container max-w-7xl mx-auto h-full pt-12'>
          {children}
        </div>   
      </body>
    </html>
  )
}
