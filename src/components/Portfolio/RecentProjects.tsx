import { FC } from "react";
import SectionHeader from "./SectionHeader";

import Node from "@/assets/node.png";
import ReactImg from "@/assets/pngwing.png";
import ProjectCard from "./ProjectCard";

interface RecentProjectsProps {}

const RecentProjects: FC<RecentProjectsProps> = ({}) => {
  const frameworks = [
    {
      title: "react",
      icon: ReactImg,
    },
    {
      title: "react",
      icon: Node,
    },
  ];

  return (
    <div
      className=" px-2 pb-16 pt-12 md:pt-20 flex items-center flex-col gap-4"
      id="recent"
    >
      <SectionHeader title="Recent projects" />
      <div className="recent-projects flex w-full flex-col items-center justify-center  pt-6 md:pt-12 gap-4 md:gap-16">
        <ProjectCard order="order-last" />
        <div className="border-b-2 border-default-100 w-full"></div>
        <ProjectCard order="order-first" />
      </div>
    </div>
  );
};

export default RecentProjects;
