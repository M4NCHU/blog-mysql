"use client";

import { SidebarItem } from "./SidebarItem";

import ProfileImg from "@/assets/IMG_20210606_111743.jpg";
import { Button } from "@nextui-org/react";
import { Category } from "@prisma/client";
import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";
import { BsPerson } from "react-icons/bs";
import {
  MdAlternateEmail,
  MdMarkEmailRead,
  MdOutlineDescription,
  MdOutlineEmail,
  MdOutlineSchool,
  MdOutlineWorkHistory,
} from "react-icons/md";
import SidebarSection from "./SidebarSection";
import Polish from "@/assets/polish.png";
import British from "@/assets/british.jpg";
import { AiOutlineMobile } from "react-icons/ai";

interface SidebarResumeProps {
  category?: Category[];
  session: Session | null;
}

const SidebarResume: FC<SidebarResumeProps> = ({ category, session }) => {
  const pathname = usePathname();

  return (
    <>
      <SidebarSection>
        <div className="w-full flex flex-col items-center justify-center gap-4">
          <div className="relative w-[8rem] h-[8rem]">
            <Image
              fill
              src={ProfileImg}
              alt={`Maciej Szwast profile img`}
              className="object-cover rounded-lg"
            />
          </div>
          <div className="user-desc flex justify-center flex-col items-center gap-1">
            <h2 className="font-semibold text-xl">Maciej Szwast</h2>
            <span className="text-sm text-hoverColor">Web Developer</span>
          </div>
        </div>
      </SidebarSection>

      <SidebarSection title="Personal info">
        <SidebarItem
          isActive={pathname === "/changelog"}
          title="maciejov250@gmail.com"
          icon={<MdAlternateEmail />}
        />
        <SidebarItem
          href="#objective"
          isActive={pathname === "/changelog"}
          title="793 659 960"
          icon={<AiOutlineMobile />}
        />
      </SidebarSection>

      <SidebarSection title="Languages">
        <Button
          color="default"
          className={`w-full flex justify-start bg-transparent hover:bg-backgroundSecond`}
          startContent={
            <Image src={Polish} width={15} height={15} alt="polish flag" />
          }
        >
          Polish - native
        </Button>
        <Button
          color="default"
          className={`w-full flex justify-start bg-transparent hover:bg-backgroundSecond`}
          startContent={
            <Image src={British} width={15} height={15} alt="polish flag" />
          }
        >
          English - B2
        </Button>
      </SidebarSection>
      <SidebarSection title="Download CV">
        <Link href="" className="text-default-900 active:bg-none w-full">
          <Button
            color="default"
            className={`w-full flex justify-start bg-danger-200  hover:bg-danger-100`}
            startContent={
              <Image src={Polish} width={15} height={15} alt="polish flag" />
            }
          >
            Wersja polska
          </Button>
        </Link>
        <Link href="" className="text-default-900 active:bg-none w-full">
          <Button
            color="default"
            className={`w-full flex justify-start bg-primary-200 hover:bg-primary-100`}
            startContent={
              <Image src={British} width={15} height={15} alt="polish flag" />
            }
          >
            English version
          </Button>
        </Link>
      </SidebarSection>
      {/* <SidebarSection title="categories" session={session?.user.id}>
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
      </SidebarSection> */}
    </>
  );
};

export default SidebarResume;
