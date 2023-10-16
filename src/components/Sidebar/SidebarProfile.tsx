"use client";

import { SidebarItem } from "./SidebarItem";

import { Category } from "@prisma/client";
import { Session } from "next-auth";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FC } from "react";
import { BiNews } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";
import SidebarSection from "./SidebarSection";

interface SidebarProfileProps {
  category?: Category[];
  session: Session | null;
}

const SidebarProfile: FC<SidebarProfileProps> = ({ category, session }) => {
  const pathname = usePathname();

  if (!session) return;

  return (
    <>
      <SidebarSection>
        <div className="w-full flex flex-col items-center justify-center gap-4">
          <div className="relative w-[8rem] h-[8rem]">
            <Image
              fill
              src={session?.user.image as string}
              alt={`image of ${session?.user.name}`}
              className="object-cover rounded-lg"
            />
          </div>
          <div className="user-desc flex justify-center flex-col items-center gap-1">
            <h2 className="font-semibold text-xl">{session.user.name}</h2>
            <span className="text-sm text-hoverColor">
              @{session.user.username}
            </span>
          </div>
        </div>
      </SidebarSection>
      <SidebarSection title="Posts">
        <SidebarItem
          href={`/profile/${session.user.id}/posts`}
          isActive={pathname === `/profile/${session.user.id}/posts`}
          title="Your posts"
          icon={<BiNews />}
        />
        <SidebarItem
          href={`/profile/${session.user.id}/posts`}
          isActive={pathname === `/profile/${session.user.id}/saved-posts`}
          title="Saved Posts"
          icon={<FiSettings />}
        />
      </SidebarSection>
      <SidebarSection title="Notifications">
        <SidebarItem
          isActive={pathname === "/changelog"}
          title="News"
          icon={<BiNews />}
        />
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

      <SidebarSection title="Others">
        <SidebarItem
          href={`/profile/${session.user.id}/settings`}
          isActive={pathname === `/profile/${session.user.id}/settings`}
          title="Settings"
          icon={<FiSettings />}
        />
      </SidebarSection>
    </>
  );
};

export default SidebarProfile;
