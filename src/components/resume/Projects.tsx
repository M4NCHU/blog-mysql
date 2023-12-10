"use client";

import { FC } from "react";
import Project from "./Project";

// images

import Blog from "@/assets/blog.png";
import ResumeHeader from "./ResumeHeader";

import blog from "@/assets/blog.png";
import movie from "@/assets/movie.png";

interface ProjectsProps {}

const Projects: FC<ProjectsProps> = ({}) => {
  return (
    <>
      <ResumeHeader title="Projects" id="frameworks" />
      <div className="w-full flex flex-col gap-4">
        <Project
          title="Blog app"
          desc="Blog - Nextjs - mysql - prisma"
          GithubLink="https://github.com/M4NCHU/blog-mysql"
          visitLink="https://maciej-szwast.vercel.app/blog"
          image={blog}
          tags={[
            "Nextjs",
            "ReactJS",
            "TypeScript",
            "HTML",
            "JS",
            "CSS",
            "mySQL",
          ]}
        />
        <Project
          title="Blog app"
          desc="Movie App - C# - ASP .NET - HTML - JS - CSS"
          GithubLink="https://github.com/M4NCHU/MovieApp"
          image={movie}
          tags={["C#", "ASP .NET", "HTML", "JS", "CSS", "mySQL"]}
        />
      </div>
    </>
  );
};

export default Projects;
