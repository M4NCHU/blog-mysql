"use client";

import { FC } from "react";

interface BlogRightWrapperProps {
  children: React.ReactNode;
}

const BlogRightWrapper: FC<BlogRightWrapperProps> = ({ children }) => {
  return (
    <div
      className="min-w-[24rem] hidden xl:block"
      style={{ minHeight: "calc(100vh - 4rem)" }}
    >
      <div
        className=" bg-background p-4 sticky top-[4rem] border-l-1 border-default-100"
        style={{ minHeight: "calc(100vh - 4rem)" }}
      >
        {children}
      </div>
    </div>
  );
};

export default BlogRightWrapper;
