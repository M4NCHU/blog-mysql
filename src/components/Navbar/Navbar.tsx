import { getAuthSession } from "@/lib/auth";
import { User } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import UserAccountNav from "./UserAccountNav";
import { commonColors, semanticColors } from "@nextui-org/theme";
import Header from "../Header/Header";

interface Props {}

const Navbar = async (props: Props) => {
  const session = await getAuthSession();
  return (
    <>
      <Header session={session} />
    </>
    // <div className="h-12 bg-red-500 flex flex-row justify-between items-center px-12 py-8">
    //     <Link href="/">Blog</Link>
    //     {session?.user ? (
    //         <UserAccountNav user={session.user}/>

    //     ): (
    //         <div>
    //         <a href="/sign-in">Zaloguj się</a>
    //     </div>
    //     )}

    // </div>
  );
};

export default Navbar;
