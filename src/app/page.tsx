import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="">
      <h1>Home page</h1>
      <Link href="/r/create">Create community</Link>
    </main>
  )
}
