import NextLink from "next/link";
import React from "react";
import { useSidebarContext } from "@/components/layout/Layout-context";
import clsx from "clsx";
import { Button } from "@nextui-org/react";

interface Props {
  title: string;
  icon: React.ReactNode;
  isActive?: boolean;
  href?: string;
}

export const SidebarItem = ({ icon, title, isActive, href = "" }: Props) => {
  const { collapsed, setCollapsed } = useSidebarContext();

  const handleClick = () => {
    if (window.innerWidth < 768) {
      setCollapsed();
    }
  };
  return (
    <NextLink href={href} className="text-default-900 active:bg-none w-full">
      <Button
        color="default"
        className={`w-full flex justify-start ${
          isActive ? "bg-backgroundSecond" : "bg-transparent "
        } hover:bg-backgroundSecond`}
        startContent={icon}
      >
        {title}
      </Button>
    </NextLink>
  );
};
