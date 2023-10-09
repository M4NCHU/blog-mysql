"use client";

import { useTheme } from "next-themes";
import { FC, useState } from "react";

import { Button, Link } from "@nextui-org/react";
import { Session } from "next-auth";
import { BiLogInCircle, BiSun } from "react-icons/bi";
import { FiMoon } from "react-icons/fi";
import { HiBars3BottomLeft } from "react-icons/hi2";
import HeaderLink from "./HeaderLink";
import { NotificationsDropdown } from "./NotificationsDropdown";
import { UserDropdown } from "./UserDropdown";
import { DarkModeSwitch } from "./darkmodeswitch";
import { MdClose } from "react-icons/md";

interface HeaderProps {
  session: Session | null;
}

const Header: FC<HeaderProps> = ({ session }) => {
  const { theme, setTheme } = useTheme();
  const [isNavOpen, setIsSidebarOpen] = useState(false);

  const toggleNav = () => {
    setIsSidebarOpen(!isNavOpen);
  };

  // console.log(isSidebarOpen);

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
      title: "About",
      href: "/About",
    },
    {
      title: "Contact",
      href: "/contact",
    },
  ];

  return (
    <>
      <nav className="fixed top-0 navbar h-[4rem] w-full border-b-1 border-default-100 bg-background z-[9999] backdrop-blur-xl backdrop-saturate-150 bg-background/70 px-8 py-2 flex flex-row items-center justify-between">
        <div className="navbar-logo flex flex-row gap-2">
          <a href="/" className="m-0 text-2xl font-semibold">
            Portfolio
          </a>
          <Button
            isIconOnly
            className="flex rounded-full sm:hidden bg-transparent hover:bg-default-100 text-xl"
            onClick={() => toggleNav()}
          >
            <HiBars3BottomLeft />
          </Button>
        </div>
        <ul
          className={`navbar-links ${
            isNavOpen
              ? "fixed top-[4rem] left-0 bg-backgroundSecond p-8 z-[9999]"
              : "hidden"
          } flex flex-col sm:flex-row w-full sm:w-auto sm:bg-transparent items-center gap-6`}
        >
          {navLinks.map((item, i) => (
            <HeaderLink key={i} title={item.title} href={item.href} />
          ))}
        </ul>
        <div className="navbar-user flex items-center gap-1 sm:gap-2">
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

          <NotificationsDropdown />

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
        </div>
      </nav>
      {isNavOpen && (
        <>
          <div
            className="fixed top-0 left-0 h-screen w-screen bg-black opacity-60 z-[9998] cursor-pointer"
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
