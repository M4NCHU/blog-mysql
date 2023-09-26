"use client"

import React, { useState } from "react";
import Navbar from "../Navbar";
import Header from "../Header/Header";
import Providers from "../Providers";
import { getAuthSession } from "@/lib/auth";
import MainWrapper from "../MainWrapper";
import { SidebarContext } from "./Layout-context";
import { Session } from "next-auth";
import { useLockedBody } from "@/hooks/useBodyLock";
import { SidebarWrapper } from "../Sidebar/sidebar";
import { Subreddit } from "@prisma/client";
// import { useLockedBody } from "../hooks/useBodyLock";

// import { SidebarWrapper } from "../sidebar/sidebar";
// import { SidebarContext } from "./layout-context";


interface Props {
  children: React.ReactNode;
  session: Session | null
  subreddit?: Subreddit[] 
}

export const Layout = ({ children, session, subreddit }: Props) => {

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [_, setLocked] = useLockedBody(false);
    const handleToggleSidebar = () => {
      setSidebarOpen(!sidebarOpen);
      setLocked(!sidebarOpen);
    };
  
    console.log(sidebarOpen)

    
  

  return (
    <>
 
    <SidebarContext.Provider
       value={{
         collapsed: sidebarOpen,
         setCollapsed: handleToggleSidebar,
       }}
     >
      <section className="flex">
        <SidebarWrapper subreddit={subreddit} session={session} />
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <MainWrapper session={session}>{children}</MainWrapper>
        </div>
      </section>
     </SidebarContext.Provider>
  
    </>
    
  );
};