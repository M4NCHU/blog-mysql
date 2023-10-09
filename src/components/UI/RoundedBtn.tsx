"use client";

import { Button } from "@nextui-org/react";
import { FC } from "react";

interface RoundedBtnProps {
  icon: React.ReactNode;
  onclick: () => void;
}

const RoundedBtn: FC<RoundedBtnProps> = ({ icon, onclick }) => {
  return (
    <Button
      isIconOnly
      className="flex rounded-full  bg-transparent hover:bg-default-100 text-xl"
      onClick={onclick}
    >
      {icon}
    </Button>
  );
};

export default RoundedBtn;
