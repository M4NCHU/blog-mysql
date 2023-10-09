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
import { usePathname, useRouter } from "next/navigation";
import {
  AiFillGithub,
  AiFillHome,
  AiFillLinkedin,
  AiFillPayCircle,
} from "react-icons/ai";
import { BiHomeAlt, BiNews, BiSolidSun } from "react-icons/bi";
import { FiMoon, FiSettings } from "react-icons/fi";
import { MdClose, MdDeveloperMode } from "react-icons/md";
import { ImBlogger } from "react-icons/im";
import SidebarSection from "./SidebarSection";
import CollapseItem from "./CollapseItem";
import Link from "next/link";
import SidebarBottomItem from "./SidebarBottomItem";

interface SidebarWrapperProps {
  category?: Category[];
  session: Session | null;
}

export const SidebarWrapper = ({ category, session }: SidebarWrapperProps) => {
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
    const sidebarClickAction = sidebarRef.current?.querySelectorAll("a");
    if (sidebarClickAction) {
      sidebarClickAction.forEach((a) => {
        a.addEventListener("click", closeSidebarOnLinkClick);
      });
    }

    // Dodaj event listener do całej strony, który będzie zamykał sidebar po kliknięciu poza jego obszarem
    const closeSidebarOnOutsideClick = (e: any) => {
      if (
        isSidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target)
      ) {
        setIsSidebarOpen();
      }
    };

    // Nasłuchuj na zdarzenia kliknięcia na całej stronie
    document.addEventListener("click", closeSidebarOnOutsideClick);

    // Warto usunąć nasłuchiwanie zdarzeń, gdy komponent jest oczyszczany
    return () => {
      if (sidebarClickAction) {
        sidebarClickAction.forEach((a) => {
          a.removeEventListener("click", closeSidebarOnLinkClick);
        });
      }
      // Usuń event listener po zniszczeniu komponentu
      document.removeEventListener("click", closeSidebarOnOutsideClick);
    };
  }, [isSidebarOpen]);

  const socials = [
    {
      title: "GitHub",
      icon: <AiFillGithub />,
    },
    {
      title: "LinkedIn",
      icon: <AiFillLinkedin />,
    },
  ];

  return (
    <>
      <div
        ref={sidebarRef}
        className={`lg:relative lg:block min-w-[15rem] w-auto lg:z-auto lg:top-auto lg:left-auto lg:h-auto lg:translate-x-0 lg:left lg:w-96 border-r-1 border-e-default-100 ${
          isSidebarOpen
            ? "fixed top-0 left-0 bg-background z-[9999] h-screen w-4/5 transition-transform transform translate-x-0"
            : "fixed top-0 left-0 bg-background z-[9999] h-screen w-4/5 transition-transform transform -translate-x-full"
        }`}
      >
        <aside
          className="relative z-[202] lg:sticky top-[4rem] p-4"
          style={{ height: "calc(100vh - 4rem)" }}
        >
          <div className="flex flex-col justify-between gap-4 h-full">
            <div className="flex flex-col">
              <SidebarSection>
                <SidebarItem
                  title="Home"
                  icon={<AiFillHome />}
                  isActive={pathname === "/"}
                  href="/"
                />
                <SidebarItem
                  title="Blog"
                  icon={<ImBlogger />}
                  isActive={pathname === "/blog"}
                  href="/blog"
                />
              </SidebarSection>
              <SidebarSection title="categories">
                <CollapseItems
                  isCollapseMenuOpen={true}
                  icon={<MdDeveloperMode />}
                  title="Popular"
                >
                  {category
                    ? category.map((item, i) => (
                        <CollapseItem
                          key={i}
                          href={`/blog/category/${item.name}`}
                          isActive={pathname === `/blog/category/${item.name}`}
                          title={item.name}
                          icon={<AiFillPayCircle />}
                        >
                          <></>
                        </CollapseItem>
                      ))
                    : null}

                  <Link href={"/"} className="text-sm pt-4">
                    See more
                  </Link>
                </CollapseItems>
              </SidebarSection>

              <SidebarSection title="About me">
                <CollapseItems
                  isCollapseMenuOpen={false}
                  icon={<MdDeveloperMode />}
                  title="developer"
                >
                  {socials
                    ? socials.map((item, i) => (
                        <CollapseItem
                          key={i}
                          href={`/blog/category/${item.title}`}
                          isActive={pathname === `/blog/category/${item.title}`}
                          title={item.title}
                          icon={item.icon}
                        >
                          <></>
                        </CollapseItem>
                      ))
                    : null}
                </CollapseItems>
              </SidebarSection>
              <SidebarSection title="Others">
                <SidebarItem
                  isActive={pathname === "/changelog"}
                  title="News"
                  icon={<BiNews />}
                />
                <SidebarItem
                  isActive={pathname === "/settings"}
                  title="Settings"
                  icon={<FiSettings />}
                />
              </SidebarSection>
            </div>
            <div className="flex flex-row gap-4 items-center justify-center">
              <SidebarBottomItem
                onClick={() => {}}
                icon={<FiSettings />}
                title="Settings"
              />
              <SidebarBottomItem
                icon={theme === "dark" ? <BiSolidSun /> : <FiMoon />}
                title="Change theme"
                onClick={() => {
                  theme === "dark" && setTheme("light");
                  theme === "light" && setTheme("dark");
                }}
              />
              {/* <SidebarBottomItem icon={<FiSettings />} title="Settings" /> */}

              <Tooltip content={"Profile"} color="primary">
                {session && (
                  <Avatar
                    src={session.user.image ? session.user.image : ""}
                    radius="md"
                    size="md"
                  />
                )}
              </Tooltip>
            </div>
          </div>
        </aside>
      </div>
      {isSidebarOpen && (
        <>
          <div
            className="fixed top-0 left-0 h-screen w-screen bg-black opacity-60 z-[9998] cursor-pointer"
            onClick={() => {
              setTimeout(() => {
                setIsSidebarOpen();
              }, 300); // Opóźnienie 300 milisekund (0,3 sekundy)
            }}
          ></div>
          <Button
            isIconOnly
            className="fixed top-5 right-5 bg-background opacity-100 z-[9999]"
          >
            <MdClose />
          </Button>
        </>
      )}
    </>
  );
};
