"use client";

import { Button } from "@nextui-org/react";
import { FC } from "react";

interface RoundedBtnWithClickProps {
  icon: React.ReactNode;
  onclick: () => void;
}

const RoundedBtnWithClick: FC<RoundedBtnWithClickProps> = ({
  icon,
  onclick,
}) => {
  return (
    <Button
      isIconOnly
      className="flex rounded-full  bg-default-200 hover:bg-default-100 text-xl"
      onClick={onclick}
    >
      {icon}
    </Button>
  );
};

export default RoundedBtnWithClick;
