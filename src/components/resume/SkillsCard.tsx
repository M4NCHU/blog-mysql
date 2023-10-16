"use client";

import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { FC } from "react";

interface SkillsCardProps {
  title: string;
  icon: string | StaticImport;
}

const SkillsCard: FC<SkillsCardProps> = ({ icon, title }) => {
  return (
    <div className="flex flex-col justify-center items-center grow w-[7rem] h-[7rem] bg-backgroundSecond rounded-lg gap-2 hover:bg-default-100 cursor-pointer">
      <div className="h-[3rem] w-[3rem] relative">
        <Image fill src={icon} alt={title} className="object-contain " />
      </div>
      {title}
    </div>
  );
};

export default SkillsCard;
