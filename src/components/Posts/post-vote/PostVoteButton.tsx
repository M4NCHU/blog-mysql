import { Button } from "@nextui-org/react";
import { VoteType } from "@prisma/client";
import { FC } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface PostVoteButtonProps {
  action: () => void;
  currentVote: "UP" | "DOWN" | null | undefined;
  icon?: React.ReactNode;
  type: VoteType;
}

const PostVoteButton: FC<PostVoteButtonProps> = ({
  currentVote,
  action,
  icon,
  type,
}) => {
  return (
    <Button
      size="sm"
      isIconOnly
      onClick={() => action()}
      className={`hover:text-danger-200/20 hover:text-danger-500 bg-transparent text-xl rounded-full hover:bg-default-200  ${
        currentVote === type ? "text-success-200" : ""
      } ${currentVote === type ? "text-danger-500" : ""}`}
    >
      {currentVote === "UP" ? <AiFillHeart /> : <AiOutlineHeart />}
    </Button>
  );
};

export default PostVoteButton;
