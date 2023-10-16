"use client";

import { useTheme } from "next-themes";
import { FC, useEffect, useRef, useState } from "react";

import { Button, Link } from "@nextui-org/react";
import { Session } from "next-auth";
import { BiLogInCircle, BiSidebar, BiSun } from "react-icons/bi";
import { FiMoon } from "react-icons/fi";
import { HiBars3BottomLeft } from "react-icons/hi2";
import HeaderLink from "./HeaderLink";
import { NotificationsDropdown } from "./NotificationsDropdown";
import { UserDropdown } from "./UserDropdown";
import { DarkModeSwitch } from "./darkmodeswitch";
import { MdClose } from "react-icons/md";
import { useSidebar } from "@/context/SidebarContext";
import RoundedBtn from "../UI/RoundedBtn";
import RoundedBtnWithClick from "../UI/RoundedBtnWithClick";
import { usePathname } from "next/navigation";
import { Post, User } from "@prisma/client";
import { PostWithUser } from "@/types/db";

interface HeaderProps {
  session: Session | null;
  notifications: PostWithUser[] | null;
}

type AuthorData = {
  author: User;
};

const Header: FC<HeaderProps> = ({ session, notifications }) => {
  const { theme, setTheme } = useTheme();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navbarRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const closeNav = () => {
    setIsNavOpen(false);
  };

  useEffect(() => {
    closeNav();
  }, [pathname]);

  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  const navLinks = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Blog",
      href: "/blog",
    },
    {
      title: "Resume",
      href: "/resume",
    },
    {
      title: "Contact",
      href: "/contact",
    },
  ];

  return (
    <>
      <nav
        ref={navbarRef}
        className="fixed top-0 navbar h-[4rem] w-full border-b-1 border-default-100 bg-background z-[9990] backdrop-blur-xl backdrop-saturate-150 bg-background/70 px-4 md:px-8 py-2 flex flex-row items-center justify-between"
      >
        <div className="navbar-logo flex flex-row gap-2">
          <a
            href="/"
            className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 text-transparent bg-clip-text"
          >
            MS
          </a>
          {/* <RoundedBtnWithClick
            icon={<BiSidebar />}
            onclick={() => setIsSidebarOpen()}
          /> */}
        </div>
        <ul
          className={`navbar-links ${
            isNavOpen
              ? "fixed top-[4rem] left-0 bg-backgroundSecond p-8 z-[9990]"
              : "hidden"
          } md:flex flex-col sm:flex-row w-full justify-center sm:w-auto sm:bg-transparent items-center gap-4`}
        >
          {navLinks.map((item, i) => (
            <HeaderLink key={i} title={item.title} href={item.href} />
          ))}
        </ul>
        <div className="navbar-user flex items-center gap-1 sm:gap-4 md:gap-2">
          <DarkModeSwitch />
          {/* {theme === "dark" && (
          <Button
            onClick={() => {
              setTheme("light");
            }}
            isIconOnly
            className="flex rounded-full  bg-transparent hover:bg-default-100 text-xl"
          >
            <BiSun />
          </Button>
        )}
        {theme === "light" && (
          <Button
            onClick={() => {
              setTheme("dark");
            }}
            isIconOnly
            className="flex rounded-full  bg-transparent hover:bg-default-100 text-xl"
          >
            <FiMoon />
          </Button>
        )} */}

          <NotificationsDropdown
            notifications={notifications ? notifications : null}
          />

          {session ? (
            <UserDropdown session={session} />
          ) : (
            <Link
              href="/sign-in"
              className="flex flex-row gap-2 text-base flex-nowrap items-center py-2 bg-backgroundSecond rounded-lg text-foreground px-4 hover:bg-default-100"
            >
              <BiLogInCircle className="" />
              <span className="text-sm">Login</span>
            </Link>
          )}
          <Button
            isIconOnly
            className="flex rounded-full sm:hidden bg-transparent hover:bg-default-100 text-2xl font-bold"
            onClick={() => toggleNav()}
          >
            <HiBars3BottomLeft />
          </Button>
        </div>
      </nav>
      {isNavOpen && (
        <>
          <div
            className="fixed top-0 left-0 h-screen w-screen bg-black opacity-60 z-[9989] cursor-pointer"
            onClick={() => {
              setTimeout(() => {
                toggleNav();
              }, 300); // Opóźnienie 300 milisekund (0,3 sekundy)
            }}
          ></div>
        </>
      )}
    </>
  );
};

export default Header;
