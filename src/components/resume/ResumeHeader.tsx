"use client";

import { FC } from "react";

interface ResumeHeaderProps {
  title: string;
  id: string;
}

const ResumeHeader: FC<ResumeHeaderProps> = ({ title, id }) => {
  return (
    <h2 id={id} className="font-bold text-3xl pb-4 mt-4">
      {title}
    </h2>
  );
};

export default ResumeHeader;
