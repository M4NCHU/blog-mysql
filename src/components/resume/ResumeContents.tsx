"use client";

import { FC } from "react";
import {
  AiFillGithub,
  AiFillHome,
  AiFillLinkedin,
  AiFillPayCircle,
} from "react-icons/ai";
import { BiLogoReact, BiNews } from "react-icons/bi";
import { BsDatabase, BsPerson } from "react-icons/bs";
import { FaLanguage } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { GoProjectSymlink } from "react-icons/go";
import { ImBlogger } from "react-icons/im";
import {
  MdCastForEducation,
  MdDeveloperMode,
  MdMoreHoriz,
  MdOutlineDescription,
  MdOutlineSchool,
  MdOutlineWorkHistory,
} from "react-icons/md";

interface ResumeContentsProps {}

const ResumeContents: FC<ResumeContentsProps> = ({}) => {
  const ResumeLinks = [
    {
      href: "#personal-Information",
      title: "Personal Information",
      icon: <BsPerson />,
    },
    {
      href: "#objective",
      title: "Objective",
      icon: <MdOutlineDescription />,
    },
    {
      href: "#education",
      title: "Education",
      icon: <MdOutlineSchool />,
    },
    {
      href: "#professional-experience",
      title: "Professional Experience",
      icon: <MdOutlineWorkHistory />,
    },
  ];

  const Skills = [
    {
      href: "#programming-languages",
      title: "Programming Languages",
      icon: <MdDeveloperMode />,
    },
    {
      href: "#frameworks-libraries",
      title: "Frameworks and Libraries",
      icon: <BiLogoReact />,
    },
    {
      href: "#databases",
      title: "Databases",
      icon: <BsDatabase />,
    },
    {
      href: "#other-skills",
      title: "Other Skills",
      icon: <MdMoreHoriz />,
    },

    {
      href: "#projects",
      title: "Projects",
      icon: <GoProjectSymlink />,
    },
    {
      href: "#languages",
      title: "Languages",
      icon: <FaLanguage />,
    },
  ];

  return (
    <div className="w-full bg-backgroundSecond flex flex-col rounded-lg p-4 gap-4">
      <div className="w-full flex flex-col border-b-1 border-default-100 pb-6">
        <h3 className="pb-4 font-bold text-xl">Resume</h3>
        <ul className="ml-2 pl-2 border-l-1 border-default-200 flex flex-col gap-2">
          {ResumeLinks.map((item, i) => (
            <li key={i}>
              <a
                href=""
                className="flex flex-row gap-2 items-center hover:bg-background rounded-lg p-2"
              >
                {item.icon}
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full flex flex-col">
        <h3 className="pb-4 font-bold text-xl">Skills</h3>
        <ul className="ml-2 pl-2 border-l-1 border-default-200 flex flex-col gap-2">
          {Skills.map((item, i) => (
            <li key={i}>
              <a
                href=""
                className="flex flex-row gap-2 items-center hover:bg-background rounded-lg p-2"
              >
                {item.icon}
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ResumeContents;
