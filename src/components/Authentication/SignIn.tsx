import Link from "next/link";
import { FC } from "react";
import UserAuthForm from "./UserAuthForm";

interface SignInProps {}

const SignIn: FC<SignInProps> = ({}) => {
  return (
    <div className="bg-backgroundSecond p-4 flex flex-col items-center gap-2 rounded-lg w-full sm:w-4/5 md:w-3/5 lg:w-2/5">
      <Link
        href="/sign-up"
        className="border-b-1 border-default-200 w-full py-2 text-center"
      >
        Login with
      </Link>
      <UserAuthForm />
    </div>
  );
};

export default SignIn;
