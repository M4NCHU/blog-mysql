"use client";

import React, { FC } from "react";

interface ResumeSectionProps {
  children: React.ReactNode;
}

const ResumeSection: FC<ResumeSectionProps> = ({ children }) => {
  return (
    <div className="w-full flex flex-col gap-2 mb-2  pb-4 border-default-100">
      {children}
    </div>
  );
};

export default ResumeSection;
