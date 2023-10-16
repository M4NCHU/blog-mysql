"use client";
import React, { FC } from "react";

interface ResumeCardProps {
  title: string;
  desc: string;
  icon: React.ReactNode;
  date: string;
}

const ResumeCard: FC<ResumeCardProps> = ({ title, desc, icon, date }) => {
  return (
    <div className="flex flex-row justify-between border-b-1 border-default-100 px-4 py-2 rounded-lg hover:bg-default-100">
      <div className="w-3/4 flex flex-col gap-2">
        <h4 className="font-bold text-xl">{title}</h4>
        <div className="flex flex-row items-center gap-2 text-sm ">
          {icon}
          <span>{desc}</span>
        </div>
      </div>
      <div className="w-1/4 flex justify-end">{date}</div>
    </div>
  );
};

export default ResumeCard;
