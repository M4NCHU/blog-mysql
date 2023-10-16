"use client";

import { CollapseItems } from "./CollapseMenu";
import { SidebarItem } from "./SidebarItem";

import Link from "next/link";
import {
  AiFillGithub,
  AiFillHome,
  AiFillLinkedin,
  AiFillPayCircle,
} from "react-icons/ai";
import { BiNews } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import { ImBlogger } from "react-icons/im";
import { MdDeveloperMode } from "react-icons/md";
import CollapseItem from "./CollapseItem";
import SidebarSection from "./SidebarSection";
import { FC } from "react";
import { usePathname } from "next/navigation";
import { Session } from "next-auth";
import { Category } from "@prisma/client";

interface SidebarBlogProps {
  category?: Category[];
  session: Session | null;
}

const SidebarBlog: FC<SidebarBlogProps> = ({ category, session }) => {
  const pathname = usePathname();

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

  const categoryLinks = [
    {
      name: "create category +",
      link: "/blog/category/create",
    },
  ];

  return (
    <>
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
      <SidebarSection
        title="categories"
        links={categoryLinks}
        session={session?.user.id}
      >
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
    </>
  );
};

export default SidebarBlog;
