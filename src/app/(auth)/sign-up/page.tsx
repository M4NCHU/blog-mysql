import SignUp from "@/components/Authentication/SignUp";
import Link from "next/link";
import { FC } from "react";

interface pageProps {}

const page: FC = () => {
  return (
    <div>
      <div className="inset-0">
        <Link href="/">Home</Link>
      </div>

      <SignUp />
    </div>
  );
};

export default page;
