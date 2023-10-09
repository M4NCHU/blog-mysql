import Link from "next/link";
import { FC } from "react";

interface CollapseItemProps {
  children?: React.ReactNode;
  icon: React.ReactNode;
  href: string;
  isActive?: boolean;
  title: string;
}

const CollapseItem: FC<CollapseItemProps> = ({
  children,
  icon,
  href,
  title,
  isActive,
}) => {
  return (
    <Link href={href} className="text-default-900 active:bg-none w-full">
      <div
        color="default"
        className={`w-full flex bg-transparent gap-2 hover:bg-backgroundSecond p-2 items-center rounded-r-lg border-l-2 ${
          isActive ? "border-foreground" : "border-default-100"
        }  text-default-500 hover:text-default-900 transition-colors`}
      >
        {icon}
        {title}
        {children}
      </div>
    </Link>
  );
};

export default CollapseItem;
