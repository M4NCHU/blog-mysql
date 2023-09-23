
import { getAuthSession } from "@/lib/auth"
import { User } from "next-auth"
import { signOut } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { FC } from "react"
import UserAccountNav from "./UserAccountNav"
import {commonColors, semanticColors} from "@nextui-org/theme";

interface Props {
    
    
  }
  


const Navbar = async (props: Props) => {
    const session = await getAuthSession()
    

    console.log("whitecommonColors."); // #FFFFFF
    // console.log(commonColors.white); // #FFFFFF
    // console.log(commonColors.blue[500]); // #006FEE
    
    // console.log(semanticColors.dark.warning.DEFAULT); // #FFC107
    // console.log(semanticColors.light.primary.DEFAULT); // #006FEE
    return (
      <>
        asdfasd
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
    )
}

export default Navbar