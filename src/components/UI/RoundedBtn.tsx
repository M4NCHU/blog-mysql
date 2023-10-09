"use client";

import { Button } from "@nextui-org/react";
import { FC } from "react";

interface RoundedBtnProps {
  icon: React.ReactNode;
}

const RoundedBtn: FC<RoundedBtnProps> = ({ icon }) => {
  return (
    <Button
      isIconOnly
      className="flex rounded-full  bg-transparent hover:bg-default-100 text-xl"
    >
      {icon}
    </Button>
  );
};

export default RoundedBtn;
