import { Button } from "@nextui-org/react";
import { FC } from "react";

interface CommentsButtonsProps {
  onClick: () => void;
  isReplaying: boolean;
  handleClose: () => void;
}

const CommentsButtons: FC<CommentsButtonsProps> = ({
  onClick,
  isReplaying,
  handleClose,
}) => {
  return (
    <div className="flex flex-row justify-end gap-2">
      <Button
        size="sm"
        variant="ghost"
        onClick={() => {
          handleClose();
        }}
      >
        Cancel
      </Button>
      <Button className="hover:bg-backgroundSecond" size="sm" onClick={onClick}>
        Post
      </Button>
    </div>
  );
};

export default CommentsButtons;
