import SignIn from "@/components/Authentication/SignIn";
import { getAuthSession } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FC } from "react";

interface pageProps {}

const page = async () => {
  const session = await getAuthSession();

  session && redirect("/");

  return (
    <div
      className="h-screen w-full p-2 sm:p-8 flex flex-col justify-center items-center"
      style={{ height: "calc(100vh - 4rem)" }}
    >
      <SignIn />
    </div>
  );
};

export default page;
