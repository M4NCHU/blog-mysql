"use client";

import { FC } from "react";

interface ProjectTagProps {
  text: string;
}

const ProjectTag: FC<ProjectTagProps> = ({ text }) => {
  return (
    <span className="rounded-full px-2 text-sm bg-background hover:bg-default-200">
      {text}
    </span>
  );
};

export default ProjectTag;
