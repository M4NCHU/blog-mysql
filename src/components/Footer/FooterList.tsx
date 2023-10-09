import React, { FC } from "react";

interface FooterListProps {
  children: React.ReactNode;
}

const FooterList: FC<FooterListProps> = ({ children }) => {
  return <ul className="flex flex-col gap-4 w-full">{children}</ul>;
};

export default FooterList;
