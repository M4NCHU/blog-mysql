"use client";

import { FC } from "react";
import Project from "./Project";

// images

import Blog from "@/assets/blog.png";
import ResumeHeader from "./ResumeHeader";

interface ProjectsProps {}

const Projects: FC<ProjectsProps> = ({}) => {
  return (
    <>
      <ResumeHeader title="Projects" id="frameworks" />
      <div className="w-full flex flex-col gap-4">
        <Project title="Blog" icon={Blog} />
        <Project title="Blog" icon={Blog} />
      </div>
    </>
  );
};

export default Projects;
