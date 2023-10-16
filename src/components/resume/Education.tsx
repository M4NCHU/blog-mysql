"use client";

import { FC } from "react";
import { MdSchool } from "react-icons/md";
import ResumeCard from "./ResumeCard";
import ResumeHeader from "./ResumeHeader";

interface EducationProps {}

const Education: FC<EducationProps> = ({}) => {
  return (
    <>
      <ResumeHeader title="Education" id="education" />
      <div className="flex flex-col w-full gap-2">
        <ResumeCard
          title="Computer science, specializing in databases and Internet technologies"
          date="2021 - Now"
          desc="Państwowa Akademia Nauk Stosowanych. PANS Krosno"
          icon={<MdSchool />}
        />
      </div>
    </>
  );
};

export default Education;
