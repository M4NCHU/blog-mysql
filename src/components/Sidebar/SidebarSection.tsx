import { FC } from "react";

interface SidebarSectionProps {
  children: React.ReactNode;
  title?: string;
}

const SidebarSection: FC<SidebarSectionProps> = ({ children, title }) => {
  return (
    <div className="w-full border-b-2 border-default-100 flex flex-col py-4 gap-2">
      <div className="section-title text-foregroundSecond uppercase text-xs">
        <h4>{title}</h4>
      </div>
      <div className="w-full  flex flex-col gap-2">{children}</div>
    </div>
  );
};

export default SidebarSection;
