"use client";
import { FC } from "react";
import ResumeHeader from "./ResumeHeader";
import SkillsCard from "./SkillsCard";
import { MdJavascript } from "react-icons/md";

// images
import React from "@/assets/pngwing.png";
import Nexjs from "@/assets/nextjs.png";

interface FrameworksProps {}

const Frameworks: FC<FrameworksProps> = ({}) => {
  return (
    <>
      <ResumeHeader title="Frameworks and Libraries" id="frameworks" />
      <div className="w-full flex flex-row gap-2">
        <SkillsCard title="React" icon={React} />
        <SkillsCard title="NextJS" icon={Nexjs} />
        {/* <SkillsCard title="NextJS" icon={Python} /> */}
      </div>
    </>
  );
};

export default Frameworks;
