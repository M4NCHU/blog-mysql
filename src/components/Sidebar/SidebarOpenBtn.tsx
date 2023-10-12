"use client";

import { useSidebar } from "@/context/SidebarContext";
import { Button } from "@nextui-org/react";
import { FC } from "react";
import { BiSidebar } from "react-icons/bi";

interface SidebarOpenBtnProps {}

const SidebarOpenBtn: FC<SidebarOpenBtnProps> = ({}) => {
  const { setIsSidebarOpen } = useSidebar();

  return (
    <Button
      isIconOnly
      onClick={() => setIsSidebarOpen()}
      className={`fixed top-[4.2rem] right-4 text-xl bg-default-200 flex lg:hidden z-[9990] rounded-full`}
    >
      <BiSidebar />
    </Button>
  );
};

export default SidebarOpenBtn;
