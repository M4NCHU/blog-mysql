"use client";

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { BiDotsVerticalRounded, BiPlus } from "react-icons/bi";
import { MdOutlineAdminPanelSettings, MdPublic } from "react-icons/md";

interface SidebarSectionProps {
  children: React.ReactNode;
  title?: string;
  links?: CategoryLink[];
  session?: string | undefined;
}

type CategoryLink = {
  link: string;
  name: string;
};

const SidebarSection: FC<SidebarSectionProps> = ({
  children,
  title,
  links,
  session,
}) => {
  console.log(links);
  const router = useRouter();

  return (
    <div className="w-full border-b-2 border-default-100 flex flex-col py-4 gap-2">
      <div className="section-title text-foregroundSecond uppercase text-xs flex flex-row justify-between items-center">
        <h4>{title}</h4>
        {links && session && (
          <>
            <Dropdown>
              <DropdownTrigger>
                <Button
                  isIconOnly
                  className="p-2 rounded-full bg-transparent hover:bg-default-100 text-lg text-foreground"
                >
                  <BiDotsVerticalRounded className={``} />
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                variant="faded"
                aria-label="Dropdown menu with icons"
              >
                {links.map((item, i) => (
                  <DropdownItem
                    key={i}
                    startContent={<MdPublic />}
                    onClick={() => {
                      router.push(item.link);
                    }}
                  >
                    {item.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </>
        )}
      </div>
      <div className="w-full  flex flex-col gap-2">{children}</div>
    </div>
  );
};

export default SidebarSection;
