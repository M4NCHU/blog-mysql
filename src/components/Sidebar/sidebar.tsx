"use client";

import { Avatar, Button, Tooltip } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import { CollapseItems } from "./CollapseMenu";
import { SidebarItem } from "./SidebarItem";

import { useSidebarContext } from "@/components/layout/Layout-context";

import { useSidebar } from "@/context/SidebarContext";
import { Category } from "@prisma/client";
import { Session } from "next-auth";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  AiFillGithub,
  AiFillHome,
  AiFillLinkedin,
  AiFillPayCircle,
} from "react-icons/ai";
import { BiNews, BiSolidSun } from "react-icons/bi";
import { FiMoon, FiSettings } from "react-icons/fi";
import { ImBlogger } from "react-icons/im";
import { MdClose, MdDeveloperMode } from "react-icons/md";
import CollapseItem from "./CollapseItem";
import SidebarBottomItem from "./SidebarBottomItem";
import SidebarSection from "./SidebarSection";

interface SidebarWrapperProps {
  category?: Category[];
  session: Session | null;
  children: React.ReactNode;
}

export const SidebarWrapper = ({
  category,
  session,
  children,
}: SidebarWrapperProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { isSidebarOpen, setIsSidebarOpen } = useSidebar();
  const { collapsed, setCollapsed } = useSidebarContext();

  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const sidebarRef = useRef<HTMLDivElement>(null);

  const closeSidebarOnLinkClick = (e: any) => {
    if (isSidebarOpen) setIsSidebarOpen();
  };

  useEffect(() => {
    if (isSidebarOpen && sidebarRef.current) {
      setIsSidebarOpen();
    }
  }, [pathname]);

  return (
    <>
      <div
        ref={sidebarRef}
        className={`lg:relative lg:block min-w-[15rem] w-auto lg:z-auto lg:top-auto lg:left-auto lg:h-auto lg:translate-x-0 lg:left lg:w-96 border-r-1 border-e-default-100 ${
          isSidebarOpen
            ? "fixed top-0 left-0 bg-background z-[9990] h-screen w-4/5 transition-transform transform translate-x-0"
            : "fixed top-0 left-0 bg-background z-[9990] h-screen w-4/5 transition-transform transform -translate-x-full"
        }`}
      >
        <aside
          className="relative z-[202]   lg:sticky top-0 h-full md:top-[4rem] p-4"
          style={{ height: "calc(100vh - 4rem)" }}
        >
          <div className="flex flex-col overflow-auto h-full justify-between gap-4">
            <div className="flex flex-col grow">{children}</div>
            {/* <div className="flex flex-row gap-4 items-center justify-center">
              <SidebarBottomItem
                onClick={() => {}}
                icon={<FiSettings />}
                title="Settings"
              />

              {/* <SidebarBottomItem icon={<FiSettings />} title="Settings" /> */}

            {/* <Tooltip content={"Profile"} color="primary">
                {session && (
                  <Avatar
                    src={session.user.image ? session.user.image : ""}
                    radius="md"
                    size="md"
                  />
                )}
              </Tooltip> */}
            {/* </div>  */}
          </div>
        </aside>
      </div>
      {isSidebarOpen && (
        <>
          <div
            className="fixed top-0 left-0 h-screen w-screen bg-black opacity-60 z-[9989] cursor-pointer"
            onClick={() => {
              setTimeout(() => {
                setIsSidebarOpen();
              }, 300); // Opóźnienie 300 milisekund (0,3 sekundy)
            }}
          ></div>
          <Button
            isIconOnly
            className="fixed top-5 right-4 bg-background opacity-100 z-[9990]"
          >
            <MdClose />
          </Button>
        </>
      )}
    </>
  );
};
