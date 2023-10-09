import { FC } from "react";
import Blog from "@/assets/blog.png";
import Image from "next/image";
import { Button } from "@nextui-org/react";
import Link from "next/link";

interface ProjectCardProps {
  order: string;
}

const ProjectCard: FC<ProjectCardProps> = ({ order }) => {
  return (
    <div className="project-card w-full flex flex-col xl:px-24 pb-4">
      <div className="flex w-full flex-col md:flex-row gap-4 xl:gap-12">
        <div
          className={`project-desc order-last md:${order} w-full flex flex-col justify-center gap-4 p-6`}
        >
          <h3 className="text-xl md:text-3xl">Project 1</h3>
          <h4 className="text-2xl md:text-4xl font-bold">Blog App</h4>
          <p className="text-sm md:text-base">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatem
            odit mollitia molestiae soluta animi distinctio veritatis esse est
            sapiente deserunt minima, alias eligendi quibusdam iure magni vitae
            enim. Itaque, asperiores!
          </p>
          <div className="buttons flex flex-row gap-2">
            <Button size="sm" className="bg-transparent hover:bg-default-100">
              react more
            </Button>
            <Button size="sm" className="bg-default-200 hover:bg-default-300">
              Visit
            </Button>
          </div>
        </div>
        <div className="project-photo w-full flex  items-center justify-center">
          <div className="w-full bg-backgroundSecond p-2">
            <Link href={`/`}>
              <Image
                src={Blog}
                alt="blog"
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
