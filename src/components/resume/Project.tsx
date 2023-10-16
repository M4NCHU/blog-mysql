"use client";

import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { FC } from "react";
import ProjectTag from "./ProjectTag";
import { Button } from "@nextui-org/react";

interface ProjectProps {
  title: string;
  icon: string | StaticImport;
}

const Project: FC<ProjectProps> = ({ title, icon }) => {
  return (
    <div className="flex flex-col md:flex-row p-4 items-center grow w-full bg-backgroundSecond rounded-lg gap-2 hover:bg-default-100 cursor-pointer">
      <div className="h-[9rem] w-[15rem] relative">
        <Image
          fill
          src={icon}
          alt={title}
          className="object-contain rounded-lg"
        />
      </div>
      <div className="flex flex-col gap-4 pl-4 grow">
        <h4 className="font-semibold text-xl">{title}</h4>
        <div className="flex gap-2">
          <Button>GitHub</Button>
          <Button>Visit</Button>
        </div>

        <div className="project-tags flex flex-row items-center flex-wrap gap-2">
          <ProjectTag text="React" />
          <ProjectTag text="React" />
          <ProjectTag text="React" />
          <ProjectTag text="React" />
          <ProjectTag text="React" />
        </div>
      </div>
    </div>
  );
};

export default Project;
