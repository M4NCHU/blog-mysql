"use client";

import Image, { StaticImageData } from "next/image";
import { FC } from "react";
import ProjectTag from "./ProjectTag";
import { Button } from "@nextui-org/react";

interface ProjectProps {
  title: string;
  desc?: string;
  visitLink?: string;
  GithubLink: string;
  image: StaticImageData;
  tags?: string[];
}

const Project: FC<ProjectProps> = ({
  title,
  image,
  desc,
  visitLink,
  GithubLink,
  tags,
}) => {
  return (
    <div className="flex flex-col md:flex-row p-4 items-center grow w-full bg-backgroundSecond rounded-lg gap-2 hover:bg-default-100 cursor-pointer">
      <div className="h-[9rem] w-[15rem] relative">
        <Image
          fill
          src={image}
          alt={title}
          className="object-contain rounded-lg"
        />
      </div>
      <div className="flex flex-col gap-4 pl-4 grow">
        <h4 className="font-semibold text-xl">{title}</h4>
        <div className="flex gap-2">
          <a
            href={GithubLink}
            className="p-2 rounded-md min-w-[6rem] bg-backgroundSecond flex items-center justify-center hover:bg-default-100"
          >
            GitHub
          </a>

          {visitLink && (
            <a
              href={visitLink}
              className="bg-default-200 p-2 rounded-md min-w-[5rem] flex items-center justify-center hover:bg-default-300"
              target="_blank"
            >
              Visit
            </a>
          )}
        </div>

        {tags ? (
          <div className="project-tags flex flex-row items-center flex-wrap gap-2">
            {tags.map((item, i) => (
              <ProjectTag key={i} text={item} />
            ))}
          </div>
        ) : (
          "No tags"
        )}
      </div>
    </div>
  );
};

export default Project;
