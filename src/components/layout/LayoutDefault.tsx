"use client";

import React, { FC } from "react";

interface LayoutDefaultProps {
  children: React.ReactNode;
}

const LayoutDefault: FC<LayoutDefaultProps> = ({ children }) => {
  return (
    <>
      <div className=" h-full">
        <div className="flex justify-center gap-4 xl:gap-12 pt-3 px-4 lg:px-0  flex-wrap xl:flex-nowrap sm:pt-10 max-w-[90rem] mx-auto w-full">
          {children}
        </div>
      </div>
    </>
  );
};

export default LayoutDefault;
