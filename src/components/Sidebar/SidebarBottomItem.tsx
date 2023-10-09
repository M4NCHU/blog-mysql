import { Button, Tooltip } from "@nextui-org/react";
import { title } from "process";
import { FC } from "react";

interface SidebarBottomItemProps {
  icon: React.ReactNode;
  onClick: () => void | undefined;
  title: string;
}

const SidebarBottomItem: FC<SidebarBottomItemProps> = ({
  title,
  icon,
  onClick,
}) => {
  return (
    <Tooltip content={title}>
      <div className="max-w-fit">
        <Button
          onClick={() => onClick()}
          isIconOnly
          variant="faded"
          aria-label="Go to settings"
          className="bg-transparent"
        >
          {icon}
        </Button>
      </div>
    </Tooltip>
  );
};

export default SidebarBottomItem;
