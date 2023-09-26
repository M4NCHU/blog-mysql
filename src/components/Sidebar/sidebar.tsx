"use client"

import React from "react";
import { Sidebar } from "./sidebar.styles";
import { Avatar, Button, Tooltip } from "@nextui-org/react";
import { CompaniesDropdown } from "./companies-dropdown";

import { CollapseItems } from "./collapse-items";
import { SidebarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";
import { useEffect, useState } from "react";

import { useSidebarContext } from "@/components/layout/Layout-context";

import { useRouter, usePathname  } from "next/navigation";
import { AiFillAccountBook, AiFillCustomerService, AiFillHome, AiFillPayCircle, AiFillWallet } from "react-icons/ai";
import { BiNews, BiSolidSun } from "react-icons/bi";
import { CiDark } from "react-icons/ci";
import { MdDeveloperMode } from "react-icons/md";
import { FiMoon, FiSettings } from "react-icons/fi";
import { useTheme } from "next-themes";
import { db } from "@/lib/db";
import { Subreddit } from "@prisma/client";
import { Session } from "next-auth";

interface SidebarWrapperProps {
  subreddit?: Subreddit[] 
  session: Session | null
}

export const SidebarWrapper = ({subreddit, session}:SidebarWrapperProps) => {
  const router = useRouter();
  const pathname = usePathname()
  const { collapsed, setCollapsed } = useSidebarContext();

  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  console.log(subreddit)

  useEffect(() => {
    setMounted(true)
  }, [])

  if(!mounted) return null

  


  console.log("subreddit", subreddit)

  return (
    <aside className="h-screen z-[202] sticky top-0">
      {collapsed ? (
        <div className={Sidebar.Overlay()} onClick={setCollapsed} />
      ) : null}
      <div
        className={Sidebar({
          collapsed: collapsed,
        })}
      >
        <div className={Sidebar.Header()}>
          MyBlog
        </div>
        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()}>
            <SidebarItem
              title="Home"
              icon={<AiFillHome />}
              isActive={pathname === "/"}
              href="/"
            />
            <SidebarMenu title="Categories">
              {subreddit ? (
                subreddit.map((item, i) => 
                <SidebarItem
                key={i}
                href={`/r/${item.name}`}
                isActive={pathname === `/r/${item.name}`}
                title={item.name}
                icon={<AiFillPayCircle />}
              />
              )
              ) : null}
              <Button color="secondary" variant="flat" className="capitalize" onClick={()=>router.push("/r/create")}>
                  Create category +
              </Button>
              
              
            </SidebarMenu>

            <SidebarMenu title="General">
              
              <CollapseItems
                icon={<MdDeveloperMode />}
                items={["GitHub", "LinkedIn"]}
                title="developer"
              />
              <SidebarItem
                isActive={pathname === "/settings"}
                title="Settings"
                icon={<FiSettings />}
              />
            </SidebarMenu>

            <SidebarMenu title="Updates">
              <SidebarItem
                isActive={pathname === "/changelog"}
                title="News"
                icon={<BiNews />}
              />
            </SidebarMenu>
          </div>
          <div className={Sidebar.Footer()}>
            <Tooltip content={"Settings"} color="primary">
              <div className="max-w-fit">
                <Button isIconOnly color="warning" variant="faded" aria-label="Go to settings" >
                  <FiSettings />
                </Button>
              </div>
            </Tooltip>
            <Tooltip content={"Change mode"} color="primary">
              <div className="max-w-fit">
              
                {theme === "dark" ? (
                <Button isIconOnly color="warning" variant="faded" aria-label="Change color to light" onClick={() => setTheme('light')}>
                  <BiSolidSun  />
                </Button>
                ) : ( 
                <Button isIconOnly color="warning" variant="faded" aria-label="Change color to dark" onClick={() => setTheme('dark')}>
                  <FiMoon  />
                </Button>
              )}
                
              </div>
            </Tooltip>
            <Tooltip content={"Profile"} color="primary">

              {session && (
                <Avatar
                  src={session.user.image ? session.user.image : "" }
                  radius="md"
                  size="md"
                />
              )}
              
            </Tooltip>
          </div>
        </div>
      </div>
    </aside>
  );
};
