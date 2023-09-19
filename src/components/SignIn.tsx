import { FC } from 'react'
import UserAuthForm from './UserAuthForm'
import Link from 'next/link'

interface SignInProps {
  
}

const SignIn: FC<SignInProps> = ({}) => {
  return (
  <div>
    <Link href="/sign-up">Register</Link>
    <UserAuthForm/>
  </div>
  )
}

export default SignIn