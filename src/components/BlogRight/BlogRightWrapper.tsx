"use client";

import { FC } from "react";

interface BlogRightWrapperProps {
  children: React.ReactNode;
}

const BlogRightWrapper: FC<BlogRightWrapperProps> = ({ children }) => {
  return (
    <div
      className="min-w-[24rem] h-full w-[24rem] hidden xl:block relative"
      style={{ minHeight: "calc(100vh - 4rem)" }}
    >
      <div
        className="  p-4 sticky top-[4rem] flex flex-col gap-4 border-l-1 border-default-100"
        style={{ minHeight: "calc(100vh - 4rem)" }}
      >
        {children}
      </div>
    </div>
  );
};

export default BlogRightWrapper;
