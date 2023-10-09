import { FC } from "react";

interface SectionHeaderProps {
  title: string;
}

const SectionHeader: FC<SectionHeaderProps> = ({ title }) => {
  return (
    <div className="Section-header text-center flex flex-col items-center pb-4">
      <div className="border-t-4 border-default-100 pb-4 w-8"></div>
      <h3 className="text-4xl font-semibold">{title}</h3>
    </div>
  );
};

export default SectionHeader;
