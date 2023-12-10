import Blog from "@/assets/blog.png";
import { Button } from "@nextui-org/react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { FC } from "react";

interface ProjectCardProps {
  order: string;
  title: string;
  desc: string;
  visitLink?: string;
  GithubLink: string;
  image: StaticImageData;
}

const ProjectCard: FC<ProjectCardProps> = ({
  order,
  title,
  desc,
  visitLink,
  GithubLink,
  image,
}) => {
  return (
    <div className="project-card w-full flex flex-col xl:px-24 pb-4">
      <div className="flex w-full flex-col md:flex-row gap-4 xl:gap-12">
        <div
          className={`project-desc order-last md:${order} w-full flex flex-col justify-center gap-4 p-6`}
        >
          <h3 className="text-xl md:text-3xl">Project</h3>
          <h4 className="text-2xl md:text-4xl font-bold">{title}</h4>
          <p className="text-sm md:text-base">{desc}</p>
          <div className="buttons flex flex-row gap-2">
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
              >
                Visit
              </a>
            )}
          </div>
        </div>
        <div className="project-photo w-full flex  items-center justify-center">
          <div className="w-full bg-backgroundSecond p-2">
            <Link href={`/`}>
              <Image
                src={image}
                alt={title + " image"}
                className="object-cover hover:opacity-90"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
