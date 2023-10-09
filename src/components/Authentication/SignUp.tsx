import Link from "next/link";
import { FC } from "react";
import UserAuthForm from "./UserAuthForm";

interface SignUpProps {}

const SignUp: FC<SignUpProps> = ({}) => {
  return (
    <div>
      <Link href="/sign-in">Login</Link>
      <UserAuthForm />
    </div>
  );
};

export default SignUp;
