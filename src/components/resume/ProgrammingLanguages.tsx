"use client";
import { FC } from "react";
import ResumeHeader from "./ResumeHeader";
import SkillsCard from "./SkillsCard";
import { MdJavascript } from "react-icons/md";

// images
import JS from "@/assets/js.png";
import Python from "@/assets/python.png";
import Java from "@/assets/java.png";
import PHP from "@/assets/php.png";

interface ProgrammingLanguagesProps {}

const ProgrammingLanguages: FC<ProgrammingLanguagesProps> = ({}) => {
  return (
    <>
      <ResumeHeader title="Programming Languages" id="programming-languages" />
      <div className="w-full flex flex-row gap-2 flex-wrap">
        <SkillsCard title="Java Script" icon={JS} />
        <SkillsCard title="Python" icon={Python} />
        <SkillsCard title="Java" icon={Java} />
        <SkillsCard title="PHP" icon={PHP} />
      </div>
    </>
  );
};

export default ProgrammingLanguages;
