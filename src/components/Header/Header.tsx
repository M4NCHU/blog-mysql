"use client";

import { useTheme } from "next-themes";
import { FC, useState } from "react";

import { useSidebar } from "@/context/SidebarContext";
import {
  Button,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { BiLogInCircle, BiLogOut, BiSolidSun } from "react-icons/bi";
import SearchSection from "./SearchSection/SearchSection";
import { BurguerButton } from "./burguer-button";
import { NotificationsDropdown } from "./NotificationsDropdown";
import { UserDropdown } from "./UserDropdown";
import HeaderLink from "./HeaderLink";
import { HiBars3BottomLeft } from "react-icons/hi2";
import { FiMoon } from "react-icons/fi";

interface HeaderProps {
  session: Session | null;
}

const Header: FC<HeaderProps> = ({ session }) => {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isSidebarOpen, setIsSidebarOpen } = useSidebar();

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
    <nav className="fixed top-0 navbar h-[4rem] w-full border-b-1 border-default-100 bg-background z-[9999] backdrop-blur-xl backdrop-saturate-150 bg-background/70 px-8 py-2 flex flex-row items-center justify-between">
      <div className="navbar-logo flex flex-row gap-2">
        <a href="/" className="m-0 text-2xl font-semibold">
          Portfolio
        </a>
        <Button
          isIconOnly
          className="flex rounded-full sm:hidden bg-transparent hover:bg-default-100 text-xl"
        >
          <HiBars3BottomLeft />
        </Button>
      </div>
      <ul className="navbar-links hidden sm:flex flex-row items-center gap-6">
        {navLinks.map((item, i) => (
          <HeaderLink key={i} title={item.title} href={item.href} />
        ))}
      </ul>
      <div className="navbar-user flex items-center gap-1 sm:gap-2">
        <Button
          onClick={() => {
            theme === "dark" && setTheme("light");
            theme === "light" && setTheme("dark");
          }}
          isIconOnly
          className="flex rounded-full  bg-transparent hover:bg-default-100 text-xl"
        >
          {theme === "dark" ? <BiSolidSun /> : <FiMoon />}
        </Button>
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
    // <Navbar
    //   onMenuOpenChange={setIsMenuOpen}
    //   className="fixed top-0 border-b-1 border-default-100 "
    // >
    //   <NavbarContent className="md:hidden">
    //     <BurguerButton />
    //   </NavbarContent>
    //   <NavbarBrand>
    //     <BiLogOut />
    //     <p className="font-bold text-inherit">ACME</p>
    //   </NavbarBrand>
    //   {/* <NavbarContent className="w-full max-md:hidden">
    //     <Input
    //       startContent={<AiOutlineSearch />}
    //       isClearable
    //       className="w-full"
    //       classNames={{
    //         input: "w-full",
    //         mainWrapper: "w-full",
    //       }}
    //       placeholder="Search..."
    //     />
    //   </NavbarContent> */}

    //   <NavbarContent className="hidden sm:flex gap-4" justify="center">
    //     <NavbarItem>
    //       <Link color="foreground" href="#">
    //         Features
    //       </Link>
    //     </NavbarItem>
    //     <NavbarItem isActive>
    //       <Link href="#" aria-current="page">
    //         Customers
    //       </Link>
    //     </NavbarItem>
    //     <NavbarItem>
    //       <Link color="foreground" href="#">
    //         Integrations
    //       </Link>
    //     </NavbarItem>
    //   </NavbarContent>
    //   <NavbarContent
    //     justify="end"
    //     className="w-fit data-[justify=end]:flex-grow-0"
    //   >
    //     <NavbarContent>
    //       <SearchSection />
    //     </NavbarContent>
    //     {session?.user ? (
    //       <NavbarContent>
    //         <NavbarContent>
    //           <NotificationsDropdown />
    //         </NavbarContent>
    //         <NavbarContent>
    //           <UserDropdown session={session} />
    //           <Button onClick={() => setIsSidebarOpen()}>open sidebar</Button>
    //         </NavbarContent>
    //       </NavbarContent>
    //     ) : (
    //       <NavbarContent>
    //         <NavbarItem className="hidden lg:flex">
    //           <Button
    //             as={Link}
    //             color="primary"
    //             href="#"
    //             variant="flat"
    //             onClick={() => router.push("/sign-in")}
    //           >
    //             Login
    //           </Button>
    //         </NavbarItem>
    //         <NavbarItem>
    //           <Button
    //             as={Link}
    //             color="primary"
    //             href="#"
    //             variant="flat"
    //             onClick={() => router.push("/sign-up")}
    //           >
    //             Sign Up
    //           </Button>
    //         </NavbarItem>
    //       </NavbarContent>
    //     )}
    //   </NavbarContent>
    //   <NavbarMenu>
    //     {menuItems.map((item, index) => (
    //       <NavbarMenuItem key={`${item}-${index}`}>
    //         <Link
    //           color={
    //             index === 2
    //               ? "primary"
    //               : index === menuItems.length - 1
    //               ? "danger"
    //               : "foreground"
    //           }
    //           className="w-full"
    //           href="#"
    //           size="lg"
    //         >
    //           {item}
    //         </Link>
    //       </NavbarMenuItem>
    //     ))}
    //   </NavbarMenu>
    // </Navbar>

    //   The current theme is: {theme}
    //   <button onClick={() => setTheme('light')}>Light Mode</button>
    //   <button onClick={() => setTheme('dark')}>Dark Mode</button>
    // </div>
  );
};

export default Header;
