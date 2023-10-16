"use client";

import { FC } from "react";
import ResumeHeader from "./ResumeHeader";
import ResumeCard from "./ResumeCard";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";

interface EducationProps {}

const WorkExperience: FC<EducationProps> = ({}) => {
  return (
    <>
      <ResumeHeader
        title="Professional Experience"
        id="professional-experience"
      />
      <div className="flex flex-col w-full">
        <ResumeCard
          title="Frontend Developer"
          date="2023"
          desc="ABC web"
          icon={<HiOutlineBuildingOffice2 />}
        />
      </div>
    </>
  );
};

export default WorkExperience;
