import { FC } from "react";

interface FooterSectionProps {
  children: React.ReactNode;
}

const FooterSection: FC<FooterSectionProps> = ({ children }) => {
  return <div className="w-full flex flex-col px-8 p-4 gap-8">{children}</div>;
};

export default FooterSection;
